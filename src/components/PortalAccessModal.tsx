import React, { useState, useRef } from 'react';
import { BrandLogo } from './BrandLogo';
import { soundFx } from '../utils/soundEffects';
import {
  X,
  Bot,
  Snowflake,
  ArrowRight,
  ExternalLink,
  Lock,
  Sparkles,
  AlertCircle,
  Terminal,
} from 'lucide-react';

interface PortalAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWebPortal: () => void;
}

export const PortalAccessModal: React.FC<PortalAccessModalProps> = ({
  isOpen,
  onClose,
  onSelectWebPortal,
}) => {
  const [branchInput, setBranchInput] = useState('');
  const [scadaError, setScadaError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scadaLinkRef = useRef<HTMLAnchorElement>(null);

  if (!isOpen) return null;

  const resolveScadaUrl = (rawValue: string): string | null => {
    const trimmed = rawValue.trim();
    if (!trimmed) return null;

    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }

    if (trimmed.includes('.')) {
      return `https://${trimmed.replace(/^\/+/, '')}`;
    }

    const cleanCode = trimmed
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    if (!cleanCode) return null;
    return `https://${cleanCode}.gudix.com.ar`;
  };

  const resolvedUrl = resolveScadaUrl(branchInput);

  const handleScadaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedUrl) {
      setScadaError('Ingresá tu código de sucursal (ej: centro) o tu URL de túnel seguro.');
      inputRef.current?.focus();
      return;
    }
    setScadaError(null);
    soundFx.playSuccess();
    scadaLinkRef.current?.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-access-title"
    >
      <div className="bg-[#11131a] border border-[#242938] max-w-xl w-full p-6 sm:p-8 relative rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Top neon accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-cyan-400" />

        {/* Ambient glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF4500]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white bg-[#1a1d26] border border-[#282e3e] rounded-lg transition-colors cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6 relative z-10">
          <BrandLogo size="md" className="justify-center mb-3" />
          <h3 id="portal-access-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Portal de Accesos OndiGu
          </h3>
          <p className="text-xs sm:text-sm text-[#9095a2] mt-1">
            Seleccioná la plataforma a la que querés ingresar
          </p>
        </div>

        <div className="space-y-4 relative z-10">
          {/* Option 1: Portal Clientes Web & Bots */}
          <div className="p-5 bg-[#161924] border border-[#282e3f] hover:border-[#FF4500]/60 rounded-xl transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#FF4500]/15 border border-[#FF4500]/35 flex items-center justify-center text-[#FF8C00] shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#FF8C00] font-semibold mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Clientes OndiGu</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    Portal Clientes Web &amp; Bots
                  </h4>
                  <p className="text-xs text-[#9ca3b5] mt-1 leading-relaxed">
                    Acceso a gestión de proyectos, turnos de consultoría y asistentes IA de OndiGu.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#232838] flex justify-end">
              <button
                type="button"
                id="portal-web-bots-btn"
                onClick={() => {
                  soundFx.playClick();
                  onSelectWebPortal();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs sm:text-sm font-bold rounded-xl shadow-[0_0_18px_rgba(255,69,0,0.3)] transition-all cursor-pointer"
              >
                <span>Ingresar al Portal Web &amp; Bots</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Option 2: Tablero Frigorífico (SCADA Gudix ColdControl) */}
          <form
            onSubmit={handleScadaSubmit}
            className="p-5 bg-[#131822] border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl transition-all"
          >
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/35 flex items-center justify-center text-cyan-400 shrink-0">
                <Snowflake className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
                  <Terminal className="w-3 h-3" />
                  <span>Telemetría Industrial</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  Tablero Frigorífico (SCADA Gudix ColdControl)
                </h4>
                <p className="text-xs text-[#9ca3b5] mt-1 leading-relaxed">
                  Ingresá tu código de sucursal o subdominio para abrir tu tablero local e iniciar sesión con tu PIN de seguridad.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <label
                htmlFor="scada-branch-input"
                className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold"
              >
                Código de sucursal, subdominio o URL de túnel seguro
              </label>

              <div className="relative">
                <Lock className="w-4 h-4 text-cyan-400/70 absolute left-3.5 top-3" />
                <input
                  ref={inputRef}
                  id="scada-branch-input"
                  type="text"
                  value={branchInput}
                  onChange={(e) => {
                    setBranchInput(e.target.value);
                    if (scadaError) setScadaError(null);
                  }}
                  placeholder="Ej: centro o https://tu-tunel.gudix.com.ar"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#0c0f16] border border-[#283144] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-white text-xs sm:text-sm rounded-xl transition-colors placeholder:text-[#667085]"
                />
              </div>

              {resolvedUrl && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-950/30 border border-cyan-500/25 rounded-lg text-[11px] font-mono text-cyan-300 break-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                  <span>Destino: {resolvedUrl}</span>
                </div>
              )}

              {scadaError && (
                <div className="flex items-center gap-2 text-xs text-red-400 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{scadaError}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#202938] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-[#7c8599] font-mono">
                Se abre en pestaña nueva con acceso por PIN
              </span>

              {/* Hidden anchor used when submitting form via Enter */}
              <a
                ref={scadaLinkRef}
                href={resolvedUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
              >
                Abrir SCADA
              </a>

              {resolvedUrl ? (
                <a
                  id="scada-connect-live-btn"
                  href={resolvedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playSuccess()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-slate-950 text-xs sm:text-sm font-extrabold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                >
                  <span>Conectar al Tablero en Vivo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button
                  id="scada-connect-live-btn"
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 hover:from-cyan-500 hover:to-emerald-500 text-slate-950 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer"
                >
                  <span>Conectar al Tablero en Vivo</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
