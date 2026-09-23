import React from 'react';

export interface IPCLogoProps {
  variant?: 'light' | 'dark' | 'header';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'header';
  showTagline?: boolean;
  showText?: boolean;
  className?: string;
  badgeOnly?: boolean;
}

export const IPCLogo: React.FC<IPCLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  showText,
  className = '',
  badgeOnly,
}) => {
  const isLight = variant === 'light' || variant === 'header';

  // Sizing configurations
  const sizeConfig = {
    sm: { emblemSize: 48, textClass: 'text-xs', subClass: 'text-[8px]', defaultShowText: true },
    header: { emblemSize: 64, textClass: 'text-sm sm:text-base', subClass: 'text-[9px] sm:text-[10px]', defaultShowText: true },
    md: { emblemSize: 72, textClass: 'text-base sm:text-lg', subClass: 'text-[10px] sm:text-[11px]', defaultShowText: true },
    lg: { emblemSize: 96, textClass: 'text-xl sm:text-2xl', subClass: 'text-xs', defaultShowText: true },
    xl: { emblemSize: 140, textClass: 'text-2xl sm:text-3xl', subClass: 'text-sm', defaultShowText: false },
    '2xl': { emblemSize: 200, textClass: 'text-3xl sm:text-4xl', subClass: 'text-base', defaultShowText: false },
  }[size] || { emblemSize: 72, textClass: 'text-base', subClass: 'text-[10px]', defaultShowText: true };

  const shouldShowText = badgeOnly ? false : (showText !== undefined ? showText : (size === 'xl' || size === '2xl' ? false : true));

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Uploaded Logo Image */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{ width: sizeConfig.emblemSize, height: sizeConfig.emblemSize }}
      >
        <img
          src="/ipc-new-logo.png"
          alt="Indian Paratha Company Logo"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>

      {/* Accompanying Brand Typography (Optional) */}
      {shouldShowText && (
        <div className="flex flex-col text-left leading-none justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`tracking-wide font-extrabold uppercase ${sizeConfig.textClass} ${
                isLight ? 'text-[var(--text-primary)]' : 'text-[var(--color-navy)]'
              }`}
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Indian Paratha
            </span>
            <span 
              className="text-[#e41c24] font-black text-xs sm:text-sm tracking-widest"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              CO.
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-sans tracking-[0.2em] uppercase font-semibold mt-1 ${sizeConfig.subClass} ${
                isLight ? 'text-[#e41c24]' : 'text-[#0b1b30]'
              }`}
            >
              Chai, Paratha & More
            </span>
          )}
        </div>
      )}
    </div>
  );
};
