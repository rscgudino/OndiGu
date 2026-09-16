import { ServiceItem, MethodologyStep, PortfolioProject, ValueDiff, QuickQuestion, TestimonialItem } from '../types';

export const BRAND_INFO = {
  name: 'OndiGu',
  slogan: 'Tecnología con onda',
  signature: 'OndiGu. La señal de Gudiño.',
  valueProp: 'Todo en uno. Simple. Personalizado. Sin vueltas.',
  centralMessage: 'OndiGu conecta negocios con tecnología inteligente.',
  positioning: 'Desarrollo Web + IA + Automatización + Tecnología',
  whatsappUrl: 'https://wa.me/5491100000000?text=Hola%20OndiGu!%20Quiero%20hacer%20una%20consulta%20sobre%20mi%20negocio.',
  telegramUrl: 'https://t.me/OndiGuTecnologia',
  location: 'Lanús, Buenos Aires, Argentina',
  locationDetails: 'Operando desde Lanús • Cobertura técnica a comercios y pymes de todo el país',
  googleMapsUrl: 'https://maps.google.com/?q=Lanus,+Buenos+Aires,+Argentina',
};

export const PEDRO_GUDINO_INFO = {
  name: 'Pedro Gudiño',
  role: 'Diseñador Web & Consultor Tecnológico',
  tagline: 'Diseño web con personalidad, cercanía y resultados medibles.',
  posterUrl: '/assets/pedro-gudino.jpg',
  videoUrl: '/assets/pedro-gudino.mp4',
  bio: 'Detrás de OndiGu no vas a encontrar un call center ni un ejecutivo que te derive a otra persona. Estoy yo, Pedro Gudiño. Me apasiona diseñar sitios web rápidos y automatizaciones inteligentes para que los comercios y pymes crezcan de verdad.',
  whatsappDirectUrl: 'https://wa.me/5491100000000?text=Hola%20Pedro!%20Vi%20tu%20video%20de%20presentaci%C3%B3n%20en%20OndiGu%20y%20quiero%20conversar%20sobre%20mi%20proyecto.',
  location: 'Lanús, Buenos Aires (atención a todo el país)',
  status: 'Disponible para nuevos desarrollos',
  pillars: [
    {
      title: 'Trato directo de persona a persona',
      desc: 'Hablás y coordinás cada detalle conmigo. Sin intermediarios ni teléfonos descompuestos.',
      badge: 'Cero burocracia'
    },
    {
      title: 'Claridad en español simple',
      desc: 'Te explico cómo funciona cada herramienta y por qué conviene implementarla, sin palabras raras.',
      badge: '100% Transparente'
    },
    {
      title: 'Enfoque en ventas y tiempo libre',
      desc: 'No hago páginas para ganar premios de arte: hago herramientas que generen clientes y te liberen horas.',
      badge: 'Resultados reales'
    }
  ]
};

