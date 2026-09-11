'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Building, ArrowUpRight, Compass, Layers, 
  Eye, Navigation, Sparkles, Filter, Check, ZoomIn, ZoomOut, RotateCcw
} from 'lucide-react';
import { PropertyItem, PropertyCategory, SingleCategory } from '../types/property';
import { CATEGORIES_LIST } from '../data/propertyService';
import { ScrollReveal } from './ScrollReveal';

interface InteractiveProjectMapProps {
  properties: PropertyItem[];
  onSelectProperty: (property: PropertyItem) => void;
  onBookTour: (property: PropertyItem) => void;
}

type MapTheme = 'voyager' | 'satellite' | 'dark';

export const InteractiveProjectMap: React.FC<InteractiveProjectMapProps> = ({
  properties,
  onSelectProperty,
  onBookTour
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});

  const [selectedPin, setSelectedPin] = useState<PropertyItem | null>(properties[0] || null);
  const [activeRegion, setActiveRegion] = useState<'all' | 'North Goa' | 'Central Goa' | 'South Goa'>('all');
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>('all');
  const [activeFilterStatus, setActiveFilterStatus] = useState<'all' | 'ongoing' | 'completed' | 'upcoming'>('all');
  const [mapTheme, setMapTheme] = useState<MapTheme>('voyager');
  const [isMapReady, setIsMapReady] = useState(false);

  // Filter properties according to category, region, and status
  const filteredPins = properties.filter((p) => {
    if (activeRegion !== 'all' && p.location.region !== activeRegion) return false;
    if (activeFilterStatus !== 'all' && p.status !== activeFilterStatus) return false;
    if (activeCategory !== 'all') {
      const pCats = Array.isArray(p.category) ? p.category : [p.category];
      if (!pCats.includes(activeCategory as SingleCategory)) return false;
    }
    return true;
  });

  // Map Tile Providers (100% Free, High Resolution, Zero API Key / Watermarks)
  const getTileUrl = (theme: MapTheme) => {
    switch (theme) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'dark':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
      case 'voyager':
      default:
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
    }
  };

  const getTileAttribution = (theme: MapTheme) => {
    switch (theme) {
      case 'satellite':
        return '&copy; Esri, Maxar, Earthstar Geographics';
      case 'dark':
        return '&copy; Esri &mdash; National Geographic';
      case 'voyager':
      default:
        return '&copy; Esri &mdash; DeLorme, NAVTEQ, TomTom';
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Prevent duplicate instances
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Default center around Goa
      const map = L.map(mapContainerRef.current, {
        center: [15.48, 73.84],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        maxZoom: 18,
        minZoom: 9
      });

      // Add Tile Layer
      const tileLayer = L.tileLayer(getTileUrl(mapTheme), {
        attribution: getTileAttribution(mapTheme),
        maxZoom: 19
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;
      setIsMapReady(true);
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer on Theme Change
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    const updateTiles = async () => {
      const L = (await import('leaflet')).default;
      if (!mapInstanceRef.current) return;

      mapInstanceRef.current.removeLayer(tileLayerRef.current);

      const newTileLayer = L.tileLayer(getTileUrl(mapTheme), {
        attribution: getTileAttribution(mapTheme),
        maxZoom: 19
      }).addTo(mapInstanceRef.current);

      tileLayerRef.current = newTileLayer;
    };

    updateTiles();
  }, [mapTheme]);

  // Update Markers on filteredPins or selectedPin change
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    const renderMarkers = async () => {
      const L = (await import('leaflet')).default;
      if (!mapInstanceRef.current) return;

      // Clear existing markers
      Object.values(markersRef.current).forEach((marker: any) => {
        mapInstanceRef.current.removeLayer(marker);
      });
      markersRef.current = {};

      filteredPins.forEach((property) => {
        const { lat, lng } = property.location.coordinates;
        const isSelected = selectedPin?.id === property.id;
        const categories = Array.isArray(property.category) ? property.category : [property.category];
        const categoryBadge = categories.map(c => c.toUpperCase()).join(' & ');

        // Create Custom HTML Pin Icon
        const markerHtml = `
          <div class="relative group cursor-pointer flex flex-col items-center">
            ${isSelected ? '<div class="absolute -inset-2.5 rounded-full bg-[#044F92]/30 kamat-pin-pulse pointer-events-none"></div>' : ''}
            
            <div class="relative z-10 flex items-center shadow-2xl transition-all duration-300 ${
              isSelected 
                ? 'scale-115 ring-2 ring-white' 
                : 'hover:scale-110'
            }">
              <div class="px-2 py-1 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md ${
                isSelected
                  ? 'bg-[#044F92] text-white'
                  : 'bg-white text-[#1a1a1a] border border-[#cfe0ee]'
              }">
                <span class="w-1.5 h-1.5 rounded-full ${
                  property.status === 'ongoing' 
                    ? 'bg-emerald-400 animate-pulse' 
                    : property.status === 'completed'
                    ? 'bg-[#044F92]'
                    : 'bg-amber-400'
                }"></span>
                <span class="font-display">${property.title}</span>
              </div>
            </div>

            <div class="w-2.5 h-2.5 bg-[#044F92] rotate-45 -mt-1 shadow-md ${isSelected ? 'bg-[#044F92]' : 'bg-white border-r border-b border-[#cfe0ee]'}"></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: 'kamat-custom-marker',
          iconSize: [160, 42],
          iconAnchor: [80, 40],
          popupAnchor: [0, -36]
        });

        // Rich Popup Content
        const popupContent = `
          <div class="w-64 bg-white overflow-hidden text-[#1a1a1a]">
            <div class="relative h-28 w-full bg-[#f2f7fc]">
              <img src="${property.heroImage}" alt="${property.title}" class="w-full h-full object-cover" />
              <div class="absolute top-2 left-2 flex gap-1">
                <span class="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-[#044F92] text-white shadow">
                  ${property.status}
                </span>
                <span class="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-white text-[#044F92] border border-[#cfe0ee] shadow">
                  ${categoryBadge}
                </span>
              </div>
            </div>
            <div class="p-3">
              <p class="text-[10px] text-[#044F92] font-semibold uppercase tracking-wider">${property.location.area}, ${property.location.region}</p>
              <h4 class="font-display font-medium text-base text-[#1a1a1a] mt-0.5 leading-tight">${property.title}</h4>
              <p class="text-xs text-[#5a554e] line-clamp-1 mt-1 font-light">${property.specs.bhk}</p>
              
              <div class="flex items-baseline justify-between mt-2.5 pt-2 border-t border-[#e5e1da]">
                <span class="text-xs font-bold text-[#044F92] font-display">${property.price.displayPrice}</span>
                <span class="text-[9px] text-[#8c857d] uppercase tracking-wider">${property.specs.possessionDate}</span>
              </div>

              <div class="grid grid-cols-2 gap-1.5 mt-3">
                <button 
                  id="popup-btn-select-${property.id}" 
                  class="w-full py-1.5 px-2 bg-white text-[#044F92] border border-[#044F92] text-[9px] font-bold uppercase tracking-wider hover:bg-[#f2f7fc] text-center"
                >
                  Blueprint
                </button>
                <button 
                  id="popup-btn-tour-${property.id}" 
                  class="w-full py-1.5 px-2 bg-[#044F92] text-white text-[9px] font-bold uppercase tracking-wider hover:bg-[#03396c] text-center"
                >
                  VIP Tour
                </button>
              </div>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current);
        marker.bindPopup(popupContent, { maxWidth: 280, closeButton: false });

        marker.on('click', () => {
          setSelectedPin(property);
          mapInstanceRef.current?.flyTo([lat, lng], 13.5, { duration: 0.8 });
        });

        marker.on('popupopen', () => {
          // Attach listeners to popup CTA buttons
          const selectBtn = document.getElementById(`popup-btn-select-${property.id}`);
          const tourBtn = document.getElementById(`popup-btn-tour-${property.id}`);

          if (selectBtn) {
            selectBtn.onclick = () => onSelectProperty(property);
          }
          if (tourBtn) {
            tourBtn.onclick = () => onBookTour(property);
          }
        });

        markersRef.current[property.id] = marker;
      });

      // If selectedPin is in filtered list, ensure view
      if (selectedPin && markersRef.current[selectedPin.id]) {
        // keep selected pin in sync
      }
    };

    renderMarkers();
  }, [filteredPins, selectedPin, isMapReady]);

  // Handle region quick navigation
  const handleRegionClick = (region: 'all' | 'North Goa' | 'Central Goa' | 'South Goa') => {
    setActiveRegion(region);

    if (!mapInstanceRef.current) return;

    switch (region) {
      case 'North Goa':
        mapInstanceRef.current.flyTo([15.58, 73.78], 12.5, { duration: 1 });
        break;
      case 'Central Goa':
        mapInstanceRef.current.flyTo([15.49, 73.82], 13, { duration: 1 });
        break;
      case 'South Goa':
        mapInstanceRef.current.flyTo([15.28, 73.96], 12.5, { duration: 1 });
        break;
      case 'all':
      default:
        mapInstanceRef.current.flyTo([15.48, 73.84], 11, { duration: 1 });
        break;
    }
  };

  // Zoom controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetView = () => mapInstanceRef.current?.flyTo([15.48, 73.84], 11, { duration: 1 });

  return (
    <ScrollReveal variant="from-behind" distance={30}>
      <div className="w-full bg-white border border-[#e5e1da] shadow-2xl overflow-hidden">
        {/* Map Header Controls Bar */}
        <div className="p-4 sm:p-6 border-b border-[#e5e1da] flex flex-wrap items-center justify-between gap-4 bg-[#fdfcfb]">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#044F92]" />
              <h3 className="font-display text-xl sm:text-2xl font-normal text-[#1a1a1a]">
                Goa Architectural Cartography
              </h3>
            </div>
            <p className="font-primary text-xs text-[#8c857d] mt-0.5">
              Explore real-world GPS coordinates, transit metrics, and masterplans across Goa.
            </p>
          </div>

          {/* Filter Bar: Category, Status, Region & Map Style */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Dropdown Filter */}
            <div className="relative">
              <select
                id="map-category-filter"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value as PropertyCategory)}
                className="bg-white border border-[#cfe0ee] text-xs font-medium text-[#044F92] px-3 py-2 focus:outline-none focus:border-[#044F92] cursor-pointer shadow-sm"
              >
                {CATEGORIES_LIST.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Selectors */}
            <div className="hidden sm:flex items-center bg-[#f2f7fc] p-1 border border-[#cfe0ee] text-xs">
              {(['all', 'North Goa', 'Central Goa', 'South Goa'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => handleRegionClick(reg)}
                  className={`px-3 py-1 text-[11px] uppercase tracking-widest font-medium transition-all ${
                    activeRegion === reg
                      ? 'bg-[#044F92] text-white font-semibold shadow-sm'
                      : 'text-[#5a554e] hover:text-[#044F92]'
                  }`}
                >
                  {reg === 'all' ? 'All Goa' : reg.replace(' Goa', '')}
                </button>
              ))}
            </div>

            {/* Map Theme Toggle */}
            <div className="flex items-center bg-[#f4f1ee] p-1 border border-[#e5e1da]">
              {(['voyager', 'satellite', 'dark'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setMapTheme(theme)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold transition-all ${
                    mapTheme === theme
                      ? 'bg-white text-[#1a1a1a] shadow-sm'
                      : 'text-[#8c857d] hover:text-[#1a1a1a]'
                  }`}
                  title={`Switch to ${theme} map style`}
                >
                  {theme === 'voyager' ? 'Detailed' : theme === 'satellite' ? 'Satellite' : 'Night'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid: Real Leaflet Map + Selected Property Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative min-h-[580px]">
          {/* Real Leaflet Map Stage */}
          <div className="lg:col-span-8 relative min-h-[440px] sm:min-h-[560px] bg-[#e8ecef] overflow-hidden">
            {/* The Actual Leaflet Map Canvas */}
            <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />

            {/* Custom Luxury Floating Controls Overlay */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1.5 border border-[#cfe0ee] shadow-lg">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-[#f2f7fc] text-[#044F92] transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-[#f2f7fc] text-[#044F92] transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="w-full h-px bg-[#e5e1da] my-0.5" />
              <button
                onClick={handleResetView}
                className="p-2 hover:bg-[#f2f7fc] text-[#044F92] transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Status & Count Pill */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 border border-[#cfe0ee] shadow-md flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-[#1a1a1a]">{filteredPins.length} Residences Plotted</span>
              </div>
              <span className="text-[#8c857d] hidden sm:inline">|</span>
              <span className="text-[11px] text-[#5a554e] hidden sm:inline">Click any pin to inspect masterplan</span>
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
                  {/* Image Preview & Badges */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f1ee] border border-[#e5e1da] group">
                    <img
                      src={selectedPin.heroImage}
                      alt={selectedPin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#044F92] text-white shadow-sm">
                        {selectedPin.status.toUpperCase()}
                      </span>
                      {(Array.isArray(selectedPin.category) ? selectedPin.category : [selectedPin.category]).map((c) => (
                        <span key={c} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-white text-[#044F92] border border-[#cfe0ee] shadow-sm">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-primary text-[10px] uppercase tracking-widest text-[#044F92] font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#044F92]" />
                      {selectedPin.location.area}, {selectedPin.location.region}
                    </p>
                    <h4 className="font-display text-2xl font-medium text-[#1a1a1a] mt-1">{selectedPin.title}</h4>
                    <p className="text-xs text-[#5a554e] font-light mt-1 line-clamp-2">{selectedPin.tagline}</p>
                  </div>

                  {/* Specs & Pricing */}
                  <div className="bg-[#f2f7fc] p-4 border border-[#cfe0ee] space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-primary text-[#8c857d] text-[10px] uppercase tracking-widest">Typology</span>
                      <span className="font-secondary font-medium text-[#1a1a1a]">{selectedPin.specs.bhk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-primary text-[#8c857d] text-[10px] uppercase tracking-widest">Area Size</span>
                      <span className="font-secondary font-medium text-[#1a1a1a]">{selectedPin.specs.sqftRange}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#cfe0ee]">
                      <span className="font-primary text-[#8c857d] text-[10px] uppercase tracking-widest">Starting Price</span>
                      <span className="font-bold text-[#044F92] font-display text-lg">{selectedPin.price.displayPrice}</span>
                    </div>
                  </div>

                  {/* Nearby Landmarks Distances */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#8c857d] font-semibold mb-2">
                      Proximity & Key Connectivity:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedPin.landmarks.slice(0, 4).map((landmark, idx) => (
                        <div key={idx} className="bg-[#fdfcfb] p-2.5 border border-[#e5e1da] text-xs">
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
                      className="w-full py-3 bg-[#044F92] hover:bg-[#03396c] text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <span>Inspect Blueprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onBookTour(selectedPin)}
                      className="w-full py-2.5 bg-white border border-[#044F92] hover:bg-[#f2f7fc] text-[#044F92] text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Schedule VIP Tour</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-6 text-[#8c857d] text-xs font-light">
                Select any project marker on the map to inspect specifications.
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};
