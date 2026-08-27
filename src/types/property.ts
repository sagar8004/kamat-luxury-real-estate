export type ProjectStatus = 'all' | 'ongoing' | 'completed' | 'upcoming';
export type PropertyCategory = 'all' | 'villa' | 'apartment' | 'penthouse' | 'commercial';

export interface PropertyCoordinates {
  lat: number;
  lng: number;
  xPercent: number; // For SVG/Stylized map rendering (0-100)
  yPercent: number; // For SVG/Stylized map rendering (0-100)
}

export interface NearbyLandmark {
  name: string;
  distance: string; // e.g. "12 mins", "3.4 km"
  type: 'airport' | 'beach' | 'heritage' | 'hospital' | 'highway' | 'dining';
}

export interface FloorPlan {
  name: string;
  type: string;
  carpetArea: string;
  superBuiltUp: string;
  image: string;
  priceEstimate?: string;
}

export interface ConstructionMilestone {
  stage: string;
  progressPercent: number;
  status: 'completed' | 'in-progress' | 'scheduled';
  dateCompleted?: string;
  targetDate?: string;
}

export interface PropertyItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  category: 'villa' | 'apartment' | 'penthouse' | 'commercial';
  location: {
    area: string; // e.g. "Assagao", "Miramar", "Porvorim"
    region: 'North Goa' | 'Central Goa' | 'South Goa';
    city: string;
    state: string;
    coordinates: PropertyCoordinates;
    address: string;
  };
  price: {
    displayPrice: string; // e.g. "₹4.75 Cr Onwards"
    startingNumeric: number; // for sorting
    unitPrice?: string; // e.g. "₹14,500 / sq.ft"
  };
  specs: {
    bhk: string; // e.g. "4 & 5 BHK"
    bedrooms: number[]; // [4, 5] for filtering
    sqftRange: string; // e.g. "3,800 - 5,400 Sq.Ft"
    totalUnits: number;
    unitsAvailable?: number;
    possessionDate: string; // e.g. "Dec 2026" or "Completed (2024)"
    reraNumber: string;
  };
  heroImage: string;
  gallery: string[];
  architecturalStyle: string;
  description: string;
  highlights: string[];
  amenities: string[];
  constructionStatus?: {
    overallPercent: number;
    milestones: ConstructionMilestone[];
    lastUpdated: string;
  };
  completionYear?: number;
  floorPlans: FloorPlan[];
  landmarks: NearbyLandmark[];
  featured?: boolean;
}

export interface PropertyFilterState {
  searchQuery: string;
  status: ProjectStatus;
  category: PropertyCategory;
  region: string;
  area: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  viewMode: 'grid' | 'map' | 'split';
}

export interface SiteVisitInquiry {
  fullName: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName?: string;
  preferredDate: string;
  preferredTime: string;
  tourType: 'in-person' | 'virtual-video' | 'callback';
  investmentHorizon?: string;
  notes?: string;
}
