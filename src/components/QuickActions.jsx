import React from 'react';
import { Calendar, ShieldAlert, BadgeDollarSign, MapPin, Wrench } from 'lucide-react';

export default function QuickActions({ onOpenBooking }) {
  const actions = [
    {
      title: 'Book Service',
      description: 'Schedule periodical repair or maintenance',
      icon: Wrench,
      action: () => onOpenBooking('service'),
      color: 'from-red-500 to-honda-red'
    },
    {
      title: 'Schedule Test Drive',
      description: 'Experience your favorite Honda live',
      icon: Calendar,
      action: () => onOpenBooking('test-drive'),
      color: 'from-slate-700 to-slate-900'
    },
    {
      title: 'Finance Offers',
      description: 'Calculate EMI and explore loans',
      icon: BadgeDollarSign,
      action: () => {
        const el = document.getElementById('finance');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      color: 'from-slate-800 to-slate-950'
    },
    {
      title: 'Renew Insurance',
      description: 'Instant customized insurance quotes',
      icon: ShieldAlert,
      action: () => onOpenBooking('insurance'),
      color: 'from-slate-700 to-slate-900'
    },
    {
      title: 'Find Showrooms',
      description: '6 outlets in Pune and Satara',
      icon: MapPin,
      action: () => {
        const el = document.getElementById('outlets');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      color: 'from-red-500 to-honda-red'
    }
  ];

  return (
    <section className="bg-slate-950 py-10 px-6 md:px-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.title}
                onClick={act.action}
                className="group relative flex flex-col text-left p-6 bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-lg"
              >
                {/* Visual Accent Corner Glow */}
                <span className="absolute top-0 right-0 w-8 h-8 rounded-tr-2xl bg-gradient-to-bl from-honda-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 group-hover:bg-honda-red text-white flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-honda-red group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-display font-bold text-white text-base mb-1">
                  {act.title}
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {act.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
