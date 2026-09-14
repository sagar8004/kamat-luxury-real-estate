import React from 'react';
import {
  Plane,
  Palmtree,
  Landmark as HeritageIcon,
  HeartPulse,
  Route,
  UtensilsCrossed,
  Train,
  Bus,
  Building2,
  MapPin,
  LucideProps,
} from 'lucide-react';

export type LandmarkCategory =
  | 'airport'
  | 'beach'
  | 'heritage'
  | 'hospital'
  | 'highway'
  | 'dining'
  | 'Railway Station'
  | 'railway station'
  | 'railway'
  | 'Bus Stand'
  | 'bus stand'
  | 'bus'
  | 'City'
  | 'city'
  | string;

/**
 * Returns the matching Lucide icon element for a given landmark type
 */
export function getLandmarkIcon(type?: string, props: LucideProps = { className: 'w-4 h-4' }): React.ReactElement {
  const normalized = (type || '').toLowerCase().trim().replace(/[-_]/g, ' ');

  switch (normalized) {
    case 'airport':
    case 'flight':
    case 'air':
      return <Plane {...props} />;

    case 'beach':
    case 'coast':
    case 'sea':
      return <Palmtree {...props} />;

    case 'heritage':
    case 'monument':
    case 'church':
    case 'fort':
      return <HeritageIcon {...props} />;

    case 'hospital':
    case 'clinic':
    case 'medical':
    case 'healthcare':
      return <HeartPulse {...props} />;

    case 'highway':
    case 'expressway':
    case 'road':
    case 'transit':
      return <Route {...props} />;

    case 'dining':
    case 'restaurant':
    case 'cafe':
    case 'food':
      return <UtensilsCrossed {...props} />;

    case 'railway station':
    case 'railway':
    case 'train':
    case 'station':
      return <Train {...props} />;

    case 'bus stand':
    case 'bus station':
    case 'bus':
      return <Bus {...props} />;

    case 'city':
    case 'town':
    case 'centre':
    case 'center':
    case 'downtown':
      return <Building2 {...props} />;

    default:
      return <MapPin {...props} />;
  }
}

/**
 * Returns a clean, user-facing label for a landmark category type
 */
export function getLandmarkLabel(type?: string): string {
  const normalized = (type || '').toLowerCase().trim().replace(/[-_]/g, ' ');

  switch (normalized) {
    case 'airport':
      return 'Airport & Aviation';
    case 'beach':
      return 'Beach & Coast';
    case 'heritage':
      return 'Heritage & Culture';
    case 'hospital':
      return 'Healthcare & Hospital';
    case 'highway':
      return 'Highway & Express Connectivity';
    case 'dining':
      return 'Fine Dining & Leisure';
    case 'railway station':
    case 'railway':
    case 'train':
    case 'station':
      return 'Railway Station';
    case 'bus stand':
    case 'bus station':
    case 'bus':
      return 'Bus Terminal / Stand';
    case 'city':
    case 'town':
    case 'centre':
    case 'center':
      return 'City Center';
    default:
      return type || 'Key Landmark';
  }
}
