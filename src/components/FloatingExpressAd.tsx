import React, { useState, useEffect, useRef } from 'react';
import { Zap, ArrowRight, X, Sparkles, Clock } from 'lucide-react';

interface FloatingExpressAdProps {
  onSelectExpress: () => void;
}

export const FloatingExpressAd: React.FC<FloatingExpressAdProps> = ({ onSelectExpress }) => {
  const [position, setPosition] = useState({ x: 40, y: 140 });
  const [velocity, setVelocity] = useState({ vx: 1.1, vy: 0.9 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const cardRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Position and velocity refs to avoid closure lag during continuous animation
  const posRef = useRef({ x: 40, y: 140 });
  const velRef = useRef({ vx: 1.1, vy: 0.9 });

  useEffect(() => {
    // Randomize initial position slightly so it looks natural
    const initialX = Math.min(Math.max(30, window.innerWidth * 0.15), window.innerWidth - 320);
    const initialY = Math.min(Math.max(100, window.innerHeight * 0.25), window.innerHeight - 150);
    posRef.current = { x: initialX, y: initialY };
    setPosition({ x: initialX, y: initialY });

    const move = () => {
      if (!isHovered && !isMinimized && isVisible) {
        const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 300;
        const cardHeight = cardRef.current ? cardRef.current.offsetHeight : 80;

        const maxX = window.innerWidth - cardWidth - 15;
        const maxY = window.innerHeight - cardHeight - 15;
        const minX = 15;
        const minY = 80; // Keep below top navigation

        let newX = posRef.current.x + velRef.current.vx;
        let newY = posRef.current.y + velRef.current.vy;

        // Bounce horizontally
        if (newX >= maxX) {
          newX = maxX;
          velRef.current.vx = -Math.abs(velRef.current.vx);
        } else if (newX <= minX) {
          newX = minX;
          velRef.current.vx = Math.abs(velRef.current.vx);
        }

        // Bounce vertically
        if (newY >= maxY) {
          newY = maxY;
          velRef.current.vy = -Math.abs(velRef.current.vy);
        } else if (newY <= minY) {
          newY = minY;
          velRef.current.vy = Math.abs(velRef.current.vy);
        }

        posRef.current = { x: newX, y: newY };
        setPosition({ x: newX, y: newY });
      }

      animFrameRef.current = requestAnimationFrame(move);
    };

    animFrameRef.current = requestAnimationFrame(move);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isHovered, isMinimized, isVisible]);

  if (!isVisible) return null;

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-3 py-2 bg-[#151821] hover:bg-[#1e222e] text-[#FF8C00] border border-[#FF4500]/50 rounded-full shadow-[0_4px_16px_rgba(255,69,0,0.3)] text-xs font-mono font-bold cursor-pointer transition-all"
        title="Restaurar anuncio de Landing Express 24hs"
      >
        <Zap className="w-3.5 h-3.5 text-[#FF4500] animate-bounce" />
        <span>Landing 24hs Express</span>
      </button>
    );
  }

  return (
    <div
      ref={cardRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-0 left-0 z-40 max-w-[calc(100vw-30px)] sm:max-w-sm pointer-events-auto transition-transform duration-75 will-change-transform"
    >
      <div className="relative bg-gradient-to-r from-[#141722] via-[#1a1e2b] to-[#141722] border-2 border-[#FF4500] hover:border-[#FF8C00] p-3.5 sm:p-4 rounded-xl shadow-[0_0_30px_rgba(255,69,0,0.45)] backdrop-blur-md flex items-center gap-3 select-none group cursor-pointer">
        {/* Ambient neon pulse behind the card */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] rounded-xl blur-sm opacity-40 group-hover:opacity-75 transition-opacity -z-10" />

        {/* Action Icon with continuous gentle pulse */}
        <div 
          onClick={onSelectExpress}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-[#FF4500] to-[#FF8C00] flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform"
        >
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white animate-pulse" />
        </div>

        {/* Content Details */}
        <div 
          onClick={onSelectExpress}
          className="flex-1 min-w-0"
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#FF4500]/20 text-[10px] font-mono font-bold text-[#FF8C00] rounded uppercase tracking-wider">
              <Clock className="w-3 h-3 text-[#FF4500]" />
              Entrega récord
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <h4 className="text-xs sm:text-sm font-black text-white tracking-tight leading-snug group-hover:text-[#FF8C00] transition-colors">
            Tu Landing Page en 24hs. Express
          </h4>

          <p className="text-[11px] text-[#a5abbd] line-clamp-1 mt-0.5 font-medium">
            100% lista...
          </p>
        </div>

        {/* Quick CTA button */}
        <button
          type="button"
          onClick={onSelectExpress}
          className="shrink-0 p-2 rounded-md bg-[#FF4500] hover:bg-[#FF8C00] text-white transition-colors cursor-pointer"
          title="Pedir Landing en 24hs"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Close/Minimize button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#1c202e] border border-[#2e3447] text-[#8e94a5] hover:text-white flex items-center justify-center shadow transition-colors cursor-pointer"
          title="Minimizar anuncio"
          aria-label="Minimizar anuncio"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Little hover hint */}
      {isHovered && (
        <div className="text-center mt-1">
          <span className="text-[10px] font-mono text-[#FF8C00] bg-[#0c0e12]/90 px-2 py-0.5 rounded border border-[#232738]">
            Click para cotizar ahora en Lanús y todo el país
          </span>
        </div>
      )}
    </div>
  );
};
