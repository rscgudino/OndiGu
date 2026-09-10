import { ServiceItem, MethodologyStep, PortfolioProject, ValueDiff, QuickQuestion, TestimonialItem } from '../types';

export const BRAND_INFO = {
  name: 'OndiGu',
  slogan: 'Tecnología con onda',
  signature: 'OndiGu. La señal de Gudiño.',
  valueProp: 'Todo en uno. Simple. Personalizado. Sin vueltas.',
  centralMessage: 'OndiGu conecta negocios con tecnología inteligente.',
  positioning: 'Desarrollo Web + IA + Automatización + E-commerce + Integraciones + Tecnología',
  whatsappUrl: 'https://wa.me/5491100000000?text=Hola%20OndiGu!%20Quiero%20hacer%20una%20consulta%20sobre%20mi%20negocio.',
  telegramUrl: 'https://t.me/OndiGuTecnologia',
  location: 'Lanús, Buenos Aires, Argentina',
  locationDetails: 'Operando desde Lanús • Cobertura técnica a comercios y pymes de todo el país',
  googleMapsUrl: 'https://maps.google.com/?q=Lanus,+Buenos+Aires,+Argentina',
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
    description: 'Diseño, código, servidores, pasarelas de pago, integraciones y soporte en un único equipo. No tenés que lidiar con tres personas distintas.',
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
    id: 'ecommerce',
    title: 'E-commerce',
    shortDesc: 'Tiendas online directas, claras y fáciles de usar.',
    resolution: 'Tus clientes eligen productos, eligen el envío y pagan en pocos clics sin trabas que hagan caer la venta.',
    iconName: 'ShoppingBag',
    realWorldExample: 'Catálogo con fotos nítidas, stock sincronizado y cobro por medios locales.'
  },
  {
    id: 'integraciones',
    title: 'Integraciones',
    shortDesc: 'Conexión entre las herramientas que ya usás a diario.',
    resolution: 'Unimos tu web con WhatsApp, Mercado Pago, Google Sheets o tu sistema de facturación para que todo trabaje en equipo.',
    iconName: 'Workflow',
    realWorldExample: 'Sincronización automática de stock y notificaciones de compra a tu WhatsApp.'
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
    category: 'E-commerce + Gestión de Stock',
    result: 'Aumentó 140% las ventas directas fuera del local físico en su primer trimestre.',
    description: 'Comercio minorista de diseño y decoración que dependía únicamente del salón de ventas. Ahora cuenta con tienda online de carga ultrarrápida, pagos integrados y cálculo de envíos en tiempo real.',
    tags: ['E-commerce', 'Medios de Pago', 'Control de Stock'],
    imagePlaceholder: {
      ratio: '16:10',
      dominantColor: '#0a0a0a',
      subtitle: 'Tienda Digital de Alta Conversión'
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
    answer: 'En OndiGu cada trabajo se cotiza por proyecto según lo que tu negocio necesita de verdad. No imponemos abonos ocultos ni paquetes inflados con cosas que no vas a usar. Una landing page inicial tiene un costo accesible para cualquier comercio o emprendedor, y si querés sumar tienda o automatizaciones, se presupuesta por etapas claras.'
  },
  {
    id: 'tiempos',
    question: '¿Cuáles son los tiempos de entrega?',
    answer: 'Con nuestra metodología en 3 partes, la primera versión (Landing Page) suele estar en línea y funcionando en 5 a 8 días hábiles. Las funcionalidades adicionales (catálogo, cuentas, pasarelas) se van sumando de forma continua sin frenar la actividad de tu negocio.'
  },
  {
    id: 'ia',
    question: '¿Cómo ayuda la IA a mi comercio o pyme?',
    answer: 'La aplicamos en puntos prácticos: asistentes que responden a tus clientes cuando consultan por productos o precios (incluso de noche), categorización automática de consultas y conexión con tus planillas para no perder ventas por demorarte en contestar.'
  },
  {
    id: 'tecnicismo',
    question: '¿Tengo que saber de programación para administrarlo?',
    answer: 'Para nada. Diseñamos todo pensando en el dueño del negocio: interfaces simples, explicaciones en español llano y te entregamos un instructivo para que puedas modificar precios, fotos o textos sin depender de nadie.'
  },
  {
    id: 'pasos',
    question: '¿Cómo empezamos a trabajar?',
    answer: 'Completás el formulario de presupuesto o nos mandás un mensaje por WhatsApp. Conversamos 15 minutos sobre lo que necesita tu negocio, te pasamos una propuesta concreta sin vueltas y, si estás de acuerdo, arrancamos la primera etapa.'
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
    serviceTag: 'E-commerce & Pasarelas de Pago',
    comment: 'Excelente experiencia. Nos armaron la tienda online con cobro por Mercado Pago en tiempo récord. No nos cobraron de más ni nos complicaron con cosas técnicas. Se nota que entienden la realidad de un comercio de barrio.',
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
    serviceTag: 'Landing Express & Integraciones',
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
