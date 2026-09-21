import React, { useState, useRef, useEffect } from 'react';
import { BRAND_INFO, QUICK_QUESTIONS } from '../data/content';
import { ChatMessage } from '../types';
import { 
  Send, 
  X, 
  Bot, 
  ArrowRight, 
  MessageCircle, 
  HelpCircle, 
  ListOrdered, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface ExtendedChatMessage extends ChatMessage {
  contextQuestion?: string;
  whatsappUrl?: string;
}

// Mini Robot Face component with animated LED eyes and antenna
const MiniRobotHead: React.FC<{ color: 'green' | 'blue' | 'orange' }> = ({ color }) => {
  const eyeColor = color === 'green' ? 'bg-emerald-300' : color === 'blue' ? 'bg-cyan-300' : 'bg-amber-300';
  const glow = color === 'green' ? 'shadow-[0_0_8px_#25D366]' : color === 'blue' ? 'shadow-[0_0_8px_#2AABEE]' : 'shadow-[0_0_8px_#FF8C00]';

  return (
    <div className="relative flex flex-col items-center justify-center scale-90 sm:scale-100">
      {/* Antenna with pulsing beacon */}
      <div className="flex flex-col items-center -mt-1.5 mb-0.5">
        <span className={`w-1.5 h-1.5 rounded-full ${eyeColor} ${glow} animate-ping`} />
        <span className="w-[1.5px] h-1.5 bg-white" />
      </div>

      {/* Cyber Robot Head Box */}
      <div className="w-6 h-5 rounded-md bg-slate-950/90 border border-white flex flex-col items-center justify-center p-0.5 shadow-md">
        {/* Dual LED Eyes */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={`w-1 h-1 rounded-full ${eyeColor} ${glow} animate-pulse`} />
          <span className={`w-1 h-1 rounded-full ${eyeColor} ${glow} animate-pulse`} />
        </div>
        {/* Digital Mouth / Sound Wave */}
        <div className="flex items-center gap-0.5">
          <span className="w-0.5 h-1 bg-white/70 rounded-xs" />
          <span className="w-0.5 h-1.5 bg-white rounded-xs" />
          <span className="w-0.5 h-1 bg-white/70 rounded-xs" />
        </div>
      </div>
    </div>
  );
};

// Explosion particles bursting outwards
const ExplosionSparks: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
    <div className="absolute -inset-3 rounded-full border-2 border-white animate-ping opacity-90" />
    <div className="absolute -inset-1 rounded-full bg-white/50 blur-xs animate-pulse" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
      <span
        key={i}
        style={{
          transform: `rotate(${deg}deg) translate(20px)`,
        }}
        className="absolute w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_10px_#FFF] animate-ping"
      />
    ))}
  </div>
);

