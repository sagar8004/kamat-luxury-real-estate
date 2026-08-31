import type { Metadata } from 'next';
import { ProjectsPage } from '../../views/ProjectsPage';

export const metadata: Metadata = {
  title: 'Luxury Real Estate Developments & Villas in Goa',
  description:
    'Browse all curated luxury estates, villas, and sea-view residences across Assagao, Anjuna, Candolim, Miramar, and Panaji. Filter by BHK, possession timeline, and budget.',
  openGraph: {
    title: 'Luxury Real Estate Portfolio | Kamat Realty Goa',
    description:
      'Filter and discover high-yield luxury villas, heritage manors, and bespoke residences across Goa.',
    url: 'https://kamatrealty.com/projects',
  },
};

export default function Page() {
  return <ProjectsPage />;
}
