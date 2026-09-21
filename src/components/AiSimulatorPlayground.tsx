import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Utensils, Wrench, Shirt, Scissors, Building2, CheckCheck, PhoneCall } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface IndustryData {
  id: string;
  name: string;
  icon: React.ElementType;
  storeName: string;
  avatarText: string;
  welcomeMessage: string;
  presets: { label: string; question: string; answer: string; tag?: string }[];
  defaultResponses: Record<string, string>;
}

const INDUSTRIES: IndustryData[] = [
  {
    id: 'gastronomia',
    name: 'Gastronomía & Delivery',
    icon: Utensils,
    storeName: 'Parrilla & Pizzería Don Pedro (Lanús)',
    avatarText: 'DP',
    welcomeMessage: '¡Buenas noches! 🍕🥩 ¿Querés pedir delivery o reservar una mesa para hoy en Lanús? Respondeme lo que necesites.',
    presets: [
      {
        label: '¿Tienen mesa para 4 hoy?',
        question: '¿Tienen mesa disponible para 4 personas hoy a las 21:30?',
        answer: '¡Sí, tenemos disponibilidad en el salón principal! Te reservo para 4 a las 21:30hs. Pasame por favor nombre y apellido para confirmarlo en nuestra agenda automática.',
      },
      {
        label: '¿Llegan con delivery a Lanús Este?',
        question: '¿Hacen delivery a Lanús Este y cuánto demora?',
        answer: '¡Llegamos a todo Lanús Este y Oeste! El tiempo estimado de entrega actual es de 28 a 35 minutos. Podés ver nuestro menú completo y armar tu pedido acá: [Ver Catálogo OndiGu].',
      },
      {
        label: '¿Aceptan Cuenta DNI / MP?',
        question: '¿Aceptan Cuenta DNI y Mercado Pago con descuento?',
        answer: '¡Exacto! Aceptamos Mercado Pago, QR y Cuenta DNI con el 20% de reintegro en comercios de cercanía. El link de cobro te llega automáticamente por acá al cerrar el pedido.',
      },
    ],
    defaultResponses: {
      fallback: '¡Buenísimo! Entiendo tu consulta. Te paso nuestra carta digital al instante o si preferís te comunico con el mostrador en Lanús. ¿Te gustaría ver las promos del día?',
    },
  },
  {
    id: 'ferreteria',
    name: 'Ferretería & Corralón',
    icon: Wrench,
    storeName: 'Ferretería Industrial Lanús',
    avatarText: 'FI',
    welcomeMessage: '¡Hola! 🛠️ Asistente técnico de Ferretería Lanús. Consultame stock de herramientas, materiales o cotización de corralón.',
    presets: [
      {
        label: '¿Stock de taladro percutor?',
        question: '¿Tenés stock de taladro percutor de 13mm 750W?',
        answer: '¡Hola! Sí, tenemos stock en el local: DeWalt 750W ($89.500) y Skil 650W ($54.200). Los dos tienen 2 años de garantía y retiro inmediato en Lanús o flete en el día.',
      },
      {
        label: '¿Hacen envíos de arena y cemento?',
        question: '¿Cuánto sale el flete de 10 bolsas de cemento a Remedios de Escalada?',
        answer: '¡Sí! El flete a Escalada es de $6.500 o bonificado en compras mayores a 20 bolsas. Si confirmás antes de las 13hs, el camión descarga hoy por la tarde.',
      },
      {
        label: '¿Precios con Factura A?',
        question: '¿Hacen factura A para empresas y pymes?',
        answer: 'Emitimos Factura A y B de manera automática con tu CUIT al momento del pago. Podés abonar con transferencia o e-Check a 30 días.',
      },
    ],
    defaultResponses: {
      fallback: 'Excelente. Tenemos más de 4.000 artículos en depósito. Pasame el código o la medida exacta y te confirmo precio y stock de inmediato.',
    },
  },
  {
    id: 'indumentaria',
    name: 'Indumentaria & Calzado',
    icon: Shirt,
    storeName: 'Boutique Urbana Moda',
    avatarText: 'BU',
    welcomeMessage: '¡Hola! ✨ Asistente de Boutique Urbana. ¿Buscás talle, colores disponibles o hacer tu pedido con envío?',
    presets: [
      {
        label: '¿Talle L en camperas puffer?',
        question: '¿Te queda en talle L la campera puffer negra oversize?',
        answer: '¡Hola! Sí, nos quedan las últimas 2 unidades en talle L negro y también en beige oscuro. Si querés te la reservo por 2 horas para que nadie te la gane.',
      },
      {
        label: '¿Tabla de talles y medidas?',
        question: '¿Cómo son las medidas del pantalón cargo?',
        answer: 'Te paso las medidas exactas: Talle M (cintura 78-82cm, largo 102cm) / Talle L (cintura 84-88cm, largo 105cm). La tela es gabardina elastizada súper cómoda.',
      },
      {
        label: '¿Envío en el día a CABA y GBA?',
        question: '¿Si compro ahora llega hoy en moto?',
        answer: 'Comprando antes de las 14:00hs sale con moto express en el día a todo CABA y Zona Sur. ¿Te paso el link para completar tus datos de envío?',
      },
    ],
    defaultResponses: {
      fallback: '¡Gran elección! Te paso el catálogo de novedades con fotos en alta calidad. ¿Querés abonar en 3 cuotas sin interés o 15% off en efectivo?',
    },
  },
  {
    id: 'estetica',
    name: 'Estética & Barbería',
    icon: Scissors,
    storeName: 'Barber & Spa Studio',
    avatarText: 'BS',
    welcomeMessage: '¡Hola! 💈✂️ Asistente de turnos de Barber & Spa Studio. ¿Buscás agendar turno de corte, barba o tratamiento?',
    presets: [
      {
        label: '¿Turnos para este sábado?',
        question: '¿Tenés algún hueco disponible para corte y barba este sábado a la tarde?',
        answer: 'El sábado a la tarde nos queda: 16:30hs con Nico y 18:00hs con Facu. ¿Cuál de los dos horarios te agendo en el calendario?',
      },
      {
        label: '¿Cuánto cuesta el servicio completo?',
        question: '¿Qué incluye y cuánto sale el servicio completo de barbería?',
        answer: 'El Combo VIP ($14.000) incluye: corte fade o clásico, perfilado de barba con toalla caliente, vapor de ozono y lavado premium.',
      },
      {
        label: '¿Cómo cancelo o reprogramo?',
        question: '¿Si no puedo ir cómo cambio la fecha?',
        answer: 'No te preocupes: tocando el enlace de confirmación que te enviamos por WhatsApp podés reprogramar en 1 clic sin llamar a nadie.',
      },
    ],
    defaultResponses: {
      fallback: '¡Perfecto! Nuestro sistema sincroniza los turnos directo con Google Calendar para que nunca se superpongan. ¿Te anoto para esta semana?',
    },
  },
  {
    id: 'inmobiliaria',
    name: 'Inmobiliaria & Propiedades',
    icon: Building2,
    storeName: 'Propiedades & Alquileres Lanús',
    avatarText: 'PL',
    welcomeMessage: '¡Buenas! 🏢 Asistente inmobiliario de Lanús. ¿Buscás comprar, alquilar o tasar tu propiedad?',
    presets: [
      {
        label: '¿Alquiler 2 ambientes en Lanús Centro?',
        question: '¿Tienen departamentos de 2 ambientes en alquiler cerca de la estación Lanús?',
        answer: 'Tenemos 3 opciones disponibles a 3 cuadras de la estación: desde $280.000 con bajas expensas, balcón al frente y contrato por 2 años. ¿Te paso la ficha técnica con fotos?',
      },
      {
        label: '¿Requisitos para ingresar?',
        question: '¿Qué garantía solicitan para ingresar al alquiler?',
        answer: 'Aceptamos Garantía Propietaria de Bs. As. o Seguro de Caución (Finaer / Respaldar). Los requisitos son demostración de ingresos y mes de depósito.',
      },
      {
        label: '¿Quiero tasar mi casa?',
        question: 'Quiero vender una casa en Lanús Oeste, ¿cómo coordinamos tasación?',
        answer: 'Coordinamos una visita presencial sin cargo con nuestro martillero matriculado. Decime qué día de la semana te queda más cómodo.',
      },
    ],
    defaultResponses: {
      fallback: 'Excelente consulta. Te conecto con uno de nuestros asesores para enviarte el dossier completo del inmueble en PDF.',
    },
  },
];

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface AiSimulatorPlaygroundProps {
  onSelectService?: (serviceName: string) => void;
}

