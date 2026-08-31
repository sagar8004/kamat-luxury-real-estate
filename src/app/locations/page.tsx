import type { Metadata } from 'next';
import { LocationsPage } from '../../views/LocationsPage';

export const metadata: Metadata = {
  title: 'Goa Luxury Enclaves Map - Assagao, Anjuna, Candolim, Miramar & Panaji',
  description:
    'Interactive geospatial map of luxury real estate micro-markets in Goa. Explore drive times, lifestyle amenities, beach proximities, and airport connectivity.',
  openGraph: {
    title: 'Goa Prime Enclaves Map | Kamat Realty',
    description:
      'Pinpoint property geolocations, airport distances, and micro-market investment dynamics across North & South Goa.',
    url: 'https://kamatrealty.com/locations',
  },
};

export default function Page() {
  return <LocationsPage />;
}
