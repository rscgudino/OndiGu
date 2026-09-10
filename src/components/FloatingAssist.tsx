import React, { useState, useRef, useEffect } from 'react';
import { BRAND_INFO, QUICK_QUESTIONS } from '../data/content';
import { ChatMessage } from '../types';
import { MessageSquare, Send, X, Bot, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

export const FloatingAssist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: '¡Hola! Soy el asistente de OndiGu. Conectamos negocios con tecnología inteligente (Web + IA + Automatización). Podés tocar una de las preguntas frecuentes abajo o escribirme tu consulta.',
      timestamp: 'Ahora',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleQuickQuestion = (qId: string) => {
    const q = QUICK_QUESTIONS.find((item) => item.id === qId);
    if (!q) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: q.question,
      timestamp: 'Ahora',
    };

    const botReply: ChatMessage = {
      id: String(Date.now() + 1),
      sender: 'bot',
      text: q.answer,
      timestamp: 'Ahora',
      actionPrompt: {
        label: 'Pedir presupuesto sin compromiso',
        type: 'contact',
      },
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: 'Ahora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const reply = data.reply || '¡Gracias por tu consulta! Podés pedir tu presupuesto en el formulario de la página.';

      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: reply,
        timestamp: 'Ahora',
        actionPrompt: {
          label: 'Pedir presupuesto',
          type: 'contact',
        },
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: 'En OndiGu desarrollamos sitios web, tiendas y automatizaciones a medida. Podés completar el formulario de cotización para coordinar una propuesta sin vueltas.',
        timestamp: 'Ahora',
        actionPrompt: {
          label: 'Pedir presupuesto',
          type: 'contact',
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
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
            {/* 6 Decorative Revolver Cylinder Chambers Notches */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute top-1/4 left-1.5 w-1 h-2 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute top-1/4 right-1.5 w-1 h-2 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute bottom-1/4 left-1.5 w-1 h-2 bg-[#3a4154] rounded-full opacity-60" />
            <div className="absolute bottom-1/4 right-1.5 w-1 h-2 bg-[#3a4154] rounded-full opacity-60" />

            {/* Subtle orbital track line */}
            <div className="absolute inset-3 rounded-full border border-dashed border-[#FF4500]/25 pointer-events-none" />
          </div>

          {/* Central Extractor Axis / Core */}
          <div className="absolute z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#1b1f2b] to-[#0c0e14] border border-[#FF4500]/70 shadow-[0_0_15px_rgba(255,69,0,0.4)] flex items-center justify-center pointer-events-none">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF4500] flex items-center justify-center animate-pulse shadow-[0_0_8px_#FF4500]">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Orbiting Ring with 3 Revolver Chambers (Automatically Spinning) */}
          <div className="absolute inset-0 animate-revolver-spin">
            {/* 1. WHATSAPP (Position: Top / 0°) */}
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
                  className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_0_14px_rgba(37,211,102,0.55)] border-2 border-emerald-300/40 hover:scale-115 hover:border-white transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white drop-shadow" />
                  
                  {/* Floating tooltip */}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a0c10] text-[#25D366] text-[10px] font-bold tracking-wider rounded border border-[#25D366]/40 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>

            {/* 2. TELEGRAM (Position: Bottom Right / 120°) */}
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
                  className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#1B87BC] to-[#2AABEE] text-white flex items-center justify-center shadow-[0_0_14px_rgba(42,171,238,0.55)] border-2 border-sky-300/40 hover:scale-115 hover:border-white transition-all cursor-pointer"
                >
                  {/* Authentic Telegram Paper Plane Icon */}
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.63 3.73-.53.36-1.02.54-1.45.53-.48-.01-1.4-.27-2.09-.49-.84-.27-1.51-.42-1.45-.88.03-.24.38-.49 1.04-.75 4.09-1.78 6.82-2.96 8.19-3.54 3.9-1.63 4.72-1.91 5.25-1.92.12 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.21 0 .26z" />
                  </svg>

                  {/* Floating tooltip */}
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a0c10] text-[#2AABEE] text-[10px] font-bold tracking-wider rounded border border-[#2AABEE]/40 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Telegram
                  </span>
                </a>
              </div>
            </div>

            {/* 3. PREGUNTAS FRECUENTES & ASISTENTE (Position: Bottom Left / 240°) */}
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
                  className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#FF4500] to-[#FF8C00] text-white flex items-center justify-center shadow-[0_0_16px_rgba(255,69,0,0.65)] border-2 border-amber-300/50 hover:scale-115 hover:border-white transition-all cursor-pointer"
                >
                  <Bot className="w-5 h-5 text-white drop-shadow" />
                  
                  {/* Status Indicator inside chamber */}
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-white border border-[#FF4500] animate-ping" />

                  {/* Floating tooltip */}
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a0c10] text-[#FF8C00] text-[10px] font-bold tracking-wider rounded border border-[#FF8C00]/40 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {isOpen ? 'Cerrar Bot' : 'Asistente & FAQ'}
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
          className="fixed bottom-40 sm:bottom-44 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[75vh] bg-[#151821] border border-[#282d3d] shadow-[0_16px_50px_rgba(0,0,0,0.9)] flex flex-col rounded-xl overflow-hidden animate-in fade-in duration-200 backdrop-blur-md"
        >
          {/* Header */}
          <div className="bg-[#1a1d27] px-4 py-3.5 border-b border-[#242836] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#FF4500]/20 flex items-center justify-center text-[#FF8C00]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-brand font-bold text-white leading-none">
                  Asistente Ondi<span className="text-[#FF8C00]">Gu</span>
                </h4>
                <span className="text-[10px] text-[#FF8C00] font-mono">
                  Respuestas inmediatas & IA
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#888888] hover:text-white rounded hover:bg-[#202430]"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3.5 py-2.5 bg-[#13151d] border-b border-[#202430] flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_QUESTIONS.map((item) => (
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0f1218]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-xs sm:text-sm rounded-lg leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF4500] text-white rounded-br-none'
                      : 'bg-[#191c25] text-[#e0e2eb] border border-[#272c3b] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.actionPrompt && (
                  <div className="mt-2 flex gap-2">
                    <a
                      href="#contacto"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] rounded transition-colors"
                    >
                      <span>{msg.actionPrompt.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#888888] italic px-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF8C00] animate-spin" />
                <span>OndiGu está escribiendo...</span>
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
              placeholder="Escribí una pregunta aquí..."
              className="flex-1 bg-[#1c202a] border border-[#2a2f3f] focus:border-[#FF4500] focus:outline-none text-white text-xs sm:text-sm px-3.5 py-2.5 rounded transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              aria-label="Enviar mensaje"
              className="p-2.5 text-white bg-[#FF4500] hover:bg-[#e03d00] disabled:opacity-40 rounded transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
