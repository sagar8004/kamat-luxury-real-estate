import propertiesRaw from './properties.json';
import { PropertyItem, PropertyFilterState, ProjectStatus, PropertyCategory } from '../types/property';

export const PROPERTIES: PropertyItem[] = propertiesRaw as PropertyItem[];

export const LOCATIONS_LIST = [
  { area: 'All Locations', region: 'All' },
  { area: 'Assagao', region: 'North Goa' },
  { area: 'Candolim', region: 'North Goa' },
  { area: 'Porvorim', region: 'North Goa' },
  { area: 'Siolim', region: 'North Goa' },
  { area: 'Miramar', region: 'North Goa' },
  { area: 'Panaji CBD', region: 'North Goa' },
  { area: 'Dona Paula', region: 'North Goa' },
  { area: 'Margao', region: 'South Goa' }
];

export const CATEGORIES_LIST: { id: PropertyCategory; label: string }[] = [
  { id: 'all', label: 'All Typologies' },
  { id: 'villa', label: 'Luxury Villas' },
  { id: 'apartment', label: 'Residences' },
  { id: 'penthouse', label: 'Sea-View Penthouses' },
  { id: 'commercial', label: 'Commercial & Retail' }
];

export const STATUS_LIST: { id: ProjectStatus; label: string; count?: number }[] = [
  { id: 'all', label: 'All Developments' },
  { id: 'ongoing', label: 'Ongoing Projects' },
  { id: 'completed', label: 'Completed Landmarks' },
  { id: 'upcoming', label: 'Upcoming / Pre-Launch' }
];

export function filterProperties(properties: PropertyItem[], filters: PropertyFilterState): PropertyItem[] {
  return properties.filter((item) => {
    // Status filter
    if (filters.status !== 'all' && item.status !== filters.status) {
      return false;
    }

    // Category filter
    if (filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }

    // Area filter
    if (filters.area && filters.area !== 'All Locations' && item.location.area !== filters.area) {
      return false;
    }

    // Region filter
    if (filters.region && filters.region !== 'All' && item.location.region !== filters.region) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms !== 'any' && typeof filters.bedrooms === 'number') {
      if (!item.specs.bedrooms.includes(filters.bedrooms)) {
        return false;
      }
    }

    // Price range filter
    if (filters.minPrice > 0 && item.price.startingNumeric < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice < 100000000 && item.price.startingNumeric > filters.maxPrice) {
      return false;
    }

    // Text search query
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchArea = item.location.area.toLowerCase().includes(q);
      const matchCity = item.location.city.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchBHK = item.specs.bhk.toLowerCase().includes(q);
      const matchTag = item.tagline.toLowerCase().includes(q);
      const matchAmenities = item.amenities.some(a => a.toLowerCase().includes(q));

      if (!matchTitle && !matchArea && !matchCity && !matchDesc && !matchBHK && !matchTag && !matchAmenities) {
        return false;
      }
    }

    return true;
  });
}

export function getStats() {
  const ongoing = PROPERTIES.filter(p => p.status === 'ongoing').length;
  const completed = PROPERTIES.filter(p => p.status === 'completed').length;
  const upcoming = PROPERTIES.filter(p => p.status === 'upcoming').length;
  return {
    totalProjects: PROPERTIES.length,
    ongoingCount: ongoing,
    completedCount: completed,
    upcomingCount: upcoming,
    yearsOfLegacy: 32,
    sqftDelivered: '2.8M+',
    happyFamilies: '1,450+'
  };
}

export function getPropertyById(id: string): PropertyItem | undefined {
  return PROPERTIES.find(p => p.id === id);
}

