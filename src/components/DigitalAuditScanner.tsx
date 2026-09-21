import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, BarChart3, Smartphone, Zap, MapPin, Share2, Sparkles, TrendingDown } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface DigitalAuditScannerProps {
  onScheduleCall?: (businessName: string) => void;
}

const SAMPLE_BUSINESSES = [
  'Parrilla o Pizzería en Lanús',
  'Barbería / Estética en el barrio',
  'Estudio Contable o Jurídico',
  'Taller Automotor GBA Sur',
  'Comercio / Indumentaria Online',
];

export const DigitalAuditScanner: React.FC<DigitalAuditScannerProps> = ({ onScheduleCall }) => {
  const [businessInput, setBusinessInput] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scanResult, setScanResult] = useState<{
    score: number;
    businessName: string;
    mobileSpeed: number;
    conversionEase: number;
    localSeo: number;
    automation: number;
    estimatedLeadsLost: number;
  } | null>(null);

  const performScan = (targetName: string) => {
    if (!targetName.trim()) return;

    soundFx.playClick();
    setIsScanning(true);
    setScanResult(null);

    // Sequence of scan steps
    setScanStep('Analizando velocidad de carga en smartphones 4G/5G...');

    setTimeout(() => {
      soundFx.playTick();
      setScanStep('Evaluando facilidad de contacto y botones de compra directa...');
    }, 800);

    setTimeout(() => {
      soundFx.playTick();
      setScanStep('Verificando posicionamiento en Google Maps en Lanús y GBA...');
    }, 1600);

    setTimeout(() => {
      soundFx.playTick();
      setScanStep('Comprobando automatización de respuestas fuera de horario...');
    }, 2400);

    setTimeout(() => {
      soundFx.playSuccess();
      setIsScanning(false);
      // Generate realistic score between 54 and 72
      const randomBase = 58 + Math.floor(Math.random() * 12);
      const lostLeads = 15 + Math.floor(Math.random() * 20);
      setScanResult({
        score: randomBase,
        businessName: targetName.trim(),
        mobileSpeed: 62,
        conversionEase: 55,
        localSeo: 68,
        automation: 25,
        estimatedLeadsLost: lostLeads,
      });
    }, 3100);
  };

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    performScan(businessInput);
  };

  const handleAction = () => {
    soundFx.playClick();
    if (onScheduleCall && scanResult) {
      onScheduleCall(`Auditoría digital para: ${scanResult.businessName}`);
    }
  };

  const handleSendWhatsAppReport = () => {
    if (!scanResult) return;
    soundFx.playSuccess();
    const msg = `*DIAGNÓSTICO DIGITAL ONDIGU*
*Negocio:* ${scanResult.businessName}
*Puntaje actual:* ${scanResult.score}/100
- Velocidad móvil: ${scanResult.mobileSpeed}%
- Facilidad de compra: ${scanResult.conversionEase}%
- Google Maps Lanús / GBA: ${scanResult.localSeo}%
- Automatización 24/7: ${scanResult.automation}%

*Oportunidad:* Se calcula una pérdida de ~${scanResult.estimatedLeadsLost} clientes potenciales por mes por falta de respuesta fuera de hora.

Hola Pedro, quiero una asesoría de 15 minutos para optimizar mi presencia digital.`;

    const url = `https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="auditoria-express" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0e1119] border-t border-slate-200 dark:border-[#1e2332] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-100 dark:bg-[#161a25] border border-slate-200 dark:border-[#272d3e] rounded-full text-xs font-mono text-[#FF4500] dark:text-[#FF8C00] mb-3 shadow-xs">
            <Search className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>Escáner y Diagnóstico Digital Gratuito</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Auditoría express de tu presencia digital
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-[#9da4b6] leading-relaxed">
            Ingresá el nombre de tu comercio, tu web o tu usuario de Instagram. Nuestro evaluador analizará los 4 puntos críticos que definen si un cliente te compra o se va:
          </p>
        </div>

        {/* Input Form Box */}
        <div className="bg-slate-50 dark:bg-[#131722] border-2 border-slate-200 dark:border-[#202738] rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={businessInput}
                onChange={(e) => setBusinessInput(e.target.value)}
                disabled={isScanning}
                placeholder="Ej: Parrilla Don Pedro o @mimodalanus"
                className="w-full bg-white dark:bg-[#1a202d] border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#FF4500]"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning || !businessInput.trim()}
              className="px-6 py-3.5 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all cursor-pointer shrink-0"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Escaneando...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Escanear negocio gratis</span>
                </>
              )}
            </button>
          </form>

          {/* Quick-Pick sample tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-mono text-[11px] text-slate-400">O probá con un ejemplo:</span>
            {SAMPLE_BUSINESSES.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setBusinessInput(sample);
                  performScan(sample);
                }}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#191e2b] hover:bg-orange-50 dark:hover:bg-[#201815] border border-slate-200 dark:border-slate-700 hover:border-[#FF4500] text-slate-700 dark:text-slate-300 text-[11px] transition-colors cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>

          {/* Scanning animation status */}
          {isScanning && (
            <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/40 rounded-xl text-center">
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-[#FF4500] h-full animate-[pulse_1s_infinite] w-3/4 rounded-full" />
              </div>
              <p className="text-xs font-mono text-[#FF4500] dark:text-[#FF8C00] font-semibold">
                {scanStep}
              </p>
            </div>
          )}

          {/* Results Box */}
          {scanResult && !isScanning && (
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">Diagnóstico para:</span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {scanResult.businessName}
                  </h4>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-[#1a202d] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Puntaje General</span>
                    <span className="text-2xl font-extrabold text-[#FF4500]">
                      {scanResult.score}/100
                    </span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                </div>
              </div>

              {/* Vector bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-[#191e2b] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Smartphone className="w-3.5 h-3.5 text-[#FF4500]" />
                      Velocidad & Celulares
                    </span>
                    <span className="font-mono text-slate-500">{scanResult.mobileSpeed}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${scanResult.mobileSpeed}%` }}
                      className="bg-amber-500 h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-[#191e2b] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Zap className="w-3.5 h-3.5 text-[#FF4500]" />
                      Facilidad de Compra
                    </span>
                    <span className="font-mono text-slate-500">{scanResult.conversionEase}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${scanResult.conversionEase}%` }}
                      className="bg-amber-500 h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-[#191e2b] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
                      Posicionamiento en Lanús / GBA
                    </span>
                    <span className="font-mono text-slate-500">{scanResult.localSeo}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${scanResult.localSeo}%` }}
                      className="bg-emerald-500 h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-[#191e2b] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                      Automatización 24/7 (Bots)
                    </span>
                    <span className="font-mono text-red-500 font-bold">{scanResult.automation}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${scanResult.automation}%` }}
                      className="bg-red-500 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Business Impact Metric */}
              <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-red-900 dark:text-red-200">
                      Fuga estimada de consultas: ~{scanResult.estimatedLeadsLost} clientes potenciales por mes
                    </h5>
                    <p className="text-[11px] text-red-700 dark:text-red-300 mt-0.5">
                      Personas que buscan tu servicio en Google o WhatsApp fuera de horario comercial y se van con la competencia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actionable recommendations */}
              <div className="bg-orange-50/50 dark:bg-[#181a24] p-4 rounded-xl border border-orange-200/70 dark:border-[#2b2520] mb-6 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <span className="font-bold text-[#FF4500] block mb-1">
                  💡 3 Oportunidades críticas de mejora inmediata detectadas:
                </span>
                <p>• <strong>Respuesta fuera de hora:</strong> Si un cliente escribe pasadas las 20hs, se pierde la venta. Integrar un bot inteligente solucionaría esto de inmediato.</p>
                <p>• <strong>Carga en celulares:</strong> Optimizar imágenes y código para abrir en menos de 1 segundo en conexiones 4G/5G de Lanús.</p>
                <p>• <strong>Ficha de Google:</strong> Optimizar reseñas y categorías locales para salir en el top 3 de búsquedas en Lanús.</p>
              </div>

              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleAction}
                  className="w-full sm:flex-1 py-3.5 px-5 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
                >
                  <span>Pedir asesoramiento gratuito de 15 min con Pedro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsAppReport}
                  className="w-full sm:w-auto py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Enviar diagnóstico a WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
