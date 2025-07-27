# 🚀 Guía de Despliegue Automatizado - CodeIA

Esta guía te ayudará a desplegar automáticamente el sitio web de CodeIA a tu servidor de hosting.

## 📋 Prerrequisitos

- Node.js instalado
- Acceso FTP al servidor de hosting
- Credenciales FTP (usuario, contraseña, servidor, puerto)

## 🔧 Configuración Inicial

### 1. Configurar Variables de Entorno

Ejecuta el script de configuración para crear el archivo `.env` con tus credenciales:

```bash
npm run setup:env
```

Este comando creará un archivo `.env` con la siguiente estructura:

```env
SERVER_IP=201.148.104.27
FTP_USER=codeiacl
FTP_PASSWORD=849yAVz.f9I@fG
FTP_PORT=21
REMOTE_DIR=/public_html
```

**⚠️ Importante:** El archivo `.env` está en `.gitignore` para mantener las credenciales seguras.

### 2. Verificar Conectividad

Antes de desplegar, verifica que la conectividad FTP funcione correctamente:

```bash
npm run test:ftp
```

Este comando realiza una verificación completa:

#### ✅ Verificaciones Automáticas:
- **Conectividad básica:** Ping al servidor
- **Puerto FTP:** Verifica que el puerto 21 esté abierto
- **lftp:** Instala automáticamente si no está disponible
- **Conexión FTP:** Prueba la conexión real al servidor
- **Build local:** Verifica que exista el directorio `dist/`

#### 📊 Información Mostrada:
- Configuración FTP actual
- Tamaño del build local
- Contenido del directorio remoto
- Estado de cada verificación

## 🚀 Despliegue

### Opción 1: Despliegue Robusto (Recomendado)

```bash
npm run deploy:robust
```

Este comando ejecuta un proceso completo:

1. **Construcción optimizada:** `npm run build:optimized`
2. **Optimización automática:** Elimina archivos innecesarios
3. **Conexión FTP:** Usa `lftp` con configuración robusta
4. **Sincronización:** Sube archivos y elimina obsoletos
5. **Logs detallados:** Proporciona información completa del proceso

#### ⚙️ Configuración lftp:
- Modo pasivo habilitado
- Reintentos automáticos (3 intentos)
- Timeouts configurados
- Sincronización paralela (3 archivos simultáneos)

### Opción 2: Despliegue Simple

```bash
npm run deploy:simple
```

Usa `curl` para subir archivos individuales (más lento pero más simple).

### Opción 3: Despliegue con Node.js

```bash
npm run deploy
```

Usa la librería `basic-ftp` de Node.js.

## 📊 Optimización de Build

El comando `npm run build:optimized` automáticamente:

1. **Construye el proyecto:** `npm run build`
2. **Optimiza el build:** `npm run optimize` elimina:
   - Directorios `demo/` y `blogimg/`
   - Imágenes grandes (`opengraph.jpg`, `opengraph1.jpg`)
   - Archivos de desarrollo innecesarios

#### 📈 Resultados de Optimización:
- **Antes:** ~306MB (archivos innecesarios)
- **Después:** ~612KB (solo archivos necesarios)
- **Reducción:** ~99.8% del tamaño original

## 🔍 Solución de Problemas

### Error de Conexión FTP

Si encuentras errores de conexión:

1. **Verifica credenciales:** Revisa el archivo `.env`
2. **Prueba conectividad:** `npm run test:ftp`
3. **Verifica puerto:** Asegúrate de que el puerto 21 esté abierto
4. **Estado del servidor:** Confirma que el hosting esté activo

### Error de Permisos

Si hay problemas de permisos:

```bash
chmod +x deploy-robust.sh
chmod +x test-ftp.sh
chmod +x optimize-build.sh
```

### Build Muy Grande

Si el build sigue siendo grande:

```bash
npm run optimize
```

Esto eliminará archivos innecesarios manualmente.

### Error "response reading failed (errno: 36)"

Este error indica problemas de estabilidad de conexión:

1. **Usa el script robusto:** `npm run deploy:robust`
2. **Verifica conectividad:** `npm run test:ftp`
3. **Alternativa manual:** Usa FileZilla como respaldo

## 📝 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run setup:env` | Configura variables de entorno |
| `npm run test:ftp` | **NUEVO:** Prueba conectividad FTP completa |
| `npm run build:optimized` | Construye y optimiza automáticamente |
| `npm run deploy:robust` | **RECOMENDADO:** Despliegue robusto con lftp |
| `npm run deploy:simple` | Despliegue simple con curl |
| `npm run deploy` | Despliegue con Node.js |
| `npm run optimize` | Optimiza build manualmente |

## 🔒 Seguridad

- **Credenciales seguras:** Almacenadas en `.env` (excluido de Git)
- **Permisos restrictivos:** Archivo `.env` con permisos 600
- **Verificación previa:** Scripts verifican conectividad antes del despliegue
- **Conexiones seguras:** FTP pasivo para mayor compatibilidad
- **Logs seguros:** No se muestran credenciales en los logs

## 🌐 Acceso al Sitio

Una vez desplegado, el sitio estará disponible en:

### 🔗 URLs de Acceso:
- **Antes del cambio de DNS:** http://201.148.104.27/~codeiacl/
- **Después del cambio de DNS:** http://codeia.cl/

### 📧 Información del Hosting:
- **Panel de Control:** http://201.148.104.27:2083
- **FTP:** ftp.codeia.cl (después del DNS)
- **Webmail:** http://codeia.cl/webmail

## 🎯 Flujo de Trabajo Recomendado

1. **Desarrollo:** `npm run dev`
2. **Pruebas:** Verificar cambios localmente
3. **Verificación:** `npm run test:ftp`
4. **Despliegue:** `npm run deploy:robust`
5. **Verificación:** Comprobar el sitio en vivo

## 📦 Instalación de Dependencias

### Para el script de Node.js:
```bash
npm install basic-ftp dotenv --save-dev
```

### Para el script bash avanzado:
```bash
# macOS
brew install lftp

# Linux (Ubuntu/Debian)
sudo apt-get update && sudo apt-get install -y lftp
```

## 🔄 Flujo de Trabajo Completo

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

3. **Verificación de Conectividad:**
   ```bash
   npm run test:ftp
   ```

4. **Despliegue Automático:**
   ```bash
   npm run deploy:robust
   ```

5. **Verificación:**
   - Visita http://201.148.104.27/~codeiacl/
   - Verifica que los cambios estén aplicados

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Ejecuta `npm run test:ftp` para diagnosticar
2. Revisa los logs del script de despliegue
3. Verifica la conectividad al servidor
4. Confirma las credenciales FTP en `.env`
5. Contacta al soporte del hosting si persisten los problemas

---

**¡El sitio está completamente automatizado y listo para despliegues rápidos y seguros! 🚀✨** 