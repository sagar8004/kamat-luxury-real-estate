import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Shield, Award, Sparkles, Building2, MapPin, CheckCircle2, ChevronRight, Phone, Star, Quote } from 'lucide-react';
import { PropertyItem, PropertyCategory } from '../types/property';
import { PROPERTIES } from '../data/propertyService';
import { ProjectCard } from '../components/ProjectCard';
import { HeroScrollAnimation } from '../components/HeroScrollAnimation';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface HomePageProps {
  onNavigate: (page: string, params?: { propertyId?: string; filterStatus?: string }) => void;
  onSelectProperty: (property: PropertyItem) => void;
  onOpenTourModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProperty,
  onOpenTourModal,
}) => {
  const ongoingSpotlight = PROPERTIES.filter((p) => p.status === 'ongoing').slice(0, 3);
  const signatureCollection = PROPERTIES.slice(0, 6);

  const handleHeroSearch = (query: string, area: string, category: PropertyCategory) => {
    onNavigate('projects', { filterStatus: category });
  };

  return (
    <div className="space-y-0">
      {/* 240-Frame Canvas Scroll Animation Hero Section */}
      <HeroScrollAnimation
        onNavigate={onNavigate}
        onOpenTourModal={onOpenTourModal}
        onSearch={handleHeroSearch}
      />

      {/* Marquee Enclaves Banner with Smooth Slide-in */}
      <ScrollReveal variant="fade-up" threshold={0.1}>
        <div className="bg-[#033463] text-white py-4 px-6 border-b border-[#044F92] overflow-hidden shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-[0.25em]">
            <span className="text-blue-300 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] animate-spin" style={{ animationDuration: '6s' }} />
              Prime Coastal Enclaves:
            </span>
            <div className="flex gap-4 sm:gap-8 md:gap-12 overflow-x-auto no-scrollbar font-light text-blue-100 text-[11px] sm:text-xs">
              <span className="hover:text-[#38bdf8] transition-colors cursor-default">Assagao</span>
              <span>•</span>
              <span className="hover:text-[#38bdf8] transition-colors cursor-default">Miramar</span>
              <span>•</span>
              <span className="hover:text-[#38bdf8] transition-colors cursor-default">Porvorim</span>
              <span>•</span>
              <span className="hover:text-[#38bdf8] transition-colors cursor-default">Candolim</span>
              <span>•</span>
              <span className="hover:text-[#38bdf8] transition-colors cursor-default">Panaji</span>
              <span>•</span>
              <span className="hover:text-[#38bdf8] transition-colors cursor-default">Dona Paula</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Featured Ongoing Spotlight Section */}
      <section className="py-24 sm:py-32 bg-[#fdfcfb] relative">
        <div className="absolute inset-0 editorial-dots opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-14 relative z-10">
          
          {/* Header Row: Title from Left, CTA from Right */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e5e1da] pb-8">
            <ScrollReveal variant="from-left" distance={60}>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#044F92]" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                    Signature Active Enclaves
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1a1a1a]">
                  Under Construction & Pre-Launch
                </h2>
                <p className="text-[#4a4540] text-sm sm:text-base font-light max-w-xl">
                  Real-time structural progress, architectural elevations, and bespoke private layouts across Goa's highest yielding luxury postcodes.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-right" distance={40}>
              <button
                onClick={() => onNavigate('ongoing')}
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
                  onSelectProperty={(p) => {
                    onSelectProperty(p);
                    onNavigate('property-detail', { propertyId: p.id });
                  }}
                  onQuickBookTour={() => onOpenTourModal()}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Explore Button: Emerging from behind */}
          <ScrollReveal variant="from-behind" delay={0.2} className="text-center pt-6">
            <button
              onClick={() => onNavigate('projects')}
              className="bg-[#044F92] hover:bg-[#03396c] text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-xl inline-flex items-center gap-2 cursor-pointer group"
            >
              <span>Browse All 12 Goa Estates</span>
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
                  onClick={() => onNavigate('about')}
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
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
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
                onClick={() => onNavigate('ongoing')}
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
                onClick={() => onNavigate('completed')}
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
                onClick={() => onNavigate('locations')}
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
                onClick={() => onNavigate('finance')}
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
