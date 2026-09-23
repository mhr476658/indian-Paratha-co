import React from 'react';
import { IPCLogo } from './IPCLogo';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[var(--color-navy)] pt-32 pb-24 lg:pt-40">
      
      {/* Topographic Pattern Background overlay (using a simple SVG pattern or CSS) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23c1945c' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
             backgroundSize: '400px'
           }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.9] text-[var(--color-gold)] uppercase mb-12 tracking-wider">
          A JOURNEY<br />OF FLAVOUR,<br />A PROMISE<br />OF FLAVOUR
        </h1>

        <div className="w-48 sm:w-64 mb-16 relative">
           <img src="/ipc_hero_logo.png" alt="Indian Paratha Company Logo" className="w-full h-auto drop-shadow-2xl" />
        </div>


        
        <p className="font-sans text-[var(--color-gold-light)] uppercase tracking-[0.3em] text-sm sm:text-base font-semibold">
          CHAI PARATHA & MORE
        </p>

      </div>
    </section>
  );
};
