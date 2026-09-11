import type { Metadata } from 'next';
import { RedevelopmentPage } from '../../views/RedevelopmentPage';

export const metadata: Metadata = {
  title: 'Property Redevelopment & Joint Development in Goa | Kamat Realty',
  description: 'Unlock the true potential of your aging building, society, or ancestral plot in Goa with Kamat Realty. Trusted redevelopment partner offering 100% funded modern transformation, extra carpet area, and zero legal compromises.',
  openGraph: {
    title: 'Property Redevelopment & Joint Development in Goa | Kamat Realty',
    description: 'Transform your legacy property with Kamat Realty. 32+ years of architectural excellence, clear titles, and on-time delivery.',
    url: 'https://kamatrealty.com/redevelopment',
  }
};

export default function Page() {
  return <RedevelopmentPage />;
}
