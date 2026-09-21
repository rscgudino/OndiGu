import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Radar, MapPin, Search, Users, Zap, TrendingUp, 
  ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Compass 
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface ZoneData {
  id: string;
  name: string;
  searchVolume: number;
  unautomatedRate: number;
  totalCompetitors: number;
  opportunityIndex: number;
  highlightStreet: string;
}

const ZONES: ZoneData[] = [
  { id: 'lanus-oeste', name: 'Lanús Oeste', searchVolume: 4200, unautomatedRate: 84, totalCompetitors: 62, opportunityIndex: 91, highlightStreet: 'Av. Hipólito Yrigoyen / Del Valle Iberlucea' },
  { id: 'lanus-este', name: 'Lanús Este', searchVolume: 3600, unautomatedRate: 88, totalCompetitors: 48, opportunityIndex: 89, highlightStreet: 'Av. 9 de Julio / Eva Perón' },
  { id: 'banfield', name: 'Banfield', searchVolume: 3800, unautomatedRate: 81, totalCompetitors: 54, opportunityIndex: 86, highlightStreet: 'Maipú / Alsina / French' },
  { id: 'avellaneda', name: 'Avellaneda', searchVolume: 5100, unautomatedRate: 79, totalCompetitors: 76, opportunityIndex: 88, highlightStreet: 'Av. Mitre / Güemes / Flores' },
  { id: 'valentin-alsina', name: 'Valentín Alsina', searchVolume: 2400, unautomatedRate: 92, totalCompetitors: 32, opportunityIndex: 94, highlightStreet: 'Av. Pte. Perón / Senador Pallares' },
  { id: 'escalada', name: 'Remedios de Escalada', searchVolume: 2900, unautomatedRate: 86, totalCompetitors: 38, opportunityIndex: 87, highlightStreet: 'Av. Hipólito Yrigoyen / Beltrán' },
  { id: 'gerli', name: 'Gerli', searchVolume: 2100, unautomatedRate: 90, totalCompetitors: 28, opportunityIndex: 92, highlightStreet: 'Bustamante / Donovan' },
  { id: 'lomas', name: 'Lomas de Zamora', searchVolume: 5800, unautomatedRate: 78, totalCompetitors: 85, opportunityIndex: 85, highlightStreet: 'Laprida / Boedo / Colombres' },
];

const RUBROS = [
  { id: 'gastro', name: 'Gastronomía & Comida', factor: 1.2 },
  { id: 'barber', name: 'Barbería & Belleza', factor: 1.0 },
  { id: 'taller', name: 'Mecánica & Repuestos', factor: 0.9 },
  { id: 'indumentaria', name: 'Ropa & Calzado', factor: 1.1 },
  { id: 'profesional', name: 'Servicios Profesionales', factor: 0.85 },
];

interface NeighborhoodOpportunityRadarProps {
  onSelectStrategy?: (note: string) => void;
}

