import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { agendarTurnoLlamada } from '../lib/agendaService';
import { BRAND_INFO } from '../data/content';
import { 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  CalendarCheck,
  AlertCircle
} from 'lucide-react';

interface CallScheduleFormProps {
  onSuccess?: () => void;
  defaultMotivo?: string;
  compact?: boolean;
}

export const CallScheduleForm: React.FC<CallScheduleFormProps> = ({ 
  onSuccess,
  defaultMotivo,
  compact = false 
}) => {
  const { user } = useAuth();

  // Helper to format date YYYY-MM-DD
  const formatDateISO = (d: Date) => d.toISOString().split('T')[0];

  // Calculate next business day (Monday to Friday)
  const getNextBusinessDays = (count: number = 5) => {
    const days: { dateStr: string; label: string; weekday: string }[] = [];
    const current = new Date();
    current.setDate(current.getDate() + 1); // Start tomorrow

    while (days.length < count) {
      const dayOfWeek = current.getDay();
      // Skip Saturday (6) and Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const dateStr = formatDateISO(current);
        const weekday = current.toLocaleDateString('es-AR', { weekday: 'short' });
        const dayMonth = current.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
        
        let label = `${weekday.charAt(0).toUpperCase() + weekday.slice(1)} ${dayMonth}`;
        if (days.length === 0) label = `Mañana (${label})`;

        days.push({ dateStr, label, weekday });
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const businessDays = getNextBusinessDays(5);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState(businessDays[0]?.dateStr || '');
  const [franja, setFranja] = useState('Tarde (13:00 - 18:00)');
  const [motivo, setMotivo] = useState(defaultMotivo || 'Sitio Web Nuevo');
  const [notas, setNotas] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submittedTurno, setSubmittedTurno] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Preload from logged in user
  useEffect(() => {
    if (user) {
      if (!nombre && user.name) setNombre(user.name);
      if (!telefono && user.phone) setTelefono(user.phone);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (defaultMotivo) {
      setMotivo(defaultMotivo);
    }
  }, [defaultMotivo]);

  const franjasDisponibles = [
    { id: 'Mañana (09:00 - 13:00)', label: 'Mañana', hours: '09:00 a 13:00', icon: '🌅' },
    { id: 'Tarde (13:00 - 18:00)', label: 'Tarde', hours: '13:00 a 18:00', icon: '☀️' },
    { id: 'Noche (18:00 - 21:00)', label: 'Noche', hours: '18:00 a 21:00', icon: '🌙' },
  ];

  const motivosDisponibles = [
    'Sitio Web Nuevo',
    'Automatización & IA',
    'Tienda Online (E-commerce)',
    'Consultoría Especial 1 a 1',
    'Modernización / Rediseño',
    'Otro motivo',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim()) {
      setError('Por favor ingresá tu nombre.');
      return;
    }
    if (!telefono.trim() || telefono.length < 6) {
      setError('Por favor ingresá un número de teléfono o WhatsApp válido para llamarte.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor ingresá un email válido para enviarte el recordatorio de la llamada.');
      return;
    }
    if (!fecha) {
      setError('Por favor elegí un día para la llamada.');
      return;
    }

    // Validate weekend
    const selectedDate = new Date(fecha + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setError('Nuestro horario comercial para llamadas es de lunes a viernes. Por favor seleccioná un día hábil.');
      return;
    }

    // Validate past date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError('No es posible seleccionar una fecha pasada.');
      return;
    }

    setLoading(true);

    try {
      const res = await agendarTurnoLlamada({
        usuario_id: user?.id || null,
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        email: email.trim(),
        fecha,
        franja,
        motivo,
        notas: notas.trim(),
      });

      setSubmittedTurno(res.data);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Error agendando llamada:', err);
      setError('Ocurrió un error al agendar. Por favor intentá nuevamente o contactanos por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedTurno(null);
    setNotas('');
  };

  // Human-readable date formatted for display
  const formatFriendlyDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split('-');
      const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
      return dateObj.toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (submittedTurno) {
    return (
      <div className="bg-[#151821] border border-[#282e3f] p-6 sm:p-8 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] text-center animate-fade-in">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#FF4500]/15 border border-[#FF4500]/40 flex items-center justify-center text-[#FF8C00]">
          <CalendarCheck className="w-7 h-7" />
        </div>

        <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF8C00] block mb-1">
          Llamada Confirmada // {submittedTurno.id}
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Listo, te vamos a llamar el {formatFriendlyDate(submittedTurno.fecha)}
        </h3>

        <div className="max-w-md mx-auto my-5 p-4 bg-[#1a1d27] border border-[#262b3b] rounded-lg text-left space-y-2 text-xs sm:text-sm text-[#d5d9e5]">
          <div className="flex justify-between">
            <span className="text-[#8e95a8]">Cliente:</span>
            <span className="font-semibold text-white">{submittedTurno.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8e95a8]">Teléfono de contacto:</span>
            <span className="font-semibold text-white">{submittedTurno.telefono}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8e95a8]">Horario preferido:</span>
            <span className="font-semibold text-[#FF8C00]">{submittedTurno.franja}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8e95a8]">Motivo:</span>
            <span className="font-semibold text-white">{submittedTurno.motivo}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#9da3b4] max-w-md mx-auto mb-6">
          Guardamos tu turno en nuestra agenda comercial. Si querés dejarnos un mensaje previo o coordinar por WhatsApp, podés escribirnos ahora con un clic.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`${BRAND_INFO.whatsappUrl}%20Hola!%20Agend%C3%A9%20una%20llamada%20para%20el%20d%C3%ADa%20${submittedTurno.fecha}%20(${submittedTurno.franja})%20por%20${encodeURIComponent(submittedTurno.motivo)}.%20Mi%20turno%20es%20${submittedTurno.id}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1eb857] rounded-lg shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar también por WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-[#a5abbd] hover:text-white bg-[#1a1d27] hover:bg-[#232734] border border-[#2a3040] rounded-lg transition-colors"
          >
            Agendar otra llamada
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-[#151821] border border-[#262b3b] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8 lg:p-10'
      }`}
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/30 text-[#FF8C00] text-xs font-semibold mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Atención personalizada sin cargo</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Agendá cuándo querés que te llamemos
        </h3>
        <p className="text-xs sm:text-sm text-[#9da3b4] mt-1">
          Elegí el día y la franja horaria que más te convenga. Un especialista de OndiGu se comunicará puntualmente para asesorarte.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-red-950/40 border border-red-800/60 rounded-lg flex items-center gap-3 text-xs text-red-300 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-5">
        {/* Nombre, Teléfono, Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#c0c5d4] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>Tu Nombre *</span>
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Marcelo Rossi"
              required
              className="w-full bg-[#1b1f2b] border border-[#2d3345] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-lg transition-colors outline-none placeholder-[#6b7280]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#c0c5d4] mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>Teléfono / WhatsApp *</span>
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej: +54 9 11 1234-5678"
              required
              className="w-full bg-[#1b1f2b] border border-[#2d3345] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-lg transition-colors outline-none placeholder-[#6b7280]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#c0c5d4] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>Correo Electrónico *</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej: contacto@tunegocio.com"
              required
              className="w-full bg-[#1b1f2b] border border-[#2d3345] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-lg transition-colors outline-none placeholder-[#6b7280]"
            />
          </div>
        </div>

        {/* Día preferido - Cómodo en mobile con pills + date input fallback */}
        <div>
          <label className="block text-xs font-semibold text-[#c0c5d4] mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>Día preferido (Lunes a Viernes) *</span>
          </label>

          {/* Quick day buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2.5">
            {businessDays.map((d) => (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => setFecha(d.dateStr)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                  fecha === d.dateStr
                    ? 'bg-[#FF4500] text-white border-[#FF4500] shadow-[0_0_12px_rgba(255,69,0,0.35)]'
                    : 'bg-[#1a1e29] text-[#9ca3af] border-[#292f3f] hover:border-[#3d455c] hover:text-white'
                }`}
              >
                <span className="block font-bold">{d.weekday.toUpperCase()}</span>
                <span className="text-[10px] opacity-80">{d.label.replace(/.*\((.*)\).*/, '$1')}</span>
              </button>
            ))}
          </div>

          {/* Alternative custom date picker */}
          <div className="flex items-center gap-2 text-xs text-[#8f96a8]">
            <span>O seleccioná otra fecha:</span>
            <input
              type="date"
              min={businessDays[0]?.dateStr}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="bg-[#1b1f2b] border border-[#2d3345] text-white text-xs px-2.5 py-1.5 rounded-md focus:border-[#FF4500] outline-none"
            />
          </div>
        </div>

        {/* Franja horaria preferida */}
        <div>
          <label className="block text-xs font-semibold text-[#c0c5d4] mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>Franja horaria preferida *</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {franjasDisponibles.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFranja(f.id)}
                className={`p-3 rounded-lg text-left border transition-all cursor-pointer flex items-center gap-3 ${
                  franja === f.id
                    ? 'bg-[#1e2330] border-[#FF4500] text-white ring-1 ring-[#FF4500] shadow-[0_0_15px_rgba(255,69,0,0.2)]'
                    : 'bg-[#181b24] border-[#272c3b] text-[#9ca3af] hover:border-[#384055] hover:text-white'
                }`}
              >
                <span className="text-xl">{f.icon}</span>
                <div>
                  <div className="text-xs font-bold text-white">{f.label}</div>
                  <div className="text-[11px] text-[#FF8C00]">{f.hours}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Motivo breve de la consulta */}
        <div>
          <label className="block text-xs font-semibold text-[#c0c5d4] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C00]" />
            <span>Motivo principal de la consulta *</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {motivosDisponibles.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMotivo(m)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  motivo === m
                    ? 'bg-[#FF4500]/15 text-[#FF8C00] border-[#FF4500] font-semibold'
                    : 'bg-[#191c25] text-[#8e95a8] border-[#262b3b] hover:border-[#384055] hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Notas adicionales opcionales */}
        <div>
          <label className="block text-xs font-semibold text-[#c0c5d4] mb-1.5">
            Detalle o comentario adicional (opcional)
          </label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={2}
            placeholder="¿De qué trata tu negocio o qué funcionalidad te interesa en particular?"
            className="w-full bg-[#1b1f2b] border border-[#2d3345] focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-lg transition-colors outline-none placeholder-[#6b7280]"
          />
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:from-[#e03d00] hover:to-[#e67e00] disabled:opacity-50 rounded-lg shadow-[0_0_20px_rgba(255,69,0,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Confirmando turno en agenda...</span>
              </>
            ) : (
              <>
                <CalendarCheck className="w-4 h-4" />
                <span>Confirmar y agendar llamada</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
