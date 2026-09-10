import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  TurnoLlamada, 
  PresupuestoLead, 
  PaymentGatewayConfig,
  RegisteredClient 
} from '../types';
import { 
  listarTurnosLlamadas, 
  actualizarEstadoTurno, 
  eliminarTurnoLlamada,
  listarPresupuestosLeads,
  eliminarPresupuestoLead,
  listarClientesRegistrados,
  actualizarRolCliente,
  actualizarEstadoCliente,
  eliminarCliente,
  obtenerConfiguracionPagos,
  guardarConfiguracionPagos,
  getSupabaseSqlSchema,
  isUserAdmin,
  ADMIN_EMAILS
} from '../lib/agendaService';
import { 
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
  Lock, 
  DollarSign,
  Users,
  Shield,
  Trash2,
  Crown,
  UserCheck,
  UserX,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'clientes' | 'turnos' | 'presupuestos' | 'pagos' | 'sql'>('clientes');
  
  // Clientes state
  const [clientes, setClientes] = useState<RegisteredClient[]>([]);
  const [loadingClientes, setLoadingClientes] = useState(false);
  const [clientSearch, setClientSearch] = useState('');
  const [clientActionMessage, setClientActionMessage] = useState<string | null>(null);

  // Turnos state
  const [turnos, setTurnos] = useState<TurnoLlamada[]>([]);
  const [loadingTurnos, setLoadingTurnos] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [searchTurno, setSearchTurno] = useState('');
  
  // Presupuestos state
  const [presupuestos, setPresupuestos] = useState<PresupuestoLead[]>([]);
  const [loadingPresupuestos, setLoadingPresupuestos] = useState(false);
  const [searchPresupuesto, setSearchPresupuesto] = useState('');

  // Pagos state
  const [gatewayConfig, setGatewayConfig] = useState<PaymentGatewayConfig | null>(null);
  const [savingConfig, setSavingConfig] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // SQL State
  const [copiedSql, setCopiedSql] = useState(false);

  // Verification
  const isAdmin = isUserAdmin(user?.email);

  // Load clients
  const loadClientes = async () => {
    setLoadingClientes(true);
    try {
      const data = await listarClientesRegistrados();
      setClientes(data);
    } catch (err) {
      console.error('Error cargando clientes:', err);
    } finally {
      setLoadingClientes(false);
    }
  };

  // Load turnos
  const loadTurnos = async () => {
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

  // Load presupuestos
  const loadPresupuestos = async () => {
    setLoadingPresupuestos(true);
    try {
      const leads = await listarPresupuestosLeads();
      setPresupuestos(leads);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPresupuestos(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAdmin) {
      loadClientes();
      loadTurnos();
      obtenerConfiguracionPagos().then(setGatewayConfig);
    }
  }, [isOpen, isAdmin, filtroEstado]);

  const handleTabChange = async (tab: 'clientes' | 'turnos' | 'presupuestos' | 'pagos' | 'sql') => {
    setActiveTab(tab);
    if (tab === 'clientes') {
      loadClientes();
    } else if (tab === 'turnos') {
      loadTurnos();
    } else if (tab === 'presupuestos') {
      loadPresupuestos();
    }
  };

  // Turno actions
  const handleStatusChange = async (id: string, nuevoEstado: 'pendiente' | 'contactado' | 'hecho') => {
    setTurnos((prev) => prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t)));
    await actualizarEstadoTurno(id, nuevoEstado);
  };

  const handleDeleteTurno = async (id: string) => {
    if (!window.confirm('¿Confirmás eliminar este registro de llamada agendada?')) return;
    const res = await eliminarTurnoLlamada(id);
    if (res.success) {
      setTurnos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Presupuesto actions
  const handleDeletePresupuesto = async (id: string) => {
    if (!window.confirm('¿Confirmás eliminar este presupuesto/lead?')) return;
    const res = await eliminarPresupuestoLead(id);
    if (res.success) {
      setPresupuestos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Client actions
  const handleRoleChange = async (id: string, nuevoRol: 'cliente' | 'vip' | 'admin') => {
    const res = await actualizarRolCliente(id, nuevoRol);
    if (res.success) {
      setClientes((prev) => prev.map((c) => (c.id === id ? { ...c, role: nuevoRol } : c)));
      setClientActionMessage(`Rol actualizado con éxito a ${nuevoRol.toUpperCase()}`);
      setTimeout(() => setClientActionMessage(null), 3000);
    } else {
      alert(res.error || 'Error al actualizar rol');
    }
  };

  const handleStatusClientChange = async (id: string, nuevoEstado: 'activo' | 'pendiente' | 'bloqueado') => {
    const res = await actualizarEstadoCliente(id, nuevoEstado);
    if (res.success) {
      setClientes((prev) => prev.map((c) => (c.id === id ? { ...c, status: nuevoEstado } : c)));
      setClientActionMessage(`Estado actualizado a ${nuevoEstado.toUpperCase()}`);
      setTimeout(() => setClientActionMessage(null), 3000);
    } else {
      alert(res.error || 'Error al actualizar estado');
    }
  };

  const handleDeleteClient = async (id: string, clientEmail: string) => {
    if (ADMIN_EMAILS.includes(clientEmail.toLowerCase())) {
      alert('No podés eliminar la cuenta del administrador principal del sitio.');
      return;
    }

    if (!window.confirm(`¿Estás seguro de eliminar a "${clientEmail}" de la base de datos de clientes?`)) {
      return;
    }

    const res = await eliminarCliente(id);
    if (res.success) {
      setClientes((prev) => prev.filter((c) => c.id !== id));
      setClientActionMessage(`Cliente eliminado correctamente del sistema.`);
      setTimeout(() => setClientActionMessage(null), 3000);
    } else {
      alert(res.error || 'Error al eliminar cliente.');
    }
  };

  // Payments save
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

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(getSupabaseSqlSchema());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (!isOpen) return null;

  // STRICT ACCESS CONTROL: If the current user is NOT an administrator, show strict denial
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <div className="bg-[#12141c] border border-red-500/40 max-w-md w-full p-6 sm:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white rounded-lg hover:bg-[#1a1e2b]"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Acceso Exclusivo de Administrador</h3>
          
          <p className="text-sm text-[#9da4b6] mb-5 leading-relaxed">
            El panel administrativo está restringido. Solo el administrador principal del sitio web (<span className="text-[#FF8C00] font-semibold">{ADMIN_EMAILS[0]}</span>) tiene los privilegios de gestión, borrado y asignación de permisos.
          </p>

          <div className="p-3 bg-[#171a24] border border-[#262b3b] rounded-xl text-xs text-[#7d8496] mb-6">
            Tu cuenta actual ({user?.email || 'Visitante'}) es de rol <span className="text-white font-medium">Cliente</span> y no posee privilegios para ver ni modificar registros del sistema.
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-[#FF4500] hover:bg-[#e03d00] text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
          >
            Volver a la Web
          </button>
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredClientes = clientes.filter((c) => {
    const term = clientSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.phone.toLowerCase().includes(term)
    );
  });

  const filteredTurnos = turnos.filter((t) => {
    const term = searchTurno.toLowerCase();
    return (
      t.nombre.toLowerCase().includes(term) ||
      t.telefono.toLowerCase().includes(term) ||
      t.email.toLowerCase().includes(term) ||
      t.motivo.toLowerCase().includes(term)
    );
  });

  const filteredPresupuestos = presupuestos.filter((p) => {
    const term = searchPresupuesto.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(term) ||
      p.tipo_negocio.toLowerCase().includes(term) ||
      p.contacto.toLowerCase().includes(term) ||
      p.detalles.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#10131a] border border-[#232738] w-full max-w-5xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#1f2434] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141722]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Panel de Administración OndiGu
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-[#8e95a7] truncate">
                Conectado como: <span className="text-white font-medium">{user?.email}</span> (Control total de permisos y borrado)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'clientes') loadClientes();
                if (activeTab === 'turnos') loadTurnos();
                if (activeTab === 'presupuestos') loadPresupuestos();
              }}
              className="p-2 text-[#a5abbd] hover:text-white bg-[#1a1e2b] border border-[#292f44] rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              title="Refrescar datos"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#888888] hover:text-white bg-[#1a1e2b] border border-[#292f44] rounded-lg transition-colors"
              title="Cerrar panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Action Banner */}
        {clientActionMessage && (
          <div className="bg-emerald-950/70 border-b border-emerald-800/60 px-4 py-2 text-xs text-emerald-300 flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{clientActionMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 border-b border-[#1f2434] bg-[#121520] flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          
          {/* Tab 1: Clientes & Permisos */}
          <button
            type="button"
            onClick={() => handleTabChange('clientes')}
            className={`px-3 sm:px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'clientes'
                ? 'bg-[#181c28] text-[#FF8C00] border-[#FF4500]'
                : 'text-[#8e95a7] hover:text-white border-transparent'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clientes & Permisos</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-[#252b3d] text-[#c0c5d4]">
              {clientes.length}
            </span>
          </button>

          {/* Tab 2: Turnos */}
          <button
            type="button"
            onClick={() => handleTabChange('turnos')}
            className={`px-3 sm:px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'turnos'
                ? 'bg-[#181c28] text-[#FF8C00] border-[#FF4500]'
                : 'text-[#8e95a7] hover:text-white border-transparent'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Llamadas Agendadas</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-[#252b3d] text-[#c0c5d4]">
              {turnos.length}
            </span>
          </button>

          {/* Tab 3: Presupuestos */}
          <button
            type="button"
            onClick={() => handleTabChange('presupuestos')}
            className={`px-3 sm:px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'presupuestos'
                ? 'bg-[#181c28] text-[#FF8C00] border-[#FF4500]'
                : 'text-[#8e95a7] hover:text-white border-transparent'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Presupuestos & Leads</span>
            <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded-full bg-[#252b3d] text-[#c0c5d4]">
              {presupuestos.length}
            </span>
          </button>

          {/* Tab 4: Pasarelas */}
          <button
            type="button"
            onClick={() => handleTabChange('pagos')}
            className={`px-3 sm:px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'pagos'
                ? 'bg-[#181c28] text-[#FF8C00] border-[#FF4500]'
                : 'text-[#8e95a7] hover:text-white border-transparent'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Pasarelas de Pago</span>
          </button>

          {/* Tab 5: Supabase SQL */}
          <button
            type="button"
            onClick={() => handleTabChange('sql')}
            className={`px-3 sm:px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'sql'
                ? 'bg-[#181c28] text-[#FF8C00] border-[#FF4500]'
                : 'text-[#8e95a7] hover:text-white border-transparent'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Script SQL Supabase</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#0d0f15]">
          
          {/* ========================================================= */}
          {/* TAB 1: CLIENTES Y PERMISOS                                */}
          {/* ========================================================= */}
          {activeTab === 'clientes' && (
            <div className="space-y-4">
              
              {/* Filter and stats row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#141722] p-3.5 rounded-xl border border-[#202535]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#73798c] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    placeholder="Buscar clientes por nombre, correo o teléfono..."
                    className="w-full bg-[#1b1f2d] border border-[#2a3044] focus:border-[#FF4500] text-white text-xs pl-9 pr-3 py-2 rounded-lg outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-2 text-xs text-[#8f96a8] shrink-0 font-mono">
                  <span>Total registrados: <strong className="text-white">{clientes.length}</strong></span>
                </div>
              </div>

              {loadingClientes ? (
                <div className="py-16 text-center text-sm text-[#7e8596] flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FF4500]" />
                  <span>Cargando padrón de clientes...</span>
                </div>
              ) : filteredClientes.length === 0 ? (
                <div className="py-14 text-center border border-dashed border-[#252b3d] rounded-xl text-xs text-[#7e8596]">
                  No se encontraron clientes con el criterio de búsqueda.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {filteredClientes.map((cliente) => {
                    const isMasterAdmin = ADMIN_EMAILS.includes(cliente.email.toLowerCase());

                    return (
                      <div
                        key={cliente.id}
                        className="bg-[#141722] border border-[#232838] hover:border-[#353c52] p-4 rounded-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Client details */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {cliente.name}
                            </span>
                            
                            {/* Role Badge */}
                            {cliente.role === 'admin' ? (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full flex items-center gap-1">
                                <Crown className="w-3 h-3 text-amber-400" />
                                Administrador
                              </span>
                            ) : cliente.role === 'vip' ? (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full flex items-center gap-1">
                                <Crown className="w-3 h-3 text-purple-400" />
                                Cliente VIP
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 text-[10px] font-medium bg-[#1d2130] text-[#a5abbd] border border-[#2e344a] rounded-full">
                                Cliente Estándar
                              </span>
                            )}

                            {/* Status Badge */}
                            {cliente.status === 'activo' ? (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Activo
                              </span>
                            ) : cliente.status === 'pendiente' ? (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-950/40 text-amber-400 border border-amber-800/40 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                Pendiente
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-red-950/40 text-red-400 border border-red-800/40 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                Bloqueado
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8e95a7]">
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-[#FF8C00]" />
                              <span>{cliente.email}</span>
                            </div>
                            {cliente.phone && (
                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                                <a 
                                  href={`https://wa.me/${cliente.phone.replace(/[^0-9]/g, '')}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-emerald-400 underline underline-offset-2"
                                >
                                  {cliente.phone}
                                </a>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-[11px] text-[#6d7486]">
                              <Clock className="w-3 h-3" />
                              <span>Reg: {new Date(cliente.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {cliente.notasAdmin && (
                            <p className="text-[11px] text-[#71788a] italic bg-[#0f121a] px-2.5 py-1 rounded border border-[#1e2332]">
                              Nota admin: {cliente.notasAdmin}
                            </p>
                          )}
                        </div>

                        {/* Action controls for Administrator */}
                        <div className="flex flex-wrap items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-[#202535] shrink-0">
                          
                          {/* Role selector */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-[#71788a]">Asignar Permiso/Rol:</span>
                            <select
                              value={cliente.role}
                              disabled={isMasterAdmin}
                              onChange={(e) => handleRoleChange(cliente.id, e.target.value as any)}
                              className="bg-[#1b1f2d] border border-[#2c3246] text-white text-xs px-2.5 py-1.5 rounded-lg outline-none cursor-pointer disabled:opacity-50"
                            >
                              <option value="cliente">Cliente Estándar</option>
                              <option value="vip">Cliente VIP</option>
                              <option value="admin">Administrador</option>
                            </select>
                          </div>

                          {/* Status selector */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-[#71788a]">Estado Acceso:</span>
                            <select
                              value={cliente.status}
                              disabled={isMasterAdmin}
                              onChange={(e) => handleStatusClientChange(cliente.id, e.target.value as any)}
                              className="bg-[#1b1f2d] border border-[#2c3246] text-white text-xs px-2.5 py-1.5 rounded-lg outline-none cursor-pointer disabled:opacity-50"
                            >
                              <option value="activo">Activo</option>
                              <option value="pendiente">Pendiente</option>
                              <option value="bloqueado">Bloqueado</option>
                            </select>
                          </div>

                          {/* Delete button (Privilegio de borrar) */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-[#71788a]">Acción:</span>
                            <button
                              type="button"
                              disabled={isMasterAdmin}
                              onClick={() => handleDeleteClient(cliente.id, cliente.email)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                                isMasterAdmin
                                  ? 'bg-[#1b1f2d] text-[#555] cursor-not-allowed border border-[#252b3d]'
                                  : 'bg-red-950/40 text-red-300 hover:bg-red-900/60 border border-red-800/40 hover:border-red-600 cursor-pointer'
                              }`}
                              title={isMasterAdmin ? "No se puede eliminar al administrador principal" : "Eliminar este cliente"}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Borrar</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: TURNOS Y LLAMADAS AGENDADAS                       */}
          {/* ========================================================= */}
          {activeTab === 'turnos' && (
            <div className="space-y-4">
              
              {/* Filter row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#141722] p-3.5 rounded-xl border border-[#202535]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#73798c] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTurno}
                    onChange={(e) => setSearchTurno(e.target.value)}
                    placeholder="Buscar por nombre, teléfono, motivo..."
                    className="w-full bg-[#1b1f2d] border border-[#2a3044] focus:border-[#FF4500] text-white text-xs pl-9 pr-3 py-2 rounded-lg outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8f96a8]">Estado:</span>
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="bg-[#1b1f2d] border border-[#2c3246] text-white text-xs px-3 py-2 rounded-lg outline-none"
                  >
                    <option value="todos">Todos ({turnos.length})</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="contactado">Contactados</option>
                    <option value="hecho">Completados</option>
                  </select>
                </div>
              </div>

              {loadingTurnos ? (
                <div className="py-16 text-center text-sm text-[#7e8596] flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FF4500]" />
                  <span>Cargando turnos agendados...</span>
                </div>
              ) : filteredTurnos.length === 0 ? (
                <div className="py-14 text-center border border-dashed border-[#252b3d] rounded-xl text-xs text-[#7e8596]">
                  No hay llamadas agendadas en esta categoría.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTurnos.map((turno) => (
                    <div
                      key={turno.id}
                      className="bg-[#141722] border border-[#232838] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#353c52] transition-colors"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-white text-sm">{turno.nombre}</span>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                            turno.estado === 'hecho' 
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
                              : turno.estado === 'contactado'
                              ? 'bg-blue-950/40 text-blue-400 border-blue-800/40'
                              : 'bg-amber-950/40 text-amber-400 border-amber-800/40'
                          }`}>
                            {turno.estado.toUpperCase()}
                          </span>
                          <span className="text-xs font-mono text-[#717788]">{turno.id}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8e95a7]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#FF8C00]" />
                            <span className="text-white font-medium">{turno.fecha}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#FF8C00]" />
                            <span>{turno.franja}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <a 
                              href={`https://wa.me/${turno.telefono.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:underline text-emerald-400 font-mono"
                            >
                              {turno.telefono}
                            </a>
                          </div>
                        </div>

                        <p className="text-xs text-[#b8bfd1] pt-1">
                          <strong>Motivo:</strong> {turno.motivo}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1e2332]">
                        <select
                          value={turno.estado}
                          onChange={(e) => handleStatusChange(turno.id, e.target.value as any)}
                          className="bg-[#1b1f2d] border border-[#2c3246] text-white text-xs px-3 py-1.5 rounded-lg outline-none"
                        >
                          <option value="pendiente">Marcar Pendiente</option>
                          <option value="contactado">Marcar Contactado</option>
                          <option value="hecho">Marcar Hecho</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteTurno(turno.id)}
                          className="p-2 text-red-400 hover:text-red-200 bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar este turno"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PRESUPUESTOS Y LEADS                              */}
          {/* ========================================================= */}
          {activeTab === 'presupuestos' && (
            <div className="space-y-4">
              <div className="bg-[#141722] p-3.5 rounded-xl border border-[#202535]">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#73798c] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchPresupuesto}
                    onChange={(e) => setSearchPresupuesto(e.target.value)}
                    placeholder="Buscar por cliente, rubro de negocio, WhatsApp..."
                    className="w-full bg-[#1b1f2d] border border-[#2a3044] focus:border-[#FF4500] text-white text-xs pl-9 pr-3 py-2 rounded-lg outline-none"
                  />
                </div>
              </div>

              {loadingPresupuestos ? (
                <div className="py-16 text-center text-sm text-[#7e8596] flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FF4500]" />
                  <span>Cargando consultas de presupuesto...</span>
                </div>
              ) : filteredPresupuestos.length === 0 ? (
                <div className="py-14 text-center border border-dashed border-[#252b3d] rounded-xl text-xs text-[#7e8596]">
                  No hay presupuestos registrados aún.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPresupuestos.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-[#141722] border border-[#232838] p-4 rounded-xl flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{lead.nombre}</span>
                          <span className="px-2 py-0.5 text-[10px] font-mono bg-[#1c202d] text-[#FF8C00] border border-[#FF8C00]/30 rounded">
                            {lead.tipo_negocio}
                          </span>
                          <span className="text-xs font-mono text-[#666]">{lead.id}</span>
                        </div>

                        <div className="text-xs text-[#8e95a7] flex items-center gap-2">
                          <span>Contacto: <strong className="text-white">{lead.contacto}</strong></span>
                        </div>

                        <div className="flex flex-wrap gap-1 py-1">
                          {lead.necesidades.map((n) => (
                            <span key={n} className="px-2 py-0.5 bg-[#171b26] text-[10px] text-[#cbd1e0] rounded border border-[#272d3e]">
                              {n}
                            </span>
                          ))}
                        </div>

                        {lead.detalles && (
                          <p className="text-xs text-[#b0b7c7] bg-[#0e1017] p-2.5 rounded border border-[#1c202d] leading-relaxed">
                            {lead.detalles}
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <a
                          href={`https://wa.me/${lead.contacto.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(lead.nombre)},%20te%20contacto%20de%20OndiGu%20por%20tu%20consulta%20de%20presupuesto.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeletePresupuesto(lead.id)}
                          className="p-2 text-red-400 hover:text-red-200 bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar este presupuesto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: PASARELAS DE PAGO (MERCADO PAGO & STRIPE)          */}
          {/* ========================================================= */}
          {activeTab === 'pagos' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              {gatewayConfig ? (
                <form onSubmit={handleSavePayments} className="space-y-6">
                  
                  {/* Mercado Pago */}
                  <div className="bg-[#141722] border border-[#232838] p-5 rounded-xl space-y-4">
                    <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                      <div className="w-7 h-7 rounded bg-[#009ee3]/20 border border-[#009ee3]/40 flex items-center justify-center text-[#009ee3]">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span>Configuración Mercado Pago (Argentina / Latam)</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#a5abbd] mb-1">Public Key:</label>
                        <input
                          type="text"
                          value={gatewayConfig.mercadopago_public_key}
                          onChange={(e) => setGatewayConfig({ ...gatewayConfig, mercadopago_public_key: e.target.value })}
                          placeholder="APP_USR-..."
                          className="w-full bg-[#1b1f2d] border border-[#2a3044] text-white p-2 rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#a5abbd] mb-1">Access Token:</label>
                        <input
                          type="password"
                          value={gatewayConfig.mercadopago_access_token}
                          onChange={(e) => setGatewayConfig({ ...gatewayConfig, mercadopago_access_token: e.target.value })}
                          placeholder="APP_USR-..."
                          className="w-full bg-[#1b1f2d] border border-[#2a3044] text-white p-2 rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#a5abbd] mb-1">Link de Pago para Consultoría Express (ARS):</label>
                        <input
                          type="text"
                          value={gatewayConfig.mercadopago_link_consultoria}
                          onChange={(e) => setGatewayConfig({ ...gatewayConfig, mercadopago_link_consultoria: e.target.value })}
                          placeholder="https://mpago.la/..."
                          className="w-full bg-[#1b1f2d] border border-[#2a3044] text-white p-2 rounded-lg font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Precios */}
                  <div className="bg-[#141722] border border-[#232838] p-5 rounded-xl space-y-4">
                    <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                      <DollarSign className="w-4 h-4 text-[#FF8C00]" />
                      <span>Aranceles de Consultoría Técnica Especial</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-[#a5abbd] mb-1">Precio en ARS ($):</label>
                        <input
                          type="number"
                          value={gatewayConfig.precio_consultoria_ars}
                          onChange={(e) => setGatewayConfig({ ...gatewayConfig, precio_consultoria_ars: Number(e.target.value) })}
                          className="w-full bg-[#1b1f2d] border border-[#2a3044] text-white p-2 rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#a5abbd] mb-1">Precio en USD (U$S):</label>
                        <input
                          type="number"
                          value={gatewayConfig.precio_consultoria_usd}
                          onChange={(e) => setGatewayConfig({ ...gatewayConfig, precio_consultoria_usd: Number(e.target.value) })}
                          className="w-full bg-[#1b1f2d] border border-[#2a3044] text-white p-2 rounded-lg font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingConfig}
                    className="w-full py-2.5 px-4 bg-[#FF4500] hover:bg-[#e03d00] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    {savingConfig ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Guardando pasarelas...</span>
                      </>
                    ) : saveSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>¡Guardado con éxito!</span>
                      </>
                    ) : (
                      <span>Guardar configuración de pagos</span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center text-xs text-[#888]">Cargando pasarelas...</div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: SCRIPT SQL PARA SUPABASE                           */}
          {/* ========================================================= */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Tablas y Políticas de Seguridad Supabase</h4>
                  <p className="text-xs text-[#888]">Copia este código y pégalo en el SQL Editor de tu proyecto Supabase.</p>
                </div>
                <button
                  type="button"
                  onClick={copySqlToClipboard}
                  className="px-3.5 py-1.5 bg-[#FF4500] hover:bg-[#e03d00] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? '¡Copiado!' : 'Copiar SQL'}</span>
                </button>
              </div>

              <pre className="bg-[#0b0c10] border border-[#1e2330] p-4 rounded-xl text-[11px] font-mono text-[#a5abbd] overflow-x-auto max-h-96 leading-relaxed">
                {getSupabaseSqlSchema()}
              </pre>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
