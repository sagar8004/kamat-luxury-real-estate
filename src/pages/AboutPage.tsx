import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Compass, Users, CheckCircle2, Building2, Sparkles, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenTourModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenTourModal
}) => {
  const milestones = [
    {
      year: '1994',
      title: 'Foundation in Panaji',
      desc: 'Founded by Er. Rajesh Kamat with a vision to build architecturally sound, legally impeccable residences in Goa.'
    },
    {
      year: '2005',
      title: 'Miramar Promenade Expansion',
      desc: 'Delivered landmark sea-facing penthouses and commercial headquarters defining the Panaji-Miramar skyline.'
    },
    {
      year: '2016',
      title: 'Boutique North Goa Luxury Villas',
      desc: 'Pioneered eco-sensitive heritage villas in Assagao and Candolim, integrating private pools and Portuguese eaves.'
    },
    {
      year: '2024+',
      title: 'Ultra-Luxury Sustainable Enclaves',
      desc: 'Pioneering solar micro-grids, rainwater aquifers, and zero-carbon building frameworks across 12 active developments.'
    }
  ];

  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Header */}
      <div className="bg-[#044F92] text-white py-16 px-6 sm:px-8 lg:px-10 border-b border-[#03396c]">
        <div className="max-w-7xl mx-auto space-y-4">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em]">
              <span>32 Years of Architectural Integrity</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={50} delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Heritage & Philosophy
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={40} delay={0.2}>
            <p className="text-blue-100 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Since 1994, Kamat Realty has shaped Goa's architectural skyline with rigorous engineering standards, zero legal compromises, and timeless Indo-Portuguese aesthetics.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14 space-y-20">
        {/* Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal variant="from-left" distance={40}>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold border-b border-[#044F92]/40 pb-1 inline-block">
                Founding Principles
              </span>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={50} delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] leading-tight">
                Where Engineering Rigor Meets Coastal Soul
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-sm text-[#4a4540] font-light leading-relaxed">
                In a region where seasonal monsoons and coastal salinity test architectural longevity, Kamat Realty was built on the non-negotiable bedrock of structural excellence. Every column, beam, and waterproofing barrier is engineered to withstand tropical coastal weather for over a century.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.25}>
              <p className="text-sm text-[#4a4540] font-light leading-relaxed">
                We do not mass-produce cookie-cutter developments. Each Kamat project is an artisanal limited-edition enclave, restricted to select discerning homeowners who value privacy, nature preservation, and verified title security.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="from-left" delay={0.3} className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 bg-[#044F92] text-white hover:bg-[#03396c] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenTourModal}
                className="px-6 py-3 bg-white border border-[#044F92] text-[#044F92] hover:bg-[#f2f7fc] text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Schedule Private Consultation
              </button>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 relative">
            <ScrollReveal variant="from-behind" distance={30}>
              <div className="aspect-[4/3] bg-[#f4f1ee] border border-[#cfe0ee] p-2 shadow-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                  alt="Kamat Architectural Legacy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="space-y-8 border-t border-[#e5e1da] pt-16">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                The 4 Bedrock Pillars
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
                Why Connoisseurs Choose Kamat
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StaggerItem variant="from-behind">
              <div className="bg-white p-6 border border-[#e5e1da] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-[#044F92] text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a]">100% Clear Title</h3>
                <p className="text-xs text-[#8c857d] leading-relaxed">
                  Zero legacy encumbrances. Comprehensive 30-year title searches authenticated by Goa's senior legal advocates.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-behind">
              <div className="bg-white p-6 border border-[#e5e1da] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-[#044F92] text-white flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a]">On-Time Track Record</h3>
                <p className="text-xs text-[#8c857d] leading-relaxed">
                  Over 32 years, 100% of our residential and commercial projects have been handed over on or ahead of scheduled possession.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-behind">
              <div className="bg-white p-6 border border-[#e5e1da] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-[#044F92] text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a]">Saline-Resistant Tech</h3>
                <p className="text-xs text-[#8c857d] leading-relaxed">
                  Specialized corrosion-resistant TMT bars, BASF multi-layer waterproofing, and German double-glazed soundproof glass.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem variant="from-behind">
              <div className="bg-white p-6 border border-[#e5e1da] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-10 h-10 bg-[#044F92] text-white flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl text-[#1a1a1a]">VIP Estate Concierge</h3>
                <p className="text-xs text-[#8c857d] leading-relaxed">
                  Dedicated in-house estate management, vacation rental leasing support, and 24/7 security maintenance.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Timeline */}
        <div className="border-t border-[#e5e1da] pt-16 space-y-12">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Chronology of Distinction
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
                Three Decades of Goa Architecture
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.14} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <StaggerItem key={idx} variant="from-left">
                <div className="bg-white p-6 border-t-4 border-t-[#044F92] border border-[#e5e1da] hover:border-[#044F92] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                  <span className="font-display text-3xl text-[#044F92] block">{m.year}</span>
                  <h3 className="font-bold text-sm text-[#1a1a1a]">{m.title}</h3>
                  <p className="text-xs text-[#8c857d] leading-relaxed">{m.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
};
