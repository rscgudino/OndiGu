
import { useEffect, useRef, useState } from "react";
import { Zap, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingExpressAdProps {
  onSelectExpress: () => void;
}

export default function FloatingExpressAd({
  onSelectExpress,
}: FloatingExpressAdProps) {
  const [position, setPosition] = useState({ x: 40, y: 180 });
  const [velocity, setVelocity] = useState({ x: 0.45, y: 0.35 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>();

  // Movimiento flotante
  useEffect(() => {
    const animate = () => {
      if (!cardRef.current || isHovered) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const card = cardRef.current;
      const width = card.offsetWidth;
      const height = card.offsetHeight;

      const maxX = window.innerWidth - width - 12;
      const maxY = window.innerHeight - height - 12;

      setPosition((prev) => {
        let nextX = prev.x + velocity.x;
        let nextY = prev.y + velocity.y;

        let nextVelocityX = velocity.x;
        let nextVelocityY = velocity.y;

        if (nextX <= 8 || nextX >= maxX) {
          nextVelocityX = -velocity.x;
          nextX = Math.max(8, Math.min(nextX, maxX));
        }

        if (nextY <= 8 || nextY >= maxY) {
          nextVelocityY = -velocity.y;
          nextY = Math.max(8, Math.min(nextY, maxY));
        }

        if (
          nextVelocityX !== velocity.x ||
          nextVelocityY !== velocity.y
        ) {
          setVelocity({
            x: nextVelocityX,
            y: nextVelocityY,
          });
        }

        return {
          x: nextX,
          y: nextY,
        };
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [velocity, isHovered]);

  // Burbuja minimizada
  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          scale: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSelectExpress}
        className="
          fixed z-[9999]
          w-12 h-12
          sm:w-14 sm:h-14
          rounded-full
          bg-orange-500/25
          backdrop-blur-md
          border border-orange-300/50
          shadow-[0_0_22px_rgba(249,115,22,0.35)]
          flex items-center justify-center
        "
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <Zap
          size={20}
          className="text-orange-300 fill-orange-300"
        />
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        left: position.x,
        top: position.y,
        opacity: 1,
        scale: [1, 1.055, 1],
      }}
      transition={{
        left: {
          duration: 0.08,
          ease: "linear",
        },
        top: {
          duration: 0.08,
          ease: "linear",
        },
        opacity: {
          duration: 0.3,
        },
        scale: {
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelectExpress}
      className="
        fixed z-[9999]
        w-[145px] h-[145px]
        sm:w-[160px] sm:h-[160px]
        rounded-full
        overflow-visible
        cursor-pointer
        select-none
      "
    >
      {/* =====================================================
          HALO EXTERIOR
          ===================================================== */}
      <div
        className="
          absolute
          -inset-3
          rounded-full
          bg-orange-500/10
          blur-xl
          pointer-events-none
        "
      />

      {/* Segundo halo muy suave */}
      <div
        className="
          absolute
          -inset-1
          rounded-full
          border border-orange-400/20
          pointer-events-none
        "
      />

      {/* =====================================================
          BURBUJA DE VIDRIO
          ===================================================== */}
      <div
        className="
          absolute inset-0
          rounded-full
          overflow-hidden
          bg-white/[0.035]
          backdrop-blur-[3px]
          border border-orange-300/45
          shadow-[0_0_25px_rgba(249,115,22,0.22)]
        "
      >
        {/* Reflejo superior */}
        <div
          className="
            absolute
            top-[-20%]
            left-[15%]
            w-[70%]
            h-[45%]
            rounded-full
            bg-white/[0.08]
            blur-xl
            pointer-events-none
          "
        />

        {/* Brillo naranja interno */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.13),transparent_55%)]
            pointer-events-none
          "
        />

        {/* Anillo interior */}
        <div
          className="
            absolute
            inset-[7px]
            rounded-full
            border border-white/[0.10]
            pointer-events-none
          "
        />
      </div>

      {/* =====================================================
          CONTENIDO
          ===================================================== */}
      <div
        className="
          absolute inset-0
          z-10
          flex flex-col
          items-center
          justify-center
          text-center
          px-3
        "
      >
        {/* Rayo */}
        <div
          className="
            w-9 h-9
            sm:w-10 sm:h-10
            rounded-full
            bg-orange-500/35
            backdrop-blur-sm
            border border-orange-300/40
            flex items-center justify-center
            shadow-[0_0_16px_rgba(249,115,22,0.35)]
            mb-1
          "
        >
          <Zap
            size={18}
            className="
              text-orange-300
              fill-orange-300
            "
          />
        </div>

        {/* EXPRESS */}
        <span
          className="
            text-[8px]
            sm:text-[9px]
            uppercase
            tracking-[0.20em]
            text-orange-300/90
            font-bold
          "
        >
          EXPRESS
        </span>

        {/* Landing */}
        <div className="mt-0.5">
          <div
            className="
              text-[12px]
              sm:text-[13px]
              font-bold
              text-white/90
              leading-tight
            "
          >
            Tu Landing
          </div>

          <div
            className="
              text-[17px]
              sm:text-[19px]
              font-black
              text-orange-300
              leading-tight
              drop-shadow-[0_0_7px_rgba(249,115,22,0.45)]
            "
          >
            24hs
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTÓN ARROW
          ===================================================== */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelectExpress();
        }}
        className="
          absolute
          z-30
          bottom-[12px]
          right-[12px]
          w-7 h-7
          sm:w-8 sm:h-8
          rounded-full
          bg-orange-500/45
          backdrop-blur-md
          border border-orange-200/40
          hover:bg-orange-400/65
          hover:border-orange-200/70
          flex items-center justify-center
          transition-all duration-200
          shadow-[0_0_13px_rgba(249,115,22,0.30)]
        "
        aria-label="Ver Express"
      >
        <ArrowRight
          size={14}
          className="text-white"
        />
      </button>

      {/* =====================================================
          BOTÓN MINIMIZAR
          ===================================================== */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMinimized(true);
        }}
        className="
          absolute
          z-30
          top-[11px]
          right-[11px]
          w-6 h-6
          rounded-full
          bg-black/15
          backdrop-blur-md
          hover:bg-black/35
          border border-white/15
          flex items-center justify-center
          transition-all
        "
        aria-label="Minimizar"
      >
        <X
          size={11}
          className="text-white/65"
        />
      </button>

      {/* =====================================================
          TEXTO AL PASAR EL MOUSE
          ===================================================== */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            absolute
            z-50
            -bottom-8
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            px-2.5 py-1
            rounded-full
            bg-black/45
            backdrop-blur-md
            border border-orange-400/20
            text-[9px]
            text-white/80
            pointer-events-none
          "
        >
          Landing lista en 24hs
        </motion.div>
      )}
    </motion.div>
  );
}



