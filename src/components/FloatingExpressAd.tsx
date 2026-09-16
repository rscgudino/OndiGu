```tsx
import React, { useState, useEffect, useRef } from 'react';
import { Zap, ArrowRight, X, Clock } from 'lucide-react';

interface FloatingExpressAdProps {
  onSelectExpress: () => void;
}

export const FloatingExpressAd: React.FC<FloatingExpressAdProps> = ({
  onSelectExpress,
}) => {
  const [position, setPosition] = useState({ x: 40, y: 140 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const cardRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // ============================================================
  // POSICIÓN Y VELOCIDAD
  // ============================================================

  const posRef = useRef({
    x: 40,
    y: 140,
  });

  const velRef = useRef({
    vx: 1.1,
    vy: 0.9,
  });

  // ============================================================
  // ANIMACIÓN FLOTANTE
  // ============================================================

  useEffect(() => {
    const initialX = Math.min(
      Math.max(30, window.innerWidth * 0.15),
      window.innerWidth - 190
    );

    const initialY = Math.min(
      Math.max(100, window.innerHeight * 0.25),
      window.innerHeight - 190
    );

    posRef.current = {
      x: initialX,
      y: initialY,
    };

    setPosition({
      x: initialX,
      y: initialY,
    });

    const move = () => {
      if (!isHovered && !isMinimized && isVisible) {
        const size = cardRef.current
          ? Math.max(
              cardRef.current.offsetWidth,
              cardRef.current.offsetHeight
            )
          : 170;

        const maxX = window.innerWidth - size - 15;
        const maxY = window.innerHeight - size - 15;

        const minX = 15;
        const minY = 80;

        let newX =
          posRef.current.x + velRef.current.vx;

        let newY =
          posRef.current.y + velRef.current.vy;

        // Rebote horizontal
        if (newX >= maxX) {
          newX = maxX;
          velRef.current.vx =
            -Math.abs(velRef.current.vx);
        } else if (newX <= minX) {
          newX = minX;
          velRef.current.vx =
            Math.abs(velRef.current.vx);
        }

        // Rebote vertical
        if (newY >= maxY) {
          newY = maxY;
          velRef.current.vy =
            -Math.abs(velRef.current.vy);
        } else if (newY <= minY) {
          newY = minY;
          velRef.current.vy =
            Math.abs(velRef.current.vy);
        }

        posRef.current = {
          x: newX,
          y: newY,
        };

        setPosition({
          x: newX,
          y: newY,
        });
      }

      animFrameRef.current =
        requestAnimationFrame(move);
    };

    animFrameRef.current =
      requestAnimationFrame(move);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(
          animFrameRef.current
        );
      }
    };
  }, [
    isHovered,
    isMinimized,
    isVisible,
  ]);

  // ============================================================
  // OCULTO
  // ============================================================

  if (!isVisible) {
    return null;
  }

  // ============================================================
  // MINIMIZADO
  // ============================================================

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() =>
          setIsMinimized(false)
        }
        className="
          fixed
          bottom-5
          left-5
          z-40

          w-14
          h-14

          flex
          items-center
          justify-center

          bg-[#151821]

          hover:bg-[#1e222e]

          text-[#FF8C00]

          border-2
          border-[#FF4500]/60

          rounded-full

          shadow-[0_4px_20px_rgba(255,69,0,0.4)]

          cursor-pointer

          transition-all

          hover:scale-110
        "
        title="Restaurar Landing Express 24hs"
        aria-label="Restaurar Landing Express 24hs"
      >
        <Zap
          className="
            w-6
            h-6

            text-[#FF4500]

            fill-[#FF4500]

            animate-bounce
          "
        />
      </button>
    );
  }

  // ============================================================
  // TARJETA CIRCULAR
  // ============================================================

  return (
    <div
      ref={cardRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
      className="
        fixed
        top-0
        left-0

        z-40

        pointer-events-auto

        will-change-transform

        transition-transform
        duration-75
      "
    >

      {/* ======================================================
          CÍRCULO PRINCIPAL
          ====================================================== */}

      <div
        onClick={onSelectExpress}
        className="
          group

          relative

          w-[175px]
          h-[175px]

          sm:w-[190px]
          sm:h-[190px]

          rounded-full

          bg-gradient-to-br
          from-[#141722]
          via-[#1a1e2b]
          to-[#0e1017]

          border-[3px]
          border-[#FF4500]

          hover:border-[#FF8C00]

          shadow-[0_0_35px_rgba(255,69,0,0.5)]

          hover:shadow-[0_0_50px_rgba(255,140,0,0.65)]

          backdrop-blur-md

          flex
          flex-col

          items-center
          justify-center

          text-center

          select-none

          cursor-pointer

          overflow-visible

          transition-all
          duration-300

          hover:scale-105
        "
      >

        {/* ====================================================
            HALO NEÓN
            ==================================================== */}

        <div
          className="
            absolute

            -inset-2

            rounded-full

            bg-gradient-to-r
            from-[#FF4500]
            via-[#FF8C00]
            to-[#FF4500]

            blur-xl

            opacity-30

            group-hover:opacity-60

            transition-opacity

            -z-10

            pointer-events-none
          "
        />

        {/* ====================================================
            SEGUNDO ANILLO
            ==================================================== */}

        <div
          className="
            absolute

            inset-1

            rounded-full

            border

            border-[#FF8C00]/20

            pointer-events-none
          "
        />

        {/* ====================================================
            ICONO
            ==================================================== */}

        <div
          className="
            relative

            w-11
            h-11

            sm:w-12
            sm:h-12

            rounded-full

            bg-gradient-to-br
            from-[#FF4500]
            to-[#FF8C00]

            flex
            items-center
            justify-center

            text-white

            shadow-[0_0_20px_rgba(255,69,0,0.45)]

            group-hover:scale-110

            transition-transform
          "
        >
          <Zap
            className="
              w-6
              h-6

              sm:w-7
              sm:h-7

              fill-white

              text-white

              animate-pulse
            "
          />
        </div>


        {/* ====================================================
            ENTREGA RÉCORD
            ==================================================== */}

        <div
          className="
            flex
            items-center

            gap-1

            mt-2
          "
        >
          <Clock
            className="
              w-3
              h-3

              text-[#FF4500]
            "
          />

          <span
            className="
              text-[8px]

              sm:text-[9px]

              font-mono

              font-bold

              text-[#FF8C00]

              uppercase

              tracking-wider
            "
          >
            Entrega récord
          </span>

          <span
            className="
              w-1.5
              h-1.5

              rounded-full

              bg-emerald-400

              animate-ping
            "
          />
        </div>


        {/* ====================================================
            TITULO
            ==================================================== */}

        <h4
          className="
            mt-1

            px-5

            text-[12px]

            sm:text-[13px]

            font-black

            text-white

            leading-tight

            tracking-tight

            group-hover:text-[#FF8C00]

            transition-colors
          "
        >
          Tu Landing Page
        </h4>


        <p
          className="
            text-[17px]

            sm:text-[18px]

            font-black

            text-[#FF4500]

            leading-tight

            mt-0.5
          "
        >
          en 24hs
        </p>


        {/* ====================================================
            SUBTEXTO
            ==================================================== */}

        <p
          className="
            mt-1

            text-[9px]

            sm:text-[10px]

            text-[#a5abbd]

            font-medium
          "
        >
          100% lista
        </p>


        {/* ====================================================
            BOTÓN FLECHA
            ==================================================== */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectExpress();
          }}
          className="
            absolute

            bottom-2
            right-2

            w-8
            h-8

            rounded-full

            bg-[#FF4500]

            hover:bg-[#FF8C00]

            text-white

            flex
            items-center
            justify-center

            shadow-[0_0_15px_rgba(255,69,0,0.5)]

            transition-all

            hover:scale-110

            cursor-pointer
          "
          title="Pedir Landing en 24hs"
          aria-label="Pedir Landing en 24hs"
        >
          <ArrowRight
            className="
              w-4
              h-4
            "
          />
        </button>


        {/* ====================================================
            BOTÓN MINIMIZAR
            ==================================================== */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="
            absolute

            -top-2
            -right-2

            w-6
            h-6

            rounded-full

            bg-[#1c202e]

            border
            border-[#3a4052]

            text-[#8e94a5]

            hover:text-white

            hover:bg-[#252a39]

            flex
            items-center
            justify-center

            shadow-[0_2px_10px_rgba(0,0,0,0.5)]

            transition-all

            hover:scale-110

            cursor-pointer
          "
          title="Minimizar anuncio"
          aria-label="Minimizar anuncio"
        >
          <X
            className="
              w-3.5
              h-3.5
            "
          />
        </button>

      </div>


      {/* ======================================================
          MENSAJE AL PASAR EL MOUSE
          ====================================================== */}

      {isHovered && (
        <div
          className="
            absolute

            top-full

            left-1/2

            -translate-x-1/2

            mt-2

            whitespace-nowrap

            text-center
          "
        >
          <span
            className="
              text-[10px]

              font-mono

              text-[#FF8C00]

              bg-[#0c0e12]/95

              px-3
              py-1

              rounded-full

              border
              border-[#232738]

              shadow-lg
            "
          >
            Click para cotizar ahora
          </span>
        </div>
      )}

    </div>
  );
};
```
