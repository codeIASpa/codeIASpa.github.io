# 🚀 Guía de Despliegue Automatizado - CodeIA

Esta guía te ayudará a automatizar el proceso de despliegue de tu sitio web CodeIA al hosting.

## 🔐 Configuración Segura

### Paso 1: Configurar Variables de Entorno
```bash
# Ejecutar el script de configuración
npm run setup:env
```

Este comando creará automáticamente el archivo `.env` con las credenciales del servidor.

### Paso 2: Verificar Configuración
El archivo `.env` contendrá:
- **Servidor:** 201.148.104.27
- **Usuario FTP:** codeiacl
- **Password:** [configurado automáticamente]
- **Directorio remoto:** /public_html

⚠️ **Importante:** El archivo `.env` está en `.gitignore` y NO se subirá a GitHub.  

### Accesos Temporales (antes del DNS):
- **Panel DA:** http://201.148.104.27:2083
- **FTP:** 201.148.104.27

### Accesos Definitivos (después del DNS):
- **Panel DA:** http://codeia.cl:2083
- **FTP:** ftp.codeia.cl
- **Webmail:** http://codeia.cl/webmail

## 🛠️ Scripts de Despliegue Disponibles

### 1. Script Principal (Recomendado) - `deploy.js`
```bash
node deploy.js
```

**Características:**
- ✅ Verificación automática de dependencias
- ✅ Build automático del proyecto
- ✅ Subida FTP con progress tracking
- ✅ Verificación del despliegue
- ✅ Estadísticas detalladas
- ✅ Manejo de errores robusto

### 2. Script Bash Avanzado - `deploy.sh`
```bash
./deploy.sh
```

**Características:**
- ✅ Instalación automática de lftp
- ✅ Colores en terminal
- ✅ Backup automático
- ✅ Verificación de conectividad

### 3. Script Bash Simple - `deploy-simple.sh`
```bash
./deploy-simple.sh
```

**Características:**
- ✅ Usa curl (más compatible)
- ✅ Proceso simplificado
- ✅ Menos dependencias externas

## 📦 Instalación de Dependencias

### Para el script de Node.js:
```bash
npm install basic-ftp --save-dev
```

### Para el script bash avanzado:
```bash
# macOS
brew install lftp

# Linux (Ubuntu/Debian)
sudo apt-get update && sudo apt-get install -y lftp
```

## 🔧 Uso Rápido

### Despliegue Completo Optimizado (Recomendado):
```bash
# 1. Asegúrate de estar en el directorio del proyecto
cd /Users/devjaime/Documents/codeIASpa.github.io

# 2. Ejecuta el script de despliegue optimizado
npm run deploy:robust
```

### Optimización Manual:
```bash
# Solo optimizar el build (sin desplegar)
npm run optimize

# Build + Optimización (sin desplegar)
npm run build:optimized
```

### Despliegue Manual (Si prefieres control total):
```bash
# 1. Build del proyecto
npm run build

# 2. Subir archivos manualmente via FTP
# Usar cualquier cliente FTP con los datos del servidor
```

## 📊 Proceso de Despliegue

El script automatizado realiza los siguientes pasos:

1. **🔍 Verificación de Dependencias**
   - Verifica que estés en el directorio correcto
   - Instala dependencias si es necesario

2. **🏗️ Build del Proyecto**
   - Limpia builds anteriores
   - Ejecuta `npm run build`
   - Verifica que el build se creó correctamente

3. **📤 Subida al Servidor**
   - Conecta al servidor FTP
   - Sube todos los archivos del directorio `dist/`
   - Muestra progreso en tiempo real

4. **✅ Verificación**
   - Verifica que el sitio esté funcionando
   - Muestra estadísticas del despliegue

5. **📈 Estadísticas**
   - Número de archivos subidos
   - Tamaño total
   - Fecha y hora del despliegue

## 🚨 Solución de Problemas

### Error: "No se encontró package.json"
```bash
# Asegúrate de estar en el directorio raíz del proyecto
cd /Users/devjaime/Documents/codeIASpa.github.io
```

### Error: "Error al instalar dependencias"
```bash
# Limpia la caché de npm
npm cache clean --force
npm install
```

### Error: "Error durante la subida"
```bash
# Verifica la conectividad al servidor
ping 201.148.104.27

# Verifica las credenciales FTP
# Usuario: codeiacl
# Password: 849yAVz.f9I@fG
```

### Error: "lftp no está instalado"
```bash
# macOS
brew install lftp

# Linux
sudo apt-get update && sudo apt-get install -y lftp
```

## 🔄 Flujo de Trabajo Recomendado

1. **Desarrollo Local:**
   ```bash
   npm run dev
   ```

2. **Commit de Cambios:**
   ```bash
   git add .
   git commit -m "feat: descripción de los cambios"
   git push origin main
   ```

3. **Despliegue Automático:**
   ```bash
   node deploy.js
   ```

4. **Verificación:**
   - Visita http://201.148.104.27
   - Verifica que los cambios estén aplicados

## 📝 Notas Importantes

- **Backup:** El script crea backups automáticos antes de cada despliegue
- **Seguridad:** Las credenciales están en el script, mantén el repositorio privado
- **DNS:** Una vez que codeia.cl apunte al servidor, actualiza las URLs en el script
- **Frecuencia:** Puedes ejecutar el script tantas veces como necesites

## 🎯 URLs Importantes

- **Sitio Web:** http://201.148.104.27 (temporal) → http://codeia.cl (definitivo)
- **Panel de Control:** http://201.148.104.27:2083 → http://codeia.cl:2083
- **FTP:** 201.148.104.27 → ftp.codeia.cl
- **Webmail:** http://codeia.cl/webmail

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa los logs del script
2. Verifica la conectividad al servidor
3. Confirma las credenciales FTP
4. Contacta al soporte del hosting si persisten los problemas

---

**¡Happy Deploying! 🚀** 