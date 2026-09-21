import React, { useState, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeftRight, 
  MoveHorizontal, 
  AlertTriangle, 
  Zap, 
  Clock, 
  WifiOff, 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  SmartphoneNfc
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface BeforeAfterSliderProps {
  onQuoteClick?: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onQuoteClick }) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(8, Math.min(92, (x / rect.width) * 100));
    setSliderPos(percentage);
    soundFx.playTick();
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
    soundFx.playClick();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <section id="comparador-evolucion" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-[#07090e] border-t border-slate-800 dark:border-[#191e2b] transition-colors duration-300 relative overflow-hidden">
      {/* Subtle background ambient cyber glows */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FF4500]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-800/90 border border-slate-700 rounded-full text-xs font-mono text-[#FF8C00] mb-3 shadow-[0_0_15px_rgba(255,140,0,0.2)]">
            <Zap className="w-3.5 h-3.5 text-[#FF4500] animate-pulse" />
            <span>SALTO CUÁNTICO // DE LO OBSOLETO AL FUTURO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Deslizá y mirá la diferencia real en tu día a día
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Mové el láser holográfico central para contrastar el método manual obsoleto contra la infraestructura hiper-moderna de OndiGu:
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative select-none overflow-hidden rounded-3xl border-2 border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-slate-950 min-h-[580px] sm:min-h-[500px] cursor-ew-resize"
        >
          {/* =========================================================================
              LADO DERECHO: EL FUTURO CON ONDIGU (CYBERNETIC, NEON, ULTRA-VELOZ)
              ========================================================================= */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1626] via-[#09101d] to-[#040810] p-6 sm:p-10 flex flex-col justify-between text-white overflow-hidden">
            {/* Cyber Grid Pattern Background */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(0, 255, 200, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 200, 0.1) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }}
            />

            {/* Glowing Accent Orbs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FF4500]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Content Top Right */}
            <div className="relative z-10 max-w-lg ml-auto text-right">
              {/* Badge Futurista */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(16,185,129,0.35)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>ONDIGU // ERA DIGITAL 2026</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                Ventas 24/7 y automatización <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-[#FF8C00]">en piloto automático</span>
              </h3>

              {/* Holographic Metric Cards */}
              <div className="grid grid-cols-2 gap-2.5 mb-5 text-left">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                    <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span>VELOCIDAD</span>
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">0.24s</div>
                  <div className="text-[10px] text-slate-400 font-mono">Carga ultrarrápida</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-xs">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 font-bold">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    <span>BOT IA LANÚS</span>
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">24/7/365</div>
                  <div className="text-[10px] text-slate-400 font-mono">Cierra de madrugada</div>
                </div>
              </div>

              {/* Feature Points */}
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200 inline-block text-left">
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Respuestas en 3 segundos:</strong> El cliente consulta a la medianoche y recibe precios, fotos y reservas sin demora.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <SmartphoneNfc className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Web en tu celular al instante:</strong> Experiencia fluida con catálogo visual, botón de llamada directa y checkout fácil.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Google Maps Líder:</strong> Tu local aparece primero cuando vecinos de Lanús buscan tus productos o servicios.</span>
                </li>
              </ul>
            </div>

            {/* Bottom Status Bar */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono">
              <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>INFRAESTRUCTURA CLOUD ONDIGU // 99.98% UPTIME</span>
              </span>
              <span className="text-cyan-400 hidden sm:inline">
                Ahorro: 20hs/semana de tipeo manual
              </span>
            </div>
          </div>

          {/* =========================================================================
              LADO IZQUIERDO: EL MÉTODO TRADICIONAL (OBSOLETO, CRT GLITCH, CAOS)
              ========================================================================= */}
          <div
            style={{ width: `${sliderPos}%` }}
            className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-[#1b0d0d] via-[#140b0b] to-[#0a0505] p-6 sm:p-10 flex flex-col justify-between text-white transition-[width] duration-75 ease-out shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
          >
            {/* CRT TV Scanline & Noise Simulation */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* Old Glitch Amber Ambient */}
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-red-700/20 rounded-full blur-3xl pointer-events-none" />

            {/* Content Top Left */}
            <div className="relative z-10 w-[310px] sm:w-[420px] max-w-[calc(100vw-80px)]">
              {/* Retro Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-red-950/80 border border-red-500/60 text-red-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>MÉTODO MANUAL // OBSOLETO (1998)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-red-100 mb-4 tracking-tight leading-tight">
                Ventas perdidas por no responder a tiempo
              </h3>

              {/* Retro Error Windows */}
              <div className="space-y-2 mb-5 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/60 text-red-200 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Esperando respuesta: <strong>hace 8 horas 40 min</strong></span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-amber-800/40 text-amber-300/90 flex items-center gap-2">
                  <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Planilla_final_v3_copia(2).xlsx - DAÑADA</span>
                </div>
              </div>

              {/* Obsolete Pain Points */}
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-red-950/80 text-red-400 border border-red-600/40 shrink-0 mt-0.5">
                    <XCircle className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>El cliente se va a la competencia:</strong> Preguntó a las 22:00hs, nadie atendió y compró en otro local.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-red-950/80 text-red-400 border border-red-600/40 shrink-0 mt-0.5">
                    <XCircle className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Cuadernos y turnos superpuestos:</strong> Horas anotando precios a mano mientras el mostrador se llena de quejas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-red-950/80 text-red-400 border border-red-600/40 shrink-0 mt-0.5">
                    <XCircle className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Web rota o invisible:</strong> Tarda 12 segundos en abrir, no entra en la pantalla del celular y nadie confía.</span>
                </li>
              </ul>
            </div>

            {/* Bottom Status Bar */}
            <div className="relative z-10 pt-4 border-t border-red-900/40 font-mono text-xs text-red-400 flex items-center gap-1.5">
              <span>✕ Pérdida estimada: hasta 35% de potenciales clientes diarios</span>
            </div>
          </div>

          {/* =========================================================================
              LASER BEAM SLIDER DIVIDER (NEON VERTICAL GLOW & CYBER-DIAL)
              ========================================================================= */}
          <div
            style={{ left: `${sliderPos}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            className="absolute top-0 bottom-0 -ml-6 w-12 flex items-center justify-center cursor-ew-resize z-30"
          >
            {/* Vertical Laser Beam Light */}
            <div className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#FF4500] via-white to-[#00f7ff] shadow-[0_0_15px_#FF4500,0_0_25px_#00f7ff]" />

            {/* Electric Spark Ring Handle */}
            <div className="relative w-12 h-12 rounded-full bg-slate-900 border-2 border-white shadow-[0_0_25px_rgba(255,69,0,0.9),0_0_35px_rgba(0,247,255,0.7)] flex items-center justify-center transition-transform hover:scale-115 active:scale-95 group">
              <MoveHorizontal className="w-5 h-5 text-white animate-pulse" />
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-30" />
            </div>

            {/* Floating indicator tags */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/90 border border-white/20 text-[9px] font-mono text-white whitespace-nowrap shadow-md pointer-events-none">
              ◀ OBSOLETO | FUTURO ▶
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onQuoteClick}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FFA500] hover:brightness-110 rounded-2xl shadow-[0_0_30px_rgba(255,69,0,0.4)] transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-5 h-5 fill-white" />
            <span>Quiero dar el salto al futuro con OndiGu</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
