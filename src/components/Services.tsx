import React, { useState } from 'react';
import { 
  Globe, 
  Cpu, 
  Zap, 
  ShoppingBag, 
  Workflow, 
  Server, 
  ArrowUpRight, 
  Shield, 
  Smartphone, 
  TrendingUp, 
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ServicesProps {
  onServiceSelect?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onServiceSelect }) => {
  // Mobile accordion state: collapsed by default on phones to show only titles
  const [expandedMobile, setExpandedMobile] = useState<Record<string, boolean>>({});

  const toggleMobileService = (id: string) => {
    setExpandedMobile((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAllMobile = () => {
    setExpandedMobile({
      web: true,
      ia: true,
      auto: true,
      ecommerce: true,
      integraciones: true,
      infra: true,
    });
  };

  const collapseAllMobile = () => {
    setExpandedMobile({});
  };

  return (
    <section id="servicios" className="py-12 sm:py-18 lg:py-24 px-3.5 sm:px-6 lg:px-8 bg-[#0c0e12] border-t border-[#1a1d26]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header: Mobile-First Stack */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 pb-5 border-b border-[#202430] gap-3 sm:gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono text-[#FF8C00] bg-[#FF8C00]/10 border border-[#FF8C00]/25 rounded-md mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse" />
              <span>OndiGu // Soluciones 360°</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
              Servicios que resuelven problemas reales
            </h2>
            <p className="mt-2.5 text-sm sm:text-base lg:text-lg text-[#949aa8] leading-relaxed">
              Soluciones tecnológicas pensadas para que una pyme o comercio venda más, ahorre tiempo operativo y funcione sin vueltas.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#8e94a5] shrink-0">
            <span className="text-[#FF8C00] font-semibold">100% Personalizado</span>
            <span>• Buenos Aires</span>
          </div>
        </div>

        {/* Mobile-Only Helper Bar */}
        <div className="md:hidden flex items-center justify-between mb-4 px-3.5 py-2.5 rounded-xl bg-[#141722] border border-[#232738] text-xs">
          <span className="text-[#a5abbd] flex items-center gap-1.5 font-medium">
            <Smartphone className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>Tocá cada título para ver detalles</span>
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <button
              type="button"
              onClick={expandAllMobile}
              className="px-2.5 py-1 rounded-md bg-[#1f2434] text-[#d0d4e0] hover:text-white border border-[#2d344b] active:scale-95"
            >
              Abrir
            </button>
            <button
              type="button"
              onClick={collapseAllMobile}
              className="px-2.5 py-1 rounded-md bg-[#1f2434] text-[#9ba2b5] hover:text-white border border-[#2d344b] active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Responsive Grid Layout: Bento architecture on desktop, compact expandable cards on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-5 lg:gap-6">

          {/* 1. DESARROLLO WEB - Master Showcase */}
          <div 
            id="servicio-desarrollo-web"
            className="md:col-span-12 lg:col-span-7 bg-[#141722] border border-[#232738] hover:border-[#3a425b] p-4 sm:p-6 lg:p-8 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            {/* Top orange gradient edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4500] via-[#FF8C00]/70 to-transparent" />
            
            <div>
              {/* Header / Clickable on mobile */}
              <div 
                onClick={() => toggleMobileService('web')}
                className="cursor-pointer md:cursor-default select-none"
              >
                {/* Top Meta Bar: Icon + Category + Mobile Toggle */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF4500] group-hover:text-white group-hover:bg-[#FF4500] transition-colors shrink-0">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#9ba2b5] font-semibold">
                      Presencia Digital
                    </span>
                  </div>

                  {/* Desktop badge */}
                  <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[#FF8C00] bg-[#FF8C00]/10 border border-[#FF8C00]/30 rounded-md shrink-0 whitespace-nowrap">
                    <Smartphone className="w-3 h-3" />
                    100% Mobile First
                  </span>

                  {/* Mobile toggle button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMobileService('web');
                    }}
                    className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#1d2230] text-[#FF8C00] border border-[#2f364b] shrink-0"
                    aria-label={expandedMobile['web'] ? 'Ocultar descripción' : 'Ver descripción'}
                  >
                    <span>{expandedMobile['web'] ? 'Ocultar' : 'Ver detalles'}</span>
                    {expandedMobile['web'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight flex items-center justify-between">
                  <span>Desarrollo Web</span>
                  {!expandedMobile['web'] && (
                    <span className="md:hidden text-[11px] font-mono font-normal text-[#81889c]">
                      Tocar para ver +
                    </span>
                  )}
                </h3>
              </div>

              {/* Collapsible details on mobile; always visible on tablet/desktop */}
              <div className={`${expandedMobile['web'] ? 'block' : 'hidden'} md:block mt-3`}>
                {/* Plain-Language SME Problem Resolution */}
                <div className="space-y-2 mb-4 sm:mb-5">
                  <p className="text-sm sm:text-base text-[#e2e6f0] font-medium leading-relaxed">
                    Tu negocio deja de depender solo de redes sociales y pasa a tener una vidriera propia donde tus clientes te encuentran en Google y te contactan directo.
                  </p>
                  <p className="text-xs sm:text-sm text-[#949aa8] leading-relaxed">
                    Diseñamos sitios rápidos que cargan en 1 segundo, pensados para que el usuario entienda tu oferta al instante y toque el botón de WhatsApp o llamado sin perderse.
                  </p>
                </div>

                {/* Technical Mini Preview Bar */}
                <div className="bg-[#0e1017] border border-[#1f2331] rounded-lg p-3 mb-5 space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-[#181b26] text-[#c7cbd6] border border-[#252a3a]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" /> Carga rápida (1s)
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-[#181b26] text-[#c7cbd6] border border-[#252a3a]">
                      SEO local Google
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-[#181b26] text-[#c7cbd6] border border-[#252a3a]">
                      Dominio propio
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 font-semibold ml-auto">
                      <TrendingUp className="w-3 h-3" /> Alta conversión
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar: Always visible on desktop, visible when expanded on mobile */}
            <div className={`${expandedMobile['web'] ? 'flex' : 'hidden'} md:flex pt-3.5 sm:pt-4 border-t border-[#1e2332] flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3`}>
              <span className="text-xs text-[#757b8d]">Ideal para comercios, estudios y pymes</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Desarrollo Web')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#FF4500] hover:bg-[#e03d00] sm:bg-[#1a1d28] sm:hover:bg-[#FF4500] sm:border sm:border-[#2b3145] sm:hover:border-[#FF4500] rounded-lg transition-all cursor-pointer shadow-sm active:scale-[0.98]"
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
            className="md:col-span-12 lg:col-span-5 bg-[#141722] border border-[#282d3e] hover:border-[#FF8C00]/40 p-4 sm:p-6 lg:p-8 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            {/* Ambient orange glow */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FF8C00]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header / Clickable on mobile */}
              <div 
                onClick={() => toggleMobileService('ia')}
                className="cursor-pointer md:cursor-default select-none"
              >
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#1e2130] border border-[#2d3348] flex items-center justify-center text-[#FF8C00] group-hover:border-[#FF8C00]/50 transition-colors shrink-0">
                      <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#FF8C00] font-semibold">
                      Atención Inteligente
                    </span>
                  </div>

                  {/* Desktop badge */}
                  <div className="hidden md:flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded-md shrink-0 whitespace-nowrap">
                    <Clock className="w-3 h-3 text-[#FF8C00]" />
                    <span>24/7 activo</span>
                  </div>

                  {/* Mobile toggle button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMobileService('ia');
                    }}
                    className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#1d2230] text-[#FF8C00] border border-[#2f364b] shrink-0"
                    aria-label={expandedMobile['ia'] ? 'Ocultar descripción' : 'Ver descripción'}
                  >
                    <span>{expandedMobile['ia'] ? 'Ocultar' : 'Ver detalles'}</span>
                    {expandedMobile['ia'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex items-center justify-between">
                  <span>Inteligencia Artificial</span>
                  {!expandedMobile['ia'] && (
                    <span className="md:hidden text-[11px] font-mono font-normal text-[#81889c]">
                      Tocar para ver +
                    </span>
                  )}
                </h3>
              </div>

              {/* Collapsible details on mobile; always visible on tablet/desktop */}
              <div className={`${expandedMobile['ia'] ? 'block' : 'hidden'} md:block mt-3`}>
                <div className="space-y-2 mb-4 sm:mb-5">
                  <p className="text-sm sm:text-base text-[#e2e6f0] font-medium leading-relaxed">
                    Filtra y responde las dudas frecuentes de tus clientes al instante. No perdés ventas nocturnas ni pasás horas respondiendo siempre los mismos precios y horarios.
                  </p>
                  <p className="text-xs sm:text-sm text-[#949aa8] leading-relaxed">
                    Entrenamos al bot con tus productos, zonas de entrega y preguntas usuales para que atienda con el tono y la precisión de tu negocio.
                  </p>
                </div>

                {/* Bot Simulation Micro-Box */}
                <div className="bg-[#0d0f16] border border-[#202534] rounded-lg p-3 mb-5 space-y-1.5 text-xs">
                  <div className="text-[10px] text-[#818799] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                    Simulación de respuesta automática:
                  </div>
                  <div className="bg-[#171b26] p-2.5 rounded text-[#d8dce6] text-xs border-l-2 border-[#FF8C00] leading-relaxed">
                    "Hola, sí tenemos stock disponible. Podés retirar hoy por el local o pedir envío en el día."
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className={`${expandedMobile['ia'] ? 'flex' : 'hidden'} md:flex pt-3.5 sm:pt-4 border-t border-[#1e2332] flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3`}>
              <span className="text-xs text-[#757b8d]">Ahorro de horas de atención</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Inteligencia Artificial')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#FF8C00] hover:bg-[#e07a00] sm:bg-[#1a1d28] sm:hover:bg-[#FF8C00] sm:border sm:border-[#2b3145] sm:hover:border-[#FF8C00] rounded-lg transition-all cursor-pointer shadow-sm active:scale-[0.98]"
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
            className="md:col-span-6 lg:col-span-4 bg-[#141722] border border-[#232738] hover:border-[#FF4500]/50 p-4 sm:p-6 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            {/* Top orange line */}
            <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#FF4500]" />

            <div>
              {/* Header / Clickable on mobile */}
              <div 
                onClick={() => toggleMobileService('auto')}
                className="cursor-pointer md:cursor-default select-none"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF4500] group-hover:scale-105 transition-transform shrink-0">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <span className="hidden md:inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#9ba2b5] font-semibold">
                    Cero errores manuales
                  </span>

                  {/* Mobile toggle button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMobileService('auto');
                    }}
                    className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#1d2230] text-[#FF8C00] border border-[#2f364b] shrink-0"
                    aria-label={expandedMobile['auto'] ? 'Ocultar descripción' : 'Ver descripción'}
                  >
                    <span>{expandedMobile['auto'] ? 'Ocultar' : 'Ver detalles'}</span>
                    {expandedMobile['auto'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-between">
                  <span>Automatización</span>
                  {!expandedMobile['auto'] && (
                    <span className="md:hidden text-[11px] font-mono font-normal text-[#81889c]">
                      Tocar para ver +
                    </span>
                  )}
                </h3>
              </div>

              {/* Collapsible details on mobile; always visible on tablet/desktop */}
              <div className={`${expandedMobile['auto'] ? 'block' : 'hidden'} md:block mt-3`}>
                <p className="text-sm text-[#e2e6f0] font-medium mb-2 leading-relaxed">
                  Elimina las tareas repetitivas: los pedidos y consultas se registran solos en tus planillas y te llega un aviso directo al WhatsApp.
                </p>
                
                <p className="text-xs text-[#949aa8] leading-relaxed mb-4">
                  Conectamos tus canales para que nunca más tengas que copiar y pegar datos de clientes a mano ni olvidar un seguimiento comercial.
                </p>

                {/* Visual mini-flow */}
                <div className="bg-[#0e1017] p-2 sm:p-2.5 rounded-lg border border-[#1f2332] flex items-center justify-between text-center text-[10px] sm:text-xs font-mono text-[#949aa8] mb-4 sm:mb-5 gap-1">
                  <span className="bg-[#161a24] px-2 py-1 rounded text-white font-medium flex-1 truncate">
                    Consulta Web
                  </span>
                  <span className="text-[#FF4500] font-bold px-0.5">→</span>
                  <span className="bg-[#161a24] px-2 py-1 rounded text-white font-medium flex-1 truncate">
                    Planilla
                  </span>
                  <span className="text-[#FF4500] font-bold px-0.5">→</span>
                  <span className="bg-[#161a24] px-2 py-1 rounded text-emerald-400 font-semibold border border-emerald-800/40 flex-1 truncate">
                    Aviso Cel
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className={`${expandedMobile['auto'] ? 'flex' : 'hidden'} md:flex pt-3.5 sm:pt-4 border-t border-[#1e2332] flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3`}>
              <span className="text-[11px] text-[#757b8d]">Procesos automáticos</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Automatización')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold text-white bg-[#FF4500] hover:bg-[#e03d00] sm:bg-[#1a1d28] sm:hover:bg-[#FF4500] sm:border sm:border-[#2b3145] rounded-lg transition-all cursor-pointer active:scale-[0.98]"
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
            className="md:col-span-6 lg:col-span-4 bg-[#141722] border border-[#232738] hover:border-[#FF8C00]/50 p-4 sm:p-6 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            {/* Top amber line */}
            <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#FF8C00]" />

            <div>
              {/* Header / Clickable on mobile */}
              <div 
                onClick={() => toggleMobileService('ecommerce')}
                className="cursor-pointer md:cursor-default select-none"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF8C00] group-hover:scale-105 transition-transform shrink-0">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <span className="hidden md:inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#9ba2b5] font-semibold">
                    Ventas sin fricción
                  </span>

                  {/* Mobile toggle button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMobileService('ecommerce');
                    }}
                    className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#1d2230] text-[#FF8C00] border border-[#2f364b] shrink-0"
                    aria-label={expandedMobile['ecommerce'] ? 'Ocultar descripción' : 'Ver descripción'}
                  >
                    <span>{expandedMobile['ecommerce'] ? 'Ocultar' : 'Ver detalles'}</span>
                    {expandedMobile['ecommerce'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-between">
                  <span>E-commerce</span>
                  {!expandedMobile['ecommerce'] && (
                    <span className="md:hidden text-[11px] font-mono font-normal text-[#81889c]">
                      Tocar para ver +
                    </span>
                  )}
                </h3>
              </div>

              {/* Collapsible details on mobile; always visible on tablet/desktop */}
              <div className={`${expandedMobile['ecommerce'] ? 'block' : 'hidden'} md:block mt-3`}>
                <p className="text-sm text-[#e2e6f0] font-medium mb-2 leading-relaxed">
                  Tus clientes eligen productos, eligen el medio de envío y pagan en pocos clics sin pasos confusos que hagan caer la venta.
                </p>
                
                <p className="text-xs text-[#949aa8] leading-relaxed mb-4">
                  Catálogo autoadministrable, fotos claras, control de stock y cobro directo con las pasarelas que la gente ya conoce en el país.
                </p>

                {/* Tag bar */}
                <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                  <span className="px-2 py-0.5 bg-[#1b1f2b] text-[10px] sm:text-[11px] font-mono text-[#c7cbd6] border border-[#262c3e] rounded">
                    Mercado Pago
                  </span>
                  <span className="px-2 py-0.5 bg-[#1b1f2b] text-[10px] sm:text-[11px] font-mono text-[#c7cbd6] border border-[#262c3e] rounded">
                    Transferencia
                  </span>
                  <span className="px-2 py-0.5 bg-[#1b1f2b] text-[10px] sm:text-[11px] font-mono text-[#c7cbd6] border border-[#262c3e] rounded">
                    Stock sincronizado
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className={`${expandedMobile['ecommerce'] ? 'flex' : 'hidden'} md:flex pt-3.5 sm:pt-4 border-t border-[#1e2332] flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3`}>
              <span className="text-[11px] text-[#757b8d]">Cobros inmediatos</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('E-commerce')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold text-white bg-[#FF8C00] hover:bg-[#e07a00] sm:bg-[#1a1d28] sm:hover:bg-[#FF8C00] sm:border sm:border-[#2b3145] rounded-lg transition-all cursor-pointer active:scale-[0.98]"
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
            className="md:col-span-12 lg:col-span-4 bg-[#141722] border border-[#232738] hover:border-[#353c52] p-4 sm:p-6 flex flex-col justify-between rounded-xl relative overflow-hidden transition-all duration-300 group"
          >
            <div>
              {/* Header / Clickable on mobile */}
              <div 
                onClick={() => toggleMobileService('integraciones')}
                className="cursor-pointer md:cursor-default select-none"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1c202e] border border-[#2b3145] flex items-center justify-center text-[#FF8C00] group-hover:scale-105 transition-transform shrink-0">
                    <Workflow className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <span className="hidden md:inline-block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#9ba2b5] font-semibold">
                    Ecosistema unificado
                  </span>

                  {/* Mobile toggle button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMobileService('integraciones');
                    }}
                    className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#1d2230] text-[#FF8C00] border border-[#2f364b] shrink-0"
                    aria-label={expandedMobile['integraciones'] ? 'Ocultar descripción' : 'Ver descripción'}
                  >
                    <span>{expandedMobile['integraciones'] ? 'Ocultar' : 'Ver detalles'}</span>
                    {expandedMobile['integraciones'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-between">
                  <span>Integraciones</span>
                  {!expandedMobile['integraciones'] && (
                    <span className="md:hidden text-[11px] font-mono font-normal text-[#81889c]">
                      Tocar para ver +
                    </span>
                  )}
                </h3>
              </div>

              {/* Collapsible details on mobile; always visible on tablet/desktop */}
              <div className={`${expandedMobile['integraciones'] ? 'block' : 'hidden'} md:block mt-3`}>
                <p className="text-sm text-[#e2e6f0] font-medium mb-2 leading-relaxed">
                  Unimos tu web con las herramientas que ya usás a diario para que no tengas que cargar datos dos veces en sistemas separados.
                </p>
                
                <p className="text-xs text-[#949aa8] leading-relaxed mb-4">
                  Conexión con WhatsApp Business, Google Sheets, correo electrónico, CRMs y sistemas de facturación en una sola red sincronizada.
                </p>

                {/* Connected tools badge */}
                <div className="bg-[#0e1017] p-2.5 rounded-lg border border-[#1f2332] flex items-center justify-between text-xs mb-4 sm:mb-5">
                  <span className="font-mono text-[11px] text-[#818799]">Conectividad:</span>
                  <span className="text-[#FF8C00] font-mono text-[11px] font-semibold">100% Sincronizado</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className={`${expandedMobile['integraciones'] ? 'flex' : 'hidden'} md:flex pt-3.5 sm:pt-4 border-t border-[#1e2332] flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3`}>
              <span className="text-[11px] text-[#757b8d]">Herramientas en equipo</span>
              {onServiceSelect && (
                <button
                  type="button"
                  onClick={() => onServiceSelect('Integraciones')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold text-white bg-[#FF4500] hover:bg-[#e03d00] sm:bg-[#1a1d28] sm:hover:bg-[#FF4500] sm:border sm:border-[#2b3145] rounded-lg transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>Cotizar</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* 6. TECNOLOGÍA E INFRAESTRUCTURA - Master Enterprise Bar */}
          <div 
            id="servicio-infraestructura"
            className="col-span-12 bg-[#121520] border border-[#202535] hover:border-[#32394e] p-4 sm:p-6 lg:p-8 rounded-xl relative overflow-hidden transition-all duration-300"
          >
            {/* Ambient top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4500]/50 to-transparent" />

            {/* Header / Clickable on mobile */}
            <div 
              onClick={() => toggleMobileService('infra')}
              className="cursor-pointer md:cursor-default select-none"
            >
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#1a1d2b] border border-[#292f44] flex items-center justify-center text-[#FF4500] shrink-0">
                    <Server className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#FF8C00] font-semibold">
                    Seguridad y Rendimiento
                  </span>
                </div>

                {/* Desktop uptime badge */}
                <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  99.9% Uptime garantizado
                </span>

                {/* Mobile toggle button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMobileService('infra');
                  }}
                  className="md:hidden inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#1d2230] text-[#FF8C00] border border-[#2f364b] shrink-0"
                  aria-label={expandedMobile['infra'] ? 'Ocultar descripción' : 'Ver descripción'}
                >
                  <span>{expandedMobile['infra'] ? 'Ocultar' : 'Ver detalles'}</span>
                  {expandedMobile['infra'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex items-center justify-between">
                <span>Tecnología e Infraestructura</span>
                {!expandedMobile['infra'] && (
                  <span className="md:hidden text-[11px] font-mono font-normal text-[#81889c]">
                    Tocar para ver +
                  </span>
                )}
              </h3>
            </div>

            {/* Collapsible details on mobile; always visible on tablet/desktop */}
            <div className={`${expandedMobile['infra'] ? 'block' : 'hidden'} md:block mt-3`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                <p className="text-xs sm:text-sm lg:text-base text-[#d8dce6] font-medium max-w-3xl leading-relaxed">
                  Nos encargamos de que tu página vuele, nunca se caiga y esté protegida con copias de seguridad. Vos te dedicás a vender, nosotros a que la tecnología funcione siempre.
                </p>

                {/* Badges & Button */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#1c2130] w-full lg:w-auto">
                  <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 bg-[#181c28] border border-[#252b3d] rounded-lg text-xs font-mono text-[#a5abbd]">
                    <Shield className="w-3.5 h-3.5 text-[#FF4500]" />
                    <span>Certificado SSL & Backups</span>
                  </div>

                  {onServiceSelect && (
                    <button
                      type="button"
                      onClick={() => onServiceSelect('Tecnología e Infraestructura')}
                      className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#1c202e] hover:bg-[#252a3d] border border-[#2b3246] hover:border-[#FF4500]/50 rounded-lg transition-all cursor-pointer text-center active:scale-[0.98]"
                    >
                      Consultar infraestructura
                    </button>
                  )}
                </div>
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
