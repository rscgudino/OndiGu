import React from 'react';
import { 
  Globe, 
  Cpu, 
  Zap, 
  ShoppingBag, 
  Workflow, 
  Server, 
  ArrowUpRight, 
  CheckCircle2, 
  Shield, 
  Sparkles,
  Smartphone,
  Layers
} from 'lucide-react';

interface ServicesProps {
  onServiceSelect?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onServiceSelect }) => {
  return (
    <section id="servicios" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0e12] border-t border-[#1a1d26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-5 border-b border-[#202430] gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Servicios que resuelven problemas reales
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg text-[#949aa8] leading-relaxed">
              Soluciones tecnológicas pensadas para que una pyme o comercio venda más, ahorre tiempo operativo y funcione sin vueltas.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8e94a5] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
            <span>OndiGu // Soluciones 360°</span>
          </div>
        </div>

        {/* Responsive Grid Layout: optimized for mobile screens and desktop bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">

          {/* 1. DESARROLLO WEB - Master Showcase Block */}
          <div 
            id="servicio-desarrollo-web"
            className="md:col-span-12 lg:col-span-7 bg-[#141722] border border-[#232738] hover:border-[#353c52] p-5 sm:p-7 lg:p-8 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            {/* Top orange gradient edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4500] via-[#FF8C00]/70 to-transparent" />
            
            <div>
              {/* Card Meta & Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF4500] group-hover:text-white group-hover:bg-[#FF4500] transition-colors shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#8e94a5] block">Presencia Digital</span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                      Desarrollo Web
                    </h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-[#FF8C00] bg-[#FF8C00]/10 border border-[#FF8C00]/25 rounded-md shrink-0">
                  <Smartphone className="w-3 h-3" />
                  100% Mobile First
                </span>
              </div>

              {/* Plain-Language SME Problem Resolution */}
              <div className="space-y-2.5 mb-5">
                <p className="text-sm sm:text-base lg:text-lg text-[#d8dce6] font-medium leading-relaxed">
                  Tu negocio deja de depender solo de redes sociales y pasa a tener una vidriera propia donde tus clientes te encuentran en Google y te contactan directo.
                </p>
                <p className="text-xs sm:text-sm text-[#8e94a5] leading-relaxed">
                  Diseñamos sitios rápidos que cargan en 1 segundo, pensados para que el usuario entienda tu oferta al instante y toque el botón de WhatsApp o llamado sin perderse.
                </p>
              </div>

              {/* Technical Mini Preview Bar - Mobile Responsive */}
              <div className="bg-[#0e1017] border border-[#1f2331] rounded-lg p-3 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8e94a5]">
                <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-[#c7cbd6]">Carga instantánea • SEO local • Dominio propio</span>
                </div>
                <span className="self-start sm:self-auto text-emerald-400 font-semibold text-[10px] sm:text-[11px] font-mono px-2 py-0.5 bg-emerald-950/40 sm:bg-transparent border border-emerald-800/30 sm:border-0 rounded">
                  Alta conversión
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#1e2332] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-[#757b8d]">Ideal para comercios, estudios y pymes</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Desarrollo Web')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#FF4500] hover:bg-[#e03d00] sm:bg-[#1a1d28] sm:hover:bg-[#FF4500] sm:border sm:border-[#2b3145] sm:hover:border-[#FF4500] rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  <span>Pedir presupuesto</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. INTELIGENCIA ARTIFICIAL - Neural Glow Block */}
          <div 
            id="servicio-ia"
            className="md:col-span-12 lg:col-span-5 bg-[#141722] border border-[#282d3e] hover:border-[#FF8C00]/40 p-5 sm:p-7 lg:p-8 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            {/* Subtle amber ambient corner aura */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FF8C00]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#1e2130] border border-[#2d3348] flex items-center justify-center text-[#FF8C00] group-hover:border-[#FF8C00]/50 transition-colors shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#FF8C00] block">Atención Inteligente</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Inteligencia Artificial
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded-md shrink-0">
                  <Sparkles className="w-3 h-3 text-[#FF8C00]" />
                  <span>24/7 activo</span>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                <p className="text-sm sm:text-base text-[#d8dce6] font-medium leading-relaxed">
                  Filtra y responde las dudas frecuentes de tus clientes al instante. No perdés ventas nocturnas ni pasás horas respondiendo siempre los mismos precios y horarios.
                </p>
                <p className="text-xs sm:text-sm text-[#8e94a5] leading-relaxed">
                  Entrenamos al bot con tus productos, zonas de entrega y preguntas usuales para que atienda con el tono y la precisión de tu negocio.
                </p>
              </div>

              {/* Bot Simulation Micro-Box */}
              <div className="bg-[#0d0f16] border border-[#202534] rounded-lg p-3 mb-5 space-y-1.5 text-xs">
                <div className="text-[10px] text-[#717789] font-mono">Simulación de respuesta:</div>
                <div className="bg-[#171b26] p-2.5 rounded text-[#c7cbd7] text-xs border-l-2 border-[#FF8C00] leading-relaxed">
                  "Hola, sí tenemos stock disponible. Podés retirar hoy por el local o pedir envío en el día."
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e2332] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-[#757b8d]">Ahorro de horas de atención</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Inteligencia Artificial')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#FF8C00] hover:bg-[#e07a00] sm:bg-[#1a1d28] sm:hover:bg-[#FF8C00] sm:border sm:border-[#2b3145] sm:hover:border-[#FF8C00] rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  <span>Pedir presupuesto</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. AUTOMATIZACIÓN - Pipeline Flow Block */}
          <div 
            id="servicio-automatizacion"
            className="md:col-span-6 lg:col-span-4 bg-[#141722] border border-[#232738] hover:border-[#FF4500]/50 p-5 sm:p-7 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            {/* Top orange line */}
            <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#FF4500]" />

            <div>
              <div className="w-10 h-10 rounded-lg bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF4500] mb-4 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e94a5] block mb-1">Cero errores manuales</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2.5">
                Automatización
              </h3>

              <p className="text-sm text-[#d8dce6] font-medium mb-2 leading-relaxed">
                Elimina las tareas repetitivas: los pedidos y consultas se registran solos en tus planillas y te llega un aviso directo al WhatsApp.
              </p>
              
              <p className="text-xs text-[#8e94a5] leading-relaxed mb-5">
                Conectamos tus canales para que nunca más tengas que copiar y pegar datos de clientes a mano ni olvidar un seguimiento comercial.
              </p>

              {/* Visual mini-flow - Mobile resilient */}
              <div className="bg-[#0e1017] p-2.5 sm:p-3 rounded-lg border border-[#1f2332] flex items-center justify-between text-center text-[10px] sm:text-xs font-mono text-[#949aa8] mb-5">
                <span className="bg-[#161a24] px-2 py-1 rounded text-white font-medium truncate">Consulta Web</span>
                <span className="text-[#FF4500] font-bold px-1">→</span>
                <span className="bg-[#161a24] px-2 py-1 rounded text-white font-medium truncate">Planilla</span>
                <span className="text-[#FF4500] font-bold px-1">→</span>
                <span className="bg-[#161a24] px-2 py-1 rounded text-emerald-400 font-semibold border border-emerald-800/40 truncate">Aviso Cel</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e2332] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-[#757b8d]">Procesos automáticos</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Automatización')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-[#FF4500] hover:bg-[#e03d00] sm:bg-[#1a1d28] sm:hover:bg-[#FF4500] sm:border sm:border-[#2b3145] rounded-lg transition-all cursor-pointer"
                >
                  <span>Cotizar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* 4. E-COMMERCE - Transactional Speed Block */}
          <div 
            id="servicio-ecommerce"
            className="md:col-span-6 lg:col-span-4 bg-[#141722] border border-[#232738] hover:border-[#FF8C00]/50 p-5 sm:p-7 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            {/* Top amber line */}
            <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#FF8C00]" />

            <div>
              <div className="w-10 h-10 rounded-lg bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF8C00] mb-4 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e94a5] block mb-1">Ventas sin fricción</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2.5">
                E-commerce
              </h3>

              <p className="text-sm text-[#d8dce6] font-medium mb-2 leading-relaxed">
                Tus clientes eligen productos, eligen el medio de envío y pagan en pocos clics sin pasos confusos que hagan caer la venta.
              </p>
              
              <p className="text-xs text-[#8e94a5] leading-relaxed mb-5">
                Catálogo autoadministrable, fotos claras, control de stock y cobro directo con las pasarelas que la gente ya conoce en el país.
              </p>

              {/* Tag bar */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="px-2 py-0.5 bg-[#1b1f2b] text-[10px] font-mono text-[#a5abbd] border border-[#262c3e] rounded">
                  Mercado Pago
                </span>
                <span className="px-2 py-0.5 bg-[#1b1f2b] text-[10px] font-mono text-[#a5abbd] border border-[#262c3e] rounded">
                  Transferencia
                </span>
                <span className="px-2 py-0.5 bg-[#1b1f2b] text-[10px] font-mono text-[#a5abbd] border border-[#262c3e] rounded">
                  Stock sincronizado
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e2332] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-[#757b8d]">Cobros inmediatos</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('E-commerce')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-[#FF8C00] hover:bg-[#e07a00] sm:bg-[#1a1d28] sm:hover:bg-[#FF8C00] sm:border sm:border-[#2b3145] rounded-lg transition-all cursor-pointer"
                >
                  <span>Cotizar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* 5. INTEGRACIONES - Connected Ecosystem Block */}
          <div 
            id="servicio-integraciones"
            className="md:col-span-12 lg:col-span-4 bg-[#141722] border border-[#232738] hover:border-[#353c52] p-5 sm:p-7 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform">
                <Workflow className="w-5 h-5 text-[#FF8C00]" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e94a5] block mb-1">Ecosistema unificado</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2.5">
                Integraciones
              </h3>

              <p className="text-sm text-[#d8dce6] font-medium mb-2 leading-relaxed">
                Unimos tu web con las herramientas que ya usás a diario para que no tengas que cargar datos dos veces en sistemas separados.
              </p>
              
              <p className="text-xs text-[#8e94a5] leading-relaxed mb-5">
                Conexión con WhatsApp Business, Google Sheets, correo electrónico, CRMs y sistemas de facturación en una sola red sincronizada.
              </p>

              {/* Connected tools badge */}
              <div className="bg-[#0e1017] p-2.5 sm:p-3 rounded-lg border border-[#1f2332] flex items-center justify-between text-xs mb-5">
                <span className="font-mono text-[11px] text-[#757b8d]">Conectividad:</span>
                <span className="text-[#FF8C00] font-mono text-[11px] font-semibold">100% Sincronizado</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e2332] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-[#757b8d]">Herramientas en equipo</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Integraciones')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-[#FF4500] hover:bg-[#e03d00] sm:bg-[#1a1d28] sm:hover:bg-[#FF4500] sm:border sm:border-[#2b3145] rounded-lg transition-all cursor-pointer"
                >
                  <span>Cotizar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* 6. TECNOLOGÍA E INFRAESTRUCTURA - Wide Technical Foundation Chassis */}
          <div 
            id="servicio-infraestructura"
            className="col-span-12 bg-[#121520] border border-[#202535] hover:border-[#32394e] p-5 sm:p-7 lg:p-8 rounded-xl relative overflow-hidden transition-all duration-300"
          >
            {/* Ambient edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4500]/50 to-transparent" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#1a1d2b] border border-[#292f44] flex items-center justify-center text-[#FF4500] shrink-0">
                  <Server className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF8C00]">Seguridad y Rendimiento</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] sm:text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      99.9% Uptime garantizado
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Tecnología e Infraestructura
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm lg:text-base text-[#d8dce6] font-medium max-w-3xl leading-relaxed">
                    Nos encargamos de que tu página vuele, nunca se caiga y esté protegida con copias de seguridad. Vos te dedicás a vender, nosotros a que la tecnología funcione siempre.
                  </p>
                </div>
              </div>

              {/* Right Side Metric Badges & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#1c2130] w-full lg:w-auto">
                <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 bg-[#181c28] border border-[#252b3d] rounded-lg text-xs font-mono text-[#a5abbd]">
                  <Shield className="w-3.5 h-3.5 text-[#FF4500]" />
                  <span>Certificado SSL & Backups</span>
                </div>

                {onServiceSelect && (
                  <button
                    type="button"
                    onClick={() => onServiceSelect('Tecnología e Infraestructura')}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#1c202e] hover:bg-[#252a3d] border border-[#2b3246] hover:border-[#FF4500]/50 rounded-lg transition-all cursor-pointer text-center"
                  >
                    Consultar infraestructura
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-8 sm:mt-12 text-center px-4">
          <p className="text-xs sm:text-sm text-[#757b8d] max-w-2xl mx-auto leading-relaxed">
            ¿No sabés exactamente qué necesitás? En OndiGu evaluamos tu caso sin costo y te armamos una propuesta a medida sin servicios de más.
          </p>
        </div>
      </div>
    </section>
  );
};

