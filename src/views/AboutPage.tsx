'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import {
  Award, ShieldCheck, Compass, Users, CheckCircle2, Building2,
  Sparkles, ArrowRight, Quote, FileCheck, Clock, Layers,
  HeartHandshake, Check, Zap, ChevronDown
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
  onOpenTourModal?: () => void;
}

interface KeyFocusItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  stat: string;
}

interface CleanMilestone {
  id: string;
  year: string;
  badge: string;
  title: string;
  tagline: string;
  desc: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenTourModal
}) => {
  const router = useRouter();
  const tourModalContext = useTourModal();
  const pinnedSectionRef = useRef<HTMLDivElement>(null);

  const [activeFocusIndex, setActiveFocusIndex] = useState<number>(0);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState<number>(0);

  // Clean Milestone Data (Strictly: Year, Badge, Title, Tagline, Description)
  const milestones: CleanMilestone[] = [
    {
      id: 'm-1994',
      year: '1994',
      badge: 'Foundation & Integrity',
      title: 'The Genesis of Architectural Permanence',
      tagline: 'Zero-litigation legal covenant established in Panaji',
      desc: 'Founded by Er. Rajesh Kamat with an unyielding mandate: 100% single-owner clear titles, zero ancestral encumbrances, and concrete engineered for a hundred-year lifecycle against tropical coastal monsoons.'
    },
    {
      id: 'm-2005',
      year: '2005',
      badge: 'Coastal Horizon',
      title: 'Miramar Oceanfront Skyline Landmark',
      tagline: 'First acoustic & thermal glazed residences on the Arabian sea shoreline',
      desc: 'Delivered landmark sea-facing penthouses and commercial headquarters. Pioneered German soundproof Schuco glazing and multi-tier sub-basement waterproofing along the Mandovi estuary.'
    },
    {
      id: 'm-2014',
      year: '2014',
      badge: 'Commercial Excellence',
      title: 'Grade-A Corporate & Retail Hubs',
      tagline: 'Setting business infrastructure benchmarks across North Goa',
      desc: 'Engineered high-street retail destinations and corporate office addresses in Mapusa and Panaji with automated multi-tier parking, central HVAC grids, and dedicated dual-power transformer substations.'
    },
    {
      id: 'm-2019',
      year: '2019',
      badge: 'Private Pool Estates',
      title: 'Boutique Forest & Riverfront Enclaves',
      tagline: 'Artisanal Portuguese heritage estates with private heated plunge pools',
      desc: 'Expanded into ultra-luxury low-density villa sanctuaries in Assagao, Candolim, and Siolim. Integrated double-height teakwood ceilings, laterite stone masonry, and private infinity saltwater pools.'
    },
    {
      id: 'm-2023',
      year: '2023',
      badge: 'Green Innovation',
      title: 'Eco-Sustainable Biophilic Masterplans',
      tagline: '70% open green spaces, solar micro-grids & rainwater aquifers',
      desc: 'Achieved IGBC Gold pre-certification standards across new residential communities. Deployed solar thermal grids, vehicle-free elevated podiums, and native Goan bio-retention landscaping.'
    },
    {
      id: 'm-2026',
      year: '2026+',
      badge: 'The Next Generation',
      title: 'Next-Gen Mixed-Use Landmarks Portfolio',
      tagline: 'Kamat Crest, Kamat Prime, Kamat Promenade, Kamat Vista & Signature Villas',
      desc: 'Delivering an extraordinary portfolio of dual-category mixed-use residences, corporate suites, and waterfront mansions with IoT smart home automation, VIP butler services, and private yacht jetty access.'
    }
  ];

  // Pinned Vertical Scroll Progress
  const { scrollYProgress } = useScroll({
    target: pinnedSectionRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const progressPercentage = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Update active milestone based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map 0 -> 1 to 0 -> (milestones.length - 1)
      const count = milestones.length;
      const index = Math.min(count - 1, Math.max(0, Math.floor(latest * count)));
      setCurrentMilestoneIndex(index);
    });

    return () => unsubscribe();
  }, [scrollYProgress, milestones.length]);

  const activeMilestone = milestones[currentMilestoneIndex] || milestones[0];

  const handleTour = () => {
    if (onOpenTourModal) {
      onOpenTourModal();
    } else {
      tourModalContext.openTourModal();
    }
  };

  const navigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      router.push(page === 'home' ? '/' : `/${page}`);
    }
  };

  // 6 Key Focus Pillars (matching customer diagram)
  const keyFocusItems: KeyFocusItem[] = [
    {
      id: 'quality',
      title: 'Quality & Durability',
      subtitle: 'Corrosion-Proof Coastal Engineering',
      desc: 'High-grade TMT steel, multi-coat crystalline waterproofing, and saline-resistant concrete engineered to endure Goa monsoons for 100+ years.',
      icon: <Award className="w-5 h-5 text-white" />,
      stat: '100% Anti-Saline'
    },
    {
      id: 'cleartitle',
      title: 'Clear Title',
      subtitle: 'Zero Legal Compromises',
      desc: 'Every plot is vetted through a rigorous 30-year ancestral title search with verified single-owner deeds, RERA compliance, and transparent documentation.',
      icon: <FileCheck className="w-5 h-5 text-white" />,
      stat: '30-Yr Vetted'
    },
    {
      id: 'facade',
      title: 'Façade & Elevation',
      subtitle: 'Signature Architectural Presence',
      desc: 'A fusion of classical Indo-Portuguese aesthetics with contemporary glass curtains, laterite masonry, and elegant double-height porches.',
      icon: <Building2 className="w-5 h-5 text-white" />,
      stat: 'Artisanal Elevations'
    },
    {
      id: 'layout',
      title: 'Design & Layout',
      subtitle: 'Biophilic Spatial Optimization',
      desc: 'Maximized natural cross-ventilation, abundant sunlight corridors, private garden sanctuaries, and zero-dead-space interior layouts.',
      icon: <Layers className="w-5 h-5 text-white" />,
      stat: 'Zero Wasted Sq.Ft'
    },
    {
      id: 'delivery',
      title: 'Timely Delivery',
      subtitle: 'On-Schedule Track Record',
      desc: 'Decades of 100% on-time project completion backed by milestone-driven execution, dedicated procurement grids, and scheduled possession.',
      icon: <Clock className="w-5 h-5 text-white" />,
      stat: '32 Yrs On-Time'
    },
    {
      id: 'service',
      title: 'After Sales Service',
      subtitle: 'Dedicated Homeowner Care',
      desc: 'Lifetime structural warranty support, in-house facility management, rental assistance desk, and prompt proactive customer service.',
      icon: <HeartHandshake className="w-5 h-5 text-white" />,
      stat: '24/7 Concierge Care'
    }
  ];

  return (
    <div className="pt-24 pb-28 bg-[#fdfcfb]">
      {/* Header Banner */}
      <div className="bg-[#044F92] text-white py-16 sm:py-20 px-6 sm:px-8 lg:px-10 border-b border-[#03396c] relative overflow-hidden">
        {/* Subtle geometric background overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <ScrollReveal variant="from-left" distance={40}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] uppercase tracking-[0.25em]">
              <Sparkles className="w-3 h-3 text-blue-200" />
              <span>32 Years of Architectural Integrity in Goa</span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={50} delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              Heritage, Vision & Distinction
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="from-left" distance={40} delay={0.2}>
            <p className="text-blue-100 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Founded on unshakeable engineering standards and transparent legal titles, Kamat Realty is Goa's benchmark for bespoke residences, private pool villas, and commercial landmarks.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 mt-16 space-y-28">

        {/* 1. Core Founding Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal variant="from-left" distance={40}>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold border-b border-[#044F92]/40 pb-1 inline-block">
                Founding Philosophy
              </span>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={50} delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] leading-tight">
                Where Engineering Rigor Meets Coastal Soul
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-sm text-[#4a4540] font-light leading-relaxed">
                In a coastal paradise where tropical monsoons and high salinity test building longevity, Kamat Realty was established on the non-negotiable foundation of structural permanence. Every foundation, pillar, and waterproofing layer is calculated to preserve beauty for generations.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.25}>
              <p className="text-sm text-[#4a4540] font-light leading-relaxed">
                We do not build mass developments. Each Kamat project is an exclusive, limited-edition sanctuary crafted for discerning homeowners who prioritize legal peace of mind, thoughtful ergonomics, and enduring capital appreciation.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="from-left" delay={0.3} className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('projects')}
                className="px-6 py-3 bg-[#044F92] text-white hover:bg-[#03396c] text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explore Developments</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleTour}
                className="px-6 py-3 bg-white border border-[#044F92] text-[#044F92] hover:bg-[#f2f7fc] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
              >
                Schedule VIP Consultation
              </button>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 relative">
            <ScrollReveal variant="from-behind" distance={30}>
              <div className="aspect-[4/3] bg-[#f4f1ee] border border-[#cfe0ee] p-2 shadow-2xl overflow-hidden group">
                <img
                  src="reception_desk.webp"
                  alt="Kamat Architectural Legacy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 2. MESSAGE FROM PARTNER - MR. ROHAN R. KAMAT */}
        <ScrollReveal variant="from-behind" distance={40}>
          <div className="relative bg-white border border-[#cfe0ee] shadow-2xl overflow-hidden p-8 sm:p-12 lg:p-16">
            {/* Ambient luxury gradient accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#044F92]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50/50 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">

              {/* Partner Portrait Column */}
              <div className="lg:col-span-5 flex flex-col items-center text-center sm:text-left sm:items-start">
                <div className="relative w-full max-w-sm aspect-square bg-[#f2f7fc] border-2 border-[#044F92]/30 p-2 shadow-xl overflow-hidden group">
                  <img
                    src="/team/rohan-kamat.jpg"
                    alt="Mr. Rohan R. Kamat - Partner, Kamat Realty"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  {/* Floating luxury badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 border border-[#cfe0ee] shadow-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-[#1a1a1a] text-sm">Mr. Rohan R. Kamat</h4>
                      <p className="text-[10px] text-[#044F92] font-semibold uppercase tracking-widest">Partner, Kamat Realty</p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-[#044F92]" />
                  </div>
                </div>

                {/* Quick Credentials Pills */}
                <div className="flex flex-wrap gap-2 mt-5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#f2f7fc] text-[#044F92] border border-[#cfe0ee]">
                    Engineering Precision
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#f2f7fc] text-[#044F92] border border-[#cfe0ee]">
                    Generational Legacy
                  </span>
                </div>
              </div>

              {/* Message Content Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#044F92] font-bold">
                    <Quote className="w-4 h-4 text-[#044F92]" />
                    <span>Leadership Perspective</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] leading-tight">
                    "Every home we construct is built as though our own family would inhabit it for a century."
                  </h2>
                </div>

                <div className="space-y-4 text-sm text-[#4a4540] font-light leading-relaxed border-l-2 border-[#044F92] pl-5">
                  <p>
                    "When our clients invest in Goa, they are not merely purchasing square footage — they are entrusting us with their aspirations of peace, legacy, and family heritage. That responsibility guides every architectural blueprint, vendor partnership, and legal verification we undertake."
                  </p>
                  <p>
                    "Our vision at Kamat Realty bridges Goa’s timeless architectural soul with cutting-edge sustainable engineering: from solar integration and smart home automation to uncompromised coastal waterproofing. We promise transparent, single-owner clear titles and on-time possession without exceptions."
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#e5e1da]">
                  <div>
                    <p className="font-display text-lg font-bold text-[#1a1a1a]">Rohan R. Kamat</p>
                    <p className="text-xs text-[#8c857d]">Partner & Chief Strategy Officer, Kamat Realty</p>
                  </div>
                  <div className="px-4 py-1.5 bg-[#f2f7fc] border border-[#cfe0ee] text-[#044F92] text-xs font-semibold uppercase tracking-widest">
                    Goa Built • Since 1994
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* 3. KEY FOCUS ORBITAL PILLARS (Customer Diagram) */}
        <div className="space-y-12 border-t border-[#e5e1da] pt-16">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#044F92] font-bold">
                Core Value System
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1a1a1a]">
                Our 6 Pillars of Key Focus
              </h2>
              <p className="text-xs text-[#8c857d]">
                The non-negotiable standards powering every Kamat residence, villa, and commercial landmark.
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Circular Wheel Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Interactive Orbital Wheel */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-8 kamat-orbit-container">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center">

                {/* Rotating Orbital Track & 6 Satellites */}
                <div className="absolute inset-0 flex items-center justify-center kamat-orbit-wheel">
                  
                  {/* Outer Orbital Ring Line */}
                  <div className="absolute inset-4 sm:inset-6 rounded-full border-2 border-[#cfe0ee] shadow-inner pointer-events-none" />
                  <div className="absolute inset-8 sm:inset-10 rounded-full border border-dashed border-[#044F92]/20 pointer-events-none" />

                  {/* 6 Circular Nodes Positioned Around the Rotating Ring */}
                  {keyFocusItems.map((item, idx) => {
                    const angle = (idx * 60 - 90) * (Math.PI / 180);
                    const radius = 145; // pixel offset from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const isActive = activeFocusIndex === idx;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveFocusIndex(idx)}
                        onMouseEnter={() => setActiveFocusIndex(idx)}
                        style={{
                          transform: `translate(${x}px, ${y}px)`
                        }}
                        className={`absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center p-2 text-center transition-transform duration-300 z-20 cursor-pointer shadow-lg ${
                          isActive
                            ? 'bg-[#044F92] text-white ring-4 ring-blue-200 scale-110 shadow-2xl'
                            : 'bg-[#044F92] text-white hover:scale-105 hover:bg-[#03396c]'
                        }`}
                        aria-label={item.title}
                      >
                        {/* Synchronously Counter-Rotated Content (Keeps Text & Icons Upright) */}
                        <div className="kamat-orbit-satellite-content flex flex-col items-center justify-center w-full h-full pointer-events-none">
                          <div className="mb-1">{item.icon}</div>
                          <span className="text-[9px] sm:text-[10px] font-bold leading-tight line-clamp-2 px-1">
                            {item.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Stationary Central Hub Button (Does NOT rotate) */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white border-2 border-[#044F92] shadow-xl flex flex-col items-center justify-center text-center p-3 z-30 pointer-events-none">
                  <span className="text-[9px] uppercase tracking-widest text-[#8c857d] font-semibold">Kamat Realty</span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#044F92] tracking-wider mt-0.5">
                    KEY FOCUS
                  </h3>
                  <span className="w-6 h-0.5 bg-[#044F92] mt-1.5" />
                </div>

              </div>

              {/* Orbital Interaction Micro-Hint */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#8c857d] mt-3 font-light">
                <Sparkles className="w-3 h-3 text-[#044F92]" />
                <span>Live orbital rotation • Hover to pause & click to inspect</span>
              </div>
            </div>

            {/* Active Pillar Detail Box */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={keyFocusItems[activeFocusIndex].id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-2 border-[#044F92] p-8 shadow-xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#044F92] font-bold px-3 py-1 bg-[#f2f7fc] border border-[#cfe0ee]">
                      Pillar 0{activeFocusIndex + 1} of 06
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                      {keyFocusItems[activeFocusIndex].stat}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
                    {keyFocusItems[activeFocusIndex].title}
                  </h3>

                  <p className="text-xs text-[#044F92] font-semibold uppercase tracking-wider">
                    {keyFocusItems[activeFocusIndex].subtitle}
                  </p>

                  <p className="text-sm text-[#4a4540] font-light leading-relaxed">
                    {keyFocusItems[activeFocusIndex].desc}
                  </p>

                  <div className="pt-4 border-t border-[#e5e1da] flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#044F92]" />
                    <span className="text-xs text-[#1a1a1a] font-medium">Standard across all Kamat properties</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>

      {/* 4. PINNED CINEMATIC MILESTONE EXPERIENCE (Sticky Container) */}
      <div
        ref={pinnedSectionRef}
        className="relative h-[420vh] mt-28 border-t border-[#e5e1da]"
      >
        {/* Sticky Viewport Stage */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#032d54] text-white px-6 sm:px-12 lg:px-20 py-10 sm:py-16">

          {/* Subtle Ambient Glows & Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00a8ff]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Top Header & Interactive Milestone Scrubber */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-blue-200 font-bold mb-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Scroll-Driven Chronology • 32-Year Legacy</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-light text-white">
                Chronology of Distinction
              </h2>
            </div>

            {/* Glowing Progress Timeline Line */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                {milestones.map((m, i) => (
                  <div
                    key={m.id}
                    className={`h-1.5 transition-all duration-500 rounded-full ${currentMilestoneIndex === i
                      ? 'w-10 bg-cyan-400 shadow-[0_0_12px_#00e5ff]'
                      : currentMilestoneIndex > i
                        ? 'w-4 bg-white/60'
                        : 'w-4 bg-white/20'
                      }`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-cyan-300 font-bold tracking-widest pl-2">
                0{currentMilestoneIndex + 1} / 0{milestones.length}
              </span>
            </div>
          </div>

          {/* Center Stage: Cinematic Floating Milestone Reveal */}
          <div className="relative z-10 my-auto max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Left Column: Massive Floating Cinematic Year */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.year}
                  initial={{ opacity: 0, y: 70, scale: 0.85, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -70, scale: 1.12, filter: 'blur(12px)' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative select-none"
                >
                  <span className="font-display text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-400 drop-shadow-[0_10px_35px_rgba(0,168,255,0.35)] block">
                    {activeMilestone.year}
                  </span>
                  <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-transparent mt-2 mx-auto lg:mx-0 shadow-[0_0_10px_#00e5ff]" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Clean Cinematic Text Presentation (Year, Badge, Title, Tagline, Description) */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.id}
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  {/* Badge */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                      {activeMilestone.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                    {activeMilestone.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm sm:text-base text-cyan-200 font-medium font-secondary tracking-wide">
                    {activeMilestone.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-blue-100/90 font-light leading-relaxed max-w-2xl border-l-2 border-cyan-400/50 pl-4 lg:pl-5 text-left mx-auto lg:mx-0">
                    {activeMilestone.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Bottom Footer & Progress Line */}
          <div className="relative z-10 border-t border-white/15 pt-4 flex items-center justify-between text-xs text-blue-200/70">
            <span className="font-mono text-[11px] tracking-wider uppercase">
              1994 • Panaji Foundation
            </span>

            {/* Glowing bottom progress trace */}
            <div className="w-1/3 sm:w-1/2 h-1 bg-white/15 rounded-full overflow-hidden mx-4">
              <motion.div
                style={{ width: progressPercentage }}
                className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-white shadow-[0_0_10px_#00e5ff]"
              />
            </div>

            <span className="font-mono text-[11px] tracking-wider uppercase">
              2026+ • Next-Gen
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
