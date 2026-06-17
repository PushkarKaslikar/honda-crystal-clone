import elevateImg from '../assets/new_elevate.webp';
import elevateOrangeImg from '../assets/off_elevate_orange.png';
import elevateRedImg from '../assets/off_elevate_red.png';
import elevateWhiteImg from '../assets/off_elevate_white.png';
import elevateBlueImg from '../assets/off_elevate_blue.png';
import elevateBrownImg from '../assets/off_elevate_brown.png';
import elevateGreyImg from '../assets/off_elevate_grey.png';
import elevateSilverImg from '../assets/off_elevate_silver.png';
import cityImg from '../assets/new_city.webp';
import cityHybridImg from '../assets/new_city.webp'; 
import amazeImg from '../assets/new_amaze.webp';
import zrvImg from '../assets/new_zrv.webp';
export const HONDA_CARS = [
  {
    id: 'elevate',
    name: 'Honda Elevate',
    type: 'SUV',
    tagline: 'You Are The Elevate',
    price: 1169900,
    priceStr: '₹11,69,900 *',
    img: elevateImg,
    description: 'A bold, majestic SUV that commands attention. Equipped with Honda Sensing ADAS and premium comfort to elevate every drive.',
    specs: {
      engine: '1.5L i-VTEC DOHC',
      power: '121 PS @ 6600 rpm',
      torque: '145 Nm @ 4300 rpm',
      transmission: '6-Speed Manual / Advanced CVT',
      mileage: '15.3 - 16.9 kmpl',
      fuel: 'Petrol',
      groundClearance: '220 mm'
    },
    colors: [
      { name: 'Phoenix Orange Pearl', hex: '#ff6900', img: elevateOrangeImg },
      { name: 'Radiant Red Metallic', hex: '#cf2e2e', img: elevateRedImg },
      { name: 'Platinum White Pearl', hex: '#ffffff', img: elevateWhiteImg },
      { name: 'Obsidian Blue Pearl', hex: '#084177', img: elevateBlueImg },
      { name: 'Golden Brown Metallic', hex: '#5e3e23', img: elevateBrownImg },
      { name: 'Lunar Silver Metallic', hex: '#cbd5e1', img: elevateSilverImg },
      { name: 'Meteoroid Gray Metallic', hex: '#475569', img: elevateGreyImg }
    ],
    features: [
      'Honda SENSING (Advanced Driver Assistance System)',
      '10.25-inch Advanced Touchscreen Display',
      'One-Touch Electric Sunroof',
      'Wireless Smartphone Charger',
      'LaneWatch Camera',
      'Premium 220mm Ground Clearance'
    ]
  },
  {
    id: 'city',
    name: 'New Honda City',
    type: 'Sedan',
    tagline: 'The Supreme Sedan',
    price: 1182000,
    priceStr: '₹11,82,000 *',
    img: cityImg,
    description: 'An icon of elegance and performance. The classic luxury sedan that offers unmatched comfort, technology, and driving dynamics.',
    specs: {
      engine: '1.5L i-VTEC DOHC with VTC',
      power: '121 PS @ 6600 rpm',
      torque: '145 Nm @ 4300 rpm',
      transmission: '6-Speed Manual / 7-Speed CVT',
      mileage: '17.8 - 18.4 kmpl',
      fuel: 'Petrol',
      groundClearance: '165 mm'
    },
    colors: [
      { name: 'Radiant Red Metallic', hex: '#cf2e2e', imgTint: 'hue-rotate(0deg) saturate(1)' },
      { name: 'Platinum White Pearl', hex: '#ffffff', imgTint: 'brightness(1.25) saturate(0.5)' },
      { name: 'Obsidian Blue Pearl', hex: '#084177', imgTint: 'hue-rotate(220deg) saturate(1)' },
      { name: 'Golden Brown Metallic', hex: '#5e3e23', imgTint: 'hue-rotate(30deg) brightness(0.5)' },
      { name: 'Lunar Silver Metallic', hex: '#cbd5e1', imgTint: 'brightness(1) saturate(0)' },
      { name: 'Meteoroid Gray Metallic', hex: '#475569', imgTint: 'brightness(0.75) saturate(0)' }
    ],
    features: [
      'Honda SENSING (ADAS) in Manual & CVT',
      'Next-Gen Honda Connect (Alexa Integration)',
      'Full LED Headlamps with 9 LED Array',
      'Electric Sunroof with Pinch Guard',
      '7-inch Full Color TFT Instrument Cluster',
      'Diamond-Cut R16 Alloy Wheels'
    ]
  },
  {
    id: 'city-hev',
    name: 'Honda City e:HEV',
    type: 'Hybrid',
    tagline: 'The Supreme Hybrid',
    price: 1900000,
    priceStr: '₹19,00,000 *',
    img: cityHybridImg,
    description: 'Smarter, greener, and supreme. India’s first self-charging hybrid sedan with a dual-motor electric-hybrid system.',
    specs: {
      engine: '1.5L Atkinson Cycle i-VTEC Hybrid',
      power: '126 PS (Combined System)',
      torque: '253 Nm (Electric Motor)',
      transmission: 'e-CVT (Electronic)',
      mileage: '27.13 kmpl',
      fuel: 'Petrol Hybrid',
      groundClearance: '162 mm'
    },
    colors: [
      { name: 'Obsidian Blue Pearl', hex: '#084177', imgTint: 'hue-rotate(0deg) saturate(1)' },
      { name: 'Radiant Red Metallic', hex: '#cf2e2e', imgTint: 'hue-rotate(140deg) saturate(1.5)' },
      { name: 'Platinum White Pearl', hex: '#ffffff', imgTint: 'brightness(1.25) saturate(0.5)' },
      { name: 'Lunar Silver Metallic', hex: '#cbd5e1', imgTint: 'brightness(1) saturate(0)' },
      { name: 'Meteoroid Gray Metallic', hex: '#475569', imgTint: 'brightness(0.75) saturate(0)' }
    ],
    features: [
      'Advanced Multi-Mode Drive (EV, Hybrid, Engine)',
      'Unmatched Fuel Efficiency of 27.13 kmpl',
      'Electric Parking Brake with Auto Brake Hold',
      'Honda SENSING (Full ADAS suite)',
      'Disk Brakes on all 4 wheels',
      'Sporty Rear Bumper Diffuser & Spoiler'
    ]
  },
  {
    id: 'amaze',
    name: 'Honda Amaze',
    type: 'Sedan',
    tagline: 'Jeene ki Nayi Raah',
    price: 720000,
    priceStr: '₹7,20,000 *',
    img: amazeImg,
    description: 'The compact family sedan that packs big dreams, premium design, solid comfort, and superb safety features in an ideal shape.',
    specs: {
      engine: '1.2L i-VTEC SOHC',
      power: '90 PS @ 6000 rpm',
      torque: '110 Nm @ 4800 rpm',
      transmission: '5-Speed Manual / Advanced CVT',
      mileage: '18.3 - 18.6 kmpl',
      fuel: 'Petrol',
      groundClearance: '170 mm'
    },
    colors: [
      { name: 'Platinum White Pearl', hex: '#ffffff', imgTint: 'brightness(1.25) saturate(0.5)' },
      { name: 'Radiant Red Metallic', hex: '#cf2e2e', imgTint: 'hue-rotate(0deg) saturate(1)' },
      { name: 'Golden Brown Metallic', hex: '#5e3e23', imgTint: 'hue-rotate(30deg) brightness(0.5)' },
      { name: 'Lunar Silver Metallic', hex: '#cbd5e1', imgTint: 'brightness(1) saturate(0)' },
      { name: 'Meteoroid Gray Metallic', hex: '#475569', imgTint: 'brightness(0.75) saturate(0)' }
    ],
    features: [
      'Premium Beige Seats with Contour Styling',
      'F1-Inspired Paddle Shifters (CVT only)',
      '7-inch Digipad Touchscreen Infotainment',
      'Smart Entry with Push Button Start',
      'LED Projector Headlamps with DRLs',
      'Rear Camera with 3 View Directions'
    ]
  },
  {
    id: 'zrv',
    name: 'Honda ZR-V',
    type: 'SUV',
    tagline: 'Bookings Open',
    price: 2000000,
    priceStr: 'Bookings Open *',
    img: zrvImg,
    description: 'A premium, sporty SUV designed for the modern driver. Melding sleek aesthetics with Honda\'s legendary performance and cutting-edge tech.',
    specs: {
      engine: '2.0L i-VTEC Hybrid / 1.5L Turbo',
      power: '184 PS @ 6000 rpm',
      torque: '315 Nm @ 4000 rpm',
      transmission: 'e-CVT / CVT',
      mileage: '18.6 - 22.0 kmpl',
      fuel: 'Petrol Hybrid',
      groundClearance: '180 mm'
    },
    colors: [
      { name: 'Platinum White Pearl', hex: '#ffffff', imgTint: 'brightness(1.25) saturate(0.5)' },
      { name: 'Radiant Red Metallic', hex: '#cf2e2e', imgTint: 'hue-rotate(0deg) saturate(1)' },
      { name: 'Crystal Black Pearl', hex: '#000000', imgTint: 'brightness(0.5) saturate(0)' }
    ],
    features: [
      'Sporty, Sleek Exterior Design',
      'Honda SENSING Suite',
      '9-inch Display Audio System',
      'Dual Zone Automatic Climate Control',
      'Panoramic Glass Sunroof',
      'Premium Audio System'
    ]
  }
];

