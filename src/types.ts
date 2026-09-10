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
