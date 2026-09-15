'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Grid, List, MapPin, Building, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PropertyItem, PropertyFilterState, ProjectStatus, PropertyCategory } from '../types/property';
import { PROPERTIES, filterProperties, LOCATIONS_LIST, CATEGORIES_LIST, STATUS_LIST } from '../data/propertyService';
import { ProjectCard } from '../components/ProjectCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';

interface ProjectsPageProps {
  onSelectProperty?: (property: PropertyItem) => void;
  onNavigate?: (page: string, params?: { propertyId?: string }) => void;
  onOpenTourModal?: (property?: PropertyItem) => void;
  initialStatus?: ProjectStatus;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onSelectProperty,
  onNavigate,
  onOpenTourModal,
  initialStatus = 'all'
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tourModalContext = useTourModal();

  const handleSelect = (property: PropertyItem) => {
    if (onSelectProperty) {
      onSelectProperty(property);
    } else {
      router.push(`/property/${property.id}`);
    }
  };

  const handleTour = (property?: PropertyItem) => {
    if (onOpenTourModal) {
      onOpenTourModal(property);
    } else {
      tourModalContext.openTourModal(property);
    }
  };

  const getInitialFilters = (): PropertyFilterState => {
    const qParam = searchParams?.get('q') || searchParams?.get('searchQuery') || '';
    const areaParam = searchParams?.get('area') || 'All Locations';
    const categoryParam = (searchParams?.get('category') as PropertyCategory) || 'all';
    const statusParam = (searchParams?.get('status') as ProjectStatus) || (searchParams?.get('filterStatus') as ProjectStatus) || initialStatus || 'all';
    const regionParam = searchParams?.get('region') || 'All';

    return {
      status: statusParam,
      category: categoryParam,
      region: regionParam,
      area: areaParam,
      minPrice: 0,
      maxPrice: 100000000,
      bedrooms: 'any',
      searchQuery: qParam,
      viewMode: 'grid'
    };
  };

  const [filters, setFilters] = useState<PropertyFilterState>(getInitialFilters);

  // Synchronize when searchParams change
  useEffect(() => {
    if (!searchParams) return;
    const qParam = searchParams.get('q') || searchParams.get('searchQuery') || '';
    const areaParam = searchParams.get('area') || 'All Locations';
    const categoryParam = (searchParams.get('category') as PropertyCategory) || 'all';
    const statusParam = (searchParams.get('status') as ProjectStatus) || (searchParams.get('filterStatus') as ProjectStatus) || initialStatus || 'all';
    const regionParam = searchParams.get('region') || 'All';

    setFilters((prev) => ({
      ...prev,
      searchQuery: qParam,
      area: areaParam,
      category: categoryParam,
      status: statusParam,
      region: regionParam,
    }));
  }, [searchParams, initialStatus]);

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      region: 'All',
      area: 'All Locations',
      minPrice: 0,
      maxPrice: 100000000,
      bedrooms: 'any',
      searchQuery: '',
      viewMode: 'grid'
    });
    router.replace('/projects', { scroll: false });
  };

  const filteredProperties = useMemo(() => {
    return filterProperties(PROPERTIES, filters);
  }, [filters]);

  const ongoingCount = PROPERTIES.filter((p) => p.status === 'ongoing').length;
  const completedCount = PROPERTIES.filter((p) => p.status === 'completed').length;
  const upcomingCount = PROPERTIES.filter((p) => p.status === 'upcoming').length;

  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Page Header */}
      <div className="bg-[#044F92] text-white py-16 px-6 sm:px-8 lg:px-10 border-b border-[#03396c]">
        <div className="max-w-7xl mx-auto space-y-4">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em]">
              <span>Architectural Portfolio</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={50} delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Curated Goa Developments
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={40} delay={0.2}>
            <p className="text-blue-100 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Explore our collection of sea-facing residences, private garden villas, and commercial spaces across Goa’s prime postcodes.
            </p>
          </ScrollReveal>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => setFilters({ ...filters, status: 'all' })}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                filters.status === 'all'
                  ? 'bg-white text-[#044F92] font-semibold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              All Projects ({PROPERTIES.length})
            </button>
            <button
              onClick={() => setFilters({ ...filters, status: 'ongoing' })}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                filters.status === 'ongoing'
                  ? 'bg-white text-[#044F92] font-semibold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Ongoing Projects ({ongoingCount})
            </button>
            <button
              onClick={() => setFilters({ ...filters, status: 'completed' })}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                filters.status === 'completed'
                  ? 'bg-white text-[#044F92] font-semibold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Delivered Landmarks ({completedCount})
            </button>
            <button
              onClick={() => setFilters({ ...filters, status: 'upcoming' })}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                filters.status === 'upcoming'
                  ? 'bg-white text-[#044F92] font-semibold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Pre-Launch ({upcomingCount})
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-12 space-y-8">
        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-[#e5e1da] p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c857d]" />
              <input
                type="text"
                placeholder="Search by name, location (Assagao, Miramar)..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92] transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value as PropertyCategory })}
                className="w-full px-3 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
              >
                {CATEGORIES_LIST.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={filters.area}
                onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                className="w-full px-3 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
              >
                {LOCATIONS_LIST.map((loc) => (
                  <option key={loc.area} value={loc.area}>{loc.area}</option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="w-full px-3 py-2.5 bg-[#fdfcfb] border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#044F92]"
              >
                <option value="All">All Goa Regions</option>
                <option value="North Goa">North Goa</option>
                <option value="Central Goa">Central Goa</option>
                <option value="South Goa">South Goa</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#e5e1da] text-xs text-[#8c857d]">
            <p>
              Showing <span className="font-semibold text-[#044F92]">{filteredProperties.length}</span> luxury developments
            </p>

            {(filters.searchQuery || filters.status !== 'all' || filters.category !== 'all' || filters.region !== 'All' || filters.area !== 'All Locations') && (
              <button
                onClick={handleResetFilters}
                className="text-[#044F92] font-semibold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white border border-[#e5e1da] p-10 space-y-4"
          >
            <h3 className="font-display text-2xl text-[#1a1a1a]">No properties matched your criteria</h3>
            <p className="text-xs text-[#8c857d]">Try adjusting your search filters or browse all our ongoing projects.</p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#044F92] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#03396c] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard
                    property={property}
                    onSelectProperty={handleSelect}
                    onQuickBookTour={(p) => handleTour(p)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
