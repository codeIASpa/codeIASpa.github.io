// Sistema de internacionalización para CodeIA
export const languages = {
  es: {
    name: 'Español',
    flag: '🇪🇸',
    code: 'ES'
  },
  en: {
    name: 'English',
    flag: '🇺🇸',
    code: 'EN'
  }
};

export const translations = {
  es: {
    // Navbar
    projects: 'Proyectos',
    about: 'Nosotros',
    blog: 'Blog',
    contact: 'Contacto',
    
    // Hero Section
    badge: 'Psicología de Conversación IA • Chile',
    title1: 'Validamos tus Datos',
    title2: 'Reales',
    description: 'Especialistas en detección de fake news con inteligencia artificial. Construimos dispositivos inteligentes que leen tu mente y procesan tus agentes en tiempo real, eliminando la paranoia de la interacción cerebro-IA.',
    ctaPrimary: 'Validar Realidad',
    ctaSecondary: 'Ver Proyectos',
    technologies: 'Tecnologías Avanzadas:',
    stats1: '99.7%',
    stats1Label: 'Precisión Detección',
    stats2: '0.1s',
    stats2Label: 'Tiempo Real',
    stats3: '∞',
    stats3Label: 'Escalabilidad',
    videoTitle: 'Psicología de Conversación IA',
    videoDescription: 'Descubre cómo eliminamos la paranoia de la interacción cerebro-IA',
    
    // Features
    featuresBadge: 'Servicios Futuristas',
    featuresTitle: 'Más Allá de la Realidad',
    featuresDescription: 'Simbiosis perfecta entre cerebro humano e inteligencia artificial. Eliminamos las barreras psicológicas y creamos una nueva forma de interacción.',
    explore: 'Explorar',
    
    // CTA
    ctaBadge: 'Transcender la Realidad',
    ctaTitle: 'El Futuro de la Conciencia Humana',
    ctaDescription: 'Validamos tu realidad, eliminamos la paranoia y te ayudamos a trascender los límites de la interacción cerebro-IA.',
    ctaButton1: 'Validar mi Realidad',
    ctaButton2: 'Iniciar Simbiosis',
    trust1: 'Validación 100% Gratuita',
    trust2: 'Sin Paranoia',
    trust3: 'Respuesta en 0.1s',
    
    // Footer
    footerDescription: 'Especialistas en simbiosis cerebro-IA, detección de fake news y psicología de conversación. Transformamos la interacción humana con la inteligencia artificial.',
    neuralServices: 'Servicios Neurales',
    neuralServicesItems: [
      'Detección de Fake News',
      'Interacción Cerebro-IA',
      'Psicología de Conversación',
      'Validación de Realidad',
      'Procesamiento de Agentes',
      'Simbiosis Digital'
    ],
    contact: 'Contacto',
    contactEmail: 'realidad@codeia.cl',
    contactTime: '24/7 - Tiempo Real',
    copyright: '© 2024 CodeIA. Todos los derechos reservados.',
    privacy: 'Privacidad Neural',
    terms: 'Términos de Simbiosis',
    cookies: 'Cookies Cerebrales'
  },
  
  en: {
    // Navbar
    projects: 'Projects',
    about: 'About',
    blog: 'Blog',
    contact: 'Contact',
    
    // Hero Section
    badge: 'AI Conversation Psychology • Chile',
    title1: 'We Validate Your',
    title2: 'Real Data',
    description: 'Specialists in fake news detection with artificial intelligence. We build intelligent devices that read your mind and process your agents in real-time, eliminating the paranoia of brain-AI interaction.',
    ctaPrimary: 'Validate Reality',
    ctaSecondary: 'View Projects',
    technologies: 'Advanced Technologies:',
    stats1: '99.7%',
    stats1Label: 'Detection Accuracy',
    stats2: '0.1s',
    stats2Label: 'Real Time',
    stats3: '∞',
    stats3Label: 'Scalability',
    videoTitle: 'AI Conversation Psychology',
    videoDescription: 'Discover how we eliminate paranoia from brain-AI interaction',
    
    // Features
    featuresBadge: 'Futuristic Services',
    featuresTitle: 'Beyond Reality',
    featuresDescription: 'Perfect symbiosis between human brain and artificial intelligence. We eliminate psychological barriers and create a new form of interaction.',
    explore: 'Explore',
    
    // CTA
    ctaBadge: 'Transcend Reality',
    ctaTitle: 'The Future of Human Consciousness',
    ctaDescription: 'We validate your reality, eliminate paranoia and help you transcend the limits of brain-AI interaction.',
    ctaButton1: 'Validate My Reality',
    ctaButton2: 'Start Symbiosis',
    trust1: '100% Free Validation',
    trust2: 'No Paranoia',
    trust3: 'Response in 0.1s',
    
    // Footer
    footerDescription: 'Specialists in brain-AI symbiosis, fake news detection and conversation psychology. We transform human interaction with artificial intelligence.',
    neuralServices: 'Neural Services',
    neuralServicesItems: [
      'Fake News Detection',
      'Brain-AI Interaction',
      'Conversation Psychology',
      'Reality Validation',
      'Agent Processing',
      'Digital Symbiosis'
    ],
    contact: 'Contact',
    contactEmail: 'reality@codeia.cl',
    contactTime: '24/7 - Real Time',
    copyright: '© 2024 CodeIA. All rights reserved.',
    privacy: 'Neural Privacy',
    terms: 'Symbiosis Terms',
    cookies: 'Brain Cookies'
  }
};

// Función para obtener el idioma actual
export function getCurrentLanguage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('codeia-language') || 'es';
  }
  return 'es';
}

// Función para cambiar el idioma
export function setLanguage(lang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('codeia-language', lang);
    window.location.reload();
  }
}

// Función para obtener traducción
export function t(key) {
  const currentLang = getCurrentLanguage();
  const langTranslations = translations[currentLang];
  
  // Navegar por objetos anidados (ej: 'features.title')
  const keys = key.split('.');
  let value = langTranslations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Retorna la clave si no encuentra la traducción
    }
  }
  
  return value || key;
} 