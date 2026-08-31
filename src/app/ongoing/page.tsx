import type { Metadata } from 'next';
import { OngoingPage } from '../../views/OngoingPage';

export const metadata: Metadata = {
  title: 'Ongoing Construction Projects & Real-Time Milestone Tracker | Kamat Realty',
  description:
    'Track live construction progress, concrete slab castings, and possession timelines for Kamat ongoing luxury developments across Goa.',
  openGraph: {
    title: 'Ongoing Luxury Developments Tracker | Kamat Realty Goa',
    description:
      'Real-time milestone progress, structural updates, and possession dates for under-construction villas.',
    url: 'https://kamatrealty.com/ongoing',
  },
};

export default function Page() {
  return <OngoingPage />;
}
