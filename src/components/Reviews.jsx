import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageSquareQuote } from 'lucide-react';
import { REVIEWS } from '../data/dealershipData';

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % REVIEWS.length);
  };

  const review = REVIEWS[current];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-50 text-slate-900 border-t border-slate-200 overflow-hidden relative">
      
      {/* Visual background ambient accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-honda-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-honda-red font-bold text-xs uppercase tracking-wider block">Customer Stories</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
            What Our Owners Say
          </h2>
        </div>

        {/* Review Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 relative shadow-sm text-center flex flex-col items-center">
          
          {/* Quote Icon Overlay */}
          <div className="absolute top-6 left-8 text-slate-100 pointer-events-none">
            <MessageSquareQuote className="w-12 h-12 rotate-180" />
          </div>

          {/* Star Rating */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${i < review.rating ? 'text-amber-400 fill-amber-450' : 'text-slate-200'}`} 
              />
            ))}
          </div>

          {/* Text Content */}
          <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-slate-700 mb-8 max-w-2xl relative z-10">
            "{review.comment}"
          </blockquote>

          {/* Author info */}
          <div className="space-y-1 relative z-10">
            <cite className="not-italic font-display font-bold text-slate-900 text-base">
              {review.name}
            </cite>
            <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold">
              Verified Buyer • {review.date}
            </span>
          </div>

          {/* Manual navigation buttons */}
          <div className="flex gap-3 mt-10 relative z-10">
            <button
              onClick={handlePrev}
              className="bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 p-2 rounded-full border border-slate-200 hover:border-slate-300 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 p-2 rounded-full border border-slate-200 hover:border-slate-300 transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bullet indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === idx ? 'w-6 bg-honda-red' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
