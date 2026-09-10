import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';
import { X, Mail, Lock, User as UserIcon, Phone, AlertCircle, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = 'login',
}) => {
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const [view, setView] = useState<'login' | 'register' | 'forgot'>(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initialView when modal re-opens
  React.useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setError(null);
      setSuccessMessage(null);
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const resetForm = () => {
    setError(null);
    setSuccessMessage(null);
  };

  // 1. Submit Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();
    setIsSubmitting(true);

    const res = await signIn({ email, password });
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      onClose();
    }
  };

  // 2. Submit Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();
    setIsSubmitting(true);

    const res = await signUp({ email, password, name, phone });
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else if (res.requiresEmailConfirmation) {
      setSuccessMessage('Te enviamos un correo de confirmación. Por favor revisá tu bandeja de entrada o spam para activar tu cuenta.');
    } else {
      onClose();
    }
  };

  // 3. Submit Forgot Password
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();
    setIsSubmitting(true);

    const res = await resetPassword(email);
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      setSuccessMessage(`Si el correo ${email} coincide con una cuenta, recibirás un enlace para restablecer tu contraseña en los próximos minutos.`);
    }
  };

  // 4. Google Login
  const handleGoogleLogin = async () => {
    resetForm();
    setIsSubmitting(true);
    const res = await signInWithGoogle();
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#111111] border border-[#242938] max-w-md w-full p-6 sm:p-8 relative rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white bg-[#1a1d26] border border-[#282e3e] rounded-lg transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <BrandLogo size="md" className="justify-center mb-3" />
          <h3 className="text-xl font-bold text-white tracking-tight">
            {view === 'login' && 'Iniciar Sesión'}
            {view === 'register' && 'Crear Cuenta'}
            {view === 'forgot' && 'Recuperar Contraseña'}
          </h3>
          <p className="text-xs text-[#9095a2] mt-1">
            {view === 'login' && 'Ingresá a tu espacio de clientes y proyectos en OndiGu'}
            {view === 'register' && 'Registrate para gestionar tus desarrollos y presupuestos'}
            {view === 'forgot' && 'Te enviaremos las instrucciones de restablecimiento a tu email'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800/60 rounded-lg flex items-start gap-2.5 text-red-300 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg flex items-start gap-2.5 text-emerald-200 text-xs leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* FORGOT PASSWORD VIEW */}
        {view === 'forgot' && (
          <div>
            {!successMessage ? (
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#d0d0d0] mb-1.5">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@tuempresa.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#171922] border border-[#292e3e] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] focus:outline-none text-white text-xs rounded-lg transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-[0_0_15px_rgba(255,69,0,0.3)] transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Enviando enlace...</span>
                    </>
                  ) : (
                    <span>Enviar enlace de recuperación</span>
                  )}
                </button>
              </form>
            ) : null}

            <div className="mt-5 pt-4 border-t border-[#202430] text-center">
              <button
                type="button"
                onClick={() => {
                  setView('login');
                  resetForm();
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#9095a2] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al inicio de sesión</span>
              </button>
            </div>
          </div>
        )}

        {/* LOGIN / REGISTER VIEWS */}
        {view !== 'forgot' && (
          <div>
            {/* Google OAuth Option */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-[#171922] hover:bg-[#202430] border border-[#2b3042] text-xs font-medium text-[#e0e0e0] rounded-lg transition-colors flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>{view === 'login' ? 'Continuar con Google' : 'Registrarse con Google'}</span>
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#222736]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-semibold tracking-wider text-[#6b7280]">
                <span className="bg-[#111111] px-3">o con correo</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="space-y-3.5">
              {view === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-[#d0d0d0] mb-1">
                      Nombre y apellido
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: Marcelo Rossi"
                        className="w-full pl-10 pr-3.5 py-2 bg-[#171922] border border-[#292e3e] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] focus:outline-none text-white text-xs rounded-lg transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#d0d0d0] mb-1">
                      Teléfono / WhatsApp <span className="text-[#777777] font-normal">(opcional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej: +54 9 11 1234-5678"
                        className="w-full pl-10 pr-3.5 py-2 bg-[#171922] border border-[#292e3e] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] focus:outline-none text-white text-xs rounded-lg transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-[#d0d0d0] mb-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@tunegocio.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#171922] border border-[#292e3e] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] focus:outline-none text-white text-xs rounded-lg transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-[#d0d0d0]">
                    Contraseña
                  </label>
                  {view === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setView('forgot');
                        resetForm();
                      }}
                      className="text-[11px] text-[#FF8C00] hover:text-[#ff9f2c] transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#171922] border border-[#292e3e] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] focus:outline-none text-white text-xs rounded-lg transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-[0_0_15px_rgba(255,69,0,0.3)] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <span>{view === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                )}
              </button>
            </form>

            {/* Toggle Login / Register */}
            <div className="mt-5 pt-4 border-t border-[#202430] text-center">
              {view === 'login' ? (
                <p className="text-xs text-[#9095a2]">
                  ¿No tenés una cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setView('register');
                      resetForm();
                    }}
                    className="text-[#FF8C00] hover:text-[#ff9f2c] font-semibold transition-colors"
                  >
                    Registrate acá
                  </button>
                </p>
              ) : (
                <p className="text-xs text-[#9095a2]">
                  ¿Ya tenés una cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setView('login');
                      resetForm();
                    }}
                    className="text-[#FF8C00] hover:text-[#ff9f2c] font-semibold transition-colors"
                  >
                    Ingresá acá
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
