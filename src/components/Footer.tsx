import React from 'react';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO, SOCIAL_NETWORKS } from '../data/content';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, 
  Star, 
  Instagram, 
  Facebook, 
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  onOpenPortal: () => void;
  onNavigateContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onNavigateContact }) => {
  const { user } = useAuth();
  return (
    <footer className="bg-[#0a0c10] border-t border-[#1e222e] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#9c9c9c]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-sm text-[#b5b5b5] max-w-md leading-relaxed">
              {BRAND_INFO.centralMessage} Desarrollo web, inteligencia artificial y automatización para pymes, comercios y emprendedores.
            </p>
            
            {/* Lanús Location Pill */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={BRAND_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#FF8C00] bg-[#151821] hover:bg-[#1d222f] border border-[#252a38] hover:border-[#FF4500]/40 px-3 py-1.5 rounded transition-all"
                title="Ver ubicación en Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
                <span>Lanús, Buenos Aires, Argentina</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <span className="inline-flex items-center gap-1 text-xs font-mono text-[#a5abbd] bg-[#151821] border border-[#252a38] px-2.5 py-1.5 rounded">
                <Star className="w-3.5 h-3.5 fill-[#FF8C00] text-[#FF8C00]" />
                <span className="text-white font-bold">5.0</span> en Google Reviews
              </span>
            </div>

            <div className="pt-2">
              <span className="inline-block text-xs font-mono text-[#d0d0d0] bg-[#151821] border border-[#252a38] px-3 py-1.5 rounded">
                {BRAND_INFO.signature}
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navegación
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#propuesta" className="hover:text-white transition-colors">
                  Propuesta de valor
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Servicios comerciales
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-white transition-colors">
                  Metodología en 3 etapas
                </a>
              </li>
              <li>
                <a href="#referencias" className="hover:text-white transition-colors">
                  Referencias de clientes
                </a>
              </li>
              <li>
                <a href="#comunidad-redes" className="hover:text-white transition-colors">
                  Redes & Ubicación Lanús
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Casos de éxito
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPortal}
                  className="hover:text-[#FF8C00] transition-colors text-left cursor-pointer"
                >
                  {user ? 'Mi cuenta' : 'Ingresar / Portal de clientes'}
                </button>
              </li>
            </ul>
          </div>

          {/* Social Networks & Channels */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-white mb-4">
              Redes & Contacto
            </span>
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href={BRAND_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-[#d0d0d0] hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#FF4500]" />
                <span>Google Maps (Lanús)</span>
              </a>

              {/* Social icons row */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram de OndiGu"
                  className="w-8 h-8 rounded bg-[#151821] hover:bg-[#202534] border border-[#252a38] flex items-center justify-center text-[#E4405F] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Facebook de OndiGu"
                  className="w-8 h-8 rounded bg-[#151821] hover:bg-[#202534] border border-[#252a38] flex items-center justify-center text-[#1877F2] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="TikTok de OndiGu"
                  className="w-8 h-8 rounded bg-[#151821] hover:bg-[#202534] border border-[#252a38] flex items-center justify-center text-[#EE1D52] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.49V8.65a8.28 8.28 0 0 0 4.91 1.57v-3.53Z"/>
                  </svg>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onNavigateContact}
                  className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-[#151821] hover:bg-[#1e222f] border border-[#2b3142] rounded transition-colors cursor-pointer"
                >
                  Pedir presupuesto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1a1d26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e6e6e]">
          <p>© {new Date().getFullYear()} OndiGu. Todos los derechos reservados.</p>
          <p className="font-mono text-[#8b91a2] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
            <span>Lanús, Buenos Aires // Tecnología con onda // La señal de Gudiño</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
