import type { Metadata } from 'next';
import { ExploreGoaPage } from '../../views/ExploreGoaPage';

export const metadata: Metadata = {
  title: 'Explore Goa - Susegad Philosophy, Heritage, Beaches & Investment ROI',
  description:
    'Experience the Goan Susegad philosophy, world-class coastal cuisine, pristine beaches, Indo-Portuguese architecture, and high rental ROI with Kamat Realty.',
  keywords: [
    'Explore Goa',
    'Goan Susegad philosophy',
    'Goa luxury lifestyle',
    'Goa cuisine fish curry thali',
    'North Goa beaches Vagator Assagao',
    'South Goa coastal living',
    'Portuguese Azulejo architecture Goa',
    'Goa vacation rental yield ROI',
    'MOPA airport Goa property growth',
  ],
  openGraph: {
    title: 'Explore Goa | Where Heritage Meets High Returns - Kamat Realty',
    description:
      'Immerse in the Susegad way of living: 3D interactive story of Goa cuisine, beaches, Indo-Portuguese architecture, and 12-15% vacation rental returns.',
    url: 'https://kamatrealty.com/explore-goa',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600&auto=format&fit=crop',
        width: 1600,
        height: 900,
        alt: 'Explore Goa Coastal Lifestyle and Heritage Villas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Goa | Experience the Susegad Philosophy - Kamat Realty',
    description:
      'Explore the dual coasts, culinary heritage, Azulejo architecture, and premier real estate ROI in Goa.',
  },
};

export default function Page() {
  return <ExploreGoaPage />;
}
