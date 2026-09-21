import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Zap, Server, MapPin, Sparkles } from 'lucide-react';

export const LiveRadarMetrics: React.FC = () => {
  const [latency, setLatency] = useState(38);
  const [activeUsers, setActiveUsers] = useState(14);

  // Micro jitter to simulate live monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(34 + Math.random() * 9));
      setActiveUsers((prev) => Math.min(28, Math.max(9, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-slate-900 text-slate-100 border-y border-slate-800 py-3.5 px-4 sm:px-6 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Left: Status live */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 rounded-full text-emerald-400 font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>RADAR ONDIGU // SISTEMAS EN LÍNEA</span>
          </div>
          <span className="hidden md:inline-block text-slate-400">
            Monitoreo en tiempo real de infraestructura web & bots
          </span>
        </div>

        {/* Right: Metrics pills */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span className="text-slate-400">Velocidad de carga:</span>
            <span className="font-bold text-white">0.{latency}s</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Disponibilidad:</span>
            <span className="font-bold text-white">99.98%</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Comercios activos hoy:</span>
            <span className="font-bold text-white">{activeUsers} online</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
            <span className="text-slate-400">Sede técnica:</span>
            <span className="font-bold text-white">Lanús, Bs. As.</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-950/40 border border-[#FF4500]/40 rounded text-[#FF8C00]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF4500]" />
            <span className="text-[11px] font-bold">Entrega 24-72hs Garantizada</span>
          </div>
        </div>
      </div>
    </section>
  );
};
