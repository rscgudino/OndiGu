import React, { useEffect, useRef, useState } from "react";
import { Zap, ArrowRight, X, Clock } from "lucide-react";
import { motion } from "motion/react";

interface FloatingExpressAdProps {
  onSelectExpress: () => void;
}

export function FloatingExpressAd({
  onSelectExpress,
}: FloatingExpressAdProps) {
  // Posición inicial discreta
  const [position, setPosition] = useState({ x: 20, y: 180 });
  const [velocity, setVelocity] = useState({ x: 0.35, y: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640;
    }
    return false;
  });

  const bubbleRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position);
  const velocityRef = useRef(velocity);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  // ============================================================
  // MOVIMIENTO FLOTANTE SUAVE Y CONTROLADO
  // ============================================================
  useEffect(() => {
    const animate = () => {
      const bubble = bubbleRef.current;

      if (!bubble) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isHovered) {
        const width = bubble.offsetWidth;
        const height = bubble.offsetHeight;

        const maxX = window.innerWidth - width - 12;
        const maxY = window.innerHeight - height - 12;

        let { x, y } = positionRef.current;
        let { x: vx, y: vy } = velocityRef.current;

        x += vx;
        y += vy;

        if (x >= maxX) {
          x = maxX;
          vx = -Math.abs(vx);
        } else if (x <= 12) {
          x = 12;
          vx = Math.abs(vx);
        }

        if (y >= maxY) {
          y = maxY;
          vy = -Math.abs(vy);
        } else if (y <= 75) {
          y = 75;
          vy = Math.abs(vy);
        }

        positionRef.current = { x, y };
        velocityRef.current = { x: vx, y: vy };
        setPosition({ x, y });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  // ============================================================
  // ESTADO MINIMIZADO: MINI SMARTPHONE FLOTANTE
  // ============================================================
  if (isMinimized) {
    return (
      <motion.button
        id="minimized-express-phone-button"
        type="button"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={() => setIsMinimized(false)}
        className="
          fixed z-[9999]
          w-10 h-14 sm:w-11 sm:h-16
          rounded-[12px]
          bg-[#131620]
          border-2 border-[#FF8C00]/60
          shadow-[0_0_20px_rgba(255,140,0,0.35)]
          flex flex-col items-center justify-between py-1.5 px-1
          cursor-pointer
          transition-transform active:scale-95
          group
        "
        style={{
          left: position.x,
          top: position.y,
        }}
        aria-label="Abrir promo Landing Express en celular"
      >
        {/* Dynamic Island mini */}
        <div className="w-3.5 h-[2px] bg-black rounded-full" />

        {/* Rayo y texto 24h */}
        <div className="flex flex-col items-center leading-none my-auto">
          <Zap
            size={13}
            className="text-[#FFA500] fill-[#FFA500] drop-shadow-[0_0_6px_rgba(255,140,0,0.8)] animate-pulse mb-0.5"
          />
          <span className="text-[7.5px] font-black text-white tracking-tighter">
            24<span className="text-[#FF8C00]">HS</span>
          </span>
        </div>

        {/* Barra inferior */}
        <div className="w-3 h-[1.5px] bg-white/40 rounded-full" />
      </motion.button>
    );
  }

  // ============================================================
  // SMARTPHONE FLOTANTE PRINCIPAL
  // ============================================================
  return (
    <div
      ref={bubbleRef}
      id="floating-express-phone"
      className="
        fixed z-[9999]
        w-[94px] h-[174px]
        sm:w-[112px] sm:h-[206px]
        cursor-pointer
        select-none
      "
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelectExpress}
    >
      {/* ANIMACIÓN DE VIBRACIÓN / FLOTACIÓN SUTIL */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          y: [0, -3, 0, 3, 0],
          rotate: [-0.6, 0.8, -0.6],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Resplandor exterior neón suave */}
        <div
          className="
            absolute -inset-2
            rounded-[30px]
            bg-[#FF4500]/20
            blur-xl
            pointer-events-none
          "
        />

        {/* ====================================================
            CHASIS EXTERIOR DEL TELÉFONO CELULAR
            ==================================================== */}
        <div
          className="
            relative w-full h-full
            rounded-[24px] sm:rounded-[28px]
            bg-[#141722]
            border-[2.5px] border-[#343b50]
            shadow-[0_14px_35px_-8px_rgba(255,69,0,0.45),0_0_18px_rgba(255,140,0,0.25)]
            p-[3px] sm:p-[4px]
            flex flex-col
            transition-transform duration-200
            hover:scale-[1.03]
          "
        >
          {/* Botones laterales físicos simulados */}
          {/* Botón de bloqueo (derecha) */}
          <div className="absolute -right-[3px] top-11 w-[2.5px] h-6 bg-[#434b63] rounded-r-sm pointer-events-none" />
          {/* Botones de volumen (izquierda) */}
          <div className="absolute -left-[3px] top-9 w-[2.5px] h-4 bg-[#434b63] rounded-l-sm pointer-events-none" />
          <div className="absolute -left-[3px] top-15 w-[2.5px] h-4 bg-[#434b63] rounded-l-sm pointer-events-none" />

          {/* ==================================================
              PANTALLA OLED DEL TELÉFONO
              ================================================== */}
          <div
            className="
              relative w-full h-full
              rounded-[20px] sm:rounded-[23px]
              overflow-hidden
              bg-gradient-to-b from-[#090b12] via-[#0f1422] to-[#07090f]
              border border-white/10
              flex flex-col justify-between
              p-2 sm:p-2.5
              text-center
            "
          >
            {/* Reflejo / Glare diagonal sobre el cristal */}
            <div
              className="
                absolute -top-10 -left-10 w-40 h-60
                bg-gradient-to-br from-white/[0.12] via-transparent to-transparent
                rotate-20 pointer-events-none
              "
            />

            {/* Micro-malla radial de fondo */}
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,69,0,0.18),transparent_70%)]
                pointer-events-none
              "
            />

            {/* --- PARTE SUPERIOR DE LA PANTALLA --- */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Barra de estado: Hora y Batería */}
              <div className="w-full flex items-center justify-between px-1 text-[7px] sm:text-[8px] font-mono text-zinc-400/90 leading-none">
                <span>9:41</span>
                <span className="flex items-center gap-0.5">
                  <span className="w-1.5 h-1 bg-[#FF8C00] rounded-xs inline-block" />
                  <span className="text-[6.5px]">5G</span>
                </span>
              </div>

              {/* Dynamic Island / Isla Dinámica */}
              <div className="w-8 sm:w-10 h-2.5 sm:h-3 bg-black rounded-full mx-auto mt-0.5 flex items-center justify-between px-1.5 border border-white/15 shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1e2538] border border-white/20" />
                <div className="w-1 h-1 rounded-full bg-[#FF4500] animate-pulse" />
              </div>
            </div>

            {/* --- CONTENIDO CENTRAL: PUBLICIDAD EXPRESS 24HS --- */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              {/* Badge EXPRESS con rayo */}
              <div
                className="
                  inline-flex items-center gap-0.5
                  px-1.5 py-0.5
                  rounded-full
                  bg-[#FF4500]/25
                  border border-[#FF4500]/50
                  shadow-[0_0_8px_rgba(255,69,0,0.3)]
                  mb-1
                "
              >
                <Zap
                  size={9}
                  className="text-[#FFA500] fill-[#FFA500] animate-pulse"
                />
                <span className="text-[6.5px] sm:text-[7.5px] font-extrabold tracking-wider uppercase text-[#FF8C00]">
                  EXPRESS
                </span>
              </div>

              {/* Título: Tu Landing */}
              <span className="text-[9px] sm:text-[11px] font-semibold text-white/95 leading-tight tracking-tight">
                Tu Landing
              </span>

              {/* Impacto: 24hs */}
              <div
                className="
                  text-[17px] sm:text-[21px]
                  font-black
                  leading-none
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#FF4500]
                  drop-shadow-[0_0_10px_rgba(255,140,0,0.55)]
                  my-0.5
                "
              >
                24hs
              </div>

              {/* Tagline de entrega rápida */}
              <div className="flex items-center justify-center gap-0.5 text-[6.5px] sm:text-[7.5px] text-zinc-300 font-mono">
                <Clock size={7} className="text-[#FF8C00]" />
                <span>Lista y online</span>
              </div>

              {/* Micro Botón de Acción en la pantalla */}
              <div
                className="
                  mt-1.5
                  w-full
                  py-1 px-1.5
                  rounded-full
                  bg-gradient-to-r from-[#FF4500] to-[#FF8C00]
                  text-white
                  text-[7.5px] sm:text-[8.5px]
                  font-bold
                  flex items-center justify-center gap-0.5
                  shadow-[0_2px_8px_rgba(255,69,0,0.4)]
                  transition-all duration-150
                  hover:brightness-110
                "
              >
                <span>Pedir ya</span>
                <ArrowRight size={8} />
              </div>
            </div>

            {/* --- PARTE INFERIOR: HOME BAR DE SMARTPHONE --- */}
            <div className="relative z-10 w-full flex justify-center pb-0.5">
              <div className="w-8 sm:w-10 h-1 bg-white/40 rounded-full shadow-xs" />
            </div>
          </div>
        </div>

        {/* Botón Minimizar / Cerrar en la esquina superior del celular */}
        <button
          id="close-floating-express-phone"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="
            absolute -top-2 -right-2
            w-5 h-5
            rounded-full
            bg-[#121520]
            border border-white/25
            hover:border-[#FF4500]
            text-zinc-400 hover:text-white
            flex items-center justify-center
            transition-all duration-150
            shadow-md z-40
          "
          aria-label="Minimizar teléfono express"
        >
          <X size={10} />
        </button>
      </motion.div>

      {/* Tooltip flotante al pasar el cursor en desktop */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            hidden sm:block
            absolute z-[100]
            -bottom-7 left-1/2 -translate-x-1/2
            whitespace-nowrap
            px-2.5 py-0.5
            rounded-full
            bg-black/90
            backdrop-blur-md
            border border-orange-400/30
            text-[9px] text-white/90
            pointer-events-none
            shadow-lg
          "
        >
          ⚡ Tu Landing Page en 24hs — Clic para cotizar
        </motion.div>
      )}
    </div>
  );
}

export default FloatingExpressAd;

