import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { HONDA_CARS } from '../data/dealershipData';

export default function Hero({ onOpenBooking }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HONDA_CARS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + HONDA_CARS.length) % HONDA_CARS.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % HONDA_CARS.length);
  };

  const activeCar = HONDA_CARS[current];

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white min-h-[500px] md:h-[650px] overflow-hidden flex items-center">
      
      {/* Dynamic Background Glow representing the car's color */}
      <div 
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] md:blur-[180px] opacity-20 transition-all duration-1000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          backgroundColor: activeCar.colors[0].hex,
        }}
      />

      {/* Grid Pattern overlay for tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.07] pointer-events-none" />

      {/* Slider Slides container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10 py-12 md:py-0">
        
        {/* Text Area */}
        <div className="space-y-6 text-center lg:text-left select-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold tracking-wider text-honda-red">
            {activeCar.type}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-display text-white leading-tight">
              {activeCar.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium tracking-wide">
              {activeCar.tagline}
            </p>
          </div>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
            {activeCar.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="text-center sm:text-left">
              <span className="block text-slate-500 text-xs uppercase font-bold tracking-wider">Starting Price</span>
              <span className="text-2xl md:text-3xl font-extrabold text-white font-display">
                {activeCar.priceStr}
              </span>
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => onOpenBooking('test-drive', activeCar.id)}
                className="bg-honda-red hover:bg-honda-redHover text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg glow-red-hover hover:scale-105 active:scale-95"
              >
                Book Test Drive
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#showroom"
                className="bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:border-slate-500 block text-center"
              >
                Explore Specs
              </a>
            </div>
          </div>
        </div>

        {/* Image Area */}
        <div className="relative flex justify-center items-center select-none animate-in fade-in slide-in-from-right-10 duration-700">
          <div className="w-full max-w-[480px] md:max-w-[550px] relative">
            
            {/* Visual Pedestal Shadow */}
            <div className="absolute -bottom-4 left-10 right-10 h-6 bg-black/40 rounded-full blur-xl pointer-events-none" />

            {/* Glowing metallic grid element */}
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-honda-red/20 to-transparent blur-2xl rounded-full opacity-60 pointer-events-none" />

            <img
              src={activeCar.img}
              alt={activeCar.name}
              className={`w-full h-auto object-contain transition-all duration-500`}
            />
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 z-25 bg-slate-900/60 hover:bg-slate-950 text-white p-2 rounded-full border border-slate-800 transition-colors pointer-events-auto"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 z-25 bg-slate-900/60 hover:bg-slate-950 text-white p-2 rounded-full border border-slate-800 transition-colors pointer-events-auto"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {HONDA_CARS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? 'w-8 bg-honda-red' : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
