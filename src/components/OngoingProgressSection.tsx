import React from 'react';
import { HardHat, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { PropertyItem } from '../types/property';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface OngoingProgressSectionProps {
  ongoingProperties: PropertyItem[];
  onSelectProperty: (property: PropertyItem) => void;
  onBookSiteVisit: (property: PropertyItem) => void;
}

export const OngoingProgressSection: React.FC<OngoingProgressSectionProps> = ({
  ongoingProperties,
  onSelectProperty,
  onBookSiteVisit
}) => {
  return (
    <section id="ongoing-section" className="py-24 bg-[#fdfcfb] border-t border-[#e5e1da] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        
        {/* Section Header: Title from Left, Badge from Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <ScrollReveal variant="from-left" distance={60}>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold border-b border-[#044F92]/40 pb-1 inline-block">
                Active Construction & Handover Registry
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1a1a1a]">
                Ongoing Developments
              </h2>
              <p className="text-[#4a4540] text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                Transparent, RERA-monitored construction milestones with verified engineering progress and scheduled possession timelines across North and Central Goa.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-right" distance={40}>
            <div className="text-xs text-[#044F92] bg-[#f2f7fc] px-4 py-2.5 border border-[#cfe0ee] flex items-center gap-2 shadow-sm self-start md:self-end">
              <ShieldCheck className="w-4 h-4 text-[#044F92]" />
              <span className="text-[10px] uppercase tracking-widest font-bold">100% RERA Verified Milestones</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Ongoing Projects Grid (Staggered cards emerging from behind / left) */}
        <StaggerContainer staggerDelay={0.16} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ongoingProperties.map((property) => {
            const status = property.constructionStatus;
            const percent = status?.overallPercent || 65;

            return (
              <StaggerItem key={property.id} variant="from-behind">
                <div className="bg-white border border-[#e5e1da] hover:border-[#044F92] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Top Image Preview & Live Badge */}
                    <div className="relative aspect-[16/9] overflow-hidden group cursor-pointer bg-[#f4f1ee]" onClick={() => onSelectProperty(property)}>
                      <img
                        src={property.heroImage}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3 bg-[#044F92] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>{percent}% Completed</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-blue-200">{property.location.area}, {property.location.region}</p>
                          <h3 className="font-display text-2xl font-normal text-white">{property.title}</h3>
                        </div>
                        <span className="text-[10px] font-mono bg-white text-[#044F92] px-2.5 py-1 font-bold shadow-sm">
                          {property.specs.possessionDate}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-4">
                      {/* Overall Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                          <span className="text-[#1a1a1a] flex items-center gap-1.5 text-xs font-medium">
                            <HardHat className="w-3.5 h-3.5 text-[#044F92]" />
                            Structural & Finishing Progress
                          </span>
                          <span className="text-[#044F92] font-bold font-mono text-xs">{percent}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#f4f1ee] border border-[#e5e1da] overflow-hidden rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-[#044F92] to-[#38bdf8] transition-all duration-1000"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestone Mini-List */}
                      {status?.milestones && (
                        <div className="space-y-2 pt-2 border-t border-[#e5e1da]">
                          <p className="text-[9px] uppercase tracking-widest text-[#8c857d] font-semibold">
                            Engineering Milestones:
                          </p>
                          {status.milestones.slice(0, 3).map((milestone, i) => (
                            <div key={i} className="flex items-center justify-between text-xs bg-[#fdfcfb] p-2.5 border border-[#e5e1da] hover:border-[#cfe0ee] transition-colors">
                              <span className="text-[#4a4540] flex items-center gap-1.5 truncate text-xs">
                                {milestone.status === 'completed' ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#044F92] shrink-0" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#8c857d] shrink-0" />
                                )}
                                <span className="truncate">{milestone.stage}</span>
                              </span>
                              <span className="text-[10px] text-[#044F92] font-mono font-bold shrink-0 ml-2">
                                {milestone.progressPercent}%
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProperty(property)}
                      className="w-full py-2.5 px-3 bg-white hover:bg-[#f2f7fc] text-[#044F92] border border-[#044F92] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onBookSiteVisit(property)}
                      className="w-full py-2.5 px-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Site Visit</span>
                    </button>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
