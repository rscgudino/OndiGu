import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showWordmark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    hero: 'w-24 h-24 md:w-32 md:h-32',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    hero: 'text-4xl md:text-6xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Stylized G transforming into an energy signal / wave of light */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Energy Gradient */}
            <linearGradient id="ondiguEnergyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FF8C00" />
              <stop offset="85%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#FF4500" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="ondiguWaveGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FF8C00" />
              <stop offset="50%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
            </linearGradient>

            <filter id="ondiguGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background subtle guide ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="#1a1a1a"
            strokeWidth="2"
            strokeDasharray="4 6"
          />

          {/* Stylized "G" glyph */}
          {/* Top arc & backbone curve */}
          <path
            d="M 68 30 C 58 18, 38 18, 26 30 C 14 42, 14 62, 26 74 C 38 86, 62 86, 74 74 C 82 66, 84 56, 82 48 L 48 48"
            stroke="url(#ondiguEnergyGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ondiguGlow)"
          />

          {/* Signal wave emitting from the inner crossbar of G outwards */}
          <path
            d="M 52 48 Q 62 38, 72 48 T 92 48 T 108 48"
            stroke="url(#ondiguWaveGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Core focal pulse point where the G turns into signal */}
          <circle cx="50" cy="48" r="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="48" r="8" stroke="#FF8C00" strokeWidth="1.5" opacity="0.75" />
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col">
          <span className={`font-brand font-black tracking-[-0.04em] text-white leading-none ${textSizes[size]}`}>
            Ondi<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FF4500]">Gu</span>
          </span>
          {size !== 'sm' && (
            <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#8b91a0] font-semibold mt-1">
              Tecnología con onda
            </span>
          )}
        </div>
      )}
    </div>
  );
};