export const NeighborhoodOpportunityRadar: React.FC<NeighborhoodOpportunityRadarProps> = ({ onSelectStrategy }) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('lanus-oeste');
  const [selectedRubroId, setSelectedRubroId] = useState<string>('gastro');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const activeZone = ZONES.find((z) => z.id === selectedZoneId) || ZONES[0];
  const activeRubro = RUBROS.find((r) => r.id === selectedRubroId) || RUBROS[0];

  const calculatedSearches = Math.round(activeZone.searchVolume * activeRubro.factor);
  const calculatedCompetitors = Math.round(activeZone.totalCompetitors * activeRubro.factor);

  const handleSelectZone = (zoneId: string) => {
    soundFx.playClick();
    setSelectedZoneId(zoneId);
    triggerScanAnimation();
  };

  const handleSelectRubro = (rubroId: string) => {
    soundFx.playClick();
    setSelectedRubroId(rubroId);
    triggerScanAnimation();
  };

  const triggerScanAnimation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      soundFx.playTick();
    }, 450);
  };

  const handleActionWhatsApp = () => {
    soundFx.playSuccess();
    const msg = `*ESTRATEGIA RADAR LOCAL ONDIGU*
*Zona:* ${activeZone.name} (${activeZone.highlightStreet})
*Rubro:* ${activeRubro.name}
*Oportunidad de mercado:* ${activeZone.opportunityIndex}%
*Búsquedas mensuales estimadas:* ~${calculatedSearches.toLocaleString('es-AR')} en Google

Hola Pedro, quiero dominar las búsquedas locales y la atención por WhatsApp en ${activeZone.name}. ¿Cómo arrancamos?`;

    if (onSelectStrategy) {
      onSelectStrategy(`Estrategia Radar para ${activeZone.name} - ${activeRubro.name}`);
    }

    const url = `https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="radar-barrial" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background grid lines for military/radar feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-xs font-mono text-emerald-400 mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>Exclusivo OndiGu // Inteligencia Comercial Local</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            El Radar de Oportunidad <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">de tu Barrio</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Descubrí cuántos clientes buscan tu rubro en Lanús y GBA Sur, y cuántos comercios vecinos pierden ventas por no responder 24hs.
          </p>
        </div>

        {/* Interactive Controls & Radar Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls: Zones and Rubros (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
            
            {/* Zone Picker */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4500]" />
                  <span>1. Seleccioná tu localidad / zona:</span>
                </label>
                <span className="text-[11px] font-mono text-emerald-400">GBA Sur</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ZONES.map((zone) => {
                  const isSelected = zone.id === selectedZoneId;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => handleSelectZone(zone.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-xs'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="block truncate">{zone.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rubro Picker */}
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-slate-300 mb-2.5">
                2. Rubro de tu comercio:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {RUBROS.map((rubro) => {
                  const isSelected = rubro.id === selectedRubroId;
                  return (
                    <button
                      key={rubro.id}
                      type="button"
                      onClick={() => handleSelectRubro(rubro.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-xs'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{rubro.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Street reference badge */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>Corredor comercial clave analizado: <strong className="text-white">{activeZone.highlightStreet}</strong></span>
            </div>

            {/* Main Action Button */}
            <button
              type="button"
              onClick={handleActionWhatsApp}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 font-black rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-all cursor-pointer"
            >
              <span>Conquistar las búsquedas de {activeZone.name}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          {/* Visual Sonar Radar & Analytics Card (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* The Radar Circle Graphic */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-emerald-500/30 bg-slate-950/90 shadow-2xl flex items-center justify-center overflow-hidden mb-6">
              
              {/* Concentric rings */}
              <div className="absolute inset-4 rounded-full border border-emerald-500/20" />
              <div className="absolute inset-12 rounded-full border border-emerald-500/20" />
              <div className="absolute inset-20 rounded-full border border-emerald-500/25" />
              <div className="absolute inset-28 rounded-full border border-emerald-500/30" />

              {/* Crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-500/20" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-500/20" />

              {/* Sonar sweeping beam */}
              <div className="absolute inset-0 rounded-full origin-center animate-spin [animation-duration:3.5s] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,#10b98130_360deg)] pointer-events-none" />

              {/* Blips / Competitors dots */}
              <div className="absolute top-16 left-20 w-2 h-2 rounded-full bg-red-400 animate-pulse" title="Competidor sin atención 24hs" />
              <div className="absolute bottom-20 left-24 w-2 h-2 rounded-full bg-red-400 animate-pulse [animation-delay:0.5s]" title="Competidor sin web" />
              <div className="absolute top-24 right-20 w-2 h-2 rounded-full bg-red-400 animate-pulse [animation-delay:1s]" title="Competidor lento" />
              <div className="absolute bottom-14 right-24 w-2 h-2 rounded-full bg-red-400 animate-pulse [animation-delay:1.5s]" />

              {/* Center Target: Your Business with OndiGu */}
              <div className="relative z-10 p-3 bg-emerald-950 border border-emerald-400 rounded-2xl text-center shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mx-auto block mb-1" />
                <span className="text-[10px] font-mono text-emerald-300 font-bold block uppercase">
                  Tu Negocio Líder
                </span>
                <span className="text-[9px] font-mono text-slate-400 block">
                  100% Automatizado
                </span>
              </div>
            </div>

            {/* Radar Result Cards */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Búsquedas Google/mes
                </span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono block">
                  ~{calculatedSearches.toLocaleString('es-AR')}
                </span>
                <span className="text-[10px] text-slate-400">Vecinos buscando en {activeZone.name}</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Sin respuesta 24hs
                </span>
                <span className="text-xl sm:text-2xl font-black text-red-400 font-mono block">
                  {activeZone.unautomatedRate}%
                </span>
                <span className="text-[10px] text-slate-400">De tus competidores no atienden fuera de hora</span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-3.5 text-center">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">
                  Oportunidad OndiGu
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block">
                  {activeZone.opportunityIndex}%
                </span>
                <span className="text-[10px] text-emerald-300 font-semibold">Ventaja Muy Alta</span>
              </div>

            </div>

            <p className="text-[11px] font-mono text-slate-400 mt-3 text-center">
              💡 Diagnóstico: Si un vecino busca "{activeRubro.name} en {activeZone.name}" un sábado a las 22hs, el 84% de los locales no le responde. Con OndiGu cerrás la venta en 3 segundos.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
