import React, { useState } from 'react';
import { X, Calendar, Phone, Mail, User, Car, Shield, Briefcase, MapPin } from 'lucide-react';
import { HONDA_CARS, OUTLETS } from '../data/dealershipData';

export default function BookingModal({ isOpen, onClose, initialType = 'test-drive', carId = '' }) {
  const [formType, setFormType] = useState(initialType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    model: carId || HONDA_CARS[0].id,
    location: OUTLETS[0].id,
    workshop: OUTLETS[1].id, // Default to a workshop
    serviceType: 'Routine Maintenance',
    preferredDate: '',
    regNo: '',
    purchaseYear: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getApiEndpoint = () => {
    switch (formType) {
      case 'service': return '/api/book-service';
      case 'test-drive': return '/api/book-test-drive';
      case 'finance': return '/api/finance-enquiry';
      case 'insurance': return '/api/insurance-enquiry';
      default: return '/api/contact';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simple validation
    if (!formData.name || !formData.phone) {
      setError('Please fill in Name and Phone Number.');
      setLoading(false);
      return;
    }

    try {
      // Find model name and location name
      const modelObj = HONDA_CARS.find(c => c.id === formData.model);
      const outletObj = OUTLETS.find(o => o.id === (formType === 'service' ? formData.workshop : formData.location));
      
      const payload = {
        ...formData,
        model: modelObj ? modelObj.name : formData.model,
        location: outletObj ? outletObj.name : formData.location,
        workshop: outletObj ? outletObj.name : formData.workshop
      };

      const response = await fetch(getApiEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            model: HONDA_CARS[0].id,
            location: OUTLETS[0].id,
            workshop: OUTLETS[1].id,
            serviceType: 'Routine Maintenance',
            preferredDate: '',
            regNo: '',
            purchaseYear: '',
            subject: '',
            message: ''
          });
        }, 3000);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to server. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const formTitles = {
    'test-drive': 'Book a Test Drive',
    'service': 'Book a Car Service',
    'finance': 'Finance Enquiry',
    'insurance': 'Insurance Renewal',
    'contact': 'Contact Us'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative bg-white border border-slate-200 text-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner/Header */}
        <div className="bg-gradient-to-r from-honda-red to-red-800 px-6 py-5 flex justify-between items-center text-white">
          <div>
            <h3 className="font-display text-xl font-bold">{formTitles[formType]}</h3>
            <p className="text-red-100 text-xs mt-1">Crystal Honda - Premium Dealership Network</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Selection Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
          {Object.keys(formTitles).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setFormType(key);
                setError('');
              }}
              className={`px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                formType === key 
                  ? 'border-honda-red text-honda-red bg-white' 
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {key === 'test-drive' ? 'Test Drive' : key === 'service' ? 'Servicing' : key === 'finance' ? 'Finance' : key === 'insurance' ? 'Insurance' : 'Contact'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-10 animate-in fade-in duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 border border-green-200 text-green-600 rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-display text-lg font-bold text-slate-900 mb-2">Request Submitted!</h4>
              <p className="text-slate-600 text-sm max-w-xs mx-auto">
                Thank you for choosing Crystal Honda. Our advisor will call you shortly on your provided phone number.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-slate-700 text-xs font-medium mb-1">Full Name *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 placeholder-slate-400 focus:bg-slate-50 transition-colors"
                  />
                </div>
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-xs font-medium mb-1">Phone Number *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Mobile number"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 placeholder-slate-400 focus:bg-slate-50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-medium mb-1">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@gmail.com"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 placeholder-slate-400 focus:bg-slate-50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Conditional Fields based on formType */}

              {/* Test Drive or Finance or Insurance - Model selection */}
              {['test-drive', 'finance', 'insurance', 'service'].includes(formType) && (
                <div>
                  <label className="block text-slate-700 text-xs font-medium mb-1">Vehicle Model</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Car className="w-4 h-4" />
                    </span>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 focus:bg-slate-50 transition-colors appearance-none"
                    >
                      {HONDA_CARS.map(car => (
                        <option key={car.id} value={car.id}>{car.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Service Details */}
              {formType === 'service' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs font-medium mb-1">Service Type</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <Shield className="w-4 h-4" />
                      </span>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 focus:bg-slate-50 transition-colors appearance-none"
                      >
                        <option value="Routine Maintenance">Routine Maintenance</option>
                        <option value="Mechanical Repairs">Mechanical Repair</option>
                        <option value="Body Shop & Painting">Body Paint / Repair</option>
                        <option value="Wheel Alignment">Wheel Alignment</option>
                        <option value="Other Diagnostics">Other Diagnostics</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-medium mb-1">Preferred Workshop</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <select
                        name="workshop"
                        value={formData.workshop}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 focus:bg-slate-50 transition-colors appearance-none"
                      >
                        {OUTLETS.filter(o => o.role.toLowerCase().includes('service') || o.role.toLowerCase().includes('workshop')).map(outlet => (
                          <option key={outlet.id} value={outlet.id}>{outlet.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Showroom location (for Test Drive / Finance) */}
              {['test-drive', 'finance'].includes(formType) && (
                <div>
                  <label className="block text-slate-700 text-xs font-medium mb-1">Preferred Showroom</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 focus:bg-slate-50 transition-colors appearance-none"
                    >
                      {OUTLETS.filter(o => o.role.toLowerCase().includes('sales') || o.role.toLowerCase().includes('showroom')).map(outlet => (
                        <option key={outlet.id} value={outlet.id}>{outlet.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Test Drive - Date */}
              {formType === 'test-drive' && (
                <div>
                  <label className="block text-slate-700 text-xs font-medium mb-1">Preferred Test Drive Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </span>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 focus:bg-slate-50 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Insurance Details */}
              {formType === 'insurance' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 text-xs font-medium mb-1">Registration Number</label>
                    <input
                      type="text"
                      name="regNo"
                      value={formData.regNo}
                      onChange={handleInputChange}
                      placeholder="e.g. MH-12-AB-1234"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 placeholder-slate-400 focus:bg-slate-50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-medium mb-1">Year of Purchase</label>
                    <input
                      type="number"
                      name="purchaseYear"
                      value={formData.purchaseYear}
                      onChange={handleInputChange}
                      placeholder="e.g. 2022"
                      className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 placeholder-slate-400 focus:bg-slate-50 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Contact Us - Subject */}
              {formType === 'contact' && (
                <div>
                  <label className="block text-slate-700 text-xs font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enquiry Subject"
                    className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 placeholder-slate-400 focus:bg-slate-50 transition-colors"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-slate-700 text-xs font-medium mb-1">Message / Special Instructions</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-white border border-slate-300 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-honda-red text-slate-900 placeholder-slate-400 focus:bg-slate-50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-honda-red hover:bg-honda-redHover disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center text-sm"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-slate-500/30 border-t-slate-500 rounded-full animate-spin"></span>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
