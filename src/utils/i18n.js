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
    cookies: 'Cookies Cerebrales',
    
    // Blog
    blogDescription: 'Escribimos sobre nuestros proyectos tecnológicos y los pensamientos que rondan por nuestra mente.',
    
    // Contact
    contactDescription: 'Estamos aquí para ayudar.',
    contactResponse: 'Te responderemos en menos de 24 horas.',
    contactAddress: 'ANTONIO BELLET 193 OF 1210, Providencia',
    
    // Features
    featuresBadge: 'Servicios Futuristas',
    featuresTitle1: 'Más Allá de la',
    featuresTitle2: 'Realidad',
    featuresDescription: 'Construimos el puente entre la mente humana y la inteligencia artificial, creando experiencias que trascienden la realidad convencional y eliminan las barreras psicológicas de la interacción cerebro-IA.',
    explore: 'Explorar',
    featuresCTA: '¿Listo para Transcender la Realidad?',
    featuresCTADescription: 'Descubre cómo la simbiosis cerebro-IA puede amplificar tu conciencia y eliminar la paranoia de la interacción con inteligencia artificial.',
    validateReality: 'Validar Realidad',
    startConversation: 'Iniciar Conversación',
    
    // Projects
    projectsBadge: 'Proyectos Destacados de Innovación Tecnológica',
    projectsTitle: 'Proyectos Destacados de Innovación Tecnológica',
    projectsDescription: 'Explora algunos de los proyectos en los que estamos trabajando activamente en CodeIA, cada uno con un enfoque técnico sólido, animaciones envolventes y un flujo visual optimizado para comunicar ideas complejas de forma clara y atractiva:',
    project1Title: 'Verificador de Fake News para LLMs',
    project1Objective: 'Objetivo:',
    project1ObjectiveText: 'Diseñar un sistema de validación de datos que permita a los modelos de lenguaje evitar alucinaciones (alucinaciones de IA) al generar respuestas.',
    project1Technology: 'Tecnología:',
    project1TechnologyText: 'LangChain, LlamaIndex, PostgreSQL, RAG (Retrieval Augmented Generation).',
    project1Animation: 'Animación: flujo de verificación desde Twitter/Perplexity → Análisis semántico → Confirmación en fuentes oficiales → Respuesta segura del LLM.',
    project1AnimationPlaceholder: 'Flujo de Verificación de Fake News',
    project2Title: 'FlippyApp: Aseo y Reparaciones para Propiedades Airbnb',
    project2Objective: 'Objetivo:',
    project2ObjectiveText: 'Automatizar y mejorar la coordinación de limpieza y mantenimiento en propiedades de arriendo temporal.',
    project2Technology: 'Tecnología:',
    project2TechnologyText: 'Flutter, Firebase, Python backend, flujos MCP (Multi Component Programming).',
    project2Animation: 'Animación: Desde la salida del huésped → Checklist inteligente → Coordinación con personal de aseo y mantención → Reporte al anfitrión.',
    project2AnimationPlaceholder: 'Flujo de Gestión Airbnb',
    project3Title: 'Nubbin / Neuralink: Interfaz Conceptual Hombre-IA',
    project3Objective: 'Objetivo:',
    project3ObjectiveText: 'Investigamos y prototipamos un dispositivo conceptual de interacción directa entre humanos e inteligencia artificial, inspirado en tecnologías como Neuralink y el episodio Black Mirror - "Nosedive".',
    project3Status: 'Estado:',
    project3StatusText: 'Fase de diseño conceptual y UX conversacional.',
    project3Animation: 'Animación: Interacción natural usuario-dispositivo con visualización de flujos neuronales/decisión contextual.',
    project3AnimationPlaceholder: 'Interfaz Neural Conceptual',
    projectsCTA: 'Cada uno de estos proyectos está orientado a resolver problemas reales y a empujar los límites de la integración entre software, IA y experiencia de usuario.',
    projectsContactButton: 'Contactar',
    projectsBlogButton: 'Ver Blog'
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
    cookies: 'Brain Cookies',
    
    // Blog
    blogDescription: 'We write about our technological projects and the thoughts that run through our minds.',
    
    // Contact
    contactDescription: 'We are here to help.',
    contactResponse: 'We will respond within 24 hours.',
    contactAddress: 'ANTONIO BELLET 193 OF 1210, Providencia',
    
    // Features
    featuresBadge: 'Futuristic Services',
    featuresTitle1: 'Beyond',
    featuresTitle2: 'Reality',
    featuresDescription: 'We build the bridge between the human mind and artificial intelligence, creating experiences that transcend conventional reality and eliminate the psychological barriers of brain-AI interaction.',
    explore: 'Explore',
    featuresCTA: 'Ready to Transcend Reality?',
    featuresCTADescription: 'Discover how brain-AI symbiosis can amplify your consciousness and eliminate the paranoia of interaction with artificial intelligence.',
    validateReality: 'Validate Reality',
    startConversation: 'Start Conversation',
    
    // Projects
    projectsBadge: 'Featured Technology Innovation Projects',
    projectsTitle: 'Featured Technology Innovation Projects',
    projectsDescription: 'Explore some of the projects we are actively working on at CodeIA, each with a solid technical approach, engaging animations and an optimized visual flow to communicate complex ideas clearly and attractively:',
    project1Title: 'Fake News Verifier for LLMs',
    project1Objective: 'Objective:',
    project1ObjectiveText: 'Design a data validation system that allows language models to avoid hallucinations (AI hallucinations) when generating responses.',
    project1Technology: 'Technology:',
    project1TechnologyText: 'LangChain, LlamaIndex, PostgreSQL, RAG (Retrieval Augmented Generation).',
    project1Animation: 'Animation: verification flow from Twitter/Perplexity → Semantic analysis → Official source confirmation → Safe LLM response.',
    project1AnimationPlaceholder: 'Fake News Verification Flow',
    project2Title: 'FlippyApp: Cleaning and Repairs for Airbnb Properties',
    project2Objective: 'Objective:',
    project2ObjectiveText: 'Automate and improve the coordination of cleaning and maintenance in temporary rental properties.',
    project2Technology: 'Technology:',
    project2TechnologyText: 'Flutter, Firebase, Python backend, MCP (Multi Component Programming) flows.',
    project2Animation: 'Animation: From guest departure → Smart checklist → Coordination with cleaning and maintenance staff → Report to host.',
    project2AnimationPlaceholder: 'Airbnb Management Flow',
    project3Title: 'Nubbin / Neuralink: Conceptual Human-AI Interface',
    project3Objective: 'Objective:',
    project3ObjectiveText: 'We research and prototype a conceptual device for direct interaction between humans and artificial intelligence, inspired by technologies like Neuralink and the Black Mirror episode - "Nosedive".',
    project3Status: 'Status:',
    project3StatusText: 'Conceptual design phase and conversational UX.',
    project3Animation: 'Animation: Natural user-device interaction with visualization of neural/contextual decision flows.',
    project3AnimationPlaceholder: 'Conceptual Neural Interface',
    projectsCTA: 'Each of these projects is oriented towards solving real problems and pushing the limits of integration between software, AI and user experience.',
    projectsContactButton: 'Contact',
    projectsBlogButton: 'View Blog'
  }
};

// Función para obtener el idioma actual
export function getCurrentLanguage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('codeia-language') || 'es';
  }
  return 'es'; // Default language for server-side rendering
}

// Función para obtener el idioma actual del cliente (solo para uso en el navegador)
export function getClientLanguage() {
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