export const AiSimulatorPlayground: React.FC<AiSimulatorPlaygroundProps> = ({ onSelectService }) => {
  const [activeIndustryId, setActiveIndustryId] = useState<string>('gastronomia');
  const [customInput, setCustomInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activeIndustry = INDUSTRIES.find((i) => i.id === activeIndustryId) || INDUSTRIES[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: activeIndustry.welcomeMessage,
      time: 'Ahora',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset conversation when switching industry
    setMessages([
      {
        id: `init-${activeIndustry.id}`,
        sender: 'bot',
        text: activeIndustry.welcomeMessage,
        time: 'Ahora',
      },
    ]);
  }, [activeIndustry]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendQuestion = (questionText: string, customAnswer?: string) => {
    if (!questionText.trim() || isTyping) return;

    soundFx.playClick();

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: questionText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setCustomInput('');
    setIsTyping(true);

    // Simulate AI response latency (650ms - 900ms)
    setTimeout(() => {
      setIsTyping(false);
      soundFx.playTick();

      let answer = customAnswer;
      if (!answer) {
        // match preset or fallback
        const foundPreset = activeIndustry.presets.find((p) =>
          p.question.toLowerCase().includes(questionText.toLowerCase().slice(0, 15))
        );
        answer = foundPreset ? foundPreset.answer : activeIndustry.defaultResponses.fallback;
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 750);
  };

  return (
    <section id="simulador-ia" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0f1219] border-t border-slate-200 dark:border-[#1e2332] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-100 dark:bg-[#161a25] border border-slate-200 dark:border-[#272d3e] rounded-full text-xs font-mono text-[#FF4500] dark:text-[#FF8C00] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>Playground Interactivo en Tiempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Probá cómo atendería la IA en tu rubro comercial
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-[#9da4b6] leading-relaxed">
            Elegí tu sector, hacé una pregunta real o tocá una de las opciones frecuentes. Mirá cómo responde con calidez humana y precisión de venta:
          </p>
        </div>

        {/* Industry selector tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isActive = ind.id === activeIndustryId;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveIndustryId(ind.id);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#FF4500] text-white border-[#FF4500] shadow-md scale-[1.02]'
                    : 'bg-slate-100 dark:bg-[#151924] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#FF4500]/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Chat Window UI */}
        <div className="max-w-3xl mx-auto bg-slate-50 dark:bg-[#121620] border-2 border-slate-200 dark:border-[#202738] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4500] to-[#FF8C00] flex items-center justify-center font-bold text-white shadow-xs">
                {activeIndustry.avatarText}
              </div>
              <div>
                <h4 className="text-sm font-bold leading-none">{activeIndustry.storeName}</h4>
                <p className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Bot IA OndiGu // En línea 24/7 (Responde en 2s)</span>
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
              <Bot className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>Simulación activa</span>
            </div>
          </div>

          {/* Preset question chips */}
          <div className="px-4 py-2.5 bg-slate-100 dark:bg-[#161a26] border-b border-slate-200 dark:border-slate-800/60 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Preguntas de prueba sugeridas (hacé clic para probar):
            </span>
            <div className="flex gap-2 pb-1">
              {activeIndustry.presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendQuestion(preset.question, preset.answer)}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1d2333] hover:bg-orange-50 dark:hover:bg-[#252d42] border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-[#FF4500]/60 transition-all cursor-pointer shadow-2xs"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="p-4 sm:p-6 space-y-4 h-[320px] overflow-y-auto bg-slate-50/50 dark:bg-[#0e1118]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#FF4500] to-[#FF8C00] text-white rounded-br-none'
                      : 'bg-white dark:bg-[#1a202d] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#273044] rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 px-1 flex items-center gap-1">
                  {msg.time}
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#1a202d] border border-slate-200 dark:border-slate-700 text-slate-500 text-xs px-3.5 py-2.5 rounded-2xl rounded-bl-none w-fit">
                <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-mono text-slate-400 ml-1">Escribiendo respuesta...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Custom Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion(customInput);
            }}
            className="p-3 sm:p-4 bg-white dark:bg-[#141822] border-t border-slate-200 dark:border-[#202738] flex items-center gap-2"
          >
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Escribí cualquier pregunta para el bot..."
              className="flex-1 bg-slate-100 dark:bg-[#1a202c] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#FF4500]"
            />
            <button
              type="submit"
              disabled={!customInput.trim() || isTyping}
              className="p-2.5 sm:px-4 bg-[#FF4500] hover:bg-[#e03d00] disabled:opacity-50 text-white rounded-xl font-bold flex items-center gap-1.5 text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </form>

          {/* Bottom Bar: CTA to get this for their business */}
          <div className="bg-slate-100 dark:bg-[#10131c] px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 dark:text-slate-400 text-center sm:text-left">
              ¿Querés que tu negocio responda así de rápido y no pierda ninguna venta?
            </span>
            <button
              type="button"
              onClick={() => {
                soundFx.playSuccess();
                if (onSelectService) {
                  onSelectService('Agentes Inteligentes y Chatbots');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF4500] text-white font-bold rounded-lg hover:brightness-110 transition-all cursor-pointer text-xs shrink-0 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Implementar este bot con OndiGu</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
