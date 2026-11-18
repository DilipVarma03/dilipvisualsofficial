import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'horizontal' | 'mark' | 'full';
  disableLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  variant = 'horizontal',
  disableLink = false
}) => {
  const sizeClasses = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl'
  };

  const markSize = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const fullSize = {
    sm: 'h-10 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto'
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 group transition-all select-none ${className}`}>
      {variant === 'full' ? (
        <div className="relative group-hover:scale-105 transition-transform duration-300">
          <img
            src="/logo.jpg"
            alt="DILIP VISUALS"
            className={`${fullSize[size]} object-contain rounded-2xl shadow-xl shadow-amber-500/10 border border-amber-500/20`}
          />
        </div>
      ) : variant === 'mark' ? (
        <div className={`relative ${markSize[size]} shrink-0 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-[#F5DE93] via-[#D4AF37] to-[#8C6211] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300`}>
          <div className="w-full h-full bg-[#08090D] rounded-[10px] overflow-hidden flex items-center justify-center">
            <img
              src="/logo-mark.jpg"
              alt="DV Emblem"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <>
          {/* Official Gold DV Aperture Monogram Emblem */}
          <div className={`relative ${markSize[size]} shrink-0 rounded-xl p-[1.5px] bg-gradient-to-br from-[#F5DE93] via-[#D4AF37] to-[#8C6211] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300`}>
            <div className="w-full h-full bg-[#08090D] rounded-[10px] overflow-hidden flex items-center justify-center relative">
              <img
                src="/logo-mark.jpg"
                alt="Dilip Visuals Mark"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Official Gold Luxury Brand Typography */}
          <div className="flex flex-col text-left">
            <div className={`font-black tracking-[0.14em] text-white flex items-center gap-1.5 leading-tight ${sizeClasses[size]}`}>
              <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
                DILIP
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDF0CD] via-[#D4AF37] to-[#BF8D1B] drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)]">
                VISUALS
              </span>
            </div>
            {showTagline && (
              <span className="text-[9px] uppercase tracking-[0.28em] text-amber-200/70 font-semibold -mt-0.5">
                Creative Agency
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );

  if (disableLink) {
    return content;
  }

  return (
    <Link to="/" className="inline-flex items-center">
      {content}
    </Link>
  );
};
