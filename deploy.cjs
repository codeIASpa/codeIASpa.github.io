#!/usr/bin/env node

/**
 * Script de Despliegue Automatizado - CodeIA
 * Autor: Jaime Hernandez
 * 
 * Uso: node deploy.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ftp = require('basic-ftp');

// Cargar variables de entorno
require('dotenv').config();

// Configuración del servidor
const CONFIG = {
    server: process.env.SERVER_IP || '201.148.104.27',
    user: process.env.FTP_USER || 'codeiacl',
    password: process.env.FTP_PASSWORD || '849yAVz.f9I@fG',
    remoteDir: process.env.REMOTE_DIR || '/public_html',
    localDir: './dist'
};

// Colores para console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'green') {
    console.log(`${colors[color]}[${new Date().toLocaleTimeString()}]${colors.reset} ${message}`);
}

function error(message) {
    console.error(`${colors.red}[ERROR]${colors.reset} ${message}`);
    process.exit(1);
}

function warning(message) {
    console.warn(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
}

async function checkDependencies() {
    log('Verificando dependencias...', 'blue');
    
    if (!fs.existsSync('package.json')) {
        error('No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto.');
    }
    
    if (!fs.existsSync('node_modules')) {
        warning('node_modules no encontrado. Instalando dependencias...');
        try {
            execSync('npm install', { stdio: 'inherit' });
            log('Dependencias instaladas correctamente', 'green');
        } catch (err) {
            error('Error al instalar dependencias');
        }
    }
}

async function buildProject() {
    log('Ejecutando build del proyecto...', 'blue');
    
    try {
        // Limpiar build anterior
        if (fs.existsSync('dist')) {
            fs.rmSync('dist', { recursive: true, force: true });
            log('Build anterior eliminado', 'yellow');
        }
        
        // Ejecutar build
        execSync('npm run build', { stdio: 'inherit' });
        log('Build completado exitosamente', 'green');
        
        // Verificar que el build se creó
        if (!fs.existsSync('dist')) {
            error('No se encontró el directorio dist después del build');
        }
        
    } catch (err) {
        error('Error durante el build');
    }
}

async function uploadToServer() {
    log('Iniciando subida de archivos al servidor...', 'blue');
    
    const client = new ftp.Client();
    client.ftp.verbose = false;
    
    try {
        await client.access({
            host: CONFIG.server,
            user: CONFIG.user,
            password: CONFIG.password,
            secure: false
        });
        
        log('Conectado al servidor FTP', 'green');
        
        // Cambiar al directorio remoto
        await client.ensureDir(CONFIG.remoteDir);
        log(`Cambiado a directorio: ${CONFIG.remoteDir}`, 'blue');
        
        // Subir archivos
        log('Subiendo archivos...', 'blue');
        await client.uploadFromDir(CONFIG.localDir);
        
        log('Archivos subidos exitosamente', 'green');
        
    } catch (err) {
        error(`Error durante la subida: ${err.message}`);
    } finally {
        client.close();
    }
}

async function verifyDeployment() {
    log('Verificando despliegue...', 'blue');
    
    // Esperar un poco para que el servidor procese los archivos
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
        const http = require('http');
        const options = {
            hostname: CONFIG.server,
            port: 80,
            path: '/',
            method: 'GET',
            timeout: 5000
        };
        
        const req = http.request(options, (res) => {
            if (res.statusCode === 200) {
                log('✅ Sitio web desplegado y funcionando correctamente', 'green');
            } else {
                warning(`⚠️  El sitio responde con código ${res.statusCode}`);
            }
        });
        
        req.on('error', () => {
            warning('⚠️  No se pudo verificar el sitio. Puede tardar unos minutos en estar disponible.');
        });
        
        req.on('timeout', () => {
            warning('⚠️  Timeout al verificar el sitio.');
        });
        
        req.end();
        
    } catch (err) {
        warning('⚠️  Error al verificar el despliegue');
    }
}

function showStats() {
    log('📊 Estadísticas del despliegue:', 'cyan');
    
    try {
        const fileCount = execSync('find dist -type f | wc -l', { encoding: 'utf8' }).trim();
        const size = execSync('du -sh dist', { encoding: 'utf8' }).trim().split('\t')[0];
        
        console.log(`   - Archivos en dist: ${fileCount}`);
        console.log(`   - Tamaño total: ${size}`);
        console.log(`   - Fecha de despliegue: ${new Date().toLocaleString()}`);
        console.log(`   - Servidor: ${CONFIG.server}`);
        
    } catch (err) {
        warning('No se pudieron obtener estadísticas');
    }
}

async function main() {
    console.log(`${colors.cyan}${colors.bright}🚀 Iniciando proceso de despliegue automático de CodeIA...${colors.reset}\n`);
    
    try {
        await checkDependencies();
        await buildProject();
        await uploadToServer();
        await verifyDeployment();
        showStats();
        
        console.log(`\n${colors.green}${colors.bright}🎉 ¡Despliegue completado exitosamente!${colors.reset}`);
        console.log(`${colors.blue}Tu sitio web está disponible en: http://${CONFIG.server}${colors.reset}`);
        console.log(`${colors.blue}Panel de control: http://${CONFIG.server}:2083${colors.reset}`);
        
        console.log(`\n${colors.yellow}Recordatorio: Una vez que codeia.cl apunte a los servidores, podrás usar:${colors.reset}`);
        console.log('   - Panel DA: http://codeia.cl:2083');
        console.log('   - FTP: ftp.codeia.cl');
        console.log('   - Webmail: http://codeia.cl/webmail');
        
    } catch (err) {
        error(`Error en el proceso de despliegue: ${err.message}`);
    }
}

// Ejecutar el script
if (require.main === module) {
    main();
}

module.exports = { main, CONFIG }; 