import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, Plane, Sun, Clock, Sparkles, Building, ArrowRight } from 'lucide-react';
import { PropertyItem } from '../types/property';
import { PROPERTIES } from '../data/propertyService';
import { InteractiveProjectMap } from '../components/InteractiveProjectMap';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface LocationsPageProps {
  onSelectProperty: (property: PropertyItem) => void;
  onNavigate: (page: string, params?: { propertyId?: string }) => void;
  onOpenTourModal: () => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({
  onSelectProperty,
  onNavigate,
  onOpenTourModal
}) => {
  const enclaves = [
    {
      name: 'Assagao & Vagator',
      region: 'North Goa',
      vibe: 'High-Fashion Dining & Heritage Forest Sylvan Serenity',
      mopaAirport: '30 mins',
      dabolimAirport: '60 mins',
      nearby: ['Gunpowder', 'Subko Coffee', 'Thalassa', 'Vagator Beach'],
      propertiesCount: PROPERTIES.filter((p) => p.location.area.includes('Assagao') || p.location.area.includes('Vagator')).length
    },
    {
      name: 'Miramar & Panaji Capital',
      region: 'Central Goa',
      vibe: 'Promenade Sunsets, Yacht Clubs & High-Court Elite Quarter',
      mopaAirport: '42 mins',
      dabolimAirport: '35 mins',
      nearby: ['Miramar Beach', 'Goa Marriott', 'Fontainhas Latin Quarter', 'Mandovi Marina'],
      propertiesCount: PROPERTIES.filter((p) => p.location.area.includes('Miramar') || p.location.area.includes('Panaji') || p.location.area.includes('Caranzalem')).length
    },
    {
      name: 'Candolim & Sinquerim Beach Strip',
      region: 'North Goa',
      vibe: 'Golden Sand Coastline, 5-Star Beach Resorts & Fine Dining',
      mopaAirport: '40 mins',
      dabolimAirport: '50 mins',
      nearby: ['Taj Fort Aguada', 'Candolim Beach', 'LPK Waterfront', 'Bambolim Yacht'],
      propertiesCount: PROPERTIES.filter((p) => p.location.area.includes('Candolim')).length
    },
    {
      name: 'Porvorim Prime Ridge',
      region: 'Central Goa',
      vibe: 'Executive Hilltop Connectivity Between North & Central Goa',
      mopaAirport: '35 mins',
      dabolimAirport: '45 mins',
      nearby: ['Mall De Goa', 'Goa Secretariat', 'Panaji Bridge', 'Chorao Bird Sanctuary'],
      propertiesCount: PROPERTIES.filter((p) => p.location.area.includes('Porvorim')).length
    }
  ];

  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Header */}
      <div className="bg-[#044F92] text-white py-16 px-6 sm:px-8 lg:px-10 border-b border-[#03396c]">
        <div className="max-w-7xl mx-auto space-y-4">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em]">
              <MapPin className="w-3.5 h-3.5 text-blue-200" />
              <span>Goa Enclaves & Strategic Connectivity</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={50} delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Interactive Enclave Map
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={40} delay={0.2}>
            <p className="text-blue-100 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Explore Kamat residences across Goa’s most coveted coastal and urban locations, with precise transit metrics to international airports, private marinas, and gourmet strips.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-14 space-y-16">
        {/* Interactive Map Component */}
        <ScrollReveal variant="from-behind" distance={30}>
          <div className="bg-white p-6 sm:p-8 border border-[#e5e1da] shadow-lg">
            <div className="mb-6 space-y-1">
              <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
                Pinpoint Project Geolocation
              </h2>
              <p className="text-xs text-[#8c857d]">Click on any enclave pin to inspect property specifications, possession year, and distance metrics.</p>
            </div>

            <InteractiveProjectMap
              properties={PROPERTIES}
              onSelectProperty={(p) => {
                onSelectProperty(p);
                onNavigate('property-detail', { propertyId: p.id });
              }}
              onBookTour={() => onOpenTourModal()}
            />
          </div>
        </ScrollReveal>

        {/* Enclave Lifestyle Cards */}
        <div className="space-y-8">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="border-b border-[#e5e1da] pb-4">
              <h2 className="font-display text-3xl text-[#1a1a1a]">
                Key Geographic Quadrants
              </h2>
              <p className="text-xs text-[#8c857d] mt-1">Understanding the investment yields and lifestyle distinction of Goa's prime micro-markets.</p>
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.14} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enclaves.map((enclave, idx) => (
              <StaggerItem key={idx} variant="from-behind">
                <div className="bg-white border border-[#e5e1da] hover:border-[#044F92] p-8 space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#044F92] font-semibold">{enclave.region}</span>
                      <h3 className="font-display text-2xl text-[#1a1a1a] mt-1">{enclave.name}</h3>
                    </div>
                    <span className="text-xs px-3 py-1 bg-[#f2f7fc] text-[#044F92] border border-[#cfe0ee] font-semibold">
                      {enclave.propertiesCount} Estates
                    </span>
                  </div>

                  <p className="text-xs text-[#4a4540] italic bg-[#fdfcfb] p-3 border-l-2 border-[#044F92]">
                    "{enclave.vibe}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-[#f2f7fc] border border-[#cfe0ee]">
                      <div className="flex items-center gap-1.5 text-[#044F92] font-semibold">
                        <Plane className="w-3.5 h-3.5" />
                        <span>Mopa Int'l (GOX)</span>
                      </div>
                      <p className="text-base font-display text-[#1a1a1a] mt-1">{enclave.mopaAirport}</p>
                    </div>

                    <div className="p-3 bg-[#f2f7fc] border border-[#cfe0ee]">
                      <div className="flex items-center gap-1.5 text-[#044F92] font-semibold">
                        <Plane className="w-3.5 h-3.5" />
                        <span>Dabolim Int'l (GOI)</span>
                      </div>
                      <p className="text-base font-display text-[#1a1a1a] mt-1">{enclave.dabolimAirport}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-bold">Key Neighborhood Highlights:</p>
                    <div className="flex flex-wrap gap-2">
                      {enclave.nearby.map((place, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 bg-white border border-[#e5e1da] text-[#4a4540]">
                          {place}
                        </span>
                      ))}
                    </div>
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
