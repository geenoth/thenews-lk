import React from 'react';

export const FacebookCTA: React.FC = () => {
  return (
    <div className="text-center pt-2 sm:pt-4">
      <p className="text-xs sm:text-sm font-medium text-slate-500 mb-2">
        Already with us?
      </p>
      
      <a
        href="https://facebook.com/TheNewsLK.Sinhala"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow The News LK on Facebook (opens in a new tab)"
        className="group inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/90 hover:border-[#1877F2]/40 shadow-xs hover:shadow-sm transition-all duration-200 text-xs sm:text-sm font-semibold text-[#1e293b] hover:text-[#1877F2] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1877F2]"
      >
        {/* Official Facebook Circular Logo with exact mathematical alignment */}
        <svg 
          className="w-5 h-5 shrink-0 shadow-2xs rounded-full group-hover:scale-110 transition-transform duration-200" 
          viewBox="0 0 24 24" 
          fill="none" 
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path 
            d="M13.88 20V12.72H16.32L16.69 9.88H13.88V8.07C13.88 7.25 14.11 6.69 15.28 6.69H16.78V4.15C16.52 4.11 15.63 4.04 14.6 4.04C12.44 4.04 10.97 5.36 10.97 7.78V9.88H8.5V12.72H10.97V20H13.88Z" 
            fill="#FFFFFF" 
          />
        </svg>

        {/* CTA Text */}
        <span className="tracking-tight">Follow The News LK on Facebook</span>

        {/* Arrow Indicator */}
        <span 
          aria-hidden="true" 
          className="text-slate-400 group-hover:text-[#1877F2] transition-transform duration-200 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </a>
    </div>
  );
};
