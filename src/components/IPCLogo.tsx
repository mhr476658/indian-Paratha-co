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
    sm: { emblemSize: 38, textClass: 'text-xs', subClass: 'text-[8px]', defaultShowText: true },
    header: { emblemSize: 46, textClass: 'text-sm sm:text-base', subClass: 'text-[9px] sm:text-[10px]', defaultShowText: true },
    md: { emblemSize: 56, textClass: 'text-base sm:text-lg', subClass: 'text-[10px] sm:text-[11px]', defaultShowText: true },
    lg: { emblemSize: 84, textClass: 'text-xl sm:text-2xl', subClass: 'text-xs', defaultShowText: true },
    xl: { emblemSize: 130, textClass: 'text-2xl sm:text-3xl', subClass: 'text-sm', defaultShowText: false },
    '2xl': { emblemSize: 180, textClass: 'text-3xl sm:text-4xl', subClass: 'text-base', defaultShowText: false },
  }[size] || { emblemSize: 56, textClass: 'text-base', subClass: 'text-[10px]', defaultShowText: true };

  const shouldShowText = badgeOnly ? false : (showText !== undefined ? showText : (size === 'xl' || size === '2xl' ? false : true));

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Authentic Official Diamond Shield Emblem */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{ width: sizeConfig.emblemSize, height: sizeConfig.emblemSize }}
      >
        <svg
          viewBox="0 0 600 620"
          width="100%"
          height="100%"
          className="w-full h-full drop-shadow-md overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Arched Paths for PARATHA with 3D shadow */}
            <path id="paratha-shadow-3" d="M 120,282 Q 300,198 480,282" fill="none" />
            <path id="paratha-shadow-2" d="M 120,277 Q 300,193 480,277" fill="none" />
            <path id="paratha-shadow-1" d="M 120,273 Q 300,189 480,273" fill="none" />
            <path id="paratha-main" d="M 120,268 Q 300,184 480,268" fill="none" />
            
            {/* Filter for Rolling Pin Depth */}
            <filter id="belanGlow" x="-15%" y="-30%" width="130%" height="170%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* 1. OUTER DEEP NAVY SHIELD */}
          <path
            d="M 300,22 
               C 318,22 440,126 498,278 
               C 506,298 506,312 498,332 
               C 440,484 318,588 300,588 
               C 282,588 160,484 102,332 
               C 94,312 94,298 102,278 
               C 160,126 282,22 300,22 Z"
            fill="#0C2340"
          />

          {/* 2. INNER IVORY / CREAM BORDER */}
          <path
            d="M 300,38 
               C 314,38 426,136 480,284 
               C 487,301 487,309 480,326 
               C 426,474 314,572 300,572 
               C 286,572 174,474 120,326 
               C 113,309 113,301 120,284 
               C 174,136 286,38 300,38 Z"
            fill="#DF2227"
            stroke="#FFFDF6"
            strokeWidth="12"
            strokeLinejoin="round"
          />

          {/* 3. VIBRANT RED FIELD */}
          <path
            d="M 300,44 
               C 313,44 422,139 474,285 
               C 480,301 480,309 474,325 
               C 422,471 313,566 300,566 
               C 287,566 178,471 126,325 
               C 120,309 120,301 126,285 
               C 178,139 287,44 300,44 Z"
            fill="#DF2227"
          />

          {/* 4. TOP TEXT: INDIAN */}
          <text
            x="300"
            y="142"
            textAnchor="middle"
            fill="#0C2340"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="35"
            letterSpacing="5"
          >
            INDIAN
          </text>

          {/* 5. ARCHED 'PARATHA' - MULTI-LAYER NAVY 3D DROP SHADOW */}
          <text
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="64"
            letterSpacing="3.5"
            fill="#0C2340"
          >
            <textPath href="#paratha-shadow-3" startOffset="50%" textAnchor="middle">
              PARATHA
            </textPath>
          </text>
          <text
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="64"
            letterSpacing="3.5"
            fill="#0C2340"
          >
            <textPath href="#paratha-shadow-2" startOffset="50%" textAnchor="middle">
              PARATHA
            </textPath>
          </text>
          <text
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="64"
            letterSpacing="3.5"
            fill="#0C2340"
          >
            <textPath href="#paratha-shadow-1" startOffset="50%" textAnchor="middle">
              PARATHA
            </textPath>
          </text>

          {/* 6. ARCHED 'PARATHA' - FOREGROUND CREAM TEXT */}
          <text
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="64"
            letterSpacing="3.5"
            fill="#FFFDF6"
          >
            <textPath href="#paratha-main" startOffset="50%" textAnchor="middle">
              PARATHA
            </textPath>
          </text>

          {/* 7. ROLLING PIN (BELAN) UNDERLAY SHADOW BAR */}
          <rect
            x="74"
            y="312"
            width="452"
            height="18"
            rx="9"
            fill="#5C6D82"
            opacity="0.55"
          />

          {/* 8. AUTHENTIC WOODEN BELAN (ROLLING PIN) CARTOUCHE */}
          <g filter="url(#belanGlow)">
            {/* Left Handle Extension */}
            <circle cx="94" cy="310" r="13" fill="#0C2340" stroke="#FFFDF6" strokeWidth="2.5" />
            <path
              d="M 94,304 L 140,301 L 140,319 L 94,316 Z"
              fill="#0C2340"
              stroke="#FFFDF6"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect x="134" y="297" width="8" height="26" rx="4" fill="#0C2340" stroke="#FFFDF6" strokeWidth="2" />

            {/* Right Handle Extension */}
            <circle cx="506" cy="310" r="13" fill="#0C2340" stroke="#FFFDF6" strokeWidth="2.5" />
            <path
              d="M 506,304 L 460,301 L 460,319 L 506,316 Z"
              fill="#0C2340"
              stroke="#FFFDF6"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect x="458" y="297" width="8" height="26" rx="4" fill="#0C2340" stroke="#FFFDF6" strokeWidth="2" />

            {/* Main Central Barrel / Cartouche */}
            <rect
              x="138"
              y="280"
              width="324"
              height="60"
              rx="30"
              fill="#0C2340"
              stroke="#FFFDF6"
              strokeWidth="3"
            />
            
            {/* Word 'COMPANY' Inside Rolling Pin */}
            <text
              x="300"
              y="322"
              textAnchor="middle"
              fill="#FFFDF6"
              fontFamily="'Playfair Display', Georgia, serif"
              fontWeight="900"
              fontSize="33"
              letterSpacing="5"
            >
              COMPANY
            </text>
          </g>

          {/* 9. BOTTOM TEXT: CHAI, PARATHA */}
          <text
            x="300"
            y="395"
            textAnchor="middle"
            fill="#FFFDF6"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="22"
            letterSpacing="2.5"
          >
            CHAI, PARATHA
          </text>

          {/* 10. BOTTOM LINE: FLANKING DARTS & "& MORE" */}
          {/* Left tapered dart */}
          <polygon points="186,423 226,419 226,427" fill="#FFFDF6" />
          
          {/* & MORE Text */}
          <text
            x="300"
            y="429"
            textAnchor="middle"
            fill="#FFFDF6"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="900"
            fontSize="19"
            letterSpacing="3"
          >
            &amp; MORE
          </text>
          
          {/* Right tapered dart */}
          <polygon points="414,423 374,419 374,427" fill="#FFFDF6" />
        </svg>
      </div>

      {/* Accompanying Brand Typography (Optional, shown in Header/Footer) */}
      {shouldShowText && (
        <div className="flex flex-col text-left leading-none justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif tracking-wide font-extrabold uppercase ${sizeConfig.textClass} ${
                isLight ? 'text-white' : 'text-[#0B192C]'
              }`}
            >
              Indian Paratha
            </span>
            <span className="text-[#DE2428] font-serif font-black text-xs sm:text-sm tracking-widest">
              CO.
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-sans tracking-[0.2em] uppercase font-semibold mt-1 ${sizeConfig.subClass} ${
                isLight ? 'text-[#D49B44]' : 'text-[#9B1B1E]'
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

