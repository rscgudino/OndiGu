import React, { useState, useMemo } from 'react';
import { Sliders, CheckCircle2, Clock, Zap, ArrowRight, ShieldCheck, Plus, Check, FileText, CreditCard, DollarSign } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { soundFx } from '../utils/soundEffects';
import { useCurrency } from '../context/CurrencyContext';
import { OfficialQuotePdfModal } from './OfficialQuotePdfModal';

interface BaseOption {
  id: string;
  name: string;
  description: string;
  deliveryDays: string;
  badge?: string;
  basePrice: number;
}

interface AddonOption {
  id: string;
  name: string;
  description: string;
  extraDays: number;
  price: number;
  popular?: boolean;
}

const BASE_OPTIONS: BaseOption[] = [
  {
    id: 'landing-express',
    name: 'Landing Page Express 24hs',
    description: 'Página de impacto de una sola pantalla optimizada para publicidad, ventas rápidas y WhatsApp.',
    deliveryDays: '24 a 72 hs',
    badge: 'MÁS RÁPIDO',
    basePrice: 120000,
  },
  {
    id: 'web-pro',
    name: 'Sitio Web Comercial Pro',
    description: 'Web completa de 4 a 6 secciones, catálogo de servicios, blog/noticias y SEO local para Google.',
    deliveryDays: '4 a 6 días',
    badge: 'MÁS ELEGIDO',
    basePrice: 220000,
  },
  {
    id: 'ecommerce',
    name: 'Tienda Online E-commerce',
    description: 'Catálogo con carrito de compras, cobro automático por Mercado Pago y cálculo de envíos.',
    deliveryDays: '5 a 8 días',
    basePrice: 320000,
  },
  {
    id: 'sistema-medida',
    name: 'Sistema / Turnero a Medida',
    description: 'Portal interactivo con base de datos, gestión de clientes, reservas y panel de control.',
    deliveryDays: '7 a 12 días',
    basePrice: 450000,
  },
];

const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'bot-ia',
    name: 'Bot de WhatsApp con IA 24/7',
    description: 'Atiende consultas, envía precios y agenda de noche sin intervención humana.',
    extraDays: 1,
    price: 95000,
    popular: true,
  },
  {
    id: 'google-maps',
    name: 'Ficha Google Maps Lanús & SEO Local',
    description: 'Optimización de palabras clave y ficha de negocio para aparecer primero en el mapa.',
    extraDays: 1,
    price: 45000,
    popular: true,
  },
  {
    id: 'turnero',
    name: 'Sincronización con Google Calendar',
    description: 'Agenda automática de turnos que bloquea tus horarios libres en tiempo real.',
    extraDays: 1,
    price: 55000,
  },
  {
    id: 'pagos-mp',
    name: 'Integración Mercado Pago / QR',
    description: 'Cobros con tarjetas, débito y dinero en cuenta con acreditación directa.',
    extraDays: 1,
    price: 40000,
  },
  {
    id: 'hosting-dominio',
    name: 'Dominio Propio + Servidor SSL (1 Año)',
    description: 'Tu propio nombre .com o .com.ar con servidor ultra veloz y candado de seguridad.',
    extraDays: 0,
    price: 35000,
  },
];

interface ProjectConfiguratorProps {
  onQuoteSubmit?: (configuredSummary: string) => void;
}

