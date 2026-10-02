import React from 'react';
import { BrandLogo } from './components/BrandLogo';
import { EmailSubscriptionForm } from './components/EmailSubscriptionForm';
import { FacebookCTA } from './components/FacebookCTA';
import { BackgroundCursorEffect } from './components/BackgroundCursorEffect';

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#f8fafc] bg-editorial-grid text-[#1e293b]">
      {/* Creative background cursor radar & signal ripple effect */}
      <BackgroundCursorEffect />

      {/* Subtle top editorial accent bar in signature brand cyan */}
      <div 
        className="relative z-10 w-full h-1 bg-[#009fe3] shrink-0" 
        role="presentation" 
        aria-hidden="true" 
      />

      {/* Top minimal bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex items-center justify-between text-xs tracking-wider uppercase font-semibold text-slate-500">
        <div className="inline-flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full bg-[#009fe3] animate-pulse" 
            aria-hidden="true" 
          />
          <span className="text-slate-600 font-medium tracking-normal normal-case text-xs sm:text-sm">
            Digital Edition
          </span>
        </div>
        <div className="text-slate-500 font-mono text-xs lowercase">
          thenews.lk
        </div>
      </header>

      {/* Main Single-Viewport Container */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 flex-1 flex flex-col items-center justify-center text-center">
        {/* 1. The News LK Logo */}
        <div className="mb-3 sm:mb-4">
          <BrandLogo />
        </div>

        {/* 2. Tagline */}
        <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.22em] text-[#009fe3] mb-5 sm:mb-6">
          News Around the Clock
        </p>

        {/* 3. Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#1e293b] tracking-[-0.03em] leading-[1.12] mb-3 sm:mb-4">
          Your News. One Place.
        </h2>

        {/* 4. Short Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-xl mx-auto mb-7 sm:mb-8 md:mb-9">
          The News LK is bringing news from Sri Lanka and around the world, all in one place.
        </p>

        {/* 5. Email Notification Form */}
        <div className="w-full mb-4 sm:mb-5">
          <EmailSubscriptionForm />
        </div>

        {/* 6. Facebook CTA */}
        <FacebookCTA />
      </main>

      {/* Minimal, dignified footer */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 text-center text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
          <span>&copy; {new Date().getFullYear()} The News LK.</span>
          <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
          <span className="font-mono text-slate-500">thenews.lk</span>
        </div>
      </footer>
    </div>
  );
}
