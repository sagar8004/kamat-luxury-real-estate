import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, Star, Quote, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { PropertyItem } from '../types/property';
import { PROPERTIES } from '../data/propertyService';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface CompletedPageProps {
  onSelectProperty: (property: PropertyItem) => void;
  onNavigate: (page: string, params?: { propertyId?: string }) => void;
  onOpenTourModal: (property?: PropertyItem) => void;
}

export const CompletedPage: React.FC<CompletedPageProps> = ({
  onSelectProperty,
  onNavigate,
  onOpenTourModal
}) => {
  const completedProjects = PROPERTIES.filter((p) => p.status === 'completed');

  const testimonials = [
    {
      quote: "Our villa at Kamat Horizon in Miramar is an architectural sanctuary. The cross-ventilation, teak woodwork, and after-sales maintenance team in Panaji is unparalleled.",
      author: "Vikram & Ananya Singhania",
      residentOf: "Kamat Horizon Residence, Miramar",
      location: "Resident since 2021"
    },
    {
      quote: "As an NRI based in London, transparent timelines were paramount. Kamat delivered Riviera Manor two months ahead of schedule with flawless legal title registration.",
      author: "Dr. Alistair D'Souza",
      residentOf: "Riviera Manor, Candolim",
      location: "Resident since 2020"
    },
    {
      quote: "The rental yields on our Porvorim penthouse have averaged 11.4% annually. The property management concierge takes care of everything seamlessly.",
      author: "Siddharth Verma",
      residentOf: "Kamat Emerald Towers, Porvorim",
      location: "Resident since 2019"
    }
  ];

  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Header */}
      <div className="bg-[#044F92] text-white py-16 px-6 sm:px-8 lg:px-10 border-b border-[#03396c]">
        <div className="max-w-7xl mx-auto space-y-4">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em]">
              <Award className="w-3.5 h-3.5 text-blue-200" />
              <span>Delivered Heritage & Excellence</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={50} delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Completed Architectural Landmarks
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={40} delay={0.2}>
            <p className="text-blue-100 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Every delivered Kamat residence stands as a monument to 100% on-time handover, enduring structural longevity, and elevated lifestyle appreciation across Goa.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14 space-y-20">
        {/* Completed Properties Grid */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {completedProjects.map((property) => (
            <StaggerItem key={property.id} variant="from-behind">
              <div
                onClick={() => {
                  onSelectProperty(property);
                  onNavigate('property-detail', { propertyId: property.id });
                }}
                className="group bg-white border border-[#e5e1da] hover:border-[#044F92] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1ee]">
                    <img
                      src={property.heroImage}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-[#044F92] px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-white flex items-center gap-1.5 shadow-sm">
                      <Award className="w-3 h-3 text-white" />
                      <span>Delivered {property.completionYear || 'Heritage'}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-[#044F92] font-semibold">{property.location.area}, {property.location.region}</p>
                    <h3 className="font-display text-2xl text-[#1a1a1a] group-hover:text-[#044F92] transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-xs text-[#4a4540] line-clamp-2 font-light">{property.tagline}</p>

                    <div className="pt-3 border-t border-[#e5e1da] flex items-center justify-between text-xs">
                      <span className="text-[#8c857d] font-mono text-xs">{property.specs.bhk}</span>
                      <span className="text-[#044F92] font-medium flex items-center gap-1 text-[11px] uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#044F92]" /> 100% Inhabited
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button className="w-full py-2.5 px-3 bg-[#f2f7fc] group-hover:bg-[#044F92] text-[#044F92] group-hover:text-white text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 border border-[#cfe0ee]">
                    <span>Explore Delivered Estate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Resident Testimonials */}
        <div className="border-t border-[#e5e1da] pt-16 space-y-12">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Homeowner Experiences
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#1a1a1a]">
                Voices of our Esteemed Residents
              </h2>
              <p className="text-xs text-[#8c857d] uppercase tracking-widest font-medium">Trusted by industrialists, NRI professionals, and connoisseurs</p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.14} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <StaggerItem key={idx} variant="from-behind">
                <div className="bg-white p-8 border border-[#e5e1da] hover:border-[#044F92] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-[#044F92]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#044F92]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#044F92]/40" />
                    <p className="text-xs text-[#4a4540] italic leading-relaxed font-light">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e5e1da]">
                    <p className="text-xs font-bold text-[#1a1a1a]">{t.author}</p>
                    <p className="text-[11px] text-[#044F92] font-medium">{t.residentOf}</p>
                    <p className="text-[10px] text-[#8c857d] uppercase tracking-wider mt-0.5">{t.location}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
};
