'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
import {
  Compass,
  Palmtree,
  Utensils,
  Sun,
  Waves,
  Building2,
  TrendingUp,
  Plane,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  DollarSign,
  Maximize2,
  Calendar,
  Flame,
  Landmark,
  Church,
  Info,
  X,
  Heart,
  Wind,
  Droplets,
  Activity,
  Smile
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';

interface ExploreGoaPageProps {
  onNavigate?: (page: string, params?: { propertyId?: string; filterStatus?: string }) => void;
  onOpenTourModal?: () => void;
}

// ==========================================
// BEACHES DATA COLLECTION
// ==========================================
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

// ==========================================
// CULTURE & SACRED HERITAGE DATA COLLECTION
// ==========================================
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

  const [activeSection, setActiveSection] = useState<number>(0);
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Section 1 State: City vs Susegad Lifestyle Toggle & Philosophy Pillar
  const [lifestyleMode, setLifestyleMode] = useState<'susegad' | 'city'>('susegad');
  const [activePillar, setActivePillar] = useState<number>(0);

  // Section 2 State: Food Thali Hotspot Active Item
  const [activeDish, setActiveDish] = useState<number>(0);

  // Section 3 State: Beaches Carousel & Region Filter
  const [beachRegionFilter, setBeachRegionFilter] = useState<'All' | 'North Goa' | 'South Goa'>('All');
  const [activeBeachIndex, setActiveBeachIndex] = useState<number>(0);
  const beachScrollRef = useRef<HTMLDivElement>(null);

  // Section 4 State: Culture & Sacred Heritage Category Filter
  const [heritageCategory, setHeritageCategory] = useState<'all' | 'church' | 'temple'>('all');
  const [selectedHeritageItem, setSelectedHeritageItem] = useState<SacredHeritageItem | null>(null);
  const [activeArchFeature, setActiveArchFeature] = useState<number>(0);

  // Section 5 State: ROI Calculator Investment Value (in Crores)
  const [investmentAmount, setInvestmentAmount] = useState<number>(6.5);
  const [projectedOccupancy, setProjectedOccupancy] = useState<number>(68);

  // 3D Parallax Mouse Tracking on Floating Assets
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const rotateX = useTransform(smoothMouseY, [-300, 300], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-12, 12]);
  const oceanShiftX = useTransform(smoothMouseX, [-300, 300], [-25, 25]);
  const oceanShiftY = useTransform(smoothMouseY, [-300, 300], [-15, 15]);

  // Canvas ref for Interactive Sea Waves
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);

    const rect = currentTarget.getBoundingClientRect();
    mousePosRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current.active = false;
  };

  // Interactive Canvas Sea Waves Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 900;
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle foam nodes
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }
    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * (canvas.width || 1200),
      y: Math.random() * (canvas.height || 800),
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.4 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const render = () => {
      step += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const mouse = mousePosRef.current;

      // Draw 3 Interactive Wave Layers at base
      const waveConfigs = [
        {
          baseY: h * 0.72,
          amplitude: 28,
          frequency: 0.004,
          speed: 1.2,
          color: 'rgba(4, 79, 146, 0.22)'
        },
        {
          baseY: h * 0.78,
          amplitude: 22,
          frequency: 0.006,
          speed: -1.5,
          color: 'rgba(2, 132, 199, 0.18)'
        },
        {
          baseY: h * 0.84,
          amplitude: 18,
          frequency: 0.008,
          speed: 2.0,
          color: 'rgba(56, 189, 248, 0.14)'
        }
      ];

      waveConfigs.forEach((cfg) => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 8) {
          // Base sinusoidal wave
          let y =
            cfg.baseY +
            Math.sin(x * cfg.frequency + step * cfg.speed) * cfg.amplitude +
            Math.cos(x * cfg.frequency * 0.5 + step * 0.8) * (cfg.amplitude * 0.4);

          // Mouse wake water displacement
          if (mouse.active) {
            const dx = x - mouse.x;
            const dist = Math.abs(dx);
            if (dist < 260) {
              const influence = (1 - dist / 260) * 35 * Math.sin(step * 4);
              y += influence;
            }
          }

          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = cfg.color;
        ctx.fill();
      });

      // Floating bio-luminescent foam sparkles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            p.x += (dx / dist) * 0.8;
            p.y += (dy / dist) * 0.8;
          }
        }

        if (p.y < 0) p.y = h;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filtered lists
  const filteredBeaches = GOA_BEACHES.filter(
    (b) => beachRegionFilter === 'All' || b.region === beachRegionFilter
  );

  const filteredHeritage = SACRED_HERITAGE_LIST.filter(
    (h) => heritageCategory === 'all' || h.category === heritageCategory
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

  // Ambient Coastal Audio Synth
  const toggleAmbientSound = () => {
    if (soundPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.suspend();
      }
      setSoundPlaying(false);
    } else {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.969 * b2 + white * 0.153852;
            b3 = 0.8665 * b3 + white * 0.3104856;
            b4 = 0.55 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.016898;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.04;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(250, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(filter.frequency);
          lfo.start();

          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.25, ctx.currentTime);

          whiteNoise.connect(filter);
          filter.connect(masterGain);
          masterGain.connect(ctx.destination);

          whiteNoise.start(0);
          noiseNodeRef.current = whiteNoise;
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        setSoundPlaying(true);
      } catch (err) {
        console.error('Audio could not be initialized:', err);
      }
    }
  };

  // Section Observer on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['section-hero', 'section-food', 'section-beaches', 'section-heritage', 'section-investment'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => { });
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

  // Rental ROI calculations
  const calculatedRentalYield = (13.4).toFixed(1);
  const annualRentalIncome = (investmentAmount * 10000000 * 0.134).toLocaleString('en-IN', {
    maximumFractionDigits: 0
  });
  const estimatedNightlyTariff = Math.round(
    (investmentAmount * 10000000 * 0.134) / (365 * (projectedOccupancy / 100))
  );

  return (
    <div
      className="min-h-screen bg-[#fdfcfb] text-[#1a1a1a] selection:bg-[#044F92] selection:text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-10 bg-[radial-gradient(#044F92_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Sticky Chapter Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#02182c]/90 backdrop-blur-xl border border-white/20 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 sm:gap-6 text-xs transition-all max-w-[95vw] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0 border-r border-white/20 pr-3 sm:pr-4">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-blue-200 hidden sm:inline">Goa Odyssey</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { label: '01 Susegad', id: 'section-hero' },
            { label: '02 Culinary', id: 'section-food' },
            { label: '03 Beaches', id: 'section-beaches' },
            { label: '04 Culture & Temples', id: 'section-heritage' },
            { label: '05 Yield & ROI', id: 'section-investment' }
          ].map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => scrollToSection(chap.id)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-medium transition-all tracking-wide whitespace-nowrap cursor-pointer ${activeSection === idx
                ? 'bg-[#044F92] text-white shadow-md font-semibold border border-[#38bdf8]/50'
                : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
            >
              {chap.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleAmbientSound}
          title={soundPlaying ? 'Mute Coastal Ambient Sound' : 'Play Soothing Coastal Ambient Sound'}
          className="shrink-0 flex items-center gap-1.5 pl-2 sm:pl-3 border-l border-white/20 text-blue-200 hover:text-white cursor-pointer transition-colors"
        >
          {soundPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
              <span className="text-[10px] hidden md:inline font-mono">Breeze On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/60" />
              <span className="text-[10px] hidden md:inline font-mono text-white/60">Sound</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          CHAPTER 1: FULL HERO - THE ART OF GOAN SUSEGAD (INTERACTIVE SEA WAVES)
          ========================================================================= */}
      <section
        id="section-hero"
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen pt-32 pb-24 px-6 sm:px-8 lg:px-12 flex flex-col justify-between border-b border-[#cfe0ee] overflow-hidden bg-gradient-to-b from-[#f2f8fc] via-[#fdfcfb] to-[#f0f6fa]"
      >
        {/* INTERACTIVE SEA WAVES CANVAS BACKGROUND */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0 opacity-80"
        />

        {/* Ambient Glowing Sun & Parallax Glow */}
        <motion.div
          style={{ x: oceanShiftX, y: oceanShiftY }}
          className="absolute -top-16 right-1/4 w-[550px] h-[550px] bg-gradient-to-br from-[#ffd97d]/35 via-[#38bdf8]/20 to-transparent rounded-full blur-[100px] pointer-events-none -z-0"
        />
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#044F92]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10 my-auto">
          {/* Left Column: Cinematic Typography & Narrative */}
          <div className="lg:col-span-7 space-y-7">
            <ScrollReveal variant="from-left" distance={30}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/90 backdrop-blur-md border border-[#044F92]/20 rounded-full text-[#044F92] text-xs font-semibold uppercase tracking-[0.22em] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#044F92] animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-[#044F92]" />
                <span>The Art of Goan Susegad • Chapter 01</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.1}>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1a1a1a] tracking-tight leading-[1.05]">
                Where Time Dissolves <br />
                Into The <span className="text-[#044F92] italic font-serif">Arabian Sea</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-base sm:text-lg text-[#5a554e] font-light leading-relaxed max-w-xl">
                <span className="font-semibold text-[#044F92]">Susegad</span> is not indolence — it is the conscious surrender to unhurried contentment. Awaken to warm sea mist, birdsong in emerald paddy fields, and sunsets that belong entirely to you.
              </p>
            </ScrollReveal>

            {/* THREE INTERACTIVE SUSEGAD PILLARS (Hoverable with Ripple Preview) */}
            <ScrollReveal variant="from-bottom" distance={30} delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 max-w-xl">
                {[
                  {
                    title: 'Biophilic Silence',
                    icon: Wind,
                    desc: 'Private plunge pools & forest edge verandas.',
                    stat: '0 Commute'
                  },
                  {
                    title: 'Oceanic Cadence',
                    icon: Waves,
                    desc: '300+ golden sunny days by gentle tides.',
                    stat: '300+ Sun'
                  },
                  {
                    title: 'The Balcão Twilight',
                    icon: Sun,
                    desc: 'Verandah conversations over Konkan wine.',
                    stat: '100% Peace'
                  }
                ].map((pillar, pIdx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pIdx}
                      onMouseEnter={() => setActivePillar(pIdx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${activePillar === pIdx
                        ? 'bg-white border-[#044F92] shadow-xl -translate-y-1'
                        : 'bg-white/60 backdrop-blur-md border-[#cfe0ee] hover:bg-white'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${activePillar === pIdx ? 'bg-[#044F92] text-white' : 'bg-[#eef5fb] text-[#044F92]'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#044F92]">{pillar.stat}</span>
                      </div>
                      <h4 className="font-display text-sm font-semibold mt-2.5 text-[#1a1a1a]">{pillar.title}</h4>
                      <p className="text-[11px] text-[#5a554e] mt-1 leading-snug">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* INTERACTIVE CONTRAST CONTROLLER: Susegad vs City Matrix */}
            <ScrollReveal variant="from-bottom" distance={30} delay={0.35}>
              <div className="p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-[#cfe0ee] rounded-2xl shadow-xl space-y-4 max-w-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#044F92]" />
                    <span className="text-xs uppercase tracking-wider font-bold text-[#1a1a1a]">Lifestyle Contrast Engine</span>
                  </div>
                  <div className="inline-flex p-1 bg-[#f4f1ee] rounded-full text-xs">
                    <button
                      onClick={() => setLifestyleMode('susegad')}
                      className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${lifestyleMode === 'susegad'
                        ? 'bg-[#044F92] text-white shadow-md font-semibold'
                        : 'text-[#5a554e] hover:text-[#1a1a1a]'
                        }`}
                    >
                      Goan Susegad
                    </button>
                    <button
                      onClick={() => setLifestyleMode('city')}
                      className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${lifestyleMode === 'city'
                        ? 'bg-[#8c3520] text-white shadow-md font-semibold'
                        : 'text-[#5a554e] hover:text-[#1a1a1a]'
                        }`}
                    >
                      Metropolitan Grind
                    </button>
                  </div>
                </div>

                {lifestyleMode === 'susegad' ? (
                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="p-3 bg-[#eef5fb] rounded-xl border border-blue-100">
                      <p className="font-mono text-xl font-bold text-[#044F92]">18 AQI</p>
                      <p className="text-[11px] text-[#5a554e] mt-0.5 font-medium">Pure Sea Breeze</p>
                    </div>
                    <div className="p-3 bg-[#fef9ee] rounded-xl border border-amber-100">
                      <p className="font-mono text-xl font-bold text-amber-700">32 dB</p>
                      <p className="text-[11px] text-[#5a554e] mt-0.5 font-medium">Ocean Waves Sound</p>
                    </div>
                    <div className="p-3 bg-[#f2fcf5] rounded-xl border border-emerald-100">
                      <p className="font-mono text-xl font-bold text-emerald-700">-40%</p>
                      <p className="text-[11px] text-[#5a554e] mt-0.5 font-medium">Stress & Fatigue</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 pt-2 text-center opacity-85">
                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                      <p className="font-mono text-xl font-bold text-red-700">380 AQI</p>
                      <p className="text-[11px] text-red-900/80 mt-0.5 font-medium">Dense Smog</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                      <p className="font-mono text-xl font-bold text-gray-700">88 dB</p>
                      <p className="text-[11px] text-gray-600 mt-0.5 font-medium">Traffic Horns</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="font-mono text-xl font-bold text-amber-800">150 Min</p>
                      <p className="text-[11px] text-amber-900/80 mt-0.5 font-medium">Daily Gridlock</p>
                    </div>
                  </div>
                )}

                <p className="text-xs text-[#8c857d] italic">
                  {lifestyleMode === 'susegad'
                    ? '“Step out onto your sunlit deck in Assagao or Siolim. Breathe freely in an environment engineered for timeless longevity.”'
                    : 'Break free from the rush. Kamat Realty crafts sanctuaries that restore health, joy, and peace of mind.'}
                </p>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="from-bottom" distance={30} delay={0.45}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleTour}
                  className="px-7 py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Susegad Discovery Tour</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('section-food')}
                  className="px-6 py-3.5 bg-white/80 backdrop-blur-md border border-[#044F92] text-[#044F92] hover:bg-[#eef5fb] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm"
                >
                  Experience Culinary Journey ↓
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3D Mouse Parallax Floating Estate Preview */}
          <div className="lg:col-span-5 flex justify-center items-center perspective-1000">
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center preserve-3d"
            >
              {/* Glassmorphic 3D Card Platform with Sea Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#044F92]/15 via-white/85 to-[#38bdf8]/20 rounded-3xl border border-white/90 shadow-[0_30px_70px_-15px_rgba(4,79,146,0.22)] backdrop-blur-xl -rotate-1 transform transition-transform" />

              {/* Background Paddy Field & Pool Terrace Imagery */}
              <div className="absolute inset-4 rounded-2xl overflow-hidden border border-white/80 shadow-inner group">
                <img
                  src="https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1000&q=80"
                  alt="Goan Coastal Villa & Private Sundeck"
                  className="w-full h-full object-cover brightness-95 transform group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02182c]/85 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#044F92] text-[9px] uppercase tracking-widest font-bold rounded">
                    <Sparkles className="w-2.5 h-2.5 text-[#38bdf8]" />
                    <span>Assagao Valley Villa</span>
                  </div>
                  <p className="font-display text-lg">Private Plunge Pools Overlooking Emerald Paddy Fields</p>
                  <p className="text-[11px] text-blue-200 font-light flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#38bdf8]" />
                    <span>North Goa • 28 Mins from MOPA Airport</span>
                  </p>
                </div>
              </div>

              {/* FLOATING 3D ASSET 1: Floating Ceramic Conch Shell */}
              <motion.div
                animate={{
                  y: [-12, 14, -12],
                  rotateZ: [-3, 4, -3]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut'
                }}
                className="absolute -top-6 -right-6 z-30 w-36 h-36 drop-shadow-[0_20px_30px_rgba(4,79,146,0.35)] cursor-pointer"
                title="Goan Handcrafted Ceramic Shell"
              >
                <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-xl">
                  <defs>
                    <radialGradient id="shellGlaze" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="35%" stopColor="#e2edf7" />
                      <stop offset="70%" stopColor="#8cb7de" />
                      <stop offset="100%" stopColor="#044F92" />
                    </radialGradient>
                    <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fae19c" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#997a15" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 60 15 C 85 15, 105 35, 105 60 C 105 85, 85 105, 55 105 C 30 105, 15 90, 18 68 C 20 48, 38 35, 55 35 C 72 35, 82 48, 80 62 C 78 74, 68 82, 58 80 C 50 78, 46 72, 48 65 C 50 60, 56 58, 60 62"
                    fill="url(#shellGlaze)"
                    stroke="url(#goldRim)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path d="M 60 18 Q 80 40 85 62" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.8" />
                  <path d="M 45 28 Q 65 50 70 75" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
                </svg>
              </motion.div>

              {/* FLOATING 3D ASSET 2: Luxury 24K Brass Villa Key */}
              <motion.div
                animate={{
                  y: [10, -12, 10],
                  rotateZ: [5, -4, 5],
                  rotateY: [-10, 12, -10]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5.2,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
                className="absolute -bottom-7 -left-6 z-30 w-36 h-28 drop-shadow-[0_20px_25px_rgba(0,0,0,0.4)] cursor-pointer"
                title="Kamat Heirloom Villa Master Key"
              >
                <svg viewBox="0 0 140 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="brassKey" x1="0%" y1="0%" x2="100%" y2="80%">
                      <stop offset="0%" stopColor="#fff2c2" />
                      <stop offset="30%" stopColor="#e5be58" />
                      <stop offset="70%" stopColor="#b38728" />
                      <stop offset="100%" stopColor="#664d12" />
                    </linearGradient>
                  </defs>
                  <circle cx="35" cy="45" r="22" fill="none" stroke="url(#brassKey)" strokeWidth="6" />
                  <circle cx="35" cy="45" r="11" fill="none" stroke="url(#brassKey)" strokeWidth="3" />
                  <circle cx="35" cy="23" r="5" fill="url(#brassKey)" />
                  <circle cx="16" cy="45" r="5" fill="url(#brassKey)" />
                  <circle cx="35" cy="67" r="5" fill="url(#brassKey)" />
                  <rect x="54" y="42" width="65" height="6" rx="2" fill="url(#brassKey)" />
                  <path d="M 100 48 L 100 66 L 106 66 L 106 48 L 112 48 L 112 60 L 118 60 L 118 48 Z" fill="url(#brassKey)" />
                  <text x="35" y="48" fontSize="8" fontWeight="bold" fill="#664d12" textAnchor="middle" fontFamily="sans-serif">
                    KRW
                  </text>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM WAVE SCROLL DOWN CUE */}
        <div className="w-full flex justify-center pb-2 relative z-10">
          <button
            onClick={() => scrollToSection('section-food')}
            className="flex flex-col items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#044F92] hover:text-[#03396c] transition-colors cursor-pointer group"
          >
            <span className="text-[10px] text-[#8c857d] group-hover:text-[#044F92]">Chapter 02 • Culinary Heritage</span>
            <div className="w-5 h-8 border-2 border-[#044F92]/40 rounded-full flex justify-center pt-1.5 group-hover:border-[#044F92]">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 rounded-full bg-[#044F92]"
              />
            </div>
          </button>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 2: FOOD & CULINARY CULTURE (PRESERVED UNCHANGED)
          ========================================================================= */}
      <section
        id="section-food"
        className="relative py-28 px-6 sm:px-8 lg:px-12 bg-[#faf7f2] border-b border-[#e5e1da] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <ScrollReveal variant="from-left" distance={30}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#eef5fb] border border-[#cfe0ee] rounded-full text-[#044F92] text-xs font-semibold uppercase tracking-[0.2em]">
                <Utensils className="w-3.5 h-3.5 text-[#044F92]" />
                <span>Culinary Heritage</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1a1a] tracking-tight">
                Coastal Flavors & <br />
                <span className="text-[#c25e38] font-serif italic">World-Class Gastronomy</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-base sm:text-lg text-[#5a554e] font-light leading-relaxed">
                From authentic Konkani seafood thalis simmered with fresh kokum and grated coconut to Michelin-standard chef tables tucked inside restored Portuguese villas in Assagao.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center perspective-1000">
              <motion.div
                initial={{ opacity: 0, y: -60, x: 50, rotateZ: 45 }}
                whileInView={{ opacity: 1, y: 0, x: 0, rotateZ: 35 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                whileHover={{ rotateZ: 0, scale: 1.04, transition: { duration: 0.4 } }}
                className="relative w-full max-w-lg aspect-square p-6 flex items-center justify-center cursor-pointer preserve-3d"
              >
                <div className="absolute inset-x-8 bottom-4 h-16 bg-black/25 rounded-full filter blur-2xl transform scale-90" />

                <div className="absolute -top-12 inset-x-0 h-44 pointer-events-none z-30 flex justify-center gap-6 overflow-hidden">
                  <motion.div
                    animate={{
                      y: [20, -50],
                      opacity: [0, 0.7, 0],
                      scaleX: [0.8, 1.4],
                      x: [-4, 6]
                    }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'easeOut' }}
                    className="w-10 h-32 bg-gradient-to-t from-white/60 to-transparent blur-md rounded-full"
                  />
                  <motion.div
                    animate={{
                      y: [30, -60],
                      opacity: [0, 0.8, 0],
                      scaleX: [1, 1.6],
                      x: [5, -8]
                    }}
                    transition={{ repeat: Infinity, duration: 3.8, ease: 'easeOut', delay: 1 }}
                    className="w-12 h-36 bg-gradient-to-t from-white/70 to-transparent blur-lg rounded-full"
                  />
                  <motion.div
                    animate={{
                      y: [25, -55],
                      opacity: [0, 0.6, 0],
                      scaleX: [0.7, 1.3],
                      x: [2, 10]
                    }}
                    transition={{ repeat: Infinity, duration: 4.2, ease: 'easeOut', delay: 1.8 }}
                    className="w-8 h-28 bg-gradient-to-t from-white/50 to-transparent blur-md rounded-full"
                  />
                </div>

                <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-[#d4af37] shadow-[0_30px_70px_rgba(0,0,0,0.45),inset_0_2px_12px_rgba(255,255,255,0.4)] bg-[#1a1208]">
                  <img
                    src="/goan-fish-thali.jpg"
                    alt="Authentic Luxury Goan Fish Curry Thali with Pomfret Fry, Kokum Solkadhi, Red Rice, and Poee"
                    className="w-full h-full object-cover select-none transform hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />

                  {/* Hotspot 0: Steamed Goan Red Rice */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDish(0);
                    }}
                    className="absolute left-[26%] top-[64%] -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer"
                    title="Click to inspect Goan Red Rice"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs shadow-2xl transition-all duration-300 ${activeDish === 0
                        ? 'bg-[#044F92] text-white ring-4 ring-[#38bdf8]/80 scale-125'
                        : 'bg-white/95 text-[#044F92] hover:bg-white hover:scale-110'
                        }`}
                    >
                      1
                    </span>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[9px] uppercase tracking-wider rounded font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                      Goan Red Rice
                    </span>
                  </button>

                  {/* Hotspot 1: Goan Coconut Fish Curry */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDish(1);
                    }}
                    className="absolute left-[32%] top-[27%] -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer"
                    title="Click to inspect Coconut Fish Curry"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs shadow-2xl transition-all duration-300 ${activeDish === 1
                        ? 'bg-[#044F92] text-white ring-4 ring-[#38bdf8]/80 scale-125'
                        : 'bg-white/95 text-[#044F92] hover:bg-white hover:scale-110'
                        }`}
                    >
                      2
                    </span>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[9px] uppercase tracking-wider rounded font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                      Kokum Fish Curry
                    </span>
                  </button>

                  {/* Hotspot 2: Golden Crispy Pomfret Fish Fry */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDish(2);
                    }}
                    className="absolute left-[64%] top-[48%] -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer"
                    title="Click to inspect Pomfret Fish Fry"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs shadow-2xl transition-all duration-300 ${activeDish === 2
                        ? 'bg-[#044F92] text-white ring-4 ring-[#38bdf8]/80 scale-125'
                        : 'bg-white/95 text-[#044F92] hover:bg-white hover:scale-110'
                        }`}
                    >
                      3
                    </span>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[9px] uppercase tracking-wider rounded font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                      Pomfret (Pomplate) Fry
                    </span>
                  </button>

                  {/* Hotspot 3: Pink Kokum Solkadhi */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDish(3);
                    }}
                    className="absolute left-[48%] top-[78%] -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer"
                    title="Click to inspect Kokum Solkadhi"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs shadow-2xl transition-all duration-300 ${activeDish === 3
                        ? 'bg-[#044F92] text-white ring-4 ring-[#38bdf8]/80 scale-125'
                        : 'bg-white/95 text-[#044F92] hover:bg-white hover:scale-110'
                        }`}
                    >
                      4
                    </span>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[9px] uppercase tracking-wider rounded font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                      Kokum Solkadhi
                    </span>
                  </button>

                  {/* Hotspot 4: Wood-Fired Goan Poee */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDish(4);
                    }}
                    className="absolute left-[58%] top-[19%] -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer"
                    title="Click to inspect Poee Bread"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs shadow-2xl transition-all duration-300 ${activeDish === 4
                        ? 'bg-[#044F92] text-white ring-4 ring-[#38bdf8]/80 scale-125'
                        : 'bg-white/95 text-[#044F92] hover:bg-white hover:scale-110'
                        }`}
                    >
                      5
                    </span>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/85 backdrop-blur-md text-white text-[9px] uppercase tracking-wider rounded font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                      Artisanal Poee
                    </span>
                  </button>
                </div>

                <div className="absolute top-4 left-6 bg-[#044F92] text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xl border border-blue-300/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
                  <span>Real Goan Thali • Click Hotspot 1-5</span>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 bg-white border border-[#cfe0ee] rounded-2xl shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-[#e5e1da] pb-3">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#044F92] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#c25e38]" />
                    <span>Coastal Gastronomy Spotlight</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#8c857d]">Item {activeDish + 1} of 5</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-2xl text-[#1a1a1a]">
                      {[
                        'Steamed Goan Red Rice (Ukda Tandool)',
                        'Kokum Coconut Fish Curry (Xitt Kodi)',
                        'Crispy Silver Pomfret Fry (Pomplate Rawa Fry)',
                        'Digestive Kokum Solkadhi',
                        'Wood-Fired Crusty Poee Bread'
                      ][activeDish]}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-[#f2f7fc] text-[#044F92] border border-[#cfe0ee]">
                      {[
                        'Indigenous Rice',
                        'Signature Gravy',
                        'Pomfret Fry',
                        'Kokum Elixir',
                        'Heritage Poee'
                      ][activeDish]}
                    </span>
                  </div>

                  <p className="text-sm text-[#5a554e] leading-relaxed">
                    {[
                      'Nutrient-dense, unpolished red rice grains gently steamed in coastal clay pots. Delivers an earthy, nutty flavor profile that absorbs rich coconut gravies perfectly.',
                      'Simmered with fresh coconut milk, dried red kokum (wild mangosteen) for tart balance, stone-ground byadgi chillies, coriander, and fresh catch of the morning.',
                      'Fresh whole silver pomfret (pomplate) deeply marinated in spicy recheado paste, crusted in coarse semolina (rawa), and pan-fried golden crisp with lemon wedges and red onions.',
                      'A soothing, bright-pink digestive nectar crafted from fresh coconut milk, sun-dried kokum extract, crushed green chillies, aromatic garlic, and fresh sea salt.',
                      'Traditional wood-fired whole-wheat pocket bread with a hollow, pillow-soft crumb and crisp bran crust, baked at 5 AM daily by ancestral village bakers.'
                    ][activeDish]}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[#f0ece5]">
                    {[
                      '1. Red Rice',
                      '2. Fish Curry',
                      '3. Pomfret Fry',
                      '4. Kokum Solkadhi',
                      '5. Poee Bread'
                    ].map((label, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveDish(idx)}
                        className={`px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer rounded ${activeDish === idx
                          ? 'bg-[#044F92] text-white shadow-sm font-semibold'
                          : 'bg-[#f4f1ee] hover:bg-[#eef5fb] text-[#4a4540] hover:text-[#044F92]'
                          }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#cfe0ee] rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-[#044F92] font-bold">Assagao Gourmet Corridor</p>
                  <p className="font-display text-lg mt-1 text-[#1a1a1a]">Restored Villa Dining</p>
                  <p className="text-xs text-[#8c857d] mt-1">
                    Home to Gunpowder, Bawri, Jamun, and Michelin-recognized chefs blending heritage Goan ingredients with global molecular craft.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#cfe0ee] rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-[#044F92] font-bold">Panaji Latin Quarter</p>
                  <p className="font-display text-lg mt-1 text-[#1a1a1a]">120-Year Heritage Cafes</p>
                  <p className="text-xs text-[#8c857d] mt-1">
                    Boutique pastelerias serving Bebinca, warm cinnamon pasteis de nata, and single-origin South Indian coffee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 3: BEACHES & COASTLINE - INTERACTIVE SCROLLING SHOWCASE
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
                  <span>Interactive Coastline Showcase</span>
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
                  Swipe through the spectrum of Goan beaches — from cliff-top sunset enclaves and buzzing water sport hubs to tranquil turquoise coves and freshwater lagoons.
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
                <p className="font-display text-lg text-white">Looking for Beach-Facing Luxury Villas?</p>
                <p className="text-xs text-blue-200 font-light">Explore Kamat Realty’s private estates in Assagao, Candolim, Siolim & Miramar.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('projects', { filterStatus: 'ongoing' })}
              className="px-6 py-3 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-all whitespace-nowrap cursor-pointer border border-[#38bdf8]/40"
            >
              View Coastal Estates
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 4: CULTURE & SACRED HERITAGE (FAMOUS TEMPLES & CHURCHES)
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
                  <span>Spiritual & Architectural Heritage</span>
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
                  Goa's culture is an enchanting harmony of centuries-old Kadamba basalt temples and Portuguese Baroque cathedrals. Discover the timeless spiritual architecture of the sunshine state.
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

          <div className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-[#f8fafc] to-[#eef5fb] rounded-3xl border border-[#cfe0ee] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eef5fb] border border-[#cfe0ee] rounded-full text-[#044F92] text-xs font-semibold uppercase tracking-widest">
                  <Building2 className="w-3.5 h-3.5 text-[#044F92]" />
                  <span>Goan Architectural Anatomy</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">Elements of Classical Goan Estates</h3>
                <p className="text-sm text-[#5a554e] leading-relaxed font-light">
                  Every Kamat luxury villa integrates the climate-smart wisdom of Goan master builders — naturally ventilated high roofs, oyster shell window diffusers, and warm masonry balcãos.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Oyster Shell Carepas Windows',
                    desc: 'Hand-cut windowpane oyster shells (Placuna placenta) that soften tropical glare into soothing pearlescent ambient light.'
                  },
                  {
                    title: 'The Balcão Verandah',
                    desc: 'Communal masonry seats outside the front door where families gather at sunset to converse and enjoy the sea breeze.'
                  },
                  {
                    title: 'Vibrant Ochre Mineral Stucco',
                    desc: 'Natural laterite earth pigments that resist monsoon rain and maintain comfortable interior ambient coolness.'
                  },
                  {
                    title: 'Mangalore Terracotta Tiles',
                    desc: 'Steeply pitched clay tile roofs channeling heavy monsoons away while insulating double-height ceiling pavilions.'
                  }
                ].map((feature, fIdx) => (
                  <div key={fIdx} className="p-5 bg-white border border-[#cfe0ee] rounded-2xl shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#044F92]" />
                      <h4 className="font-display text-base text-[#1a1a1a]">{feature.title}</h4>
                    </div>
                    <p className="text-xs text-[#5a554e] leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 5: CONNECTIVITY, GROWTH & PRIME INVESTMENT
          ========================================================================= */}
      <section
        id="section-investment"
        className="relative py-28 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#faf7f2] to-[#f2f7fc] border-b border-[#cfe0ee] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <ScrollReveal variant="from-left" distance={30}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#eef5fb] border border-[#cfe0ee] rounded-full text-[#044F92] text-xs font-semibold uppercase tracking-[0.2em]">
                <TrendingUp className="w-3.5 h-3.5 text-[#044F92]" />
                <span>Infrastructure & High Yields</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1a1a] tracking-tight">
                Strategic Growth & <br />
                <span className="text-[#044F92] font-serif italic">High Rental ROI</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-base sm:text-lg text-[#5a554e] font-light leading-relaxed">
                Fueled by Manohar International Airport (MOPA) and expanded 4-lane expressways, offering 12-15% vacation rental yields — vastly outperforming metropolitan residential markets.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center perspective-1000">
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative w-full max-w-lg aspect-square p-6 bg-white rounded-3xl border border-[#cfe0ee] shadow-2xl flex items-center justify-center preserve-3d overflow-hidden"
              >
                <div className="absolute inset-0 editorial-grid opacity-30 pointer-events-none" />

                <svg viewBox="0 0 500 500" className="w-full h-full filter drop-shadow-xl">
                  <defs>
                    <linearGradient id="highwayGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#044F92" />
                      <stop offset="40%" stopColor="#0284c7" />
                      <stop offset="80%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#e0f2fe" />
                    </linearGradient>
                    <linearGradient id="jetChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                  </defs>

                  <polygon points="50,380 250,470 450,380 250,290" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />

                  <path
                    d="M 60 420 C 180 320, 100 220, 240 180 C 340 150, 360 80, 420 40"
                    fill="none"
                    stroke="url(#highwayGrad)"
                    strokeWidth="38"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 60 420 C 180 320, 100 220, 240 180 C 340 150, 360 80, 420 40"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeDasharray="14 10"
                    strokeLinecap="round"
                    className="animate-shimmer"
                  />

                  <circle cx="420" cy="40" r="18" fill="#044F92" stroke="#ffffff" strokeWidth="3" />
                  <text x="420" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    MOPA
                  </text>

                  <circle cx="240" cy="180" r="14" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
                  <text x="240" y="210" fill="#044F92" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    Assagao (28 Min)
                  </text>

                  <circle cx="60" cy="420" r="16" fill="#044F92" stroke="#ffffff" strokeWidth="3" />
                  <text x="70" y="450" fill="#044F92" fontSize="11" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">
                    Panaji Capital
                  </text>

                  <g transform="translate(320, 90) rotate(22)">
                    <path
                      d="M 0 -35 C 10 -35, 12 35, 0 45 C -12 35, -10 -35, 0 -35 Z"
                      fill="url(#jetChrome)"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    <polygon points="0,-5 85,25 75,32 0,10 -75,32 -85,25" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                    <polygon points="0,32 30,48 24,52 0,42 -24,52 -30,48" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                    <polygon points="0,25 0,46 -4,44 -2,25" fill="#044F92" />
                    <ellipse cx="28" cy="14" rx="4" ry="10" fill="#334155" />
                    <ellipse cx="-28" cy="14" rx="4" ry="10" fill="#334155" />
                    <path d="M -5 -25 Q 0 -30 5 -25 Z" fill="#0284c7" />
                  </g>
                </svg>

                <div className="absolute top-4 left-4 bg-[#044F92] text-white px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider shadow-md">
                  Manohar Int'l Airport (MOPA) Active
                </div>
                <div className="absolute bottom-4 right-4 bg-white border border-[#cfe0ee] text-[#1a1a1a] px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>4-Lane Expressway Corridor</span>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 bg-white border border-[#cfe0ee] rounded-2xl shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#e5e1da] pb-4">
                  <div>
                    <h3 className="font-display text-2xl text-[#1a1a1a]">Vacation Rental ROI Engine</h3>
                    <p className="text-xs text-[#8c857d] mt-0.5">Simulate annual yields based on Goa's high-demand tourist influx</p>
                  </div>
                  <div className="px-3 py-1 bg-[#eef5fb] text-[#044F92] font-mono text-xs font-bold border border-[#cfe0ee] rounded-full">
                    12% - 15% ROI
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#5a554e]">Villa Capital Value</span>
                    <span className="font-mono text-base font-bold text-[#044F92]">₹{investmentAmount.toFixed(1)} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="18"
                    step="0.5"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#cfe0ee] rounded-lg appearance-none cursor-pointer accent-[#044F92]"
                  />
                  <div className="flex justify-between text-[10px] text-[#8c857d] font-mono">
                    <span>₹4.0 Cr (Boutique Villa)</span>
                    <span>₹18.0 Cr (Ultra-Luxury Estate)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#5a554e]">Peak & Mid-Season Occupancy</span>
                    <span className="font-mono text-base font-bold text-[#044F92]">{projectedOccupancy}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="85"
                    step="1"
                    value={projectedOccupancy}
                    onChange={(e) => setProjectedOccupancy(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#cfe0ee] rounded-lg appearance-none cursor-pointer accent-[#044F92]"
                  />
                  <div className="flex justify-between text-[10px] text-[#8c857d] font-mono">
                    <span>50% (Conservative)</span>
                    <span>85% (Prime Assagao Peak)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-[#f2f7fc] border border-[#cfe0ee] rounded-xl">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#8c857d]">Est. Annual Rental Payout</p>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-[#044F92] mt-1">₹{annualRentalIncome}</p>
                    <p className="text-[10px] text-emerald-700 font-medium mt-0.5">~{calculatedRentalYield}% Net Annual Yield</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#8c857d]">Avg. Nightly Tariff</p>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-[#1a1a1a] mt-1">₹{estimatedNightlyTariff.toLocaleString('en-IN')}</p>
                    <p className="text-[10px] text-[#8c857d] mt-0.5">Managed by Luxury Concierge</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white border border-[#e5e1da] rounded-lg">
                    <p className="font-mono font-bold text-[#044F92]">3.2x</p>
                    <p className="text-[10px] text-[#8c857d]">Yield vs Mumbai/Delhi</p>
                  </div>
                  <div className="p-2.5 bg-white border border-[#e5e1da] rounded-lg">
                    <p className="font-mono font-bold text-emerald-700">14%</p>
                    <p className="text-[10px] text-[#8c857d]">Avg 5-Yr CAGR</p>
                  </div>
                  <div className="p-2.5 bg-white border border-[#e5e1da] rounded-lg">
                    <p className="font-mono font-bold text-[#044F92]">100%</p>
                    <p className="text-[10px] text-[#8c857d]">Goa RERA Approved</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleTour}
                    className="flex-1 py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md text-center cursor-pointer"
                  >
                    Schedule Chauffeured Tour
                  </button>
                  <button
                    onClick={() => navigate('projects', { filterStatus: 'ongoing' })}
                    className="flex-1 py-3.5 bg-white border border-[#044F92] text-[#044F92] hover:bg-[#eef5fb] text-xs font-semibold uppercase tracking-widest transition-all text-center cursor-pointer"
                  >
                    View Ongoing Estates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL FOR SACRED HERITAGE SITE */}
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

      {/* VIP Discovery Finale Banner */}
      <section className="py-20 px-6 sm:px-8 bg-[#044F92] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-blue-200">
            Curated by Kamat Realty Developers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal">
            Ready to Claim Your Sanctuary in Goa?
          </h2>
          <p className="text-sm sm:text-base text-blue-100/90 max-w-xl mx-auto font-light leading-relaxed">
            Allow our dedicated concierge to arrange an exclusive private preview of our coastal estates, with chauffeured transit from MOPA or Dabolim airport.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleTour}
              className="px-8 py-3.5 bg-white text-[#044F92] hover:bg-blue-50 text-xs font-semibold uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl cursor-pointer"
            >
              Book Private Chauffeured Visit
            </button>
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-3.5 bg-transparent border border-white/60 text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
            >
              Contact Goa Headquarters
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
