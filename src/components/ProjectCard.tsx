'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { PropertyItem } from '../types/property';

interface ProjectCardProps {
  property: PropertyItem;
  onSelectProperty?: (property: PropertyItem) => void;
  onQuickBookTour: (property: PropertyItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  property,
  onSelectProperty,
  onQuickBookTour
}) => {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [property.heroImage, ...(property.gallery || [])].slice(0, 4);

  const getStatusBadge = () => {
    switch (property.status) {
      case 'ongoing':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#044F92] text-white text-[9px] font-semibold uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Ongoing • {property.constructionStatus?.overallPercent || 70}% Built</span>
          </div>
        );
      case 'completed':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[#044F92] border border-[#cfe0ee] text-[9px] font-bold uppercase tracking-widest shadow-sm">
            <span>Delivered {property.completionYear ? `(${property.completionYear})` : 'Landmark'}</span>
          </div>
        );
      case 'upcoming':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#eef5fb] text-[#044F92] border border-[#cfe0ee] text-[9px] font-bold uppercase tracking-widest">
            <span>Pre-Launch</span>
          </div>
        );
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white border border-[#e5e1da] hover:border-[#044F92] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Hover zoom & Carousel dots */}
        <div className="relative aspect-[16/11] overflow-hidden bg-[#f2f7fc] cursor-pointer" onClick={() => onSelectProperty ? onSelectProperty(property) : router.push(`/property/${property.id}`)}>
          <img
            src={images[activeImageIndex] || property.heroImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
          />

          {/* Top Badges: Status & Typology */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
            {getStatusBadge()}
            <div className="flex flex-wrap items-center justify-end gap-1 max-w-[60%]">
              {(Array.isArray(property.category) ? property.category : [property.category]).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-white text-[#044F92] border border-[#cfe0ee] shadow-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Multi-Image Indicator Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-2 py-1 bg-black/40 backdrop-blur-sm">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(i);
                  }}
                  className={`h-1 transition-all ${
                    activeImageIndex === i ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card Content Area */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-[#044F92] text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{property.location.area}, {property.location.region}</span>
          </div>

          <h3 className="font-display text-2xl text-[#1a1a1a] mb-2 leading-tight group-hover:text-[#044F92] transition-colors">
            {property.title}
          </h3>

          <p className="text-[#5a554e] text-xs line-clamp-2 mb-4 font-light leading-relaxed">
            {property.tagline}
          </p>

          {/* Specs Mini-Grid */}
          <div className="grid grid-cols-2 gap-2 py-3 border-y border-[#e5e1da] text-xs mb-4">
            <div>
              <span className="text-[9px] text-[#8c857d] uppercase tracking-widest block font-medium">Typology</span>
              <p className="text-[#1a1a1a] font-medium truncate mt-0.5">{property.specs.bhk}</p>
            </div>
            <div>
              <span className="text-[9px] text-[#8c857d] uppercase tracking-widest block font-medium">Built-Up</span>
              <p className="text-[#1a1a1a] font-medium truncate mt-0.5">{property.specs.sqftRange}</p>
            </div>
          </div>

          {/* Price and Possession */}
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-[9px] text-[#8c857d] uppercase tracking-widest font-semibold">Starting From</p>
              <p className="text-lg font-bold text-[#044F92] font-display">{property.price.displayPrice}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-[#8c857d] uppercase tracking-widest font-semibold">Possession</p>
              <p className="text-xs text-[#4a4540] font-medium">{property.specs.possessionDate}</p>
            </div>
          </div>

          {/* Highlight Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {property.highlights.slice(0, 2).map((highlight, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 bg-[#f2f7fc] text-[#044F92] border border-[#cfe0ee] truncate max-w-full font-medium"
              >
                • {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-2">
        <Link
          href={`/property/${property.id}`}
          onClick={(e) => {
            if (onSelectProperty) {
              e.preventDefault();
              onSelectProperty(property);
            }
          }}
          id={`view-details-${property.id}`}
          className="w-full py-2.5 px-3 bg-white text-[#044F92] border border-[#044F92] hover:bg-[#f2f7fc] text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
        >
          <span>Blueprint</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#044F92]" />
        </Link>

        <button
          onClick={() => onQuickBookTour(property)}
          id={`book-tour-${property.id}`}
          className="w-full py-2.5 px-3 bg-[#044F92] text-white hover:bg-[#03396c] text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>VIP Tour</span>
        </button>
      </div>
    </motion.article>
  );
};