export const VALUE_DIFFERENTIATORS: ValueDiff[] = [
  {
    title: 'Rapidez de entrega',
    description: 'No te hacemos esperar meses. Presentamos una primera versión funcional en días para que tu negocio empiece a captar clientes de inmediato.',
    highlight: 'Días, no meses'
  },
  {
    title: 'IA real integrada',
    description: 'Nada de humo teórico. Sumamos asistentes que atienden consultas de clientes, responden dudas comunes y capturan pedidos las 24 horas.',
    highlight: 'Utilidad concreta 24/7'
  },
  {
    title: 'Todo en un solo proveedor',
    description: 'Diseño, código, servidores y soporte en un único equipo. No tenés que lidiar con tres personas distintas.',
    highlight: 'Cero intermediarios'
  },
  {
    title: 'Metodología propia en 3 etapas',
    description: 'Un camino transparente y predecible. Sabés con exactitud qué se está construyendo, qué podés probar y cuándo se entrega cada módulo.',
    highlight: 'Proceso claro y medible'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'desarrollo-web',
    title: 'Desarrollo Web',
    shortDesc: 'Sitios rápidos, elegantes y adaptados al teléfono móvil.',
    resolution: 'Hace que las personas que te buscan en Google o redes entiendan tu propuesta al instante y te escriban sin perderse.',
    iconName: 'Globe',
    realWorldExample: 'Web comercial con carga instantánea y botón de compra o llamada directa.'
  },
  {
    id: 'ia-aplicada',
    title: 'Inteligencia Artificial',
    shortDesc: 'Asistentes que responden preguntas frecuentes y filtran consultas.',
    resolution: 'Te ahorra horas de responder lo mismo y atiende a tus clientes aunque estés descansando o en horario no comercial.',
    iconName: 'Cpu',
    realWorldExample: 'Bot inteligente entrenado con los precios, catálogo y horarios de tu negocio.'
  },
  {
    id: 'automatizacion',
    title: 'Automatización',
    shortDesc: 'Procesos repetitivos que se ejecutan solos sin error humano.',
    resolution: 'Conecta tus formularios, mensajes y planillas para que los pedidos y datos se guarden al instante sin tipeo manual.',
    iconName: 'Zap',
    realWorldExample: 'Cuando un cliente pide presupuesto, se genera una ficha y te llega aviso al celular.'
  },
  {
    id: 'infraestructura',
    title: 'Tecnología e Infraestructura',
    shortDesc: 'Servidores de alta velocidad, seguridad y dominio propio.',
    resolution: 'Nos encargamos de que tu página esté siempre activa, segura contra fallos y con tiempos de carga óptimos.',
    iconName: 'Server',
    realWorldExample: 'Servidores en la nube con copias de respaldo y certificado de seguridad SSL incluido.'
  }
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: '01',
    phase: 'Etapa 1',
    name: 'Landing Page',
    summary: 'Creamos la vidriera digital de tu negocio: diseño a medida, propuesta de valor clara y llamadas a la acción directas.',
    clientDeliverable: 'Tu sitio web visible en internet con dominio propio, listo para recibir visitantes y recibir consultas.',
    durationEstimate: 'Primera entrega en 5 a 8 días'
  },
  {
    number: '02',
    phase: 'Etapa 2',
    name: 'Usuarios y funcionalidades',
    summary: 'Agregamos la lógica que tu negocio requiere: catálogo interactivo, cotizadores, filtros dinámicos o área de registro.',
    clientDeliverable: 'Herramientas interactivas donde tus clientes exploran tus productos o servicios de forma autónoma.',
    durationEstimate: 'Desarrollo e iteración continua'
  },
  {
    number: '03',
    phase: 'Etapa 3',
    name: 'Pagos, despliegue y entrega',
    summary: 'Conectamos los métodos de cobro, activamos las automatizaciones de pedidos y te entregamos el acceso con capacitación.',
    clientDeliverable: 'Sistema en marcha 100% operativo, con cobros habilitados y soporte permanente de OndiGu.',
    durationEstimate: 'Puesta en producción final'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'valle-central',
    title: 'Distribuidora Valle Central',
    category: 'B2B + Automatización WhatsApp',
    result: 'Redujo 60% el tiempo de toma de pedidos y habilitó catálogo interactivo 24/7.',
    description: 'Empresa distribuidora de insumos que recibía cientos de mensajes desordenados por día. Se implementó una plataforma web con catálogo mayorista que envía el pedido ordenado y listo para facturar directo a WhatsApp.',
    tags: ['Web Comercial', 'Catálogo Mayorista', 'Automatización'],
    imagePlaceholder: {
      ratio: '16:10',
      dominantColor: '#0a0a0a',
      subtitle: 'Plataforma Mayorista & Sincronización WhatsApp'
    }
  },
  {
    id: 'san-marcos',
    title: 'Consultorios Médicos San Marcos',
    category: 'Portal de Turnos + Recordatorios IA',
    result: 'Cero turnos perdidos por olvido y atención automática inmediata los fines de semana.',
    description: 'Centro de salud con múltiples especialistas. Se diseñó un sistema simple de agenda online con confirmaciones y respuestas automáticas inteligentes a consultas de pacientes.',
    tags: ['Sistema de Turnos', 'Asistente IA', 'Notificaciones'],
    imagePlaceholder: {
      ratio: '16:10',
      dominantColor: '#0c0c0c',
      subtitle: 'Gestor de Pacientes & Agenda Inteligente'
    }
  },
  {
    id: 'aura-deco',
    title: 'Aura Home & Deco',
    category: 'Catálogo Web + WhatsApp Directo',
    result: 'Aumentó 140% las consultas directas fuera del local físico en su primer trimestre.',
    description: 'Comercio minorista de diseño y decoración que dependía únicamente del salón de ventas. Ahora cuenta con un catálogo digital interactivo de carga ultrarrápida y botón de consulta directa.',
    tags: ['Catálogo Digital', 'Alta Velocidad', 'WhatsApp Directo'],
    imagePlaceholder: {
      ratio: '16:10',
      dominantColor: '#0a0a0a',
      subtitle: 'Catálogo Web de Alta Conversión'
    }
  },
  {
    id: 'terraza-gourmet',
    title: 'Terraza Gourmet & Bar',
    category: 'Menú Digital + Pedidos QR',
    result: 'Rotación 35% más ágil de mesas en horario pico y ticket promedio superior.',
    description: 'Espacio gastronómico que buscaba agilizar la atención en días concurridos. Se desarrolló una carta digital interactiva con sugerencias inteligentes y pedido directo desde la mesa.',
    tags: ['Menú Digital', 'QR Dinámico', 'Velocidad Móvil'],
    imagePlaceholder: {
      ratio: '16:10',
      dominantColor: '#0d0d0d',
      subtitle: 'Carta Interactiva & Pedidos Ágiles'
    }
  }
];

