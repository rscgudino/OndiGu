import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, Sparkles, ShoppingBag, Calendar, CheckCircle2, 
  ArrowRight, Share2, RefreshCw, Star, MapPin, Clock, 
  Flame, Palette, Eye, Bot, ShieldCheck
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface IndustryPreset {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  sampleName: string;
  heroText: string;
  services: Array<{ title: string; desc: string; price: string }>;
  ctaText: string;
  heroBg: string;
}

const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: 'gastro',
    name: 'Gastronomía & Delivery',
    tagline: 'Las mejores pizzas & pastas a la leña',
    badge: 'Abierto hasta 01:00 hs',
    sampleName: 'Pizzería Napolitana',
    heroText: 'Pedí online en 2 minutos y recibilo caliente en tu puerta',
    services: [
      { title: 'Pizza Especial de la Casa', desc: 'Muzzarella, jamón cocido, morrones asados y aceitunas', price: '$9.800' },
      { title: 'Empanadas Caseras (Docena)', desc: 'Carne cortada a cuchillo, jamón y queso o pollo', price: '$12.500' },
      { title: 'Promo Pareja + Gaseosa 1.5L', desc: '1 Muzzarella grande + 4 empanadas + bebida', price: '$14.900' },
    ],
    ctaText: 'Hacer pedido por WhatsApp',
    heroBg: 'from-amber-600/90 to-orange-700/90',
  },
  {
    id: 'barber',
    name: 'Barbería & Estética',
    tagline: 'Cortes clásicos, degrade y perfilado de barba',
    badge: 'Turnos disponibles hoy',
    sampleName: 'Barbería & Spa Vintage',
    heroText: 'Reservá tu turno sin esperar ni mandar mil mensajes',
    services: [
      { title: 'Corte Degradé + Lavado', desc: 'Incluye peinado profesional y terminación con navajín', price: '$7.500' },
      { title: 'Perfilado de Barba con Toalla Caliente', desc: 'Aceites esenciales, hidratación y perfilado navaja', price: '$5.200' },
      { title: 'Combo VIP: Corte + Barba + Masaje', desc: 'Experiencia completa de cuidado masculino 50 min', price: '$11.000' },
    ],
    ctaText: 'Reservar turno en 1 minuto',
    heroBg: 'from-zinc-800 to-stone-900',
  },
  {
    id: 'taller',
    name: 'Taller Mecánico & Gomería',
    tagline: 'Mecánica integral, tren delantero y frenos',
    badge: 'Presupuestos sin cargo',
    sampleName: 'Taller San Cayetano',
    heroText: 'Tu auto en manos de profesionales certificados en Lanús',
    services: [
      { title: 'Service Completo de Aceite & Filtros', desc: 'Aceite sintético + 3 filtros + revisión 25 puntos', price: '$48.000' },
      { title: 'Diagnóstico Computarizado OBD2', desc: 'Escaneo de fallas de inyección electrónica y reseteo', price: '$18.000' },
      { title: 'Alineación 3D y Balanceo de 4 Ruedas', desc: 'Regulación de comba, convergencia y plomos balance', price: '$22.000' },
    ],
    ctaText: 'Consultar turno mecánico',
    heroBg: 'from-blue-900 to-slate-900',
  },
  {
    id: 'comercio',
    name: 'Tienda & Ropa / Calzado',
    tagline: 'Moda urbana & indumentaria de temporada',
    badge: '3 cuotas sin interés',
    sampleName: 'Urban Streetwear Lanús',
    heroText: 'Comprá online con retiro en local o envío en el día',
    services: [
      { title: 'Buzo Hoodie Oversize Heavy Cotton', desc: 'Frisa invisible premium, colores negro, gris y crudo', price: '$34.000' },
      { title: 'Remera Boxy Fit Estampada', desc: 'Algodón peinado 24/1 serigrafía de alta duración', price: '$18.500' },
      { title: 'Pantalón Cargo Unisex con Bolsillos', desc: 'Gabardina elastizada tiro medio con ajuste en botamanga', price: '$39.000' },
    ],
    ctaText: 'Ver catálogo y comprar',
    heroBg: 'from-purple-900 to-indigo-950',
  },
  {
    id: 'profesional',
    name: 'Estudio & Servicios Profesionales',
    tagline: 'Asesoramiento contable, impositivo y jurídico',
    badge: 'Atención personalizada',
    sampleName: 'Estudio Morales & Asoc.',
    heroText: 'Soluciones claras para pymes, monotributistas y empresas',
    services: [
      { title: 'Asesoría Inicial Monotributo / Autónomos', desc: 'Encuadre fiscal, altas de AFIP / ARBA y facturación', price: '$25.000' },
      { title: 'Liquidación Mensual de Impuestos Pyme', desc: 'IVA, IIBB, Ganancias y Libro de IVA Digital', price: 'Consultar' },
      { title: 'Constitución de SRL o SAS Express', desc: 'Trámite integral de estatuto, publicaciones y CUIT', price: 'A medida' },
    ],
    ctaText: 'Agendar consulta profesional',
    heroBg: 'from-emerald-950 to-teal-900',
  },
];

