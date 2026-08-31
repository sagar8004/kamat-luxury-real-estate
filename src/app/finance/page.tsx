import type { Metadata } from 'next';
import { FinancePage } from '../../views/FinancePage';

export const metadata: Metadata = {
  title: 'Mortgage Calculator & Vacation Rental ROI Simulator | Kamat Realty',
  description:
    'Calculate custom home loan EMI repayments and simulate 12-15% annual rental yields on luxury holiday villas in Goa.',
  openGraph: {
    title: 'Financial Pro-Forma & Mortgage Planning | Kamat Realty Goa',
    description:
      'Plan your luxury villa acquisition with custom loan terms, banking partners, and high-yield holiday rental projections.',
    url: 'https://kamatrealty.com/finance',
  },
};

export default function Page() {
  return <FinancePage />;
}
