import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Building, ArrowUpRight, Compass } from 'lucide-react';
import { PropertyItem } from '../types/property';
import { ScrollReveal } from './ScrollReveal';

interface InteractiveProjectMapProps {
  properties: PropertyItem[];
  onSelectProperty: (property: PropertyItem) => void;
  onBookTour: (property: PropertyItem) => void;
}

export const InteractiveProjectMap: React.FC<InteractiveProjectMapProps> = ({
  properties,
  onSelectProperty,
  onBookTour
}) => {
  const [selectedPin, setSelectedPin] = useState<PropertyItem | null>(properties[0] || null);
  const [activeRegion, setActiveRegion] = useState<'all' | 'North Goa' | 'Central Goa' | 'South Goa'>('all');
  const [activeFilterStatus, setActiveFilterStatus] = useState<'all' | 'ongoing' | 'completed' | 'upcoming'>('all');

  const filteredPins = properties.filter((p) => {
    if (activeRegion !== 'all' && p.location.region !== activeRegion) return false;
    if (activeFilterStatus !== 'all' && p.status !== activeFilterStatus) return false;
    return true;
  });

  return (
    <ScrollReveal variant="from-behind" distance={30}>
      <div className="w-full bg-white border border-[#e5e1da] shadow-lg overflow-hidden">
        {/* Map Header Toolbar */}
        <div className="p-6 border-b border-[#e5e1da] flex flex-wrap items-center justify-between gap-4 bg-[#fdfcfb]">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#044F92]" />
              <h3 className="font-secondary text-xl sm:text-2xl font-normal text-[#1a1a1a]">
                Goa Architectural Cartography
              </h3>
            </div>
            <p className="font-primary text-xs text-[#8c857d] mt-1 font-normal">
              Select a project waypoint to inspect masterplan details, location advantages, and proximity.
            </p>
          </div>

          {/* Region & Status Filters on Map */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Region Tabs */}
            <div className="flex items-center bg-[#f4f1ee] p-1 border border-[#e5e1da] text-xs">
              {(['all', 'North Goa', 'Central Goa', 'South Goa'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setActiveRegion(reg)}
                  className={`px-3 py-1 text-[11px] uppercase tracking-widest font-medium transition-all ${activeRegion === reg
                    ? 'bg-white text-[#1a1a1a] font-semibold shadow-sm'
                    : 'text-[#8c857d] hover:text-[#1a1a1a]'
                    }`}
                >
                  {reg === 'all' ? 'All Goa' : reg.replace(' Goa', '')}
                </button>
              ))}
            </div>

            {/* Status Quick Filter */}
            <select
              value={activeFilterStatus}
              onChange={(e) => setActiveFilterStatus(e.target.value as any)}
              className="bg-white border border-[#e5e1da] text-xs text-[#1a1a1a] px-3 py-1.5 focus:outline-none focus:border-[#1a1a1a]"
            >
              <option value="all">All Enclaves ({properties.length})</option>
              <option value="ongoing">Ongoing Only</option>
              <option value="completed">Delivered Landmarks</option>
              <option value="upcoming">Pre-Launch</option>
            </select>
          </div>
        </div>

        {/* Main Map Container & Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative min-h-[560px]">
          {/* Cartography Canvas */}
          <div className="lg:col-span-8 relative bg-[#f4f1ee] p-6 sm:p-10 flex items-center justify-center overflow-hidden min-h-[420px] sm:min-h-[540px]">
            {/* Editorial Dot Grid Texture */}
            <div className="absolute inset-0 editorial-dots opacity-60 pointer-events-none" />

            {/* Stylized Goa Coastline Contour Shape */}
            <div className="relative w-full max-w-lg aspect-[3/4] sm:aspect-[4/5] bg-white border border-[#e5e1da] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              {/* North Goa Region Guide Label */}
              <div className="flex justify-between items-start text-xs border-b border-[#e5e1da] pb-2">
                <span className="text-[#8c857d] uppercase tracking-widest font-semibold text-[10px] font-secondary">
                  North Goa • Siolim / Assagao / Candolim / Porvorim
                </span>
                <span className="text-[10px] text-[#8c857d] font-primary">Mopa Int'l ↗</span>
              </div>

              {/* Central Goa / Mandovi Basin Guide Label */}
              <div className="flex justify-between items-center text-xs py-2 border-b border-[#e5e1da] my-auto">
                <span className="text-[#8c857d] uppercase tracking-widest font-semibold text-[10px] font-secondary">
                  Central Goa • Panaji / Miramar / Dona Paula
                </span>
                <span className="text-[10px] text-[#8c857d] font-primary">Mandovi River 〰</span>
              </div>

              {/* South Goa Region Guide Label */}
              <div className="flex justify-between items-end text-xs border-t border-[#e5e1da] pt-2">
                <span className="text-[#8c857d] uppercase tracking-widest font-semibold text-[10px] font-secondary">
                  South Goa • Margao / Colva / Salcete
                </span>
                <span className="text-[10px] text-[#8c857d] font-primary">↙ Dabolim Airport</span>
              </div>

              {/* Stylized Geographic Waterways and Landmark Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 30 Q 30 180 55 320 T 70 520" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 55 240 Q 150 245 280 230" fill="none" stroke="#1a1a1a" strokeWidth="2" />
                <path d="M 40 80 Q 120 75 220 90" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
                <path d="M 65 300 Q 140 310 240 295" fill="none" stroke="#1a1a1a" strokeWidth="1.5" />
              </svg>

              {/* Landmark Waypoints on Map */}
              <div className="absolute top-[8%] right-[10%] text-[10px] text-[#4a4540] bg-[#f4f1ee] px-2 py-0.5 border border-[#e5e1da] pointer-events-none font-primary">
                ✈ Mopa Airport
              </div>
              <div className="absolute top-[52%] right-[12%] text-[10px] text-[#4a4540] bg-[#f4f1ee] px-2 py-0.5 border border-[#e5e1da] pointer-events-none font-primary">
                ✈ Dabolim Airport
              </div>
              <div className="absolute top-[38%] left-[8%] text-[10px] text-[#4a4540] bg-[#f4f1ee] px-2 py-0.5 border border-[#e5e1da] pointer-events-none font-primary">
                🏖 Candolim Shore
              </div>

              {/* Interactive Pins for Filtered Properties */}
              {filteredPins.map((property) => {
                const isSelected = selectedPin?.id === property.id;
                const coords = property.location.coordinates;

                return (
                  <button
                    key={property.id}
                    id={`map-pin-${property.id}`}
                    onClick={() => setSelectedPin(property)}
                    style={{
                      left: `${coords.xPercent}%`,
                      top: `${coords.yPercent}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-all duration-300 z-30 ${isSelected ? 'scale-125 z-40' : 'hover:scale-115'
                      }`}
                    aria-label={`Select ${property.title}`}
                  >
                    {/* Pin Circle */}
                    <div
                      className={`w-8 h-8 flex items-center justify-center transition-all ${isSelected
                        ? 'bg-[#1a1a1a] text-white ring-4 ring-[#e5e1da] shadow-lg'
                        : 'bg-white text-[#1a1a1a] border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white shadow-sm'
                        }`}
                    >
                      <Building className="w-3.5 h-3.5" />
                    </div>

                    {/* Pin Tooltip label */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold transition-all pointer-events-none shadow-md ${isSelected
                        ? 'bg-[#1a1a1a] text-white opacity-100'
                        : 'bg-white text-[#1a1a1a] border border-[#e5e1da] opacity-0 group-hover:opacity-100'
                        }`}
                    >
                      {property.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white p-3 border border-[#e5e1da] text-[10px] uppercase tracking-widest flex flex-wrap items-center gap-4 text-[#4a4540] shadow-sm">
              <span className="font-semibold text-[#8c857d]">Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
                <span>Active Pin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-[#1a1a1a]" />
                <span>Available Residence</span>
              </div>
            </div>
          </div>

          {/* Right Detail Card for Selected Pin */}
          <div className="lg:col-span-4 bg-white border-t lg:border-t-0 lg:border-l border-[#e5e1da] p-6 sm:p-8 flex flex-col justify-between">
            {selectedPin ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPin.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Image Preview */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1ee] border border-[#e5e1da] group">
                    <img
                      src={selectedPin.heroImage}
                      alt={selectedPin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-white text-[#1a1a1a] border border-[#e5e1da]">
                        {selectedPin.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="font-primary text-[10px] uppercase tracking-widest text-[#8c857d] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#044F92]" />
                      {selectedPin.location.area}, {selectedPin.location.region}
                    </p>
                    <h4 className="font-secondary text-2xl font-medium text-[#1a1a1a] mt-1">{selectedPin.title}</h4>
                  </div>

                  {/* Specs & Pricing */}
                  <div className="bg-[#fdfcfb] p-4 border border-[#e5e1da] space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-primary text-[#8c857d] text-[10px] uppercase tracking-widest">Typology</span>
                      <span className="font-secondary font-medium text-[#1a1a1a]">{selectedPin.specs.bhk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-primary text-[#8c857d] text-[10px] uppercase tracking-widest">Area Size</span>
                      <span className="font-secondary font-medium text-[#1a1a1a]">{selectedPin.specs.sqftRange}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#e5e1da]">
                      <span className="font-primary text-[#8c857d] text-[10px] uppercase tracking-widest">Starting Price</span>
                      <span className="font-bold text-[#044F92] font-secondary text-lg">{selectedPin.price.displayPrice}</span>
                    </div>
                  </div>

                  {/* Nearby Landmarks Distances */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-2">
                      Proximity & Connectivity:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedPin.landmarks.map((landmark, idx) => (
                        <div key={idx} className="bg-[#f4f1ee] p-2 border border-[#e5e1da] text-xs">
                          <p className="text-[#1a1a1a] font-medium truncate font-primary">{landmark.name}</p>
                          <p className="text-[#044F92] text-[10px] font-secondary font-bold mt-0.5">{landmark.distance}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => onSelectProperty(selectedPin)}
                      className="w-full py-3 bg-[#1a1a1a] hover:bg-[#333] text-white font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Inspect Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onBookTour(selectedPin)}
                      className="w-full py-2.5 bg-white border border-[#e5e1da] hover:bg-[#f4f1ee] text-[#1a1a1a] text-xs font-medium uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Schedule Location Tour</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-6 text-[#8c857d] text-xs font-light">
                Select any project waypoint on the cartography map to view specifications.
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};
