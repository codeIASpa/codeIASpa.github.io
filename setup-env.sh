#!/bin/bash

# Script para configurar el archivo .env
# ⚠️ Este script creará el archivo .env con las credenciales reales

echo "🔧 Configurando archivo .env para CodeIA..."

# Verificar si .env ya existe
if [ -f .env ]; then
    echo "⚠️  El archivo .env ya existe. ¿Quieres sobrescribirlo? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Operación cancelada."
        exit 0
    fi
fi

# Crear archivo .env con las credenciales reales
cat > .env << 'EOF'
# Configuración del Servidor - CodeIA
# ⚠️ NO COMPARTIR ESTE ARCHIVO - Contiene credenciales sensibles

# Información del Servidor
SERVER_IP=201.148.104.27
FTP_HOST=201.148.104.27
FTP_USER=codeiacl
FTP_PASSWORD=849yAVz.f9I@fG
REMOTE_DIR=/public_html

# URLs del Servidor
PANEL_DA_TEMP=http://201.148.104.27:2083
PANEL_DA_FINAL=http://codeia.cl:2083
FTP_FINAL=ftp.codeia.cl
WEBMAIL=http://codeia.cl/webmail

# Configuración de Correo
MAIL_SERVER=mail.codeia.cl
DNS_PRIMARY=dns3.dehosting.net
DNS_SECONDARY=dns4.dehosting.net

# Configuración del Proyecto
PROJECT_NAME=CodeIA
PROJECT_VERSION=1.0.0
EOF

# Establecer permisos seguros
chmod 600 .env

echo "✅ Archivo .env creado exitosamente"
echo "🔒 Permisos de seguridad aplicados (600)"
echo ""
echo "📋 Información configurada:"
echo "   - Servidor: 201.148.104.27"
echo "   - Usuario FTP: codeiacl"
echo "   - Directorio remoto: /public_html"
echo ""
echo "🚀 Ahora puedes ejecutar: npm run deploy" 