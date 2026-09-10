import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';
import { X, Mail, User as UserIcon, Phone, LogOut, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, signOut, isConfigured } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setError(null);
      setSuccessMessage(null);
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    const res = await updateProfile({ name, phone });
    setIsSaving(false);

    if (res.error) {
      setError(res.error);
    } else {
      setSuccessMessage('Perfil actualizado correctamente.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
    onClose();
  };

  const initials = (name || user.email)
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'CL';

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
            Mi Cuenta
          </h3>
          <p className="text-xs text-[#9095a2] mt-1">
            Datos de tu perfil y gestión de contacto en OndiGu
          </p>
        </div>

        {/* User Card Summary */}
        <div className="flex items-center gap-3.5 p-3.5 mb-5 bg-[#171922] border border-[#262b3b] rounded-lg">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF8C00] flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-white truncate">
              {user.name || 'Cliente OndiGu'}
            </h4>
            <p className="text-xs text-[#a5abbd] truncate">
              {user.email}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-[10px] text-emerald-400 font-medium bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded">
            <ShieldCheck className="w-3 h-3" />
            <span>Activo</span>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800/60 rounded-lg flex items-start gap-2.5 text-red-300 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Notification */}
        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg flex items-start gap-2.5 text-emerald-200 text-xs leading-relaxed">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form: One field per line */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#d0d0d0] mb-1.5">
              Nombre y apellido
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171922] border border-[#292e3e] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] focus:outline-none text-white text-xs rounded-lg transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#d0d0d0] mb-1.5">
              Correo electrónico <span className="text-[#777777] font-normal">(asociado a la cuenta)</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#14161f] border border-[#232734] text-[#8e95a5] text-xs rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#d0d0d0] mb-1.5">
              Teléfono de contacto / WhatsApp
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#666666] absolute left-3.5 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej: +54 9 11 1234-5678"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#171922] border border-[#292e3e] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] focus:outline-none text-white text-xs rounded-lg transition-colors"
              />
            </div>
          </div>

          {/* Action Button: Save Profile */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-[0_0_15px_rgba(255,69,0,0.3)] transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Guardando cambios...</span>
              </>
            ) : (
              <span>Guardar cambios</span>
            )}
          </button>
        </form>

        {/* Footer: Sign Out & Status */}
        <div className="mt-6 pt-4 border-t border-[#202430] flex items-center justify-between">
          <span className="text-[11px] text-[#717684]">
            {isConfigured ? 'Supabase Auth conectado' : 'Sesión local persistente'}
          </span>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-1.5 text-xs text-[#a5abbd] hover:text-white px-3 py-1.5 rounded-md hover:bg-[#1a1d26] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};
