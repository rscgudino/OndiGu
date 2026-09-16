import React from 'react';
import { HeroBrandAnimation } from './HeroBrandAnimation';

interface HeroProps {
  onQuoteClick: () => void;
  onPortfolioClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onPortfolioClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0c0e12]"
    >
      {/* Subtle background ambient mesh */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#FF4500]/12 via-[#FF8C00]/5 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Subtle geometric grid backdrop */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1b1e28_1px,transparent_1px),linear-gradient(to_bottom,#1b1e28_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#0c0e12_70%,transparent_100%)] opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Animated Brand Mark: G + estela de energía */}
        <div className="w-full mb-4">
          <HeroBrandAnimation />
        </div>

        {/* Real text wordmark superposed with precision */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="font-brand text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-white leading-none select-none">
            Ondi<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FF6000] to-[#FF4500] drop-shadow-[0_0_35px_rgba(255,69,0,0.35)]">Gu</span>
          </h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#949aa8]">
              Tecnología con onda <span className="text-[#2c3140] mx-1.5">•</span> <span className="text-[#FF8C00]">La señal de Gudiño</span>
            </p>
          </div>
        </div>

        {/* Exact Requested Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] max-w-3xl mb-6">
          Conectamos tu negocio con tecnología inteligente.
        </h1>

        {/* Exact Requested Subheadline */}
        <p className="text-lg sm:text-xl text-[#d4d4d4] font-normal leading-relaxed max-w-2xl mb-10">
          Desarrollo web, IA y automatización. Todo en uno. Simple. Sin vueltas.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            id="hero-primary-quote-cta"
            type="button"
            onClick={onQuoteClick}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] rounded shadow-[0_0_30px_rgba(255,69,0,0.35)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            Pedí tu presupuesto
          </button>

          <button
            id="hero-secondary-portfolio-cta"
            type="button"
            onClick={onPortfolioClick}
            className="w-full sm:w-auto px-7 py-4 text-base font-medium text-[#e0e0e0] hover:text-white bg-[#181a22] hover:bg-[#20232e] border border-[#2a2e3b] hover:border-[#3c4254] rounded transition-all duration-200 cursor-pointer"
          >
            Ver portfolio
          </button>
        </div>

        {/* Positioning Statement Bar */}
        <div className="mt-16 pt-8 border-t border-[#202430] w-full max-w-2xl text-center">
          <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
            No somos una persona que hace páginas sueltas. Somos tu equipo de <span className="text-white font-medium">Desarrollo Web</span>, <span className="text-white font-medium">IA</span>, <span className="text-white font-medium">Automatización</span> y <span className="text-white font-medium">E-commerce</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
