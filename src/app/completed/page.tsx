import type { Metadata } from 'next';
import { CompletedPage } from '../../views/CompletedPage';

export const metadata: Metadata = {
  title: 'Completed Architectural Landmarks & Delivered Residences | Kamat Realty',
  description:
    'Explore 100% delivered and inhabited heritage residences and luxury communities across Goa. Read genuine resident testimonials and architectural case studies.',
  openGraph: {
    title: 'Completed Landmarks & Homeowner Testimonials | Kamat Realty',
    description:
      'A showcase of 32 years of delivered excellence, on-time possession, and resident satisfaction in Goa.',
    url: 'https://kamatrealty.com/completed',
  },
};

export default function Page() {
  return <CompletedPage />;
}
