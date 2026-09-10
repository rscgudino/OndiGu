import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  TurnoLlamada, 
  PresupuestoLead, 
  PaymentGatewayConfig 
} from '../types';
import { 
  listarTurnosLlamadas, 
  actualizarEstadoTurno, 
  listarPresupuestosLeads,
  obtenerConfiguracionPagos,
  guardarConfiguracionPagos,
  getSupabaseSqlSchema,
  isUserAdmin,
  setAdminUnlocked
} from '../lib/agendaService';
import { 
  ShieldAlert, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink, 
  CreditCard, 
  Database, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  X, 
  MessageCircle,
  Settings,
  Lock,
  DollarSign
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'turnos' | 'presupuestos' | 'pagos' | 'sql'>('turnos');
  
  // Turnos state
  const [turnos, setTurnos] = useState<TurnoLlamada[]>([]);
  const [loadingTurnos, setLoadingTurnos] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Presupuestos state
  const [presupuestos, setPresupuestos] = useState<PresupuestoLead[]>([]);
  const [loadingPresupuestos, setLoadingPresupuestos] = useState(false);

  // Pagos state
  const [gatewayConfig, setGatewayConfig] = useState<PaymentGatewayConfig | null>(null);
  const [savingConfig, setSavingConfig] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin access validation
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const isAdmin = isUserAdmin(user?.email);

  const loadData = async () => {
    setLoadingTurnos(true);
    try {
      const data = await listarTurnosLlamadas(filtroEstado);
      setTurnos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTurnos(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAdmin) {
      loadData();
      obtenerConfiguracionPagos().then(setGatewayConfig);
    }
  }, [isOpen, isAdmin, filtroEstado]);

  const handleTabChange = async (tab: 'turnos' | 'presupuestos' | 'pagos' | 'sql') => {
    setActiveTab(tab);
    if (tab === 'presupuestos' && presupuestos.length === 0) {
      setLoadingPresupuestos(true);
      const leads = await listarPresupuestosLeads();
      setPresupuestos(leads);
      setLoadingPresupuestos(false);
    }
  };

  const handleStatusChange = async (id: string, nuevoEstado: 'pendiente' | 'contactado' | 'hecho') => {
    setTurnos((prev) => prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t)));
    await actualizarEstadoTurno(id, nuevoEstado);
  };

  const handleSavePayments = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatewayConfig) return;

    setSavingConfig(true);
    setSaveSuccess(false);
    const res = await guardarConfiguracionPagos(gatewayConfig);
    setSavingConfig(false);

    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleUnlockWithPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin.toLowerCase().trim() === 'ondigu2026' || adminPin.trim() === 'admin') {
      setAdminUnlocked(true);
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(getSupabaseSqlSchema());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (!isOpen) return null;

  // If not admin, show password entry screen
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <div className="bg-[#12141c] border border-[#262b3b] max-w-md w-full p-6 sm:p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white rounded-lg hover:bg-[#1a1e2b]"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/40 flex items-center justify-center text-[#FF8C00]">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Panel de Administración</h3>
            <p className="text-xs text-[#8f96a8] mt-1">
              Esta sección es privada para el administrador de OndiGu.
            </p>
          </div>

          <form onSubmit={handleUnlockWithPin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#c0c5d4] mb-1.5">
                Clave de acceso de administrador
              </label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => {
                  setAdminPin(e.target.value);
                  setPinError(false);
                }}
                placeholder="Ingresá la clave de acceso"
                className="w-full bg-[#181b24] border border-[#2b3142] focus:border-[#FF4500] text-white text-sm px-3.5 py-2.5 rounded-lg outline-none"
              />
              {pinError && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Clave incorrecta. (Tip de prueba: ondigu2026)</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#FF4500] hover:bg-[#e03d00] text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Ingresar al panel de gestión
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter turnos by search term
  const filteredTurnos = turnos.filter((t) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      t.nombre.toLowerCase().includes(term) ||
      t.telefono.toLowerCase().includes(term) ||
      t.email.toLowerCase().includes(term) ||
      t.motivo.toLowerCase().includes(term) ||
      t.fecha.includes(term)
    );
  });

  const totalPendientes = turnos.filter((t) => t.estado === 'pendiente').length;
  const totalContactados = turnos.filter((t) => t.estado === 'contactado').length;
  const totalHechos = turnos.filter((t) => t.estado === 'hecho').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0f1218] border border-[#252b3b] w-full max-w-6xl max-h-[92vh] flex flex-col rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#141721] border-b border-[#222736] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF4500]/20 border border-[#FF4500]/40 flex items-center justify-center text-[#FF8C00]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-brand font-bold text-white">
                  Panel Administrador OndiGu
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF4500]/20 text-[#FF8C00] border border-[#FF4500]/30 uppercase">
                  Acceso Privado
                </span>
              </div>
              <p className="text-xs text-[#8f96a8]">
                Gestión de agenda comercial, leads y pasarelas de pago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              title="Actualizar datos"
              className="p-2 text-[#9ca3af] hover:text-white bg-[#1a1e2a] hover:bg-[#242a3a] border border-[#292f40] rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loadingTurnos ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#9ca3af] hover:text-white bg-[#1a1e2a] hover:bg-[#242a3a] border border-[#292f40] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 bg-[#12151e] border-b border-[#202534] flex gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => handleTabChange('turnos')}
            className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'turnos'
                ? 'border-[#FF4500] text-white'
                : 'border-transparent text-[#8e95a8] hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>Agenda de Llamadas</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#1d2230] text-[#FF8C00] font-bold">
              {turnos.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('presupuestos')}
            className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'presupuestos'
                ? 'border-[#FF4500] text-white'
                : 'border-transparent text-[#8e95a8] hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>Presupuestos y Leads</span>
            {presupuestos.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#1d2230] text-sky-400 font-bold">
                {presupuestos.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('pagos')}
            className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'pagos'
                ? 'border-[#FF4500] text-white'
                : 'border-transparent text-[#8e95a8] hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mercado Pago & Stripe</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('sql')}
            className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'sql'
                ? 'border-[#FF4500] text-white'
                : 'border-transparent text-[#8e95a8] hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Tablas Supabase (SQL)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0c0e14]">
          {/* TAB 1: AGENDA DE LLAMADAS */}
          {activeTab === 'turnos' && (
            <div className="space-y-4">
              {/* Metric badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#151822] border border-[#242938] rounded-lg">
                  <span className="text-[11px] text-[#8e95a8] block">Total Agendadas</span>
                  <span className="text-xl font-bold text-white">{turnos.length}</span>
                </div>
                <div className="p-3 bg-[#151822] border border-[#242938] rounded-lg">
                  <span className="text-[11px] text-[#FF8C00] block">⏳ Pendientes</span>
                  <span className="text-xl font-bold text-[#FF8C00]">{totalPendientes}</span>
                </div>
                <div className="p-3 bg-[#151822] border border-[#242938] rounded-lg">
                  <span className="text-[11px] text-sky-400 block">📞 Contactados</span>
                  <span className="text-xl font-bold text-sky-400">{totalContactados}</span>
                </div>
                <div className="p-3 bg-[#151822] border border-[#242938] rounded-lg">
                  <span className="text-[11px] text-emerald-400 block">✅ Hechos</span>
                  <span className="text-xl font-bold text-emerald-400">{totalHechos}</span>
                </div>
              </div>

              {/* Filters and search bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#141722] p-3 rounded-lg border border-[#222736]">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-[#8f96a8] font-semibold flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Estado:</span>
                  </span>
                  {(['todos', 'pendiente', 'contactado', 'hecho'] as const).map((est) => (
                    <button
                      key={est}
                      type="button"
                      onClick={() => setFiltroEstado(est)}
                      className={`px-2.5 py-1 text-xs rounded-md capitalize font-medium transition-colors cursor-pointer ${
                        filtroEstado === est
                          ? 'bg-[#FF4500] text-white'
                          : 'bg-[#1b1f2c] text-[#9ca3af] hover:text-white'
                      }`}
                    >
                      {est}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#6b7280] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar cliente, tel, motivo..."
                    className="w-full bg-[#181c27] border border-[#2b3142] text-xs text-white pl-8 pr-3 py-1.5 rounded-md focus:border-[#FF4500] outline-none"
                  />
                </div>
              </div>

              {/* Turnos List */}
              {loadingTurnos ? (
                <div className="text-center py-12 text-[#8e95a8] text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FF8C00]" />
                  <span>Cargando agenda de llamadas...</span>
                </div>
              ) : filteredTurnos.length === 0 ? (
                <div className="text-center py-12 bg-[#131620] border border-[#222736] rounded-lg p-6">
                  <Calendar className="w-8 h-8 text-[#555e75] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">No hay turnos con este filtro</p>
                  <p className="text-xs text-[#8e95a8] mt-1">
                    Cuando un usuario agende desde la web, aparecerá aquí inmediatamente.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredTurnos.map((turno) => (
                    <div
                      key={turno.id}
                      className="p-4 bg-[#141722] border border-[#232838] hover:border-[#2f364a] rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                    >
                      {/* Left: Date & Time */}
                      <div className="flex items-start sm:items-center gap-3 min-w-[190px]">
                        <div className="px-3 py-2 bg-[#1b1f2c] border border-[#2a3042] rounded-lg text-center shrink-0">
                          <span className="text-[10px] font-mono uppercase text-[#FF8C00] block font-bold">
                            {new Date(turno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { weekday: 'short' }).toUpperCase()}
                          </span>
                          <span className="text-base font-bold text-white leading-none block">
                            {new Date(turno.fecha + 'T00:00:00').getDate()}
                          </span>
                          <span className="text-[9px] text-[#8e95a8] block">
                            {new Date(turno.fecha + 'T00:00:00').toLocaleDateString('es-AR', { month: 'short' })}
                          </span>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#FF8C00]" />
                            <span>{turno.franja}</span>
                          </div>
                          <span className="text-[10px] text-[#8e95a8] font-mono">
                            ID: {turno.id}
                          </span>
                        </div>
                      </div>

                      {/* Center: Client Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{turno.nombre}</h4>
                          <span className="px-2 py-0.5 text-[10px] font-medium bg-[#1d2230] text-[#FF8C00] border border-[#FF8C00]/30 rounded">
                            {turno.motivo}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#a0a7bb]">
                          <a
                            href={`tel:${turno.telefono}`}
                            className="flex items-center gap-1 hover:text-white transition-colors text-white font-medium"
                          >
                            <Phone className="w-3 h-3 text-[#FF8C00]" />
                            <span>{turno.telefono}</span>
                          </a>

                          <a
                            href={`mailto:${turno.email}`}
                            className="flex items-center gap-1 hover:text-white transition-colors truncate"
                          >
                            <Mail className="w-3 h-3 text-sky-400" />
                            <span>{turno.email}</span>
                          </a>
                        </div>

                        {turno.notas && (
                          <p className="text-xs text-[#828a9e] italic mt-1 bg-[#0f121a] p-1.5 rounded border border-[#1e2330]">
                            "{turno.notas}"
                          </p>
                        )}
                      </div>

                      {/* Right: Quick actions and Status select */}
                      <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#202534]">
                        {/* Direct WhatsApp button */}
                        <a
                          href={`https://wa.me/${turno.telefono.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(
                            turno.nombre
                          )}!%20Te%20escribimos%20de%20OndiGu%20por%20tu%20llamada%20agendada%20para%20el%20${turno.fecha}%20(${encodeURIComponent(
                            turno.franja
                          )}).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Abrir WhatsApp directo con este cliente"
                          className="p-2 text-white bg-[#25D366] hover:bg-[#1eb857] rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>

                        {/* Status selector in-place */}
                        <select
                          value={turno.estado}
                          onChange={(e) =>
                            handleStatusChange(turno.id, e.target.value as 'pendiente' | 'contactado' | 'hecho')
                          }
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer ${
                            turno.estado === 'pendiente'
                              ? 'bg-amber-950/40 text-[#FF8C00] border-amber-800/60'
                              : turno.estado === 'contactado'
                              ? 'bg-sky-950/40 text-sky-300 border-sky-800/60'
                              : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                          }`}
                        >
                          <option value="pendiente" className="bg-[#151821] text-amber-400">⏳ Pendiente</option>
                          <option value="contactado" className="bg-[#151821] text-sky-400">📞 Contactado</option>
                          <option value="hecho" className="bg-[#151821] text-emerald-400">✅ Hecho</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRESUPUESTOS Y LEADS */}
          {activeTab === 'presupuestos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Solicitudes de Presupuesto Recibidas</h4>
                  <p className="text-xs text-[#8e95a8]">
                    Clientes que completaron el formulario "Pedí tu presupuesto".
                  </p>
                </div>
              </div>

              {loadingPresupuestos ? (
                <div className="text-center py-12 text-xs text-[#8e95a8]">
                  Cargando presupuestos...
                </div>
              ) : presupuestos.length === 0 ? (
                <div className="text-center py-12 bg-[#131620] border border-[#222736] rounded-lg p-6">
                  <Mail className="w-8 h-8 text-[#555e75] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-white">No hay solicitudes aún</p>
                  <p className="text-xs text-[#8e95a8] mt-1">
                    Cada vez que alguien complete el presupuesto se registrará aquí y en Supabase.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {presupuestos.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 bg-[#141722] border border-[#232838] rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-bold text-white">{lead.nombre}</h5>
                          <span className="text-xs text-[#FF8C00] font-mono">[{lead.tipo_negocio}]</span>
                        </div>
                        <div className="text-xs text-[#8e95a8] flex items-center gap-3">
                          <span>Contacto: <strong className="text-white">{lead.contacto}</strong></span>
                          <span>Fecha: {new Date(lead.creado_en).toLocaleString('es-AR')}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {lead.necesidades.map((n) => (
                            <span
                              key={n}
                              className="px-2 py-0.5 text-[10px] bg-[#1d2230] text-[#c0c5d4] rounded"
                            >
                              {n}
                            </span>
                          ))}
                        </div>
                        {lead.detalles && (
                          <p className="text-xs text-[#9095a8] mt-1.5 bg-[#0f121a] p-2 rounded">
                            "{lead.detalles}"
                          </p>
                        )}
                      </div>

                      <div>
                        <a
                          href={`https://wa.me/?text=Hola%20${encodeURIComponent(
                            lead.nombre
                          )}!%20Te%20escribimos%20de%20OndiGu%20sobre%20tu%20solicitud%20de%20presupuesto%20(${lead.id}).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1eb857] rounded-lg transition-colors inline-flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Contactar</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MERCADO PAGO Y STRIPE */}
          {activeTab === 'pagos' && gatewayConfig && (
            <form onSubmit={handleSavePayments} className="space-y-6 max-w-3xl">
              <div className="p-4 bg-[#141722] border border-[#232838] rounded-lg">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-[#FF8C00]" />
                  <span>Configuración de Pasarelas de Pago para Consultoría y Servicios</span>
                </h4>
                <p className="text-xs text-[#8e95a8]">
                  Cargá tus credenciales de Mercado Pago y Stripe. Solo el administrador tiene acceso a editar estos valores.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-950/50 border border-emerald-800/60 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Configuración de pagos guardada correctamente en Supabase y cache local.</span>
                </div>
              )}

              {/* Mercado Pago Section */}
              <div className="p-5 bg-[#141722] border border-[#232838] rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#009ee3] flex items-center justify-center text-white font-bold text-[10px]">
                      MP
                    </div>
                    <h5 className="text-sm font-bold text-white">Mercado Pago (Argentina)</h5>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-[#a0a7bb] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gatewayConfig.mercadopago_sandbox}
                      onChange={(e) =>
                        setGatewayConfig({ ...gatewayConfig, mercadopago_sandbox: e.target.checked })
                      }
                      className="rounded border-[#2f3548] text-[#FF4500]"
                    />
                    <span>Modo Sandbox (Pruebas)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#a0a7bb] mb-1">Public Key (Clave Pública)</label>
                    <input
                      type="text"
                      value={gatewayConfig.mercadopago_public_key}
                      onChange={(e) =>
                        setGatewayConfig({ ...gatewayConfig, mercadopago_public_key: e.target.value })
                      }
                      placeholder="TEST-... o APP_USR-..."
                      className="w-full bg-[#191c28] border border-[#2b3142] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#a0a7bb] mb-1">Access Token (Token de Acceso)</label>
                    <input
                      type="password"
                      value={gatewayConfig.mercadopago_access_token}
                      onChange={(e) =>
                        setGatewayConfig({ ...gatewayConfig, mercadopago_access_token: e.target.value })
                      }
                      placeholder="TEST-... o APP_USR-..."
                      className="w-full bg-[#191c28] border border-[#2b3142] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#a0a7bb] mb-1">
                    Link de Cobro / Checkout para Consultoría Especial
                  </label>
                  <input
                    type="url"
                    value={gatewayConfig.mercadopago_link_consultoria}
                    onChange={(e) =>
                      setGatewayConfig({ ...gatewayConfig, mercadopago_link_consultoria: e.target.value })
                    }
                    placeholder="https://mpago.la/pos/tu-link-directo"
                    className="w-full bg-[#191c28] border border-[#2b3142] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                  />
                  <span className="text-[10px] text-[#717990]">
                    Podés generar un link de pago directo en tu panel de Mercado Pago y pegarlo aquí para cobrar la seña o consultoría al cliente.
                  </span>
                </div>
              </div>

              {/* Stripe Section */}
              <div className="p-5 bg-[#141722] border border-[#232838] rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#635BFF] flex items-center justify-center text-white font-bold text-[10px]">
                      S
                    </div>
                    <h5 className="text-sm font-bold text-white">Stripe (Cobros Internacionales USD)</h5>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-[#a0a7bb] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gatewayConfig.stripe_test_mode}
                      onChange={(e) =>
                        setGatewayConfig({ ...gatewayConfig, stripe_test_mode: e.target.checked })
                      }
                      className="rounded border-[#2f3548] text-[#FF4500]"
                    />
                    <span>Modo Test</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#a0a7bb] mb-1">Publishable Key</label>
                    <input
                      type="text"
                      value={gatewayConfig.stripe_publishable_key}
                      onChange={(e) =>
                        setGatewayConfig({ ...gatewayConfig, stripe_publishable_key: e.target.value })
                      }
                      placeholder="pk_test_... o pk_live_..."
                      className="w-full bg-[#191c28] border border-[#2b3142] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#a0a7bb] mb-1">Secret Key</label>
                    <input
                      type="password"
                      value={gatewayConfig.stripe_secret_key}
                      onChange={(e) =>
                        setGatewayConfig({ ...gatewayConfig, stripe_secret_key: e.target.value })
                      }
                      placeholder="sk_test_... o sk_live_..."
                      className="w-full bg-[#191c28] border border-[#2b3142] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                    />
                  </div>
                </div>
              </div>

              {/* Precios de Consultoría */}
              <div className="p-5 bg-[#141722] border border-[#232838] rounded-lg space-y-3">
                <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#FF8C00]" />
                  <span>Valor de la Consultoría Estratégica 1 a 1</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#a0a7bb] mb-1">Precio en Pesos Argentinos (ARS)</label>
                    <input
                      type="number"
                      value={gatewayConfig.precio_consultoria_ars}
                      onChange={(e) =>
                        setGatewayConfig({
                          ...gatewayConfig,
                          precio_consultoria_ars: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#191c28] border border-[#2b3142] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#a0a7bb] mb-1">Precio en Dólares (USD)</label>
                    <input
                      type="number"
                      value={gatewayConfig.precio_consultoria_usd}
                      onChange={(e) =>
                        setGatewayConfig({
                          ...gatewayConfig,
                          precio_consultoria_usd: Number(e.target.value),
                        })
                      }
                      className="w-full bg-[#191c28] border border-[#2b3142] text-xs text-white px-3 py-2 rounded outline-none focus:border-[#FF4500]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingConfig}
                  className="px-6 py-3 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  {savingConfig ? 'Guardando configuración...' : 'Guardar Pasarelas de Pago'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: SQL SCHEMA PARA SUPABASE */}
          {activeTab === 'sql' && (
            <div className="space-y-4 max-w-4xl">
              <div className="p-4 bg-[#141722] border border-[#232838] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>Script SQL para crear las tablas en Supabase</span>
                  </h4>
                  <p className="text-xs text-[#8e95a8] mt-1">
                    Copiá y pegá este código en el <strong>SQL Editor</strong> de tu proyecto en Supabase para habilitar las tablas <code>turnos</code>, <code>presupuestos_contactos</code> y <code>configuracion_pagos</code> con sus políticas RLS.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copySqlToClipboard}
                  className="px-4 py-2 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar SQL</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-[#0a0c10] border border-[#1e2330] rounded-lg text-xs font-mono text-[#a5abbd] overflow-x-auto leading-relaxed max-h-[420px]">
                {getSupabaseSqlSchema()}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
