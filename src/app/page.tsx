import type { Metadata } from 'next';
import { HomePage } from '../views/HomePage';

export const metadata: Metadata = {
  title: 'Kamat Realty | Ultra-Luxury Villas & Coastal Estates in Goa',
  description:
    '32 Years of Architectural Legacy in Goa. Explore bespoke luxury villas, sea-facing penthouses, and private estates in Assagao, Anjuna, Candolim, and Panaji.',
  openGraph: {
    title: 'Kamat Realty | Ultra-Luxury Villas & Coastal Estates in Goa',
    description:
      '32 Years of Architectural Legacy in Goa. Explore bespoke luxury villas, sea-facing penthouses, and private estates in Assagao, Anjuna, Candolim, and Panaji.',
    url: 'https://kamatrealty.com',
  },
};

export default function Page() {
  return <HomePage />;
}
