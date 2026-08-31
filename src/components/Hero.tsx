'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Building, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { LOCATIONS_LIST, CATEGORIES_LIST } from '../data/propertyService';
import { PropertyCategory } from '../types/property';

interface HeroProps {
  onSearch: (query: string, area: string, category: PropertyCategory) => void;
  onExploreProjects: () => void;
  onOpenTourModal: () => void;
}

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    title: 'Kamat Grandeur Assagao',
    subtitle: 'Ultra-Luxury Forest Edge Private Pool Villas'
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
    title: 'Kamat Ocean Crest Miramar',
    subtitle: 'Panoramic Sea & Estuary Facing Penthouses'
  },
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    title: 'Kamat Boulevard Candolim',
    subtitle: 'Mediterranean Heritage Coastal Enclave'
  }
];

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreProjects, onOpenTourModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, selectedArea, selectedCategory);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 bg-[#fdfcfb] overflow-hidden border-b border-[#e5e1da]">
      {/* Background Editorial Canvas with Texture */}
      <div className="absolute inset-0 editorial-dots opacity-40 pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 my-auto w-full pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c857d] font-semibold border-b border-[#e5e1da] pb-1">
                Goa’s Foremost Luxury Architecture • Est. 1994
              </span>
            </div>

            {/* Editorial Display Heading */}
            <h1 className="font-secondary text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#1a1a1a] tracking-tight">
              Architectural <br />
              <span className="font-secondary italic font-light text-[#044F92]">
                Masterpieces in Goa.
              </span>
            </h1>

            <p className="font-primary text-[#4a4540] text-base sm:text-lg font-normal leading-relaxed max-w-xl text-pretty">
              For over three decades, Kamat Realty has sculpted timeless private pool villas, panoramic sea-facing penthouses, and bespoke coastal residences across Goa’s most prestigious enclaves.
            </p>

            {/* Editorial Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-projects-btn"
                onClick={onExploreProjects}
                className="px-8 py-3.5 bg-[#1a1a1a] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#333] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-book-tour-btn"
                onClick={onOpenTourModal}
                className="px-8 py-3.5 bg-white text-[#1a1a1a] border border-[#e5e1da] text-xs uppercase tracking-widest font-medium hover:bg-[#f4f1ee] transition-all flex items-center gap-2"
              >
                <span>Private Viewing</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Editorial Hero Feature Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] bg-[#f4f1ee] border border-[#e5e1da] overflow-hidden shadow-sm">
              {HERO_IMAGES.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#e5e1da] font-secondary">
                      Featured Development 0{idx + 1}
                    </p>
                    <p className="font-secondary text-2xl font-normal tracking-wide">{slide.title}</p>
                    <p className="font-primary text-xs text-stone-200 font-light">{slide.subtitle}</p>
                  </div>
                </div>
              ))}

              {/* Slider Dots */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-sm px-2.5 py-1">
                {HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1 transition-all ${
                      currentSlide === i ? 'w-5 bg-white' : 'w-2 bg-white/40'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Editorial Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 w-full bg-white border border-[#e5e1da] p-6 sm:p-8 shadow-sm"
        >
          <div className="font-secondary text-[10px] uppercase tracking-[0.2em] text-[#8c857d] font-bold mb-4">
            Curated Property Search
          </div>

          <form onSubmit={handleHeroSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label className="block font-secondary text-[10px] uppercase tracking-widest text-[#8c857d] font-medium mb-1.5">
                Keyword / Project
              </label>
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-[#8c857d] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Assagao, Ocean Crest, Villa..."
                  className="font-primary w-full pl-9 pr-3 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                />
              </div>
            </div>

            {/* Location Select */}
            <div>
              <label className="block font-secondary text-[10px] uppercase tracking-widest text-[#8c857d] font-medium mb-1.5">
                Location Enclave
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-3.5 h-3.5 text-[#8c857d] absolute left-3 pointer-events-none" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="font-primary w-full pl-9 pr-8 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors appearance-none"
                >
                  {LOCATIONS_LIST.map((loc, i) => (
                    <option key={i} value={loc.area}>
                      {loc.area}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#8c857d] absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Typology Select */}
            <div>
              <label className="block font-secondary text-[10px] uppercase tracking-widest text-[#8c857d] font-medium mb-1.5">
                Typology
              </label>
              <div className="relative flex items-center">
                <Building className="w-3.5 h-3.5 text-[#8c857d] absolute left-3 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as PropertyCategory)}
                  className="font-primary w-full pl-9 pr-8 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors appearance-none"
                >
                  {CATEGORIES_LIST.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#8c857d] absolute right-3 pointer-events-none" />
              </div>
            </div>

            {/* Search Action Button */}
            <div className="flex items-end">
              <button
                type="submit"
                id="hero-search-filter-btn"
                className="w-full py-2.5 px-4 bg-[#1a1a1a] hover:bg-[#044F92] text-white font-medium text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 font-secondary"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Portfolio</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Editorial Trust Metrics Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-[#e5e1da]">
          <div className="border-r border-[#e5e1da] pr-4 last:border-0">
            <p className="font-secondary text-2xl sm:text-3xl font-medium text-[#1a1a1a]">32+ Years</p>
            <p className="font-primary text-[10px] uppercase tracking-widest text-[#8c857d] mt-1">Legacy in Goa</p>
          </div>
          <div className="border-r border-[#e5e1da] pr-4 last:border-0">
            <p className="font-secondary text-2xl sm:text-3xl font-medium text-[#1a1a1a]">40+ Landmarks</p>
            <p className="font-primary text-[10px] uppercase tracking-widest text-[#8c857d] mt-1">Ongoing & Delivered</p>
          </div>
          <div className="border-r border-[#e5e1da] pr-4 last:border-0">
            <p className="font-secondary text-2xl sm:text-3xl font-medium text-[#1a1a1a]">2.8M+ Sq.Ft</p>
            <p className="font-primary text-[10px] uppercase tracking-widest text-[#8c857d] mt-1">Architectural Precision</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-secondary text-2xl sm:text-3xl font-medium text-[#044F92]">100%</p>
            </div>
            <p className="font-primary text-[10px] uppercase tracking-widest text-[#8c857d] mt-1">RERA Clear Titles</p>
          </div>
        </div>
      </div>
    </section>
  );
};
