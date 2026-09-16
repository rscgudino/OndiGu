
import React, { useRef } from 'react';
import {
  motion,
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
  // VIDEO
  // ============================================================

  const videoY = useTransform(
    smoothProgress,
    [0, 1],
    ['0%', '3%']
  );

  const videoScale = useTransform(
    smoothProgress,
    [0, 1],
    [1, 1.035]
  );

  // ============================================================
  // TEXTO PRINCIPAL
  // ============================================================

  const contentY = useTransform(
    smoothProgress,
    [0, 1],
    [0, -60]
  );

  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.75, 1],
    [1, 0.95, 0.3]
  );

  // ============================================================
  // MARCA
  // ============================================================

  const brandY = useTransform(
    smoothProgress,
    [0, 1],
    [0, -35]
  );

  // ============================================================
  // BADGE
  // ============================================================

  const badgeY = useTransform(
    smoothProgress,
    [0, 1],
    [0, 25]
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
        bg-black
      "
    >

      {/* ========================================================
          VIDEO DE FONDO
      ======================================================== */}

      <div
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
          bg-black
        "
      >

        <motion.video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"

          style={{
            y: videoY,
            scale: videoScale,
          }}

          className="
            absolute
            inset-0

            w-full
            h-full

            object-cover

            object-[82%_center]
            sm:object-[78%_center]
            md:object-[75%_center]
            lg:object-[72%_center]
            xl:object-[70%_center]

            grayscale

            contrast-[1.02]

            brightness-100
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
          OSCURECIMIENTO GENERAL
      ======================================================== */}

      <div
        className="
          absolute
          inset-0
          z-[1]

          bg-black/10

          pointer-events-none
        "
      />


      {/* ========================================================
          DEGRADADO IZQUIERDO
          PROTEGE EL TEXTO PRINCIPAL
      ======================================================== */}

      <div
        className="
          absolute
          inset-y-0
          left-0

          z-[2]

          w-full
          lg:w-[60%]

          pointer-events-none

          bg-gradient-to-r

          from-black/85

          via-black/50

          via-[40%]

          to-transparent
        "
      />


      {/* ========================================================
          GRADIENTE SUPERIOR
      ======================================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0

          h-28
          sm:h-32

          z-[2]

          pointer-events-none

          bg-gradient-to-b

          from-black/55

          to-transparent
        "
      />


      {/* ========================================================
          GRADIENTE INFERIOR
      ======================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0

          h-32
          sm:h-36

          z-[2]

          pointer-events-none

          bg-gradient-to-t

          from-black/75

          to-transparent
        "
      />


      {/* ========================================================
          ========================================================
          MARCA — ARRIBA A LA DERECHA
          ========================================================
      ======================================================== */}

      <motion.div
        style={{
          y: brandY,
        }}

        initial={{
          opacity: 0,
          x: 40,
        }}

        animate={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}

        className="
          absolute

          z-20

          top-24
          sm:top-28
          md:top-24
          lg:top-28

          right-5
          sm:right-8
          md:right-12
          lg:right-16
          xl:right-24

          w-auto

          flex
          flex-col

          items-center

          text-center
        "
      >

        {/* ====================================================
            G
        ==================================================== */}

        <div
          className="
            scale-[0.68]
            sm:scale-90
            md:scale-100

            origin-center

            -mb-2
            sm:-mb-1
          "
        >
          <HeroBrandAnimation />
        </div>


        {/* ====================================================
            ONDIGU
        ==================================================== */}

        <h2
          className="
            font-brand

            text-5xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl

            font-black

            tracking-[-0.05em]

            leading-none

            text-white

            drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]
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
            "
          >
            Gu
          </span>
        </h2>


        {/* ====================================================
            TAGLINE
        ==================================================== */}

        <div
          className="
            mt-2

            flex
            flex-col
            sm:flex-row

            items-center

            gap-1
            sm:gap-2
          "
        >

          <span
            className="
              w-1.5
              h-1.5

              rounded-full

              bg-[#FF4500]

              animate-pulse

              hidden
              sm:block
            "
          />

          <p
            className="
              text-[10px]
              sm:text-xs
              md:text-sm

              font-medium

              tracking-wide

              text-white/85

              whitespace-nowrap

              drop-shadow-[0_2px_8px_black]
            "
          >
            Tecnología con onda

            <span className="mx-1.5 text-white/40">
              •
            </span>

            <span className="text-[#FF8C00]">
              La señal de Gudiño
            </span>
          </p>

        </div>

      </motion.div>


      {/* ========================================================
          ========================================================
          CONTENIDO PRINCIPAL — ABAJO / IZQUIERDA
          ========================================================
      ======================================================== */}

      <div
        className="
          relative
          z-10

          min-h-screen

          w-full
          max-w-7xl

          mx-auto

          px-5
          sm:px-8
          lg:px-10

          flex
          items-center

          pt-40
          sm:pt-44
          lg:pt-40

          pb-28
        "
      >

        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}

          initial={{
            opacity: 0,
            y: 25,
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
            w-full

            lg:w-[56%]

            flex
            flex-col

            items-center
            lg:items-start

            text-center
            lg:text-left

            mt-16
            sm:mt-20
            lg:mt-24
          "
        >

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
              delay: 0.25,
            }}

            className="
              w-full

              max-w-2xl

              text-[1.9rem]

              sm:text-4xl

              md:text-5xl

              lg:text-[3.5rem]

              xl:text-[3.8rem]

              leading-[1.05]

              font-extrabold

              tracking-tight

              text-white

              mb-4

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
              delay: 0.35,
            }}

            className="
              w-full

              max-w-xl

              text-sm
              sm:text-base
              md:text-lg

              text-white/90

              leading-relaxed

              mb-6

              drop-shadow-[0_2px_12px_black]
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
              delay: 0.45,
            }}

            className="
              flex

              flex-col
              sm:flex-row

              items-center
              lg:items-start

              gap-3

              w-full
              sm:w-auto

              mb-6
            "
          >

            <button
              id="hero-primary-quote-cta"

              type="button"

              onClick={onQuoteClick}

              className="
                w-full
                sm:w-auto

                min-w-[205px]

                px-7
                py-3.5

                rounded-xl

                bg-[#FF4500]

                text-white

                text-sm
                sm:text-base

                font-semibold

                shadow-[0_0_30px_rgba(255,69,0,0.35)]

                hover:bg-[#e03d00]

                transition-all

                active:scale-[0.98]
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

                rounded-xl

                bg-black/35

                border
                border-white/20

                backdrop-blur-sm

                text-white

                text-sm
                sm:text-base

                hover:bg-black/50

                transition-all
              "
            >
              Ver portfolio
            </button>

          </motion.div>


          {/* ==================================================
              POSICIONAMIENTO
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
              delay: 0.55,
            }}

            className="
              pt-4

              border-t
              border-white/15

              w-full

              max-w-xl
            "
          >

            <p
              className="
                text-[10px]
                sm:text-xs
                md:text-sm

                text-white/70

                leading-relaxed

                drop-shadow-[0_2px_8px_black]
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

      </div>


      {/* ========================================================
          BADGE PEDRO
      ======================================================== */}

      <motion.div
        style={{
          y: badgeY,
        }}

        initial={{
          opacity: 0,
          scale: 0.9,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        transition={{
          duration: 0.8,
          delay: 0.6,
        }}

        className="
          absolute

          z-20

          right-4
          sm:right-8
          md:right-10
          lg:right-12
          xl:right-20

          bottom-20
          sm:bottom-20
          lg:bottom-24

          px-4
          py-2.5

          rounded-2xl

          bg-black/40

          border
          border-white/15

          backdrop-blur-md

          shadow-[0_10px_35px_rgba(0,0,0,0.5)]

          hidden
          sm:flex

          items-center

          gap-3
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


        <div>

          <p
            className="
              font-mono

              text-[11px]

              font-semibold

              text-white
            "
          >
            Pedro Gudiño
          </p>

          <p
            className="
              text-[10px]

              text-white/65
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
          SCROLL
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

          bottom-4

          left-0
          right-0

          px-5
          sm:px-8
          lg:px-10

          flex
          items-center
          justify-between

          text-white/55
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

              uppercase

              tracking-wider
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
            hidden
            sm:inline

            font-mono

            text-[10px]

            text-white/40
          "
        >
          Lanús • Argentina & Remoto al mundo
        </span>

      </motion.div>

    </section>
  );
};

