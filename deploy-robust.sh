#!/bin/bash

# Script de Despliegue Robusto - CodeIA
# Basado en la configuración exitosa de FileZilla

echo "🚀 Despliegue Robusto de CodeIA..."

# Cargar variables de entorno
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuración (con fallbacks)
SERVER_IP="${SERVER_IP:-201.148.104.27}"
FTP_USER="${FTP_USER:-codeiacl}"
FTP_PASS="${FTP_PASSWORD:-849yAVz.f9I@fG}"
REMOTE_DIR="${REMOTE_DIR:-/public_html}"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Función para mostrar mensajes
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Verificar dependencias
if [ ! -f "package.json" ]; then
    error "No se encontró package.json"
    exit 1
fi

# Paso 1: Build del proyecto optimizado
log "Ejecutando build optimizado del proyecto..."
npm run build:optimized

if [ $? -ne 0 ]; then
    error "Error en el build optimizado"
    exit 1
fi

success "Build optimizado completado exitosamente"

# Paso 2: Verificar que el directorio dist existe
if [ ! -d "dist" ]; then
    error "No se encontró el directorio dist después del build"
    exit 1
fi

# Paso 3: Crear archivo de configuración FTP para lftp
log "Configurando conexión FTP..."

# Crear archivo de configuración lftp temporal
cat > .lftp-script << EOF
set ssl:verify-certificate no
set ftp:ssl-allow no
set ftp:passive-mode on
set ftp:auto-retry yes
set ftp:retry-delay 3
set ftp:max-retries 3
set net:timeout 30
set net:max-retries 3

open -u $FTP_USER,$FTP_PASS $SERVER_IP
cd $REMOTE_DIR
mirror --reverse --delete --verbose --parallel=3 dist/ .
bye
EOF

# Paso 4: Verificar si lftp está instalado
if ! command -v lftp &> /dev/null; then
    warning "lftp no está instalado. Instalando..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install lftp
        else
            error "Homebrew no está instalado. Instala lftp manualmente: brew install lftp"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update && sudo apt-get install -y lftp
    else
        error "Sistema operativo no soportado para instalación automática de lftp"
        warning "Por favor instala lftp manualmente y ejecuta el script nuevamente"
        exit 1
    fi
fi

# Paso 5: Ejecutar lftp con configuración robusta
log "Iniciando subida de archivos..."
lftp -f .lftp-script
FTP_RESULT=$?

# Limpiar archivo temporal
rm .lftp-script

if [ $FTP_RESULT -eq 0 ]; then
    success "Archivos subidos exitosamente"
else
    error "Error durante la subida de archivos"
    warning "Código de error: $FTP_RESULT"
    warning "Verifica la conectividad: ping $SERVER_IP"
    exit 1
fi

# Paso 6: Verificar despliegue
log "Verificando despliegue..."
sleep 3

# Intentar verificar que el sitio está funcionando
if curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP" | grep -q "200"; then
    success "✅ Sitio web desplegado y funcionando correctamente"
else
    warning "⚠️  El sitio puede tardar unos minutos en estar disponible"
fi

# Mostrar estadísticas
success "📊 Estadísticas del despliegue:"
echo "   - Archivos en dist: $(find dist -type f | wc -l)"
echo "   - Tamaño total: $(du -sh dist | cut -f1)"
echo "   - Fecha de despliegue: $(date)"
echo "   - Servidor: $SERVER_IP"

success "🎉 ¡Despliegue completado exitosamente!"
log "Tu sitio web está disponible en: http://$SERVER_IP"
log "Panel de control: http://$SERVER_IP:2083"

echo ""
warning "Recordatorio: Una vez que codeia.cl apunte a los servidores, podrás usar:"
echo "   - Panel DA: http://codeia.cl:2083"
echo "   - FTP: ftp.codeia.cl"
echo "   - Webmail: http://codeia.cl/webmail" 