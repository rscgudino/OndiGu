

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

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSelectExpress}
        className="
          fixed z-[9999]
          w-12 h-12
          sm:w-14 sm:h-14
          rounded-full
          bg-orange-500/75
          backdrop-blur-md
          border border-orange-300/60
          shadow-[0_0_25px_rgba(249,115,22,0.45)]
          flex items-center justify-center
        "
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <Zap
          size={21}
          className="text-white fill-white"
        />
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        left: position.x,
        top: position.y,
      }}
      transition={{
        scale: {
          duration: 0.45,
          type: "spring",
          stiffness: 180,
        },
        opacity: {
          duration: 0.3,
        },
        left: {
          duration: 0.08,
          ease: "linear",
        },
        top: {
          duration: 0.08,
          ease: "linear",
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
        overflow-hidden
        cursor-pointer
        select-none
      "
    >
      {/* Halo exterior */}
      <div
        className="
          absolute inset-[-5px]
          rounded-full
          bg-orange-500/15
          blur-md
        "
      />

      {/* Círculo principal */}
      <div
        className="
          absolute inset-0
          rounded-full
          border border-orange-300/50
          bg-black/35
          backdrop-blur-xl
          shadow-[0_0_30px_rgba(249,115,22,0.30)]
        "
      />

      {/* Anillo interior */}
      <div
        className="
          absolute inset-[7px]
          rounded-full
          border border-orange-400/20
          pointer-events-none
        "
      />

      {/* Brillo superior */}
      <div
        className="
          absolute
          top-2 left-1/2
          -translate-x-1/2
          w-16 h-8
          rounded-full
          bg-orange-400/15
          blur-xl
          pointer-events-none
        "
      />

      {/* Contenido */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-3">

        {/* Icono */}
        <div
          className="
            w-9 h-9
            sm:w-10 sm:h-10
            rounded-full
            bg-orange-500/75
            border border-orange-200/50
            flex items-center justify-center
            shadow-[0_0_18px_rgba(249,115,22,0.45)]
            mb-1
          "
        >
          <Zap
            size={18}
            className="text-white fill-white"
          />
        </div>

        {/* Texto pequeño */}
        <span
          className="
            text-[8px]
            sm:text-[9px]
            uppercase
            tracking-[0.18em]
            text-orange-300
            font-semibold
          "
        >
          EXPRESS
        </span>

        {/* Texto principal */}
        <div className="mt-0.5">
          <div
            className="
              text-[13px]
              sm:text-[14px]
              font-black
              text-white
              leading-tight
            "
          >
            Tu Landing
          </div>

          <div
            className="
              text-[16px]
              sm:text-[18px]
              font-black
              text-orange-400
              leading-tight
              drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]
            "
          >
            24hs
          </div>
        </div>

        {/* CTA circular */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectExpress();
          }}
          className="
            absolute
            bottom-[13px]
            right-[13px]
            w-7 h-7
            sm:w-8 sm:h-8
            rounded-full
            bg-orange-500/80
            hover:bg-orange-400
            border border-orange-200/50
            flex items-center justify-center
            transition-all
            shadow-[0_0_14px_rgba(249,115,22,0.4)]
          "
          aria-label="Ver Express"
        >
          <ArrowRight
            size={14}
            className="text-white"
          />
        </button>
      </div>

      {/* Botón minimizar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMinimized(true);
        }}
        className="
          absolute
          top-[13px]
          right-[13px]
          z-30
          w-6 h-6
          rounded-full
          bg-black/35
          hover:bg-black/60
          border border-white/20
          flex items-center justify-center
          transition-all
        "
        aria-label="Minimizar"
      >
        <X
          size={11}
          className="text-white/75"
        />
      </button>

      {/* Texto flotante al pasar el mouse */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            absolute
            -bottom-8
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            px-2.5 py-1
            rounded-full
            bg-black/65
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

