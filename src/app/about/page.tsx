import type { Metadata } from 'next';
import { AboutPage } from '../../views/AboutPage';

export const metadata: Metadata = {
  title: 'About Kamat Realty - 32-Year Architectural Legacy in Goa',
  description:
    'Founded in 1994, Kamat Realty is Goa premier luxury developer known for clear legal title, seismic-proof engineering, and authentic Indo-Portuguese aesthetic harmony.',
  openGraph: {
    title: '32 Years of Architectural Legacy in Goa | Kamat Realty',
    description:
      'Learn about our foundation, structural engineering philosophy, and three decades of leadership in Goa luxury housing.',
    url: 'https://kamatrealty.com/about',
  },
};

export default function Page() {
  return <AboutPage />;
}
