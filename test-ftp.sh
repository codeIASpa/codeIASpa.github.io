#!/bin/bash

# Script de Prueba de Conectividad FTP - CodeIA
# Verifica la conectividad antes del despliegue

echo "🔍 Probando conectividad FTP para CodeIA..."

# Cargar variables de entorno
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuración (con fallbacks)
SERVER_IP="${SERVER_IP:-201.148.104.27}"
FTP_USER="${FTP_USER:-codeiacl}"
FTP_PASS="${FTP_PASSWORD:-849yAVz.f9I@fG}"
FTP_PORT="${FTP_PORT:-21}"
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

# Mostrar configuración
log "Configuración FTP:"
echo "   - Host: $SERVER_IP"
echo "   - Usuario: $FTP_USER"
echo "   - Puerto: $FTP_PORT"
echo "   - Directorio remoto: $REMOTE_DIR"

# Paso 1: Verificar conectividad básica
log "Paso 1: Verificando conectividad básica..."
if ping -c 3 $SERVER_IP > /dev/null 2>&1; then
    success "✅ Servidor accesible via ping"
else
    warning "⚠️  No se puede hacer ping al servidor (puede estar bloqueado)"
fi

# Paso 2: Verificar puerto FTP
log "Paso 2: Verificando puerto FTP..."
if nc -z $SERVER_IP $FTP_PORT 2>/dev/null; then
    success "✅ Puerto $FTP_PORT abierto"
else
    error "❌ Puerto $FTP_PORT cerrado o no accesible"
    exit 1
fi

# Paso 3: Verificar si lftp está instalado
log "Paso 3: Verificando lftp..."
if ! command -v lftp &> /dev/null; then
    warning "lftp no está instalado. Instalando..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            brew install lftp
        else
            error "Homebrew no está instalado. Instala lftp manualmente: brew install lftp"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update && sudo apt-get install -y lftp
    else
        error "Sistema operativo no soportado para instalación automática de lftp"
        exit 1
    fi
else
    success "✅ lftp está instalado"
fi

# Paso 4: Probar conexión FTP
log "Paso 4: Probando conexión FTP..."

# Crear script de prueba temporal
cat > .test-ftp.lftp << EOF
set ssl:verify-certificate no
set ftp:ssl-allow no
set ftp:passive-mode on
set net:timeout 10
set net:max-retries 2

open -u $FTP_USER,$FTP_PASS -p $FTP_PORT $SERVER_IP
pwd
ls -la
cd $REMOTE_DIR
pwd
ls -la
bye
EOF

# Ejecutar prueba
log "Conectando al servidor FTP..."
if lftp -f .test-ftp.lftp > .ftp-test.log 2>&1; then
    success "✅ Conexión FTP exitosa"
    log "Contenido del directorio remoto:"
    cat .ftp-test.log | grep -E "^-|^d" | head -10
else
    error "❌ Error en la conexión FTP"
    log "Log de error:"
    cat .ftp-test.log
    rm -f .test-ftp.lftp .ftp-test.log
    exit 1
fi

# Limpiar archivos temporales
rm -f .test-ftp.lftp .ftp-test.log

# Paso 5: Verificar que el build existe
log "Paso 5: Verificando build local..."
if [ -d "dist" ]; then
    BUILD_SIZE=$(du -sh dist | cut -f1)
    BUILD_FILES=$(find dist -type f | wc -l)
    success "✅ Build encontrado: $BUILD_SIZE ($BUILD_FILES archivos)"
else
    warning "⚠️  No se encontró el directorio dist"
    log "Ejecuta 'npm run build:optimized' primero"
fi

echo ""
success "🎉 ¡Prueba de conectividad completada!"
log "El servidor FTP está listo para el despliegue."
log "Ejecuta 'npm run deploy:robust' para desplegar." 