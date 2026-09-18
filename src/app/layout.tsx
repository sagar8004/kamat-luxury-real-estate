import type { Metadata, Viewport } from 'next';
import '../index.css';
import { TourModalProvider } from '../context/TourModalContext';
import { GlobalTourModal } from '../components/GlobalTourModal';
import { CustomCursor } from '../components/CustomCursor';
import { PagePreloader } from '../components/PagePreloader';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { RedevelopmentFloatingCTA } from '../components/RedevelopmentFloatingCTA';

export const viewport: Viewport = {
  themeColor: '#044F92',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kamatrealty.com'),
  title: {
    default: 'Kamat Realty | Ultra-Luxury Villas & Coastal Estates in Goa',
    template: '%s | Kamat Realty - Goa Luxury Real Estate',
  },
  description:
    '32 Years of Architectural Excellence in Goa. Discover ultra-luxury villas and coastal estates in Assagao, Anjuna, Candolim, Miramar, and Panaji. Goa RERA approved with clear freehold titles.',
  keywords: [
    'Goa luxury villas',
    'buy villa in Goa',
    'Assagao real estate',
    'Kamat Realty',
    'luxury homes Goa',
    'Goa property investment',
    'RERA Goa approved',
    'North Goa villas for sale',
    'South Goa beachfront estates',
    'Susegad lifestyle Goa',
  ],
  authors: [{ name: 'Kamat Realty Developers' }],
  creator: 'Kamat Realty',
  publisher: 'Kamat Realty',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kamatrealty.com',
    siteName: 'Kamat Realty',
    title: 'Kamat Realty | Ultra-Luxury Villas & Coastal Estates in Goa',
    description:
      '32 Years of Architectural Excellence in Goa. Discover ultra-luxury villas and coastal estates with high vacation rental yields and timeless Portuguese architecture.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
        width: 1600,
        height: 900,
        alt: 'Kamat Realty Ultra-Luxury Estate in Goa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kamat Realty | Ultra-Luxury Villas & Coastal Estates in Goa',
    description:
      '32 Years of Architectural Excellence in Goa. Discover ultra-luxury villas in Assagao, Anjuna, Candolim, and Panaji.',
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: {
    canonical: 'https://kamatrealty.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Kamat Realty Developers',
  image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
  description: 'Ultra-luxury residential real estate developers with 32 years of architectural legacy in Goa.',
  telephone: '+91 832 222 3456',
  email: 'concierge@kamatrealty.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kamat House, Ground Floor, D.B. Marg, Miramar',
    addressLocality: 'Panaji',
    addressRegion: 'Goa',
    postalCode: '403001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 15.4855,
    longitude: 73.8118,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:30',
      closes: '19:00',
    },
  ],
  priceRange: '₹3.8 Cr - ₹18.5 Cr',
  url: 'https://kamatrealty.com',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Goa',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#044F92] selection:text-white bg-[#fdfcfb] text-[#1a1a1a]" suppressHydrationWarning>
        <TourModalProvider>
          <PagePreloader minDuration={4000} />
          <CustomCursor />
          <GlobalTourModal />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <RedevelopmentFloatingCTA />
          <Footer />
        </TourModalProvider>
      </body>
    </html>
  );
}
