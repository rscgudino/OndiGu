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
    <section id="servicios" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0e12] border-t border-[#1a1d26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#202430]">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Servicios que resuelven problemas reales
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#949aa8] leading-relaxed">
              Soluciones tecnológicas pensadas para que una pyme o comercio venda más, ahorre tiempo operativo y funcione sin vueltas.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-[#8e94a5]">
            <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
            <span>OndiGu // Soluciones 360°</span>
          </div>
        </div>

        {/* Differentiated Bento Layout: Asymmetric, non-generic cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* 1. DESARROLLO WEB - Master Showcase Block (col-span-7) */}
          <div 
            id="servicio-desarrollo-web"
            className="md:col-span-12 lg:col-span-7 bg-[#141722] border border-[#232738] hover:border-[#353c52] p-7 sm:p-9 flex flex-col justify-between rounded-lg relative overflow-hidden transition-all duration-300 group"
          >
            {/* Subtle top light edge in brand orange */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4500] via-[#FF8C00]/60 to-transparent" />
            
            <div>
              {/* Card Meta & Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF4500] group-hover:text-white group-hover:bg-[#FF4500] transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8e94a5]">Presencia Digital</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Desarrollo Web
                    </h3>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[#FF8C00] bg-[#FF8C00]/10 border border-[#FF8C00]/25 rounded">
                  <Smartphone className="w-3 h-3" />
                  100% Mobile First
                </span>
              </div>

              {/* Plain-Language SME Problem Resolution */}
              <div className="space-y-3 mb-6">
                <p className="text-base sm:text-lg text-[#d8dce6] font-medium leading-relaxed">
                  Tu negocio deja de depender solo de redes sociales y pasa a tener una vidriera propia donde tus clientes te encuentran en Google y te contactan directo.
                </p>
                <p className="text-xs sm:text-sm text-[#8e94a5] leading-relaxed">
                  Diseñamos sitios rápidos que cargan en 1 segundo, pensados para que el usuario entienda tu oferta al instante y toque el botón de WhatsApp o llamado sin perderse.
                </p>
              </div>

              {/* Technical Mini Preview Bar */}
              <div className="bg-[#0e1017] border border-[#1f2331] rounded p-3 mb-6 flex items-center justify-between text-xs text-[#8e94a5]">
                <div className="flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Carga instantánea • SEO local • Dominio propio</span>
                </div>
                <span className="text-[#d8dce6] font-semibold text-[11px]">Alta conversión</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between">
              <span className="text-xs text-[#757b8d]">Ideal para comercios, estudios y pymes</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Desarrollo Web')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF4500] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Pedir presupuesto</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. INTELIGENCIA ARTIFICIAL - Neural Glow Block (col-span-5) */}
          <div 
            id="servicio-ia"
            className="md:col-span-12 lg:col-span-5 bg-[#141722] border border-[#282d3e] hover:border-[#FF8C00]/40 p-7 sm:p-9 flex flex-col justify-between rounded-lg relative overflow-hidden transition-all duration-300 group"
          >
            {/* Subtle amber ambient corner aura */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FF8C00]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-[#1e2130] border border-[#2d3348] flex items-center justify-center text-[#FF8C00] group-hover:border-[#FF8C00]/50 transition-colors">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF8C00]">Atención Inteligente</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Inteligencia Artificial
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded">
                  <Sparkles className="w-3 h-3 text-[#FF8C00]" />
                  24/7 activo
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-base text-[#d8dce6] font-medium leading-relaxed">
                  Filtra y responde las dudas frecuentes de tus clientes al instante. No perdés ventas nocturnas ni pasás horas respondiendo siempre los mismos precios y horarios.
                </p>
                <p className="text-xs sm:text-sm text-[#8e94a5] leading-relaxed">
                  Entrenamos al bot con tus productos, zonas de entrega y preguntas usuales para que atienda con el tono y la precisión de tu negocio.
                </p>
              </div>

              {/* Bot Simulation Micro-Box */}
              <div className="bg-[#0d0f16] border border-[#202534] rounded p-3 mb-6 space-y-2 text-xs">
                <div className="text-[11px] text-[#717789] font-mono">Simulación de respuesta:</div>
                <div className="bg-[#171b26] p-2 rounded text-[#c7cbd7] text-xs border-l-2 border-[#FF8C00]">
                  "Hola, sí tenemos stock disponible. Podés retirar hoy por el local o pedir envío en el día."
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between">
              <span className="text-xs text-[#757b8d]">Ahorro de horas de atención</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Inteligencia Artificial')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8C00] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Pedir presupuesto</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. AUTOMATIZACIÓN - Pipeline Flow Block (col-span-4) */}
          <div 
            id="servicio-automatizacion"
            className="md:col-span-6 lg:col-span-4 bg-[#141722] border-l-2 border-l-[#FF4500] border-y border-r border-[#232738] hover:border-[#353c52] p-7 flex flex-col justify-between rounded-r-lg rounded-l-none transition-all duration-300 group"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF4500] mb-5 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e94a5] block mb-1">Cero errores manuales</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                Automatización
              </h3>

              <p className="text-sm text-[#d8dce6] font-medium mb-3 leading-relaxed">
                Elimina las tareas repetitivas: los pedidos y consultas se registran solos en tus planillas y te llega un aviso directo al WhatsApp.
              </p>
              
              <p className="text-xs text-[#8e94a5] leading-relaxed mb-6">
                Conectamos tus canales para que nunca más tengas que copiar y pegar datos de clientes a mano ni olvidar un seguimiento comercial.
              </p>

              {/* Visual mini-flow */}
              <div className="bg-[#0e1017] p-3 rounded border border-[#1f2332] flex items-center justify-between text-[11px] font-mono text-[#949aa8] mb-6">
                <span>Consulta Web</span>
                <span className="text-[#FF4500]">→</span>
                <span>Planilla</span>
                <span className="text-[#FF4500]">→</span>
                <span className="text-white font-semibold">Aviso al Cel</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between">
              <span className="text-[11px] text-[#757b8d]">Procesos automáticos</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Automatización')}
                  className="text-xs font-semibold text-[#FF4500] hover:text-white transition-colors cursor-pointer"
                >
                  Cotizar
                </button>
              )}
            </div>
          </div>

          {/* 4. E-COMMERCE - Transactional Speed Block (col-span-4) */}
          <div 
            id="servicio-ecommerce"
            className="md:col-span-6 lg:col-span-4 bg-[#141722] border-t-2 border-t-[#FF8C00] border-x border-b border-[#232738] hover:border-[#353c52] p-7 flex flex-col justify-between rounded-b-lg rounded-t-none transition-all duration-300 group"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF8C00] mb-5 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e94a5] block mb-1">Ventas sin fricción</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                E-commerce
              </h3>

              <p className="text-sm text-[#d8dce6] font-medium mb-3 leading-relaxed">
                Tus clientes eligen productos, eligen el medio de envío y pagan en pocos clics sin pasos confusos que hagan caer la venta.
              </p>
              
              <p className="text-xs text-[#8e94a5] leading-relaxed mb-6">
                Catálogo autoadministrable, fotos claras, control de stock y cobro directo con las pasarelas que la gente ya conoce en el país.
              </p>

              {/* Tag bar */}
              <div className="flex flex-wrap gap-1.5 mb-6">
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

            <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between">
              <span className="text-[11px] text-[#757b8d]">Cobros inmediatos</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('E-commerce')}
                  className="text-xs font-semibold text-[#FF8C00] hover:text-white transition-colors cursor-pointer"
                >
                  Cotizar
                </button>
              )}
            </div>
          </div>

          {/* 5. INTEGRACIONES - Connected Ecosystem Block (col-span-4) */}
          <div 
            id="servicio-integraciones"
            className="md:col-span-12 lg:col-span-4 bg-[#141722] border border-[#232738] hover:border-[#353c52] p-7 flex flex-col justify-between rounded-lg transition-all duration-300 group"
          >
            <div>
              <div className="w-10 h-10 rounded bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-white mb-5 group-hover:scale-105 transition-transform">
                <Workflow className="w-5 h-5 text-[#FF8C00]" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e94a5] block mb-1">Ecosistema unificado</span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                Integraciones
              </h3>

              <p className="text-sm text-[#d8dce6] font-medium mb-3 leading-relaxed">
                Unimos tu web con las herramientas que ya usás a diario para que no tengas que cargar datos dos veces en sistemas separados.
              </p>
              
              <p className="text-xs text-[#8e94a5] leading-relaxed mb-6">
                Conexión con WhatsApp Business, Google Sheets, correo electrónico, CRMs y sistemas de facturación en una sola red sincronizada.
              </p>

              {/* Connected tools badge */}
              <div className="bg-[#0e1017] p-3 rounded border border-[#1f2332] flex items-center justify-between text-xs mb-6">
                <span className="font-mono text-[11px] text-[#757b8d]">Conectividad:</span>
                <span className="text-[#FF8C00] font-mono text-[11px] font-semibold">100% Sincronizado</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between">
              <span className="text-[11px] text-[#757b8d]">Herramientas en equipo</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Integraciones')}
                  className="text-xs font-semibold text-[#FF4500] hover:text-white transition-colors cursor-pointer"
                >
                  Cotizar
                </button>
              )}
            </div>
          </div>

          {/* 6. TECNOLOGÍA E INFRAESTRUCTURA - Wide Technical Foundation Chassis (col-span-12) */}
          <div 
            id="servicio-infraestructura"
            className="col-span-12 bg-[#121520] border border-[#202535] hover:border-[#32394e] p-7 sm:p-8 rounded-lg relative overflow-hidden transition-all duration-300"
          >
            {/* Ambient edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4500]/50 to-transparent" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-[#1a1d2b] border border-[#292f44] flex items-center justify-center text-[#FF4500] shrink-0">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF8C00]">Seguridad y Rendimiento</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-mono text-emerald-400">99.9% Uptime garantizado</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Tecnología e Infraestructura
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#d8dce6] font-medium max-w-3xl leading-relaxed">
                    Nos encargamos de que tu página vuele, nunca se caiga y esté protegida con copias de seguridad. Vos te dedicás a vender, nosotros a que la tecnología funcione siempre.
                  </p>
                </div>
              </div>

              {/* Right Side Metric Badges & Action */}
              <div className="flex flex-wrap items-center gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#1c2130]">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#181c28] border border-[#252b3d] rounded text-xs font-mono text-[#a5abbd]">
                  <Shield className="w-3.5 h-3.5 text-[#FF4500]" />
                  <span>Certificado SSL & Backups</span>
                </div>

                {onServiceSelect && (
                  <button
                    type="button"
                    onClick={() => onServiceSelect('Tecnología e Infraestructura')}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1c202e] hover:bg-[#252a3d] border border-[#2b3246] hover:border-[#FF4500]/50 rounded transition-all cursor-pointer"
                  >
                    Consultar infraestructura
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[#757b8d]">
            ¿No sabés exactamente qué necesitás? En OndiGu evaluamos tu caso sin costo y te armamos una propuesta a medida sin servicios de más.
          </p>
        </div>
      </div>
    </section>
  );
};

