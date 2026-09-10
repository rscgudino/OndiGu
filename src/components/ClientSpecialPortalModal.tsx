import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from './BrandLogo';
import { TurnoLlamada, PaymentGatewayConfig } from '../types';
import { listarTurnosLlamadas, obtenerConfiguracionPagos, isUserAdmin } from '../lib/agendaService';
import { 
  X, 
  User, 
  Calendar, 
  Sparkles, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  LogOut,
  Zap,
  Bot,
  Globe,
  DollarSign
} from 'lucide-react';

interface ClientSpecialPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCallScheduler: (motivo?: string) => void;
  onOpenAdminPanel?: () => void;
}

export const ClientSpecialPortalModal: React.FC<ClientSpecialPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenCallScheduler,
  onOpenAdminPanel
}) => {
  const { user, signOut, updateProfile } = useAuth();
  const [tab, setTab] = useState<'consultoria' | 'servicios' | 'misturnos' | 'perfil'>('consultoria');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  const [misTurnos, setMisTurnos] = useState<TurnoLlamada[]>([]);
  const [loadingTurnos, setLoadingTurnos] = useState(false);

  const [paymentConfig, setPaymentConfig] = useState<PaymentGatewayConfig | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  useEffect(() => {
    if (isOpen && user) {
      setLoadingTurnos(true);
      listarTurnosLlamadas().then((turnos) => {
        // Filter by user email or id
        const userTurnos = turnos.filter(
          (t) => (t.usuario_id && t.usuario_id === user.id) || (user.email && t.email.toLowerCase() === user.email.toLowerCase())
        );
        setMisTurnos(userTurnos);
        setLoadingTurnos(false);
      });
      obtenerConfiguracionPagos().then(setPaymentConfig);
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);
    const res = await updateProfile({ name, phone });
    setSavingProfile(false);
    if (!res.error) {
      setProfileMsg('Datos actualizados correctamente.');
      setTimeout(() => setProfileMsg(null), 3000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#11131a] border border-[#262b3b] w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#161924] border-b border-[#242938] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4500] to-[#FF8C00] text-white flex items-center justify-center font-bold text-sm shadow-md">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white leading-tight">
                  {user.name || 'Cliente OndiGu'}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FF4500]/20 text-[#FF8C00] border border-[#FF4500]/40 rounded-full">
                  {isUserAdmin(user.email) ? 'Administrador Web' : user.role === 'vip' ? 'Cliente VIP' : 'Cliente Registrado'}
                </span>
              </div>
              <p className="text-xs text-[#8f96a8] truncate max-w-xs">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUserAdmin(user.email) && onOpenAdminPanel && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdminPanel();
                }}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                title="Ir al panel de gestión del administrador"
              >
                Panel Admin
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#888888] hover:text-white rounded-lg hover:bg-[#1f2433] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-4 bg-[#141620] border-b border-[#212635] flex gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setTab('consultoria')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              tab === 'consultoria'
                ? 'border-[#FF4500] text-white'
                : 'border-transparent text-[#8e95a8] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>Consultoría Especial</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('servicios')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              tab === 'servicios'
                ? 'border-[#FF4500] text-white'
                : 'border-transparent text-[#8e95a8] hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Servicios OndiGu</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('misturnos')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              tab === 'misturnos'
                ? 'border-[#FF4500] text-white'
                : 'border-transparent text-[#8e95a8] hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mis Llamadas</span>
            {misTurnos.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#222838] text-emerald-400 font-bold">
                {misTurnos.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setTab('perfil')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              tab === 'perfil'
                ? 'border-[#FF4500] text-white'
                : 'border-transparent text-[#8e95a8] hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span>Mi Perfil</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#0f1118]">
          {/* TAB 1: CONSULTORÍA ESPECIAL */}
          {tab === 'consultoria' && (
            <div className="space-y-5">
              <div className="p-5 bg-gradient-to-br from-[#181c28] to-[#12151e] border border-[#2a3144] rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF4500]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF4500]/20 text-[#FF8C00] text-[11px] font-bold uppercase mb-2 border border-[#FF4500]/30">
                  <Sparkles className="w-3 h-3" />
                  <span>Exclusivo para clientes</span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Consultoría Estratégica Especial 1 a 1
                </h4>

                <p className="text-xs sm:text-sm text-[#a5abbd] leading-relaxed mb-4">
                  Sesión privada de diagnóstico tecnológico para tu negocio o comercio. Analizamos tu modelo, automatizamos tus canales de venta (WhatsApp/CRM) y definimos la arquitectura web ideal para multiplicar tus conversiones.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#d0d5e2] mb-5">
                  <div className="flex items-center gap-2 p-2 bg-[#12151f] rounded border border-[#212636]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                    <span>Auditoría de presencia web y posicionamiento</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#12151f] rounded border border-[#212636]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                    <span>Plan de automatización con Asistentes de IA</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#12151f] rounded border border-[#212636]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                    <span>Integración de cobros con Mercado Pago y Stripe</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#12151f] rounded border border-[#212636]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                    <span>Propuesta de entregable en 48hs con código propio</span>
                  </div>
                </div>

                {/* Actions: Agendar llamada o contratar */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCallScheduler('Consultoría Especial 1 a 1');
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs font-bold rounded-lg shadow-[0_0_15px_rgba(255,69,0,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar mi sesión de Consultoría</span>
                  </button>

                  {/* Payment link if configured */}
                  {paymentConfig?.mercadopago_link_consultoria && (
                    <a
                      href={paymentConfig.mercadopago_link_consultoria}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-3 bg-[#009ee3] hover:bg-[#0088c4] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>
                        Abonar con Mercado Pago (${paymentConfig.precio_consultoria_ars.toLocaleString('es-AR')})
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICIOS EXCLUSIVOS */}
          {tab === 'servicios' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-[#141722] border border-[#232838] rounded-lg">
                <h4 className="text-sm font-bold text-white mb-1">Catálogo de Soluciones OndiGu</h4>
                <p className="text-xs text-[#8e95a8]">
                  Como cliente registrado podés solicitar presupuestos directos o agendar llamadas para cada desarrollo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-[#141722] border border-[#242938] rounded-lg">
                  <div className="flex items-center gap-2 text-[#FF8C00] font-bold text-xs mb-1.5">
                    <Zap className="w-4 h-4" />
                    <span>Landing Express 24hs</span>
                  </div>
                  <p className="text-xs text-[#a0a6b8] mb-3">
                    Página de aterrizaje optimizada para captación de leads en tiempo récord.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCallScheduler('Landing Page Express 24hs');
                    }}
                    className="text-xs font-semibold text-[#FF8C00] hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Agendar consulta</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 bg-[#141722] border border-[#242938] rounded-lg">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs mb-1.5">
                    <Bot className="w-4 h-4" />
                    <span>Asistentes de IA 24/7</span>
                  </div>
                  <p className="text-xs text-[#a0a6b8] mb-3">
                    Agentes inteligentes integrados a WhatsApp para ventas y soporte automatizado.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCallScheduler('Automatización & IA');
                    }}
                    className="text-xs font-semibold text-sky-400 hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Agendar consulta</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 bg-[#141722] border border-[#242938] rounded-lg">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1.5">
                    <Globe className="w-4 h-4" />
                    <span>Tiendas Online E-Commerce</span>
                  </div>
                  <p className="text-xs text-[#a0a6b8] mb-3">
                    Catálogo con checkout nativo, Mercado Pago y cálculo de envíos.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCallScheduler('Tienda Online (E-commerce)');
                    }}
                    className="text-xs font-semibold text-emerald-400 hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Agendar consulta</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 bg-[#141722] border border-[#242938] rounded-lg">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1.5">
                    <CreditCard className="w-4 h-4" />
                    <span>Integraciones Mercado Pago & Stripe</span>
                  </div>
                  <p className="text-xs text-[#a0a6b8] mb-3">
                    Automatización de cobros, suscripciones y liquidaciones para tu sistema.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCallScheduler('Integraciones de Pago');
                    }}
                    className="text-xs font-semibold text-purple-400 hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Agendar consulta</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MIS LLAMADAS AGENDADAS */}
          {tab === 'misturnos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Historial de Llamadas Agendadas</h4>
                  <p className="text-xs text-[#8e95a8]">
                    Estado de los turnos solicitados con tu cuenta.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCallScheduler();
                  }}
                  className="px-3 py-1.5 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Agendar nueva llamada
                </button>
              </div>

              {loadingTurnos ? (
                <div className="text-center py-8 text-xs text-[#8e95a8]">
                  Cargando tus turnos...
                </div>
              ) : misTurnos.length === 0 ? (
                <div className="text-center py-8 bg-[#141722] border border-[#242938] rounded-lg p-5">
                  <Calendar className="w-8 h-8 text-[#545c72] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">No tenés llamadas agendadas</p>
                  <p className="text-xs text-[#8e95a8] mt-1 mb-4">
                    Agendá una llamada con nuestro equipo para asesorarte sobre tu proyecto.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCallScheduler();
                    }}
                    className="px-4 py-2 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs font-semibold rounded-lg"
                  >
                    Agendar ahora
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {misTurnos.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 bg-[#141722] border border-[#232838] rounded-lg flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{t.motivo}</span>
                          <span className="text-[10px] text-[#8e95a8] font-mono">({t.id})</span>
                        </div>
                        <div className="text-xs text-[#a0a6b8] flex items-center gap-2">
                          <Clock className="w-3 h-3 text-[#FF8C00]" />
                          <span>{t.fecha} — {t.franja}</span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 text-xs font-bold rounded-md capitalize ${
                          t.estado === 'pendiente'
                            ? 'bg-amber-950/40 text-[#FF8C00] border border-amber-800/60'
                            : t.estado === 'contactado'
                            ? 'bg-sky-950/40 text-sky-300 border border-sky-800/60'
                            : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/60'
                        }`}
                      >
                        {t.estado === 'pendiente' && '⏳ Pendiente'}
                        {t.estado === 'contactado' && '📞 Contactado'}
                        {t.estado === 'hecho' && '✅ Hecho'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MI PERFIL */}
          {tab === 'perfil' && (
            <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
              <div className="p-3.5 bg-[#141722] border border-[#232838] rounded-lg">
                <h4 className="text-sm font-bold text-white mb-1">Datos de contacto</h4>
                <p className="text-xs text-[#8e95a8]">
                  Estos datos se precargan automáticamente en tus presupuestos y agendas de llamada.
                </p>
              </div>

              {profileMsg && (
                <div className="p-2.5 bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-300 rounded-lg">
                  {profileMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#a0a7bb] mb-1">Nombre completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181b26] border border-[#2a3042] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a0a7bb] mb-1">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+54 9 11 1234-5678"
                  className="w-full bg-[#181b26] border border-[#2a3042] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a0a7bb] mb-1">Correo electrónico</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-[#13151f] border border-[#222736] text-xs text-[#6b7280] px-3 py-2 rounded outline-none cursor-not-allowed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-2.5 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {savingProfile ? 'Guardando...' : 'Guardar cambios'}
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-3.5 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
