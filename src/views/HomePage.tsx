'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Shield, Award, Sparkles, Building2, MapPin, CheckCircle2, ChevronRight, Phone, Star, Quote, Search, Building, ChevronDown, ShieldCheck } from 'lucide-react';
import { PropertyItem, PropertyCategory } from '../types/property';
import { PROPERTIES, LOCATIONS_LIST, CATEGORIES_LIST } from '../data/propertyService';
import { ProjectCard } from '../components/ProjectCard';
import { HeroScrollAnimation } from '../components/HeroScrollAnimation';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';

interface HomePageProps {
  onNavigate?: (page: string, params?: { propertyId?: string; filterStatus?: string }) => void;
  onSelectProperty?: (property: PropertyItem) => void;
  onOpenTourModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProperty,
  onOpenTourModal,
}) => {
  const router = useRouter();
  const tourModalContext = useTourModal();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchArea, setSearchArea] = useState('All Locations');
  const [searchCategory, setSearchCategory] = useState<PropertyCategory>('all');

  const navigate = (page: string, params?: { propertyId?: string; filterStatus?: string; queryString?: string }) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else {
      if (page === 'home') {
        router.push('/');
      } else if (params?.queryString) {
        router.push(`/${page}?${params.queryString}`);
      } else if (page.startsWith('/')) {
        router.push(page);
      } else {
        router.push(`/${page}`);
      }
    }
  };

  const handleSelect = (property: PropertyItem) => {
    if (onSelectProperty) {
      onSelectProperty(property);
    } else {
      router.push(`/property/${property.id}`);
    }
  };

  const handleTour = () => {
    if (onOpenTourModal) {
      onOpenTourModal();
    } else {
      tourModalContext.openTourModal();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchKeyword.trim()) {
      queryParams.set('q', searchKeyword.trim());
    }
    if (searchArea && searchArea !== 'All Locations') {
      queryParams.set('area', searchArea);
    }
    if (searchCategory && searchCategory !== 'all') {
      queryParams.set('category', searchCategory);
    }

    const qs = queryParams.toString();
    navigate('projects', { queryString: qs });
  };

  const ongoingSpotlight = PROPERTIES.filter((p) => p.status === 'ongoing').slice(0, 3);
  const signatureCollection = PROPERTIES.slice(0, 6);

  return (
    <div className="space-y-0">
      {/* 240-Frame Canvas Scroll Animation Hero Section (Clean & Uncluttered) */}
      <HeroScrollAnimation
        onNavigate={navigate}
        onOpenTourModal={handleTour}
      />

      {/* ========================================================================= */}
      {/* SECTION 1: DEDICATED LUXURY ESTATE SEARCH & FILTER BAR */}
      {/* ========================================================================= */}
      <section id="quick-search-section" className="relative z-30 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <ScrollReveal variant="fade-up" distance={30}>
          <div className="bg-white border border-[#e5e1da] p-6 sm:p-8 lg:p-10 shadow-2xl rounded-none relative overflow-hidden">
            {/* Subtle brand blue top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#044F92] via-[#38bdf8] to-[#044F92]" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#e5e1da]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold block mb-1">
                  Curated Estate Discovery
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#1a1a1a] font-normal">
                  Filter Goa’s Signature Portfolio
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#5a554e] font-light">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eef5fb] text-[#044F92] font-semibold text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#044F92]" />
                  {PROPERTIES.length} Exclusive Developments
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">RERA Certified Goa</span>
              </div>
            </div>

            {/* Filter Controls Form */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                  Keyword / Estate
                </label>
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-[#8c857d] absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Assagao, Ocean Crest..."
                    className="w-full pl-10 pr-4 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] placeholder-[#a39c94] focus:outline-none focus:border-[#044F92] focus:ring-1 focus:ring-[#044F92] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                  Location Enclave
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-[#8c857d] absolute left-3.5 pointer-events-none" />
                  <select
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                    className="w-full pl-10 pr-9 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92] focus:ring-1 focus:ring-[#044F92] transition-colors appearance-none cursor-pointer"
                  >
                    {LOCATIONS_LIST.map((loc, i) => (
                      <option key={i} value={loc.area} className="text-[#1a1a1a]">
                        {loc.area}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8c857d] absolute right-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#4a4540] font-semibold mb-1.5">
                  Typology
                </label>
                <div className="relative flex items-center">
                  <Building className="w-4 h-4 text-[#8c857d] absolute left-3.5 pointer-events-none" />
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value as PropertyCategory)}
                    className="w-full pl-10 pr-9 py-3 bg-[#fdfcfb] border border-[#d6d0c7] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92] focus:ring-1 focus:ring-[#044F92] transition-colors appearance-none cursor-pointer"
                  >
                    {CATEGORIES_LIST.map((cat) => (
                      <option key={cat.id} value={cat.id} className="text-[#1a1a1a]">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8c857d] absolute right-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[#044F92] hover:bg-[#03396c] text-white font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl cursor-pointer group"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Search Estates</span>
                </button>
              </div>
            </form>

            {/* Quick Filter Tag Suggestions */}
            <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#f0ece5] text-xs text-[#5a554e]">
              <span className="text-[10px] uppercase tracking-wider text-[#8c857d] font-semibold mr-1">
                Popular Searches:
              </span>
              <button
                type="button"
                onClick={() => navigate('projects', { queryString: 'area=Porvorim&category=villa&q=4+BHK' })}
                className="px-3 py-1 bg-[#f4f1ee] hover:bg-[#eef5fb] hover:text-[#044F92] text-[11px] font-medium transition-colors cursor-pointer"
              >
                4 BHK Villas in Porvorim
              </button>
              <button
                type="button"
                onClick={() => navigate('projects', { queryString: 'area=Miramar&category=apartment' })}
                className="px-3 py-1 bg-[#f4f1ee] hover:bg-[#eef5fb] hover:text-[#044F92] text-[11px] font-medium transition-colors cursor-pointer"
              >
                Seafront Apartment Miramar
              </button>
              <button
                type="button"
                onClick={() => navigate('projects', { queryString: 'status=ongoing' })}
                className="px-3 py-1 bg-[#f4f1ee] hover:bg-[#eef5fb] hover:text-[#044F92] text-[11px] font-medium transition-colors cursor-pointer"
              >
                Active Construction Milestones
              </button>
              <button
                type="button"
                onClick={() => navigate('projects', { queryString: 'status=completed' })}
                className="px-3 py-1 bg-[#f4f1ee] hover:bg-[#eef5fb] hover:text-[#044F92] text-[11px] font-medium transition-colors cursor-pointer"
              >
                Delivered Landmarks
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: 32+ YEARS TRUST & HERITAGE PILLARS */}
      {/* ========================================================================= */}
      <section id="heritage-stats-section" className="py-20 sm:py-24 bg-[#02182c] text-white mt-16 relative overflow-hidden">
        {/* Subtle architectural ambient background glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(4,79,146,0.35)_0%,rgba(2,24,44,0)_70%)]" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-white/15 pb-8">
            <div className="space-y-3 max-w-2xl">
              <ScrollReveal variant="from-left" distance={30}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-[0.25em] text-[#38bdf8] font-bold">
                  <Award className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>32+ Years of Engineering & Heritage Mastery</span>
                </span>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.1}>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
                  Built on Uncompromising Trust & Title Transparency
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.15}>
                <p className="text-sm sm:text-base text-blue-100/80 font-light leading-relaxed">
                  Founded in 1994 in Panaji, Kamat Realty has shaped Goa’s luxury residential landscape for over three decades with clear legal titles, on-time possession, and enduring coastal craftsmanship.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="from-right" distance={30} delay={0.2}>
              <button
                onClick={() => navigate('about')}
                className="px-6 py-3.5 bg-white text-[#044F92] hover:bg-blue-50 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Our 32-Year Legacy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollReveal>
          </div>

          {/* 4 Trust Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal variant="fade-up" delay={0.1}>
              <div className="p-8 bg-white/5 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all group h-full flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-12 h-12 bg-[#044F92] text-[#38bdf8] flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <p className="font-secondary text-4xl font-normal text-white tracking-tight mb-2">
                    32+ Years
                  </p>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#38bdf8] font-bold mb-3">
                    Goan Heritage Trust
                  </h4>
                  <p className="text-xs text-blue-100/70 font-light leading-relaxed">
                    Founded in 1994, trusted across three generations of Goan, pan-India, and global homeowners.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.2}>
              <div className="p-8 bg-white/5 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all group h-full flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-12 h-12 bg-[#044F92] text-[#38bdf8] flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <p className="font-secondary text-4xl font-normal text-white tracking-tight mb-2">
                    100%
                  </p>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#38bdf8] font-bold mb-3">
                    RERA Clear Titles
                  </h4>
                  <p className="text-xs text-blue-100/70 font-light leading-relaxed">
                    Zero encumbrance, escrow-backed project accounts, and complete statutory legal diligence.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.3}>
              <div className="p-8 bg-white/5 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all group h-full flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-12 h-12 bg-[#044F92] text-[#38bdf8] flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <Building className="w-6 h-6" />
                  </div>
                  <p className="font-secondary text-4xl font-normal text-white tracking-tight mb-2">
                    3.2M+ Sq.Mts
                  </p>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#38bdf8] font-bold mb-3">
                    Delivered in Goa
                  </h4>
                  <p className="text-xs text-blue-100/70 font-light leading-relaxed">
                    {PROPERTIES.length}+ Delivered architectural landmarks spanning oceanfront estates, private villas, and business plazas.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.4}>
              <div className="p-8 bg-white/5 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all group h-full flex flex-col justify-between shadow-xl">
                <div>
                  <div className="w-12 h-12 bg-[#044F92] text-[#38bdf8] flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="font-secondary text-4xl font-normal text-white tracking-tight mb-2">
                    1,450+
                  </p>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#38bdf8] font-bold mb-3">
                    Happy Homeowners
                  </h4>
                  <p className="text-xs text-blue-100/70 font-light leading-relaxed">
                    An esteemed resident community of connoisseurs enjoying susegad lifestyle and high capital appreciation.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Marquee Enclaves Banner with Smooth Slide-in */}
      <ScrollReveal variant="fade-up" threshold={0.1}>
        <div className="bg-[#033463] text-white py-4 px-6 border-b border-[#044F92] overflow-hidden shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-[0.25em]">
            <span className="text-blue-300 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] animate-spin" style={{ animationDuration: '6s' }} />
              Prime Coastal Enclaves:
            </span>
            <div className="flex gap-4 sm:gap-8 md:gap-12 overflow-x-auto no-scrollbar font-light text-blue-100 text-[11px] sm:text-xs">
              <span>Assagao Forest Edge</span>
              <span>•</span>
              <span>Miramar Seafront</span>
              <span>•</span>
              <span>Candolim Coast</span>
              <span>•</span>
              <span>Porvorim Ridge</span>
              <span>•</span>
              <span>Dona Paula Promontory</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section: Ongoing Projects Spotlight (Emerging from behind) */}
      <section className="py-24 sm:py-32 bg-[#fdfcfb]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-12">

          {/* Header Row: Emerges from Left */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e5e1da] pb-8">
            <div className="space-y-3 max-w-2xl">
              <ScrollReveal variant="from-left" distance={40}>
                <div className="flex items-center gap-2 text-[#044F92] text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 rounded-full bg-[#044F92] animate-pulse"></span>
                  <span>Active Construction Milestones</span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={50} delay={0.1}>
                <h2 className="font-display text-4xl sm:text-5xl font-normal text-[#1a1a1a] tracking-tight">
                  Ongoing Flagship Estates
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.15}>
                <p className="text-sm sm:text-base text-[#5a554e] font-light leading-relaxed">
                  Real-time engineering progress, RERA compliance tracking, and expected handover milestones across prime North & Central Goa enclaves.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="from-right" distance={30} delay={0.2}>
              <button
                onClick={() => navigate('ongoing')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#044F92] hover:text-[#033463] transition-colors group cursor-pointer"
              >
                <span>View Milestone Tracker</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollReveal>
          </div>

          {/* Cards Grid: Staggered Emergence from Behind */}
          <StaggerContainer staggerDelay={0.16} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ongoingSpotlight.map((property) => (
              <StaggerItem key={property.id} variant="from-behind">
                <ProjectCard
                  property={property}
                  onSelectProperty={handleSelect}
                  onQuickBookTour={() => handleTour()}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Explore Button: Emerging from behind */}
          <ScrollReveal variant="from-behind" delay={0.2} className="text-center pt-6">
            <button
              onClick={() => navigate('projects')}
              className="bg-[#044F92] hover:bg-[#03396c] text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-xl inline-flex items-center gap-2 cursor-pointer group"
            >
              <span>Browse All {PROPERTIES.length} Goa Estates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Architectural Philosophy Callout (Left Column from Left, Image from Behind/Right) */}
      <section className="py-24 sm:py-32 bg-[#f2f7fc] border-t border-b border-[#d1e3f3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal variant="from-left" distance={50}>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold border-b border-[#044F92]/40 pb-1 inline-block">
                  The Kamat Architectural Standard
                </span>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={60} delay={0.1}>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1a1a1a] leading-tight">
                  Designed for the Coastal Climate. Engineered to Endure.
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={50} delay={0.2}>
                <p className="text-sm sm:text-base text-[#4a4540] font-light leading-relaxed">
                  From specialized saline-resistant reinforcement steel to deep Portuguese overhang verandas that channel cross-ventilating sea breezes, every Kamat development unites indigenous Indo-Portuguese aesthetics with ultra-modern German sanitary fittings and solar micro-grids.
                </p>
              </ScrollReveal>

              {/* 2 Micro Trust Cards: Emerging from Behind */}
              <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 gap-4 pt-4 text-xs">
                <StaggerItem variant="from-behind">
                  <div className="p-5 bg-white border border-[#cfe0ee] shadow-sm hover:border-[#044F92] transition-colors">
                    <p className="font-bold text-[#044F92] text-sm font-display">100% Clear Title</p>
                    <p className="text-[#8c857d] mt-1 text-[11px] leading-relaxed">Sanctioned RERA clearances & zero encumbrances guaranteed.</p>
                  </div>
                </StaggerItem>

                <StaggerItem variant="from-behind">
                  <div className="p-5 bg-white border border-[#cfe0ee] shadow-sm hover:border-[#044F92] transition-colors">
                    <p className="font-bold text-[#044F92] text-sm font-display">Eco-Sensitive</p>
                    <p className="text-[#8c857d] mt-1 text-[11px] leading-relaxed">Preserved heritage mango & teak groves on all villa plots.</p>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              <ScrollReveal variant="from-left" delay={0.3} className="pt-2">
                <button
                  onClick={() => navigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#044F92] hover:text-[#033463] transition-colors cursor-pointer group"
                >
                  <span>Read our 32-Year Legacy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </ScrollReveal>
            </div>

            {/* Right Visual Composition with 3D Depth Emergence */}
            <div className="lg:col-span-6 relative">
              <ScrollReveal variant="from-behind" distance={30}>
                <div className="relative aspect-[4/3] bg-white border border-[#cfe0ee] p-2 shadow-2xl overflow-hidden group">
                  <img
                    src="/reception_desk.webp"
                    alt="Kamat Interior Architecture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </ScrollReveal>

              {/* Floating RERA Approved Badge: Appears from Left */}
              <ScrollReveal variant="from-left" delay={0.25} distance={40} className="absolute -bottom-6 -left-6 hidden sm:block">
                <div className="bg-[#044F92] text-white p-6 shadow-2xl max-w-xs border border-blue-400/40">
                  <p className="text-xs uppercase tracking-widest text-blue-200 font-mono">Goa RERA Approved</p>
                  <p className="font-display text-xl mt-1 text-white">PRGO05231980</p>
                  <p className="text-[11px] text-blue-100 mt-1 font-light">Audited construction accounts & certified structural warranties.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Portals Grid (Cards Sliding in from Left & Behind) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-14">

          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Explore Our Portals
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1a1a1a]">
                Dedicated Architectural & Advisory Pages
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem variant="from-left">
              <div
                onClick={() => navigate('ongoing')}
                className="group p-7 bg-[#fdfcfb] hover:bg-[#f2f7fc] border border-[#e5e1da] hover:border-[#044F92] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl space-y-3.5 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-[#044F92] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] group-hover:text-[#044F92] transition-colors">
                    Ongoing Progress
                  </h3>
                  <p className="text-xs text-[#8c857d] leading-relaxed">
                    Live construction milestone tracking, concrete casting logs, and possession schedules.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#044F92] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Tracker →
                </span>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-behind">
              <div
                onClick={() => navigate('completed')}
                className="group p-7 bg-[#fdfcfb] hover:bg-[#f2f7fc] border border-[#e5e1da] hover:border-[#044F92] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl space-y-3.5 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-[#044F92] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] group-hover:text-[#044F92] transition-colors">
                    Completed Estates
                  </h3>
                  <p className="text-xs text-[#8c857d] leading-relaxed">
                    Delivered heritage residences, resident testimonials, and architectural case studies.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#044F92] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Delivered Work →
                </span>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-behind">
              <div
                onClick={() => navigate('locations')}
                className="group p-7 bg-[#fdfcfb] hover:bg-[#f2f7fc] border border-[#e5e1da] hover:border-[#044F92] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl space-y-3.5 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-[#044F92] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] group-hover:text-[#044F92] transition-colors">
                    Goa Enclaves Map
                  </h3>
                  <p className="text-xs text-[#8c857d] leading-relaxed">
                    Interactive map of all project locations with drive times to airports, beaches, and dining.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#044F92] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Open Map →
                </span>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-left">
              <div
                onClick={() => navigate('finance')}
                className="group p-7 bg-[#fdfcfb] hover:bg-[#f2f7fc] border border-[#e5e1da] hover:border-[#044F92] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl space-y-3.5 flex flex-col justify-between h-full"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-[#044F92] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl text-[#1a1a1a] group-hover:text-[#044F92] transition-colors">
                    Mortgage & ROI
                  </h3>
                  <p className="text-xs text-[#8c857d] leading-relaxed">
                    Calculate custom EMI obligations and simulate 10-12% vacation rental yields.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#044F92] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Calculate Yield →
                </span>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Luxury Client Quote Teaser (Emerging from Behind) */}
      <section className="py-20 bg-[#03284f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 editorial-grid pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-6">
          <ScrollReveal variant="from-behind">
            <Quote className="w-12 h-12 text-[#38bdf8] mx-auto opacity-60 mb-4" />
            <p className="font-display text-2xl sm:text-3xl md:text-4xl italic font-light text-blue-50 leading-relaxed max-w-3xl mx-auto">
              "Kamat Realty's attention to structural perfection and coastal heritage is unmatched. Our Assagao villa is a generational heirloom."
            </p>
            <div className="mt-6 flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#38bdf8] font-bold">
                Rajiv & Sunita Singhania
              </span>
              <span className="text-[11px] text-blue-200/70 font-light mt-0.5">
                Homeowners at Kamat Grandeur, Assagao
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
