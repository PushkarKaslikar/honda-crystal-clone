import React, { useState } from 'react';
import { HONDA_CARS } from '../data/dealershipData';
import { Eye, ShieldCheck, ArrowRight, Gauge, Wrench, HelpCircle } from 'lucide-react';

export default function Showroom({ onOpenBooking }) {
  const [filter, setFilter] = useState('ALL');
  // Record selected color index per car id
  const [selectedColor, setSelectedColor] = useState(
    HONDA_CARS.reduce((acc, car) => {
      acc[car.id] = 0; // Default to first color
      return acc;
    }, {})
  );

  const categories = ['ALL', 'SUV', 'SEDAN', 'HYBRID'];

  const filteredCars = filter === 'ALL'
    ? HONDA_CARS
    : HONDA_CARS.filter(car => car.type.toUpperCase() === filter);

  const handleColorChange = (carId, colorIndex) => {
    setSelectedColor(prev => ({
      ...prev,
      [carId]: colorIndex
    }));
  };

  return (
    <section id="showroom" className="py-20 px-6 md:px-12 bg-slate-900 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-honda-red font-bold text-xs uppercase tracking-wider block">Honda Virtual Showroom</span>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Explore the Latest Lineup
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Find the perfect match for your lifestyle. Select a body type, browse specs, customize colors, and schedule a test drive.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-950 p-1.5 rounded-full border border-slate-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all ${
                  filter === cat
                    ? 'bg-honda-red text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCars.map((car) => {
            const activeColorIdx = selectedColor[car.id] || 0;
            const activeColor = car.colors[activeColorIdx] || car.colors[0];

            return (
              <div 
                key={car.id} 
                className="bg-slate-950 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700/70 transition-all duration-300 flex flex-col group shadow-xl"
              >
                
                {/* Visual Header */}
                <div className="p-6 pb-0 flex justify-between items-start">
                  <div>
                    <span className="text-honda-red text-xs font-bold uppercase tracking-wider block mb-1">{car.type}</span>
                    <h3 className="font-display text-2xl font-extrabold text-white">{car.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-xs block">Starting Ex-Showroom</span>
                    <span className="text-lg font-bold text-white font-display">{car.priceStr}</span>
                  </div>
                </div>

                {/* Car Showcase Frame */}
                <div className="relative h-60 flex items-center justify-center p-6 bg-gradient-to-b from-slate-950 to-slate-900/40">
                  {/* Glowing background matching selected color */}
                  <div 
                    className="absolute w-44 h-44 rounded-full blur-[60px] opacity-10 transition-all duration-500 pointer-events-none"
                    style={{ backgroundColor: activeColor.hex }}
                  />
                  
                  {/* Pedestal */}
                  <div className="absolute bottom-4 left-1/4 right-1/4 h-2 bg-black/40 rounded-full blur-md" />

                  {/* Main Car Image with tint filter depending on color */}
                  <img
                    src={car.img}
                    alt={car.name}
                    className={`w-full max-w-[340px] h-auto object-contain transition-all duration-500 ${activeColor.imgTint}`}
                  />
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  
                  {/* Color Selector */}
                  <div className="space-y-2">
                    <span className="text-slate-400 text-xs font-semibold block">
                      Color: <span className="text-white">{activeColor.name}</span>
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {car.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={() => handleColorChange(car.id, idx)}
                          title={color.name}
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            activeColorIdx === idx 
                              ? 'border-honda-red scale-110' 
                              : 'border-slate-800 hover:scale-105'
                          }`}
                          style={{
                            backgroundColor: color.hex === '#ffffff' ? '#e2e8f0' : color.hex,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tech Specs Table */}
                  <div className="grid grid-cols-2 gap-3.5 bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-honda-red" />
                      <div>
                        <span className="block text-slate-500 font-semibold uppercase">Engine</span>
                        <span className="text-slate-200">{car.specs.engine}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-honda-red" />
                      <div>
                        <span className="block text-slate-500 font-semibold uppercase">Transmission</span>
                        <span className="text-slate-200">{car.specs.transmission}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-honda-red" />
                      <div>
                        <span className="block text-slate-500 font-semibold uppercase">Mileage</span>
                        <span className="text-slate-200">{car.specs.mileage}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-honda-red" />
                      <div>
                        <span className="block text-slate-500 font-semibold uppercase">Fuel System</span>
                        <span className="text-slate-200">{car.specs.fuel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2">
                    <span className="text-slate-400 text-xs font-semibold block">Key Features:</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-300">
                      {car.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-honda-red" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onOpenBooking('test-drive', car.id)}
                      className="flex-1 bg-honda-red hover:bg-honda-redHover text-white font-bold py-3 rounded-xl transition-all duration-200 text-xs flex items-center justify-center gap-1.5 shadow-lg active:scale-95"
                    >
                      Book Test Drive
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenBooking('finance', car.id)}
                      className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold py-3 rounded-xl transition-all duration-200 text-xs"
                    >
                      Get Price / Enquiry
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
