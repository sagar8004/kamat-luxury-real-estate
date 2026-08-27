import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, MapPin, Building, Calendar, ShieldCheck, CheckCircle2, 
  Compass, Download, Share2, Sparkles, Phone, Mail, ChevronRight, 
  Maximize2, Bed, Bath, Layers, Droplets, Sun, Wind, MessageSquare, ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PropertyItem } from '../types/property';
import { PROPERTIES } from '../data/propertyService';

interface PropertyDetailPageProps {
  property: PropertyItem;
  onBack: () => void;
  onOpenTourModal: (property?: PropertyItem) => void;
  onNavigate: (page: string, params?: { propertyId?: string }) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onOpenTourModal,
  onNavigate
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplans' | 'amenities' | 'specifications' | 'pricing'>('overview');
  const [brochureSent, setBrochureSent] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<number>(0);

  const allImages = [property.heroImage, ...(property.gallery || [])];

  const handleDownloadBrochure = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setBrochureSent(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#044F92', '#38bdf8', '#ffffff']
    });
  };

  const overallPercent = property.constructionStatus?.overallPercent || (property.status === 'completed' ? 100 : 70);
  const currentStage = property.constructionStatus?.milestones?.find(m => m.status === 'in-progress')?.stage || (property.status === 'completed' ? 'Delivered & Inhabited' : 'Superstructure & Facade');

  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Top Breadcrumbs & Back Bar */}
      <div className="bg-[#f2f7fc] border-b border-[#cfe0ee] py-4 px-6 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#044F92] font-semibold hover:text-[#033463] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Developments</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#8c857d]">
            <span className="hidden sm:inline cursor-pointer hover:text-[#044F92]" onClick={() => onNavigate('projects')}>Goa Luxury Portfolio</span>
            <ChevronRight className="w-3 h-3 hidden sm:inline" />
            <span className="text-[#044F92] font-semibold">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-8 space-y-12">
        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#e5e1da] pb-8">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-[#044F92] text-white text-[10px] uppercase tracking-widest font-semibold">
                {property.status.toUpperCase()}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#044F92] font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {property.location.area}, {property.location.region}
              </span>
              <span className="text-xs text-[#8c857d] border-l border-[#e5e1da] pl-3">
                RERA: {property.specs.reraNumber}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1a1a]">
              {property.title}
            </h1>
            <p className="text-[#4a4540] text-sm sm:text-base font-light max-w-3xl">
              {property.tagline}
            </p>
          </div>

          <div className="lg:text-right space-y-2 shrink-0">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-bold">Price Guidance</p>
            <p className="font-display text-3xl sm:text-4xl text-[#044F92]">
              {property.price.displayPrice}
            </p>
            <p className="text-[11px] text-[#8c857d]">Possession: {property.specs.possessionDate}</p>
          </div>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#f4f1ee] border border-[#e5e1da]">
            <img
              src={allImages[activeImageIndex] || property.heroImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {property.status === 'ongoing' && (
              <div className="absolute top-4 left-4 bg-[#044F92] text-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest shadow-lg">
                {overallPercent}% Completed • {currentStage}
              </div>
            )}
          </div>

          {/* Thumbnail Strip & Quick Actions */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {allImages.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[4/3] overflow-hidden cursor-pointer border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#044F92]' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Quick Action Box */}
            <div className="bg-[#f2f7fc] p-6 border border-[#cfe0ee] space-y-4">
              <h3 className="font-display text-xl text-[#044F92]">Schedule Private Viewing</h3>
              <p className="text-xs text-[#4a4540]">
                Chauffeured site visits available Monday to Sunday from Panaji headquarters.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => onOpenTourModal(property)}
                  className="w-full py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
                >
                  Book Chauffeured Tour
                </button>
                <a
                  href={`https://wa.me/918322223456?text=Hello%20Kamat%20Realty%2C%20I%20am%20interested%20in%20learning%20more%20about%20${encodeURIComponent(property.title)}%20in%20${encodeURIComponent(property.location.area)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-white border border-[#044F92] text-[#044F92] hover:bg-white/80 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#044F92]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white border border-[#e5e1da] shadow-sm text-center">
          <div className="p-3 border-r border-[#e5e1da] last:border-none">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Typology</p>
            <p className="font-display text-xl text-[#1a1a1a] mt-1">{property.specs.bhk}</p>
          </div>
          <div className="p-3 border-r border-[#e5e1da] last:border-none">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Built-Up Area</p>
            <p className="font-display text-xl text-[#1a1a1a] mt-1">{property.specs.sqftRange}</p>
          </div>
          <div className="p-3 border-r border-[#e5e1da] last:border-none">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Total Units</p>
            <p className="font-display text-xl text-[#1a1a1a] mt-1">{property.specs.totalUnits} Exclusive Units</p>
          </div>
          <div className="p-3">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Architectural Style</p>
            <p className="font-display text-lg text-[#1a1a1a] mt-1">{property.architecturalStyle}</p>
          </div>
        </div>

        {/* Navigation Tabs for Deep Information */}
        <div className="space-y-8">
          <div className="flex border-b border-[#e5e1da] overflow-x-auto no-scrollbar gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${
                activeTab === 'overview' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
              }`}
            >
              Architectural Overview
            </button>
            <button
              onClick={() => setActiveTab('floorplans')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${
                activeTab === 'floorplans' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
              }`}
            >
              Floor Plans & Layouts ({property.floorPlans?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${
                activeTab === 'amenities' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
              }`}
            >
              Amenities & Enclave Features
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${
                activeTab === 'specifications' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
              }`}
            >
              Structural Specs & Materials
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${
                activeTab === 'pricing' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
              }`}
            >
              Payment Structure & Dossier
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white p-8 border border-[#e5e1da] shadow-sm">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-[#1a1a1a]">Curated Coastal Narrative</h3>
                <p className="text-sm text-[#4a4540] font-light leading-relaxed">
                  {property.description}
                </p>

                {/* Highlights list */}
                {property.highlights && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs uppercase tracking-widest text-[#044F92] font-bold">Key Estate Highlights</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a]">
                          <CheckCircle2 className="w-4 h-4 text-[#044F92] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nearby landmarks */}
                {property.landmarks && property.landmarks.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-[#e5e1da]">
                    <p className="text-xs uppercase tracking-widest text-[#044F92] font-bold">Nearby Landmarks & Transit</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {property.landmarks.map((l, i) => (
                        <div key={i} className="p-3 bg-[#f2f7fc] border border-[#cfe0ee] text-xs">
                          <p className="font-bold text-[#1a1a1a]">{l.name}</p>
                          <p className="text-[#044F92] font-medium mt-0.5">{l.distance}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'floorplans' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-[#1a1a1a]">Architectural Floor Plans</h3>
                {property.floorPlans && property.floorPlans.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-3">
                      {property.floorPlans.map((fp, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedFloorPlan(idx)}
                          className={`w-full text-left p-4 border transition-all ${
                            selectedFloorPlan === idx
                              ? 'bg-[#f2f7fc] border-[#044F92] text-[#044F92]'
                              : 'bg-white border-[#e5e1da] text-[#1a1a1a] hover:border-[#044F92]'
                          }`}
                        >
                          <p className="font-bold text-sm">{fp.name}</p>
                          <p className="text-xs text-[#8c857d] mt-1">{fp.type} • Carpet: {fp.carpetArea}</p>
                          {fp.priceEstimate && (
                            <p className="text-xs font-semibold text-[#044F92] mt-1">{fp.priceEstimate}</p>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="lg:col-span-8 p-4 bg-[#fdfcfb] border border-[#e5e1da] flex flex-col items-center justify-center">
                      <img
                        src={property.floorPlans[selectedFloorPlan]?.image || property.heroImage}
                        alt="Floor Plan"
                        className="max-h-[400px] w-auto object-contain"
                      />
                      <p className="text-xs text-[#8c857d] mt-4 font-light">
                        {property.floorPlans[selectedFloorPlan]?.name} - Super Built-up: {property.floorPlans[selectedFloorPlan]?.superBuiltUp}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#8c857d]">Floor plans available upon request during private consultation.</p>
                )}
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-[#1a1a1a]">Bespoke Lifestyle Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="p-4 bg-[#f2f7fc] border border-[#cfe0ee] flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#044F92] shrink-0" />
                      <span className="text-xs font-medium text-[#1a1a1a]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-[#1a1a1a]">Engineering & Material Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-3 p-4 bg-[#fdfcfb] border border-[#e5e1da]">
                    <p className="font-bold text-[#044F92] uppercase tracking-wider">Structure & Masonry</p>
                    <p className="text-[#4a4540]">Earthquake-resistant RCC framed structure with corrosion-resistant Fe550D TMT steel bars and laterite stone thermal insulation.</p>
                  </div>
                  <div className="space-y-3 p-4 bg-[#fdfcfb] border border-[#e5e1da]">
                    <p className="font-bold text-[#044F92] uppercase tracking-wider">Flooring & Finishes</p>
                    <p className="text-[#4a4540]">Imported Italian Botticino marble in living suites; handcrafted antique Portuguese terracotta in open decks.</p>
                  </div>
                  <div className="space-y-3 p-4 bg-[#fdfcfb] border border-[#e5e1da]">
                    <p className="font-bold text-[#044F92] uppercase tracking-wider">Sanitaryware & Fittings</p>
                    <p className="text-[#4a4540]">Concealed Grohe/Hansgrohe matte black thermostatic fixtures with Duravit German sanitary ceramics.</p>
                  </div>
                  <div className="space-y-3 p-4 bg-[#fdfcfb] border border-[#e5e1da]">
                    <p className="font-bold text-[#044F92] uppercase tracking-wider">Electrical & Eco Provisions</p>
                    <p className="text-[#4a4540]">100% DG power backup, Schneider modular automation switches, and dedicated EV charging ports per villa.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <h3 className="font-display text-2xl text-[#1a1a1a]">Construction-Linked Milestone Plan</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                    <span>1. Booking Token & Allotment</span>
                    <span className="font-bold text-[#044F92]">10%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                    <span>2. Execution of Agreement of Sale (RERA)</span>
                    <span className="font-bold text-[#044F92]">20%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                    <span>3. Completion of Plinth & Foundation</span>
                    <span className="font-bold text-[#044F92]">15%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                    <span>4. Slab Castings & Structural Framework</span>
                    <span className="font-bold text-[#044F92]">25%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#fdfcfb] border border-[#e5e1da]">
                    <span>5. Flooring, Finishing & Glazing</span>
                    <span className="font-bold text-[#044F92]">20%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#044F92] text-white">
                    <span>6. Handover & Key Handover / Possession</span>
                    <span className="font-bold">10%</span>
                  </div>
                </div>

                {/* Instant Brochure Dispatch */}
                <div className="mt-6 p-6 bg-[#f2f7fc] border border-[#cfe0ee] space-y-3">
                  <h4 className="font-display text-xl text-[#044F92]">Download Official Architectural Dossier</h4>
                  <p className="text-xs text-[#4a4540]">Receive high-resolution floor plans, unit allocations, and structural specs directly in your inbox.</p>
                  {brochureSent ? (
                    <p className="text-xs font-semibold text-[#044F92]">
                      ✓ Architectural Dossier dispatched to {emailInput}. Our VIP concierge will also reach out shortly.
                    </p>
                  ) : (
                    <form onSubmit={handleDownloadBrochure} className="flex gap-2 max-w-md">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="flex-1 px-3.5 py-2 bg-white border border-[#cfe0ee] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-colors shrink-0"
                      >
                        Send Dossier
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
