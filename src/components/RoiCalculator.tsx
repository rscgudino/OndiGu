import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Clock, TrendingUp, ArrowRight, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { soundFx } from '../utils/soundEffects';

interface RoiCalculatorProps {
  onQuoteClick?: (calculatedSummary: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onQuoteClick }) => {
  const [messagesPerDay, setMessagesPerDay] = useState<number>(35);
  const [responseTimeHours, setResponseTimeHours] = useState<number>(3); // hours
  const [averageTicket, setAverageTicket] = useState<number>(22000); // ARS

  // Calculations
  // Studies show if you respond within 5 min, conversion is 391% higher than after 30+ min.
  // When delay is 3+ hours, ~25% to 40% of impulse buyers buy elsewhere.
  const stats = useMemo(() => {
    // Loss percentage based on delay:
    let lossRate = 0.12;
    if (responseTimeHours >= 1) lossRate = 0.22;
    if (responseTimeHours >= 2) lossRate = 0.32;
    if (responseTimeHours >= 4) lossRate = 0.45;

    // Monthly volume
    const monthlyInquiries = messagesPerDay * 30;
    // Estimated potential buyers with rapid response (e.g. 18% base interest)
    const interestedBuyers = monthlyInquiries * 0.20;
    // Buyers lost due to delay
    const lostBuyers = Math.round(interestedBuyers * lossRate);
    // Money lost per month in ARS
    const monthlyMoneyLost = lostBuyers * averageTicket;
    // Hours spent manually typing responses (approx 3 min per message)
    const monthlyHoursSpent = Math.round((monthlyInquiries * 3) / 60);

    return {
      monthlyInquiries,
      lostBuyers,
      monthlyMoneyLost,
      monthlyHoursSpent,
      annualMoneyLost: monthlyMoneyLost * 12,
    };
  }, [messagesPerDay, responseTimeHours, averageTicket]);

  const handleSliderChange = (setter: (val: number) => void, val: number) => {
    setter(val);
    soundFx.playTick();
  };

  const handleAction = () => {
    soundFx.playSuccess();
    const summary = `Hola Pedro! Usé el Calculador de OndiGu: recibo aprox ${messagesPerDay} mensajes al día con ticket de $${averageTicket.toLocaleString('es-AR')}. Quiero recuperar ventas y automatizar mi negocio con IA.`;
    if (onQuoteClick) {
      onQuoteClick(summary);
    } else {
      const url = `https://wa.me/5491100000000?text=${encodeURIComponent(summary)}`;
      window.open(url, '_blank', 'noreferrer');
    }
  };

  return (
    <section id="calculadora-roi" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0b0e14] border-t border-slate-200 dark:border-[#1a1f2c] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white dark:bg-[#161a25] border border-slate-200 dark:border-[#272d3e] rounded-full text-xs font-mono text-[#FF4500] dark:text-[#FF8C00] mb-3 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>Simulador Financiero para Comercios y Pymes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            ¿Cuánto dinero estás perdiendo por no automatizar?
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-[#9da4b6] leading-relaxed">
            Cuando un cliente pregunta por WhatsApp o Instagram y nadie responde al instante, busca a tu competidor. Ajustá tus números reales y mirá la proyección en vivo:
          </p>
        </div>

        {/* 2-Column interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#12151f] border border-slate-200 dark:border-[#202534] rounded-2xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div className="space-y-8">
              {/* Slider 1: Consultas por día */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#FF4500]" />
                    <span>Mensajes o consultas que recibís al día</span>
                  </label>
                  <span className="text-base font-mono font-bold text-[#FF4500] dark:text-[#FF8C00] bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-lg border border-orange-200 dark:border-orange-800/40">
                    {messagesPerDay} consultas / día
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={messagesPerDay}
                  onChange={(e) => handleSliderChange(setMessagesPerDay, Number(e.target.value))}
                  className="w-full accent-[#FF4500] cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>5 (Comercio chico)</span>
                  <span>75 (Pyme activa)</span>
                  <span>150+ (Alto volumen)</span>
                </div>
              </div>

              {/* Slider 2: Tiempo de demora */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FF4500]" />
                    <span>Demora habitual en responder (WhatsApp/Redes)</span>
                  </label>
                  <span className="text-base font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-[#1c2130] px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    {responseTimeHours === 0.25 ? '15 minutos' : responseTimeHours === 0.5 ? '30 minutos' : `${responseTimeHours} horas`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.25}
                  max={8}
                  step={0.25}
                  value={responseTimeHours}
                  onChange={(e) => handleSliderChange(setResponseTimeHours, Number(e.target.value))}
                  className="w-full accent-[#FF4500] cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>15 min</span>
                  <span>2 horas</span>
                  <span>4 horas</span>
                  <span>8+ horas</span>
                </div>
              </div>

              {/* Slider 3: Ticket promedio */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#FF4500]" />
                    <span>Ticket promedio de tu venta o servicio</span>
                  </label>
                  <span className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
                    ${averageTicket.toLocaleString('es-AR')} ARS
                  </span>
                </div>
                <input
                  type="range"
                  min={3000}
                  max={120000}
                  step={1000}
                  value={averageTicket}
                  onChange={(e) => handleSliderChange(setAverageTicket, Number(e.target.value))}
                  className="w-full accent-[#FF4500] cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>$3.000 (Comercio diario)</span>
                  <span>$35.000</span>
                  <span>$120.000+ (Servicios / B2B)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-200 dark:border-[#202534] text-xs text-slate-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Cálculo basado en el estudio de Harvard Business Review sobre respuesta comercial en menos de 5 minutos.</span>
            </div>
          </div>

          {/* Right: Live Result Dashboard (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#10141e] to-slate-950 text-white border-2 border-orange-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4500]/20 border border-[#FF4500]/40 rounded-full text-xs font-mono text-[#FF8C00] mb-6">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Impacto Mensual Estimado</span>
              </div>

              {/* Big metric: Money lost */}
              <div className="mb-6">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Dinero que se te escapa cada mes:
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-red-400 tracking-tight mt-1">
                  -${stats.monthlyMoneyLost.toLocaleString('es-AR')}{' '}
                  <span className="text-sm font-normal text-slate-400">ARS/mes</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Equivalente a <strong className="text-white">{stats.lostBuyers} clientes</strong> que se cansan de esperar y compran a la competencia.
                </p>
              </div>

              {/* Secondary metrics grid */}
              <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-800">
                <div className="bg-[#171b26] p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Horas manuales perdidas</span>
                  <span className="text-lg font-bold text-amber-400">~{stats.monthlyHoursSpent} hs/mes</span>
                  <span className="text-[10px] text-slate-500 block">tipeando lo mismo una y otra vez</span>
                </div>
                <div className="bg-[#171b26] p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Recupero anual potencial</span>
                  <span className="text-lg font-bold text-emerald-400">+${(stats.annualMoneyLost / 1000000).toFixed(1)}M ARS</span>
                  <span className="text-[10px] text-slate-500 block">en ventas salvadas con IA</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>El bot de OndiGu responde en <strong>3 a 8 segundos</strong>.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Envía fotos, precios y link de pago automático.</span>
                </div>
              </div>
            </div>

            {/* CTA button */}
            <div className="relative z-10 mt-8 pt-4">
              <button
                type="button"
                onClick={handleAction}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
              >
                <span>Quiero recuperar estas ventas con OndiGu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