export const FloatingAssist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'faq'>('chat');
  const [isRobotMode, setIsRobotMode] = useState<boolean>(false);
  const [isExploding, setIsExploding] = useState<boolean>(false);

  // Periodic explosion & transformation to mini-robot
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExploding(true);
      soundFx.playSuccess();

      // Trigger explosion burst
      setTimeout(() => {
        setIsRobotMode((prev) => !prev);
        setIsExploding(false);
      }, 450);
    }, 5500);

    return () => clearInterval(interval);
  }, []);
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: '¡Hola! Soy el asistente inteligente de OndiGu. Tocá cualquiera de las 10 preguntas frecuentes de la lista o escribime tu consulta y te respondo al instante.',
      timestamp: 'Ahora',
      whatsappUrl: BRAND_INFO.whatsappUrl,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab, loading]);

  const handleQuickQuestion = (qId: string) => {
    const q = QUICK_QUESTIONS.find((item) => item.id === qId);
    if (!q || loading) return;

    // 1. Immediately post the user question
    const userMsg: ExtendedChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: q.question,
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setActiveTab('chat');
    setLoading(true);

    // Build specific WhatsApp URL with question topic
    const waUrl = `https://wa.me/5491100000000?text=${encodeURIComponent(
      `Hola OndiGu! Estuve consultando en la web sobre: "${q.question}" y quisiera asesoramiento para mi negocio.`
    )}`;

    // 2. Realistic delay (1.9s) simulating typing before showing the answer
    setTimeout(() => {
      const botReply: ExtendedChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: q.answer,
        timestamp: 'Ahora',
        contextQuestion: q.question,
        whatsappUrl: waUrl,
        actionPrompt: {
          label: 'Pedir presupuesto en la web',
          type: 'contact',
        },
      };

      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 1900);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text || loading) return;

    const userMsg: ExtendedChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setActiveTab('chat');
    setLoading(true);

    const startTime = Date.now();
    const waUrl = `https://wa.me/5491100000000?text=${encodeURIComponent(
      `Hola OndiGu! Consulta desde la web: "${text}".`
    )}`;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const reply = data.reply || '¡Gracias por tu consulta! Podés pedir tu presupuesto en el formulario o escribirnos directamente a WhatsApp.';

      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 1900 - elapsed);

      setTimeout(() => {
        const botMsg: ExtendedChatMessage = {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: reply,
          timestamp: 'Ahora',
          contextQuestion: text,
          whatsappUrl: waUrl,
          actionPrompt: {
            label: 'Pedir presupuesto',
            type: 'contact',
          },
        };

        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
      }, delay);
    } catch (err) {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 1900 - elapsed);

      setTimeout(() => {
        const fallbackMsg: ExtendedChatMessage = {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: 'En OndiGu desarrollamos sitios web, tiendas y automatizaciones a medida. Escribinos directamente por WhatsApp para coordinar tu propuesta sin vueltas.',
          timestamp: 'Ahora',
          contextQuestion: text,
          whatsappUrl: waUrl,
          actionPrompt: {
            label: 'Pedir presupuesto',
            type: 'contact',
          },
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        setLoading(false);
      }, delay);
    }
  };

  return (
    <>
      {/* Revolver Floating Dock: 3 orbiting channels rotating automatically */}
      <aside
        id="revolver-dock-container"
        aria-label="Canales de contacto y asistente en tambor giratorio tipo revólver"
        className="fixed bottom-5 right-4 sm:right-6 z-50 pointer-events-auto revolver-hover-pause select-none"
      >
        {/* Main Revolver Circular Drum */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
          {/* Outer Titanium Revolver Cylinder Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#1c202c]/95 via-[#10121a]/95 to-[#08090d]/95 border-2 border-[#2b3142] shadow-[0_10px_35px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.1)] backdrop-blur-md">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute top-1/4 left-1.5 w-1 h-2 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute top-1/4 right-1.5 w-1 h-2 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute bottom-1/4 left-1.5 w-1 h-2 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute bottom-1/4 right-1.5 w-1 h-2 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute inset-3 rounded-full border border-dashed border-[#FF4500]/25 pointer-events-none" />
          </div>

          {/* Central Extractor Axis */}
          <div className="absolute z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#1b1f2b] to-[#0c0e14] border border-[#FF4500]/70 shadow-[0_0_15px_rgba(255,69,0,0.4)] flex items-center justify-center pointer-events-none">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF4500] flex items-center justify-center animate-pulse shadow-[0_0_8px_#FF4500]">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Orbiting Ring with 3 Revolver Chambers */}
          <div className="absolute inset-0 animate-revolver-spin">
            {/* 1. WHATSAPP */}
            <div
              className="absolute left-1/2 top-[18px] -translate-x-1/2 -translate-y-1/2"
              title="Abrir WhatsApp OndiGu"
            >
              <div className="animate-revolver-counter">
                <a
                  id="revolver-whatsapp-btn"
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                  className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_0_14px_rgba(37,211,102,0.55)] border-2 border-emerald-300/40 hover:scale-115 hover:border-white transition-all cursor-pointer ${
                    isExploding ? 'scale-125 brightness-150 animate-ping' : ''
                  }`}
                >
                  {isExploding && <ExplosionSparks />}
                  {isRobotMode ? (
                    <MiniRobotHead color="green" />
                  ) : (
                    <MessageCircle className="w-5 h-5 fill-white text-white drop-shadow" />
                  )}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a0c10] text-[#25D366] text-[10px] font-bold tracking-wider rounded border border-[#25D366]/40 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {isRobotMode ? '🤖 WhatsApp Bot' : 'WhatsApp'}
                  </span>
                </a>
              </div>
            </div>

            {/* 2. TELEGRAM */}
            <div
              className="absolute left-[calc(50%+38px)] sm:left-[calc(50%+42px)] top-[calc(50%+22px)] sm:top-[calc(50%+25px)] -translate-x-1/2 -translate-y-1/2"
              title="Abrir canal o chat de Telegram"
            >
              <div className="animate-revolver-counter">
                <a
                  id="revolver-telegram-btn"
                  href={BRAND_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir canal de Telegram"
                  className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#1B87BC] to-[#2AABEE] text-white flex items-center justify-center shadow-[0_0_14px_rgba(42,171,238,0.55)] border-2 border-sky-300/40 hover:scale-115 hover:border-white transition-all cursor-pointer ${
                    isExploding ? 'scale-125 brightness-150 animate-ping' : ''
                  }`}
                >
                  {isExploding && <ExplosionSparks />}
                  {isRobotMode ? (
                    <MiniRobotHead color="blue" />
                  ) : (
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.63 3.73-.53.36-1.02.54-1.45.53-.48-.01-1.4-.27-2.09-.49-.84-.27-1.51-.42-1.45-.88.03-.24.38-.49 1.04-.75 4.09-1.78 6.82-2.96 8.19-3.54 3.9-1.63 4.72-1.91 5.25-1.92.12 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.21 0 .26z" />
                    </svg>
                  )}
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a0c10] text-[#2AABEE] text-[10px] font-bold tracking-wider rounded border border-[#2AABEE]/40 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {isRobotMode ? '🤖 Telegram Bot' : 'Telegram'}
                  </span>
                </a>
              </div>
            </div>

            {/* 3. PREGUNTAS FRECUENTES & ASISTENTE */}
            <div
              className="absolute left-[calc(50%-38px)] sm:left-[calc(50%-42px)] top-[calc(50%+22px)] sm:top-[calc(50%+25px)] -translate-x-1/2 -translate-y-1/2"
              title="Preguntas frecuentes & Asistente IA"
            >
              <div className="animate-revolver-counter">
                <button
                  id="revolver-assist-btn"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Abrir asistente de preguntas frecuentes"
                  className={`group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#FF4500] to-[#FF8C00] text-white flex items-center justify-center shadow-[0_0_16px_rgba(255,69,0,0.65)] border-2 border-amber-300/50 hover:scale-115 hover:border-white transition-all cursor-pointer ${
                    isExploding ? 'scale-125 brightness-150 animate-ping' : ''
                  }`}
                >
                  {isExploding && <ExplosionSparks />}
                  {isRobotMode ? (
                    <MiniRobotHead color="orange" />
                  ) : (
                    <>
                      <Bot className="w-5 h-5 text-white drop-shadow" />
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-white border border-[#FF4500] animate-ping" />
                    </>
                  )}
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a0c10] text-[#FF8C00] text-[10px] font-bold tracking-wider rounded border border-[#FF8C00]/40 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {isOpen ? 'Cerrar Bot' : isRobotMode ? '🤖 Cyber Asistente' : 'Asistente & FAQ'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Bot Window / Chat Overlay */}
      {isOpen && (
        <div
          id="floating-chat-window"
          className="fixed bottom-40 sm:bottom-44 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[550px] max-h-[80vh] bg-[#151821] border border-[#282d3d] shadow-[0_16px_50px_rgba(0,0,0,0.95)] flex flex-col rounded-2xl overflow-hidden animate-in fade-in duration-200 backdrop-blur-md"
        >
          {/* Header with Branding and Close Button */}
          <div className="bg-[#1a1d27] px-4 py-3 border-b border-[#242836] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4500] to-[#FF8C00] flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,69,0,0.4)]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-brand font-bold text-white leading-none">
                  Asistente Ondi<span className="text-[#FF8C00]">Gu</span>
                </h4>
                <span className="text-[10px] text-[#FF8C00] font-mono flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  En línea • 10 Preguntas & IA
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#888888] hover:text-white rounded-lg hover:bg-[#202430] transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs: Chat vs 10 Preguntas List */}
          <div className="bg-[#10121a] px-3 pt-2 pb-0 border-b border-[#222634] flex gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-t-lg transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#151821] text-[#FF8C00] border-t-2 border-[#FF4500]'
                  : 'text-[#8c92a4] hover:text-white hover:bg-[#161922]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat en Vivo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-t-lg transition-all ${
                activeTab === 'faq'
                  ? 'bg-[#151821] text-[#FF8C00] border-t-2 border-[#FF4500]'
                  : 'text-[#8c92a4] hover:text-white hover:bg-[#161922]'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>10 Preguntas FAQ</span>
              <span className="px-1.5 py-0.2 bg-[#FF4500]/20 text-[#FF8C00] text-[10px] font-mono rounded font-bold">
                10
              </span>
            </button>
          </div>

          {/* TAB 1: Chat View */}
          {activeTab === 'chat' ? (
            <>
              {/* Quick horizontal strip with direct access to the 10 questions */}
              <div className="px-3 py-2 bg-[#12141c] border-b border-[#202430] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab('faq')}
                  className="shrink-0 px-2 py-1 text-[10px] font-mono font-bold text-[#FF8C00] bg-[#FF8C00]/10 border border-[#FF8C00]/30 rounded-full hover:bg-[#FF8C00]/20 transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <ListOrdered className="w-3 h-3" />
                  <span>Ver las 10 en lista</span>
                </button>
                {QUICK_QUESTIONS.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleQuickQuestion(item.id)}
                    className="shrink-0 px-2.5 py-1 text-[11px] font-medium text-[#c0c0c0] hover:text-white bg-[#1c202a] hover:bg-[#252936] border border-[#282d3d] hover:border-[#FF8C00]/40 rounded-full transition-colors whitespace-nowrap"
                  >
                    {item.question}
                  </button>
                ))}
              </div>

              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-[#0e1017]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] px-3.5 py-2.5 text-xs sm:text-sm rounded-xl leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#FF4500] text-white rounded-br-none'
                          : 'bg-[#181b25] text-[#e0e2eb] border border-[#272c3b] rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Bot Message Actions: WhatsApp Redirection + Budget */}
                    {msg.sender === 'bot' && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {/* Redirigir a WhatsApp Button */}
                        <a
                          href={msg.whatsappUrl || BRAND_INFO.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-lg transition-all shadow-md active:scale-95"
                          title="Continuar esta consulta directo por WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                          <span>Continuar por WhatsApp</span>
                        </a>

                        {/* Secondary Button */}
                        <a
                          href="#contacto"
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-[#c0c4d0] hover:text-white bg-[#1c202a] hover:bg-[#262b3a] border border-[#2b3142] rounded-lg transition-colors"
                        >
                          <span>Presupuesto web</span>
                          <ArrowRight className="w-3 h-3 text-[#FF8C00]" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator with Realistic Seconds Delay */}
                {loading && (
                  <div className="flex items-center gap-2.5 text-xs text-[#c7cbd6] px-3.5 py-2.5 bg-[#181b25] rounded-xl border border-[#272c3b] max-w-[85%] shadow-sm animate-in fade-in duration-150">
                    <div className="w-6 h-6 rounded-full bg-[#FF4500]/20 flex items-center justify-center text-[#FF8C00] shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white">OndiGu</span>
                      <span className="text-[#8e94a5]">está escribiendo</span>
                      <div className="flex items-center gap-1 ml-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-[#151821] border-t border-[#202430] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribí tu consulta aquí..."
                  className="flex-1 bg-[#1c202a] border border-[#2a2f3f] focus:border-[#FF4500] focus:outline-none text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition-colors placeholder:text-[#6a7185]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || loading}
                  aria-label="Enviar mensaje"
                  className="p-2.5 text-white bg-[#FF4500] hover:bg-[#e03d00] disabled:opacity-40 rounded-xl transition-colors cursor-pointer shadow-sm active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            /* TAB 2: Full List of 10 Predefined Questions */
            <div className="flex-1 overflow-y-auto p-3.5 bg-[#0e1017] space-y-2.5">
              <div className="mb-2 px-1">
                <p className="text-xs text-[#9aa0b2] leading-relaxed">
                  Tocá cualquier pregunta de la lista para ver su respuesta en el chat y continuar tu consulta personalizada por WhatsApp:
                </p>
              </div>

              {QUICK_QUESTIONS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleQuickQuestion(item.id)}
                  className="w-full text-left p-3 rounded-xl bg-[#161924] hover:bg-[#1e2332] border border-[#262c3d] hover:border-[#FF8C00]/50 transition-all flex items-start gap-3 group active:scale-[0.99] cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#202535] text-[#FF8C00] font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-[#2d344a] group-hover:bg-[#FF4500] group-hover:text-white transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FF8C00] transition-colors leading-snug">
                      {item.question}
                    </h5>
                    <p className="text-[11px] text-[#81879a] mt-1 line-clamp-1">
                      {item.answer}
                    </p>
                  </div>
                  <div className="p-1 rounded-md text-[#788094] group-hover:text-[#FF8C00] group-hover:translate-x-0.5 transition-all shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
