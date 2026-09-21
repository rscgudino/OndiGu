import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Utensils, Wrench, Shirt, Scissors, Building2, CheckCheck, PhoneCall, Zap, ArrowRight, Clock, MessageSquare, Flame } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface IndustryData {
  id: string;
  name: string;
  icon: React.ElementType;
  storeName: string;
  avatarText: string;
  welcomeMessage: string;
  presets: { label: string; question: string; answer: string }[];
  intelligentKeywords: { keywords: string[]; answer: string }[];
  fallback: string;
}

const INDUSTRIES: IndustryData[] = [
  {
    id: 'gastronomia',
    name: 'Gastronomía & Delivery',
    icon: Utensils,
    storeName: 'Parrilla & Pizzería Don Pedro (Lanús)',
    avatarText: 'DP',
    welcomeMessage: '¡Buenas noches! 🍕🥩 Bienvenidos a Don Pedro Lanús. ¿Buscás hacer un pedido con delivery en el barrio o reservar una mesa para hoy? Contame y te respondo al instante.',
    presets: [
      {
        label: '¿Tienen mesa para 4 hoy?',
        question: '¿Tienen mesa disponible para 4 personas hoy a las 21:30hs?',
        answer: '¡Hola! Sí, tenemos lugar cómodo en el salón principal. Te puedo bloquear una mesa para 4 a las 21:30hs ahora mismo. Pasame tu nombre y apellido para dejarla registrada en nuestra agenda automática.',
      },
      {
        label: '¿Llegan a Lanús Este y demora?',
        question: '¿Hacen envíos a Lanús Este y cuánto tarda el delivery?',
        answer: '¡Llegamos a todo Lanús Este y Oeste sin problema! El tiempo estimado de entrega actual de la cocina es de 25 a 35 minutos. El pedido sale bien caliente en moto con caja térmica.',
      },
      {
        label: '¿Aceptan Cuenta DNI / MP?',
        question: '¿Aceptan Cuenta DNI con reintegro y Mercado Pago?',
        answer: '¡Exactamente! Aceptamos Mercado Pago (QR o link de pago) y Cuenta DNI con el reintegro de comercios de cercanía. El link de cobro te llega directo por acá ni bien confirmes el pedido.',
      },
      {
        label: '¿Opciones celíaco o vegetariano?',
        question: '¿Tienen menú apto para celíacos o platos vegetarianos?',
        answer: '¡Sí! Contamos con pizzas y pastas elaboradas y selladas con protocolo estricto sin TACC, y para vegetarianos tenemos empanadas de verdura artesanal, pizza fugazzeta rellena y provoleta Don Pedro.',
      },
      {
        label: '¿A qué hora cierra la cocina?',
        question: '¿Hasta qué hora toman pedidos para delivery esta noche?',
        answer: 'Tomamos pedidos para delivery hasta las 23:45hs y el salón permanece abierto hasta la 01:00hs. ¡Estás súper a tiempo para pedir la cena!',
      },
    ],
    intelligentKeywords: [
      {
        keywords: ['precio', 'costo', 'carta', 'menu', 'promo'],
        answer: 'Nuestras promos del día: Pizza Muzza grande + Fainá $9.800, y Milanesa napolitana con fritas para dos $18.500. Te podemos enviar el catálogo con fotos completas por acá.',
      },
      {
        keywords: ['envio', 'delivery', 'demora', 'moto', 'flete'],
        answer: 'El envío dentro de Lanús Centro es de $1.200 o sin cargo en compras superiores a $15.000. Demora habitual entre 25 y 35 minutos.',
      },
      {
        keywords: ['horario', 'abierto', 'direccion', 'donde'],
        answer: 'Estamos en el corazón de Lanús, abiertos de martes a domingo de 11:30 a 15:30hs y de 19:30 a 00:30hs.',
      },
    ],
    fallback: '¡Buenísimo! Entiendo tu consulta. Te paso nuestra carta digital con fotos o si preferís te comunico con el mostrador en Lanús. ¿Querés que te tome el pedido ahora?',
  },
  {
    id: 'ferreteria',
    name: 'Ferretería & Corralón',
    icon: Wrench,
    storeName: 'Ferretería Industrial Lanús',
    avatarText: 'FI',
    welcomeMessage: '¡Hola! 🛠️ Asistente de Ferretería Industrial Lanús. Consultame stock de herramientas, materiales de corralón o fletes a obra.',
    presets: [
      {
        label: '¿Stock de taladro percutor?',
        question: '¿Tenés stock de taladro percutor de 13mm 750W?',
        answer: '¡Hola! Sí, tenemos stock para entrega inmediata: DeWalt 750W con maletín ($89.500) y Skil 650W ($54.200). Los dos tienen 2 años de garantía oficial y retiro inmediato en local o flete hoy mismo.',
      },
      {
        label: '¿Flete de cemento a Escalada?',
        question: '¿Cuánto sale el flete de 10 bolsas de cemento a Remedios de Escalada?',
        answer: 'El flete a Escalada es de $6.500 o te queda bonificado sin cargo si sumás 10 bolsas más o áridos. Si confirmás antes de las 13hs, el camión descarga hoy por la tarde en tu obra.',
      },
      {
        label: '¿Hacen Factura A?',
        question: '¿Emiten factura A para monotributistas o empresas?',
        answer: '¡Emitimos Factura A y B de forma 100% automática! Nos pasás el CUIT al pagar y el comprobante fiscal te llega en PDF a tu correo y a tu WhatsApp.',
      },
      {
        label: '¿Discos de corte para amoladora?',
        question: '¿Tenés discos de corte fino para amoladora chica de 115mm?',
        answer: 'Tenemos Bosch y Norton de corte fino (115mm x 1mm) para hierro e inoxidable a $1.850 cada uno, o la caja x10 unidades con 15% off a $15.700. ¿Cuántos te reservo?',
      },
      {
        label: '¿Abren los sábados?',
        question: '¿Qué horario tienen los sábados para retirar en mostrador?',
        answer: 'Los sábados atendemos corrido de 8:00 a 13:30hs con carga rápida en corralón y atención en mostrador en Lanús Oeste.',
      },
    ],
    intelligentKeywords: [
      {
        keywords: ['precio', 'cuanto', 'tarjeta', 'cuotas', 'efectivo'],
        answer: 'Aceptamos transferencias bancarias con acreditación inmediata, tarjetas de crédito en 3 cuotas fijas o 10% de descuento abonando en efectivo en mostrador.',
      },
      {
        keywords: ['entrega', 'envio', 'flete', 'camion'],
        answer: 'Contamos con flota propia de camiones volcadores y camionetas para repartos rápidos en todo Lanús, Avellaneda, Lomas y Quilmes.',
      },
    ],
    fallback: 'Excelente. Contamos con más de 4.500 artículos en depósito. Si me pasás la medida exacta o foto de la pieza que buscás, te confirmo precio y disponibilidad en el acto.',
  },
  {
    id: 'indumentaria',
    name: 'Indumentaria & Calzado',
    icon: Shirt,
    storeName: 'Boutique Urbana Moda',
    avatarText: 'BU',
    welcomeMessage: '¡Hola! ✨ Asistente de Boutique Urbana. ¿Buscás talle, colores disponibles o hacer tu pedido con moto express?',
    presets: [
      {
        label: '¿Talle L en camperas puffer?',
        question: '¿Te queda en talle L la campera puffer negra oversize?',
        answer: '¡Hola! Sí, nos quedan las últimas 2 unidades en talle L negro y también entró en beige mate. Si querés te la reservo por 2 horas para que nadie te la gane mientras decidís.',
      },
      {
        label: '¿Tabla de talles y medidas?',
        question: '¿Cómo son las medidas del pantalón cargo elastizado?',
        answer: 'Te paso las medidas exactas: Talle M (cintura 78-82cm, largo 102cm) / Talle L (cintura 84-88cm, largo 105cm). La tela es gabardina importada elastizada súper cómoda. ¿Querés que te asesore según tu contextura?',
      },
      {
        label: '¿Envío en el día en moto?',
        question: '¿Si compro ahora llega hoy mismo en moto?',
        answer: 'Comprando antes de las 14:00hs sale con moto express en el día a todo Lanús, Zona Sur y CABA. El repartidor te avisa por WhatsApp 15 minutos antes de llegar.',
      },
      {
        label: '¿Cómo son los cambios?',
        question: '¿Cómo es la política de cambios si no me queda bien el talle?',
        answer: 'Los cambios son sin vueltas: tenés 30 días para cambiar la prenda. Podés pasar directo por nuestro local en Lanús o te enviamos la moto a tu domicilio para hacer el cambio mano a mano.',
      },
      {
        label: '¿Tienen 3 o 6 cuotas?',
        question: '¿Tienen cuotas sin interés y promociones bancarias?',
        answer: '¡Sí! Tenés 3 cuotas sin interés con todas las tarjetas bancarias, o 15% de descuento directo abonando con transferencia bancaria inmediata.',
      },
    ],
    intelligentKeywords: [
      {
        keywords: ['local', 'direccion', 'donde', 'horario'],
        answer: 'Nuestro showroom en Lanús Centro atiende de lunes a sábados de 10:00 a 20:00hs corrido.',
      },
      {
        keywords: ['catalogo', 'fotos', 'stock'],
        answer: 'Podés ver todo el stock actualizado en tiempo real con precios y fotos en nuestra tienda digital.',
      },
    ],
    fallback: '¡Gran elección! Te paso el catálogo de temporada con fotos en alta definición. ¿Querés abonar en cuotas sin interés o aprovechar el descuento en efectivo?',
  },
  {
    id: 'estetica',
    name: 'Estética & Barbería',
    icon: Scissors,
    storeName: 'Barber & Spa Studio',
    avatarText: 'BS',
    welcomeMessage: '¡Hola! 💈✂️ Asistente de turnos de Barber & Spa Studio. ¿Buscás agendar turno de corte, barba o tratamiento para esta semana?',
    presets: [
      {
        label: '¿Turnos para este sábado?',
        question: '¿Tenés algún hueco disponible para corte y barba este sábado a la tarde?',
        answer: 'El sábado a la tarde nos quedan exactamente dos lugares: 16:30hs con Nico y 18:00hs con Facu. ¿Cuál de los dos horarios te queda mejor para agendarte en el calendario?',
      },
      {
        label: '¿Qué incluye el Combo VIP?',
        question: '¿Qué incluye y cuánto sale el servicio completo de barbería?',
        answer: 'El Combo VIP ($14.000) incluye: corte fade o clásico con tijera y máquina, perfilado de barba con toalla caliente y navaja descartable, vapor de ozono y lavado con shampoo mint.',
      },
      {
        label: '¿Cómo reprogramo mi turno?',
        question: '¿Si no puedo ir cómo cancelo o cambio la fecha del turno?',
        answer: 'No te preocupes: tocando el enlace del turno que te mandamos por WhatsApp podés reprogramar en 1 clic sin llamar a nadie, y el hueco se libera automáticamente.',
      },
      {
        label: '¿Perfilado de cejas y toalla caliente?',
        question: '¿Hacen perfilado de cejas y toalla caliente con vapor?',
        answer: '¡Totalmente! Es uno de nuestros servicios estrella. Incluye exfoliación facial suave, toalla aromatizada caliente y perfilado milimétrico. Demora 20 minutos y sale $4.500.',
      },
      {
        label: '¿Aceptan Mercado Pago?',
        question: '¿Se puede pagar con Mercado Pago, QR o sólo efectivo?',
        answer: 'Aceptamos Mercado Pago, QR, transferencia bancaria, tarjetas de débito y efectivo en el salón sin recargo.',
      },
    ],
    intelligentKeywords: [
      {
        keywords: ['precio', 'corte', 'barba', 'cuanto'],
        answer: 'Precios actuales: Corte solo $9.500 / Barba con toalla caliente $7.000 / Combo VIP corte + barba $14.000.',
      },
      {
        keywords: ['donde', 'ubicacion', 'estacion'],
        answer: 'Estamos a 3 cuadras de la estación Lanús, con estacionamiento cómodo sobre la cuadra.',
      },
    ],
    fallback: '¡Perfecto! Nuestro sistema sincroniza los turnos directo con Google Calendar para que nunca se superpongan ni tengas que esperar. ¿Te anoto para esta semana?',
  },
  {
    id: 'inmobiliaria',
    name: 'Inmobiliaria & Propiedades',
    icon: Building2,
    storeName: 'Propiedades & Alquileres Lanús',
    avatarText: 'PL',
    welcomeMessage: '¡Buenas! 🏢 Asistente inmobiliario de Lanús. ¿Buscás comprar, alquilar o coordinar una tasación de tu propiedad?',
    presets: [
      {
        label: '¿Alquiler 2 amb en Lanús Centro?',
        question: '¿Tienen departamentos de 2 ambientes en alquiler cerca de la estación Lanús?',
        answer: 'Tenemos 3 opciones disponibles a menos de 4 cuadras de la estación: desde $280.000 con expensas bajas, balcón al frente y contrato por 2 años. ¿Te paso la ficha técnica con fotos y video?',
      },
      {
        label: '¿Qué garantías aceptan?',
        question: '¿Qué garantía o seguro de caución solicitan para ingresar?',
        answer: 'Aceptamos Garantía Propietaria de Bs. As. o Seguro de Caución (Finaer, Respaldar o Garantor). Los requisitos son demostración de ingresos y mes de depósito financiable en cuotas.',
      },
      {
        label: '¿Tasación presencial sin cargo?',
        question: 'Quiero vender un inmueble en Lanús Oeste, ¿cómo coordinamos tasación?',
        answer: 'Coordinamos una visita presencial sin cargo con nuestro martillero matriculado. Decime qué día de la semana te queda más cómodo y te agendo.',
      },
      {
        label: '¿Cuánto pagan de expensas?',
        question: '¿Cuánto se paga de expensas promedio en los edificios de la zona?',
        answer: 'Los departamentos de 2 ambientes en Lanús Centro promedian entre $35.000 y $55.000 según los servicios del edificio. Te entregamos la última liquidación real antes de que señes.',
      },
      {
        label: '¿Puedo visitar una propiedad mañana?',
        question: '¿Tienen horarios de visita presencial disponibles para mañana por la tarde?',
        answer: '¡Sí! Mañana tenemos visitas de 15:30 a 18:00hs. ¿Preferís que te guarde el turno de las 16:00 o las 17:00hs? Pasame tu nombre y te lo confirmo.',
      },
    ],
    intelligentKeywords: [
      {
        keywords: ['requisitos', 'ingreso', 'costo', 'comision'],
        answer: 'Para ingresar: mes de adelanto, mes de depósito y honorarios profesionales de ley. Todos los valores están detallados y transparentes.',
      },
    ],
    fallback: 'Excelente consulta. Te conecto con uno de nuestros asesores para enviarte el dossier completo del inmueble en PDF por WhatsApp. ¿Preferís que te llamemos o te escribamos?',
  },
];

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  isFunnelCard?: boolean;
}

