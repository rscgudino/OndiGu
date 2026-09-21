
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

  const brandY = useTransform(
    smoothProgress,
    [0, 1],
    [0, -35]
  );

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

      {/* =====================================================
          VIDEO BACKGROUND
          ===================================================== */}

      <div
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
          bg-black
          flex
          items-center
          justify-center
        "
      >
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/pedro-bg.jpg"
          preload="metadata"

          style={{
            y: videoY,
            scale: videoScale,
          }}

          className="
            absolute
            inset-0

            w-full
            h-full

            /*
             * En celulares:
             * mostramos el encuadre original del video.
             */
            object-contain

            /*
             * Solo celulares:
             * subimos ligeramente el video.
             */
            -translate-y-[3%]

            /*
             * Desde sm:
             * vuelve a su posición normal.
             */
            sm:translate-y-0
            sm:object-contain

            /*
             * Tablet.
             */
            md:translate-y-0
            md:object-cover

            /*
             * Desktop.
             */
            lg:translate-y-0
            lg:object-cover

            xl:translate-y-0
            xl:object-cover

            grayscale-[0.2]
            sm:grayscale
            contrast-[1.04]
            brightness-[1.38]
            saturate-[1.15]
            sm:brightness-100
            sm:contrast-[1.02]
            sm:saturate-100
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


      {/* =====================================================
          OVERLAY GENERAL
          ===================================================== */}

      <div
        className="
          absolute
          inset-0
          z-[1]
          pointer-events-none

          bg-black/5
          sm:bg-black/25
          lg:bg-black/10
        "
      />


      {/* =====================================================
          GRADIENTE LATERAL
          ===================================================== */}

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

          from-black/25
          via-transparent
          to-transparent

          sm:from-black/85
          sm:via-black/50
          sm:via-[55%]
          sm:to-transparent

          lg:from-black/85
          lg:via-black/50
          lg:via-[40%]
          lg:to-transparent
        "
      />


      {/* =====================================================
          GRADIENTE INFERIOR
          ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0

          h-[34%]

          z-[2]

          pointer-events-none

          bg-gradient-to-t

          from-black/75
          via-black/20
          to-transparent

          sm:h-[48%]
          sm:from-black/95
          sm:via-black/60

          lg:h-32

          lg:bg-gradient-to-t

          lg:from-black/75
          lg:via-transparent
        "
      />


      {/* =====================================================
          GRADIENTE SUPERIOR
          ===================================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0

          h-20

          z-[2]

          pointer-events-none

          bg-gradient-to-b

          from-black/20
          to-transparent

          sm:h-28
          sm:from-black/65

          lg:h-28

          lg:from-black/55
        "
      />


      {/* =====================================================
          BRAND ONDIGU
          ===================================================== */}

      <motion.div
        style={{
          y: brandY,
        }}

        initial={{
          opacity: 0,
          scale: 0.96,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}

        className="
          absolute
          z-20

          /*
           * CELULAR:
           * bajado y perfectamente centrado.
           */
          top-24
          left-0
          right-0
          mx-auto
          w-fit
          px-4

          /*
           * Desde sm vuelve a la derecha.
           */
          sm:top-20
          sm:left-auto
          sm:right-5
          sm:mx-0
          sm:px-0

          md:top-24
          md:right-6
          lg:top-28
          lg:right-8
          xl:right-12

          flex
          flex-col
          items-center
          text-center
        "
      >

        {/* =================================================
            ANIMACIÓN G
            ================================================= */}

        <div
          className="
            scale-[0.48]

            sm:scale-[0.72]
            md:scale-90
            lg:scale-100

            origin-center

            /*
             * En celular acercamos ONDIGU
             * a la G.
             */
            -mb-12

            sm:-mb-3
            md:-mb-2
            lg:-mb-1

            translate-x-0

            sm:translate-x-2
            md:translate-x-3
            lg:translate-x-4
          "
        >
          <HeroBrandAnimation />
        </div>


        {/* =================================================
            ONDIGU
            ================================================= */}

        <h2
          className="
            font-brand

            text-4xl

            sm:text-5xl

            md:text-6xl

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


        {/* =================================================
            TAGLINE
            ================================================= */}

        <div
          className="
            mt-1.5

            sm:mt-2

            flex
            flex-col
            sm:flex-row

            items-center
            justify-center

            gap-0.5
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
              text-[9px]

              sm:text-[10px]

              md:text-xs

              lg:text-sm

              font-medium

              tracking-wide

              text-white/85

              text-center

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


      {/* =====================================================
          CONTENIDO PRINCIPAL
          ===================================================== */}

      <div
        className="
          absolute
          z-10

          left-0
          right-0

          bottom-16

          sm:bottom-18

          md:bottom-20

          lg:bottom-18

          w-full

          max-w-7xl

          mx-auto

          px-4

          sm:px-8

          lg:px-10
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
          "
        >

          {/* =================================================
              TITULO
              ================================================= */}

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

              text-[1.55rem]

              sm:text-3xl

              md:text-4xl

              lg:text-[3.5rem]

              xl:text-[3.8rem]

              leading-[1.06]

              font-extrabold

              tracking-tight

              text-white

              mb-3

              sm:mb-4

              drop-shadow-[0_4px_18px_rgba(0,0,0,1)]
            "
          >
            Tecnología inteligente.
          </motion.h1>


          {/* =================================================
              DESCRIPCIÓN
              ================================================= */}

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

              text-xs

              sm:text-sm

              md:text-base

              lg:text-lg

              text-white/90

              leading-relaxed

              mb-4

              sm:mb-6

              drop-shadow-[0_2px_12px_black]
            "
          >
            Desarrollo web, IA y automatización.
            Todo en uno. Simple. Sin vueltas.
          </motion.p>


          {/* =================================================
              BOTONES
              ================================================= */}

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

              gap-2.5

              sm:gap-3

              w-full

              sm:w-auto

              mb-4

              sm:mb-6
            "
          >

            <button
              id="hero-primary-quote-cta"
              type="button"
              onClick={onQuoteClick}

              className="
                w-full

                sm:w-auto

                min-w-[190px]

                sm:min-w-[205px]

                px-6

                sm:px-7

                py-3

                sm:py-3.5

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

                min-w-[160px]

                sm:min-w-[170px]

                px-6

                sm:px-7

                py-3

                sm:py-3.5

                rounded-xl

                bg-black/40

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


          {/* =================================================
              TEXTO INFERIOR
              ================================================= */}

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
              pt-3

              sm:pt-4

              border-t
              border-white/15

              w-full

              max-w-xl
            "
          >

            <p
              className="
                text-[9px]

                sm:text-[10px]

                md:text-xs

                lg:text-sm

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
              </span>
              {' '}y{' '}

              <span className="text-white font-medium">
                Tecnología
              </span>
              .
            </p>

          </motion.div>

        </motion.div>

      </div>


      {/* =====================================================
          BADGE PEDRO
          ===================================================== */}

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


      {/* =====================================================
          SCROLL
          ===================================================== */}

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

          bottom-3

          sm:bottom-4

          left-0
          right-0

          px-4

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

              text-[8px]

              sm:text-[9px]

              uppercase

              tracking-wider
            "
          >
            Deslizá para explorar
          </span>


          <ArrowDown
            className="
              w-3
              h-3

              sm:w-3.5
              sm:h-3.5

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