export const ProjectConfigurator: React.FC<ProjectConfiguratorProps> = ({ onQuoteSubmit }) => {
  const { currency, toggleCurrency, formatPrice, convertToUsd } = useCurrency();
  const [selectedBaseId, setSelectedBaseId] = useState<string>('landing-express');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['bot-ia', 'google-maps']);
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);

  const selectedBase = BASE_OPTIONS.find((b) => b.id === selectedBaseId) || BASE_OPTIONS[0];

  const toggleAddon = (addonId: string) => {
    soundFx.playTick();
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculation = useMemo(() => {
    const addonsTotal = selectedAddonIds.reduce((sum, id) => {
      const addon = ADDON_OPTIONS.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);

    const totalEstimate = selectedBase.basePrice + addonsTotal;
    const selectedAddonsList = ADDON_OPTIONS.filter((a) => selectedAddonIds.includes(a.id));

    return {
      totalEstimate,
      selectedAddonsList,
    };
  }, [selectedBase, selectedAddonIds]);

  const handleSendToWhatsApp = () => {
    soundFx.playSuccess();
    const addonsNames = calculation.selectedAddonsList.length > 0
      ? calculation.selectedAddonsList.map((a) => `• ${a.name} (+${formatPrice(a.price)})`).join('\n')
      : '• Sin módulos adicionales';
      
    const msg = `Configuración a medida armada en la web OndiGu:\n\n*Base:* ${selectedBase.name} (Plazo estimado: ${selectedBase.deliveryDays})\n*Módulos adicionales seleccionados:*\n${addonsNames}\n\n*Presupuesto orientativo total:* ${formatPrice(calculation.totalEstimate)} (${currency})\n*Garantía:* Soporte post-entrega y código limpio con Pedro Gudiño.`;

    if (onQuoteSubmit) {
      onQuoteSubmit(msg);
    } else {
      const url = `https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noreferrer');
    }
  };

  return (
    <section id="configurador-solucion" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0c0f16] border-t border-slate-200 dark:border-[#1a1f2c] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header with Currency Switcher */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white dark:bg-[#161a25] border border-slate-200 dark:border-[#272d3e] rounded-full text-xs font-mono text-[#FF4500] dark:text-[#FF8C00] shadow-xs">
              <Sliders className="w-3.5 h-3.5 text-[#FF4500]" />
              <span>Configurador Visual a Medida</span>
            </div>

            {/* Live Currency Selector Switch */}
            <div className="inline-flex items-center gap-1 bg-white dark:bg-[#161a25] border border-slate-300 dark:border-[#2b3347] rounded-full p-1 shadow-xs">
              <button
                type="button"
                onClick={() => {
                  if (currency !== 'ARS') {
                    soundFx.playClick();
                    toggleCurrency();
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currency === 'ARS'
                    ? 'bg-[#FF4500] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🇦🇷 ARS $
              </button>
              <button
                type="button"
                onClick={() => {
                  if (currency !== 'USD') {
                    soundFx.playClick();
                    toggleCurrency();
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#FF4500] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🌐 USD u$s
              </button>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Armá tu solución tecnológica en 2 minutos
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-[#9da4b6] leading-relaxed">
            Elegí la base de tu proyecto y sumá los complementos que necesita tu negocio. Obtené el tiempo de entrega y el presupuesto claro al instante:
          </p>
        </div>

        {/* Grid layout: Steps on left, Summary card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Step 1 and Step 2 (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Base */}
            <div className="bg-white dark:bg-[#131620] border border-slate-200 dark:border-[#202636] rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-mono font-bold text-[#FF4500] uppercase tracking-wider block mb-2">
                Paso 1 // Elegí la estructura base
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                ¿Qué tipo de desarrollo necesita tu negocio?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASE_OPTIONS.map((base) => {
                  const isSelected = base.id === selectedBaseId;
                  return (
                    <div
                      key={base.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedBaseId(base.id);
                      }}
                      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#FF4500] bg-orange-50/50 dark:bg-[#201815] shadow-xs scale-[1.01]'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#161a26]'
                      }`}
                    >
                      {base.badge && (
                        <span className="absolute -top-2.5 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FF4500] text-white">
                          {base.badge}
                        </span>
                      )}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {base.name}
                          </h4>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF4500] shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                          {base.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#FF4500]" />
                          {base.deliveryDays}
                        </span>
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          {formatPrice(base.basePrice)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Addons */}
            <div className="bg-white dark:bg-[#131620] border border-slate-200 dark:border-[#202636] rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-mono font-bold text-[#FF4500] uppercase tracking-wider block mb-2">
                Paso 2 // Sumá complementos y automatizaciones
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Potenciadores opcionales para multiplicar resultados
              </h3>

              <div className="space-y-3">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'border-[#FF4500] bg-orange-50/40 dark:bg-[#1e1716]'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#161a26]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#FF4500] text-white'
                              : 'border border-slate-400 dark:border-slate-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {addon.name}
                            </h4>
                            {addon.popular && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 font-semibold">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {addon.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 block">
                          +{formatPrice(addon.price)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Live Summary Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-gradient-to-br from-slate-900 via-[#131722] to-slate-950 text-white border-2 border-[#FF4500]/40 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-mono text-[#FF8C00] uppercase tracking-wider block">
                      Resumen de Configuración
                    </span>
                    <h4 className="text-xl font-extrabold text-white">Tu Solución OndiGu</h4>
                  </div>
                  <Zap className="w-6 h-6 text-[#FF4500]" />
                </div>

                {/* Base info */}
                <div className="mb-4 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">Base seleccionada:</span>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedBase.name}</p>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    Plazo de entrega: {selectedBase.deliveryDays}
                  </span>
                </div>

                {/* Selected addons */}
                <div className="mb-4">
                  <span className="text-xs font-mono text-slate-400 uppercase block mb-2">
                    Módulos adicionales incluidos ({calculation.selectedAddonsList.length}):
                  </span>
                  {calculation.selectedAddonsList.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No agregaste módulos adicionales aún.</p>
                  ) : (
                    <ul className="space-y-2 text-xs text-slate-300">
                      {calculation.selectedAddonsList.map((a) => (
                        <li key={a.id} className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            {a.name}
                          </span>
                          <span className="font-mono text-slate-400">+{formatPrice(a.price)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Accepted Payment Badges */}
                <div className="mb-5 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    💳 Formas de pago aceptadas:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                    <span className="px-2 py-0.5 bg-sky-950/70 border border-sky-500/40 text-sky-300 rounded">
                      Mercado Pago
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 rounded">
                      Transferencia (CBU/CVU)
                    </span>
                    <span className="px-2 py-0.5 bg-purple-950/70 border border-purple-500/40 text-purple-300 rounded">
                      Tarjetas / Cuotas
                    </span>
                    <span className="px-2 py-0.5 bg-amber-950/70 border border-amber-500/40 text-amber-300 rounded">
                      USDT / Crypto
                    </span>
                  </div>
                </div>

                {/* Guarantee badge */}
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-start gap-2.5 text-xs text-emerald-300 mb-6">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Garantía OndiGu:</strong> Soporte post-entrega, código limpio y asesoramiento personalizado directo con Pedro Gudiño en Lanús.
                  </span>
                </div>
              </div>

              {/* Total estimation & Actions */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-400">Inversión estimada:</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {formatPrice(calculation.totalEstimate)}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      {currency === 'ARS' ? 'ARS (Final llave en mano)' : 'USD (Conversión aproximada)'}
                    </span>
                  </div>
                </div>

                {/* Main Action: WhatsApp / Agenda */}
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-all cursor-pointer"
                >
                  <span>Pedir presupuesto con esta configuración</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Secondary Action: Download Formal PDF */}
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setPdfModalOpen(true);
                  }}
                  className="w-full py-2.5 px-4 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#FF8C00]" />
                  <span>Descargar presupuesto formal oficial en PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Official PDF Quote Modal */}
      <OfficialQuotePdfModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        baseOption={selectedBase}
        selectedAddons={calculation.selectedAddonsList}
        totalEstimate={calculation.totalEstimate}
      />
    </section>
  );
};
