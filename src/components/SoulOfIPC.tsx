import React from 'react';

export const SoulOfIPC: React.FC = () => {
  return (
    <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[var(--color-navy)] text-[var(--text-primary)]">
      
      {/* Left Content Column */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 md:py-24 max-w-xl mx-auto md:ml-auto md:mr-0 text-center">
        
        <div className="mb-12">
          <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl text-[var(--color-gold)] leading-none uppercase">
            THE
          </h2>
          <h2 className="font-script text-6xl sm:text-7xl lg:text-8xl text-[var(--color-gold)] leading-none my-2" style={{ transform: 'rotate(-2deg)' }}>
            Soul
          </h2>
          <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl text-[var(--color-gold)] leading-none uppercase">
            OF IPC
          </h2>
        </div>

        <div className="space-y-6 text-xs sm:text-sm lg:text-base leading-relaxed tracking-wide text-[var(--text-primary)]/90">
          <p>
            From the heart of India, where spices tell stories. Where every meal is a melody, rich with old glories. We rise with the sun, kneading dreams with our hands. Serving warmth, love, and flavors so grand.
          </p>
          <p>
            Not just food, but a feeling we share. A bite of tradition, a moment of care. No shortcuts, no compromise, no empty disguise. Only fresh, wholesome meals—pure, real, and wise.
          </p>
          <p>
            On highways that stretch from cities to hills. We bring soulful meals, crafted with skill. A haven for travelers, for bikers, for all. Where stories unfold over chai, and time slows to a stall.
          </p>
          <p>
            We are not just a restaurant; we are a revolution. Blending roots with reinvention - our flavorful fusion. With every Paratha, every sip, every spread. We serve the spirit of India—well-fed and well-bred.
          </p>
        </div>

      </div>

      {/* Right Image Column */}
      <div className="w-full h-full min-h-[50vh] bg-cover bg-center" style={{ backgroundImage: 'url("/restaurant-story.png")' }}>
        {/* The image should fill the entire right half */}
      </div>

    </section>
  );
};
