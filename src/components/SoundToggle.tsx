import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(soundFx.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = soundFx.toggle();
    setEnabled(newState);
  };

  return (
    <button
      id="global-sound-toggle-btn"
      type="button"
      onClick={handleToggle}
      aria-label={enabled ? 'Desactivar efectos de sonido' : 'Activar efectos de sonido'}
      title={enabled ? 'Sonido UI: Activo (Clic para silenciar)' : 'Sonido UI: Silenciado (Clic para activar sonido háptico)'}
      className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
        enabled
          ? 'bg-orange-50 dark:bg-orange-950/40 text-[#FF4500] border-orange-200 dark:border-orange-800/60 shadow-xs'
          : 'bg-slate-100 dark:bg-[#181a22] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-[#2a2e3b] hover:text-slate-800 dark:hover:text-slate-200'
      }`}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-[#FF4500] animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 opacity-75" />
      )}
    </button>
  );
};
