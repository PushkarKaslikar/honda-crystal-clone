import React, { useState } from 'react';
import { OUTLETS } from '../data/dealershipData';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

export default function Outlets() {
  const [cityFilter, setCityFilter] = useState('ALL');

  const cities = ['ALL', 'PUNE', 'SATARA'];

  const filteredOutlets = cityFilter === 'ALL'
    ? OUTLETS
    : OUTLETS.filter(o => o.address.toUpperCase().includes(cityFilter));

  return (
    <section id="outlets" className="py-20 px-6 md:px-12 bg-slate-900 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-honda-red font-bold text-xs uppercase tracking-wider block">Network Coverage</span>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Our Showrooms & Workshops
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Visit our authorized dealers and advanced workshops in Pune and Satara. Get professional sales advice and factory-certified support.
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-950 p-1 rounded-full border border-slate-850">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                  cityFilter === city
                    ? 'bg-honda-red text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {city === 'ALL' ? 'All Locations' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOutlets.map((outlet) => {
            const isService = outlet.role.toLowerCase().includes('service') || outlet.role.toLowerCase().includes('workshop');
            
            return (
              <div 
                key={outlet.id}
                className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700/60 transition-all duration-300 flex flex-col justify-between shadow-lg group"
              >
                <div className="space-y-4">
                  {/* Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                    isService 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                      : 'bg-honda-red/10 text-honda-red border border-honda-red/20'
                  }`}>
                    {outlet.role}
                  </span>

                  {/* Name */}
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-honda-red transition-colors">
                    {outlet.name}
                  </h3>

                  {/* Contact details */}
                  <div className="space-y-3.5 text-xs text-slate-350 pt-2">
                    {/* Address */}
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{outlet.address}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      {outlet.phone.includes(',') ? (
                        <div className="flex flex-col">
                          {outlet.phone.split(',').map((num, i) => {
                            const trimmedNum = num.replace(/[^\d+]/g, '');
                            return (
                              <a key={i} href={`tel:${trimmedNum}`} className="hover:text-white transition-colors">
                                {num.trim()}
                              </a>
                            );
                          })}
                        </div>
                      ) : (
                        <a href={`tel:${outlet.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                          {outlet.phone}
                        </a>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <a href={`mailto:${outlet.email}`} className="hover:text-white transition-colors break-all">
                        {outlet.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Google Maps CTA */}
                <div className="pt-6 mt-6 border-t border-slate-900">
                  <a
                    href={outlet.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl transition-all duration-200 text-xs flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Navigation className="w-3.5 h-3.5 text-honda-red" />
                    Get Directions on Maps
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
