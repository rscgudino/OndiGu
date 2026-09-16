```tsx
import React, { useRef } from 'react';
import {
  motio
n,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { HeroBrandAnimation } from './HeroBrandAnimation';

interface HeroProps {
  onQuoteClick: () => void;
  onPortfolioClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onQuoteClick,
  onPortfolioClick,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  // ============================================================
  // SCROLL
  // ============================================================

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // ============================================================
  // VIDEO PARALLAX
  // ============================================================

  const yBg = useTransform(
    smoothProgress,
    [0, 1],
    ['0%', '6%']
  );

  const scaleBg = useTransform(
    smoothProgress,
    [0, 1],
    [1.01, 1.05]
  );

  // ============================================================
  // TEXTO PARALLAX
  // ============================================================

  const yText = useTransform(
    smoothProgress,
    [0, 1],
    [0, -70]
  );

  const opacityText = useTransform(
    smoothProgress,
    [0, 0.75, 1],
    [1, 0.85, 0.25]
  );

  // ============================================================
  // BADGE
  // ============================================================

  const yBadge = useTransform(
    smoothProgress,
    [0, 1],
    [0, 35]
  );

  const opacityBadge = useTransform(
    smoothProgress,
    [0, 0.85],
    [1, 0.3]
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#0c0e12]
        flex
        flex-col
      "
    >

      {/* ========================================================
          1. VIDEO DE FONDO
      ======================================================== */}

      <div
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
          pointer-events-none
          select-none
        "
      >

        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            y: yBg,
            scale: scaleBg,
          }}
          className="
            absolute
            inset-0

            w-full
            h-full

            object-cover

            object-[68%_center]
            sm:object-[65%_center]
            lg:object-[63%_center]
            xl:object-[62%_center]

            grayscale

            contrast-[1.05]

            brightness-[0.98]
          "
          aria-label="Pedro Gudiño - Fundador y Diseñador Web de OndiGu"
        >
          <source
            src="/assets/pedro-bg.mp4"
            type="video/mp4"
          />

          Tu navegador no soporta la reproducción de video.
        </motion.video>

      </div>


      {/* ========================================================
          2. OSCURECIMIENTO GENERAL MUY SUAVE
      ======================================================== */}

      <div
        className="
          absolute
          inset-0
          z-[1]

          bg-[#0c0e12]/5

          pointer-events-none
        "
        aria-hidden="true"
      />


      {/* ========================================================
          3. DEGRADADO IZQUIERDO
          SOLO PROTEGE LA ZONA DEL TEXTO
      ======================================================== */}

      <div
        className="
          absolute
          inset-y-0
          left-0

          w-full
          lg:w-[72%]

          z-[2]

          pointer-events-none

          bg-gradient-to-r

          from-[#0c0e12]

          via-[#0c0e12]/75

          via-[42%]

          to-transparent
        "
        aria-hidden="true"
      />


      {/* ========================================================
          4. PROTECCIÓN SUPERIOR
      ======================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0

          h-32
          sm:h-36

          z-[2]

          pointer-events-none

          bg-gradient-to-b

          from-[#0c0e12]/75

          to-transparent
        "
        aria-hidden="true"
      />


      {/* ========================================================
          5. DEGRADADO INFERIOR
      ======================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          h-40
          sm:h-48

          z-[2]

          pointer-events-none

          bg-gradient-to-t

          from-[#0c0e12]

          via-[#0c0e12]/45

          to-transparent
        "
        aria-hidden="true"
      />


      {/* ========================================================
          6. GRID MUY SUTIL
      ======================================================== */}

      <div
        className="
          absolute
          inset-0

          z-[3]

          pointer-events-none

          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

          bg-[size:5rem_5rem]

          [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]

          opacity-[0.07]
        "
        aria-hidden="true"
      />


      {/* ========================================================
          7. GLOW NARANJA
      ======================================================== */}

      <div
        className="
          absolute

          top-[30%]
          left-[25%]

          w-[500px]
          h-[350px]

          z-[3]

          bg-gradient-to-b

          from-[#FF4500]/8

          via-[#FF8C00]/4

          to-transparent

          rounded-full

          blur-3xl

          pointer-events-none
        "
        aria-hidden="true"
      />


      {/* ========================================================
          8. CONTENIDO
      ======================================================== */}

      <div
        className="
          relative
          z-10

          flex-1

          w-full

          max-w-7xl

          mx-auto

          px-5
          sm:px-6
          lg:px-8

          flex
          items-center

          pt-28
          sm:pt-32
          lg:pt-36

          pb-24
          sm:pb-28
        "
      >

        <div
          className="
            w-full

            grid
            grid-cols-1
            lg:grid-cols-12

            gap-8
            lg:gap-10

            items-center
          "
        >

          {/* ====================================================
              COLUMNA DE TEXTO
          ==================================================== */}

          <motion.div
            style={{
              y: yText,
              opacity: opacityText,
            }}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              lg:col-span-7

              w-full

              flex
              flex-col

              items-center
              lg:items-start

              text-center
              lg:text-left
            "
          >

            {/* ==================================================
                LOGO
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="
                w-full

                flex
                justify-center
                lg:justify-start

                mb-1
              "
            >
              <div
                className="
                  scale-[0.78]
                  sm:scale-90
                  md:scale-100

                  origin-center
                  lg:origin-left
                "
              >
                <HeroBrandAnimation />
              </div>
            </motion.div>


            {/* ==================================================
                ONDIGU
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="
                flex
                flex-col

                items-center
                lg:items-start

                mb-4
                sm:mb-5
              "
            >

              <h2
                className="
                  font-brand

                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl

                  font-black

                  tracking-[-0.05em]

                  text-white

                  leading-none

                  select-none

                  drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]
                "
              >
                Ondi

                <span
                  className="
                    text-transparent

                    bg-clip-text

                    bg-gradient-to-r

                    from-[#FF8C00]
                    via-[#FF6000]
                    to-[#FF4500]

                    drop-shadow-[0_0_30px_rgba(255,69,0,0.4)]
                  "
                >
                  Gu
                </span>
              </h2>


              <div
                className="
                  mt-2

                  flex
                  items-center

                  gap-2
                "
              >

                <span
                  className="
                    w-1.5
                    h-1.5

                    rounded-full

                    bg-[#FF4500]

                    animate-pulse
                  "
                />

                <p
                  className="
                    text-[11px]
                    sm:text-xs
                    md:text-sm

                    font-medium

                    tracking-wide

                    text-[#c2c7d4]

                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
                  "
                >
                  Tecnología con onda

                  <span className="text-[#555b6d] mx-1.5">
                    •
                  </span>

                  <span className="text-[#FF8C00]">
                    La señal de Gudiño
                  </span>
                </p>

              </div>

            </motion.div>


            {/* ==================================================
                TITULAR PRINCIPAL
            ================================================== */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="
                w-full

                max-w-3xl

                text-[2rem]
                leading-[1.08]

                sm:text-4xl
                sm:leading-[1.1]

                md:text-5xl

                lg:text-6xl

                font-extrabold

                text-white

                tracking-tight

                mb-4
                sm:mb-5

                drop-shadow-[0_4px_18px_rgba(0,0,0,1)]
              "
            >
              Conectamos tu negocio con tecnología inteligente.
            </motion.h1>


            {/* ==================================================
                SUBTÍTULO
            ================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
              className="
                w-full

                max-w-xl

                text-sm
                sm:text-base
                md:text-lg
                lg:text-xl

                text-[#edf0f7]

                font-normal

                leading-relaxed

                mb-6
                sm:mb-8

                drop-shadow-[0_2px_12px_rgba(0,0,0,1)]
              "
            >
              Desarrollo web, IA y automatización.
              Todo en uno. Simple. Sin vueltas.
            </motion.p>


            {/* ==================================================
                BOTONES
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
              }}
              className="
                flex

                flex-col
                sm:flex-row

                items-center
                justify-center
                lg:justify-start

                gap-3
                sm:gap-4

                w-full
                sm:w-auto

                mb-6
                sm:mb-8
              "
            >

              <button
                id="hero-primary-quote-cta"
                type="button"
                onClick={onQuoteClick}
                className="
                  w-full
                  sm:w-auto

                  min-w-[210px]

                  px-7
                  sm:px-8

                  py-3.5
                  sm:py-4

                  text-sm
                  sm:text-base

                  font-semibold

                  text-white

                  bg-[#FF4500]

                  hover:bg-[#e03d00]

                  rounded-xl

                  shadow-[0_0_35px_rgba(255,69,0,0.4)]

                  hover:shadow-[0_0_45px_rgba(255,69,0,0.6)]

                  transition-all
                  duration-200

                  active:scale-[0.98]

                  cursor-pointer
                "
              >
                Pedí tu presupuesto
              </button>


              <button
                id="hero-secondary-portfolio-cta"
                type="button"
                onClick={onPortfolioClick}
                className="
                  w-full
                  sm:w-auto

                  min-w-[170px]

                  px-7

                  py-3.5
                  sm:py-4

                  text-sm
                  sm:text-base

                  font-medium

                  text-white

                  bg-[#151822]/75

                  hover:bg-[#1f2434]/90

                  border
                  border-white/15

                  hover:border-white/30

                  rounded-xl

                  transition-all
                  duration-200

                  backdrop-blur-md

                  cursor-pointer
                "
              >
                Ver portfolio
              </button>

            </motion.div>


            {/* ==================================================
                POSITIONING
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.6,
              }}
              className="
                pt-5
                sm:pt-6

                border-t
                border-white/10

                w-full

                max-w-xl

                text-center
                lg:text-left
              "
            >

              <p
                className="
                  text-[11px]
                  sm:text-xs
                  md:text-sm

                  text-[#b2b7c5]

                  leading-relaxed

                  drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]
                "
              >
                No somos una persona que hace páginas sueltas.

                Somos tu equipo de{' '}

                <span className="text-white font-medium">
                  Desarrollo Web
                </span>
                ,{' '}

                <span className="text-white font-medium">
                  IA
                </span>
                ,{' '}

                <span className="text-white font-medium">
                  Automatización
                </span>{' '}

                y{' '}

                <span className="text-white font-medium">
                  E-commerce
                </span>
                .
              </p>

            </motion.div>

          </motion.div>


          {/* ====================================================
              ESPACIO DERECHO
          ==================================================== */}

          <div
            className="
              hidden
              lg:block

              lg:col-span-5

              min-h-[400px]

              pointer-events-none
              select-none
            "
          />

        </div>

      </div>


      {/* ========================================================
          9. BADGE DE PEDRO
      ======================================================== */}

      <motion.div
        style={{
          y: yBadge,
          opacity: opacityBadge,
        }}
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.9,
          delay: 0.5,
        }}
        className="
          absolute

          z-20

          right-5
          sm:right-8
          lg:right-10
          xl:right-16

          bottom-20
          sm:bottom-20
          lg:bottom-24

          px-4
          py-2.5

          rounded-2xl

          bg-[#0f121a]/65

          border
          border-white/10

          shadow-[0_15px_40px_rgba(0,0,0,0.65)]

          backdrop-blur-md

          flex
          items-center

          gap-3

          pointer-events-none
        "
      >

        <div
          className="
            relative

            w-2.5
            h-2.5

            rounded-full

            bg-emerald-400
          "
        >

          <span
            className="
              absolute
              inset-0

              rounded-full

              bg-emerald-400

              animate-ping
            "
          />

        </div>


        <div className="text-left">

          <p
            className="
              font-mono

              text-[11px]

              font-semibold

              text-white

              tracking-wide
            "
          >
            Pedro Gudiño
          </p>


          <p
            className="
              text-[10px]

              text-[#c0c5d1]

              font-light
            "
          >
            Fundador & Diseñador Web

            <span className="mx-1">
              •
            </span>

            <span className="text-[#FF8C00]">
              En línea
            </span>
          </p>

        </div>

      </motion.div>


      {/* ========================================================
          10. SCROLL
      ======================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.8,
        }}
        className="
          absolute

          z-20

          bottom-5
          sm:bottom-6

          left-0
          right-0

          px-5
          sm:px-8
          lg:px-10

          flex
          items-center
          justify-between

          text-xs

          text-[#a0a6b5]
        "
      >

        <div
          className="
            flex
            items-center
            gap-2

            animate-bounce
          "
        >

          <span
            className="
              font-mono

              text-[9px]
              sm:text-[10px]

              tracking-wider

              uppercase
            "
          >
            Deslizá para explorar
          </span>

          <ArrowDown
            className="
              w-3.5
              h-3.5

              text-[#FF8C00]
            "
          />

        </div>


        <span
          className="
            font-mono

            text-[10px]

            hidden
            sm:inline

            text-[#82899b]
          "
        >
          Lanús • Argentina & Remoto al mundo
        </span>

      </motion.div>

    </section>
  );
};
```
