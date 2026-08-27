import React from 'react';
import { Award, CheckCircle2, ArrowRight, Quote, Star } from 'lucide-react';
import { PropertyItem } from '../types/property';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface CompletedMilestonesSectionProps {
  completedProperties: PropertyItem[];
  onSelectProperty: (property: PropertyItem) => void;
}

const TESTIMONIALS = [
  {
    quote: "Acquiring our villa at Kamat Boulevard in Candolim has been our family's finest investment in Goa. The craftsmanship, Portuguese-modern aesthetics, and after-sales maintenance are flawless.",
    author: "Vikram & Ananya Singhania",
    residentOf: "Kamat Boulevard, Candolim",
    location: "Mumbai / Goa"
  },
  {
    quote: "Kamat Realty delivered our Dona Paula sea-facing penthouse right on schedule with zero compromises on finishes. The panoramic views and building management have exceeded our highest expectations.",
    author: "Capt. Ronald D'Souza (Retd.)",
    residentOf: "Kamat Heritage Enclave, Dona Paula",
    location: "Dubai / Goa"
  },
  {
    quote: "As an NRI buyer, transparency and title clarity were paramount. Kamat Realty provided complete peace of mind, clear RERA documentation, and exceptional rental yield management.",
    author: "Dr. Alistair Fernandes",
    residentOf: "Kamat Serena, Margao",
    location: "London, UK"
  }
];

export const CompletedMilestonesSection: React.FC<CompletedMilestonesSectionProps> = ({
  completedProperties,
  onSelectProperty
}) => {
  return (
    <section id="completed-section" className="py-24 bg-[#fdfcfb] border-t border-[#e5e1da] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold border-b border-[#044F92]/40 pb-1 inline-block">
              Delivered Heritage & Precision
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1a1a1a]">
              Completed Architectural Landmarks
            </h2>
            <p className="text-[#4a4540] text-sm sm:text-base font-light leading-relaxed">
              Every delivered Kamat residence stands as a testament to 100% on-time handover, enduring structural longevity, and elevated lifestyle value in Goa.
            </p>
          </div>
        </ScrollReveal>

        {/* Completed Properties Showcase Grid (Staggered emergence from behind) */}
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {completedProperties.map((property) => (
            <StaggerItem key={property.id} variant="from-behind">
              <div
                onClick={() => onSelectProperty(property)}
                className="group bg-white border border-[#e5e1da] hover:border-[#044F92] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1ee]">
                    <img
                      src={property.heroImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 bg-[#044F92] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5 shadow-md">
                      <Award className="w-3 h-3 text-white" />
                      <span>Delivered {property.completionYear}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-widest text-[#044F92] font-semibold">{property.location.area}, {property.location.region}</p>
                    <h3 className="font-display text-2xl font-normal text-[#1a1a1a] group-hover:text-[#044F92] transition-colors mt-1">
                      {property.title}
                    </h3>
                    <p className="text-xs text-[#4a4540] mt-1 line-clamp-2 font-light">{property.tagline}</p>

                    <div className="mt-4 pt-3 border-t border-[#e5e1da] flex items-center justify-between text-xs">
                      <span className="text-[#8c857d] font-mono text-xs">{property.specs.bhk}</span>
                      <span className="text-[#044F92] font-semibold flex items-center gap-1 text-[11px] uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#044F92]" /> 100% Inhabited
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button className="w-full py-2.5 px-3 bg-[#f2f7fc] group-hover:bg-[#044F92] text-[#044F92] group-hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 border border-[#cfe0ee] group-hover:border-[#044F92]">
                    <span>Explore Estate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Homeowner & Investor Testimonials */}
        <div className="border-t border-[#e5e1da] pt-16">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="text-center mb-12 space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#1a1a1a]">
                Voices of our Esteemed Residents
              </h3>
              <p className="text-xs text-[#044F92] uppercase tracking-widest font-bold">Trusted by leaders, industrialists, and global NRIs</p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.14} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <StaggerItem key={idx} variant="from-behind">
                <div className="bg-white p-6 border border-[#e5e1da] hover:border-[#044F92] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[#044F92]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#044F92]" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#38bdf8]" />
                    <p className="text-xs text-[#4a4540] italic leading-relaxed font-light">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#e5e1da]">
                    <p className="text-xs font-bold text-[#1a1a1a]">{t.author}</p>
                    <p className="text-[11px] text-[#044F92] font-medium">{t.residentOf}</p>
                    <p className="text-[10px] text-[#8c857d] uppercase tracking-wider">{t.location}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
