import React, { useState, useEffect } from 'react';
import { BadgeDollarSign, Info, ChevronRight } from 'lucide-react';
import { HONDA_CARS } from '../data/dealershipData';

export default function EmiCalculator({ onOpenBooking }) {
  const [selectedId, setSelectedId] = useState(HONDA_CARS[0].id);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(5);

  const [emiDetails, setEmiDetails] = useState({
    emi: 0,
    principal: 0,
    interestPayable: 0,
    totalRepayment: 0
  });

  const activeCar = HONDA_CARS.find(c => c.id === selectedId) || HONDA_CARS[0];

  useEffect(() => {
    const carPrice = activeCar.price;
    const downPayment = Math.round((downPaymentPct / 100) * carPrice);
    const principal = carPrice - downPayment;
    
    // EMI Calculation Formula
    // EMI = [P x R x (1+R)^N]/[((1+R)^N)-1]
    // P = Principal Loan Amount
    // R = Monthly Interest Rate (Annual Rate / 12 / 100)
    // N = Loan Tenure in Months (Years * 12)
    
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    let emi = 0;
    if (r > 0) {
      emi = Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    } else {
      emi = Math.round(principal / n);
    }

    const totalRepayment = emi * n;
    const interestPayable = totalRepayment - principal;

    setEmiDetails({
      emi,
      principal,
      interestPayable,
      totalRepayment
    });
  }, [selectedId, downPaymentPct, interestRate, tenureYears]);

  const downPaymentVal = Math.round((downPaymentPct / 100) * activeCar.price);

  return (
    <section id="finance" className="py-20 px-6 md:px-12 bg-slate-950 text-white border-t border-slate-900 relative">
      
      {/* Decorative Blur BG */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-honda-red/5 blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-honda-red font-bold text-xs uppercase tracking-wider block">Financial Planning Suite</span>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Loan EMI Calculator
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Planning your purchase has never been simpler. Select your desired car model, adjust down payments, interest rates, and loan tenures to find your perfect payment setup.
          </p>
        </div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sliders Area (7 columns) */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
            
            <div className="space-y-6">
              
              {/* Heading */}
              <div className="flex items-center gap-2 pb-4 border-b border-slate-850">
                <BadgeDollarSign className="w-5 h-5 text-honda-red" />
                <h3 className="font-display text-lg font-bold">Adjust Loan Parameters</h3>
              </div>

              {/* Model Choice */}
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-2">Select Honda Car Model</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  {HONDA_CARS.map(car => (
                    <button
                      key={car.id}
                      onClick={() => setSelectedId(car.id)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        selectedId === car.id
                          ? 'bg-honda-red border-honda-red text-white shadow-md'
                          : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      {car.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Down Payment ({downPaymentPct}%)</span>
                  <span className="text-white bg-slate-950 px-3 py-1 border border-slate-850 rounded-full font-mono">
                    ₹{downPaymentVal.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-honda-red"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                  <span>10% (Min)</span>
                  <span>50%</span>
                  <span>90% (Max)</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Annual Interest Rate</span>
                  <span className="text-white bg-slate-950 px-3 py-1 border border-slate-850 rounded-full font-mono">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="16.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-honda-red"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                  <span>7.0%</span>
                  <span>11.5%</span>
                  <span>16.0%</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Loan Tenure</span>
                  <span className="text-white bg-slate-950 px-3 py-1 border border-slate-850 rounded-full font-mono">
                    {tenureYears} Years ({tenureYears * 12} months)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-honda-red"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                  <span>1 Year</span>
                  <span>4 Years</span>
                  <span>7 Years</span>
                </div>
              </div>

            </div>

          </div>

          {/* Results Summary (5 columns) */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              
              <div className="pb-4 border-b border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Estimated Monthly Installment</span>
                <span className="text-4xl md:text-5xl font-black text-honda-red font-display block mt-1 tracking-tight">
                  ₹{emiDetails.emi.toLocaleString()}<span className="text-xs text-slate-500 font-normal"> / month</span>
                </span>
              </div>

              {/* Summary table */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-850 text-slate-400">
                  <span>Ex-Showroom Cost:</span>
                  <span className="font-semibold text-white">₹{activeCar.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-850 text-slate-400">
                  <span>Down Payment paid:</span>
                  <span className="font-semibold text-white">- ₹{downPaymentVal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-850 text-slate-400">
                  <span>Principal Loan Amount (P):</span>
                  <span className="font-semibold text-white">₹{emiDetails.principal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-850 text-slate-400">
                  <span>Total Interest Payable:</span>
                  <span className="font-semibold text-white text-orange-400">₹{emiDetails.interestPayable.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800 text-sm">
                  <span className="font-bold text-white">Total Amount Repayable:</span>
                  <span className="font-extrabold text-honda-red font-display">₹{emiDetails.totalRepayment.toLocaleString()}</span>
                </div>
              </div>

            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => onOpenBooking('finance', selectedId)}
                className="w-full bg-honda-red hover:bg-honda-redHover py-3.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg glow-red-hover flex items-center justify-center gap-1.5 active:scale-95"
              >
                Apply for Finance Approval
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[9px] text-slate-500 text-center flex items-center justify-center gap-1">
                <Info className="w-3.5 h-3.5 flex-shrink-0" />
                Interest rates vary based on financial credit profiles. Custom schemas available.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
