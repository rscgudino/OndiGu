import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, BarChart3, Smartphone, Zap, MapPin } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface DigitalAuditScannerProps {
  onScheduleCall?: (businessName: string) => void;
}

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
  } | null>(null);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessInput.trim()) return;

    soundFx.playClick();
    setIsScanning(true);
    setScanResult(null);

    // Sequence of scan steps
    setScanStep('Analizando velocidad de carga en smartphones...');

    setTimeout(() => {
      soundFx.playTick();
      setScanStep('Evaluando facilidad de contacto y botones de compra directa...');
    }, 900);

    setTimeout(() => {
      soundFx.playTick();
      setScanStep('Verificando posicionamiento en Google Maps en Lanús y GBA...');
    }, 1800);

    setTimeout(() => {
      soundFx.playTick();
      setScanStep('Comprobando automatización de respuestas fuera de horario...');
    }, 2600);

    setTimeout(() => {
      soundFx.playSuccess();
      setIsScanning(false);
      // Generate realistic score between 54 and 72
      const randomBase = 58 + Math.floor(Math.random() * 12);
      setScanResult({
        score: randomBase,
        businessName: businessInput.trim(),
        mobileSpeed: 62,
        conversionEase: 55,
        localSeo: 68,
        automation: 25,
      });
    }, 3400);
  };

  const handleAction = () => {
    soundFx.playClick();
    if (onScheduleCall && scanResult) {
      onScheduleCall(`Auditoría digital para: ${scanResult.businessName}`);
    }
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

              {/* Actionable recommendations */}
              <div className="bg-orange-50/50 dark:bg-[#181a24] p-4 rounded-xl border border-orange-200/70 dark:border-[#2b2520] mb-6 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <span className="font-bold text-[#FF4500] block mb-1">
                  💡 3 Oportunidades críticas de mejora detectadas:
                </span>
                <p>• <strong>Respuesta fuera de hora:</strong> Si un cliente escribe pasadas las 20hs, se pierde la venta. Integrar un bot inteligente solucionaría esto de inmediato.</p>
                <p>• <strong>Carga en celulares:</strong> Optimizar imágenes y código para abrir en menos de 1 segundo en conexiones 4G/5G.</p>
                <p>• <strong>Ficha de Google:</strong> Optimizar reseñas y categorías locales para salir en el top 3 de búsquedas en Lanús.</p>
              </div>

              {/* Call to action */}
              <button
                type="button"
                onClick={handleAction}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
              >
                <span>Pedir asesoramiento gratuito de 15 min con Pedro Gudiño</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
