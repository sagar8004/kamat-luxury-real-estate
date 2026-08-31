import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROPERTIES, getPropertyById } from '../../../data/propertyService';
import { PropertyDetailPage } from '../../../views/PropertyDetailPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROPERTIES.map((prop) => ({
    id: prop.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return {
      title: 'Property Not Found | Kamat Realty',
    };
  }

  const priceText = property.price?.displayPrice || 'Price on Request';
  const areaText = property.location?.area || 'Goa';
  const regionText = property.location?.region || 'Goa';

  return {
    title: `${property.title} | ${property.specs.bhk} Villa in ${areaText}, Goa`,
    description: `${property.tagline} Located in ${areaText}, ${regionText}. Starting at ${priceText}. Goa RERA: ${property.specs.reraNumber}. Handcrafted by Kamat Realty.`,
    openGraph: {
      title: `${property.title} | Luxury Residence in ${areaText}, Goa`,
      description: property.tagline,
      url: `https://kamatrealty.com/property/${property.id}`,
      images: [
        {
          url: property.heroImage,
          width: 1600,
          height: 900,
          alt: `${property.title} - Kamat Realty Luxury Real Estate`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} - ${areaText}, Goa`,
      description: property.tagline,
      images: [property.heroImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const propertyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name: property.title,
    description: property.tagline,
    image: [property.heroImage, ...(property.gallery || [])],
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location.area,
      addressRegion: property.location.region,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.location.coordinates.lat,
      longitude: property.location.coordinates.lng,
    },
    numberOfBedrooms: property.specs.bedrooms[0] || 4,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.specs.sqftRange,
      unitText: 'sq ft',
    },
    offers: {
      '@type': 'Offer',
      price: property.price.startingNumeric,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://kamatrealty.com/property/${property.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />
      <PropertyDetailPage property={property} />
    </>
  );
}
