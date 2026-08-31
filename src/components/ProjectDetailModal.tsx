'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MapPin, Download, Calendar, ShieldCheck, 
  CheckCircle2, Compass, Layers, Check, Phone, ArrowRight, Share2, Eye
} from 'lucide-react';
import { PropertyItem } from '../types/property';

interface ProjectDetailModalProps {
  property: PropertyItem | null;
  onClose: () => void;
  onBookSiteVisit: (property: PropertyItem) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  property,
  onClose,
  onBookSiteVisit
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'floorplans' | 'amenities' | 'construction' | 'location'>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downloadedBrochure, setDownloadedBrochure] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) return null;

  const allImages = [property.heroImage, ...(property.gallery || [])];

  const handleDownloadBrochure = () => {
    setDownloadedBrochure(true);
    setTimeout(() => setDownloadedBrochure(false), 3500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
        {/* Backdrop dismiss */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-white border border-[#e5e1da] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="p-6 border-b border-[#e5e1da] flex items-center justify-between bg-[#fdfcfb]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest bg-[#1a1a1a] text-white">
                  {property.status} • {property.category}
                </span>
                <span className="text-xs text-[#8c857d] font-mono hidden sm:inline">{property.specs.reraNumber}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl italic font-normal text-[#1a1a1a] mt-1">
                {property.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 bg-white border border-[#e5e1da] text-[#4a4540] hover:text-[#1a1a1a] hover:bg-[#f4f1ee] transition-colors"
                title="Share Project"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#1a1a1a]" /> : <Share2 className="w-4 h-4 text-[#1a1a1a]" />}
              </button>
              <button
                onClick={onClose}
                className="p-2.5 bg-white border border-[#e5e1da] text-[#4a4540] hover:text-[#1a1a1a] hover:bg-[#f4f1ee] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-[#1a1a1a]" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 px-6 py-3 bg-[#f4f1ee] border-b border-[#e5e1da] overflow-x-auto text-xs font-medium scrollbar-none">
            {[
              { id: 'overview', label: 'Overview & Vision' },
              { id: 'gallery', label: `Gallery (${allImages.length})` },
              { id: 'floorplans', label: `Floor Plans (${property.floorPlans?.length || 0})` },
              { id: 'amenities', label: 'Amenities & Finishes' },
              ...(property.constructionStatus ? [{ id: 'construction', label: `Live Progress (${property.constructionStatus.overallPercent}%)` }] : []),
              { id: 'location', label: 'Location & Distances' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 uppercase tracking-widest text-[11px] font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1a1a1a] text-white shadow-sm'
                    : 'text-[#8c857d] hover:text-[#1a1a1a] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Image & Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1ee] border border-[#e5e1da]">
                    <img
                      src={property.heroImage}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-white px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#1a1a1a] border border-[#e5e1da] shadow-sm font-medium">
                      {property.architecturalStyle}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl italic font-normal text-[#1a1a1a] mb-2">
                      Architectural Vision
                    </h3>
                    <p className="text-[#4a4540] text-sm leading-relaxed font-light">
                      {property.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-3">
                      Signature Highlights
                    </h4>
                    <div className="space-y-2">
                      {property.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#1a1a1a] bg-[#fdfcfb] p-3 border border-[#e5e1da]">
                          <CheckCircle2 className="w-4 h-4 text-[#1a1a1a] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Specifications & Quick Action */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-[#fdfcfb] p-6 border border-[#e5e1da] space-y-4">
                    <div>
                      <p className="text-[10px] text-[#8c857d] uppercase tracking-widest font-semibold">Starting Investment</p>
                      <p className="font-serif text-3xl font-normal italic text-[#1a1a1a] mt-1">{property.price.displayPrice}</p>
                      {property.price.unitPrice && (
                        <p className="text-xs text-[#8c857d] font-mono mt-0.5">{property.price.unitPrice}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#e5e1da] text-xs">
                      <div>
                        <p className="text-[#8c857d] text-[9px] uppercase tracking-widest font-semibold">Typology</p>
                        <p className="font-medium text-[#1a1a1a] mt-0.5">{property.specs.bhk}</p>
                      </div>
                      <div>
                        <p className="text-[#8c857d] text-[9px] uppercase tracking-widest font-semibold">Area Range</p>
                        <p className="font-medium text-[#1a1a1a] mt-0.5">{property.specs.sqftRange}</p>
                      </div>
                      <div>
                        <p className="text-[#8c857d] text-[9px] uppercase tracking-widest font-semibold">Possession</p>
                        <p className="font-medium text-[#1a1a1a] mt-0.5">{property.specs.possessionDate}</p>
                      </div>
                      <div>
                        <p className="text-[#8c857d] text-[9px] uppercase tracking-widest font-semibold">Total Units</p>
                        <p className="font-medium text-[#1a1a1a] mt-0.5">{property.specs.totalUnits} Residences</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#e5e1da] text-xs space-y-1 text-[#4a4540]">
                      <p className="flex items-center gap-1.5 text-[#1a1a1a]">
                        <MapPin className="w-3.5 h-3.5 text-[#8c857d]" />
                        <span>{property.location.address}</span>
                      </p>
                    </div>

                    {/* Action buttons inside card */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => onBookSiteVisit(property)}
                        className="w-full py-3 bg-[#1a1a1a] hover:bg-[#333] text-white font-medium text-xs uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 transition-all"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule VIP Site Visit</span>
                      </button>

                      <button
                        onClick={handleDownloadBrochure}
                        className="w-full py-2.5 bg-white hover:bg-[#f4f1ee] text-[#1a1a1a] text-xs font-medium uppercase tracking-widest border border-[#e5e1da] flex items-center justify-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4 text-[#1a1a1a]" />
                        <span>{downloadedBrochure ? 'Brochure PDF Downloaded!' : 'Download E-Brochure'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                {/* Main Lightbox View */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#f4f1ee] border border-[#e5e1da]">
                  <img
                    src={allImages[activeImageIndex] || property.heroImage}
                    alt={`${property.title} gallery`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs text-[#1a1a1a] border border-[#e5e1da] font-mono">
                    {activeImageIndex + 1} / {allImages.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] overflow-hidden border transition-all ${
                        activeImageIndex === idx ? 'border-[#1a1a1a]' : 'border-[#e5e1da] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: FLOOR PLANS */}
            {activeTab === 'floorplans' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.floorPlans?.map((plan, idx) => (
                    <div key={idx} className="bg-[#fdfcfb] p-6 border border-[#e5e1da] space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif text-xl italic font-normal text-[#1a1a1a]">{plan.name}</h4>
                          <p className="text-xs text-[#8c857d]">{plan.type}</p>
                        </div>
                        {plan.priceEstimate && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 bg-white text-[#1a1a1a] border border-[#e5e1da]">
                            {plan.priceEstimate}
                          </span>
                        )}
                      </div>

                      <div className="aspect-[4/3] overflow-hidden bg-white border border-[#e5e1da] p-2">
                        <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#e5e1da]">
                        <div>
                          <p className="text-[#8c857d] text-[9px] uppercase tracking-widest font-semibold">Carpet Area</p>
                          <p className="text-[#1a1a1a] font-medium mt-0.5">{plan.carpetArea}</p>
                        </div>
                        <div>
                          <p className="text-[#8c857d] text-[9px] uppercase tracking-widest font-semibold">Super Built-Up</p>
                          <p className="text-[#1a1a1a] font-medium mt-0.5">{plan.superBuiltUp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: AMENITIES */}
            {activeTab === 'amenities' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="bg-[#fdfcfb] p-5 border border-[#e5e1da] flex flex-col items-center justify-center text-center space-y-2 hover:border-[#1a1a1a] transition-colors"
                    >
                      <span className="text-xs text-[#1a1a1a] font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CONSTRUCTION STATUS */}
            {activeTab === 'construction' && property.constructionStatus && (
              <div className="space-y-6">
                {/* Overall status card */}
                <div className="bg-[#fdfcfb] p-6 border border-[#e5e1da] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold">On-Site Progress</span>
                    <h3 className="font-serif text-3xl italic font-normal text-[#1a1a1a] mt-1">
                      {property.constructionStatus.overallPercent}% Execution Complete
                    </h3>
                    <p className="text-xs text-[#8c857d] mt-1">Verified status as of {property.constructionStatus.lastUpdated}</p>
                  </div>
                  <div className="w-24 h-24 border border-[#e5e1da] flex items-center justify-center bg-white">
                    <span className="text-2xl font-serif text-[#1a1a1a]">{property.constructionStatus.overallPercent}%</span>
                  </div>
                </div>

                {/* Milestone breakdown timeline */}
                <div className="space-y-3">
                  {property.constructionStatus.milestones.map((milestone, idx) => (
                    <div key={idx} className="bg-[#fdfcfb] p-4 border border-[#e5e1da] space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 font-medium text-[#1a1a1a]">
                          {milestone.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-[#1a1a1a]" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-[#8c857d]" />
                          )}
                          <span>{milestone.stage}</span>
                        </div>
                        <span className="font-mono text-[#8c857d] text-[11px]">
                          {milestone.dateCompleted ? `Done: ${milestone.dateCompleted}` : `Target: ${milestone.targetDate}`}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-[#f4f1ee] border border-[#e5e1da] overflow-hidden">
                        <div
                          className="h-full bg-[#1a1a1a] transition-all duration-1000"
                          style={{ width: `${milestone.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: LOCATION & DISTANCES */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <div className="bg-[#fdfcfb] p-6 border border-[#e5e1da] space-y-2">
                  <h4 className="font-serif text-xl italic font-normal text-[#1a1a1a]">Address & Connectivity</h4>
                  <p className="text-xs text-[#4a4540]">{property.location.address}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {property.landmarks.map((landmark, idx) => (
                    <div key={idx} className="bg-[#fdfcfb] p-4 border border-[#e5e1da] space-y-1">
                      <p className="text-xs font-semibold text-[#1a1a1a]">{landmark.name}</p>
                      <p className="text-sm font-bold text-[#1a1a1a] font-mono">{landmark.distance}</p>
                      <span className="text-[10px] uppercase tracking-widest text-[#8c857d]">{landmark.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-6 border-t border-[#e5e1da] flex flex-wrap items-center justify-between gap-4 bg-[#fdfcfb]">
            <div className="text-xs text-[#8c857d]">
              <span className="text-[#1a1a1a] font-semibold">{property.title}</span> • {property.location.city}, Goa
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white border border-[#e5e1da] text-[#1a1a1a] hover:bg-[#f4f1ee] text-xs font-medium uppercase tracking-widest transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => onBookSiteVisit(property)}
                className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#333] text-white font-medium text-xs uppercase tracking-widest transition-colors shadow-sm"
              >
                Schedule Site Visit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
