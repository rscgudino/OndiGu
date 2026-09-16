import React, { useEffect, useRef, useState } from "react";
import { Zap, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";

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
  // ESTADO MINIMIZADO: BOTÓN FLOTANTE COMPACTO Y ELEGANTE
  // ============================================================
  if (isMinimized) {
    return (
      <motion.button
        type="button"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={() => setIsMinimized(false)}
        className="
          fixed z-[9999]
          w-9 h-9 sm:w-11 sm:h-11
          rounded-full
          overflow-hidden
          bg-white/[0.04]
          backdrop-blur-[3px]
          border border-orange-400/40
          shadow-[0_0_15px_rgba(249,115,22,0.25)]
          flex items-center justify-center
          cursor-pointer
          transition-transform active:scale-95
        "
        style={{
          left: position.x,
          top: position.y,
        }}
        aria-label="Abrir promo Landing Express"
      >
        <div
          className="
            absolute inset-0
            rounded-full
            bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.25),transparent_60%)]
            pointer-events-none
          "
        />

        <Zap
          size={16}
          className="
            relative z-10
            text-orange-300
            fill-orange-300
            drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]
          "
        />
      </motion.button>
    );
  }

  // ============================================================
  // BURBUJA PRINCIPAL (COMPACTA, CRISTAL TRANSLÚCIDO)
  // ============================================================
  return (
    <div
      ref={bubbleRef}
      className="
        fixed z-[9999]
        w-[86px] h-[86px]
        sm:w-[108px] sm:h-[108px]
        rounded-full
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
      {/* CAPA DE LATIDO / PULSO DISCRETO */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.025, 1.05, 1.015, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.22, 0.38, 0.55, 1],
        }}
      >
        {/* Halo exterior suave */}
        <div
          className="
            absolute
            -inset-2
            rounded-full
            bg-orange-500/[0.06]
            blur-lg
            pointer-events-none
          "
        />

        {/* Halo pulsante fino */}
        <motion.div
          className="
            absolute
            -inset-0.5
            rounded-full
            border border-orange-400/25
            pointer-events-none
          "
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cristal transparente */}
        <div
          className="
            absolute inset-0
            rounded-full
            overflow-hidden
            bg-black/40 sm:bg-white/[0.025]
            backdrop-blur-[2px]
            border border-orange-400/40
            shadow-[0_0_18px_rgba(249,115,22,0.18)]
          "
        >
          {/* Luz radial interior */}
          <div
            className="
              absolute inset-0
              rounded-full
              bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.12),transparent_55%)]
              pointer-events-none
            "
          />

          {/* Reflejo superior */}
          <div
            className="
              absolute
              top-[-15%]
              left-[20%]
              w-[60%]
              h-[35%]
              rounded-full
              bg-white/[0.06]
              blur-md
              pointer-events-none
            "
          />
        </div>

        {/* ====================================================
            CONTENIDO CENTRAL (PROPORCIÓN REFINADA)
            ==================================================== */}
        <div
          className="
            relative z-20
            w-full h-full
            rounded-full
            flex flex-col items-center justify-center
            text-center
            px-2
          "
        >
          {/* Rayo con animación de pulso */}
          <motion.div
            className="mb-0.5"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap
              size={13}
              className="
                text-orange-300
                fill-orange-300
                drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]
              "
            />
          </motion.div>

          {/* EXPRESS */}
          <span
            className="
              text-[6.5px]
              sm:text-[7.5px]
              uppercase
              tracking-[0.18em]
              text-orange-300/90
              font-bold
              leading-none
            "
          >
            EXPRESS
          </span>

          {/* Texto Landing 24hs */}
          <div className="mt-0.5 leading-none">
            <div
              className="
                text-[9px]
                sm:text-[11px]
                font-semibold
                text-white/90
                leading-tight
              "
            >
              Tu Landing
            </div>

            <div
              className="
                text-[13px]
                sm:text-[15px]
                font-black
                text-orange-300
                leading-tight
                drop-shadow-[0_0_6px_rgba(249,115,22,0.45)]
              "
            >
              24hs
            </div>
          </div>
        </div>

        {/* Botón flecha pequeño */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectExpress();
          }}
          className="
            absolute
            z-30
            bottom-[6px]
            right-[6px]
            w-5 h-5
            sm:w-6 sm:h-6
            rounded-full
            bg-orange-500/35
            backdrop-blur-md
            border border-orange-200/35
            hover:bg-orange-400/60
            flex items-center justify-center
            transition-all duration-200
            shadow-[0_0_8px_rgba(249,115,22,0.25)]
          "
          aria-label="Ver Express"
        >
          <ArrowRight size={10} className="text-white" />
        </button>

        {/* Botón Cerrar / Minimizar */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="
            absolute
            z-30
            top-[5px]
            right-[5px]
            w-4 h-4
            sm:w-5 sm:h-5
            rounded-full
            bg-black/30
            backdrop-blur-md
            hover:bg-black/60
            border border-white/20
            flex items-center justify-center
            transition-all
          "
          aria-label="Minimizar burbuja"
        >
          <X size={8} className="text-white/70" />
        </button>
      </motion.div>

      {/* Tooltip al pasar el mouse en desktop */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            hidden sm:block
            absolute
            z-[100]
            -bottom-7
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            px-2.5 py-0.5
            rounded-full
            bg-black/80
            backdrop-blur-md
            border border-orange-400/30
            text-[9px]
            text-white/90
            pointer-events-none
          "
        >
          Landing lista en 24hs
        </motion.div>
      )}
    </div>
  );
}

export default FloatingExpressAd;
