import React from 'react';

interface BrandLogoProps {
  className?: string;
  showIconMark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '',
  showIconMark = false 
}) => {
  return (
    <div 
      className={`inline-flex items-center gap-3 select-none ${className}`}
      aria-label="The News LK"
    >
      {showIconMark && (
        <div 
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#009fe3] p-1 flex items-center justify-center shadow-xs shrink-0"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center p-0.5">
            <span className="text-[9px] font-bold text-[#383838] leading-none">The</span>
            <span className="text-[10px] font-extrabold leading-none -mt-0.5">
              <span className="text-[#009fe3]">News</span>
              <span className="text-[#383838]">.LK</span>
            </span>
          </div>
        </div>
      )}

      {/* Main Brand Wordmark faithful to brand assets */}
      <h1 className="font-extrabold tracking-[-0.04em] leading-none text-4xl sm:text-5xl md:text-6xl text-[#383838]">
        <span>The</span>{' '}
        <span className="text-[#009fe3]">News</span>
        <span className="text-[#383838]">.LK</span>
      </h1>
    </div>
  );
};
