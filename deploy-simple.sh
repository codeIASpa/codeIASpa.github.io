#!/bin/bash

# Script de Despliegue Simple - CodeIA
# Usando curl para FTP (más compatible)

echo "🚀 Despliegue Simple de CodeIA..."

# Cargar variables de entorno
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuración (con fallbacks)
SERVER_IP="${SERVER_IP:-201.148.104.27}"
FTP_USER="${FTP_USER:-codeiacl}"
FTP_PASS="${FTP_PASSWORD:-849yAVz.f9I@fG}"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
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

# Verificar dependencias
if [ ! -f "package.json" ]; then
    error "No se encontró package.json"
    exit 1
fi

# Build del proyecto
log "Ejecutando build..."
npm run build

if [ $? -ne 0 ]; then
    error "Error en el build"
    exit 1
fi

log "Build completado"

# Crear archivo de configuración FTP para curl
cat > .netrc << EOF
machine $SERVER_IP
login $FTP_USER
password $FTP_PASS
EOF

chmod 600 .netrc

# Función para subir archivos recursivamente
upload_directory() {
    local local_dir="$1"
    local remote_dir="$2"
    
    for file in "$local_dir"/*; do
        if [ -f "$file" ]; then
            local filename=$(basename "$file")
            log "Subiendo: $filename"
            
            curl -T "$file" "ftp://$SERVER_IP$remote_dir/$filename" --netrc
        elif [ -d "$file" ]; then
            local dirname=$(basename "$file")
            log "Creando directorio: $dirname"
            
            # Crear directorio remoto
            curl -Q "MKD $remote_dir/$dirname" "ftp://$SERVER_IP" --netrc
            
            # Subir contenido del directorio
            upload_directory "$file" "$remote_dir/$dirname"
        fi
    done
}

# Subir archivos
log "Iniciando subida de archivos..."
upload_directory "dist" "/public_html"

# Limpiar archivo de configuración
rm .netrc

log "✅ Despliegue completado"
log "Sitio disponible en: http://$SERVER_IP" 