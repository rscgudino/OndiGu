import React from 'react';
import { METHODOLOGY_STEPS } from '../data/content';
import { Layout, Users, CheckCircle2 } from 'lucide-react';

export const Methodology: React.FC = () => {
  const stepIcons = [Layout, Users, CheckCircle2];

  return (
    <section id="metodologia" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-[#0f1218] border-t border-slate-200 dark:border-[#1e222e] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Metodología en 3 etapas simples
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-[#999999] leading-relaxed">
            Sin tecnicismos oscuros ni proyectos que nunca terminan. Trabajamos con un esquema por pasos donde siempre sabés qué recibís y cuándo.
          </p>
        </div>

        {/* 3 Steps horizontal / vertical flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {METHODOLOGY_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <div
                key={step.number}
                className="relative bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#232734] p-8 flex flex-col justify-between rounded-xl shadow-xs dark:shadow-none"
              >
                <div>
                  {/* Step header with sequence number and stage label */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-[#202430]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl font-bold text-[#FF4500]">
                        {step.number}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#a0a0a0]">
                        {step.phase}
                      </span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-[#1d202c] text-[#FF8C00] rounded">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.name}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-[#9e9e9e] leading-relaxed mb-8">
                    {step.summary}
                  </p>
                </div>

                {/* What the client gets */}
                <div className="pt-6 border-t border-slate-200 dark:border-[#202430] space-y-3">
                  <div>
                    <span className="block text-[11px] font-semibold text-[#FF4500] dark:text-[#FF8C00] uppercase tracking-wide mb-1">
                      Lo que recibís
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-[#d4d4d4] leading-normal font-normal">
                      {step.clientDeliverable}
                    </p>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 dark:text-[#707070] font-mono">
                    Tiempo estimado: <span className="text-slate-700 dark:text-[#a0a0a0] font-medium">{step.durationEstimate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
