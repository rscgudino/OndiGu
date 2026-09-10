export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  resolution: string;
  iconName: string;
  realWorldExample: string;
}

export interface MethodologyStep {
  number: string;
  phase: string;
  name: string;
  summary: string;
  clientDeliverable: string;
  durationEstimate: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  result: string;
  description: string;
  tags: string[];
  imagePlaceholder: {
    ratio: string;
    dominantColor: string;
    subtitle: string;
  };
}

export interface ValueDiff {
  title: string;
  description: string;
  highlight: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionPrompt?: {
    label: string;
    type: 'whatsapp' | 'telegram' | 'contact';
  };
}

export interface QuickQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface InquiryFormData {
  name: string;
  businessType: string;
  needs: string[];
  contact: string;
  details: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  roleAndBusiness: string;
  location: string;
  avatarInitials: string;
  rating: number;
  serviceTag: string;
  comment: string;
  verifiedSource: string;
  timeAgo: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatarUrl?: string;
  createdAt?: string;
  isAdmin?: boolean;
}

export interface TurnoLlamada {
  id: string;
  usuario_id?: string | null;
  nombre: string;
  telefono: string;
  email: string;
  fecha: string; // YYYY-MM-DD
  franja: string; // 'Mañana (09:00 - 13:00)' | 'Tarde (13:00 - 18:00)' | 'Noche (18:00 - 21:00)'
  motivo: string;
  notas?: string;
  estado: 'pendiente' | 'contactado' | 'hecho';
  creado_en: string;
}

export interface PresupuestoLead {
  id: string;
  usuario_id?: string | null;
  nombre: string;
  tipo_negocio: string;
  necesidades: string[];
  contacto: string;
  detalles: string;
  estado: 'nuevo' | 'contactado' | 'en_propuesta' | 'cerrado';
  creado_en: string;
}

export interface PaymentGatewayConfig {
  mercadopago_public_key: string;
  mercadopago_access_token: string;
  mercadopago_sandbox: boolean;
  mercadopago_link_consultoria: string;
  stripe_publishable_key: string;
  stripe_secret_key: string;
  stripe_test_mode: boolean;
  precio_consultoria_ars: number;
  precio_consultoria_usd: number;
  actualizado_en?: string;
}
