import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Clock } from 'lucide-react';

export default function Header({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Showroom', href: '#showroom' },
    { name: 'Services', href: '#services' },
    { name: 'Auto Terrace (Exchange)', href: '#autoterrace' },
    { name: 'Finance (EMI)', href: '#finance' },
    { name: 'Outlets', href: '#outlets' },
  ];

  return (
    <>
      {/* Top Bar (Info banner, hidden on scroll or responsive on mobile) */}
      <div className="bg-honda-black text-slate-400 text-xs py-2 border-b border-slate-800/50 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <a href="mailto:enquiry@crystalhonda.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-honda-red" />
            enquiry@crystalhonda.com
          </a>
          <a href="tel:+919158882244" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-honda-red" />
            +91 91588 82244
          </a>
        </div>
        <div className="flex items-center gap-4 text-center md:text-right">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-honda-red" />
            Mon - Sun: 9:00 AM - 7:30 PM
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-honda-red font-bold">Authorized Exclusive Honda Car Dealer</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg py-3' 
          : 'bg-slate-900 border-b border-slate-800/30 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-wider text-white">
              CRYSTAL <span className="text-honda-red">HONDA</span>
            </span>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white font-medium text-sm transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-honda-red transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => onOpenBooking('test-drive')}
              className="bg-honda-red hover:bg-honda-redHover text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-md glow-red-hover active:scale-95"
            >
              Book a Test Drive
            </button>
          </div>

          {/* Mobile Hamburguer Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-slate-300 hover:text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 py-6 px-6 animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white font-medium text-base py-2 border-b border-slate-900"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking('test-drive');
                }}
                className="w-full bg-honda-red hover:bg-honda-redHover text-white py-3 rounded-xl font-bold text-center text-sm transition-all mt-2 shadow-lg"
              >
                Book a Test Drive
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
