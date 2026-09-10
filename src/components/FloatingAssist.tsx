import React, { useState, useRef, useEffect } from 'react';
import { BRAND_INFO, QUICK_QUESTIONS } from '../data/content';
import { ChatMessage } from '../types';
import { MessageSquare, Send, X, Bot, Sparkles, ArrowRight } from 'lucide-react';

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
      {/* Floating Buttons Stack: Assistant trigger */}
      <aside aria-label="Canales de contacto y asistencia" className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Predefined Answers Bot Button */}
        <button
          id="floating-bot-trigger"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir asistente OndiGu"
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#181a22] hover:bg-[#20232e] text-white border border-[#2e3343] hover:border-[#FF4500]/60 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-[#FF4500]/20 flex items-center justify-center text-[#FF8C00]">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide">
            {isOpen ? 'Cerrar asistente' : 'Preguntas frecuentes & Asistente'}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
        </button>
      </aside>

      {/* Bot Window / Chat Overlay */}
      {isOpen && (
        <div
          id="floating-chat-window"
          className="fixed bottom-28 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[80vh] bg-[#151821] border border-[#282d3d] shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex flex-col rounded-lg overflow-hidden animate-in fade-in duration-200"
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
