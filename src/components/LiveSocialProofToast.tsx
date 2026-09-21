import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Sparkles, ShoppingBag, Bot, Calendar, Globe } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface SocialEvent {
  id: string;
  business: string;
  rubro: string;
  location: string;
  action: string;
  timeAgo: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const RECENT_EVENTS: SocialEvent[] = [
  {
    id: 'ev-1',
    business: 'Barbería La Cueva',
    rubro: 'Estética masculina',
    location: 'Lanús Oeste',
    action: 'activó su Bot de WhatsApp con IA 24hs',
    timeAgo: 'hace 4 min',
    icon: Bot,
    iconColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
  },
  {
    id: 'ev-2',
    business: 'Pizzería Napolitana',
    rubro: 'Gastronomía',
    location: 'Banfield',
    action: 'contrató Landing Express 24hs para catálogo de delivery',
    timeAgo: 'hace 18 min',
    icon: ShoppingBag,
    iconColor: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
  },
  {
    id: 'ev-3',
    business: 'Estudio Morales & Asoc.',
    rubro: 'Servicios Contables',
    location: 'Avellaneda',
    action: 'agendó videollamada para rediseño web corporativo',
    timeAgo: 'hace 35 min',
    icon: Calendar,
    iconColor: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
  },
  {
    id: 'ev-4',
    business: 'Taller Mecánico San Martín',
    rubro: 'Automotor',
    location: 'Lanús Este',
    action: 'optimizó su Ficha de Google Maps Lanús & SEO Local',
    timeAgo: 'hace 1 hora',
    icon: Sparkles,
    iconColor: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
  },
  {
    id: 'ev-5',
    business: 'Estética & Spa Bella Donna',
    rubro: 'Salud y Bienestar',
    location: 'Quilmes',
    action: 'descargó presupuesto oficial para Turnero Digital',
    timeAgo: 'hace 2 horas',
    icon: Globe,
    iconColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  },
];

export const LiveSocialProofToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (dismissed) return;

    // Initial appearance after 8 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    // Periodic cycling: shows for 6s, rests for 14s
    const cycleInterval = setInterval(() => {
      setIsVisible(true);
      setCurrentIndex((prev) => (prev + 1) % RECENT_EVENTS.length);

      // Hide after 6.5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 6500);
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleInterval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const currentEvent = RECENT_EVENTS[currentIndex];
  const IconComponent = currentEvent.icon;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-40 pointer-events-none max-w-[360px] w-full">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border border-slate-200/80 dark:border-[#252c3f] rounded-2xl p-3.5 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex items-start gap-3">
              {/* Event Icon */}
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${currentEvent.iconColor}`}
              >
                <IconComponent className="w-4 h-4" />
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {currentEvent.business}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Verificado" />
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 ml-auto shrink-0">
                    {currentEvent.timeAgo}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {currentEvent.action}
                </p>

                <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{currentEvent.location}</span>
                  <span>•</span>
                  <span>{currentEvent.rubro}</span>
                </div>
              </div>

              {/* Close / Dismiss */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setIsVisible(false);
                  setDismissed(true);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 -mr-1 -mt-1 cursor-pointer rounded-full"
                aria-label="Cerrar notificación"
                title="Cerrar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
