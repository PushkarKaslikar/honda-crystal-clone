import React, { useState } from 'react';
import { Wrench, Shield, ArrowLeftRight, Navigation, Sparkles } from 'lucide-react';

export default function Services({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('servicing');

  const tabs = [
    {
      id: 'servicing',
      title: 'Car Servicing',
      icon: Wrench,
      subtitle: 'Premium Workshop & Periodical Maintenance',
      description: 'Keep your Honda driving like new with our high-tech workshops and Honda-trained technicians. We offer direct digital status updates, genuine parts, and fully authorized service logs.',
      points: [
        'Periodic Maintenance Service (PMS) checking 40+ points',
        'Engine oil & filter changes with synthetic grade choices',
        'State-of-the-art diagnostic scanners for electrical health',
        'Express Service: Routine maintenance completed in 3 hours'
      ],
      ctaText: 'Book Service appointment',
      action: () => onOpenBooking('service')
    },
    {
      id: 'insurance',
      title: 'Car Insurance',
      icon: Shield,
      subtitle: 'Honda Assured Cashless Insurance Renewal',
      description: 'Drive stress-free with Honda Assured Insurance partners. Enjoy near-cashless repairs across our entire service network in Pune and Satara, with rapid claim approvals and quality parts.',
      points: [
        'Instant online renewal with zero paperwork hurdles',
        'Add-on protection covers: Zero depreciation, engine protection, return to invoice',
        'Hassle-free cashless claim processing with major national insurance partners',
        '24/7 Roadside Assistance & towing coverage inclusion'
      ],
      ctaText: 'Renew Insurance Quote',
      action: () => onOpenBooking('insurance')
    },
    {
      id: 'exchange',
      title: 'Auto Terrace (Exchange)',
      icon: ArrowLeftRight,
      subtitle: 'Exchange Your Existing Car',
      description: 'Auto Terrace is Honda’s authorized pre-owned car division. We make trading in your current car smooth, transparent, and high-value. Get a professional appraisal and transition into a new Honda today.',
      points: [
        'Fair market-based valuation with transparent digital scoring',
        'One-stop documentation transfer with zero processing fees',
        'Attractive exchange bonuses applied towards your new Honda purchase',
        'Option to sell your car outright even if you do not buy a new one'
      ],
      ctaText: 'Value Your Car Online',
      action: () => {
        const el = document.getElementById('autoterrace');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'repair',
      title: 'Car Repair',
      icon: Sparkles,
      subtitle: 'Accident Repair & Body Shop Painting',
      description: 'Accidents are stressful; getting your car fixed shouldn’t be. Our body workshops feature original paint-matching tech, chassis alignment systems, and factory-finish repairs.',
      points: [
        'Original premium paint booths ensuring factory-grade gloss',
        'Chassis alignment jigs restoring structural safety specifications',
        'Cashless tie-ups with insurance companies for dent-paint jobs',
        'Rust prevention coatings and structural integrity checkups'
      ],
      ctaText: 'Enquire About Body Repair',
      action: () => onOpenBooking('contact')
    }
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab) || tabs[0];
  const IconComponent = currentTabObj.icon;

  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-honda-red font-bold text-xs uppercase tracking-wider block">Authorized Support Network</span>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Comprehensive Services
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            From quick oil changes to comprehensive engine diagnostics and insurance renewal, our certified team handles everything with factory precision.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar (3 columns) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-6 py-4.5 rounded-xl border text-left font-display font-bold text-sm transition-all duration-200 whitespace-nowrap lg:whitespace-normal flex-1 lg:flex-none ${
                    activeTab === tab.id
                      ? 'bg-honda-red border-honda-red text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <TabIcon className="w-5 h-5 flex-shrink-0" />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Details Panel (8 columns) */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 animate-in fade-in duration-300 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <span className="text-honda-red text-xs font-bold uppercase tracking-wider block">
                  {currentTabObj.title}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900">
                  {currentTabObj.subtitle}
                </h3>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl w-fit shadow-sm">
                <IconComponent className="w-7 h-7 text-honda-red" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {currentTabObj.description}
                </p>
                <button
                  onClick={currentTabObj.action}
                  className="bg-honda-red hover:bg-honda-redHover text-white px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md active:scale-95 glow-red-hover"
                >
                  {currentTabObj.ctaText}
                  <Navigation className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3.5">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Service Features:</span>
                <ul className="space-y-3 text-xs md:text-sm text-slate-700">
                  {currentTabObj.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-honda-red font-bold flex-shrink-0 mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
