import React from 'react';
import { BRAND_INFO, SOCIAL_NETWORKS } from '../data/content';
import { 
  Instagram, 
  Facebook, 
  MapPin, 
  Star, 
  ExternalLink,
  Compass
} from 'lucide-react';

export const SocialNetworksBar: React.FC = () => {
  // Map icons
  const renderSocialIcon = (key: string) => {
    switch (key) {
      case 'Google':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
        );
      case 'Instagram':
        return <Instagram className="w-5 h-5 text-[#E4405F]" />;
      case 'Facebook':
        return <Facebook className="w-5 h-5 text-[#1877F2]" />;
      case 'TikTok':
        return (
          <svg className="w-5 h-5 fill-current text-[#EE1D52]" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.49V8.65a8.28 8.28 0 0 0 4.91 1.57v-3.53Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="comunidad-redes" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0c0e12] border-t border-[#1a1d26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#151821] border border-[#272c3d] rounded-full text-xs font-mono text-[#FF8C00] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>Lanús, Buenos Aires • Conexión Nacional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Canales Oficiales & Ubicación
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#949aa8] leading-relaxed">
            Seguinos en redes sociales, encontranos en Google Maps y contactate directo con el equipo de OndiGu.
          </p>
        </div>

        {/* Highlight Card: Google Location in Lanús */}
        <div className="mb-12 bg-gradient-to-r from-[#141722] via-[#161a27] to-[#141722] border border-[#252b3d] hover:border-[#FF4500]/50 p-6 sm:p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              <div className="w-16 h-16 rounded-xl bg-[#1c202e] border border-[#2c3246] flex items-center justify-center p-3 shrink-0 shadow-inner">
                {/* Google multi-color icon big */}
                <svg className="w-9 h-9" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <span className="text-xs font-mono font-semibold text-[#FF8C00] uppercase tracking-wider">
                    Google Mi Negocio & Google Maps
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Punto Verificado
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  OndiGu en Lanús, Buenos Aires
                </h3>

                <p className="mt-1 text-sm text-[#949aa8] max-w-xl">
                  {BRAND_INFO.locationDetails}. Visitanos en el mapa o dejanos tu reseña para seguir impulsando el ecosistema pyme del Gran Buenos Aires.
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-mono text-[#7b8192]">
                  <div className="flex items-center gap-1 text-[#FF8C00]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FF8C00] text-[#FF8C00]" />
                    ))}
                    <span className="font-bold text-white ml-1">5.0 / 5.0</span>
                  </div>
                  <span>•</span>
                  <span className="text-white">Lanús Centro / Oeste / Este</span>
                  <span>•</span>
                  <span>Atención presencial y virtual</span>
                </div>
              </div>
            </div>

            {/* Google Maps CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={BRAND_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 rounded-lg transition-all shadow-[0_4px_16px_rgba(255,69,0,0.3)]"
              >
                <Compass className="w-4 h-4" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* All Social Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SOCIAL_NETWORKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="bg-[#141722] hover:bg-[#1c202e] border border-[#232738] hover:border-[#384058] p-4 rounded-lg flex flex-col items-center text-center transition-all duration-200 group relative"
            >
              {social.highlight && (
                <span className="absolute -top-2 px-2 py-0.5 bg-[#FF4500] text-[9px] font-mono font-bold text-white rounded-full uppercase tracking-wider">
                  {social.highlight}
                </span>
              )}

              <div className="w-11 h-11 rounded-full bg-[#1b1f2b] border border-[#2a3042] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                {renderSocialIcon(social.iconKey)}
              </div>

              <span className="text-xs font-bold text-white group-hover:text-[#FF8C00] transition-colors leading-tight">
                {social.name}
              </span>

              <span className="text-[11px] text-[#717789] font-mono mt-1 truncate max-w-full">
                {social.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
