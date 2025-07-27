#!/bin/bash

# Script de Optimización de Build - CodeIA
# Elimina archivos innecesarios para reducir el tamaño del build

echo "🔧 Optimizando build de CodeIA..."

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

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

# Verificar que existe el directorio dist
if [ ! -d "dist" ]; then
    error "No se encontró el directorio dist. Ejecuta 'npm run build' primero."
    exit 1
fi

# Mostrar tamaño inicial
log "Analizando tamaño inicial del build..."
INITIAL_SIZE=$(du -sh dist | cut -f1)
INITIAL_FILES=$(find dist -type f | wc -l)
echo "   Tamaño inicial: $INITIAL_SIZE"
echo "   Archivos iniciales: $INITIAL_FILES"

# Lista de directorios y archivos a eliminar
log "Identificando archivos innecesarios..."

# Directorios de demo (no utilizados en producción)
DEMO_DIRS=(
    "dist/demo"
    "dist/blogimg"
)

# Archivos de imagen grandes que no se usan
LARGE_IMAGES=(
    "dist/opengraph.jpg"
    "dist/opengraph1.jpg"
)

# Verificar y eliminar directorios de demo
for dir in "${DEMO_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        DIR_SIZE=$(du -sh "$dir" | cut -f1)
        log "Eliminando directorio: $dir (tamaño: $DIR_SIZE)"
        rm -rf "$dir"
        success "✅ Eliminado: $dir"
    fi
done

# Verificar y eliminar imágenes grandes
for img in "${LARGE_IMAGES[@]}"; do
    if [ -f "$img" ]; then
        IMG_SIZE=$(du -sh "$img" | cut -f1)
        log "Eliminando imagen: $img (tamaño: $IMG_SIZE)"
        rm -f "$img"
        success "✅ Eliminado: $img"
    fi
done

# Verificar si hay otros archivos grandes
log "Buscando otros archivos grandes..."
find dist -type f -size +1M -exec ls -lh {} \; 2>/dev/null | head -10

# Mostrar tamaño final
log "Analizando tamaño final del build..."
FINAL_SIZE=$(du -sh dist | cut -f1)
FINAL_FILES=$(find dist -type f | wc -l)
SAVED_SIZE=$(echo "scale=2; $(du -s dist | cut -f1) / 1024" | bc 2>/dev/null || echo "N/A")

echo ""
success "📊 Resultados de la optimización:"
echo "   Tamaño inicial: $INITIAL_SIZE"
echo "   Tamaño final: $FINAL_SIZE"
echo "   Archivos iniciales: $INITIAL_FILES"
echo "   Archivos finales: $FINAL_FILES"

# Calcular ahorro
if [ "$SAVED_SIZE" != "N/A" ]; then
    SAVED_MB=$(echo "scale=1; $SAVED_SIZE" | bc)
    echo "   Espacio ahorrado: ~${SAVED_MB}MB"
fi

# Mostrar estructura final
log "Estructura final del build:"
du -sh dist/* | sort -hr

echo ""
success "🎉 ¡Optimización completada!"
log "El build está listo para ser desplegado con un tamaño optimizado." 