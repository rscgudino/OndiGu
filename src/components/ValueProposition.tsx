import React from 'react';
import { VALUE_DIFFERENTIATORS } from '../data/content';
import { Clock, Bot, ShieldCheck, Layers } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const icons = [Clock, Bot, ShieldCheck, Layers];

  return (
    <section id="propuesta" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1218] border-t border-b border-[#1e222e]">
      <div className="max-w-7xl mx-auto">
        {/* Title area: no uppercase eyebrows, clean strong statement */}
        <div className="max-w-3xl mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Todo en uno. Simple. Personalizado. Sin vueltas.
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-[#a0a0a0] leading-relaxed">
            Hacemos tecnología para que vendas más y trabajes menos tiempo en tareas manuales. Sin vueltas técnicas ni promesas que quedan en el aire.
          </p>
        </div>

        {/* 4 Differentiators Grid: clean architectural styling, subtle border contrasts, no generic cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {VALUE_DIFFERENTIATORS.map((diff, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={diff.title}
                className="relative bg-[#151821] p-5 sm:p-7 lg:p-8 border border-[#232734] hover:border-[#323748] transition-colors flex flex-col justify-between rounded-xl overflow-hidden"
              >
                {/* Accent indicator line on the top edge */}
                <div 
                  className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-[#FF4500] to-[#FF8C00]"
                  aria-hidden="true" 
                />

                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#FF8C00] bg-[#FF8C00]/10 px-2.5 py-1 rounded-md">
                      {diff.highlight}
                    </span>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#1d202b] border border-[#2b3040] text-[#e0e0e0] rounded-lg">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {diff.title}
                  </h3>

                  <p className="text-xs sm:text-sm lg:text-base text-[#9e9e9e] leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
