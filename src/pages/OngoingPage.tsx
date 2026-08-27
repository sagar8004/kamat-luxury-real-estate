import React from 'react';
import { motion } from 'motion/react';
import { Building2, Calendar, ShieldCheck, CheckCircle2, ArrowRight, Clock, Award, Sparkles } from 'lucide-react';
import { PropertyItem } from '../types/property';
import { PROPERTIES } from '../data/propertyService';
import { ScrollReveal } from '../components/ScrollReveal';

interface OngoingPageProps {
  onSelectProperty: (property: PropertyItem) => void;
  onNavigate: (page: string, params?: { propertyId?: string }) => void;
  onOpenTourModal: (property?: PropertyItem) => void;
}

export const OngoingPage: React.FC<OngoingPageProps> = ({
  onSelectProperty,
  onNavigate,
  onOpenTourModal
}) => {
  const ongoingProjects = PROPERTIES.filter((p) => p.status === 'ongoing');

  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Header Banner */}
      <div className="bg-[#044F92] text-white py-16 px-6 sm:px-8 lg:px-10 border-b border-[#03396c]">
        <div className="max-w-7xl mx-auto space-y-4">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em]">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
              <span>Active Construction & Milestone Progress</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={50} delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Ongoing Developments
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={40} delay={0.2}>
            <p className="text-blue-100 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Track transparent construction timelines, structural inspections, and expected handover milestones for all active Kamat projects across Goa.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14 space-y-16">
        {/* Commitment Badge Box */}
        <ScrollReveal variant="from-behind" distance={30}>
          <div className="bg-[#f2f7fc] border border-[#cfe0ee] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#044F92] text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-[#044F92]">The 100% On-Time Handover Guarantee</h3>
                <p className="text-xs text-[#4a4540] mt-0.5">
                  Every project is backed by escrow-secured Goa RERA bank accounts and audited monthly progress reports.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenTourModal()}
              className="px-6 py-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-colors shrink-0 shadow-sm cursor-pointer"
            >
              Request Site Inspection
            </button>
          </div>
        </ScrollReveal>

        {/* Detailed Projects Construction Feed */}
        <div className="space-y-12">
          {ongoingProjects.map((property, idx) => {
            const overallPercent = property.constructionStatus?.overallPercent || 65;
            const currentStage = property.constructionStatus?.milestones?.find(m => m.status === 'in-progress')?.stage || 'RCC Superstructure & Slab Casting';

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#e5e1da] hover:border-[#044F92] transition-all p-6 sm:p-8 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Image */}
                  <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden bg-[#f4f1ee] border border-[#e5e1da]">
                    <img
                      src={property.heroImage}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#044F92] text-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest shadow-md">
                      {overallPercent}% Completed
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 text-[9px] uppercase tracking-wider">
                      RERA: {property.specs.reraNumber}
                    </div>
                  </div>

                  {/* Info & Progress */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#044F92] font-semibold">
                          {property.location.area}, {property.location.region}
                        </span>
                        <span className="text-sm font-bold text-[#044F92] font-display">
                          {property.price.displayPrice}
                        </span>
                      </div>

                      <h2
                        onClick={() => {
                          onSelectProperty(property);
                          onNavigate('property-detail', { propertyId: property.id });
                        }}
                        className="font-display text-3xl text-[#1a1a1a] hover:text-[#044F92] transition-colors cursor-pointer"
                      >
                        {property.title}
                      </h2>
                      <p className="text-xs text-[#4a4540] font-light leading-relaxed">
                        {property.description}
                      </p>
                    </div>

                    {/* Progress Bar & Current Phase */}
                    <div className="space-y-2 p-4 bg-[#fdfcfb] border border-[#e5e1da]">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-[#1a1a1a] flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#044F92]" /> Current Phase: <span className="text-[#044F92] font-bold">{currentStage}</span>
                        </span>
                        <span className="font-bold text-[#044F92] font-mono">{overallPercent}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#e5e1da] overflow-hidden">
                        <div
                          className="h-full bg-[#044F92] transition-all duration-1000"
                          style={{ width: `${overallPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-[#8c857d] pt-1">
                        <span>Foundation & Structure Completed</span>
                        <span className="font-semibold text-[#1a1a1a]">Possession: {property.specs.possessionDate}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        onClick={() => {
                          onSelectProperty(property);
                          onNavigate('property-detail', { propertyId: property.id });
                        }}
                        className="px-6 py-2.5 bg-[#044F92] text-white hover:bg-[#03396c] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center gap-2"
                      >
                        <span>Explore Estate & Floor Plans</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenTourModal(property)}
                        className="px-6 py-2.5 bg-white border border-[#044F92] text-[#044F92] hover:bg-[#f2f7fc] text-xs font-semibold uppercase tracking-widest transition-colors"
                      >
                        Schedule Site Tour
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
