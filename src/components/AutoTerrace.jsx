import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, ClipboardCheck, Sparkles, Scale, Info } from 'lucide-react';
import { HONDA_CARS } from '../data/dealershipData';

export default function AutoTerrace() {
  const [inputs, setInputs] = useState({
    brand: 'Maruti Suzuki',
    model: 'Swift VXI',
    year: 2018,
    kms: 50000,
    condition: 'Good',
    targetHonda: HONDA_CARS[0].id
  });

  const [valuation, setValuation] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate estimated trade-in value
  useEffect(() => {
    let baseValue = 650000;
    
    // Year factor (relative to current year 2026)
    const age = 2026 - parseInt(inputs.year);
    const yearDepreciation = Math.pow(0.88, age); // 12% drop per year
    
    // Kms factor
    const kmsFactor = Math.max(0.7, 1 - (inputs.kms / 250000)); 

    // Condition scale
    let conditionScale = 1.0;
    if (inputs.condition === 'Excellent') conditionScale = 1.15;
    if (inputs.condition === 'Average') conditionScale = 0.82;
    if (inputs.condition === 'Needs Repair') conditionScale = 0.60;

    let finalEstimate = baseValue * yearDepreciation * kmsFactor * conditionScale;
    
    // brand weighting
    if (inputs.brand.toLowerCase() === 'honda') finalEstimate *= 1.05; // Loyalty boost

    // Clamp value
    finalEstimate = Math.max(75000, Math.round(finalEstimate));
    setValuation(finalEstimate);
  }, [inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleKmsChange = (e) => {
    setInputs(prev => ({ ...prev, kms: parseInt(e.target.value) }));
  };

  const targetCar = HONDA_CARS.find(c => c.id === inputs.targetHonda) || HONDA_CARS[0];
  const netPayable = Math.max(0, targetCar.price - valuation);

  const handleValuationSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setError('Please provide your Name and Phone number.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const payload = {
        name,
        phone,
        currentCarBrand: inputs.brand,
        currentCarModel: inputs.model,
        currentCarYear: inputs.year.toString(),
        currentCarMileage: inputs.kms.toString() + ' kms',
        targetCarModel: targetCar.name
      };

      const response = await fetch('/api/exchange-valuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setPhone('');
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Server rejected request. Please try again.');
      }
    } catch (err) {
      setError('Failed to reach backend. Check your connections.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="autoterrace" className="py-20 px-6 md:px-12 bg-slate-900 text-white relative">
      
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-honda-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-honda-red font-bold text-xs uppercase tracking-wider block">Auto Terrace Upgrade Suite</span>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Exchange & Upgrade Program
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Trade-in your current car at the best market valuation. Select your details below to get an instant digital valuation credit towards a brand new Honda.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Inputs Section (7 columns) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
            
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                <ClipboardCheck className="w-5 h-5 text-honda-red" />
                <h3 className="font-display text-lg font-bold">1. Enter Your Current Car Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Brand */}
                <div>
                  <label className="block text-slate-400 text-xs font-semibold mb-1.5">Brand / Make</label>
                  <select
                    name="brand"
                    value={inputs.brand}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-honda-red text-white"
                  >
                    <option value="Honda">Honda (Loyalty loyalty bonus!)</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Tata">Tata Motors</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Kia">Kia</option>
                    <option value="Skoda">Skoda / Volkswagen</option>
                    <option value="Other">Other Make</option>
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block text-slate-400 text-xs font-semibold mb-1.5">Model Name</label>
                  <input
                    type="text"
                    name="model"
                    value={inputs.model}
                    onChange={handleInputChange}
                    placeholder="e.g. Swift / City / i10"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-honda-red text-white placeholder-slate-600"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-slate-400 text-xs font-semibold mb-1.5">Year of Purchase</label>
                  <select
                    name="year"
                    value={inputs.year}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-honda-red text-white"
                  >
                    {Array.from({ length: 17 }, (_, i) => 2026 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-slate-400 text-xs font-semibold mb-1.5">Estimated Condition</label>
                  <select
                    name="condition"
                    value={inputs.condition}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-honda-red text-white"
                  >
                    <option value="Excellent">Excellent (Scratchless, Full Records)</option>
                    <option value="Good">Good (Minor scratches, mechanically sound)</option>
                    <option value="Average">Average (Regular wear, minor dents)</option>
                    <option value="Needs Repair">Needs Repair (Major mechanical/paint work)</option>
                  </select>
                </div>

              </div>

              {/* KMS Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Kilometers Driven</span>
                  <span className="text-honda-red font-bold text-sm bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    {inputs.kms.toLocaleString()} km
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={inputs.kms}
                  onChange={handleKmsChange}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-honda-red"
                />
                <div className="flex justify-between text-[10px] text-slate-600">
                  <span>5,000 km</span>
                  <span>100,000 km</span>
                  <span>200,000 km+</span>
                </div>
              </div>

            </div>

            {/* Target Car Select */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 pb-4">
                <Sparkles className="w-5 h-5 text-honda-red" />
                <h3 className="font-display text-lg font-bold">2. Select Your New Honda Car</h3>
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-semibold mb-1.5">New Target Car Model</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {HONDA_CARS.map(car => (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => setInputs(prev => ({ ...prev, targetHonda: car.id }))}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        inputs.targetHonda === car.id
                          ? 'bg-honda-red border-honda-red text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {car.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Results Section (5 columns) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <span className="absolute top-0 right-0 w-32 h-32 bg-honda-red/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
                <Scale className="w-5 h-5 text-honda-red" />
                <h3 className="font-display text-lg font-bold">Exchange Analysis</h3>
              </div>

              {/* Pricing Cards */}
              <div className="space-y-4">
                
                {/* Current Car Credit */}
                <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl relative">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Est. Trade-in Valuation Credit</span>
                  <span className="text-3xl font-black text-green-400 font-display">
                    + ₹{valuation.toLocaleString()}
                  </span>
                  <p className="text-slate-500 text-[9px] mt-1.5 flex items-center gap-1">
                    <Info className="w-3 h-3 flex-shrink-0" />
                    Subject to physical inspection evaluation.
                  </p>
                </div>

                {/* Target Honda Price */}
                <div className="flex justify-between items-center text-sm px-2 text-slate-400">
                  <span>New {targetCar.name} Price:</span>
                  <span className="font-semibold text-white">₹{targetCar.price.toLocaleString()} *</span>
                </div>

                {/* Transfer Arrow Icon */}
                <div className="flex justify-center my-1">
                  <div className="p-2 bg-slate-850 border border-slate-800 text-honda-red rounded-full">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Net Cost Output */}
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <span className="text-slate-400 text-xs block font-semibold">Net Upgrade Cost Payable</span>
                  <span className="text-3xl md:text-4xl font-extrabold text-white font-display block mt-1 tracking-tight">
                    ₹{netPayable.toLocaleString()} *
                  </span>
                  <span className="text-[10px] text-slate-500 mt-2 block">
                    (Ex-Showroom Price - Trade-in Value Credit)
                  </span>
                </div>

              </div>
            </div>

            {/* Quick Inspection Booking form inside result box */}
            <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
              <span className="block text-slate-400 text-xs font-semibold">Book Free Physical Inspection</span>
              
              {submitted ? (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs p-3 rounded-lg text-center font-semibold">
                  ✓ Inspection request received successfully!
                </div>
              ) : (
                <form onSubmit={handleValuationSubmit} className="space-y-3">
                  {error && <div className="text-red-400 text-[10px]">{error}</div>}
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-honda-red text-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-honda-red text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-honda-red hover:bg-honda-redHover py-2.5 rounded-lg text-xs font-bold transition-all text-white active:scale-95 shadow-md flex items-center justify-center gap-1.5"
                  >
                    {loading ? 'Submitting...' : 'Claim Valuation Credit'}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
