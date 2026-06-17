import React from 'react';
import { Mail, Phone, Clock, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs md:text-sm">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Branding & Mission */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-extrabold tracking-wider text-white">
            CRYSTAL <span className="text-honda-red">HONDA</span>
          </h3>
          <p className="leading-relaxed text-slate-400 text-xs">
            Crystal Honda, an enterprise of the well-established Kothari Group, is an Authorized Exclusive Honda Car dealer in Pune and Satara. Committed to delivering a premium automotive purchasing and servicing experience.
          </p>
          <div className="pt-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">GSTIN REGISTRATION</span>
            <span className="text-slate-300 font-mono text-xs font-semibold">27AADCK6409R1ZX</span> {/* Corrected GSTIN (replaced 'I' with '1') */}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => scrollToSection('showroom')} className="hover:text-white transition-colors flex items-center gap-1 group">
                Showroom Inventory <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-honda-red transition-colors" />
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors flex items-center gap-1 group">
                Authorized Services <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-honda-red transition-colors" />
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('autoterrace')} className="hover:text-white transition-colors flex items-center gap-1 group">
                Auto Terrace Exchange <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-honda-red transition-colors" />
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('finance')} className="hover:text-white transition-colors flex items-center gap-1 group">
                Loan EMI Estimator <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-honda-red transition-colors" />
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('outlets')} className="hover:text-white transition-colors flex items-center gap-1 group">
                Dealership Outlets <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-honda-red transition-colors" />
              </button>
            </li>
          </ul>
        </div>

        {/* Corporate Office Address */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Bavdhan Showroom</h4>
          <ul className="space-y-3 text-xs leading-relaxed text-slate-400">
            <li>
              <span className="font-semibold text-slate-300 block">Address:</span>
              Sr. No 268, Mantri Alpine, Mumbai-Bangalore Highway, Bavdhan, Pune, Maharashtra 411021 {/* Corrected "BANGLORE" spelling to "Bangalore" */}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-honda-red" />
              <a href="tel:+919158882222" className="hover:text-white transition-colors">+91 91588 82222</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-honda-red" />
              <a href="mailto:enquiry@crystalhonda.com" className="hover:text-white transition-colors">enquiry@crystalhonda.com</a>
            </li>
          </ul>
        </div>

        {/* Working Hours */}
        <div className="space-y-4">
          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Business Hours</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-honda-red flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-350 block">Showroom Hours:</span>
                Monday - Sunday: 9:00 AM - 7:30 PM
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-350 block">Workshop Hours:</span>
                Monday - Sunday: 8:30 AM - 6:30 PM
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-slate-950 border-t border-slate-900 py-6 text-center text-[10px] md:text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            © {new Date().getFullYear()} Crystal Honda (Kothari Group). All rights reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline hover:text-slate-400">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:underline hover:text-slate-400">Privacy Policy</a>
            <span>•</span>
            <span className="text-slate-600">Site optimized for 8K images & low latency</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