export const OUTLETS = [
  {
    id: 'bavdhan-showroom',
    name: 'Bavdhan Showroom',
    role: 'Sales Outlets',
    address: 'Mantri Alpine, Mumbai-Bangalore Highway, Bavdhan-Budruk, Pune 411021',
    phone: '+91 9158882222',
    email: 'enquiry@crystalhonda.com',
    mapUrl: 'https://maps.google.com/?q=Mantri+Alpine,+Bavdhan,+Pune'
  },
  {
    id: 'bavdhan-workshop',
    name: 'Bavdhan Workshop',
    role: 'Service Workshop',
    address: 'S.No. 268, Mantri Alpine, Mumbai-Bangalore Highway, Bavdhan-Budruk, Pune 411021',
    phone: '+91 9158882222',
    email: 'service.bavdhan@crystalhonda.in',
    mapUrl: 'https://maps.google.com/?q=Mantri+Alpine,+Bavdhan,+Pune'
  },
  {
    id: 'viman-nagar-showroom',
    name: 'Viman Nagar Showroom',
    role: 'Sales Outlets',
    address: 'Shop No. 4 & 5, Kolte - Giga Space, Viman Nagar, Nagar Road, Pune 411014',
    phone: '+91 9158882211',
    email: 'enquiry@crystalhonda.com',
    mapUrl: 'https://maps.google.com/?q=Giga+Space,+Viman+Nagar,+Pune'
  },
  {
    id: 'wagholi-showroom',
    name: 'Wagholi Showroom & Service',
    role: 'Sales & Service',
    address: 'S No. 1325/1, Pune Nagar Highway, Wagholi (Opp. Sai Maruti Showroom), Pune 412207',
    phone: 'Sales: +91 9158884716, Service: +91 9158882967',
    email: 'enquiry@crystalhonda.com',
    mapUrl: 'https://maps.google.com/?q=Wagholi,+Pune'
  },
  {
    id: 'satara-showroom',
    name: 'Satara Showroom',
    role: 'Sales Outlets',
    address: 'S.No. 15/18 B, Pune Bangalore Highway, Below Flyover Bridge, Nr Bombay Restaurant Chowk, (Pirwadi), Satara 415003',
    phone: '+91 9158882252',
    email: 'satara.sales@crystalhonda.in',
    mapUrl: 'https://maps.google.com/?q=Bombay+Restaurant+Chowk,+Satara'
  },
  {
    id: 'satara-workshop',
    name: 'Satara Workshop',
    role: 'Service Workshop',
    address: 'Sr No. 36, Hissa No. 23+24+ D/2, Village Godoli, Satara 415003',
    phone: '+91 8411888807',
    email: 'satara.service@crystalhonda.in',
    mapUrl: 'https://maps.google.com/?q=Godoli,+Satara'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Rahul Kadam',
    rating: 5,
    comment: 'I recently purchased the Honda Elevate from Bavdhan Showroom. The team was extremely professional and the delivery process was absolutely seamless. Outstanding service!',
    date: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Got my Honda City serviced at the Bavdhan workshop. The staff identified a minor suspension issue which was fixed under warranty quickly. Very satisfied with the transparency.',
    date: '1 month ago'
  },
  {
    id: 3,
    name: 'Amit Deshmukh',
    rating: 5,
    comment: 'The exchange program (Auto Terrace) at Crystal Honda is fantastic. I traded in my old hatchback for a brand new City e:HEV. Received a very fair valuation and zero paperwork hassles.',
    date: '3 weeks ago'
  },
  {
    id: 4,
    name: 'Snehal Patil',
    rating: 5,
    comment: 'Prompt and polite customer executive service at Viman Nagar. She walked me through all the finance options and helped secure the best interest rate.',
    date: '2 months ago'
  },
  {
    id: 5,
    name: 'Vikram Rathi',
    rating: 4,
    comment: 'Excellent test drive experience for the Elevate. The advisor was highly knowledgeable about the Honda Sensing ADAS features. Highly recommend Crystal Honda.',
    date: '1 month ago'
  }
];
