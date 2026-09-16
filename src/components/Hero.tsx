import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { HeroBrandAnimation } from './HeroBrandAnimation';

interface HeroProps {
  onQuoteClick: () => void;
  onPortfolioClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onPortfolioClick }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Synchronized scroll tracking for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth springs for fluid, physics-based scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Parallax translation for the right-side portrait
  const yBg = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  const scaleBg = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // Foreground text parallax: as you scroll, text glides smoothly upward
  const yText = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacityText = useTransform(smoothProgress, [0, 0.75, 1], [1, 0.6, 0.2]);

  // Parallax for the floating badge on Pedro's side
  const yBadge = useTransform(smoothProgress, [0, 1], [0, 50]);
  const opacityBadge = useTransform(smoothProgress, [0, 0.85], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[96vh] lg:min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-center items-center overflow-hidden bg-[#0c0e12]"
    >
      {/* ============================================================ */}
      {/* 1. PEDRO'S PORTRAIT ANCHORED CLEARLY ON THE RIGHT SIDE       */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute top-0 right-0 w-full lg:w-[58%] xl:w-[52%] h-[118%] z-0 pointer-events-none overflow-hidden select-none"
      >
       <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  aria-label="Pedro Gudiño - Fundador y Diseñador Web de OndiGu"
  className="w-full h-full object-cover object-[center_14%] sm:object-[center_16%] lg:object-[center_20%] filter grayscale contrast-[1.14] brightness-[1.08]"
>
  <source src="/assets/pedro-bg.mp4" type="video/mp4" />
  Tu navegador no soporta la reproducción de video.
</video>

        {/* Left blend gradient: seamlessly dissolves into the dark background of the text column */}
        <div 
          className="absolute inset-y-0 left-0 w-44 sm:w-64 lg:w-80 bg-gradient-to-r from-[#0c0e12] via-[#0c0e12]/85 to-transparent pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Top blend gradient */}
        <div 
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0c0e12]/85 via-[#0c0e12]/40 to-transparent pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Bottom blend gradient */}
        <div 
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0c0e12] to-transparent pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Radial highlight around Pedro on the right */}
        <div 
          className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-gradient-to-b from-[#FF4500]/12 via-[#FF8C00]/4 to-transparent rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />
      </motion.div>

      {/* Global subtle ambient glow for brand warmth */}
      <div 
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#FF4500]/14 via-[#FF8C00]/5 to-transparent rounded-full blur-3xl z-1 pointer-events-none"
        aria-hidden="true" 
      />

      {/* Subtle geometric grid backdrop */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1b1e28_1px,transparent_1px),linear-gradient(to_bottom,#1b1e28_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_40%_40%,#0c0e12_70%,transparent_100%)] opacity-20 z-1 pointer-events-none"
        aria-hidden="true" 
      />

      {/* ============================================================ */}
      {/* 2. FOREGROUND CONTENT: LEFT COLUMN (NO OVERLAP WITH FACE)    */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Texts, Logo & CTAs */}
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-20 sm:pt-24 lg:pt-0"
          >
            {/* Animated Brand Mark: G + estela de energía (Conserved) */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="w-full flex justify-center lg:justify-start mb-2"
            >
              <div className="scale-90 sm:scale-100 origin-center lg:origin-left">
                <HeroBrandAnimation />
              </div>
            </motion.div>

            {/* Real text wordmark superposed with precision */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center lg:items-start mb-5"
            >
              <h2 className="font-brand text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white leading-none select-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                Ondi<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FF6000] to-[#FF4500] drop-shadow-[0_0_35px_rgba(255,69,0,0.4)]">Gu</span>
              </h2>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
                <p className="text-xs sm:text-sm font-medium tracking-wide text-[#b0b7c9]">
                  Tecnología con onda <span className="text-[#3a4155] mx-1.5">•</span> <span className="text-[#FF8C00]">La señal de Gudiño</span>
                </p>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-5 max-w-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            >
              Conectamos tu negocio con tecnología inteligente.
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-[#e1e6f4] font-normal leading-relaxed max-w-xl mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              Desarrollo web, IA y automatización. Todo en uno. Simple. Sin vueltas.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mb-8"
            >
              <button
                id="hero-primary-quote-cta"
                type="button"
                onClick={onQuoteClick}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] rounded-xl shadow-[0_0_35px_rgba(255,69,0,0.45)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Pedí tu presupuesto
              </button>

              <button
                id="hero-secondary-portfolio-cta"
                type="button"
                onClick={onPortfolioClick}
                className="w-full sm:w-auto px-7 py-4 text-base font-medium text-[#e4e8f5] hover:text-white bg-[#151822]/90 hover:bg-[#1f2434] border border-[#2c3348] hover:border-[#424c68] rounded-xl transition-all duration-200 backdrop-blur-md cursor-pointer"
              >
                Ver portfolio
              </button>
            </motion.div>

            {/* Positioning Statement Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="pt-6 border-t border-[#202536]/80 w-full max-w-xl text-center lg:text-left"
            >
              <p className="text-xs sm:text-sm text-[#8f97ab] leading-relaxed">
                No somos una persona que hace páginas sueltas. Somos tu equipo de <span className="text-white font-medium">Desarrollo Web</span>, <span className="text-white font-medium">IA</span>, <span className="text-white font-medium">Automatización</span> y <span className="text-white font-medium">E-commerce</span>.
              </p>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: Pedro's Visual Space & Floating Badge */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center pointer-events-none select-none min-h-[140px] lg:min-h-[380px]">
            
            {/* Parallax Floating Badge anchored on the right */}
            <motion.div
              style={{ y: yBadge, opacity: opacityBadge }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-4 lg:mt-auto mb-4 px-4 py-2.5 rounded-2xl bg-[#0f121a]/90 border border-[#283042] shadow-[0_20px_40px_rgba(0,0,0,0.9)] backdrop-blur-md flex items-center gap-3"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-left">
                <p className="font-mono text-[11px] font-semibold text-white tracking-wide">
                  Pedro Gudiño
                </p>
                <p className="text-[10px] text-[#a5abbf] font-light">
                  Fundador & Diseñador Web • <span className="text-[#FF8C00]">En línea</span>
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. BOTTOM SCROLL CUE                                         */}
      {/* ============================================================ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-2 flex items-center justify-between text-xs text-[#828a9e]"
      >
        <div className="flex items-center gap-2 animate-bounce">
          <span className="font-mono text-[10px] tracking-wider uppercase">
            Deslizá para explorar
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-[#FF8C00]" />
        </div>

        <span className="font-mono text-[10px] hidden sm:inline text-[#687185]">
          Lanús • Argentina & Remoto al mundo
        </span>
      </motion.div>
    </section>
  );
};
