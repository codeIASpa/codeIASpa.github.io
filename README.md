# 🚀 CodeIA - Sitio Web Oficial

Sitio web oficial de CodeIA, desarrollado con Astro y optimizado para rendimiento y experiencia de usuario.

## ✨ Características

- 🌐 **Multilingüe:** Soporte completo para español e inglés
- 📱 **Responsive:** Diseño adaptativo para todos los dispositivos
- ⚡ **Rápido:** Optimizado para máxima velocidad de carga
- 🎨 **Moderno:** Interfaz elegante y profesional
- 🔄 **Automático:** Sistema de despliegue completamente automatizado

## 🛠️ Tecnologías

- **Framework:** Astro 4.x
- **Styling:** Tailwind CSS
- **Lenguajes:** TypeScript, JavaScript
- **Despliegue:** FTP automatizado con optimización

## 🚀 Despliegue Automatizado

El proyecto incluye un sistema completo de despliegue automatizado:

### Comandos Principales

```bash
# Verificar conectividad FTP
npm run test:ftp

# Despliegue completo (recomendado)
npm run deploy:robust

# Solo optimizar build
npm run build:optimized
```

### Características del Despliegue

- ✅ **Verificación automática** de conectividad FTP
- ✅ **Optimización de build** (99.8% de reducción de tamaño)
- ✅ **Sincronización inteligente** de archivos
- ✅ **Manejo robusto de errores**
- ✅ **Logs detallados** del proceso

Para más información, consulta [DEPLOY.md](./DEPLOY.md).

## 🏃‍♂️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Build optimizado
npm run build:optimized
```

## 🌐 Acceso

- **Desarrollo:** http://localhost:4321
- **Producción:** http://codeia.cl (después del DNS)

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── layouts/        # Layouts de página
├── pages/          # Páginas del sitio
├── utils/          # Utilidades (i18n, etc.)
└── styles/         # Estilos globales
```

## 🔧 Configuración

### Variables de Entorno

El proyecto usa un archivo `.env` para configurar el despliegue:

```env
SERVER_IP=201.148.104.27
FTP_USER=codeiacl
FTP_PASSWORD=tu_password
FTP_PORT=21
REMOTE_DIR=/public_html
```

**⚠️ Importante:** El archivo `.env` está excluido de Git por seguridad.

## 📊 Optimización

El sistema de build optimizado:

- **Elimina archivos innecesarios** (demo, blogimg, imágenes grandes)
- **Reduce el tamaño** de ~306MB a ~612KB
- **Mantiene solo archivos esenciales** para producción
- **Mejora significativamente** los tiempos de carga

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para problemas técnicos o soporte:
- Revisa la documentación en [DEPLOY.md](./DEPLOY.md)
- Ejecuta `npm run test:ftp` para diagnosticar problemas de conectividad
- Verifica la configuración en el archivo `.env`

---

**¡CodeIA - Innovación Tecnológica al Alcance de Todos! 🚀✨**
