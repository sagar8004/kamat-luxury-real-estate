import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CommercialPage } from '../../views/CommercialPage';

export const metadata: Metadata = {
  title: 'Commercial & High-Street Retail Spaces for Sale in Goa | Kamat Realty',
  description:
    'High-yield ground-floor commercial shops, retail showrooms & corporate suites in Goa. Prime NH-66 highway and market frontage with guaranteed residential footfall.',
  openGraph: {
    title: 'High-Yield Commercial Real Estate & Retail Spaces in Goa | Kamat Realty',
    description:
      'Explore prime commercial spaces in Porvorim, Mapusa & Miramar. 8-11% rental yield potential with 100% RERA compliance.',
    url: 'https://kamatrealty.com/commercial',
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfcfb] pt-32 text-center text-xs text-[#8c857d]">Loading commercial developments...</div>}>
      <CommercialPage />
    </Suspense>
  );
}
