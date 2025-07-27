#!/bin/bash

# Script de Automatización de Despliegue - CodeIA
# Autor: Jaime Hernandez
# Fecha: $(date)

echo "🚀 Iniciando proceso de despliegue automático de CodeIA..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Cargar variables de entorno
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuración del servidor (con fallbacks)
SERVER_IP="${SERVER_IP:-201.148.104.27}"
FTP_HOST="${FTP_HOST:-201.148.104.27}"
FTP_USER="${FTP_USER:-codeiacl}"
FTP_PASS="${FTP_PASSWORD:-849yAVz.f9I@fG}"
REMOTE_DIR="${REMOTE_DIR:-/public_html}"

# Función para mostrar mensajes con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

# Paso 1: Verificar dependencias
print_status "Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    print_warning "node_modules no encontrado. Instalando dependencias..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Error al instalar dependencias"
        exit 1
    fi
fi

# Paso 2: Limpiar build anterior
print_status "Limpiando build anterior..."
if [ -d "dist" ]; then
    rm -rf dist
    print_success "Build anterior eliminado"
fi

# Paso 3: Ejecutar build
print_status "Ejecutando build del proyecto..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Error durante el build"
    exit 1
fi
print_success "Build completado exitosamente"

# Paso 4: Verificar que el build se creó
if [ ! -d "dist" ]; then
    print_error "No se encontró el directorio dist después del build"
    exit 1
fi

# Paso 5: Crear backup del servidor (opcional)
print_status "Creando backup del servidor..."
BACKUP_DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="backup_${BACKUP_DATE}"

# Crear directorio de backup local
mkdir -p backups

# Paso 6: Subir archivos via FTP
print_status "Iniciando subida de archivos al servidor..."

# Verificar si lftp está instalado
if ! command -v lftp &> /dev/null; then
    print_warning "lftp no está instalado. Instalando..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install lftp
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update && sudo apt-get install -y lftp
    else
        print_error "Sistema operativo no soportado para instalación automática de lftp"
        print_warning "Por favor instala lftp manualmente y ejecuta el script nuevamente"
        exit 1
    fi
fi

# Crear script de FTP temporal
cat > ftp_upload.lftp << EOF
set ssl:verify-certificate no
set ftp:ssl-allow no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
mirror --reverse --delete --verbose dist/ $REMOTE_DIR
bye
EOF

# Ejecutar lftp
lftp -f ftp_upload.lftp
FTP_RESULT=$?

# Limpiar archivo temporal
rm ftp_upload.lftp

if [ $FTP_RESULT -eq 0 ]; then
    print_success "Archivos subidos exitosamente al servidor"
else
    print_error "Error durante la subida de archivos"
    exit 1
fi

# Paso 7: Verificar despliegue
print_status "Verificando despliegue..."
sleep 5

# Intentar verificar que el sitio está funcionando
if curl -s -o /dev/null -w "%{http_code}" "http://$SERVER_IP" | grep -q "200"; then
    print_success "✅ Sitio web desplegado y funcionando correctamente"
else
    print_warning "⚠️  El sitio puede tardar unos minutos en estar disponible"
fi

# Paso 8: Limpiar archivos temporales
print_status "Limpiando archivos temporales..."

# Mostrar estadísticas del despliegue
print_success "📊 Estadísticas del despliegue:"
echo "   - Archivos en dist: $(find dist -type f | wc -l)"
echo "   - Tamaño total: $(du -sh dist | cut -f1)"
echo "   - Fecha de despliegue: $(date)"
echo "   - Servidor: $SERVER_IP"

print_success "🎉 ¡Despliegue completado exitosamente!"
print_status "Tu sitio web está disponible en: http://$SERVER_IP"
print_status "Panel de control: http://$SERVER_IP:2083"

echo ""
print_warning "Recordatorio: Una vez que codeia.cl apunte a los servidores, podrás usar:"
echo "   - Panel DA: http://codeia.cl:2083"
echo "   - FTP: ftp.codeia.cl"
echo "   - Webmail: http://codeia.cl/webmail" 