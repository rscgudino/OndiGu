import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  History, Clock, AlertOctagon, TrendingDown, ArrowRight, 
  RotateCcw, DollarSign, ShieldCheck, Zap, Sparkles 
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import { useCurrency } from '../context/CurrencyContext';

interface CommercialTimeMachineProps {
  onQuoteRequested?: (summary: string) => void;
}

export const CommercialTimeMachine: React.FC<CommercialTimeMachineProps> = ({ onQuoteRequested }) => {
  const { currency, formatPrice, convertToUsd } = useCurrency();

  const [businessYears, setBusinessYears] = useState<number>(3);
  const [dailyInquiries, setDailyInquiries] = useState<number>(18);
  const [averageTicket, setAverageTicket] = useState<number>(16000);
  const [leakPercentage, setLeakPercentage] = useState<number>(35); // 35% default loss rate

  const calculation = useMemo(() => {
    const totalDays = businessYears * 365;
    const totalInquiriesEver = totalDays * dailyInquiries;
    
    // Lost leads
    const lostClients = Math.round(totalInquiriesEver * (leakPercentage / 100));
    
    // Conversion factor on lost leads (assuming 25% of them would have bought)
    const wouldHavePurchased = Math.round(lostClients * 0.25);
    const totalMoneyLost = wouldHavePurchased * averageTicket;

    // Monthly rescue projection with OndiGu 24/7 bot
    const monthlyInquiries = dailyInquiries * 30;
    const monthlyRecoveredClients = Math.round(monthlyInquiries * (leakPercentage / 100) * 0.4);
    const monthlyRecoveredMoney = monthlyRecoveredClients * averageTicket;

    return {
      totalDays,
      totalInquiriesEver,
      lostClients,
      totalMoneyLost,
      monthlyRecoveredClients,
      monthlyRecoveredMoney,
    };
  }, [businessYears, dailyInquiries, averageTicket, leakPercentage]);

  const handleSliderChange = (setter: (val: number) => void, val: number) => {
    setter(val);
    soundFx.playTick();
  };

  const handleSendRescueWhatsApp = () => {
    soundFx.playSuccess();
    const msg = `*MÁQUINA DEL TIEMPO COMERCIAL ONDIGU*
*Antigüedad:* ${businessYears} años
*Consultas diarias:* ${dailyInquiries} por día
*Ticket promedio:* ${formatPrice(averageTicket)}
*Tasa estimada de fuga:* ${leakPercentage}%

*Cálculo histórico:*
- Clientes potenciales no cerrados: ~${calculation.lostClients.toLocaleString('es-AR')} personas
- Fuga histórica estimada: ~${formatPrice(calculation.totalMoneyLost)} (${currency})

*Plan de rescate OndiGu:*
- Recuperación mensual estimada: +${formatPrice(calculation.monthlyRecoveredMoney)}/mes

Hola Pedro, quiero frenar la pérdida de clientes y automatizar mi negocio con un Bot de WhatsApp y Landing Page.`;

    if (onQuoteRequested) {
      onQuoteRequested(`Plan de rescate de ventas para comercio de ${businessYears} años`);
    }

    const url = `https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="maquina-del-tiempo" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background neon lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF4500]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/60 border border-red-500/40 rounded-full text-xs font-mono text-red-400 mb-3 shadow-xs">
            <History className="w-3.5 h-3.5 text-red-400" />
            <span>Exclusivo OndiGu // La Máquina del Tiempo Comercial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            ¿Cuánta plata se te escapó <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">en el pasado?</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Calculá cuántos clientes y cuánto dinero se perdió en los últimos años por responder horas tarde, no atender un domingo o no tener catálogo online.
          </p>
        </div>

        {/* 2-Column Interface: Sliders on Left, Impact Counter on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Panel (6 cols) */}
          <div className="lg:col-span-6 bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6">
            
            {/* 1. Antigüedad del negocio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase font-bold text-slate-300">
                  1. Años de vida de tu negocio:
                </label>
                <span className="text-sm font-mono font-bold text-[#FF8C00] bg-orange-950/80 px-2.5 py-0.5 rounded border border-[#FF4500]/30">
                  {businessYears} {businessYears === 1 ? 'año' : 'años'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={businessYears}
                onChange={(e) => handleSliderChange(setBusinessYears, Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF4500]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>1 año</span>
                <span>5 años</span>
                <span>10 años</span>
                <span>15+ años</span>
              </div>
            </div>

            {/* 2. Consultas promedio diarias */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase font-bold text-slate-300">
                  2. Mensajes o consultas promedio por día:
                </label>
                <span className="text-sm font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                  ~{dailyInquiries} consultas/día
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="1"
                value={dailyInquiries}
                onChange={(e) => handleSliderChange(setDailyInquiries, Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>5 por día</span>
                <span>25 por día</span>
                <span>50 por día</span>
                <span>80+ por día</span>
              </div>
            </div>

            {/* 3. Ticket promedio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase font-bold text-slate-300">
                  3. Ticket o venta promedio de tu negocio:
                </label>
                <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  {formatPrice(averageTicket)}
                </span>
              </div>
              <input
                type="range"
                min="4000"
                max="120000"
                step="2000"
                value={averageTicket}
                onChange={(e) => handleSliderChange(setAverageTicket, Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>$4.000</span>
                <span>$30.000</span>
                <span>$70.000</span>
                <span>$120.000+</span>
              </div>
            </div>

            {/* 4. Tasa de fuga estimada */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase font-bold text-slate-300">
                  4. % de consultas que quedan sin respuesta rápida:
                </label>
                <span className="text-sm font-mono font-bold text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded border border-red-500/30">
                  {leakPercentage}% de fuga
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="65"
                step="5"
                value={leakPercentage}
                onChange={(e) => handleSliderChange(setLeakPercentage, Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Típico en comercios que atienden de 9 a 19hs y no pueden responder de noche o feriados.
              </p>
            </div>

          </div>

          {/* Retroactive Impact & Rescue Plan (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* The Historical Loss Card */}
            <div className="bg-gradient-to-br from-red-950/90 to-slate-950 p-6 sm:p-7 rounded-3xl border border-red-500/40 shadow-2xl relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider block">
                    Fuga Histórica Estimada
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Clientes y ventas que se fueron a la competencia en estos {businessYears} años:
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-red-900/40 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>

              {/* Big Red Numbers */}
              <div className="space-y-3 pb-4 border-b border-red-900/50">
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Pérdida acumulada aproximada:</span>
                  <span className="text-3xl sm:text-4xl font-black text-red-400 font-mono tracking-tight block">
                    ~{formatPrice(calculation.totalMoneyLost)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Personas no cerradas:</span>
                    <strong className="text-white">~{calculation.lostClients.toLocaleString('es-AR')} clientes</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Días operando:</span>
                    <strong className="text-white">{calculation.totalDays.toLocaleString('es-AR')} días</strong>
                  </div>
                </div>
              </div>

              <p className="text-xs text-red-300 mt-3 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
                <span>El cliente que pregunta por WhatsApp espera respuesta en menos de 3 minutos. Pasado ese tiempo, le escribe al siguiente local de Google.</span>
              </p>
            </div>

            {/* The Rescue Plan OndiGu Card */}
            <div className="bg-gradient-to-br from-emerald-950/80 to-slate-950 p-6 sm:p-7 rounded-3xl border border-emerald-500/40 shadow-2xl">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider block">
                    Plan de Rescate OndiGu // Respuesta en 3 segundos
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Lo que empezás a recuperar todos los meses con tu Bot con IA y Landing Express:
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs font-mono text-slate-300">Recuperación mensual estimada:</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  +{formatPrice(calculation.monthlyRecoveredMoney)}/mes
                </span>
              </div>

              <button
                type="button"
                onClick={handleSendRescueWhatsApp}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 font-black rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-all cursor-pointer"
              >
                <span>Frenar la fuga de clientes hoy mismo</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
