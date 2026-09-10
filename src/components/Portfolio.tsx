import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/content';
import { PortfolioProject } from '../types';
import { ExternalLink, Check, X } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <section id="portfolio" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0e12] border-t border-[#1e222e]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 pb-5 border-b border-[#202430] gap-3">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Casos reales y resultados medibles
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg text-[#999999] leading-relaxed">
              Soluciones construidas para resolver necesidades comerciales concretas, no para ganar premios de diseño decorativo.
            </p>
          </div>
          <div className="text-xs sm:text-sm text-[#777777] font-mono shrink-0">
            4 Casos seleccionados
          </div>
        </div>

        {/* 4 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-[#151821] border border-[#232734] hover:border-[#343a4e] transition-all flex flex-col justify-between group rounded-xl overflow-hidden"
            >
              {/* Visual Placeholder Graphic with Technical UI Aesthetics */}
              <div className="relative w-full h-48 sm:h-60 bg-[#1a1d27] overflow-hidden border-b border-[#232734] flex flex-col justify-between p-4 sm:p-6">
                {/* Visual mockup styling */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2e3344]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2e3344]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2e3344]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#8b91a0] tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Conceptual wireframe vector preview */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-45 transition-opacity pointer-events-none">
                  <svg viewBox="0 0 320 160" fill="none" className="w-4/5 h-auto">
                    <rect x="10" y="10" width="300" height="140" rx="4" stroke="#4a5268" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="25" y="25" width="90" height="18" fill="#2d3345" />
                    <rect x="25" y="55" width="130" height="10" fill="#262b3a" />
                    <rect x="25" y="72" width="100" height="10" fill="#262b3a" />
                    <line x1="25" y1="110" x2="160" y2="110" stroke="#FF4500" strokeWidth="2" />
                    <circle cx="230" cy="80" r="36" stroke="#FF8C00" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 215 80 Q 230 65, 245 80" stroke="#FFFFFF" strokeWidth="1.5" />
                  </svg>
                </div>

                <div className="z-10 mt-auto">
                  <span className="inline-block px-2.5 py-1 text-xs font-mono font-medium text-white bg-[#0c0e12]/90 border border-[#2c3142] rounded-md">
                    {project.imagePlaceholder.subtitle}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-5 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[#FF8C00] transition-colors">
                    {project.title}
                  </h3>

                  {/* Requested exact line of result */}
                  <div className="mb-4 py-2 px-3 sm:py-2.5 sm:px-3.5 bg-[#1c202a] border-l-2 border-[#FF4500] rounded-r">
                    <span className="block text-[10px] sm:text-[11px] text-[#FF8C00] font-semibold uppercase tracking-wider mb-0.5">
                      Resultado
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-white leading-normal">
                      {project.result}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#949494] leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#202430] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-mono text-[#a0a0a0] bg-[#1c202a] px-2 py-0.5 border border-[#282d3d] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-[#e0e0e0] hover:text-white font-medium py-2 px-3 sm:py-1 sm:px-2.5 bg-[#1c202a] hover:bg-[#252936] border border-[#2c3142] rounded-lg sm:rounded transition-colors cursor-pointer"
                  >
                    <span>Detalle</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FF4500]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Case Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#151821] border border-[#282d3d] max-w-xl w-full p-6 sm:p-8 relative rounded-lg shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white bg-[#1d202c] border border-[#2a2f3f] rounded"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono uppercase text-[#FF8C00] tracking-wider block mb-1">
              {selectedProject.category}
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedProject.title}
            </h3>

            <div className="p-4 bg-[#1c202a] border-l-2 border-[#FF4500] mb-5">
              <span className="text-xs font-semibold text-[#FF8C00] uppercase block mb-1">Impacto comercial</span>
              <p className="text-sm font-semibold text-white">{selectedProject.result}</p>
            </div>

            <p className="text-sm text-[#a0a0a0] leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="space-y-3 mb-6 pt-4 border-t border-[#202430]">
              <div className="flex items-start gap-2.5 text-xs text-[#d0d0d0]">
                <Check className="w-4 h-4 text-[#FF4500] shrink-0 mt-0.5" />
                <span>Desarrollado bajo la metodología propia de 3 etapas de OndiGu.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#d0d0d0]">
                <Check className="w-4 h-4 text-[#FF4500] shrink-0 mt-0.5" />
                <span>Hosting en servidores dedicados de alta velocidad con dominio y SSL.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#d0d0d0]">
                <Check className="w-4 h-4 text-[#FF4500] shrink-0 mt-0.5" />
                <span>Entrega con capacitación directa al personal para su actualización continua.</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1d202c] hover:bg-[#252937] border border-[#2f3547] rounded transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
