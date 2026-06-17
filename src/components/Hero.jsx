import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  return (
    <div className="relative bg-slate-950 text-white min-h-[500px] md:h-[650px] overflow-hidden flex items-center justify-center">
      
      {/* Background Video Embed (YouTube) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-100 object-cover"
          src="https://www.youtube.com/embed/zoy0P4UVDIQ?autoplay=1&mute=1&loop=1&playlist=zoy0P4UVDIQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
          title="Honda Elevate Promo Video Background"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
        {/* Dark overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Grid Pattern overlay for tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.05] pointer-events-none" />

      {/* Hero Content Area */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10 text-center py-12 md:py-0">
        
        <div className="space-y-6 select-none animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-semibold tracking-widest uppercase text-honda-red">
            Crystal Honda Exclusive
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-display text-white leading-tight">
              Experience the Joy of Driving
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium tracking-wide max-w-2xl mx-auto">
              Discover our premium range of Honda cars that elevate every journey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenBooking('test-drive')}
              className="bg-honda-red hover:bg-honda-redHover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center gap-2 shadow-xl glow-red-hover hover:scale-105 active:scale-95"
            >
              Book a Test Drive
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#showroom"
              className="bg-slate-900/60 backdrop-blur-sm hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:border-slate-500 flex items-center justify-center"
            >
              Explore Showroom
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
