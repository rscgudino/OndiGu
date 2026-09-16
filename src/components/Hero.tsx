import React, { useState, useEffect, useRef } from 'react';
import { HeroBrandAnimation } from './HeroBrandAnimation';
import { Volume2, VolumeX, Upload, RotateCcw } from 'lucide-react';
import { loadSavedVideoBlob, saveVideoBlob } from '../lib/videoStorage';
import { PEDRO_GUDINO_INFO } from '../data/content';

interface HeroProps {
  onQuoteClick: () => void;
  onPortfolioClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onPortfolioClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>(PEDRO_GUDINO_INFO.videoUrl);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [customLoaded, setCustomLoaded] = useState(false);

  // Check if custom video was stored in browser memory (IndexedDB)
  useEffect(() => {
    let isMounted = true;
    async function initVideo() {
      try {
        const savedBlob = await loadSavedVideoBlob();
        if (savedBlob && isMounted) {
          const blobUrl = URL.createObjectURL(savedBlob);
          setVideoSrc(blobUrl);
          setCustomLoaded(true);
        }
      } catch (err) {
        console.warn('Could not read video blob from storage:', err);
      }
    }
    initVideo();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const handleVideoFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const newUrl = URL.createObjectURL(file);
      setVideoSrc(newUrl);
      setHasVideoError(false);
      setCustomLoaded(true);
      await saveVideoBlob(file);
      if (videoRef.current) {
        videoRef.current.src = newUrl;
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error('Error saving video to storage:', err);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0c0e12]"
    >
      {/* Ambient background mesh & orange glow */}
      <div 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#FF4500]/14 via-[#FF8C00]/5 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-[#FF8C00]/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Subtle geometric grid backdrop */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1b1e28_1px,transparent_1px),linear-gradient(to_bottom,#1b1e28_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#0c0e12_70%,transparent_100%)] opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT SIDE: Brand, Logos, Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Animated Brand Mark: G + estela de energía (Conserved) */}
            <div className="w-full flex justify-center lg:justify-start mb-3">
              <HeroBrandAnimation />
            </div>

            {/* Real text wordmark superposed with precision (Conserved) */}
            <div className="flex flex-col items-center lg:items-start mb-5">
              <h2 className="font-brand text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white leading-none select-none">
                Ondi<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-[#FF6000] to-[#FF4500] drop-shadow-[0_0_35px_rgba(255,69,0,0.35)]">Gu</span>
              </h2>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
                <p className="text-xs sm:text-sm font-medium tracking-wide text-[#9ba2b5]">
                  Tecnología con onda <span className="text-[#32394d] mx-1.5">•</span> <span className="text-[#FF8C00]">La señal de Gudiño</span>
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.14] mb-5 max-w-2xl">
              Conectamos tu negocio con tecnología inteligente.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#cbd2e1] font-normal leading-relaxed mb-8 max-w-xl">
              Desarrollo web, IA y automatización. Todo en uno. Simple. Sin vueltas.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto mb-8">
              <button
                id="hero-primary-quote-cta"
                type="button"
                onClick={onQuoteClick}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] rounded-xl shadow-[0_0_30px_rgba(255,69,0,0.35)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Pedí tu presupuesto
              </button>

              <button
                id="hero-secondary-portfolio-cta"
                type="button"
                onClick={onPortfolioClick}
                className="w-full sm:w-auto px-7 py-3.5 text-base font-medium text-[#e0e0e0] hover:text-white bg-[#161922] hover:bg-[#1f2330] border border-[#272c3d] hover:border-[#3d455e] rounded-xl transition-all duration-200 cursor-pointer"
              >
                Ver portfolio
              </button>
            </div>

            {/* Positioning Statement Bar */}
            <div className="pt-6 border-t border-[#1f2434] w-full max-w-xl text-center lg:text-left">
              <p className="text-xs sm:text-sm text-[#848d9f] leading-relaxed">
                No somos una persona que hace páginas sueltas. Somos tu equipo de <span className="text-white font-medium">Desarrollo Web</span>, <span className="text-white font-medium">IA</span>, <span className="text-white font-medium">Automatización</span> y <span className="text-white font-medium">E-commerce</span>.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE: Video Container (AutoPlay, loop, muted, playsInline) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end w-full">
            <div className="w-full max-w-md lg:max-w-none relative group">
              
              {/* Outer decorative ambient glow */}
              <div 
                className="absolute -inset-1 bg-gradient-to-r from-[#FF4500]/25 via-[#FF8C00]/15 to-[#FF4500]/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Main Card Frame */}
              <div className="relative bg-[#12151e] border-2 border-[#262c3e] group-hover:border-[#FF8C00]/50 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-300">
                
                {/* Top Status Header */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0f1118] border-b border-[#212638] text-xs">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-[11px] font-medium tracking-wide">
                      Pedro Gudiño • Diseñador Web
                    </span>
                  </div>
                  <span className="text-[#788196] font-mono text-[10px]">
                    En vivo
                  </span>
                </div>

                {/* Video Player */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
                  {hasVideoError ? (
                    <img
                      src="/assets/pedro-gudino-bw.jpg"
                      alt="Pedro Gudiño - Diseñador Web de OndiGu"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      poster="/assets/pedro-gudino-bw.jpg"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      onError={() => setHasVideoError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  )}

                  {/* Subtle dark gradient overlay for overlay text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Floating badge inside video */}
                  <div className="absolute bottom-11 left-3.5 pointer-events-none">
                    <span className="inline-block px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-[#FF8C00]/40 text-[#FF8C00] font-mono text-[10px] tracking-wider uppercase mb-0.5">
                      La señal de Gudiño
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      Pedro Gudiño
                    </h3>
                  </div>

                  {/* Integrated mini video playback controls */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1.5 bg-[#0e1017]/85 backdrop-blur-md border border-[#242a3a] rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="p-1.5 rounded-md text-white hover:text-[#FF8C00] hover:bg-[#1a1e2b] transition-colors cursor-pointer"
                        title={isMuted ? 'Activar sonido' : 'Silenciar'}
                        aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FF8C00]" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleReplay}
                        className="p-1.5 rounded-md text-white hover:text-[#FF8C00] hover:bg-[#1a1e2b] transition-colors cursor-pointer"
                        title="Reiniciar video"
                        aria-label="Reiniciar video"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={handleVideoFileSelect}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#181c26] hover:bg-[#222838] text-[#a5acbf] hover:text-white border border-[#2d3448] text-[10px] font-mono transition-colors cursor-pointer"
                        title="Cambiar o subir archivo .mp4"
                      >
                        <Upload className="w-2.5 h-2.5 text-[#FF8C00]" />
                        <span>{customLoaded ? 'Cambiar' : 'Subir .mp4'}</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
