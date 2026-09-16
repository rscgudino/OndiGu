
import React, { useState } from 'react';
import {
  Globe,
  Cpu,
  Zap,
  Server,
  ArrowUpRight,
  Shield,
  Smartphone,
  TrendingUp,
  Clock,
  Monitor
} from 'lucide-react';

interface ServicesProps {
  onServiceSelect?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onServiceSelect }) => {
  const [selectedMobileService, setSelectedMobileService] = useState<number | null>(null);

  const mobileServiceTabs = [
    {
      id: 0,
      title: 'Desarrollo Web',
      shortName: 'Webs',
      icon: Globe,
      iconColor: 'text-[#FF4500]',
    },
    {
      id: 1,
      title: 'Inteligencia Artificial',
      shortName: 'I.A.',
      icon: Cpu,
      iconColor: 'text-[#FF8C00]',
    },
    {
      id: 2,
      title: 'Automatización',
      shortName: 'Auto',
      icon: Zap,
      iconColor: 'text-[#FF4500]',
    },
    {
      id: 3,
      title: 'Infraestructura',
      shortName: 'Infra',
      icon: Server,
      iconColor: 'text-[#FF8C00]',
    },
  ];
  return (
    <section
      id="servicios"
      className="
        py-10 sm:py-16 lg:py-24
        px-3 sm:px-6 lg:px-8
        bg-[#0c0e12]
        border-t border-[#1a1d26]
        overflow-hidden
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div
          className="
            flex flex-col
            md:flex-row
            md:items-end
            md:justify-between
            mb-7 sm:mb-10 lg:mb-12
            pb-5
            border-b border-[#202430]
            gap-4
          "
        >
          <div className="max-w-3xl">

            <div
              className="
                inline-flex items-center
                gap-2
                px-2.5 py-1
                text-[10px] sm:text-[11px]
                font-mono
                text-[#FF8C00]
                bg-[#FF8C00]/10
                border border-[#FF8C00]/25
                rounded-md
                mb-3
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />

              <span>
                OndiGu // Soluciones 360°
              </span>
            </div>

            <h2
              className="
                text-[1.7rem]
                sm:text-3xl
                lg:text-5xl
                font-extrabold
                text-white
                tracking-tight
                leading-[1.12]
              "
            >
              Servicios que resuelven problemas reales
            </h2>

            <p
              className="
                mt-3
                text-sm
                sm:text-base
                lg:text-lg
                text-[#949aa8]
                leading-relaxed
                max-w-2xl
              "
            >
              Soluciones tecnológicas pensadas para que una pyme o comercio
              venda más, ahorre tiempo operativo y funcione sin vueltas.
            </p>
          </div>

          <div
            className="
              hidden md:flex
              items-center
              gap-2
              text-xs
              font-mono
              text-[#8e94a5]
              shrink-0
            "
          >
            <span className="text-[#FF8C00] font-semibold">
              100% Personalizado
            </span>

            <span>• Buenos Aires</span>
          </div>
        </div>


        {/* =====================================================
            SELECTOR EXCLUSIVO MÓVIL (SOLO ÍCONOS INTERACTIVOS)
        ===================================================== */}
        <div className="md:hidden mb-5">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-[11px] font-mono text-[#8f96a8] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
              {selectedMobileService === null
                ? 'Tocá un servicio para ver detalles:'
                : 'Servicio seleccionado:'}
            </span>

            {selectedMobileService !== null && (
              <button
                type="button"
                onClick={() => setSelectedMobileService(null)}
                className="text-[11px] font-mono text-[#FF8C00] hover:text-[#FFA500] flex items-center gap-1 py-0.5 px-2 rounded-md bg-[#FF8C00]/10 border border-[#FF8C00]/25 touch-manipulation"
              >
                <span>Ocultar</span>
                <span className="text-xs">✕</span>
              </button>
            )}
          </div>

          <div className="-mx-3 sm:mx-0 grid grid-cols-4 gap-1.5 p-2 bg-[#10131d] border-y border-[#23283a] sm:border sm:rounded-2xl sm:p-1.5">
            {mobileServiceTabs.map((tab) => {
              const isSelected = selectedMobileService === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setSelectedMobileService(isSelected ? null : tab.id)
                  }
                  className={`
                    flex flex-col items-center justify-center
                    py-2.5 px-1
                    min-h-[66px]
                    rounded-xl
                    transition-all
                    duration-200
                    touch-manipulation
                    relative
                    ${
                      isSelected
                        ? 'bg-[#191d2c] border border-[#FF4500] text-white shadow-lg shadow-[#FF4500]/20'
                        : 'bg-transparent text-[#8e95a8] hover:text-[#d0d5e2] hover:bg-[#151824] border border-transparent'
                    }
                  `}
                >
                  <div
                    className={`
                      w-10 h-10
                      rounded-xl
                      flex items-center justify-center
                      transition-all
                      mb-1
                      ${
                        isSelected
                          ? 'bg-[#FF4500] text-white shadow-md'
                          : 'bg-[#171a26] text-[#a1a8bc] border border-[#262c3e]'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`
                      text-[11px]
                      font-semibold
                      leading-tight
                      truncate
                      max-w-full
                      ${isSelected ? 'text-white font-bold' : 'text-[#9ca3b6]'}
                    `}
                  >
                    {tab.shortName}
                  </span>

                  {isSelected && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF4500] rotate-45" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedMobileService === null && (
            <div className="mt-3 p-3 rounded-xl border border-dashed border-[#23283a] bg-[#0e1017]/80 text-center">
              <p className="text-xs text-[#8f96a8] leading-relaxed font-mono">
                Tocá un ícono para desplegar su información completa y cotizar.
              </p>
            </div>
          )}
        </div>


        {/* =====================================================
            GRID PRINCIPAL
        ===================================================== */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-12
            gap-4
            sm:gap-5
            lg:gap-6
          "
        >

          {/* ===================================================
              1. DESARROLLO WEB
          =================================================== */}
          <div
            id="servicio-desarrollo-web"
            className={`
              ${selectedMobileService === 0 ? 'flex' : 'hidden'}
              md:flex
              md:col-span-6
              lg:col-span-6

              -mx-3 sm:mx-0
              w-auto sm:w-full
              rounded-none sm:rounded-2xl
              border-x-0 sm:border-x
              border-y sm:border
              border-[#232738]

              bg-[#141722]
              hover:border-[#3a425b]

              p-4
              sm:p-6
              lg:p-8

              flex-col
              justify-between
              h-full

              relative
              overflow-hidden

              transition-all
              duration-300

              group
            `}
          >

            <div
              className="
                absolute
                top-0 left-0 right-0
                h-[2px]
                bg-gradient-to-r
                from-[#FF4500]
                via-[#FF8C00]/70
                to-transparent
              "
            />

            <div>

              {/* Meta */}
              <div
                className="
                  flex
                  flex-col
                  xs:flex-row
                  sm:flex-row
                  sm:items-center
                  justify-between
                  gap-3
                  mb-4
                "
              >
                <div className="flex items-center gap-2.5 min-w-0">

                  <div
                    className="
                      w-10 h-10
                      sm:w-11 sm:h-11
                      rounded-xl
                      bg-[#1c202e]
                      border border-[#2b3145]
                      flex items-center justify-center
                      text-[#FF4500]
                      group-hover:text-white
                      group-hover:bg-[#FF4500]
                      transition-colors
                      shrink-0
                    "
                  >
                    <Globe className="w-5 h-5" />
                  </div>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-mono
                      uppercase
                      tracking-wider
                      text-[#9ba2b5]
                      font-semibold
                    "
                  >
                    Presencia Digital
                  </span>
                </div>

                <span
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5

                    w-fit

                    px-2.5 py-1

                    text-[10px]
                    sm:text-[11px]

                    font-mono
                    text-[#FF8C00]

                    bg-[#FF8C00]/10
                    border border-[#FF8C00]/30

                    rounded-md
                    whitespace-nowrap
                  "
                >
                  <Smartphone className="w-3 h-3" />
                  100% Mobile First
                </span>
              </div>


              <h3
                className="
                  text-xl
                  sm:text-2xl
                  lg:text-3xl
                  font-bold
                  text-white
                  tracking-tight
                  mb-3
                "
              >
                Desarrollo Web
              </h3>


              <div className="space-y-2 mb-5">

                <p
                  className="
                    text-sm
                    sm:text-base
                    text-[#e2e6f0]
                    font-medium
                    leading-relaxed
                  "
                >
                  Tu negocio deja de depender solo de redes sociales y pasa
                  a tener una vidriera propia donde tus clientes te encuentran
                  en Google y te contactan directo.
                </p>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-[#949aa8]
                    leading-relaxed
                  "
                >
                  Diseñamos sitios rápidos que cargan en 1 segundo, pensados
                  para que el usuario entienda tu oferta al instante y toque
                  el botón de WhatsApp o llamado sin perderse.
                </p>
              </div>


              {/* Technical highlights */}
              <div
                className="
                  bg-[#0e1017]
                  border border-[#1f2331]
                  rounded-xl
                  p-3
                  mb-5
                "
              >
                <div className="flex flex-wrap gap-2">

                  <span
                    className="
                      inline-flex items-center gap-1.5
                      text-[10px] sm:text-xs
                      font-mono
                      px-2.5 py-1
                      rounded-lg
                      bg-[#181b26]
                      text-[#c7cbd6]
                      border border-[#252a3a]
                    "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Carga rápida
                  </span>

                  <span
                    className="
                      inline-flex
                      text-[10px] sm:text-xs
                      font-mono
                      px-2.5 py-1
                      rounded-lg
                      bg-[#181b26]
                      text-[#c7cbd6]
                      border border-[#252a3a]
                    "
                  >
                    SEO local Google
                  </span>

                  <span
                    className="
                      inline-flex
                      text-[10px] sm:text-xs
                      font-mono
                      px-2.5 py-1
                      rounded-lg
                      bg-[#181b26]
                      text-[#c7cbd6]
                      border border-[#252a3a]
                    "
                  >
                    Dominio propio
                  </span>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      text-[10px] sm:text-xs
                      font-mono
                      px-2.5 py-1
                      rounded-lg
                      bg-emerald-950/40
                      text-emerald-400
                      border border-emerald-800/40
                      font-semibold
                    "
                  >
                    <TrendingUp className="w-3 h-3" />
                    Alta conversión
                  </span>

                </div>
              </div>

            </div>

            {/* Action */}
            <div
              className="
                pt-4
                border-t border-[#1e2332]
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
              "
            >

              <span
                className="
                  text-[11px]
                  sm:text-xs
                  text-[#757b8d]
                "
              >
                Ideal para comercios, estudios y pymes
              </span>

              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Desarrollo Web')}
                  className="
                    w-full
                    sm:w-auto

                    min-h-[46px]

                    inline-flex
                    items-center
                    justify-center
                    gap-1.5

                    px-5 py-2.5

                    text-xs
                    sm:text-sm

                    font-bold
                    text-white

                    bg-[#FF4500]
                    hover:bg-[#e03d00]

                    sm:bg-[#1a1d28]
                    sm:hover:bg-[#FF4500]

                    sm:border
                    sm:border-[#2b3145]

                    rounded-xl

                    transition-all

                    active:scale-[0.98]

                    touch-manipulation
                  "
                >
                  Pedir presupuesto
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}

            </div>

          </div>


          {/* ===================================================
              2. INTELIGENCIA ARTIFICIAL
          =================================================== */}
          <div
            id="servicio-ia"
            className={`
              ${selectedMobileService === 1 ? 'flex' : 'hidden'}
              md:flex
              md:col-span-6
              lg:col-span-6

              -mx-3 sm:mx-0
              w-auto sm:w-full
              rounded-none sm:rounded-2xl
              border-x-0 sm:border-x
              border-y sm:border
              border-[#282d3e]

              bg-[#141722]
              hover:border-[#FF8C00]/40

              p-4
              sm:p-6
              lg:p-8

              flex-col
              justify-between
              h-full

              relative
              overflow-hidden

              transition-all
              duration-300

              group
            `}
          >

            <div
              className="
                absolute
                -top-16
                -right-16
                w-36 h-36
                bg-[#FF8C00]/10
                rounded-full
                blur-3xl
                pointer-events-none
              "
            />

            <div>

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  justify-between
                  gap-3
                  mb-4
                "
              >

                <div className="flex items-center gap-2.5">

                  <div
                    className="
                      w-10 h-10
                      sm:w-11 sm:h-11
                      rounded-xl
                      bg-[#1e2130]
                      border border-[#2d3348]
                      flex items-center justify-center
                      text-[#FF8C00]
                      shrink-0
                    "
                  >
                    <Cpu className="w-5 h-5" />
                  </div>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-mono
                      uppercase
                      tracking-wider
                      text-[#FF8C00]
                      font-semibold
                    "
                  >
                    Atención Inteligente
                  </span>
                </div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-1
                    w-fit
                    px-2.5 py-1
                    text-[10px]
                    sm:text-[11px]
                    font-mono
                    text-emerald-400
                    bg-emerald-950/40
                    border border-emerald-800/40
                    rounded-md
                    whitespace-nowrap
                  "
                >
                  <Clock className="w-3 h-3 text-[#FF8C00]" />
                  24/7 activo
                </div>

              </div>


              <h3
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-white
                  tracking-tight
                  mb-3
                "
              >
                Inteligencia Artificial
              </h3>

              <div className="space-y-2 mb-5">

                <p
                  className="
                    text-sm
                    sm:text-base
                    text-[#e2e6f0]
                    font-medium
                    leading-relaxed
                  "
                >
                  Filtra y responde las dudas frecuentes de tus clientes al
                  instante. No perdés consultas nocturnas ni pasás horas
                  respondiendo siempre los mismos precios y horarios.
                </p>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-[#949aa8]
                    leading-relaxed
                  "
                >
                  Entrenamos al bot con tus servicios, zonas de atención y
                  preguntas usuales para que atienda con el tono y la precisión
                  de tu negocio.
                </p>

              </div>


              <div
                className="
                  bg-[#0d0f16]
                  border border-[#202534]
                  rounded-xl
                  p-3
                  mb-5
                "
              >

                <div
                  className="
                    text-[10px]
                    sm:text-[11px]
                    text-[#818799]
                    font-mono
                    flex
                    items-center
                    gap-1.5
                    mb-2
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                  Simulación de respuesta automática:
                </div>

                <div
                  className="
                    bg-[#171b26]
                    p-2.5
                    rounded-lg
                    text-[#d8dce6]
                    text-xs
                    border-l-2
                    border-[#FF8C00]
                    leading-relaxed
                  "
                >
                  "Hola, sí tenemos disponibilidad de turnos esta semana. Podés agendar tu consulta o dejarnos los detalles de tu proyecto aquí."
                </div>

              </div>

            </div>


            <div
              className="
                pt-4
                border-t border-[#1e2332]
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
              "
            >

              <span className="text-[11px] sm:text-xs text-[#757b8d]">
                Ahorro de horas de atención
              </span>

              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Inteligencia Artificial')}
                  className="
                    w-full
                    sm:w-auto
                    min-h-[46px]
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    px-5 py-2.5
                    text-xs sm:text-sm
                    font-bold
                    text-white
                    bg-[#FF8C00]
                    hover:bg-[#e07a00]
                    sm:bg-[#1a1d28]
                    sm:hover:bg-[#FF8C00]
                    sm:border
                    sm:border-[#2b3145]
                    rounded-xl
                    transition-all
                    active:scale-[0.98]
                    touch-manipulation
                  "
                >
                  Pedir presupuesto
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}

            </div>

          </div>
          {/* ===================================================
              3. AUTOMATIZACIÓN
          =================================================== */}
          <div
            id="servicio-automatizacion"
            className={`
              ${selectedMobileService === 2 ? 'flex' : 'hidden'}
              md:flex
              md:col-span-6
              lg:col-span-6

              -mx-3 sm:mx-0
              w-auto sm:w-full
              rounded-none sm:rounded-2xl
              border-x-0 sm:border-x
              border-y sm:border
              border-[#232738]

              bg-[#141722]
              hover:border-[#FF4500]/50

              p-4
              sm:p-6
              lg:p-8

              flex-col
              justify-between
              h-full

              relative
              overflow-hidden

              transition-all
              duration-300

              group
            `}
          >

            <div
              className="
                absolute
                top-0 left-0
                w-16 h-[2px]
                bg-[#FF4500]
              "
            />

            <div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-2
                  mb-3
                "
              >

                <div
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-[#1c202e]
                    border border-[#2b3145]
                    flex items-center justify-center
                    text-[#FF4500]
                    group-hover:scale-105
                    transition-transform
                    shrink-0
                  "
                >
                  <Zap className="w-5 h-5" />
                </div>

                <span
                  className="
                    text-[9px]
                    sm:text-xs
                    font-mono
                    uppercase
                    tracking-wider
                    text-[#9ba2b5]
                    font-semibold
                    text-right
                  "
                >
                  Cero errores manuales
                </span>

              </div>


              <h3
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-white
                  tracking-tight
                  mb-3
                "
              >
                Automatización
              </h3>

              <div className="space-y-2 mb-5">
                <p
                  className="
                    text-sm
                    sm:text-base
                    text-[#e2e6f0]
                    font-medium
                    leading-relaxed
                  "
                >
                  Elimina las tareas repetitivas: los pedidos y consultas se
                  registran solos en tus planillas y te llega un aviso directo
                  al WhatsApp.
                </p>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-[#949aa8]
                    leading-relaxed
                  "
                >
                  Conectamos tus canales para que nunca más tengas que copiar
                  y pegar datos de clientes a mano ni olvidar un seguimiento
                  comercial.
                </p>
              </div>


              {/* Flow */}
              <div
                className="
                  bg-[#0e1017]
                  p-2
                  sm:p-2.5
                  rounded-xl
                  border border-[#1f2332]

                  flex
                  items-center
                  justify-between

                  text-center
                  text-[9px]
                  sm:text-xs
                  font-mono
                  text-[#949aa8]

                  mb-5
                  gap-1
                "
              >

                <span
                  className="
                    bg-[#161a24]
                    px-1.5
                    sm:px-2.5
                    py-1.5
                    rounded
                    text-white
                    font-medium
                    flex-1
                    truncate
                  "
                >
                  Consulta
                </span>

                <span className="text-[#FF4500] font-bold">
                  →
                </span>

                <span
                  className="
                    bg-[#161a24]
                    px-1.5
                    sm:px-2.5
                    py-1.5
                    rounded
                    text-white
                    font-medium
                    flex-1
                    truncate
                  "
                >
                  Planilla
                </span>

                <span className="text-[#FF4500] font-bold">
                  →
                </span>

                <span
                  className="
                    bg-[#161a24]
                    px-1.5
                    sm:px-2.5
                    py-1.5
                    rounded
                    text-emerald-400
                    font-semibold
                    border border-emerald-800/40
                    flex-1
                    truncate
                  "
                >
                  WhatsApp
                </span>

              </div>

            </div>


            <div
              className="
                pt-4
                border-t border-[#1e2332]
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
              "
            >

              <span className="text-[11px] text-[#757b8d]">
                Procesos automáticos
              </span>

              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Automatización')}
                  className="
                    w-full
                    sm:w-auto
                    min-h-[46px]
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    px-5 py-2.5
                    text-xs
                    sm:text-sm
                    font-bold
                    text-white
                    bg-[#FF4500]
                    hover:bg-[#e03d00]
                    sm:bg-[#1a1d28]
                    sm:hover:bg-[#FF4500]
                    sm:border
                    sm:border-[#2b3145]
                    rounded-xl
                    transition-all
                    active:scale-[0.98]
                    touch-manipulation
                  "
                >
                  Pedir presupuesto
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}

            </div>

          </div>


          {/* ===================================================
              4. TECNOLOGÍA E INFRAESTRUCTURA
          =================================================== */}
          <div
            id="servicio-infraestructura"
            className={`
              ${selectedMobileService === 3 ? 'flex' : 'hidden'}
              md:flex
              md:col-span-6
              lg:col-span-6

              -mx-3 sm:mx-0
              w-auto sm:w-full
              rounded-none sm:rounded-2xl
              border-x-0 sm:border-x
              border-y sm:border
              border-[#232738]

              bg-[#141722]
              hover:border-[#3a425b]

              p-4
              sm:p-6
              lg:p-8

              flex-col
              justify-between
              h-full

              relative
              overflow-hidden

              transition-all
              duration-300

              group
            `}
          >

            <div
              className="
                absolute
                top-0 left-0 right-0
                h-[2px]
                bg-gradient-to-r
                from-[#FF4500]
                via-[#FF8C00]/70
                to-transparent
              "
            />

            <div>

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  justify-between
                  gap-3
                  mb-4
                "
              >

                <div className="flex items-center gap-2.5">

                  <div
                    className="
                      w-10 h-10
                      sm:w-11 sm:h-11
                      rounded-xl
                      bg-[#1c202e]
                      border border-[#2b3145]
                      flex items-center justify-center
                      text-[#FF4500]
                      group-hover:scale-105
                      transition-transform
                      shrink-0
                    "
                  >
                    <Server className="w-5 h-5" />
                  </div>

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-mono
                      uppercase
                      tracking-wider
                      text-[#9ba2b5]
                      font-semibold
                    "
                  >
                    Seguridad y Rendimiento
                  </span>

                </div>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    w-fit
                    px-2.5 py-1
                    text-[10px] sm:text-xs
                    font-mono
                    text-emerald-400
                    bg-emerald-950/40
                    border border-emerald-800/40
                    rounded-lg
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  99.9% Uptime
                </span>

              </div>


              <h3
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-white
                  tracking-tight
                  mb-3
                "
              >
                Tecnología e Infraestructura
              </h3>


              <div className="space-y-2 mb-5">

                <p
                  className="
                    text-sm
                    sm:text-base
                    text-[#e2e6f0]
                    font-medium
                    leading-relaxed
                  "
                >
                  Garantizamos que tu web vuele con servidores de alta velocidad,
                  no se caiga nunca y cuente con certificados de seguridad SSL.
                </p>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-[#949aa8]
                    leading-relaxed
                  "
                >
                  Nosotros cuidamos la estabilidad, las copias de seguridad
                  automáticas y el dominio para que vos te ocupes 100% de tu negocio.
                </p>

              </div>


              {/* Technical highlights */}
              <div
                className="
                  bg-[#0e1017]
                  border border-[#1f2331]
                  rounded-xl
                  p-3
                  mb-5
                "
              >
                <div className="flex flex-wrap gap-2">

                  <span
                    className="
                      inline-flex items-center gap-1.5
                      text-[10px] sm:text-xs
                      font-mono
                      px-2.5 py-1
                      rounded-lg
                      bg-[#181b26]
                      text-[#c7cbd6]
                      border border-[#252a3a]
                    "
                  >
                    <Shield className="w-3.5 h-3.5 text-[#FF4500]" />
                    SSL Cloudflare
                  </span>

                  <span
                    className="
                      inline-flex items-center gap-1.5
                      text-[10px] sm:text-xs
                      font-mono
                      px-2.5 py-1
                      rounded-lg
                      bg-[#181b26]
                      text-[#c7cbd6]
                      border border-[#252a3a]
                    "
                  >
                    <Server className="w-3.5 h-3.5 text-[#FF8C00]" />
                    Servidores NVMe
                  </span>

                  <span
                    className="
                      inline-flex
                      text-[10px] sm:text-xs
                      font-mono
                      px-2.5 py-1
                      rounded-lg
                      bg-[#181b26]
                      text-[#c7cbd6]
                      border border-[#252a3a]
                    "
                  >
                    Backups diarios
                  </span>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      text-[10px] sm:text-xs
                      font-mono
                      px-2.5 py-1
                      rounded-lg
                      bg-emerald-950/40
                      text-emerald-400
                      border border-emerald-800/40
                      font-semibold
                    "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Alta velocidad
                  </span>

                </div>
              </div>

            </div>


            <div
              className="
                pt-4
                border-t border-[#1e2332]
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
              "
            >

              <span className="text-[11px] sm:text-xs text-[#757b8d]">
                Infraestructura veloz y protegida
              </span>

              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() =>
                    onServiceSelect('Tecnología e Infraestructura')
                  }
                  className="
                    w-full
                    sm:w-auto
                    min-h-[46px]
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    px-5 py-2.5
                    text-xs sm:text-sm
                    font-bold
                    text-white
                    bg-[#FF4500]
                    hover:bg-[#e03d00]
                    sm:bg-[#1a1d28]
                    sm:hover:bg-[#FF4500]
                    sm:border
                    sm:border-[#2b3145]
                    rounded-xl
                    transition-all
                    active:scale-[0.98]
                    touch-manipulation
                  "
                >
                  Pedir presupuesto
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}

            </div>

          </div>


          {/* ===================================================
              ZONA PEDRO — FOTO EN LA PC
          =================================================== */}
          <div
            id="public/assets/imagen2.png"
            className="
              col-span-12
              relative
              overflow-hidden

              rounded-2xl

              border
              border-[#282d3e]

              bg-[#10131b]

              min-h-[430px]
              sm:min-h-[500px]
              lg:min-h-[560px]

              group
            "
          >

            {/* Fondo */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[#151925]
                via-[#0f1219]
                to-[#090b10]
              "
            />

            {/* Glow naranja */}
            <div
              className="
                absolute
                -top-24
                -right-24
                w-72
                h-72
                rounded-full
                bg-[#FF4500]/10
                blur-3xl
                pointer-events-none
              "
            />

            {/* Glow inferior */}
            <div
              className="
                absolute
                -bottom-32
                -left-20
                w-80
                h-80
                rounded-full
                bg-[#FF8C00]/5
                blur-3xl
                pointer-events-none
              "
            />


            {/* Contenido */}
            <div
              className="
                relative
                z-10

                h-full
                min-h-[430px]
                sm:min-h-[500px]
                lg:min-h-[560px]

                flex
                flex-col
                lg:flex-row

                items-center
                justify-between

                gap-8
                lg:gap-10

                p-5
                sm:p-8
                lg:p-12
              "
            >

              {/* Texto */}
              <div
                className="
                  w-full
                  lg:w-[43%]

                  text-center
                  lg:text-left

                  order-1
                  lg:order-1
                "
              >

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2

                    px-3 py-1.5

                    rounded-full

                    bg-[#FF4500]/10

                    border
                    border-[#FF4500]/25

                    text-[10px]
                    sm:text-xs

                    font-mono

                    text-[#FF8C00]

                    mb-4
                  "
                >
                  <Monitor className="w-3.5 h-3.5" />
                  Tecnología hecha por personas
                </div>


                <h3
                  className="
                    text-2xl
                    sm:text-3xl
                    lg:text-4xl

                    font-extrabold

                    text-white

                    leading-tight

                    tracking-tight
                  "
                >
                  Detrás de OndiGu
                  <span className="text-[#FF8C00]">
                    {' '}está Pedro.
                  </span>
                </h3>


                <p
                  className="
                    mt-4

                    text-sm
                    sm:text-base
                    lg:text-lg

                    text-[#b7bdca]

                    leading-relaxed
                  "
                >
                  Diseño, desarrollo y tecnología con una mirada práctica:
                  entender lo que necesitás y convertirlo en una solución
                  que realmente puedas usar.
                </p>


                <div
                  className="
                    mt-6

                    flex
                    flex-wrap

                    justify-center
                    lg:justify-start

                    gap-2
                  "
                >

                  <span
                    className="
                      px-3 py-1.5
                      rounded-lg
                      bg-white/[0.035]
                      border border-white/[0.08]
                      text-[10px]
                      sm:text-xs
                      font-mono
                      text-[#aeb4c2]
                    "
                  >
                    Web
                  </span>

                  <span
                    className="
                      px-3 py-1.5
                      rounded-lg
                      bg-white/[0.035]
                      border border-white/[0.08]
                      text-[10px]
                      sm:text-xs
                      font-mono
                      text-[#aeb4c2]
                    "
                  >
                    IA
                  </span>

                  <span
                    className="
                      px-3 py-1.5
                      rounded-lg
                      bg-white/[0.035]
                      border border-white/[0.08]
                      text-[10px]
                      sm:text-xs
                      font-mono
                      text-[#aeb4c2]
                    "
                  >
                    Automatización
                  </span>

                  <span
                    className="
                      px-3 py-1.5
                      rounded-lg
                      bg-white/[0.035]
                      border border-white/[0.08]
                      text-[10px]
                      sm:text-xs
                      font-mono
                      text-[#aeb4c2]
                    "
                  >
                    Tecnología
                  </span>

                </div>

              </div>


              {/* =================================================
                  FOTO PEDRO SENTADO EN LA PC
                  ================================================= */}
              <div
                className="
                  relative

                  w-full
                  lg:w-[54%]

                  h-[250px]
                  sm:h-[330px]
                  lg:h-[430px]

                  order-2
                  lg:order-2

                  rounded-2xl

                  overflow-hidden

                  border
                  border-white/[0.08]

                  bg-[#090b10]

                  shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                "
              >

                {/* Luz detrás */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#080a0e]/90
                    via-transparent
                    to-[#FF4500]/5

                    z-10

                    pointer-events-none
                  "
                />


                {/* FOTO
                    Coloca tu imagen en:
                    public/assets/pedro-sentado-pc.webp
                */}
                <img
                  src="/imagen2.png"
                  alt="Pedro trabajando frente a su PC"
                  loading="lazy"
                  decoding="async"
                  className="
                    absolute
                    inset-0

                    w-full
                    h-full

                    object-cover

                    object-center

                    transition-transform
                    duration-700

                    group-hover:scale-[1.025]
                  "
                />


                {/* Borde luminoso */}
                <div
                  className="
                    absolute
                    inset-0

                    rounded-2xl

                    border
                    border-[#FF8C00]/15

                    pointer-events-none

                    z-20
                  "
                />


                {/* Etiqueta */}
                <div
                  className="
                    absolute
                    left-4
                    bottom-4

                    z-30

                    inline-flex
                    items-center
                    gap-2

                    px-3 py-2

                    rounded-xl

                    bg-black/40

                    backdrop-blur-md

                    border
                    border-white/[0.10]

                    text-[10px]
                    sm:text-xs

                    font-mono

                    text-white/80
                  "
                >
                  <span
                    className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#FF8C00]
                      animate-pulse
                    "
                  />

                  Pedro // OndiGu
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM NOTE
        ===================================================== */}
        <div
          className="
            mt-7
            sm:mt-10
            text-center
            px-4
          "
        >
          <p
            className="
              text-xs
              sm:text-sm
              text-[#757b8d]
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            ¿No sabés exactamente qué necesitás? En OndiGu evaluamos tu caso
            sin costo y te armamos una propuesta a medida sin servicios de más.
          </p>
        </div>

      </div>
    </section>
  );
};
