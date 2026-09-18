'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, MapPin, Building, Calendar, ShieldCheck, CheckCircle2,
  Compass, Download, Share2, Sparkles, Phone, Mail, ChevronRight,
  Maximize2, Bed, Bath, Layers, Droplets, Sun, Wind, MessageSquare, ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PropertyItem } from '../types/property';
import { PROPERTIES } from '../data/propertyService';
import { useTourModal } from '../context/TourModalContext';
import { formatAreaUnit, AreaUnit } from '../utils/areaConverter';
import { getLandmarkIcon, getLandmarkLabel } from '../utils/landmarkIcons';

interface PropertyDetailPageProps {
  property: PropertyItem;
  onBack?: () => void;
  onOpenTourModal?: (property?: PropertyItem) => void;
  onNavigate?: (page: string, params?: { propertyId?: string }) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onOpenTourModal,
  onNavigate
}) => {
  const router = useRouter();
  const tourModalContext = useTourModal();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/projects');
    }
  };

  const handleTour = (prop?: PropertyItem) => {
    if (onOpenTourModal) {
      onOpenTourModal(prop || property);
    } else {
      tourModalContext.openTourModal(prop || property);
    }
  };

  const navigate = (page: string, params?: { propertyId?: string }) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else if (params?.propertyId) {
      router.push(`/property/${params.propertyId}`);
    } else {
      router.push(page === 'home' ? '/' : `/${page}`);
    }
  };
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'floorplans' | 'amenities' | 'specifications' | 'pricing'>('overview');
  const [brochureSent, setBrochureSent] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<number>(0);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('sqmts');

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
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#044F92] font-semibold hover:text-[#033463] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Developments</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8c857d]">Goa RERA Regulated</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* Hero Showcase */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-8 space-y-10">
        {/* Header Titles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e5e1da]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#044F92] font-semibold uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              <span>{property.location.area}, {property.location.region}, Goa</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a]">
              {property.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#8c857d] font-light max-w-2xl">{property.tagline}</p>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Starting Price</p>
            <p className="font-mono text-3xl sm:text-4xl font-bold text-[#044F92]">{property.price.displayPrice}</p>
            <p className="text-[11px] text-emerald-700 font-medium">Clear Title • 100% Freehold</p>
          </div>
        </div>

        {/* Image Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#f4f1ee] shadow-sm">
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
                  className={`aspect-[4/3] overflow-hidden cursor-pointer border-2 transition-all ${activeImageIndex === idx ? 'border-[#044F92]' : 'border-transparent opacity-75 hover:opacity-100'
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
                  onClick={() => handleTour(property)}
                  className="w-full py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white border border-[#e5e1da] shadow-sm text-center items-stretch">
          <div className="p-3 border-r border-[#e5e1da] last:border-none flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Typology</p>
            <p className="font-display text-lg text-[#044F92] font-semibold mt-1">{property.specs.bhk}</p>
          </div>
          <div className="p-3 border-r border-[#e5e1da] last:border-none flex flex-col justify-between items-center bg-[#fdfcfb]">
            <div className="w-full flex items-center justify-between gap-1">
              <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Built-Up Area</p>
              {/* Unit Toggle Switch */}
              <div
                className="inline-flex items-center p-0.5 bg-[#eae6df] rounded-full border border-[#d8d2c7] shadow-inner"
                role="group"
                aria-label="Area Unit Switcher"
              >
                <button
                  type="button"
                  onClick={() => setAreaUnit('sqmts')}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${areaUnit === 'sqmts'
                    ? 'bg-[#044F92] text-white shadow-xs'
                    : 'text-[#5c554e] hover:text-[#1a1a1a]'
                    }`}
                  title="Goa Standard (Square Metres)"
                >
                  Sq.Mts
                </button>
                <button
                  type="button"
                  onClick={() => setAreaUnit('sqft')}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${areaUnit === 'sqft'
                    ? 'bg-[#044F92] text-white shadow-xs'
                    : 'text-[#5c554e] hover:text-[#1a1a1a]'
                    }`}
                  title="Delhi / Metro Standard (Square Feet)"
                >
                  Sq.Ft
                </button>
              </div>
            </div>
            <motion.p
              key={areaUnit}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="font-display text-lg text-[#044F92] font-semibold mt-1"
            >
              {formatAreaUnit(property.specs.sqftRange, areaUnit)}
            </motion.p>
            <p className="text-[9px] text-[#8c857d] mt-0.5">
              {areaUnit === 'sqmts' ? 'Standard (1 Sq.M = 10.76 Sq.Ft)' : '(Converted)'}
            </p>
          </div>
          <div className="p-3 border-r border-[#e5e1da] last:border-none flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Total Units</p>
            <p className="font-display text-lg text-[#044F92] font-semibold mt-1">{property.specs.totalUnits} Exclusive Units</p>
          </div>
          <div className="p-3 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">Architectural Style</p>
            <p className="font-display text-lg text-[#044F92] font-semibold mt-1">{property.architecturalStyle}</p>
          </div>
        </div>

        {/* Navigation Tabs for Deep Information */}
        <div className="space-y-8">
          <div className="flex border-b border-[#e5e1da] overflow-x-auto no-scrollbar gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${activeTab === 'overview' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
                }`}
            >
              Architectural Overview
            </button>
            <button
              onClick={() => setActiveTab('floorplans')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${activeTab === 'floorplans' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
                }`}
            >
              Floor Plans & Layouts ({property.floorPlans?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${activeTab === 'amenities' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
                }`}
            >
              Amenities & Enclave Features
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${activeTab === 'specifications' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
                }`}
            >
              Structural Specs & Materials
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 ${activeTab === 'pricing' ? 'text-[#044F92] border-b-2 border-[#044F92]' : 'text-[#8c857d] hover:text-[#1a1a1a]'
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

                {/* Nearby landmarks & Transit */}
                {property.landmarks && property.landmarks.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-[#e5e1da]">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-widest text-[#044F92] font-bold flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#044F92]" />
                        Nearby Landmarks & Transit
                      </p>
                      <span className="text-[10px] text-[#8c857d] font-mono">
                        {property.landmarks.length} Connected Locations
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {property.landmarks.map((l, i) => (
                        <div
                          key={i}
                          className="p-3.5 bg-[#f2f7fc] border border-[#cfe0ee] hover:border-[#044F92] transition-colors flex items-start gap-3 rounded-none shadow-xs group"
                        >
                          <div className="w-8 h-8 rounded-md bg-white border border-[#cfe0ee] text-[#044F92] flex items-center justify-center shrink-0 group-hover:bg-[#044F92] group-hover:text-white transition-colors">
                            {getLandmarkIcon(l.type, { className: 'w-4 h-4 transition-colors' })}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-xs text-[#1a1a1a] line-clamp-1 group-hover:text-[#044F92] transition-colors">
                              {l.name}
                            </p>
                            <div className="flex items-center justify-between mt-1 gap-1">
                              <span className="text-xs font-semibold text-[#044F92] font-mono">
                                {l.distance}
                              </span>
                              <span className="text-[9px] uppercase tracking-wider text-[#8c857d] bg-white/80 px-1.5 py-0.5 border border-[#cfe0ee] truncate max-w-[90px]">
                                {l.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'floorplans' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-display text-2xl text-[#1a1a1a]">Architectural Floor Plans</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8c857d]">Area Unit:</span>
                    <div
                      className="inline-flex items-center p-0.5 bg-[#eae6df] rounded-full border border-[#d8d2c7]"
                      role="group"
                      aria-label="Area Unit Switcher"
                    >
                      <button
                        type="button"
                        onClick={() => setAreaUnit('sqmts')}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${areaUnit === 'sqmts'
                          ? 'bg-[#044F92] text-white shadow-xs'
                          : 'text-[#5c554e] hover:text-[#1a1a1a]'
                          }`}
                      >
                        Sq.Mts (Goa)
                      </button>
                      <button
                        type="button"
                        onClick={() => setAreaUnit('sqft')}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${areaUnit === 'sqft'
                          ? 'bg-[#044F92] text-white shadow-xs'
                          : 'text-[#5c554e] hover:text-[#1a1a1a]'
                          }`}
                      >
                        Sq.Ft (Metro)
                      </button>
                    </div>
                  </div>
                </div>

                {property.floorPlans && property.floorPlans.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-3">
                      {property.floorPlans.map((fp, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedFloorPlan(idx)}
                          className={`w-full text-left p-4 border transition-all ${selectedFloorPlan === idx
                            ? 'bg-[#f2f7fc] border-[#044F92] text-[#044F92]'
                            : 'bg-white border-[#e5e1da] text-[#1a1a1a] hover:border-[#044F92]'
                            }`}
                        >
                          <p className="font-bold text-sm">{fp.name}</p>
                          <p className="text-xs text-[#8c857d] mt-1">{fp.type} • Carpet: {formatAreaUnit(fp.carpetArea, areaUnit)}</p>
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
                        {property.floorPlans[selectedFloorPlan]?.name} - Super Built-up: {formatAreaUnit(property.floorPlans[selectedFloorPlan]?.superBuiltUp, areaUnit)}
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
                    <p className="text-[#4a4540]">R.C.C. framed structure with laterite/brick masonry external walls and brick masonry internal walls. O.T.I.S./Mitsubishi/equivalent brand lifts.</p>
                  </div>
                  <div className="space-y-3 p-4 bg-[#fdfcfb] border border-[#e5e1da]">
                    <p className="font-bold text-[#044F92] uppercase tracking-wider">Sanitaryware & Fittings</p>
                    <p className="text-[#4a4540]">Jaquar/Kohler sanitaryware with floor/wall mounted E.W.C.s, under-counter/wall-mounted wash basins, chrome-plated fittings, and provision for geysers and exhaust fans.</p>
                  </div>
                  <div className="space-y-3 p-4 bg-[#fdfcfb] border border-[#e5e1da]">
                    <p className="font-bold text-[#044F92] uppercase tracking-wider">Flooring & Finishes</p>
                    <p className="text-[#4a4540]">Lobby flooring with Kota/granite/natural stone; stilt areas paved with concrete pavers; staircase treads and risers finished with Kota/granite/natural stone. Apartments feature glazed vitrified flooring, glazed ceramic tiles for balconies, and anti-skid ceramic tiles with glazed ceramic tile dado for toilets.</p>
                  </div>
                  <div className="space-y-3 p-4 bg-[#fdfcfb] border border-[#e5e1da]">
                    <p className="font-bold text-[#044F92] uppercase tracking-wider">Doors, Windows & Electrical</p>
                    <p className="text-[#4a4540]">Main door with T.W. frame and T.W. panelled shutter; internal doors with T.W. frames and flush shutters or equivalent. Balcony doors and windows with powder-coated/anodized aluminium glazed sliding shutters. Concealed wiring with KEI/Anchor cables and Legrand modular switches. Provision for inverter and air-conditioners in the apartment.</p>
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

        {/* Brand Partners Section */}
        <section className="pt-10 border-t border-[#e5e1da] space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f2f7fc] border border-[#cfe0ee] text-[#044F92] text-[10px] font-semibold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trusted Building Collaborators</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#1a1a1a] tracking-tight font-normal">
              Strong Partnerships. Exceptional Spaces.
            </h2>
            <p className="text-xs sm:text-sm text-[#8c857d] font-light leading-relaxed">
              Collaborating with trusted experts to create thoughtfully designed developments across Goa.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: 'Kohler',
                category: 'Sanitaryware & Bath Fixtures',
                logo: '/brand-logos/kohler.png',
              },
              {
                name: 'Jaquar',
                category: 'Premium Bath Fittings',
                logo: '/brand-logos/jaquar.png',
              },
              {
                name: 'Schindler',
                category: 'Elevators & Mobility',
                logo: '/brand-logos/schindler.png',
              },
              {
                name: 'Kajaria',
                category: 'Vitrified Tiles & Surfaces',
                logo: '/brand-logos/kajaria.png',
              },
              {
                name: 'Johnson',
                category: 'Ceramics & Natural Finishes',
                logo: '/brand-logos/johnson.png',
              },
              {
                name: 'Somany',
                category: 'Surfaces & Bathware',
                logo: '/brand-logos/somany.png',
              },
              {
                name: 'Anchor',
                category: 'Electricals & Modular Switches',
                logo: '/brand-logos/anchor.webp',
              },
              {
                name: 'KEI',
                category: 'Cables & Heavy Infrastructure',
                logo: '/brand-logos/kei.png',
              },
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-white border border-[#e5e1da] p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:border-[#044F92] hover:shadow-md group min-h-[140px]"
              >
                <div className="w-full flex-1 flex items-center justify-center p-2">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2 border-t border-[#f4f1ee] w-full">
                  <p className="text-[11px] font-semibold text-[#1a1a1a] tracking-wide">
                    {partner.name}
                  </p>
                  <p className="text-[9px] text-[#8c857d] uppercase tracking-wider mt-0.5 truncate">
                    {partner.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#f2f7fc] border border-[#cfe0ee] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#044F92] shrink-0" />
              <p className="text-xs text-[#4a4540]">
                Every Kamat Realty residence is crafted with 100% genuine, OEM-warranty backed materials and fixtures.
              </p>
            </div>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#044F92] shrink-0">
              Zero Compromise Quality
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