export const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 'costo',
    question: '¿Cuánto cuesta un proyecto en OndiGu?',
    answer: 'En OndiGu cada proyecto se cotiza a medida según lo que realmente necesita tu negocio: desde una Landing Express hasta desarrollos a medida y automatizaciones con IA. No cobramos abonos sorpresa ni paquetes inflados. Te pasamos una cotización exacta sin vueltas.'
  },
  {
    id: 'tiempos',
    question: '¿Cuáles son los tiempos de entrega?',
    answer: 'Nuestra metodología en 3 etapas permite que la Landing inicial esté en línea en 5 a 8 días hábiles (o en 24-48hs si contratás el plan Landing Express). Los módulos y automatizaciones se van integrando de forma continua sin frenar la actividad de tu negocio.'
  },
  {
    id: 'ia',
    question: '¿Cómo ayuda la Inteligencia Artificial a mi comercio o pyme?',
    answer: 'La IA filtra y responde consultas frecuentes las 24 horas, incluso de noche y fines de semana. Atiende preguntas sobre precios, horarios, stock y envíos, y captura los pedidos para que te lleguen ordenados sin perder ventas por tardar en contestar.'
  },
  {
    id: 'tecnicismo',
    question: '¿Tengo que saber de programación para administrar mi sitio?',
    answer: 'Para nada. Construimos plataformas 100% autoadministrables con paneles simples en español. Te entregamos acceso total junto con un instructivo guiado para que puedas cambiar precios, subir fotos o pausar productos sin depender de nosotros para cada cambio.'
  },
  {
    id: 'pagos',
    question: '¿Qué medios de pago aceptan para contratar?',
    answer: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y Mercado Pago. Emitimos factura por todos los desarrollos.'
  },
  {
    id: 'whatsapp-redes',
    question: '¿Puedo conectar la web directo con mi WhatsApp y redes?',
    answer: 'Totalmente. Todos nuestros desarrollos incluyen botón directo a tu WhatsApp con mensajes pre-armados según el producto o servicio que mire el cliente. Además vinculamos tu catálogo con Instagram Shopping, Facebook y Google Maps.'
  },
  {
    id: 'infraestructura',
    question: '¿Cómo es el servicio de mantenimiento y servidores?',
    answer: 'Nos encargamos de que tu página esté siempre activa, segura contra fallos y con tiempos de carga óptimos de 1 segundo. Incluye servidores en la nube de alta velocidad con 99.9% de actividad garantizada, certificado de seguridad SSL gratis y copias de seguridad continuas.'
  },
  {
    id: 'cobertura',
    question: '¿Trabajan solo en Lanús y Buenos Aires o en todo el país?',
    answer: 'Nuestra base técnica está en Lanús, Buenos Aires, pero desarrollamos proyectos para comercios, distribuidoras y profesionales de toda Argentina y Latinoamérica de forma 100% remota con comunicación fluida por videollamada y WhatsApp.'
  },
  {
    id: 'quien-atiende',
    question: '¿Con quién hablo durante el proyecto y quién lo diseña?',
    answer: 'Trabajás y hablás directamente con Pedro Gudiño, diseñador web y creador de OndiGu. Cero intermediarios, sin burocracia ni ejecutivos de cuenta. Cada ajuste, idea o reunión la coordinás de persona a persona con Pedro.'
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'ref-1',
    name: 'Gonzalo Morales',
    roleAndBusiness: 'Dueño • Distribuidora San Martín (Bebidas y Alimentos)',
    location: 'Lanús Oeste, Buenos Aires',
    avatarInitials: 'GM',
    rating: 5,
    serviceTag: 'Landing Page Express 24hs + WhatsApp',
    comment: 'Increíble la rapidez de OndiGu. Necesitábamos una landing page urgente para una campaña mayorista y en 24 horas estaba impecable, conectada directo a nuestro WhatsApp. Esa misma semana cerramos 12 clientes nuevos.',
    verifiedSource: 'Google Reviews Verificado',
    timeAgo: 'Hace 2 semanas'
  },
  {
    id: 'ref-2',
    name: 'Dra. Mariana Ferreyra',
    roleAndBusiness: 'Titular • Estudio Contable & Tributario Ferreyra',
    location: 'Lanús Este, Buenos Aires',
    avatarInitials: 'MF',
    rating: 5,
    serviceTag: 'Desarrollo Web & Formularios',
    comment: 'Teníamos una web vieja que daba desconfianza. OndiGu nos hizo un sitio moderno, rápido y con un formulario que filtra las consultas antes de que lleguen. Muy profesionales y con una onda bárbara para explicar.',
    verifiedSource: 'Google Reviews Verificado',
    timeAgo: 'Hace 3 semanas'
  },
  {
    id: 'ref-3',
    name: 'Claudio Benítez',
    roleAndBusiness: 'Socio Gerente • Repuestos & Mecánica Sur',
    location: 'Valentín Alsina, Lanús',
    avatarInitials: 'CB',
    rating: 5,
    serviceTag: 'IA Aplicada & Automatización',
    comment: 'El bot con inteligencia artificial que nos armaron nos atiende clientes hasta las 11 de la noche. La gente consulta por repuestos, el bot les pide el modelo y nos deja el pedido armado en una planilla. Nos ahorró 3 horas diarias de teléfono.',
    verifiedSource: 'Google Reviews Verificado',
    timeAgo: 'Hace 1 mes'
  },
  {
    id: 'ref-4',
    name: 'Luciana Rossi',
    roleAndBusiness: 'Fundadora • Boutique & Calzados Rossi',
    location: 'Lanús Centro, Buenos Aires',
    avatarInitials: 'LR',
    rating: 5,
    serviceTag: 'Catálogo Digital & WhatsApp Directo',
    comment: 'Excelente experiencia. Nos armaron el catálogo web con contacto directo en tiempo récord. No nos cobraron de más ni nos complicaron con cosas técnicas. Se nota que entienden la realidad de un comercio de barrio.',
    verifiedSource: 'Google Reviews Verificado',
    timeAgo: 'Hace 1 mes'
  },
  {
    id: 'ref-5',
    name: 'Esteban Carrizo',
    roleAndBusiness: 'Director Comercial • Ferretería Industrial Del Sur',
    location: 'Gerli / Lanús, Buenos Aires',
    avatarInitials: 'EC',
    rating: 5,
    serviceTag: 'Landing Express & Automatización',
    comment: 'La atención personalizada de OndiGu marca la diferencia. Hicimos la landing en menos de un día y automatizamos las listas de precios en PDF para los clientes. Eficiencia pura, 100% recomendados en zona sur.',
    verifiedSource: 'Google Reviews Verificado',
    timeAgo: 'Hace 2 meses'
  },
  {
    id: 'ref-6',
    name: 'Paula Giménez',
    roleAndBusiness: 'Co-propietaria • Café & Pastelería Nuvola',
    location: 'Remedios de Escalada, Lanús',
    avatarInitials: 'PG',
    rating: 5,
    serviceTag: 'Web Móvil + Menú QR + Asistente',
    comment: 'La carta digital QR y la web cargan volando. El asistente nos organiza las reservas del fin de semana sin que tengamos que responder mensajes en medio del servicio. Una inversión que recuperamos al toque.',
    verifiedSource: 'Google Reviews Verificado',
    timeAgo: 'Hace 2 meses'
  }
];

export const SOCIAL_NETWORKS = [
  {
    name: 'Google Maps / Reseñas',
    handle: 'Lanús, Buenos Aires (5.0 ★)',
    url: 'https://maps.google.com/?q=Lanus,+Buenos+Aires,+Argentina',
    iconKey: 'Google',
    category: 'google',
    highlight: 'Ubicación Lanús'
  },
  {
    name: 'Instagram',
    handle: '@ondigu.tech',
    url: 'https://instagram.com',
    iconKey: 'Instagram',
    category: 'social'
  },
  {
    name: 'Facebook',
    handle: 'OndiGu Oficial',
    url: 'https://facebook.com',
    iconKey: 'Facebook',
    category: 'social'
  },
  {
    name: 'TikTok',
    handle: '@ondigu.tech',
    url: 'https://tiktok.com',
    iconKey: 'TikTok',
    category: 'video'
  }
];
