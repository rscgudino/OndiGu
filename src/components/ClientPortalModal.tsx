import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { X, Lock, Mail, Building, CheckCircle2, ArrowRight } from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [demoState, setDemoState] = useState<'idle' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoState('success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#151821] border border-[#282d3d] max-w-md w-full p-6 sm:p-8 relative rounded-lg shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white bg-[#1c202a] border border-[#282d3d] rounded transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <BrandLogo size="md" className="justify-center mb-3" />
          <h3 className="text-xl font-bold text-white">
            Portal de Clientes
          </h3>
          <p className="text-xs text-[#8e8e8e] mt-1">
            Seguimiento de proyectos, métricas y gestión técnica.
          </p>
        </div>

        {demoState === 'success' ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-[#FF4500]/10 border border-[#FF4500]/30 text-[#FF4500] rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              Acceso en preparación
            </h4>
            <p className="text-xs sm:text-sm text-[#b0b0b0] leading-relaxed mb-6">
              Registramos tu cuenta de demostración (<span className="text-white">{email || 'tu correo'}</span>). Te notificaremos ni bien habilitemos el panel de control de proyectos para clientes de OndiGu.
            </p>
            <button
              type="button"
              onClick={() => {
                setDemoState('idle');
                onClose();
              }}
              className="w-full py-3 text-xs font-semibold text-white bg-[#1c202a] hover:bg-[#252936] border border-[#2e3444] rounded transition-colors"
            >
              Entendido
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-[#202430] mb-6">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`flex-1 pb-3 text-xs font-semibold text-center transition-colors border-b-2 ${
                  tab === 'login'
                    ? 'border-[#FF4500] text-white'
                    : 'border-transparent text-[#777777] hover:text-[#c0c0c0]'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`flex-1 pb-3 text-xs font-semibold text-center transition-colors border-b-2 ${
                  tab === 'register'
                    ? 'border-[#FF4500] text-white'
                    : 'border-transparent text-[#777777] hover:text-[#c0c0c0]'
                }`}
              >
                Registrar Negocio
              </button>
            </div>

            {/* Notice about early access / future portal */}
            <div className="p-3 bg-[#1a1d27] border border-[#252a38] rounded mb-5 text-[11px] text-[#a0a0a0] leading-relaxed">
              <span className="text-[#FF8C00] font-semibold">Próximo lanzamiento:</span> Este espacio permitirá a cada cliente visualizar el avance en vivo de las 3 etapas de su proyecto, descargar comprobantes y solicitar soporte prioritario.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Nombre de tu Negocio / Empresa
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#666666] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Ej: Distribuidora Norte"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#1c202a] border border-[#2b3040] focus:border-[#FF4500] focus:outline-none text-white text-xs rounded"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#666666] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@tunegocio.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#1c202a] border border-[#2b3040] focus:border-[#FF4500] focus:outline-none text-white text-xs rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#666666] absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#1c202a] border border-[#2b3040] focus:border-[#FF4500] focus:outline-none text-white text-xs rounded"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] rounded shadow-[0_0_15px_rgba(255,69,0,0.3)] transition-colors mt-2"
              >
                {tab === 'login' ? 'Ingresar al Portal' : 'Solicitar Acceso Anticipado'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
