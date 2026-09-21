import React, { useState, useEffect } from 'react';
import { InquiryFormData } from '../types';
import { BRAND_INFO } from '../data/content';
import { useAuth } from '../context/AuthContext';
import { guardarPresupuestoLead } from '../lib/agendaService';
import { CallScheduleForm } from './CallScheduleForm';
import { Send, CheckCircle2, MessageCircle, AlertCircle, RefreshCw, Zap, Calendar, FileText } from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'agendar' | 'presupuesto'>('agendar');
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    businessType: 'Comercio o Local a la calle',
    needs: initialService ? [initialService] : ['Desarrollo Web'],
    contact: '',
    details: '',
  });

  // Autofill if logged in user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        contact: prev.contact || user.phone || user.email || '',
      }));
    }
  }, [user]);

  // Sync when initialService changes dynamically (e.g. clicking the floating 24hs ad)
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        needs: prev.needs.includes(initialService) ? prev.needs : [initialService, ...prev.needs],
      }));
    }
  }, [initialService]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const businessTypes = [
    'Comercio o Local a la calle',
    'Gastronomía / Bar / Restaurante',
    'Servicios profesionales o Consultoría',
    'Salud, Belleza o Turnos médicos',
    'Distribuidora / Venta Mayorista',
    'Emprendimiento de Productos propios',
    'Otro rubro',
  ];

  const availableNeeds = [
    'Landing Page Express 24hs',
    'Desarrollo Web',
    'Asistente Inteligente con IA',
    'Automatización de Mensajes y Procesos',
    'Modernización de web existente',
  ];

  const toggleNeed = (need: string) => {
    setFormData((prev) => {
      const exists = prev.needs.includes(need);
      if (exists) {
        if (prev.needs.length === 1) return prev; // keep at least one
        return { ...prev, needs: prev.needs.filter((n) => n !== need) };
      }
      return { ...prev, needs: [...prev.needs, need] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Por favor ingresá tu nombre o el de tu negocio.');
      return;
    }
    if (!formData.contact.trim()) {
      setError('Por favor dejanos un medio de contacto (WhatsApp, teléfono o email).');
      return;
    }

    setLoading(true);

    try {
      // 1. Guardar en base de datos Supabase
      const savedLead = await guardarPresupuestoLead({
        usuario_id: user?.id || null,
        nombre: formData.name.trim(),
        tipo_negocio: formData.businessType,
        necesidades: formData.needs,
        contacto: formData.contact.trim(),
        detalles: formData.details.trim(),
      });

      const leadId = savedLead?.data?.id || 'OND-' + Math.floor(100000 + Math.random() * 900000);
      setSubmitted({ id: leadId });

      // 2. Abrir WhatsApp automáticamente con los datos estructurados
      const waText = `Hola OndiGu! Acabo de enviar una solicitud de presupuesto desde la web:%0A%0A*Código:* ${leadId}%0A*Nombre:* ${encodeURIComponent(
        formData.name
      )}%0A*Rubro:* ${encodeURIComponent(formData.businessType)}%0A*Servicios:* ${encodeURIComponent(
        formData.needs.join(', ')
      )}%0A*Contacto:* ${encodeURIComponent(formData.contact)}${
        formData.details ? `%0A*Detalles:* ${encodeURIComponent(formData.details)}` : ''
      }`;

      const waBase = BRAND_INFO.whatsappUrl.split('?')[0];
      const directUrl = `${waBase}?text=${waText}`;

      try {
        window.open(directUrl, '_blank');
      } catch (err) {
        console.warn('Popup bloqueado:', err);
      }

      // 3. Opcional notificación servidor
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => {});
    } catch (err: any) {
      console.error(err);
      setSubmitted({
        id: 'OND-' + Math.floor(100000 + Math.random() * 900000),
        name: formData.name,
        businessType: formData.businessType,
        needs: formData.needs,
        contact: formData.contact,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(null);
    setFormData({
      name: '',
      businessType: 'Comercio o Local a la calle',
      needs: ['Desarrollo Web'],
      contact: '',
      details: '',
    });
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/70 dark:bg-[#0f1218] border-t border-slate-200 dark:border-[#1e222e] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF4500] dark:text-[#FF8C00] mb-2 block font-semibold">
            Atención personalizada y directa
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Empezá a potenciar tu negocio
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-[#a0a0a0] leading-relaxed">
            Elegí si preferís coordinar una llamada en el día y horario que te quede cómodo, o pedir una cotización detallada por escrito.
          </p>

          {/* Switcher Tabs */}
          <div className="mt-6 inline-flex p-1.5 bg-slate-200/80 dark:bg-[#161924] border border-slate-300/80 dark:border-[#272d3e] rounded-xl shadow-xs gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('agendar')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'agendar'
                  ? 'bg-[#FF4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.4)]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-[#9ca3af] dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Agendá cuándo querés que te llamemos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('presupuesto')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'presupuesto'
                  ? 'bg-[#FF4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.4)]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-[#9ca3af] dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Pedí tu presupuesto</span>
            </button>
          </div>
        </div>

        {activeTab === 'agendar' ? (
          <CallScheduleForm />
        ) : submitted ? (
          /* Confirmation card with clear next steps */
          <div className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#282d3d] p-8 sm:p-10 text-center rounded-xl shadow-lg animate-fade-in">
            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-[#FF4500]/10 border border-[#FF4500]/30 text-[#FF4500] rounded-full">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4500] dark:text-[#FF8C00] block mb-2 font-semibold">
              Solicitud guardada en base de datos // Código: {submitted.id}
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              ¡Muchas gracias, {formData.name || 'amigo'}!
            </h3>

            <p className="text-base text-slate-600 dark:text-[#c0c0c0] max-w-xl mx-auto mb-8 leading-relaxed">
              Guardamos tus requerimientos y abrimos WhatsApp para brindarte atención inmediata. Si la ventana no se abrió de forma automática, hacé clic en el botón de abajo:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-200 dark:border-[#202430]">
              <a
                href={`${BRAND_INFO.whatsappUrl}%20Hola!%20Envi%C3%A9%20una%20solicitud%20de%20presupuesto%20(${submitted.id})%20por%20${encodeURIComponent(
                  formData.needs.join(', ')
                )}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1eb857] rounded-lg transition-colors shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir conversación en WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-700 dark:text-[#d0d0d0] hover:text-slate-950 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#1d202c] dark:hover:bg-[#252937] border border-slate-200 dark:border-[#2e3444] rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Pedir otro presupuesto</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            id="quote-inquiry-form"
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-[#232734] p-7 sm:p-10 space-y-8 rounded-xl shadow-lg"
          >
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-sm rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 dark:text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Field 1: Name */}
            <div>
              <label htmlFor="input-name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Nombre o nombre de tu negocio *
              </label>
              <input
                id="input-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Marcelo Gómez / Ferretería San José"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1c202a] border border-slate-200 dark:border-[#2b3040] focus:border-[#FF4500] focus:outline-none text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-[#606060] rounded-lg transition-colors"
                required
              />
            </div>

            {/* Field 2: Rubro del negocio */}
            <div>
              <label htmlFor="input-rubro" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Rubro de tu negocio *
              </label>
              <select
                id="input-rubro"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1c202a] border border-slate-200 dark:border-[#2b3040] focus:border-[#FF4500] focus:outline-none text-slate-900 dark:text-white text-sm rounded-lg transition-colors"
              >
                {businessTypes.map((type) => (
                  <option key={type} value={type} className="bg-white dark:bg-[#1c202a] text-slate-900 dark:text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 3: Qué necesita (multi-select) */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                ¿Qué estás buscando para tu negocio? (Podés marcar varias opciones)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableNeeds.map((need) => {
                  const isChecked = formData.needs.includes(need);
                  return (
                    <button
                      key={need}
                      type="button"
                      onClick={() => toggleNeed(need)}
                      className={`flex items-center gap-3 px-4 py-3 text-left text-xs sm:text-sm font-medium border rounded-lg transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-orange-50 dark:bg-[#241712] border-[#FF4500] text-slate-900 dark:text-white'
                          : 'bg-slate-50 dark:bg-[#1c202a] border-slate-200 dark:border-[#2b3040] text-slate-600 dark:text-[#999999] hover:text-slate-900 dark:hover:text-[#d0d0d0] hover:border-slate-300 dark:hover:border-[#383e52]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm flex items-center justify-center border shrink-0 ${
                          isChecked ? 'bg-[#FF4500] border-[#FF4500] text-white' : 'border-slate-300 dark:border-[#4a5266]'
                        }`}
                      >
                        {isChecked && <span className="text-[10px] font-bold">✓</span>}
                      </div>
                      <span>{need}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 4: Contacto */}
            <div>
              <label htmlFor="input-contact" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Tu contacto (WhatsApp o Email) *
              </label>
              <input
                id="input-contact"
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Ej: +54 9 11 2345-6789 o contacto@mitienda.com"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1c202a] border border-slate-200 dark:border-[#2b3040] focus:border-[#FF4500] focus:outline-none text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-[#606060] rounded-lg transition-colors"
                required
              />
              <span className="block text-xs text-slate-500 dark:text-[#707070] mt-1.5">
                Te escribiremos de forma directa, sin spam comercial.
              </span>
            </div>

            {/* Field 5: Detalles o notas */}
            <div>
              <label htmlFor="input-details" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Detalles adicionales (opcional)
              </label>
              <textarea
                id="input-details"
                rows={3}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Contanos brevemente qué te gustaría lograr, si ya tenés un logo, o alguna referencia que te guste..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#1c202a] border border-slate-200 dark:border-[#2b3040] focus:border-[#FF4500] focus:outline-none text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-[#606060] rounded-lg transition-colors resize-none"
              />
            </div>

            {/* Submit button: NO arrow attached */}
            <div className="pt-4 border-t border-slate-200 dark:border-[#202430] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 dark:text-[#808080]">
                Sin pasarela de pago obligatoria: cotizamos cada proyecto a medida.
              </span>
              <button
                id="submit-quote-btn"
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] disabled:opacity-60 rounded-lg shadow-[0_0_20px_rgba(255,69,0,0.3)] transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Enviando solicitud...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar pedido de presupuesto</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
