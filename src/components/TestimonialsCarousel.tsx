import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS_LIST, BRAND_INFO } from '../data/content';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  MapPin, 
  CheckCircle2, 
  Quote, 
  ExternalLink 
} from 'lucide-react';

interface TestimonialsCarouselProps {
  onSelectExpress?: () => void;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ onSelectExpress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const total = TESTIMONIALS_LIST.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-play cycle every 4.2 seconds when playing and not hovered
  useEffect(() => {
    if (isPlaying && !isHovered) {
      timerRef.current = window.setInterval(() => {
        handleNext();
      }, 4200);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, isHovered, currentIndex]);

  // Calculate items visible for responsive display
  // We'll show an active window or a primary active card + flanking cards
  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % total;
      items.push({ item: TESTIMONIALS_LIST[idx], originalIndex: idx });
    }
    return items;
  };

  return (
    <section id="referencias" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/70 dark:bg-[#0a0c10] border-t border-slate-200 dark:border-[#1a1d26] relative overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF4500]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF8C00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200 dark:border-[#1e2332] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#272c3d] rounded-full text-xs font-mono text-[#FF4500] dark:text-[#FF8C00] mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Clientes Reales • Experiencias Comprobadas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Lo que dicen quienes ya trabajan con OndiGu
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-[#949aa8] max-w-2xl leading-relaxed">
              Comercios, pymes y emprendedores de <strong className="text-slate-900 dark:text-white">Lanús</strong> y Buenos Aires que ya sumaron tecnología sin complicaciones.
            </p>
          </div>

          {/* Google Reviews Badge with Lanús Location */}
          <a
            href={BRAND_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group shrink-0 inline-flex items-center gap-3 p-3.5 bg-white dark:bg-[#141722] hover:bg-slate-50 dark:hover:bg-[#1a1e2c] border border-slate-200 dark:border-[#252a3b] hover:border-[#FF8C00]/40 rounded-xl transition-all shadow-xs"
            title="Ver ubicación y opiniones en Google Maps de Lanús"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#1c202e] border border-slate-200 dark:border-[#2b3145] flex items-center justify-center text-white">
              {/* Google G multi-color icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#FF8C00]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FF8C00] text-[#FF8C00]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">5.0 / 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-500 dark:text-[#8e94a5]">
                <MapPin className="w-3 h-3 text-[#FF4500]" />
                <span className="group-hover:text-[#FF4500] dark:group-hover:text-white transition-colors">Google Reviews • Lanús, Bs. As.</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </div>
            </div>
          </a>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Active Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleTestimonials().map(({ item, originalIndex }) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#141722] border border-slate-200 dark:border-[#232738] hover:border-slate-300 dark:hover:border-[#384058] p-7 rounded-xl flex flex-col justify-between transition-all duration-300 relative group shadow-xs dark:shadow-none"
              >
                {/* Top Corner Glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF8C00]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Rating & Source Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF8C00] text-[#FF8C00]" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 px-2 py-0.5 rounded font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                      {item.verifiedSource}
                    </span>
                  </div>

                  {/* Service Implemented Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-2.5 py-1 text-[11px] font-mono font-medium text-[#FF4500] dark:text-[#FF8C00] bg-orange-50 dark:bg-[#1c202e] border border-orange-200 dark:border-[#2a3043] rounded-md">
                      {item.serviceTag}
                    </span>
                  </div>

                  {/* Comment Body */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-slate-200 dark:text-[#232738] absolute -top-3 -left-1 -z-0 opacity-50" />
                    <p className="text-sm sm:text-base text-slate-700 dark:text-[#d8dce6] leading-relaxed relative z-10 italic">
                      "{item.comment}"
                    </p>
                  </div>
                </div>

                {/* Author Info & Location */}
                <div className="pt-4 border-t border-slate-200 dark:border-[#1e2332] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4500]/20 to-[#FF8C00]/20 border border-[#FF4500]/30 flex items-center justify-center text-xs font-bold text-[#FF4500] dark:text-[#FF8C00] font-mono shrink-0">
                      {item.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-[#8e94a5] line-clamp-1">
                        {item.roleAndBusiness}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#FF4500]">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location.split(',')[0]}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-[#6d7385] font-mono">
                      {item.timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-[#1a1d28]">
            {/* Auto-play Status indicator */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-700 dark:text-[#949aa8] hover:text-slate-950 dark:hover:text-white bg-white dark:bg-[#141722] hover:bg-slate-50 dark:hover:bg-[#1a1d2a] border border-slate-200 dark:border-[#232738] rounded-md transition-colors cursor-pointer"
                title={isPlaying ? 'Pausar carrusel automático' : 'Reanudar carrusel automático'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#FF8C00]" />
                    <span>Pausar carrusel</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Reanudar automático</span>
                  </>
                )}
              </button>

              <span className="text-xs text-slate-500 dark:text-[#6e7485] font-mono hidden sm:inline-block">
                {isHovered ? '(Pausa por cursor)' : isPlaying ? 'Avance automático cada 4s' : 'En pausa'}
              </span>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_LIST.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-6 bg-[#FF4500]' 
                      : 'w-2 bg-slate-300 dark:bg-[#262b3a] hover:bg-slate-400 dark:hover:bg-[#3d455d]'
                  }`}
                  aria-label={`Ver testimonio ${idx + 1}`}
                />
              ))}
            </div>

            {/* Previous / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Testimonio anterior"
                className="p-2 text-[#8e94a5] hover:text-white bg-[#141722] hover:bg-[#1e2230] border border-[#232738] hover:border-[#384058] rounded transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#8e94a5] px-1">
                {currentIndex + 1} / {total}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Siguiente testimonio"
                className="p-2 text-[#8e94a5] hover:text-white bg-[#141722] hover:bg-[#1e2230] border border-[#232738] hover:border-[#384058] rounded transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Micro-banner prompt */}
        <div className="mt-10 bg-[#121520] border border-[#1f2434] p-4 sm:p-5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4500] shrink-0 hidden sm:inline-block" />
            <p className="text-xs sm:text-sm text-[#c5c9d6]">
              ¿Querés tener tu web lista como estos negocios? En OndiGu te armamos tu landing page o sistema con entrega récord.
            </p>
          </div>
          {onSelectExpress && (
            <button
              type="button"
              onClick={onSelectExpress}
              className="shrink-0 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 rounded transition-all shadow-[0_2px_12px_rgba(255,69,0,0.3)] cursor-pointer"
            >
              Consultar Landing 24hs Express
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
