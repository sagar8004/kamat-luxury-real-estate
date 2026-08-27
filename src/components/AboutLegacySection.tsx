import React from 'react';
import { ShieldCheck, Leaf, Compass, Award, Sparkles, Building2, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface AboutLegacySectionProps {
  onOpenTourModal: () => void;
}

export const AboutLegacySection: React.FC<AboutLegacySectionProps> = ({ onOpenTourModal }) => {
  return (
    <section id="about-section" className="py-24 sm:py-32 bg-[#f4f1ee] border-t border-[#e5e1da] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          
          {/* Left Column: Visual Composition (Appearing from Left) */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal variant="from-left" distance={60}>
              <div className="relative z-10 overflow-hidden shadow-2xl border border-[#e5e1da] bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Kamat Realty Architecture"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </ScrollReveal>

            {/* Floating Experience Card (Emerging from Behind) */}
            <ScrollReveal
              variant="from-behind"
              delay={0.25}
              className="absolute -bottom-6 -right-4 sm:-right-6 z-20"
            >
              <div className="bg-white p-5 border border-[#e5e1da] shadow-2xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#044F92] flex items-center justify-center shrink-0 shadow-md">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-serif text-2xl italic font-normal text-[#1a1a1a]">32+ Years</p>
                    <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Upholding Goan Trust</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative & Pillars (Appearing with Cascading Reveals) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal variant="from-left" distance={40}>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold border-b border-[#044F92]/40 pb-1 inline-block">
                Philosophy & Engineering Mastery
              </span>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={50} delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light italic text-[#1a1a1a] leading-tight">
                Shaping Goa’s Skyline with <br />
                <span className="font-serif italic font-normal text-[#044F92]">Heritage & Future-Ready Precision</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-[#4a4540] text-sm sm:text-base leading-relaxed font-light">
                Founded in 1994, Kamat Realty was born from a singular passion: creating living spaces that honor the romantic coastal architecture of Goa while delivering world-class structural engineering, seismic resilience, and sustainable luxury.
              </p>
            </ScrollReveal>

            {/* 4 Core Pillars (Emerging from Behind with Stagger) */}
            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <StaggerItem variant="from-behind">
                <div className="bg-white p-5 border border-[#e5e1da] hover:border-[#044F92] space-y-1.5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-[#044F92]">
                    <Leaf className="w-4 h-4" />
                    <h4 className="text-[11px] uppercase font-bold tracking-widest text-[#1a1a1a]">Biophilic & Sustainable</h4>
                  </div>
                  <p className="text-xs text-[#4a4540] leading-relaxed font-light">
                    Preserving indigenous tree canopies, rainwater harvesting, solar micro-grids, and natural cross-ventilation.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem variant="from-behind">
                <div className="bg-white p-5 border border-[#e5e1da] hover:border-[#044F92] space-y-1.5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-[#044F92]">
                    <ShieldCheck className="w-4 h-4" />
                    <h4 className="text-[11px] uppercase font-bold tracking-widest text-[#1a1a1a]">100% Clear Titles & RERA</h4>
                  </div>
                  <p className="text-xs text-[#4a4540] leading-relaxed font-light">
                    Zero legal ambiguities, strict adherence to all municipal coastal regulations, and verified title histories.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem variant="from-behind">
                <div className="bg-white p-5 border border-[#e5e1da] hover:border-[#044F92] space-y-1.5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-[#044F92]">
                    <Sparkles className="w-4 h-4" />
                    <h4 className="text-[11px] uppercase font-bold tracking-widest text-[#1a1a1a]">Master Craftsmanship</h4>
                  </div>
                  <p className="text-xs text-[#4a4540] leading-relaxed font-light">
                    Hand-cut laterite, teakwood joinery, imported Italian marble, and Schuco German acoustic glazing.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem variant="from-behind">
                <div className="bg-white p-5 border border-[#e5e1da] hover:border-[#044F92] space-y-1.5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 text-[#044F92]">
                    <Building2 className="w-4 h-4" />
                    <h4 className="text-[11px] uppercase font-bold tracking-widest text-[#1a1a1a]">Concierge Asset Care</h4>
                  </div>
                  <p className="text-xs text-[#4a4540] leading-relaxed font-light">
                    Post-handover property maintenance, rental yield maximization, and dedicated NRI investor support.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <ScrollReveal variant="from-left" delay={0.3} className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenTourModal}
                className="px-8 py-4 bg-[#044F92] hover:bg-[#03396c] text-white font-medium text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl flex items-center gap-2 cursor-pointer group"
              >
                <span>Consult with our Principals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
