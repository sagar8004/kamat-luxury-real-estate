'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2, TrendingUp, ShieldCheck, Sparkles, ArrowRight, CheckCircle2,
  MapPin, Phone, Mail, Award, Check, DollarSign, Users, Zap, Eye,
  Car, Compass, Clock, ArrowUpRight, Calculator, HelpCircle, FileText, ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';
import { PROPERTIES } from '../data/propertyService';

export const CommercialPage: React.FC = () => {
  const tourModalContext = useTourModal();

  // Commercial units filtered from portfolio
  const commercialProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const cats = Array.isArray(p.category) ? p.category : [p.category];
      return cats.includes('commercial') || p.id === 'kamat-crest-porvorim' || p.id === 'kamat-vista-mapusa';
    });
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    purpose: 'investment', // 'investment' | 'self-use' | 'lease-out'
    preferredLocation: 'Porvorim',
    budgetRange: '₹1 Cr - ₹2.5 Cr',
    businessCategory: 'Retail Showroom',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Commercial ROI Calculator State
  const [investmentAmount, setInvestmentAmount] = useState<number>(15000000); // 1.5 Cr
  const [expectedRentalRate, setExpectedRentalRate] = useState<number>(1400); // ₹1,400 per sq.mts/month
  const [unitSizeSqMts, setUnitSizeSqMts] = useState<number>(90); // 90 sq.mts (~970 sq.ft)
  const [annualAppreciationRate, setAnnualAppreciationRate] = useState<number>(10); // 10% annual capital growth

  // Calculator Outputs
  const monthlyRentalIncome = unitSizeSqMts * expectedRentalRate;
  const annualRentalIncome = monthlyRentalIncome * 12;
  const grossRentalYield = ((annualRentalIncome / investmentAmount) * 100).toFixed(2);
  const fiveYearRentalEarnings = annualRentalIncome * 5 * 1.1; // with 10% escalation after 3 yrs
  const fiveYearCapitalValue = investmentAmount * Math.pow(1 + annualAppreciationRate / 100, 5);
  const totalFiveYearReturn = fiveYearRentalEarnings + (fiveYearCapitalValue - investmentAmount);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Selected Unit Tab in Showcase
  const [selectedUnitCategory, setSelectedUnitCategory] = useState<'all' | 'retail' | 'office' | 'fnb'>('all');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const commercialHighlights = [
    {
      icon: Users,
      title: 'Guaranteed In-House Footfall',
      desc: 'Positioned beneath premium residences with hundreds of affluent families providing instant, everyday patronage.'
    },
    {
      icon: MapPin,
      title: 'High-Visibility Road Frontage',
      desc: 'Prominent ground-floor positioning facing major transit arteries like NH-66 Porvorim and Mapusa commercial avenues.'
    },
    {
      icon: TrendingUp,
      title: '8% - 11% Projected Rental Yields',
      desc: 'Commercial assets in North Goa outpace residential yields with long-term corporate leases and structured rent escalations.'
    },
    {
      icon: ShieldCheck,
      title: '100% RERA & Clean Clear Titles',
      desc: 'Backed by 32+ years of Kamat Realty legacy with transparent approvals, ready power loads, and bank financing eligibility.'
    }
  ];

  const suitableTypologies = [
    {
      title: 'High-Street Retail & Luxury Boutiques',
      desc: 'Wide glass facades, double-height ceilings, and excellent street visibility for apparel, jewelry, supermarkets, and electronics.',
      size: '500 – 2,200 Sq.Ft',
      frontage: '18 – 40 Ft Clear Glass',
      badge: 'High Footfall'
    },
    {
      title: 'Healthcare Clinics & Diagnostic Centers',
      desc: 'Ground-floor barrier-free access with power backup, elevator connectivity, and patient parking for doctors, dentists, and labs.',
      size: '600 – 1,800 Sq.Ft',
      frontage: 'Private Entry Ready',
      badge: 'Essential Services'
    },
    {
      title: 'Corporate Suites & Legal / CA Chambers',
      desc: 'Prestigious business address with high-speed fiber-optic grid, access control, and executive parking for professionals & tech firms.',
      size: '400 – 1,500 Sq.Ft',
      frontage: 'Quiet Executive Layout',
      badge: 'High Appreciation'
    },
    {
      title: 'Artisanal Cafés & Boutique F&B',
      desc: 'Provisions for outdoor seating, exhaust ducts, grease-traps, and heavy 3-phase power loads for specialty cafes and bakeries.',
      size: '700 – 2,000 Sq.Ft',
      frontage: 'Outdoor Deck Option',
      badge: 'High Daily Spend'
    }
  ];

  const faqs = [
    {
      q: 'Why invest in mixed-use commercial units inside residential developments?',
      a: 'Mixed-use ground-floor commercial units have a unique competitive advantage: a permanent, affluent captive customer base residing directly upstairs, combined with high daily vehicular traffic from the main road. This guarantees sustained footfall for retail, cafes, pharmacies, and clinics from Day 1.'
    },
    {
      q: 'Are all commercial units RERA registered with clear titles?',
      a: 'Yes, 100% of Kamat Realty commercial developments possess clear RERA registrations (e.g., Kamat Crest PRGO09221720, Kamat Vista PRGO06180507), freehold non-agricultural land titles, and all statutory municipal permissions.'
    },
    {
      q: 'What are the expected rental yields and lease terms for Goa commercial real estate?',
      a: 'Commercial properties in prime growth corridors like Porvorim (NH-66) and Mapusa typically command rental yields of 8% to 11% annually, compared to 3% to 5% for residential assets. Standard commercial leases in Goa run for 5 to 9 years with 5% to 7% annual escalation clauses.'
    },
    {
      q: 'What infrastructure is provided with the commercial units?',
      a: 'Units come with 3.6m to 4.2m ceiling heights, floor-to-ceiling toughened glass frontage, heavy 3-phase electrical connections, 100% generator backup for lighting & operations, demarcated customer & staff parking, and dedicated exterior signage space.'
    },
    {
      q: 'Can non-resident investors (NRIs) purchase commercial real estate in Goa?',
      a: 'Yes, NRIs and OCIs can purchase commercial and residential properties in Goa under general RBI and FEMA guidelines without requiring special approvals, making it an ideal passive income avenue.'
    }
  ];

  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">

      {/* ========================================================================= */}
      {/* 1. HERO BANNER: HIGH YIELD COMMERCIAL & RETAIL INVESTMENTS */}
      {/* ========================================================================= */}
      <section className="relative bg-[#02182c] text-white py-20 sm:py-28 overflow-hidden border-b border-[#03396c]">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18)_0%,rgba(2,24,44,0)_65%)]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#044F92]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal variant="from-left" distance={30}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-[#38bdf8]/40 text-[10px] uppercase tracking-[0.25em] text-[#38bdf8] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>High-Yield Commercial & Retail Assets • Goa</span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.1}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.1] tracking-tight">
                  High-Street Retail & <br />
                  <span className="italic font-display text-[#93c5fd] font-light">Commercial Suites</span> in Prime Goa
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.15}>
                <p className="text-blue-100/90 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                  Position your brand or investment portfolio in ground-floor high-street showrooms and bespoke corporate suites. Benefiting from major highway visibility, prime transit corridors, and hundreds of affluent in-house residential patrons.
                </p>
              </ScrollReveal>

              {/* Key Quick Metric Badges */}
              <ScrollReveal variant="fade-up" delay={0.2}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-[#38bdf8] font-bold text-xl sm:text-2xl font-mono">8% - 11%</p>
                    <p className="text-[10px] uppercase tracking-wider text-blue-200/80 mt-0.5">Rental Yield</p>
                  </div>
                  <div className="p-3.5 bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-white font-bold text-xl sm:text-2xl font-mono">100%</p>
                    <p className="text-[10px] uppercase tracking-wider text-blue-200/80 mt-0.5">Captive Footfall</p>
                  </div>
                  <div className="p-3.5 bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-white font-bold text-xl sm:text-2xl font-mono">NH-66</p>
                    <p className="text-[10px] uppercase tracking-wider text-blue-200/80 mt-0.5">Prime Frontage</p>
                  </div>
                  <div className="p-3.5 bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-[#38bdf8] font-bold text-xl sm:text-2xl font-mono">RERA</p>
                    <p className="text-[10px] uppercase tracking-wider text-blue-200/80 mt-0.5">Approved</p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Action Buttons */}
              <ScrollReveal variant="from-left" distance={30} delay={0.25}>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#available-units"
                    className="px-8 py-4 bg-white text-[#044F92] hover:bg-blue-50 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl flex items-center gap-2 cursor-pointer group"
                  >
                    <span>View Available Spaces</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#investor-enquiry"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg backdrop-blur-sm"
                  >
                    <Calculator className="w-4 h-4 text-[#38bdf8]" />
                    <span>Calculate ROI / Yield</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Card / Visual Highlighting */}
            <div className="lg:col-span-5">
              <ScrollReveal variant="from-right" distance={40} delay={0.2}>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl relative">
                  <div className="absolute top-0 right-0 bg-[#044F92] text-white px-4 py-1 text-[9px] uppercase tracking-widest font-bold">
                    Investor Priority
                  </div>

                  <h3 className="font-display text-2xl text-white font-normal mb-2">
                    Commercial Asset Snapshot
                  </h3>
                  <p className="text-xs text-blue-100/80 font-light mb-6">
                    Commercial real estate in North Goa provides an exceptional hedge against inflation with structured long-term leases.
                  </p>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-blue-200 font-light">Asset Typologies:</span>
                      <span className="text-white font-medium">Ground-Floor Retail & Corporate Suites</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-blue-200 font-light">Prime Corridors:</span>
                      <span className="text-white font-medium">Porvorim Highway, Mapusa Market, Miramar</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-blue-200 font-light">Carpet Sizes:</span>
                      <span className="text-white font-medium">450 Sq.Ft – 2,200 Sq.Ft</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-blue-200 font-light">Ceiling Clear Height:</span>
                      <span className="text-white font-medium">Up to 4.2 Meters</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-blue-200 font-light">Lease Term Typical:</span>
                      <span className="text-white font-medium">5 – 9 Years Long-Term</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#38bdf8] font-bold">Starting Investment</p>
                      <p className="text-2xl font-display font-normal text-white">₹75 Lakhs*</p>
                    </div>
                    <button
                      onClick={() => tourModalContext.openTourModal()}
                      className="px-5 py-3 bg-[#38bdf8] hover:bg-[#0284c7] text-[#02182c] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      Book Site Inspection
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 4 PILLARS OF COMMERCIAL ADVANTAGE */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <ScrollReveal variant="fade-up">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
              The Strategic Advantage
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] font-normal">
              Why Mixed-Use Commercial Outperforms Standalone Space
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.15}>
            <p className="text-xs sm:text-sm text-[#5a554e] font-light leading-relaxed">
              Ground-floor retail and commercial suites integrated into premium residential developments benefit from immediate daily revenue, low vacancy risk, and exceptional capital growth.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commercialHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.1}>
                <div className="p-8 bg-white border border-[#e5e1da] hover:border-[#044F92] transition-all shadow-sm hover:shadow-xl h-full flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 bg-[#eef5fb] text-[#044F92] flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#044F92] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-xl text-[#1a1a1a] font-normal mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5a554e] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. AVAILABLE COMMERCIAL DEVELOPMENTS & UNITS SHOWCASE */}
      {/* ========================================================================= */}
      <section id="available-units" className="py-20 bg-[#f4f1ee] border-y border-[#e5e1da]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Curated Inventory
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] font-normal">
                Featured Commercial & Retail Developments
              </h2>
              <p className="text-xs sm:text-sm text-[#5a554e] font-light leading-relaxed">
                Explore available retail showrooms, corporate suites, and mixed-use commercial inventory across Goa’s most prosperous corridors.
              </p>
            </div>

            {/* Quick Filter */}
            <div className="inline-flex bg-white border border-[#e5e1da] p-1 shadow-sm text-xs">
              <button
                onClick={() => setSelectedUnitCategory('all')}
                className={`px-4 py-2 font-medium transition-all ${selectedUnitCategory === 'all'
                  ? 'bg-[#044F92] text-white font-semibold'
                  : 'text-[#4a4540] hover:text-[#044F92]'
                  }`}
              >
                All Developments
              </button>
              <button
                onClick={() => setSelectedUnitCategory('retail')}
                className={`px-4 py-2 font-medium transition-all ${selectedUnitCategory === 'retail'
                  ? 'bg-[#044F92] text-white font-semibold'
                  : 'text-[#4a4540] hover:text-[#044F92]'
                  }`}
              >
                High-Street Retail
              </button>
              <button
                onClick={() => setSelectedUnitCategory('office')}
                className={`px-4 py-2 font-medium transition-all ${selectedUnitCategory === 'office'
                  ? 'bg-[#044F92] text-white font-semibold'
                  : 'text-[#4a4540] hover:text-[#044F92]'
                  }`}
              >
                Corporate Suites
              </button>
            </div>
          </div>

          {/* Featured Commercial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Card 1: Kamat Prime Commercial - Porvorim */}
            <div className="bg-white border border-[#e5e1da] shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group overflow-hidden">
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#02182c]">
                  <img
                    src="/properties/kamat-prime/hero.webp"
                    alt="Kamat Prime Porvorim Commercial Units"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#044F92] text-white px-3 py-1 text-[9px] uppercase tracking-widest font-bold shadow-md">
                    Ongoing • Possession Q1 2027
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#38bdf8] border border-white/20 px-3 py-1 text-[9px] uppercase tracking-widest font-semibold">
                    NH-66 Porvorim Corridor
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#044F92] font-semibold uppercase tracking-wider mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Porvorim, North Goa (500m from NH-66)</span>
                    </div>
                    <h3 className="font-display text-2xl text-[#1a1a1a] font-normal">
                      Kamat Prime — Ground-Floor High-Street Retail
                    </h3>
                    <p className="text-xs text-[#5a554e] font-light mt-2 leading-relaxed">
                      Strategically located on the thriving Succorro-Porvorim link road just off NH-66. Designed with double-height glass frontage, demarcated customer parking, and high captive footfall from 12+ upper luxury residences.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#f0ece5] text-xs">
                    <div className="p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                      <p className="text-[#8c857d] text-[10px] uppercase tracking-wider">Unit Sizes</p>
                      <p className="font-semibold text-[#1a1a1a] mt-0.5">450 - 1,850 Sq.Ft</p>
                    </div>
                    <div className="p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                      <p className="text-[#8c857d] text-[10px] uppercase tracking-wider">Clear Height</p>
                      <p className="font-semibold text-[#1a1a1a] mt-0.5">3.8 Meters</p>
                    </div>
                    <div className="p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                      <p className="text-[#8c857d] text-[10px] uppercase tracking-wider">Ideal For</p>
                      <p className="font-semibold text-[#044F92] mt-0.5">Retail, Pharmacy, Cafe</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs text-[#4a4540]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#044F92]" />
                      <span>100% DG power backup for critical refrigeration and retail POS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#044F92]" />
                      <span>Wide 30ft clear road frontage with dedicated visitor parking bays</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#044F92]" />
                      <span>RERA Registered: PRGO04221760 • Approved by all major banks</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 flex items-center justify-between border-t border-[#f0ece5] mt-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8c857d]">Investment Starting</p>
                  <p className="text-2xl font-display font-semibold text-[#044F92]">₹85 Lakhs*</p>
                </div>
                <a
                  href="#investor-enquiry"
                  className="px-6 py-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs uppercase tracking-wider font-bold transition-all shadow-md cursor-pointer"
                >
                  Request Unit Floor Plan
                </a>
              </div>
            </div>

            {/* Card 2: Kamat Vista Commercial - Mapusa */}
            <div className="bg-white border border-[#e5e1da] shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group overflow-hidden">
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#02182c]">
                  <img
                    src="/properties/kamat-vista/hero.webp"
                    alt="Kamat Vista Mapusa Commercial Suites"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-700 text-white px-3 py-1 text-[9px] uppercase tracking-widest font-bold shadow-md">
                    Delivered Landmark • Ready Fitout
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#38bdf8] border border-white/20 px-3 py-1 text-[9px] uppercase tracking-widest font-semibold">
                    Mapusa Commercial Hub
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#044F92] font-semibold uppercase tracking-wider mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Mapusa Central Business District, North Goa</span>
                    </div>
                    <h3 className="font-display text-2xl text-[#1a1a1a] font-normal">
                      Kamat Vista — Bespoke Corporate Suites & Retail
                    </h3>
                    <p className="text-xs text-[#5a554e] font-light mt-2 leading-relaxed">
                      Situated in the bustling heart of Mapusa market town. Outstanding accessibility for corporate law firms, financial institutions, chartered accountants, diagnostic centers, and luxury retail brands.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#f0ece5] text-xs">
                    <div className="p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                      <p className="text-[#8c857d] text-[10px] uppercase tracking-wider">Unit Sizes</p>
                      <p className="font-semibold text-[#1a1a1a] mt-0.5">80 - 100.5 Sq.Mts</p>
                    </div>
                    <div className="p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                      <p className="text-[#8c857d] text-[10px] uppercase tracking-wider">Occupancy</p>
                      <p className="font-semibold text-emerald-700 mt-0.5">Ready to Occupy</p>
                    </div>
                    <div className="p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                      <p className="text-[#8c857d] text-[10px] uppercase tracking-wider">Ideal For</p>
                      <p className="font-semibold text-[#044F92] mt-0.5">Offices, Labs, Clinics</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-xs text-[#4a4540]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#044F92]" />
                      <span>Ready high-speed lift access and modern glass curtain facade</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#044F92]" />
                      <span>Walkable to Mapusa Municipal Market and Kadamba transport station</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#044F92]" />
                      <span>RERA Registered: PRGO06180507 • 100% legal title clearance</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 flex items-center justify-between border-t border-[#f0ece5] mt-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8c857d]">Investment Starting</p>
                  <p className="text-2xl font-display font-semibold text-[#044F92]">₹1.20 Cr*</p>
                </div>
                <a
                  href="#investor-enquiry"
                  className="px-6 py-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs uppercase tracking-wider font-bold transition-all shadow-md cursor-pointer"
                >
                  Schedule Site Walkthrough
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BUSINESS TYPOLOGIES & SUITABILITY */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
            Versatile Commercial Spaces
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] font-normal">
            Designed for High-Performing Commercial Enterprises
          </h2>
          <p className="text-xs sm:text-sm text-[#5a554e] font-light leading-relaxed">
            Our flexible floor plans accommodate a diverse spectrum of high-revenue business formats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suitableTypologies.map((item, idx) => (
            <div key={idx} className="p-6 bg-white border border-[#e5e1da] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-[#eef5fb] text-[#044F92] text-[9px] uppercase tracking-wider font-bold mb-4">
                  {item.badge}
                </span>
                <h3 className="font-display text-lg text-[#1a1a1a] font-normal mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5a554e] font-light leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0ece5] space-y-1.5 text-xs text-[#4a4540]">
                <div className="flex justify-between">
                  <span className="text-[#8c857d]">Size Range:</span>
                  <span className="font-medium">{item.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8c857d]">Frontage:</span>
                  <span className="font-medium">{item.frontage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE COMMERCIAL ROI & YIELD CALCULATOR */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#02182c] text-white border-y border-[#03396c]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#38bdf8] font-bold">
              Investor Forecast Tool
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-normal">
              Commercial Rental Yield & 5-Year Return Estimator
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/80 font-light leading-relaxed">
              Model your projected rental cashflows and long-term capital appreciation based on current North Goa commercial lease rates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 border border-white/15 p-8 sm:p-12 shadow-2xl backdrop-blur-md">

            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">

              {/* Slider 1: Investment Amount */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-blue-100 uppercase tracking-wider font-semibold">Total Unit Investment:</span>
                  <span className="text-[#38bdf8] font-bold font-mono text-base">
                    ₹{(investmentAmount / 10000000).toFixed(2)} Crores (₹{investmentAmount.toLocaleString('en-IN')})
                  </span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={40000000}
                  step={500000}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                />
                <div className="flex justify-between text-[10px] text-blue-200/60 mt-1">
                  <span>₹50 Lakhs</span>
                  <span>₹2.0 Cr</span>
                  <span>₹4.0 Cr</span>
                </div>
              </div>

              {/* Slider 2: Unit Carpet Area */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-blue-100 uppercase tracking-wider font-semibold">Carpet Area (Sq.Mts / Sq.Ft):</span>
                  <span className="text-[#38bdf8] font-bold font-mono text-base">
                    {unitSizeSqMts} Sq.Mts ({Math.round(unitSizeSqMts * 10.764)} Sq.Ft)
                  </span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={200}
                  step={5}
                  value={unitSizeSqMts}
                  onChange={(e) => setUnitSizeSqMts(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                />
                <div className="flex justify-between text-[10px] text-blue-200/60 mt-1">
                  <span>40 Sq.Mts (430 Sq.Ft)</span>
                  <span>120 Sq.Mts</span>
                  <span>200 Sq.Mts (2,150 Sq.Ft)</span>
                </div>
              </div>

              {/* Slider 3: Monthly Rental Rate */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-blue-100 uppercase tracking-wider font-semibold">Expected Monthly Lease Rate:</span>
                  <span className="text-[#38bdf8] font-bold font-mono text-base">
                    ₹{expectedRentalRate.toLocaleString('en-IN')} / Sq.Mts (₹{Math.round(expectedRentalRate / 10.764)} / Sq.Ft)
                  </span>
                </div>
                <input
                  type="range"
                  min={700}
                  max={2500}
                  step={50}
                  value={expectedRentalRate}
                  onChange={(e) => setExpectedRentalRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
                />
                <div className="flex justify-between text-[10px] text-blue-200/60 mt-1">
                  <span>₹700 / Sq.Mts (Affordable)</span>
                  <span>₹1,500 / Sq.Mts (Prime Road)</span>
                  <span>₹2,500 / Sq.Mts (High-Street)</span>
                </div>
              </div>

            </div>

            {/* Right Output Dashboard */}
            <div className="lg:col-span-6 bg-[#03223f] border border-[#38bdf8]/30 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-blue-200 font-medium">Estimated Gross Rental Yield</span>
                <span className="text-3xl font-display font-bold text-[#38bdf8] font-mono">{grossRentalYield}% p.a.</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10">
                  <p className="text-[10px] uppercase tracking-wider text-blue-200/80">Monthly Rental Income</p>
                  <p className="text-xl font-bold font-mono text-white mt-1">₹{monthlyRentalIncome.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <p className="text-[10px] uppercase tracking-wider text-blue-200/80">Annual Lease Earnings</p>
                  <p className="text-xl font-bold font-mono text-white mt-1">₹{annualRentalIncome.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="p-4 bg-[#044F92]/40 border border-white/15 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-blue-100 font-light">5-Year Cumulative Lease Income:</span>
                  <span className="font-bold text-white font-mono">₹{Math.round(fiveYearRentalEarnings).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-100 font-light">5-Year Projected Asset Value (10% CAGR):</span>
                  <span className="font-bold text-white font-mono">₹{Math.round(fiveYearCapitalValue).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-white/10">
                  <span className="text-[#38bdf8] font-semibold">Total 5-Year Net Growth & Yield:</span>
                  <span className="font-bold text-[#38bdf8] font-mono text-sm">₹{Math.round(totalFiveYearReturn).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <a
                href="#investor-enquiry"
                className="w-full py-3.5 bg-white text-[#044F92] hover:bg-blue-50 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Lock-In Guaranteed Pre-Lease Options</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. GRADE-A SPECIFICATIONS & INFRASTRUCTURE */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
            Built for Commercial Longevity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] font-normal">
            Turnkey Infrastructure & Technical Specifications
          </h2>
          <p className="text-xs sm:text-sm text-[#5a554e] font-light leading-relaxed">
            Every Kamat commercial space is engineered with state-of-the-art building infrastructure for seamless operation and high tenant retention.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#4a4540]">
          <div className="p-6 bg-white border border-[#e5e1da] space-y-2">
            <Zap className="w-6 h-6 text-[#044F92] mb-3" />
            <h4 className="font-semibold text-sm text-[#1a1a1a]">100% DG Power Redundancy</h4>
            <p className="text-xs text-[#5a554e] font-light leading-relaxed">
              Dual power feeds with heavy-duty diesel generator back-up guaranteeing uninterrupted operations for POS, servers, and cold storage.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#e5e1da] space-y-2">
            <Car className="w-6 h-6 text-[#044F92] mb-3" />
            <h4 className="font-semibold text-sm text-[#1a1a1a]">Dedicated Customer & Staff Parking</h4>
            <p className="text-xs text-[#5a554e] font-light leading-relaxed">
              Demarcated ground-level and basement parking bays with high-speed EV charging provisions.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#e5e1da] space-y-2">
            <Eye className="w-6 h-6 text-[#044F92] mb-3" />
            <h4 className="font-semibold text-sm text-[#1a1a1a]">High-Impact Exterior Branding</h4>
            <p className="text-xs text-[#5a554e] font-light leading-relaxed">
              Standardized, prominent LED signage allocations facing main highway lanes for maximum brand recall.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#e5e1da] space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#044F92] mb-3" />
            <h4 className="font-semibold text-sm text-[#1a1a1a]">Fire Safety & 24/7 Security</h4>
            <p className="text-xs text-[#5a554e] font-light leading-relaxed">
              Automated sprinkler grids, smoke detectors, CCTV surveillance, and on-site security guards.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#e5e1da] space-y-2">
            <Building2 className="w-6 h-6 text-[#044F92] mb-3" />
            <h4 className="font-semibold text-sm text-[#1a1a1a]">High Ceiling Clearance (3.8m - 4.2m)</h4>
            <p className="text-xs text-[#5a554e] font-light leading-relaxed">
              Expansive vertical volume providing flexibility for mezzanine floors, decorative ceilings, and aesthetic showroom fit-outs.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#e5e1da] space-y-2">
            <FileText className="w-6 h-6 text-[#044F92] mb-3" />
            <h4 className="font-semibold text-sm text-[#1a1a1a]">Clear Non-Agricultural (NA) Titles</h4>
            <p className="text-xs text-[#5a554e] font-light leading-relaxed">
              Complete legal clarity, Sanad, Panchayat/Municipal Trade NOC compliance, and approved for commercial loans by leading Indian banks.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HIGH-CONVERSION INVESTOR LEAD CAPTURE FORM */}
      {/* ========================================================================= */}
      <section id="investor-enquiry" className="py-20 bg-[#f4f1ee] border-t border-[#e5e1da]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">

          <div className="bg-white border border-[#e5e1da] p-8 sm:p-12 shadow-2xl">

            <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Direct Developer Access
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] font-normal">
                Request Commercial Pitch Deck & Unit Availability
              </h2>
              <p className="text-xs sm:text-sm text-[#5a554e] font-light leading-relaxed">
                Connect directly with Kamat Realty's Commercial Advisory Team. Receive confidential unit layout sheets, pricing schedules, and estimated ROI projections.
              </p>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-[#eef5fb] border border-[#cfe0ee] text-center space-y-4"
              >
                <div className="w-16 h-16 bg-[#044F92] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl text-[#044F92] font-normal">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs text-[#4a4540] max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Our senior commercial investment specialist will contact you on <strong>{formData.phone}</strong> within 4 business hours with the complete pitch deck.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-[#044F92] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#03396c] transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g., Rajesh Kamat"
                      className="w-full px-4 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98221 XXXXX"
                      className="w-full px-4 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@business.com"
                      className="w-full px-4 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                      Preferred Location
                    </label>
                    <select
                      value={formData.preferredLocation}
                      onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                      className="w-full px-3 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    >
                      <option value="Porvorim">Porvorim (NH-66 Highway Corridor)</option>
                      <option value="Mapusa">Mapusa Central Business Hub</option>
                      <option value="Miramar">Miramar Waterfront / Panaji</option>
                      <option value="All">Open to All High-Yield Locations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                      Investment Budget
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                    >
                      <option value="₹75 Lakhs - ₹1.25 Cr">₹75 Lakhs – ₹1.25 Cr</option>
                      <option value="₹1.25 Cr - ₹2.5 Cr">₹1.25 Cr – ₹2.5 Cr</option>
                      <option value="₹2.5 Cr - ₹5 Cr">₹2.5 Cr – ₹5 Cr</option>
                      <option value="₹5 Cr+">₹5 Cr+ (Multiple Units / Anchor Retail)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                    Intended Business Purpose / Unit Requirement
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g., Looking for a ground-floor retail space for a specialty pharmacy or pure investor seeking pre-leased asset."
                    className="w-full px-4 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#8c857d]">
                    <ShieldCheck className="w-4 h-4 text-[#044F92]" />
                    <span>Direct Developer Deal • Zero Brokerage • Strict Privacy</span>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#044F92] hover:bg-[#03396c] text-white text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    Submit Investor Enquiry
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. COMMERCIAL INVESTOR FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
            Got Questions?
          </span>
          <h2 className="font-display text-3xl text-[#1a1a1a] font-normal">
            Frequently Asked Commercial Investment Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#e5e1da] overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-medium text-sm text-[#1a1a1a] hover:text-[#044F92] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#044F92] transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-xs text-[#5a554e] font-light leading-relaxed border-t border-[#f0ece5] pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