interface AiSimulatorPlaygroundProps {
  onSelectService?: (serviceName: string) => void;
}

export const AiSimulatorPlayground: React.FC<AiSimulatorPlaygroundProps> = ({ onSelectService }) => {
  const [activeIndustryId, setActiveIndustryId] = useState<string>('gastronomia');
  const [customInput, setCustomInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [interactionCount, setInteractionCount] = useState<number>(0);
  const [funnelTriggered, setFunnelTriggered] = useState<boolean>(false);

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
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const hasUserInteractedRef = useRef<boolean>(false);

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
    setInteractionCount(0);
    setFunnelTriggered(false);
  }, [activeIndustry]);

  useEffect(() => {
    // ONLY scroll inside the chat container itself, and ONLY if the user interacted with the chat!
    // NEVER call window.scroll or scrollIntoView on mount, which would force the browser to scroll down to the chat.
    if (!hasUserInteractedRef.current) return;
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const triggerFunnelOffer = (nextCount: number) => {
    if (funnelTriggered || nextCount < 2) return;
    setFunnelTriggered(true);

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        soundFx.playSuccess();
        const funnelMsg: Message = {
          id: `funnel-${Date.now()}`,
          sender: 'bot',
          text: `💡 ¿Viste con qué rapidez y naturalidad te acabo de atender? Este no es un menú rígido de opciones: es un asistente entrenado que comprende las dudas reales de tu cliente, da precios, reserva turnos y no pierde ninguna venta fuera de hora.\n\n¿Te gustaría que Pedro te configure este mismo asistente en el WhatsApp de tu negocio esta misma semana?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFunnelCard: true,
        };
        setMessages((prev) => [...prev, funnelMsg]);
      }, 1400);
    }, 1200);
  };

  const handleSendQuestion = (questionText: string, customAnswer?: string) => {
    if (!questionText.trim() || isTyping) return;

    hasUserInteractedRef.current = true;
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

    const nextCount = interactionCount + 1;
    setInteractionCount(nextCount);

    // Realistic typing duration based on answer length (1500ms to 2400ms)
    let answer = customAnswer;
    if (!answer) {
      const lowerQ = questionText.toLowerCase();
      // Match presets
      const foundPreset = activeIndustry.presets.find((p) =>
        lowerQ.includes(p.question.toLowerCase().slice(0, 14)) ||
        p.question.toLowerCase().includes(lowerQ.slice(0, 14))
      );
      if (foundPreset) {
        answer = foundPreset.answer;
      } else {
        // Match intelligent keywords
        const foundKeyword = activeIndustry.intelligentKeywords.find((k) =>
          k.keywords.some((kw) => lowerQ.includes(kw))
        );
        answer = foundKeyword ? foundKeyword.answer : activeIndustry.fallback;
      }
    }

    const typingDuration = Math.min(2400, Math.max(1400, answer.length * 8));

    setTimeout(() => {
      setIsTyping(false);
      soundFx.playTick();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: answer || activeIndustry.fallback,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Check if sales funnel should activate
      triggerFunnelOffer(nextCount);
    }, typingDuration);
  };

  const handleConvertLead = () => {
    soundFx.playSuccess();
    if (onSelectService) {
      onSelectService(`Asistente Inteligente con IA para ${activeIndustry.name} - Probado en simulador`);
    }
  };

  return (
    <section id="simulador-ia" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0f1219] border-t border-slate-200 dark:border-[#1e2332] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-100 dark:bg-[#161a25] border border-slate-200 dark:border-[#272d3e] rounded-full text-xs font-mono text-[#FF4500] dark:text-[#FF8C00] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4500]" />
            <span>Simulador en Tiempo Real sin Respuestas Rígidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Probá cómo atendería la IA en tu rubro comercial
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-[#9da4b6] leading-relaxed">
            Elegí tu sector, tocá una de las preguntas reales de clientes o escribí lo que quieras. Mirá los lapsos de escritura natural y cómo resuelve cada situación comercial:
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
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4500] to-[#FF8C00] flex items-center justify-center font-bold text-white shadow-xs">
                {activeIndustry.avatarText}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-none">{activeIndustry.storeName}</h4>
                <p className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>IA OndiGu en línea 24/7 // Atendiendo en Lanús</span>
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700">
              <Bot className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>Simulador Activo</span>
            </div>
          </div>

          {/* Preset question chips */}
          <div className="px-4 py-3 bg-slate-100 dark:bg-[#161a26] border-b border-slate-200 dark:border-slate-800/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Preguntas reales frecuentes (hacé clic para probar la respuesta):
              </span>
              <span className="text-[10px] font-mono text-[#FF4500] dark:text-[#FF8C00]">
                5 opciones reales
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {activeIndustry.presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendQuestion(preset.question, preset.answer)}
                  disabled={isTyping}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1d2333] hover:bg-orange-50 dark:hover:bg-[#252d42] border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-[#FF4500]/60 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Area */}
          <div ref={chatScrollRef} className="p-4 sm:p-6 space-y-4 h-[350px] overflow-y-auto bg-slate-50/50 dark:bg-[#0e1118]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#FF4500] to-[#FF8C00] text-white rounded-br-none'
                      : msg.isFunnelCard
                      ? 'bg-gradient-to-br from-slate-900 to-[#181e2b] text-white border-2 border-[#FF4500] rounded-bl-none shadow-[0_0_25px_rgba(255,69,0,0.3)]'
                      : 'bg-white dark:bg-[#1a202d] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#273044] rounded-bl-none'
                  }`}
                >
                  {msg.isFunnelCard ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#FF8C00] font-bold text-xs">
                        <Flame className="w-4 h-4 fill-[#FF8C00]" />
                        <span>EMBUDO DE CONVERSIÓN EN VIVO</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                      <div className="pt-2 flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={handleConvertLead}
                          className="w-full py-2.5 px-4 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] hover:brightness-110 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 fill-white" />
                          <span>Quiero este bot para mi negocio</span>
                        </button>
                        <a
                          href={`https://wa.me/5491100000000?text=${encodeURIComponent(`Hola Pedro! Probé el bot simulador para ${activeIndustry.name} en la web de OndiGu y quiero implementarlo en mi WhatsApp.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp directo</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line">{msg.text}</p>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 px-1 flex items-center gap-1">
                  {msg.time}
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                </span>
              </div>
            ))}

            {/* REALISTIC TYPING INDICATOR WITH HUMAN CADENCE */}
            {isTyping && (
              <div className="flex items-center gap-2 bg-white dark:bg-[#1a202d] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs px-4 py-3 rounded-2xl rounded-bl-none w-fit shadow-xs animate-in fade-in duration-200">
                <div className="w-5 h-5 rounded-full bg-[#FF4500]/20 text-[#FF4500] flex items-center justify-center text-[10px] font-bold">
                  IA
                </div>
                <span className="text-xs font-medium">Escribiendo respuesta...</span>
                <div className="flex items-center gap-1 ml-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-bounce" />
                </div>
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
              placeholder={`Escribí cualquier consulta real como cliente de ${activeIndustry.name}...`}
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

          {/* Bottom Bar: Permanent CTA to implement bot */}
          <div className="bg-slate-100 dark:bg-[#10131c] px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-600 dark:text-slate-400 text-center sm:text-left flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>Instalación llave en mano en 48hs hábiles para tu comercio en Lanús o GBA</span>
            </span>
            <button
              type="button"
              onClick={handleConvertLead}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#FF4500] to-[#FF8C00] text-white font-bold rounded-lg hover:brightness-110 transition-all cursor-pointer text-xs shrink-0 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Solicitar este asistente para mi negocio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
