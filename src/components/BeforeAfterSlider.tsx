import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, XCircle, CheckCircle2, ArrowRight, ArrowLeftRight, MoveHorizontal } from 'lucide-react';
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
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
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
    <section id="comparador-evolucion" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-[#0d1017] border-t border-slate-200 dark:border-[#1e2332] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white dark:bg-[#161a25] border border-slate-200 dark:border-[#272d3e] rounded-full text-xs font-mono text-[#FF4500] dark:text-[#FF8C00] mb-3 shadow-xs">
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>Comparador Interactivo de Transformación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Deslizá y mirá la diferencia real en tu día a día
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-[#9da4b6] leading-relaxed">
            Mové la barra central para comparar el método tradicional manual contra un negocio impulsado con la tecnología de OndiGu.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative select-none overflow-hidden rounded-2xl border-2 border-slate-300 dark:border-[#293043] shadow-xl bg-white dark:bg-[#141722] min-h-[520px] sm:min-h-[460px] cursor-ew-resize"
        >
          {/* LADO DERECHO: CON ONDIGU (Fondo Completo) */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-[#121622] p-6 sm:p-10 flex flex-col justify-between text-white">
            <div className="max-w-md ml-auto text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Con OndiGu (Automatizado & Pro)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Tu negocio vendiendo 24/7 sin estrés
              </h3>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 inline-block text-left">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Respuestas en 5 segundos:</strong> IA entrenada con tus precios y horarios responde de noche y feriados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Web en 0.4s en celulares:</strong> Carga al instante, con catálogo autogestionable y carrito directo a WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Agenda sin superposiciones:</strong> Turnos sincronizados automáticamente con Google Calendar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Líder en Lanús:</strong> Ficha de Google Maps optimizada que te atrae vecinos listos para comprar.</span>
                </li>
              </ul>
            </div>

            <div className="text-right pt-4 border-t border-slate-700/50">
              <span className="text-xs font-mono text-emerald-400">
                ✓ Ahorro promedio: 18 horas semanales de trabajo manual
              </span>
            </div>
          </div>

          {/* LADO IZQUIERDO: EL MÉTODO TRADICIONAL (Recortado por sliderPos) */}
          <div
            style={{ width: `${sliderPos}%` }}
            className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-red-950/30 via-slate-900 to-[#14161f] border-r-2 border-[#FF4500] p-6 sm:p-10 flex flex-col justify-between text-white transition-[width] duration-75 ease-out"
          >
            <div className="w-[300px] sm:w-[420px] max-w-[calc(100vw-80px)]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Método Tradicional (Manual & Agotador)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-4">
                Ventas perdidas por no poder responder a tiempo
              </h3>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Consultas que se enfrían:</strong> El cliente pregunta a las 22hs y compra en otro comercio que sí respondió.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Cuadernos y Excel caótico:</strong> Horas pasando turnos y precios a mano mientras descuidás el mostrador.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Web vieja o inexistente:</strong> En celular se ve diminuta o no abre, generando desconfianza en el cliente.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Invisibilidad en el mapa:</strong> Nadie en tu barrio te encuentra cuando busca tus productos.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-red-900/30">
              <span className="text-xs font-mono text-red-400">
                ✕ Pérdida estimada: hasta 35% de potenciales clientes diarios
              </span>
            </div>
          </div>

          {/* DIVIDER HANDLE BAR */}
          <div
            style={{ left: `${sliderPos}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            className="absolute top-0 bottom-0 -ml-5 w-10 flex items-center justify-center cursor-ew-resize z-20"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF4500] text-white shadow-[0_0_20px_rgba(255,69,0,0.8)] border-2 border-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Action button bottom */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onQuoteClick}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <span>Quiero modernizar mi negocio con OndiGu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
