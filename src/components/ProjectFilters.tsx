'use client';

import React from 'react';
import { Search, MapPin, Grid, Map as MapIcon, X, Layers } from 'lucide-react';
import { PropertyFilterState, ProjectStatus, PropertyCategory } from '../types/property';
import { LOCATIONS_LIST, CATEGORIES_LIST, STATUS_LIST } from '../data/propertyService';

interface ProjectFiltersProps {
  filters: PropertyFilterState;
  setFilters: React.Dispatch<React.SetStateAction<PropertyFilterState>>;
  totalResults: number;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  setFilters,
  totalResults
}) => {
  const handleStatusChange = (status: ProjectStatus) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const handleCategoryChange = (category: PropertyCategory) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleAreaChange = (area: string) => {
    setFilters(prev => ({ ...prev, area }));
  };

  const handleBedroomsChange = (bedrooms: number | 'any') => {
    setFilters(prev => ({ ...prev, bedrooms }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      status: 'all',
      category: 'all',
      region: 'All',
      area: 'All Locations',
      minPrice: 0,
      maxPrice: 100000000,
      bedrooms: 'any',
      viewMode: filters.viewMode
    });
  };

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.status !== 'all' ||
    filters.category !== 'all' ||
    filters.area !== 'All Locations' ||
    filters.bedrooms !== 'any';

  return (
    <div className="w-full space-y-6">
      {/* Top Status Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e1da] pb-4">
        {/* Status Pill Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_LIST.map((tab) => {
            const isActive = filters.status === tab.id;
            return (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => handleStatusChange(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#1a1a1a] text-white shadow-sm'
                    : 'bg-white text-[#4a4540] hover:text-[#1a1a1a] hover:bg-[#f4f1ee] border border-[#e5e1da]'
                }`}
              >
                {tab.id === 'ongoing' && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-[#1a1a1a]'}`} />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Toggle Mode: Grid vs Interactive Map */}
        <div className="flex items-center gap-1 bg-[#f4f1ee] p-1 border border-[#e5e1da]">
          <button
            id="view-toggle-grid"
            onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
            className={`px-3 py-1.5 text-xs uppercase tracking-widest font-medium flex items-center gap-1.5 transition-all ${
              filters.viewMode === 'grid'
                ? 'bg-white text-[#1a1a1a] font-semibold shadow-sm'
                : 'text-[#8c857d] hover:text-[#1a1a1a]'
            }`}
            title="Grid View"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>

          <button
            id="view-toggle-map"
            onClick={() => setFilters(prev => ({ ...prev, viewMode: 'map' }))}
            className={`px-3 py-1.5 text-xs uppercase tracking-widest font-medium flex items-center gap-1.5 transition-all ${
              filters.viewMode === 'map'
                ? 'bg-white text-[#1a1a1a] font-semibold shadow-sm'
                : 'text-[#8c857d] hover:text-[#1a1a1a]'
            }`}
            title="Interactive Map View"
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Map View</span>
          </button>
        </div>
      </div>

      {/* Secondary Filter Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="lg:col-span-4 relative">
          <Search className="w-3.5 h-3.5 text-[#8c857d] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="filter-search-input"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search by project name, area, or feature..."
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#e5e1da] text-xs text-[#1a1a1a] placeholder-[#8c857d] focus:outline-none focus:border-[#1a1a1a] transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8c857d] hover:text-[#1a1a1a]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="lg:col-span-3">
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 text-[#8c857d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="filter-location-select"
              value={filters.area}
              onChange={(e) => handleAreaChange(e.target.value)}
              className="w-full pl-8 pr-6 py-2.5 bg-white border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors appearance-none"
            >
              {LOCATIONS_LIST.map((loc, idx) => (
                <option key={idx} value={loc.area}>
                  {loc.area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Typology Dropdown */}
        <div className="lg:col-span-3">
          <div className="relative">
            <Layers className="w-3.5 h-3.5 text-[#8c857d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="filter-category-select"
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value as PropertyCategory)}
              className="w-full pl-8 pr-6 py-2.5 bg-white border border-[#e5e1da] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors appearance-none"
            >
              {CATEGORIES_LIST.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div className="lg:col-span-2 flex items-center gap-1 bg-white p-1 border border-[#e5e1da]">
          <span className="text-[9px] text-[#8c857d] uppercase tracking-widest font-semibold px-1">BHK:</span>
          {(['any', 3, 4, 5] as const).map((bhk) => {
            const isActive = filters.bedrooms === bhk;
            return (
              <button
                key={bhk}
                onClick={() => handleBedroomsChange(bhk)}
                className={`flex-1 py-1 text-[11px] transition-colors ${
                  isActive
                    ? 'bg-[#1a1a1a] text-white font-semibold'
                    : 'text-[#4a4540] hover:text-[#1a1a1a] hover:bg-[#f4f1ee]'
                }`}
              >
                {bhk === 'any' ? 'All' : `${bhk}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Status & Reset Pill */}
      <div className="flex items-center justify-between text-xs text-[#8c857d] pt-1">
        <p>
          Showing <span className="text-[#1a1a1a] font-semibold">{totalResults}</span> curated residences
        </p>

        {isFiltered && (
          <button
            onClick={resetFilters}
            className="text-xs text-[#1a1a1a] hover:underline uppercase tracking-widest text-[10px] flex items-center gap-1 focus:outline-none"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