const COLOR_THEMES = [
  { id: 'orange', name: 'Naranja OndiGu', primary: '#FF4500', secondary: '#FF8C00', textClass: 'text-[#FF4500]' },
  { id: 'emerald', name: 'Verde Éxito', primary: '#10B981', secondary: '#059669', textClass: 'text-emerald-500' },
  { id: 'blue', name: 'Azul Corporativo', primary: '#2563EB', secondary: '#1D4ED8', textClass: 'text-blue-500' },
  { id: 'purple', name: 'Púrpura Moderno', primary: '#9333EA', secondary: '#7E22CE', textClass: 'text-purple-500' },
];

interface InstantMockupGeneratorProps {
  onQuoteRequested?: (summary: string) => void;
}

export const InstantMockupGenerator: React.FC<InstantMockupGeneratorProps> = ({ onQuoteRequested }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('gastro');
  const [businessName, setBusinessName] = useState<string>('Pizzería Napolitana');
  const [activeColorId, setActiveColorId] = useState<string>('orange');
  const [phoneDarkMode, setPhoneDarkMode] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const activePreset = INDUSTRY_PRESETS.find((p) => p.id === selectedIndustryId) || INDUSTRY_PRESETS[0];
  const activeColor = COLOR_THEMES.find((c) => c.id === activeColorId) || COLOR_THEMES[0];

  const handleSelectIndustry = (preset: IndustryPreset) => {
    soundFx.playClick();
    setSelectedIndustryId(preset.id);
    setBusinessName(preset.sampleName);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      soundFx.playSuccess();
    }, 400);
  };

  const handleSendToWhatsApp = () => {
    soundFx.playSuccess();
    const cleanName = businessName.trim() || activePreset.sampleName;
    const msg = `*MOCKUP WEB CREADO EN ONDIGU*
*Negocio:* ${cleanName}
*Rubro:* ${activePreset.name}
*Estilo:* ${activeColor.name}

Hola Pedro, acabo de diseñar este prototipo en tu web y me encantó. Quiero que me presupuestes la versión real llave en mano.`;

    if (onQuoteRequested) {
      onQuoteRequested(`Mockup interactivo para: ${cleanName} (${activePreset.name})`);
    }

    const url = `https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="mockup-instantaneo" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Decorative background aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#FF4500]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-950/60 border border-[#FF4500]/40 rounded-full text-xs font-mono text-[#FF8C00] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>Exclusivo OndiGu // Generador de Mockup Instantáneo</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Tu negocio en pantalla <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FF8C00]">en 10 segundos</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Escribí el nombre de tu comercio y mirá cómo se vería tu web profesional adaptada a celular antes de contratar.
          </p>
        </div>

        {/* 2-Column Interface: Controls on Left, Live Smartphone on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (5 cols) */}
          <div className="lg:col-span-5 bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-slate-700/80 shadow-2xl space-y-6">
            
            {/* Input Business Name */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-2">
                1. Nombre de tu negocio o marca:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej: Parrilla Los Vascos, Barbería Elite..."
                  className="w-full bg-slate-900/90 border border-slate-600 focus:border-[#FF4500] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF4500]/20 font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setBusinessName(activePreset.sampleName);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Restablecer sugerencia"
                >
                  Sugerido
                </button>
              </div>
            </div>

            {/* Rubro Selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-2">
                2. Elegí tu rubro comercial:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INDUSTRY_PRESETS.map((preset) => {
                  const isSelected = preset.id === selectedIndustryId;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectIndustry(preset)}
                      className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#FF4500]/20 border-[#FF4500] text-white shadow-xs'
                          : 'bg-slate-900/50 border-slate-700/80 text-slate-300 hover:border-slate-600 hover:bg-slate-900'
                      }`}
                    >
                      <span className="truncate">{preset.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4500] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Color Selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-2">
                3. Paleta de color y estilo:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COLOR_THEMES.map((theme) => {
                  const isSelected = theme.id === activeColorId;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setActiveColorId(theme.id);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'border-white bg-slate-700 text-white ring-2 ring-white/20'
                          : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span className="text-[11px] truncate">{theme.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone display mode toggle (Dark / Light) */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-700/60 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Modo del celular virtual:</span>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setPhoneDarkMode(false);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                    !phoneDarkMode ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Claro ☀️
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setPhoneDarkMode(true);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                    phoneDarkMode ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Oscuro 🌙
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
              >
                <span>Quiero esta web programada por Pedro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Entrega Express en 24 a 72 hs con código 100% tuyo</span>
              </div>
            </div>
          </div>

          {/* Interactive Smartphone View (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Phone Frame wrapper */}
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] bg-slate-950 p-3 sm:p-3.5 rounded-[46px] border-[6px] border-slate-800 shadow-2xl shadow-black/80 ring-1 ring-slate-700">
              
              {/* Top Notch / Dynamic Island */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800 mr-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
              </div>

              {/* Inside Screen Container */}
              <div
                className={`w-full rounded-[36px] overflow-hidden transition-colors duration-300 relative select-none ${
                  phoneDarkMode ? 'bg-[#0f121a] text-white' : 'bg-slate-50 text-slate-900'
                }`}
                style={{ height: '620px' }}
              >
                
                {/* Status Bar */}
                <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-mono opacity-80">
                  <span>11:51</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Simulated Web App Content (Scrollable simulation) */}
                <div className="h-[570px] overflow-y-auto px-4 pb-20 scrollbar-none">
                  
                  {/* Top Navbar */}
                  <div className="flex items-center justify-between py-2 border-b border-slate-500/20 mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-xs"
                        style={{ backgroundColor: activeColor.primary }}
                      >
                        {businessName ? businessName.charAt(0).toUpperCase() : 'O'}
                      </div>
                      <div>
                        <span className="font-black text-xs block leading-tight truncate max-w-[170px]">
                          {businessName.trim() || activePreset.sampleName}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {activePreset.badge}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => soundFx.playClick()}
                      className="text-[10px] font-bold px-2 py-1 rounded-md text-white font-mono cursor-pointer"
                      style={{ backgroundColor: activeColor.primary }}
                    >
                      Menú
                    </button>
                  </div>

                  {/* Hero Banner inside phone */}
                  <div
                    className={`rounded-2xl p-4 text-white bg-gradient-to-br ${activePreset.heroBg} shadow-lg mb-4 relative overflow-hidden`}
                  >
                    <div className="relative z-10">
                      <span className="inline-block px-2 py-0.5 bg-black/40 backdrop-blur-xs text-[10px] font-mono rounded-full mb-2">
                        Lanús & GBA Sur // 100% Online
                      </span>
                      <h3 className="text-base font-extrabold leading-tight mb-1">
                        {activePreset.tagline}
                      </h3>
                      <p className="text-[11px] text-white/80 leading-relaxed mb-3">
                        {activePreset.heroText}
                      </p>

                      <button
                        type="button"
                        onClick={() => soundFx.playSuccess()}
                        className="w-full py-2 px-3 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-white/95 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#FF4500]" />
                        <span>{activePreset.ctaText}</span>
                      </button>
                    </div>
                  </div>

                  {/* Reviews & Social Proof pill inside phone */}
                  <div
                    className={`p-2.5 rounded-xl border mb-4 flex items-center justify-between text-xs ${
                      phoneDarkMode
                        ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-700 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-[11px] text-slate-100">4.9</span>
                      <span className="text-[10px] text-slate-400">(+140 reseñas Google)</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 font-semibold">
                      ✓ Verificado
                    </span>
                  </div>

                  {/* Services / Catalog List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
                        Destacados del Catálogo
                      </span>
                      <span className="text-[10px] font-mono text-[#FF8C00]">Ver todo →</span>
                    </div>

                    <div className="space-y-2.5">
                      {activePreset.services.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border transition-all ${
                            phoneDarkMode
                              ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                              : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold leading-tight">{item.title}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                            <span
                              className="text-xs font-mono font-bold shrink-0"
                              style={{ color: activeColor.primary }}
                            >
                              {item.price}
                            </span>
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-500/10 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400 font-mono">Disponibilidad inmediata</span>
                            <button
                              type="button"
                              onClick={() => soundFx.playClick()}
                              className="px-2 py-0.5 rounded text-[10px] font-bold text-white cursor-pointer"
                              style={{ backgroundColor: activeColor.primary }}
                            >
                              + Elegir
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Location & Hours */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-[10px] space-y-1 text-slate-400">
                    <p className="flex items-center gap-1 text-slate-300 font-semibold">
                      <MapPin className="w-3 h-3 text-[#FF4500]" />
                      Lanús Centro, Gran Buenos Aires
                    </p>
                    <p className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      Martes a Domingos: 11:30 a 00:30 hs
                    </p>
                  </div>
                </div>

                {/* Floating Bottom Nav inside phone */}
                <div className="absolute bottom-2 left-3 right-3 p-2 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-800 flex items-center justify-between text-xs px-3">
                  <span className="text-[10px] font-mono text-slate-400">
                    Web lista en 24hs con OndiGu
                  </span>
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="px-3 py-1 rounded-lg text-white font-bold text-[10px] flex items-center gap-1 shadow-xs cursor-pointer"
                    style={{ backgroundColor: activeColor.primary }}
                  >
                    <span>Pedir esta web</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs font-mono text-slate-400 mt-3 text-center">
              💡 Este prototipo es 100% interactivo. Modificá el nombre y el color arriba para ver los cambios al instante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
