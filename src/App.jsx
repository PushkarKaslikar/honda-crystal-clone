import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickActions from './components/QuickActions';
import Showroom from './components/Showroom';
import Services from './components/Services';
import AutoTerrace from './components/AutoTerrace';
import EmiCalculator from './components/EmiCalculator';
import Outlets from './components/Outlets';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'test-drive', // 'test-drive' | 'service' | 'finance' | 'insurance' | 'contact'
    carId: ''
  });

  const openBooking = (type = 'test-drive', carId = '') => {
    setModalState({
      isOpen: true,
      type,
      carId
    });
  };

  const closeBooking = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans selection:bg-honda-red selection:text-white">
      {/* Header Sticky Navigation */}
      <Header onOpenBooking={openBooking} />

      {/* Hero Display Slider */}
      <Hero onOpenBooking={openBooking} />

      {/* Quick shortcuts action links */}
      <QuickActions onOpenBooking={openBooking} />

      <main className="flex-grow">
        {/* Car Showroom Catalog */}
        <Showroom onOpenBooking={openBooking} />

        {/* tabbed Services dashboard */}
        <Services onOpenBooking={openBooking} />

        {/* Signature Auto Terrace valuation tool */}
        <AutoTerrace />

        {/* Interactive Loan EMI calculator */}
        <EmiCalculator onOpenBooking={openBooking} />

        {/* Review testmonial slider */}
        <Reviews />

        {/* Dealer Showroom/Service outlets directory */}
        <Outlets />
      </main>

      {/* Footer Meta panel */}
      <Footer />

      {/* Reusable modal for handling form bookings */}
      <BookingModal
        isOpen={modalState.isOpen}
        onClose={closeBooking}
        initialType={modalState.type}
        carId={modalState.carId}
      />
    </div>
  );
}
