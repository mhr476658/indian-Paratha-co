import React, { useState } from 'react';
import { CMS_PLACEHOLDER_TESTIMONIALS } from '../data/content';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = CMS_PLACEHOLDER_TESTIMONIALS;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#FAF6F0] text-[#0B192C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-[#9B1B1E]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9B1B1E]">
              VOICES OF TRAVELLERS
            </span>
            <span className="w-6 h-[2px] bg-[#9B1B1E]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight">
            STORIES FROM THE ROAD
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm font-sans mt-2">
            Community feedback from our patrons along the highway corridor.
          </p>
        </div>

        {/* Testimonial Card Display */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-14 border border-stone-200/90 shadow-xl max-w-3xl mx-auto">
          {/* Decorative Quote Icon */}
          <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-stone-200 flex items-center justify-center text-[#9B1B1E] mb-6 mx-auto sm:mx-0">
            <Quote className="w-6 h-6" />
          </div>

          {/* Testimonial Quote */}
          <p className="font-serif text-lg sm:text-2xl text-stone-800 leading-relaxed italic text-center sm:text-left mb-8">
            "{current.text}"
          </p>

          {/* Author info & controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-100">
            <div className="text-center sm:text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9B1B1E] block">
                {current.tag}
              </span>
              <h4 className="font-serif font-bold text-base text-[#0B192C]">
                {current.name}
              </h4>
              <span className="text-xs text-stone-400 font-sans">{current.location}</span>
            </div>

            {/* Prev/Next Controls */}
            <div className="flex items-center gap-2">
              <button
                id="test-prev-btn"
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-stone-300 hover:border-[#0B192C] text-stone-600 hover:text-[#0B192C] transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5 px-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? 'w-6 bg-[#9B1B1E]' : 'bg-stone-300'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                id="test-next-btn"
                onClick={handleNext}
                className="p-2.5 rounded-full border border-stone-300 hover:border-[#0B192C] text-stone-600 hover:text-[#0B192C] transition-colors"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
