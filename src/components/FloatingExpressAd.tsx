

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

  const bubbleRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position);
  const velocityRef = useRef(velocity);
  const animationRef = useRef<number>();

  // Mantener las referencias sincronizadas
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  // ============================================================
  // MOVIMIENTO FLOTANTE
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

        // Rebote horizontal
        if (x <= 8) {
          x = 8;
          vx = Math.abs(vx);
        }

        if (x >= maxX) {
          x = maxX;
          vx = -Math.abs(vx);
        }

        // Rebote vertical
        if (y <= 8) {
          y = 8;
          vy = Math.abs(vy);
        }

        if (y >= maxY) {
          y = maxY;
          vy = -Math.abs(vy);
        }

        positionRef.current = { x, y };
        velocityRef.current = { x: vx, y: vy };

        setPosition({ x, y });
        setVelocity({ x: vx, y: vy });
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
  // MINIMIZADA
  // ============================================================
  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: 1,
        }}
        transition={{
          scale: {
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 0.25,
          },
        }}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.94,
        }}
        onClick={onSelectExpress}
        className="
          fixed z-[9999]
          w-12 h-12
          sm:w-14 sm:h-14
          rounded-full
          overflow-hidden
          bg-white/[0.04]
          backdrop-blur-[3px]
          border border-orange-300/45
          shadow-[0_0_22px_rgba(249,115,22,0.28)]
          flex items-center justify-center
          cursor-pointer
        "
        style={{
          left: position.x,
          top: position.y,
        }}
        aria-label="Abrir Express"
      >
        <div
          className="
            absolute inset-0
            rounded-full
            bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.18),transparent_60%)]
            pointer-events-none
          "
        />

        <Zap
          size={20}
          className="
            relative z-10
            text-orange-300
            fill-orange-300
            drop-shadow-[0_0_7px_rgba(249,115,22,0.6)]
          "
        />
      </motion.button>
    );
  }

  // ============================================================
  // BURBUJA PRINCIPAL
  // ============================================================
  return (
    <div
      ref={bubbleRef}
      className="
        fixed z-[9999]
        w-[135px] h-[135px]
        sm:w-[150px] sm:h-[150px]
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
      {/* ======================================================
          CAPA DE LATIDO
          TODO EL CÍRCULO PULSA
          ====================================================== */}
      <motion.div
        className="
          absolute inset-0
          rounded-full
        "
        animate={{
          scale: [1, 1.035, 1.065, 1.025, 1],
        }}
        transition={{
          duration: 1.35,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.22, 0.38, 0.55, 1],
        }}
      >
        {/* ====================================================
            HALO EXTERIOR
            ==================================================== */}
        <div
          className="
            absolute
            -inset-3
            rounded-full
            bg-orange-500/[0.07]
            blur-xl
            pointer-events-none
          "
        />

        {/* Halo pulsante */}
        <motion.div
          className="
            absolute
            -inset-1
            rounded-full
            border border-orange-400/20
            pointer-events-none
          "
          animate={{
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 1.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ====================================================
            BURBUJA GLASS
            ==================================================== */}
        <div
          className="
            absolute inset-0
            rounded-full
            overflow-hidden
            bg-white/[0.025]
            backdrop-blur-[2px]
            border border-orange-300/40
            shadow-[0_0_25px_rgba(249,115,22,0.20)]
          "
        >
          {/* Cristal transparente */}
          <div
            className="
              absolute inset-0
              rounded-full
              bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.10),transparent_58%)]
              pointer-events-none
            "
          />

          {/* Reflejo de cristal */}
          <div
            className="
              absolute
              top-[-18%]
              left-[18%]
              w-[64%]
              h-[42%]
              rounded-full
              bg-white/[0.075]
              blur-xl
              pointer-events-none
            "
          />

          {/* Brillo lateral */}
          <div
            className="
              absolute
              -right-[20%]
              top-[25%]
              w-[45%]
              h-[45%]
              rounded-full
              bg-orange-400/[0.055]
              blur-xl
              pointer-events-none
            "
          />

          {/* Anillo interior */}
          <div
            className="
              absolute
              inset-[6px]
              rounded-full
              border border-white/[0.10]
              pointer-events-none
            "
          />

          {/* Punto de luz */}
          <div
            className="
              absolute
              top-[18%]
              left-[24%]
              w-2 h-2
              rounded-full
              bg-white/30
              blur-[1px]
              pointer-events-none
            "
          />
        </div>

        {/* ====================================================
            CONTENIDO
            ==================================================== */}
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
          <motion.div
            className="
              w-8 h-8
              sm:w-9 sm:h-9
              rounded-full
              bg-orange-500/[0.25]
              backdrop-blur-sm
              border border-orange-300/35
              flex items-center justify-center
              shadow-[0_0_15px_rgba(249,115,22,0.25)]
              mb-1
            "
            animate={{
              opacity: [0.75, 1, 0.75],
            }}
            transition={{
              duration: 1.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap
              size={17}
              className="
                text-orange-300
                fill-orange-300
                drop-shadow-[0_0_6px_rgba(249,115,22,0.65)]
              "
            />
          </motion.div>

          {/* EXPRESS */}
          <span
            className="
              text-[7px]
              sm:text-[8px]
              uppercase
              tracking-[0.22em]
              text-orange-300/85
              font-bold
            "
          >
            EXPRESS
          </span>

          {/* Landing */}
          <div className="mt-0.5">
            <div
              className="
                text-[11px]
                sm:text-[12px]
                font-semibold
                text-white/85
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
                text-orange-300
                leading-tight
                drop-shadow-[0_0_7px_rgba(249,115,22,0.45)]
              "
            >
              24hs
            </div>
          </div>
        </div>

        {/* ====================================================
            BOTÓN ARROW
            ==================================================== */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectExpress();
          }}
          className="
            absolute
            z-30
            bottom-[10px]
            right-[10px]
            w-6 h-6
            sm:w-7 sm:h-7
            rounded-full
            bg-orange-500/35
            backdrop-blur-md
            border border-orange-200/35
            hover:bg-orange-400/60
            hover:border-orange-200/60
            flex items-center justify-center
            transition-all duration-200
            shadow-[0_0_12px_rgba(249,115,22,0.25)]
          "
          aria-label="Ver Express"
        >
          <ArrowRight
            size={12}
            className="text-white"
          />
        </button>

        {/* ====================================================
            BOTÓN X
            ==================================================== */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          className="
            absolute
            z-30
            top-[9px]
            right-[9px]
            w-5 h-5
            rounded-full
            bg-black/[0.12]
            backdrop-blur-md
            hover:bg-black/30
            border border-white/[0.15]
            flex items-center justify-center
            transition-all
          "
          aria-label="Minimizar"
        >
          <X
            size={10}
            className="text-white/60"
          />
        </button>
      </motion.div>

      {/* ======================================================
          TEXTO AL PASAR EL MOUSE
          ====================================================== */}
      {isHovered && (
        <motion.div
          initial={{
            opacity: 0,
            y: 4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            absolute
            z-[100]
            -bottom-8
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            px-2.5 py-1
            rounded-full
            bg-black/35
            backdrop-blur-md
            border border-orange-400/20
            text-[9px]
            text-white/75
            pointer-events-none
          "
        >
          Landing lista en 24hs
        </motion.div>
      )}
    </div>
  );
}


### Qué cambié

* **135 px en móvil / 150 px en escritorio** → más pequeña.
* Fondo prácticamente transparente: `bg-white/[0.025]`.
* `backdrop-blur-[2px]` → permite distinguir lo que está detrás.
* Borde naranja muy sutil.
* Halo muy suave, sin convertirla en una mancha naranja.
* **El círculo completo pulsa**, no solamente el rayo.
* El pulso tiene un movimiento tipo **latido: pequeño → grande → pequeño**.
* El movimiento flotante y el latido están separados para evitar que se interfieran.
* Al minimizarla también conserva el pequeño pulso.
* Mantiene el rebote por toda la pantalla.
* Conserva `EXPRESS`, `Tu Landing`, `24hs`, flecha y `X`.

**Importante:** después de reemplazar el archivo, haz el `git add`, `commit` y `push` para que Vercel reciba esta versión.



