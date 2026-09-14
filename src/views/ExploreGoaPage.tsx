'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'motion/react';
import {
  Compass,
  Palmtree,
  Sun,
  Waves,
  Building2,
  Plane,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sliders,
  Calendar,
  Landmark,
  X,
  Wind,
  Activity,
  Hospital,
  GraduationCap,
  Car,
  Trees
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';

interface ExploreGoaPageProps {
  onNavigate?: (page: string, params?: { propertyId?: string; filterStatus?: string }) => void;
  onOpenTourModal?: () => void;
}

// =========================================================================
// 1. BEACHES DATA COLLECTION (PRESERVED)
// =========================================================================
interface BeachItem {
  id: string;
  name: string;
  region: 'North Goa' | 'South Goa' | 'Central Goa';
  tagline: string;
  image: string;
  vibe: string;
  highlights: string[];
  distanceFromAirport: string;
  bestFor: string;
  accentColor: string;
}

const GOA_BEACHES: BeachItem[] = [
  {
    id: 'vagator',
    name: 'Vagator & Ozran Beach',
    region: 'North Goa',
    tagline: 'Dramatic Red Laterite Cliffs & Legendary Arabian Sunsets',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Cosmopolitan, Cliffside Sunset Bars & Music',
    highlights: ['Chapora Fort panoramic view', 'Cliff-top fine dining (Thalassa, Antares)', 'Secluded Little Vagator cove'],
    distanceFromAirport: '32 mins from MOPA',
    bestFor: 'Sunset sessions, cliffside cocktails & gourmet dinners',
    accentColor: '#f97316'
  },
  {
    id: 'palolem',
    name: 'Palolem Beach',
    region: 'South Goa',
    tagline: 'Perfect Crescent Bay with Calm Emerald Swimming Waters',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Serene, Idyllic & Laidback Tropical Luxury',
    highlights: ['Gentle crescent bay safe for swimming', 'Sunset kayak tours to Butterfly Beach', 'Canacona island walkway'],
    distanceFromAirport: '55 mins from Dabolim',
    bestFor: 'Paddle boarding, dolphin cruises & peaceful yoga mornings',
    accentColor: '#0ea5e9'
  },
  {
    id: 'ashwem',
    name: 'Ashwem & Mandrem Beach',
    region: 'North Goa',
    tagline: 'Expansive White Sands & Chic Bohemian Beachfront Cabanas',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Upscale Bohemian, Designer Boutiques & Surf',
    highlights: ['Wide shallow tide pools', 'Exclusive wellness clubs & beach lounges', 'Protected Olive Ridley sanctuary nearby'],
    distanceFromAirport: '28 mins from MOPA',
    bestFor: 'Barefoot luxury, surf lessons & tranquil seaside brunches',
    accentColor: '#10b981'
  },
  {
    id: 'morjim',
    name: 'Morjim & Chapora Estuary',
    region: 'North Goa',
    tagline: 'Where the Chapora River Meets the Golden Ocean Sands',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Eco-Chic & Riverfront Serenity',
    highlights: ['River-meets-ocean sandbar', 'Kite surfing academies', 'Endangered sea turtle nesting zones'],
    distanceFromAirport: '26 mins from MOPA',
    bestFor: 'Birdwatching, private catamaran sailing & river sunsets',
    accentColor: '#6366f1'
  },
  {
    id: 'cola',
    name: 'Cola Beach & Blue Lagoon',
    region: 'South Goa',
    tagline: 'A Secret Emerald Freshwater Lagoon Merging into the Sea',
    image: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Untamed Natural Wonder & Secluded Retreat',
    highlights: ['Natural freshwater lagoon for kayaking', 'Towering volcanic rock headlands', 'Zero commercial crowds'],
    distanceFromAirport: '60 mins from Dabolim',
    bestFor: 'Adventure kayaking, privacy & pure pristine nature',
    accentColor: '#14b8a6'
  },
  {
    id: 'miramar',
    name: 'Miramar & Dona Paula',
    region: 'Central Goa',
    tagline: 'Panaji Capital Promenade with Spectacular Mandovi Vistas',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b271?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Urban Elite Coastal Living & Marine Promenade',
    highlights: ['Lighthouse views of Fort Aguada', 'Proximity to Panaji High-Street & Fontainhas', 'Manicured walking promenade'],
    distanceFromAirport: '30 mins from Dabolim',
    bestFor: 'Evening sunset strolls, luxury city life & river yachting',
    accentColor: '#3b82f6'
  },
  {
    id: 'candolim',
    name: 'Candolim & Sinquerim',
    region: 'North Goa',
    tagline: 'Historic Fort Aguada Shoreline & High-Energy Watersports',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Lively Coastal Boulevard & Heritage Lighthouse',
    highlights: ['17th Century Fort Aguada ramparts', 'Jet skiing, parasailing & speedboats', 'Gourmet beachfront dining strip'],
    distanceFromAirport: '38 mins from MOPA',
    bestFor: 'Active water sports, sea-facing villas & evening entertainment',
    accentColor: '#e11d48'
  }
];

// =========================================================================
// 2. CULTURE & SACRED HERITAGE DATA COLLECTION (PRESERVED)
// =========================================================================
interface SacredHeritageItem {
  id: string;
  name: string;
  category: 'church' | 'temple';
  location: string;
  era: string;
  image: string;
  architecture: string;
  intro: string;
  keyFeature: string;
  significance: string;
}

const SACRED_HERITAGE_LIST: SacredHeritageItem[] = [
  {
    id: 'bom-jesus',
    name: 'Basilica of Bom Jesus',
    category: 'church',
    location: 'Old Goa (Velha Goa)',
    era: 'Built 1594 - 1605 AD',
    image: '/explore-goa/Basilica of Bom Jesus.webp',
    architecture: 'Classical Baroque & Laterite Masonry',
    intro: 'A UNESCO World Heritage Monument and one of the finest examples of Jesuit Baroque architecture in India. It holds the sacred mortal remains of St. Francis Xavier in an intricately carved Italian silver casket.',
    keyFeature: 'Unplastered black laterite stone facade with ornate Corinthian columns & gilded 30-foot altarpiece.',
    significance: 'UNESCO World Heritage Site & Global Pilgrimage Center'
  },
  {
    id: 'panaji-church',
    name: 'Our Lady of the Immaculate Conception',
    category: 'church',
    location: 'Panaji City Promenade',
    era: 'Originally built 1541 AD',
    image: '/explore-goa/Immaculate Conception.webp',
    architecture: 'Portuguese-Manueline & Baroque Staircase',
    intro: 'Perched high above the city of Panaji, this iconic gleaming white church is famed for its grand zigzag double-flight stairway and houses the second largest church bell in Goa, salvaged from the Augustinian Monastery.',
    keyFeature: 'Iconic symmetrical multi-tiered white zigzag stairway overlooking Church Square.',
    significance: 'Architectural symbol of Goa’s capital and prime cultural landmark'
  },
  {
    id: 'se-cathedral',
    name: 'Sé Cathedral de Santa Catarina',
    category: 'church',
    location: 'Old Goa',
    era: 'Completed 1619 AD',
    image: '/explore-goa/Sé Cathedral de Santa Catarina.webp',
    architecture: 'Portuguese-Manueline & Tuscan Interior',
    intro: 'One of the largest church structures in Asia. Famous for its majestic Golden Bell (Sino de Ouro) celebrated worldwide for its rich acoustic resonance that can be heard across surrounding villages.',
    keyFeature: 'Grand vaulted Tuscan nave with 14 elaborate gold-leaf altars and the legendary Golden Bell.',
    significance: 'Seat of the Archdiocese of Goa and Daman'
  },
  {
    id: 'mangeshi-temple',
    name: 'Shri Mangueshi Temple',
    category: 'temple',
    location: 'Priol, Ponda',
    era: 'Established 1560 AD',
    image: '/explore-goa/Mangueshi Temple.webp',
    architecture: 'Indo-Goan with 7-Tier Deepastambha',
    intro: 'Dedicated to Lord Manguesh (an incarnation of Shiva), this revered temple is framed by coconut groves and boasts a majestic 7-storey octagonal Deepastambha (lamp tower) that is illuminated with oil lamps during festivals.',
    keyFeature: 'Seven-storey octagonal lamp tower, ancient holy water tank, and teakwood Sabha Griha.',
    significance: 'Most visited and spiritually prominent Hindu temple in Goa'
  },
  {
    id: 'shanta-durga',
    name: 'Shri Shanta Durga Temple',
    category: 'temple',
    location: 'Kavlem, Ponda',
    era: 'Constructed 1738 AD',
    image: '/explore-goa/Shantadurga Temple.webp',
    architecture: 'Indo-Portuguese & Konkani Fusion',
    intro: 'Dedicated to the goddess of peace who reconciled Lord Vishnu and Lord Shiva during a cosmic conflict. Its architecture uniquely incorporates European arched windows, Roman roofs, and traditional Konkani sanctum layouts.',
    keyFeature: 'Unique crimson terracotta shikharas with Italianate balustrades and deep red stone courtyards.',
    significance: 'Sacred deity of peace worshipped by diverse Goan communities'
  },
  {
    id: 'tambdi-surla',
    name: 'Mahadev Temple, Tambdi Surla',
    category: 'temple',
    location: 'Bhagwan Mahaveer Sanctuary, Sanguem',
    era: '12th Century AD (Kadamba Dynasty)',
    image: '/explore-goa/Mahadev Temple.webp',
    architecture: 'Kadamba-Yadava Weather-Proof Basalt Rock',
    intro: 'Goa’s oldest surviving stone temple, nestled deep within pristine jungle hills. Hand-carved entirely out of weather-resistant dark basalt stone with intricate relief sculptures of Shiva, Vishnu, and Brahma.',
    keyFeature: 'Exquisite 900-year-old basalt stone roof carvings that withstood centuries of tropical monsoons.',
    significance: 'Ancient archaeological marvel and Kadamba heritage gem'
  }
];

// =========================================================================
// 3. COASTAL WIND & MARITIME AIRFLOW PRESETS
// =========================================================================
interface WindFlowPreset {
  id: string;
  name: string;
  speedKmh: number;
  direction: string;
  aqiRange: string;
  rotationDuration: number;
  temp: string;
  label: string;
  subtitle: string;
}

const WIND_PRESETS: WindFlowPreset[] = [
  {
    id: 'morning',
    name: 'Morning Trade Wind',
    speedKmh: 14,
    direction: 'WNW • Arabian Sea',
    aqiRange: 'AQI 28-35',
    rotationDuration: 5,
    temp: '26°C',
    label: 'Morning Breeze',
    subtitle: 'Crisp maritime trade winds filtering across palm groves'
  },
  {
    id: 'afternoon',
    name: 'Valley Thermal Flow',
    speedKmh: 22,
    direction: 'NW • Assagao Valley',
    aqiRange: 'AQI 35-55',
    rotationDuration: 3.2,
    temp: '29°C',
    label: 'Valley Flow',
    subtitle: 'Western Ghats breeze sweeping through lush banyan canopies'
  },
  {
    id: 'sunset',
    name: 'Sunset Coastal Zephyr',
    speedKmh: 11,
    direction: 'SW • Ocean Shallows',
    aqiRange: 'AQI 28-32',
    rotationDuration: 7,
    temp: '27°C',
    label: 'Sunset Zephyr',
    subtitle: 'Calming evening sea current refreshing coastal estates'
  }
];

// =========================================================================
// 4. HEALTHCARE DIRECTORY
// =========================================================================
interface HospitalItem {
  id: string;
  name: string;
  location: string;
  category: 'Tertiary Care' | 'Super Speciality' | 'Private Multi-Speciality';
  beds: string;
  emergency: string;
  specialties: string[];
  distanceFromAssagao: string;
  distanceFromPanaji: string;
}

const HEALTHCARE_LIST: HospitalItem[] = [
  {
    id: 'gmc',
    name: 'Goa Medical College & Hospital (GMC)',
    location: 'Bambolim (Central Goa)',
    category: 'Tertiary Care',
    beds: '1,500+ Beds',
    emergency: '24x7 Level-1 Trauma & Critical Emergency',
    specialties: ['Cardiac Surgery', 'Neurotrauma', 'Organ Transplant', 'Super-Specialty Oncology'],
    distanceFromAssagao: '32 mins',
    distanceFromPanaji: '10 mins'
  },
  {
    id: 'manipal',
    name: 'Manipal Hospital Goa',
    location: 'Dona Paula, Panaji',
    category: 'Super Speciality',
    beds: '235+ Premium Beds',
    emergency: '24x7 International Cardiac & Trauma ICU',
    specialties: ['Interventional Cardiology', 'Orthopaedics & Joint Replacement', 'Robotic Surgery', 'Medical Oncology'],
    distanceFromAssagao: '35 mins',
    distanceFromPanaji: '8 mins'
  },
  {
    id: 'healthway',
    name: 'Healthway Hospitals',
    location: 'Old Goa & Kadamba Plateau',
    category: 'Super Speciality',
    beds: '250+ Beds',
    emergency: '24x7 Emergency Trauma & Stroke Unit',
    specialties: ['Gastroenterology', 'Advanced Nephrology', 'Pediatric ICU', 'Minimally Invasive Surgery'],
    distanceFromAssagao: '28 mins',
    distanceFromPanaji: '12 mins'
  },
  {
    id: 'victor',
    name: 'Victor Hospital',
    location: 'Margao (South Goa)',
    category: 'Private Multi-Speciality',
    beds: '150+ Beds',
    emergency: '24x7 Cardiac Emergency & Cath Lab',
    specialties: ['Cardiac Catheterization', 'Laparoscopic Surgery', 'Critical Care Medicine', 'Dialysis Centre'],
    distanceFromAssagao: '60 mins',
    distanceFromPanaji: '35 mins'
  }
];

// =========================================================================
// 5. SCHOOLS & EDUCATION DIRECTORY
// =========================================================================
interface SchoolItem {
  id: string;
  name: string;
  board: 'Cambridge IGCSE' | 'ICSE / ISC' | 'CBSE' | 'Higher Education';
  location: string;
  grades: string;
  highlights: string[];
  keyFeature: string;
}

const SCHOOLS_LIST: SchoolItem[] = [
  {
    id: 'gera',
    name: 'The Gera School',
    board: 'Cambridge IGCSE',
    location: 'Kadamba Plateau (Near Panaji)',
    grades: 'Pre-K to Grade 12',
    highlights: ['Cambridge International Curriculum', 'World-class robotics & maker labs', 'Expansive sporting campus & Olympic swimming'],
    keyFeature: 'Goa’s top-tier global international school with holistic arts and sports.'
  },
  {
    id: 'sharada',
    name: 'Sharada Mandir School',
    board: 'ICSE / ISC',
    location: 'Miramar, Panaji',
    grades: 'Kindergarten to Grade 12',
    highlights: ['55+ Years of academic excellence', 'State-topping ISC results', 'Distinguished alumni across medicine, law & business'],
    keyFeature: 'Premier traditional institution highly favored by Goan intellectual and business families.'
  },
  {
    id: 'sunshine',
    name: 'Sunshine Worldwide School',
    board: 'CBSE',
    location: 'Old Goa',
    grades: 'Nursery to Grade 12',
    highlights: ['Experiential learning methodology', 'Green forested ecological campus', 'Strong focus on entrepreneurship & design thinking'],
    keyFeature: 'Progressive CBSE curriculum blending academic rigor with outdoor nature-based learning.'
  },
  {
    id: 'bits',
    name: 'BITS Pilani — K.K. Birla Goa Campus',
    board: 'Higher Education',
    location: 'Zuarinagar (Near Airport)',
    grades: 'B.Tech, M.Tech, PhD',
    highlights: ['India Top-5 Engineering Institute', '180-acre world-class campus', 'Thriving startup incubator & tech ecosystem'],
    keyFeature: 'Brings elite academic minds, tech conferences, and innovation talent to the state.'
  }
];


export const ExploreGoaPage: React.FC<ExploreGoaPageProps> = ({
  onNavigate,
  onOpenTourModal
}) => {
  const router = useRouter();
  const tourModalContext = useTourModal();

  const navigate = (page: string, params?: { propertyId?: string; filterStatus?: string }) => {
    if (onNavigate) {
      onNavigate(page, params);
    } else {
      router.push(page === 'home' ? '/' : `/${page}`);
    }
  };

  const handleTour = () => {
    if (onOpenTourModal) {
      onOpenTourModal();
    } else {
      tourModalContext.openTourModal();
    }
  };

  // Section Tracking State
  const [activeSection, setActiveSection] = useState<number>(0);

  // Interactive Wind & Flow Simulator State
  const [activeWindPreset, setActiveWindPreset] = useState<string>('morning');
  const [isGusting, setIsGusting] = useState<boolean>(false);
  const gustTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTriggerGust = () => {
    setIsGusting(true);
    if (gustTimeoutRef.current) clearTimeout(gustTimeoutRef.current);
    gustTimeoutRef.current = setTimeout(() => {
      setIsGusting(false);
    }, 2800);
  };

  const activePreset =
    WIND_PRESETS.find((p) => p.id === activeWindPreset) || WIND_PRESETS[0];

  // Interactive AQI Slider (Delhi vs Goa Split Screen)
  const [aqiSliderVal, setAqiSliderVal] = useState<number>(50);

  // Healthcare Category Filter
  const [healthCategory, setHealthCategory] = useState<string>('All');

  // School Curriculum Filter
  const [schoolBoardFilter, setSchoolBoardFilter] = useState<string>('All');

  // Beaches Carousel Filter
  const [beachRegionFilter, setBeachRegionFilter] = useState<'All' | 'North Goa' | 'South Goa'>('All');
  const [activeBeachIndex, setActiveBeachIndex] = useState<number>(0);
  const beachScrollRef = useRef<HTMLDivElement>(null);

  // Sacred Heritage Filter & Detail Modal
  const [heritageCategory, setHeritageCategory] = useState<'all' | 'church' | 'temple'>('all');
  const [selectedHeritageItem, setSelectedHeritageItem] = useState<SacredHeritageItem | null>(null);

  // 3-Step Matchmaker Modal State
  const [showMatchmaker, setShowMatchmaker] = useState<boolean>(false);
  const [matchStep, setMatchStep] = useState<number>(1);
  const [matchAnswers, setMatchAnswers] = useState<{
    vibe?: string;
    priority?: string;
    style?: string;
  }>({});

  // 3D Parallax Mouse Tracking on Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const oceanShiftX = useTransform(smoothMouseX, [-300, 300], [-25, 25]);
  const oceanShiftY = useTransform(smoothMouseY, [-300, 300], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  // Filtered lists
  const filteredBeaches = GOA_BEACHES.filter(
    (b) => beachRegionFilter === 'All' || b.region === beachRegionFilter
  );

  const filteredHeritage = SACRED_HERITAGE_LIST.filter(
    (h) => heritageCategory === 'all' || h.category === heritageCategory
  );

  const filteredHospitals = HEALTHCARE_LIST.filter(
    (h) => healthCategory === 'All' || h.category === healthCategory
  );

  const filteredSchools = SCHOOLS_LIST.filter(
    (s) => schoolBoardFilter === 'All' || s.board === schoolBoardFilter
  );

  // Scroll Beach Carousel Left/Right
  const scrollBeach = (direction: 'left' | 'right') => {
    if (beachScrollRef.current) {
      const scrollAmount = 360;
      beachScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Section Observer on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'section-hero',
        'section-air',
        'section-transit',
        'section-infrastructure',
        'section-beaches',
        'section-heritage'
      ];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (gustTimeoutRef.current) {
        clearTimeout(gustTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] selection:bg-[#044F92] selection:text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Subtle Luxury Texture Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] z-0 bg-[radial-gradient(#044F92_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Floating Sticky Chapter Quick-Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#02182c]/90 backdrop-blur-xl border border-white/20 text-white px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2 sm:gap-4 text-xs transition-all max-w-[95vw] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0 border-r border-white/20 pr-3">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          {/* <span className="font-mono text-[10px] tracking-widest uppercase text-blue-200 hidden md:inline">Goa Living Guide</span> */}
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {[
            { label: '01 Hero', id: 'section-hero' },
            { label: '02 Air Quality', id: 'section-air' },
            { label: '03 Connectivity', id: 'section-transit' },
            { label: '04 Healthcare & Schools', id: 'section-infrastructure' },
            { label: '05 Coastline', id: 'section-beaches' },
            { label: '06 Sacred Culture', id: 'section-heritage' }
          ].map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => scrollToSection(chap.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all tracking-wide whitespace-nowrap cursor-pointer ${activeSection === idx
                ? 'bg-[#044F92] text-white shadow-md font-semibold border border-[#38bdf8]/50'
                : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
            >
              {chap.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: EDITORIAL HERO — “GOA, BEYOND THE DESTINATION”
          ========================================================================= */}
      <section
        id="section-hero"
        className="relative min-h-[92vh] pt-32 pb-20 px-6 sm:px-8 lg:px-12 flex flex-col justify-center border-b border-[#cfe0ee] overflow-hidden bg-gradient-to-b from-[#f2f8fc] via-[#fcfbf9] to-[#f4f9fd]"
      >
        {/* Parallax Radial Glows */}
        <motion.div
          style={{ x: oceanShiftX, y: oceanShiftY }}
          className="absolute -top-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#ffd97d]/30 via-[#38bdf8]/20 to-transparent rounded-full blur-[110px] pointer-events-none -z-0"
        />
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-[#044F92]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
          {/* Left Column: Headline, Narrative & Direct CTAs */}
          <div className="lg:col-span-7 space-y-7">
            <ScrollReveal variant="from-left" distance={30}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/95 backdrop-blur-md border border-[#044F92]/25 rounded-full text-[#044F92] text-xs font-semibold uppercase tracking-[0.22em] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#044F92] animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-[#044F92]" />
                <span>Goa, Beyond the Destination • Kamat Living Guide</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.1}>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-normal text-[#1a1a1a] tracking-tight leading-[1.06]">
                Discover Goa. <br />
                Discover A <span className="text-[#044F92] italic font-serif">Different Way of Living.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-base sm:text-lg text-[#5a554e] font-light leading-relaxed max-w-xl">
                Beyond the vacation postcard lies India’s most coveted sanctuary for health, clean maritime air, rich cultural tapestry, and enduring generational wealth. Experience luxury at an unhurried, elevated cadence.
              </p>
            </ScrollReveal>

            {/* REAL-TIME    */}
            <ScrollReveal variant="from-bottom" distance={30} delay={0.25}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 max-w-2xl">
                <div className="p-3 bg-white/80 backdrop-blur-md rounded-xl border border-[#cfe0ee] shadow-sm">
                  <div className="flex items-center justify-between text-[#044F92]">
                    <Wind className="w-4 h-4" />
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Pristine</span>
                  </div>
                  <p className="font-mono text-xl font-bold text-[#1a1a1a] mt-1.5">AQI 28-55</p>
                  <p className="text-[10px] text-[#5a554e] mt-0.5">Maritime Oxygen</p>
                </div>

                <div className="p-3 bg-white/80 backdrop-blur-md rounded-xl border border-[#cfe0ee] shadow-sm">
                  <div className="flex items-center justify-between text-[#044F92]">
                    <Trees className="w-4 h-4" />
                    <span className="text-[10px] font-mono font-bold text-[#044F92]">Ecological</span>
                  </div>
                  <p className="font-mono text-xl font-bold text-[#1a1a1a] mt-1.5">60%+</p>
                  <p className="text-[10px] text-[#5a554e] mt-0.5">Forest Canopy</p>
                </div>

                <div className="p-3 bg-white/80 backdrop-blur-md rounded-xl border border-[#cfe0ee] shadow-sm">
                  <div className="flex items-center justify-between text-[#044F92]">
                    <Plane className="w-4 h-4" />
                    <span className="text-[10px] font-mono font-bold text-[#044F92]">Global Hub</span>
                  </div>
                  <p className="font-mono text-xl font-bold text-[#1a1a1a] mt-1.5">2 Airports</p>
                  <p className="text-[10px] text-[#5a554e] mt-0.5">MOPA + Dabolim</p>
                </div>

                <div className="p-3 bg-white/80 backdrop-blur-md rounded-xl border border-[#cfe0ee] shadow-sm">
                  <div className="flex items-center justify-between text-[#044F92]">
                    <Sun className="w-4 h-4" />
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Annual</span>
                  </div>
                  <p className="font-mono text-xl font-bold text-[#1a1a1a] mt-1.5">300+</p>
                  <p className="text-[10px] text-[#5a554e] mt-0.5">Sunny Days</p>
                </div>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="from-bottom" distance={30} delay={0.35}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setShowMatchmaker(true)}
                  className="px-7 py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#38bdf8]" />
                  <span>Interactive Location Advisor</span>
                </button>

                <button
                  onClick={handleTour}
                  className="px-6 py-3.5 bg-white/90 backdrop-blur-md border border-[#044F92] text-[#044F92] hover:bg-[#eef5fb] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Goa Lifestyle Tour</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Kinetic Coastal Windmill & Flowing Breeze Arena */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/80 bg-gradient-to-b from-[#02182c] via-[#04335c] to-[#044F92] p-6 shadow-[0_30px_70px_-15px_rgba(4,79,146,0.35)] flex flex-col justify-between text-white select-none">
              {/* Ambient lighting glows */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#38bdf8]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#ffd97d]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Background Flowing Wind Streams SVG Canvas */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
                <svg className="w-full h-full" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="windGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                      <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.7" />
                      <stop offset="70%" stopColor="#ffd97d" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="windGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Flowing Wave Lines */}
                  <motion.path
                    d="M-50 110 C 80 80, 200 140, 450 100"
                    stroke="url(#windGrad1)"
                    strokeWidth="2"
                    strokeDasharray="60 30"
                    fill="none"
                    animate={{ strokeDashoffset: [0, -180] }}
                    transition={{ repeat: Infinity, duration: isGusting ? 1.8 : activePreset.rotationDuration * 0.9, ease: 'linear' }}
                  />
                  <motion.path
                    d="M-50 190 C 100 230, 260 160, 450 200"
                    stroke="url(#windGrad2)"
                    strokeWidth="1.5"
                    strokeDasharray="80 40"
                    fill="none"
                    animate={{ strokeDashoffset: [0, -240] }}
                    transition={{ repeat: Infinity, duration: isGusting ? 1.5 : activePreset.rotationDuration * 0.75, ease: 'linear' }}
                  />
                  <motion.path
                    d="M-50 270 C 90 240, 240 310, 450 260"
                    stroke="url(#windGrad1)"
                    strokeWidth="2.5"
                    strokeDasharray="90 45"
                    fill="none"
                    animate={{ strokeDashoffset: [0, -270] }}
                    transition={{ repeat: Infinity, duration: isGusting ? 1.4 : activePreset.rotationDuration * 0.7, ease: 'linear' }}
                  />
                  <motion.path
                    d="M-50 350 C 110 390, 280 320, 450 360"
                    stroke="url(#windGrad2)"
                    strokeWidth="1.5"
                    strokeDasharray="70 35"
                    fill="none"
                    animate={{ strokeDashoffset: [0, -210] }}
                    transition={{ repeat: Infinity, duration: isGusting ? 1.6 : activePreset.rotationDuration * 0.85, ease: 'linear' }}
                  />
                  <motion.path
                    d="M-50 420 C 70 400, 220 450, 450 410"
                    stroke="url(#windGrad1)"
                    strokeWidth="2"
                    strokeDasharray="50 25"
                    fill="none"
                    animate={{ strokeDashoffset: [0, -150] }}
                    transition={{ repeat: Infinity, duration: isGusting ? 2 : activePreset.rotationDuration * 1, ease: 'linear' }}
                  />
                </svg>
              </div>

              {/* Floating Air Purity Shimmer Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[
                  { top: '22%', delay: 0, dur: 4.2 },
                  { top: '38%', delay: 1.1, dur: 3.8 },
                  { top: '56%', delay: 0.6, dur: 4.6 },
                  { top: '68%', delay: 1.8, dur: 3.4 },
                  { top: '82%', delay: 2.2, dur: 4.0 }
                ].map((p, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute w-2 h-2 rounded-full bg-white/70 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
                    style={{ top: p.top, left: '-5%' }}
                    animate={{
                      left: ['-5%', '105%'],
                      y: [-8, 8, -8],
                      opacity: [0, 0.9, 0.9, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: isGusting ? p.dur * 0.4 : p.dur,
                      delay: p.delay,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </div>

              {/* Card Header: Real-Time Airflow Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs text-blue-200 shadow-sm">
                  <Wind className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold text-white tracking-wider uppercase">
                    Maritime Sea Breeze
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-[11px] font-mono font-bold backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{activePreset.aqiRange}</span>
                </div>
              </div>

              {/* Center Scene: Sculptural Animated Windmill & Atmospheric Vectors */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
                {/* Secondary Distant Silhouette Windmill on Horizon */}
                <div className="absolute right-10 top-8 opacity-35 scale-60 pointer-events-none">
                  <div className="relative w-16 h-28 flex flex-col items-center">
                    <motion.div
                      className="w-20 h-20 origin-center"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: (isGusting ? 2.5 : activePreset.rotationDuration) * 1.3,
                        ease: 'linear'
                      }}
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-white/80">
                        <circle cx="50" cy="50" r="4" fill="#38bdf8" />
                        <path d="M50 50 L47 10 C48 6, 52 6, 53 10 Z" />
                        <path d="M50 50 L85 68 C88 66, 89 62, 85 58 Z" />
                        <path d="M50 50 L15 68 C12 66, 11 62, 15 58 Z" />
                      </svg>
                    </motion.div>
                    <div className="w-1.5 h-16 bg-gradient-to-b from-white/60 to-transparent rounded-full -mt-10" />
                  </div>
                </div>

                {/* Main Primary Architectural Windmill Sculpture */}
                <div className="relative flex flex-col items-center">
                  {/* Glowing Breeze Halo behind rotor */}
                  <div className="absolute -top-12 w-48 h-48 bg-[#38bdf8]/15 rounded-full blur-2xl pointer-events-none" />

                  {/* Concentric Ambient Flow Rings */}
                  <motion.div
                    className="absolute -top-8 w-40 h-40 rounded-full border border-[#38bdf8]/20"
                    animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  />

                  {/* Rotating 3-Blade Windmill Rotor */}
                  <motion.div
                    className="relative w-44 h-44 z-20 origin-center"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: isGusting ? 1.5 : activePreset.rotationDuration,
                      ease: 'linear'
                    }}
                  >
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                      {/* Blade 1 (Top) */}
                      <path
                        d="M100 100 C96 85, 93 45, 96 15 C98 5, 102 5, 104 15 C107 45, 104 85, 100 100 Z"
                        fill="url(#bladeGrad)"
                      />
                      {/* Blade 2 (Bottom-Right) */}
                      <path
                        d="M100 100 C112 110, 148 132, 174 148 C182 153, 180 157, 171 156 C143 149, 112 120, 100 100 Z"
                        fill="url(#bladeGrad)"
                      />
                      {/* Blade 3 (Bottom-Left) */}
                      <path
                        d="M100 100 C88 110, 52 132, 26 148 C18 153, 20 157, 29 156 C57 149, 88 120, 100 100 Z"
                        fill="url(#bladeGrad)"
                      />

                      {/* Center Hub */}
                      <circle cx="100" cy="100" r="9" fill="#044F92" stroke="#38bdf8" strokeWidth="2.5" />
                      <circle cx="100" cy="100" r="4" fill="#ffd97d" />

                      <defs>
                        <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="60%" stopColor="#bae6fd" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>

                  {/* Windmill Tapered Mast / Tower */}
                  <div className="relative -mt-20 z-10 flex flex-col items-center">
                    {/* Mast Nacelle Joint */}
                    <div className="w-5 h-4 bg-gradient-to-r from-[#e2e8f0] via-[#ffffff] to-[#94a3b8] rounded-t-sm shadow-md" />
                    {/* Tapered Tower Body */}
                    <div
                      className="w-4 h-36 bg-gradient-to-b from-[#e2e8f0] via-[#94a3b8] to-[#044F92]/60 rounded-b-md shadow-2xl relative"
                      style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
                    >
                      {/* Subtle Tower Light Accent */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#38bdf8] rounded-full animate-ping" />
                    </div>
                    {/* Base Foundation Platform */}
                    <div className="w-14 h-2.5 bg-white/20 backdrop-blur-md rounded-full -mt-1 border border-white/30" />
                  </div>
                </div>

                {/* Dynamic Telemetry Narrative below windmill */}
                <div className="text-center mt-3 space-y-1">
                  <div className="inline-flex items-center gap-2">
                    <span className="font-display text-xl font-normal text-white">{activePreset.name}</span>
                    <span className="font-mono text-xs text-[#38bdf8] font-bold">({activePreset.speedKmh} km/h)</span>
                  </div>
                  <p className="text-xs text-blue-100/80 font-light max-w-xs leading-relaxed">
                    {activePreset.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Footer: Interactive Preset Switcher & Gust Trigger */}
              <div className="relative z-10 space-y-3 pt-2 border-t border-white/15">
                <div className="flex items-center justify-between gap-1.5 bg-white/10 p-1 rounded-xl backdrop-blur-md border border-white/10">
                  {WIND_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setActiveWindPreset(preset.id)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap text-center ${activeWindPreset === preset.id
                        ? 'bg-[#044F92] text-white font-semibold shadow-md border border-[#38bdf8]/50'
                        : 'text-blue-200/80 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-blue-200 font-mono text-[11px]">
                    <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>{activePreset.direction}</span>
                  </div>

                  <button
                    onClick={handleTriggerGust}
                    className="px-3 py-1 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#7dd3fc] hover:to-[#38bdf8] text-[#02182c] text-[10px] font-bold uppercase tracking-wider rounded-lg shadow transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                  >
                    <Wind className="w-3 h-3 text-[#02182c]" />
                    <span>{isGusting ? 'Gusting...' : 'Simulate Gust'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BREATHE BETTER IN GOA (INTERACTIVE SPLIT-SCREEN SLIDER)
          ========================================================================= */}
      <section
        id="section-air"
        className="py-28 px-6 sm:px-8 lg:px-12 bg-[#faf7f2] border-b border-[#e5e1da] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <ScrollReveal variant="from-left" distance={30}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fef3c7] border border-[#fde68a] rounded-full text-[#92400e] text-xs font-semibold uppercase tracking-[0.2em]">
                <Wind className="w-3.5 h-3.5 text-[#b45309]" />
                <span>Environmental Longevity & Air Quality</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl font-normal text-[#1a1a1a] tracking-tight">
                Breathe Better in Goa. <br />
                <span className="text-[#044F92] font-serif italic">Your Lungs Will Thank You.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-base sm:text-lg text-[#5a554e] font-light leading-relaxed">
                Drag the interactive slider below to witness the undeniable visual and statistical reality of metropolitan air pollution versus Goa's maritime canopy.
              </p>
            </ScrollReveal>
          </div>

          {/* INTERACTIVE SPLIT-SCREEN COMPARISON SLIDER */}
          <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[#cfe0ee] shadow-2xl bg-black aspect-[16/9] sm:aspect-[21/9]">
            {/* Left Side: Delhi/Metro Smog Simulation */}
            <div className="absolute inset-0 bg-[#3a352f] flex items-center justify-start p-8">
              <img
                src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=80"
                alt="Dense Metropolitan City Smog"
                className="absolute inset-0 w-full h-full object-cover filter blur-[1px] brightness-75 contrast-125 saturate-50"
              />
              <div className="absolute inset-0 bg-amber-950/40" />

              <div className="relative z-10 space-y-2 max-w-xs text-white">
                <span className="px-3 py-1 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  Major Metros (NCR / Mumbai / BLR)
                </span>
                <p className="font-mono text-3xl sm:text-4xl font-bold text-red-300">AQI 280+</p>
                <p className="text-xs text-red-100/90 leading-snug">Severe PM2.5 particulate haze, 85+ dB traffic sirens, and chronic lung fatigue.</p>
              </div>
            </div>

            {/* Right Side: Goa Coastal Forest (Clipped by Slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `polygon(${aqiSliderVal}% 0, 100% 0, 100% 100%, ${aqiSliderVal}% 100%)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
                alt="Goa Lush Maritime Coast and Green Canopy"
                className="absolute inset-0 w-full h-full object-cover brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02182c]/80 via-transparent to-transparent" />

              <div className="absolute bottom-8 right-8 z-10 space-y-2 max-w-xs text-right text-white">
                <span className="px-3 py-1 bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  Goa Coastal Enclave
                </span>
                <p className="font-mono text-3xl sm:text-4xl font-bold text-emerald-300">AQI 28 - 55</p>
                <p className="text-xs text-blue-100/90 leading-snug">Filtered Arabian Sea trade winds, 60% forest canopy, and sub-30 dB silence.</p>
              </div>
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none z-20 flex items-center justify-center"
              style={{ left: `${aqiSliderVal}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#044F92] shadow-2xl flex items-center justify-center border-2 border-[#044F92]">
                <Sliders className="w-5 h-5" />
              </div>
            </div>

            {/* Range Input on Top */}
            <input
              type="range"
              min="10"
              max="90"
              value={aqiSliderVal}
              onChange={(e) => setAqiSliderVal(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Split comparison slider"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DUAL-AIRPORT & EXPRESSWAY CONNECTIVITY
          ========================================================================= */}
      <section
        id="section-transit"
        className="py-28 px-6 sm:px-8 lg:px-12 bg-[#02182c] text-white border-b border-[#044F92] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <ScrollReveal variant="from-left" distance={30}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-blue-200 text-xs font-semibold uppercase tracking-[0.2em]">
                  <Plane className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Strategic Infrastructure & Transit Corridors</span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.1}>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
                  Dual-Airport Gateway & <br />
                  <span className="text-[#38bdf8] font-serif italic">8-Lane Cable Expressways</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.2}>
                <p className="text-base text-blue-100/80 font-light leading-relaxed">
                  Goa has undergone an unprecedented infrastructure renaissance — seamlessly linking high-growth northern lifestyle valleys with international flight routes and rapid rail links.
                </p>
              </ScrollReveal>
            </div>

            <button
              onClick={() => navigate('locations')}
              className="px-6 py-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-all rounded shadow-md border border-[#38bdf8]/40 whitespace-nowrap cursor-pointer self-start md:self-end"
            >
              View Strategic Location Maps →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Terminal 1: MOPA */}
            <div className="p-8 bg-white/5 border border-white/15 rounded-3xl backdrop-blur-md space-y-6 hover:border-[#38bdf8]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#044F92] text-blue-200 text-[10px] uppercase font-bold tracking-widest rounded">
                  North Goa Gateway
                </span>
                <Plane className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <h3 className="font-display text-2xl text-white">Manohar International Airport (MOPA)</h3>
              <p className="text-sm text-blue-100/80 leading-relaxed font-light">
                Purpose-built international hub in Pernem, designed for 35M+ passengers. Connected by high-speed 6-lane elevated expressway directly into Assagao, Siolim, and Mandrem.
              </p>
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-blue-200">
                <div className="flex justify-between">
                  <span>To Assagao / Siolim:</span>
                  <span className="font-bold text-white">25 - 28 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>To Morjim & Mandrem:</span>
                  <span className="font-bold text-white">24 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct Metros Flights:</span>
                  <span className="font-bold text-emerald-400">65m Mumbai • 70m BLR</span>
                </div>
              </div>
            </div>

            {/* Terminal 2: Dabolim & South */}
            <div className="p-8 bg-white/5 border border-white/15 rounded-3xl backdrop-blur-md space-y-6 hover:border-[#38bdf8]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#044F92] text-blue-200 text-[10px] uppercase font-bold tracking-widest rounded">
                  Central / South Gateway
                </span>
                <Plane className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <h3 className="font-display text-2xl text-white">Dabolim International Airport</h3>
              <p className="text-sm text-blue-100/80 leading-relaxed font-light">
                The historic international terminal in Vasco, catering effortlessly to South Goa luxury resort strips, Panaji capital residences, and Dona Paula.
              </p>
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-blue-200">
                <div className="flex justify-between">
                  <span>To Panaji Capital:</span>
                  <span className="font-bold text-white">28 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>To Benaulim & Varca:</span>
                  <span className="font-bold text-white">35 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Charter & Gulf Direct:</span>
                  <span className="font-bold text-emerald-400">Daily Global Directs</span>
                </div>
              </div>
            </div>

            {/* Expressway Bridges & Rail */}
            <div className="p-8 bg-white/5 border border-white/15 rounded-3xl backdrop-blur-md space-y-6 hover:border-[#38bdf8]/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#044F92] text-blue-200 text-[10px] uppercase font-bold tracking-widest rounded">
                  Bridges & Rail
                </span>
                <Car className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <h3 className="font-display text-2xl text-white">Cable Bridges & Vande Bharat Rail</h3>
              <p className="text-sm text-blue-100/80 leading-relaxed font-light">
                The landmark 8-lane Zuari Cable-Stayed Bridge and Atal Setu over Mandovi River eliminate all legacy river choke points. Vande Bharat links Goa to Mumbai in under 7.5 hours.
              </p>
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-blue-200">
                <div className="flex justify-between">
                  <span>Panaji to Margao:</span>
                  <span className="font-bold text-white">32 Mins (Zuari Bridge)</span>
                </div>
                <div className="flex justify-between">
                  <span>Mumbai Vande Bharat:</span>
                  <span className="font-bold text-white">7h 30m Express Rail</span>
                </div>
                <div className="flex justify-between">
                  <span>Bengaluru Vande Bharat:</span>
                  <span className="font-bold text-emerald-400">Direct Superfast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: HEALTHCARE & EDUCATION DIRECTORY
          ========================================================================= */}
      <section
        id="section-infrastructure"
        className="py-28 px-6 sm:px-8 lg:px-12 bg-white border-b border-[#cfe0ee] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Healthcare Subsection */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4">
                <ScrollReveal variant="from-left" distance={30}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#eef5fb] border border-[#cfe0ee] rounded-full text-[#044F92] text-xs font-semibold uppercase tracking-[0.2em]">
                    <Hospital className="w-3.5 h-3.5 text-[#044F92]" />
                    <span>Medical Infrastructure & Tertiary Care</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="from-left" distance={40} delay={0.1}>
                  <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#1a1a1a] tracking-tight">
                    World-Class Healthcare & Emergency Access
                  </h2>
                </ScrollReveal>

                <ScrollReveal variant="from-left" distance={40} delay={0.2}>
                  <p className="text-sm sm:text-base text-[#5a554e] font-light leading-relaxed">
                    Relocating to Goa comes with the peace of mind of renowned multi-specialty hospital networks, 24x7 trauma care centers, and rapid emergency response teams.
                  </p>
                </ScrollReveal>
              </div>

              <div className="flex p-1 bg-[#f4f1ee] rounded-xl border border-[#e5e1da] text-xs">
                {['All', 'Tertiary Care', 'Super Speciality', 'Private Multi-Speciality'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setHealthCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${healthCategory === cat
                      ? 'bg-[#044F92] text-white shadow font-semibold'
                      : 'text-[#5a554e] hover:text-[#1a1a1a]'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredHospitals.map((hosp) => (
                <div key={hosp.id} className="p-6 bg-white border border-[#cfe0ee] rounded-2xl shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="px-2.5 py-1 bg-[#eef5fb] text-[#044F92] text-[10px] uppercase font-bold tracking-wider rounded border border-[#cfe0ee]">
                      {hosp.category}
                    </span>
                    <h4 className="font-display text-lg text-[#1a1a1a]">{hosp.name}</h4>
                    <p className="text-xs text-[#044F92] font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{hosp.location}</span>
                    </p>
                    <p className="text-xs text-emerald-800 font-semibold bg-emerald-50 p-2 rounded border border-emerald-100">
                      {hosp.emergency}
                    </p>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-[#8c857d]">Core Specialties:</p>
                      <ul className="text-xs text-[#5a554e] space-y-0.5">
                        {hosp.specialties.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#f0ece5] flex justify-between text-[11px] font-mono text-[#8c857d]">
                    <span>From Assagao: {hosp.distanceFromAssagao}</span>
                    <span>From Panaji: {hosp.distanceFromPanaji}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Subsection */}
          <div className="space-y-12 pt-8 border-t border-[#cfe0ee]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4">
                <ScrollReveal variant="from-left" distance={30}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fef9ee] border border-[#fef3c7] rounded-full text-amber-800 text-xs font-semibold uppercase tracking-[0.2em]">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                    <span>Education & Relocating Families</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="from-left" distance={40} delay={0.1}>
                  <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#1a1a1a] tracking-tight">
                    Premier International Curricula & Universities
                  </h2>
                </ScrollReveal>

                <ScrollReveal variant="from-left" distance={40} delay={0.2}>
                  <p className="text-sm sm:text-base text-[#5a554e] font-light leading-relaxed">
                    Giving children a holistic upbringing surrounded by nature, international Cambridge IGCSE / ICSE academic standards, and top-tier higher education.
                  </p>
                </ScrollReveal>
              </div>

              <div className="flex p-1 bg-[#f4f1ee] rounded-xl border border-[#e5e1da] text-xs">
                {['All', 'Cambridge IGCSE', 'ICSE / ISC', 'CBSE', 'Higher Education'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSchoolBoardFilter(b)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${schoolBoardFilter === b
                      ? 'bg-[#044F92] text-white shadow font-semibold'
                      : 'text-[#5a554e] hover:text-[#1a1a1a]'
                      }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSchools.map((school) => (
                <div key={school.id} className="p-6 bg-[#faf7f2] border border-[#cfe0ee] rounded-2xl shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="px-2.5 py-1 bg-[#044F92] text-white text-[10px] uppercase font-bold tracking-wider rounded">
                      {school.board}
                    </span>
                    <h4 className="font-display text-lg text-[#1a1a1a]">{school.name}</h4>
                    <p className="text-xs text-[#044F92] font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{school.location}</span>
                    </p>
                    <p className="text-xs text-[#5a554e] font-light leading-relaxed">
                      {school.keyFeature}
                    </p>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-[#8c857d]">Curriculum Highlights:</p>
                      <ul className="text-xs text-[#5a554e] space-y-0.5">
                        {school.highlights.map((h, i) => (
                          <li key={i}>• {h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#e5e1da] text-[11px] font-mono text-[#044F92] font-semibold">
                    <span>Grades: {school.grades}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: BEACHES & COASTLINE SHOWCASE (PRESERVED & ENHANCED)
          ========================================================================= */}
      <section
        id="section-beaches"
        className="relative py-28 px-6 sm:px-8 lg:px-12 bg-[#02182c] text-white border-b border-[#044F92] overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#044F92]/40 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <ScrollReveal variant="from-left" distance={30}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-blue-200 text-xs font-semibold uppercase tracking-[0.2em]">
                  <Palmtree className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>105 KM Coastline Directory</span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.1}>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
                  Golden Sands & <br />
                  <span className="text-[#38bdf8] font-serif italic">Iconic Goa Coastline</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.2}>
                <p className="text-base text-blue-100/80 font-light leading-relaxed">
                  Swipe through the spectrum of Goan shores — from cliff-top sunset bars and watersport promenades to tranquil turquoise bays and secluded freshwater lagoons.
                </p>
              </ScrollReveal>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs">
                {(['All', 'North Goa', 'South Goa'] as const).map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setBeachRegionFilter(reg)}
                    className={`px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${beachRegionFilter === reg
                      ? 'bg-[#044F92] text-white shadow font-semibold border border-[#38bdf8]/50'
                      : 'text-blue-100/70 hover:text-white'
                      }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollBeach('left')}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#044F92] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollBeach('right')}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#044F92] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={beachScrollRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          >
            {filteredBeaches.map((beach, index) => (
              <motion.div
                key={beach.id}
                whileHover={{ y: -8 }}
                onClick={() => setActiveBeachIndex(index)}
                className="w-[300px] sm:w-[350px] lg:w-[380px] shrink-0 bg-white/5 border border-white/15 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md flex flex-col group cursor-pointer snap-start transition-all"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={beach.image}
                    alt={beach.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02182c] via-transparent to-black/20" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-[#044F92]/90 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold rounded-md border border-[#38bdf8]/40">
                      {beach.region}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-display text-2xl drop-shadow-md">{beach.name}</h3>
                    <p className="text-xs text-blue-200 line-clamp-1 font-light">{beach.tagline}</p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#38bdf8]">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-medium">{beach.vibe}</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {beach.highlights.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-blue-100/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-1.5 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200/80">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>{beach.distanceFromAirport}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('locations');
                      }}
                      className="text-[#38bdf8] hover:text-white font-semibold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/15 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#044F92] flex items-center justify-center text-[#38bdf8] shrink-0 border border-[#38bdf8]/40">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-lg text-white">Seeking Coastal & Beach-Facing Estates?</p>
                <p className="text-xs text-blue-200 font-light">Explore Kamat Realty’s private developments in Assagao, Siolim, Ribandar & Aldona.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('projects', { filterStatus: 'ongoing' })}
              className="px-6 py-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer border border-[#38bdf8]/40"
            >
              View Ongoing Projects
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SACRED ARCHITECTURE & LIVING HERITAGE (PRESERVED AS IS)
          ========================================================================= */}
      <section
        id="section-heritage"
        className="relative py-28 px-6 sm:px-8 lg:px-12 bg-[#fffdfa] border-b border-[#e5e1da] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <ScrollReveal variant="from-left" distance={30}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fef3c7] border border-[#fde68a] rounded-full text-[#92400e] text-xs font-semibold uppercase tracking-[0.2em]">
                  <Landmark className="w-3.5 h-3.5 text-[#b45309]" />
                  <span>450 Years of Syncretic Living Heritage</span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.1}>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1a1a] tracking-tight">
                  Sacred Landmarks, <br />
                  <span className="text-[#044F92] font-serif italic">Historic Temples & Churches</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="from-left" distance={40} delay={0.2}>
                <p className="text-base sm:text-lg text-[#5a554e] font-light leading-relaxed">
                  Goa's culture is an enchanting harmony of 12th-century Kadamba basalt temples, baroque Portuguese cathedrals, and festive community harmony (Shigmo, Sao Joao, and Bonderam).
                </p>
              </ScrollReveal>
            </div>

            <div className="inline-flex p-1.5 bg-[#f4f1ee] rounded-xl border border-[#e5e1da] text-xs">
              {[
                { id: 'all', label: 'All Sacred Landmarks' },
                { id: 'church', label: 'Famous Churches' },
                { id: 'temple', label: 'Historic Temples' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setHeritageCategory(tab.id as 'all' | 'church' | 'temple')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${heritageCategory === tab.id
                    ? 'bg-[#044F92] text-white shadow font-semibold'
                    : 'text-[#5a554e] hover:text-[#1a1a1a]'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHeritage.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedHeritageItem(item)}
                className="bg-white border border-[#cfe0ee] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-white shadow ${item.category === 'church' ? 'bg-[#044F92]' : 'bg-[#c25e38]'
                        }`}
                    >
                      {item.category === 'church' ? 'Cathedral & Church' : 'Historic Temple'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] text-blue-200 uppercase tracking-widest font-mono">{item.era}</p>
                    <h3 className="font-display text-xl leading-snug">{item.name}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#044F92] font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#044F92]" />
                      <span>{item.location}</span>
                    </div>

                    <p className="text-xs text-[#5a554e] line-clamp-3 leading-relaxed">
                      {item.intro}
                    </p>

                    <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs space-y-1">
                      <p className="text-[10px] text-[#8c857d] uppercase font-bold tracking-wider">Architecture Style</p>
                      <p className="text-[#1a1a1a] font-medium">{item.architecture}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#f0ece5] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#8c857d] italic line-clamp-1">{item.significance}</span>
                    <span className="text-[#044F92] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          DETAIL MODAL FOR SACRED HERITAGE SITE (PRESERVED)
          ========================================================================= */}
      <AnimatePresence>
        {selectedHeritageItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#cfe0ee] max-h-[90vh] flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full shrink-0">
                <img
                  src={selectedHeritageItem.image}
                  alt={selectedHeritageItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button
                  onClick={() => setSelectedHeritageItem(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span
                    className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-white shadow mb-1 ${selectedHeritageItem.category === 'church' ? 'bg-[#044F92]' : 'bg-[#c25e38]'
                      }`}
                  >
                    {selectedHeritageItem.category === 'church' ? 'Cathedral / Church' : 'Revered Temple'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white">{selectedHeritageItem.name}</h3>
                  <p className="text-xs text-blue-200">{selectedHeritageItem.location} • {selectedHeritageItem.era}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#044F92]">Historical Overview</h4>
                  <p className="text-sm text-[#4a4540] leading-relaxed font-light">{selectedHeritageItem.intro}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c857d]">Architectural Highlight</p>
                    <p className="text-xs text-[#1a1a1a] font-medium leading-relaxed">{selectedHeritageItem.keyFeature}</p>
                  </div>
                  <div className="p-4 bg-[#fef9ee] border border-[#fef3c7] rounded-xl space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Cultural Significance</p>
                    <p className="text-xs text-amber-950 font-medium leading-relaxed">{selectedHeritageItem.significance}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedHeritageItem(null)}
                    className="px-6 py-2.5 bg-[#044F92] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#03396c] transition-colors cursor-pointer"
                  >
                    Close Landmark
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          INTERACTIVE 3-STEP LOCATION MATCHMAKER MODAL
          ========================================================================= */}
      <AnimatePresence>
        {showMatchmaker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#cfe0ee] p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#e5e1da] pb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#044F92]" />
                  <span className="font-display text-xl text-[#1a1a1a]">Goa Location Matchmaker</span>
                </div>
                <button
                  onClick={() => {
                    setShowMatchmaker(false);
                    setMatchStep(1);
                  }}
                  className="w-8 h-8 rounded-full bg-[#f4f1ee] hover:bg-[#e5e1da] text-[#5a554e] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step Progress */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((st) => (
                  <div
                    key={st}
                    className={`flex-1 h-1.5 rounded-full transition-all ${matchStep >= st ? 'bg-[#044F92]' : 'bg-[#cfe0ee]'
                      }`}
                  />
                ))}
              </div>

              {/* Step 1 */}
              {matchStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#044F92] tracking-wider">Step 1 of 3</span>
                    <h3 className="font-display text-xl text-[#1a1a1a]">What is your primary living lifestyle vibe?</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'gourmet', title: 'Gourmet & Creative', desc: 'Boutique cafes, art ateliers & restored villas (Assagao / Siolim)' },
                      { id: 'waterfront', title: 'Capital Waterfront', desc: 'City conveniences, riverfront promenade & yachting (Panaji / Miramar)' },
                      { id: 'peaceful', title: 'Serene Hinterland', desc: 'Ancient orchards, backwaters & complete silence (Aldona / Moira)' },
                      { id: 'coastal', title: 'Tranquil South Coast', desc: 'Uncrowded silver beaches & luxury resort quietude (Benaulim / Varca)' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setMatchAnswers((prev) => ({ ...prev, vibe: opt.id }));
                          setMatchStep(2);
                        }}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${matchAnswers.vibe === opt.id
                          ? 'bg-[#eef5fb] border-[#044F92] text-[#044F92]'
                          : 'bg-[#faf7f2] border-[#cfe0ee] hover:bg-white'
                          }`}
                      >
                        <p className="font-bold text-sm text-[#1a1a1a]">{opt.title}</p>
                        <p className="text-xs text-[#5a554e] mt-1">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {matchStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#044F92] tracking-wider">Step 2 of 3</span>
                    <h3 className="font-display text-xl text-[#1a1a1a]">What is your most critical transit priority?</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'mopa', title: 'Fast MOPA Airport Link', desc: 'Frequent flights to Mumbai/Delhi/Dubai (North Expressway)' },
                      { id: 'schools', title: 'Top International Schools', desc: 'Proximity to The Gera School & Sharada Mandir' },
                      { id: 'beach', title: '5-Minute Beach Walk', desc: 'Immediate access to sunset swims and surfing' },
                      { id: 'hospitals', title: 'Tertiary Medical Hubs', desc: 'Close to Manipal, Healthway, and GMC Bambolim' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setMatchAnswers((prev) => ({ ...prev, priority: opt.id }));
                          setMatchStep(3);
                        }}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${matchAnswers.priority === opt.id
                          ? 'bg-[#eef5fb] border-[#044F92] text-[#044F92]'
                          : 'bg-[#faf7f2] border-[#cfe0ee] hover:bg-white'
                          }`}
                      >
                        <p className="font-bold text-sm text-[#1a1a1a]">{opt.title}</p>
                        <p className="text-xs text-[#5a554e] mt-1">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {matchStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Your Match Output</span>
                    <h3 className="font-display text-2xl text-[#1a1a1a]">
                      {matchAnswers.vibe === 'gourmet' || matchAnswers.priority === 'mopa'
                        ? 'Assagao & Siolim Valley'
                        : matchAnswers.vibe === 'waterfront' || matchAnswers.priority === 'schools'
                          ? 'Panaji & Ribandar Waterfront'
                          : 'Aldona Hinterland Orchards'}
                    </h3>
                  </div>

                  <div className="p-4 bg-[#f8fafc] border border-[#cfe0ee] rounded-2xl space-y-2">
                    <p className="text-xs text-[#5a554e] leading-relaxed">
                      Based on your preferences for{' '}
                      <span className="font-semibold text-[#044F92]">{matchAnswers.vibe || 'luxury'}</span> living and{' '}
                      <span className="font-semibold text-[#044F92]">{matchAnswers.priority || 'connectivity'}</span>, Kamat Realty recommends our flagship gated developments with tailored concierge.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setShowMatchmaker(false);
                        handleTour();
                      }}
                      className="flex-1 py-3.5 bg-[#044F92] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#03396c] transition-colors rounded cursor-pointer text-center"
                    >
                      Book Chauffeured Site Tour
                    </button>
                    <button
                      onClick={() => {
                        setShowMatchmaker(false);
                        navigate('projects');
                      }}
                      className="flex-1 py-3.5 bg-white border border-[#044F92] text-[#044F92] text-xs font-semibold uppercase tracking-widest hover:bg-[#eef5fb] transition-colors rounded cursor-pointer text-center"
                    >
                      Explore Matched Properties
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
