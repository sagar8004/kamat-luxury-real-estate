'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
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
  Flame
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTourModal } from '../context/TourModalContext';

interface ExploreGoaPageProps {
  onNavigate?: (page: string, params?: { propertyId?: string; filterStatus?: string }) => void;
  onOpenTourModal?: () => void;
}

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

  // Section 1 State: City vs Susegad Lifestyle Toggle
  const [lifestyleMode, setLifestyleMode] = useState<'susegad' | 'city'>('susegad');

  // Section 2 State: Food Thali Hotspot Active Item
  const [activeDish, setActiveDish] = useState<number>(0);

  // Section 3 State: North vs South Goa Coastline
  const [activeCoast, setActiveCoast] = useState<'north' | 'south'>('north');

  // Section 4 State: Heritage Architectural Feature Hotspot
  const [activeArchFeature, setActiveArchFeature] = useState<number>(0);

  // Section 5 State: ROI Calculator Investment Value (in Crores)
  const [investmentAmount, setInvestmentAmount] = useState<number>(6.5);
  const [projectedOccupancy, setProjectedOccupancy] = useState<number>(68);

  // 3D Parallax Mouse Tracking on Floating Assets
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(smoothMouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  // Ambient Coastal Audio Synth (zero external dependency, soothing ocean white-noise waves)
  const toggleAmbientSound = () => {
    if (soundPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.suspend();
      }
      setSoundPlaying(false);
    } else {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Pink/Ocean noise buffer
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.04; // Gentle volume
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          // Lowpass filter for ocean wave warmth
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          // LFO for wave swells
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // Wave swell every 8 seconds
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

  // Observe active section on scroll
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
        audioCtxRef.current.close().catch(() => {});
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

  // Calculation for Rental ROI
  const calculatedRentalYield = (13.4).toFixed(1); // 12-15% range
  const annualRentalIncome = ((investmentAmount * 10000000 * 0.134)).toLocaleString('en-IN', {
    maximumFractionDigits: 0
  });
  const estimatedNightlyTariff = Math.round((investmentAmount * 10000000 * 0.134) / (365 * (projectedOccupancy / 100)));

  return (
    <div
      className="min-h-screen bg-[#fdfcfb] text-[#1a1a1a] selection:bg-[#044F92] selection:text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-10 bg-[radial-gradient(#044F92_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Sticky Chapter Scroller & Coastal Ambient Audio Controller */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#02182c]/90 backdrop-blur-xl border border-white/20 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 sm:gap-6 text-xs transition-all max-w-[95vw] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0 border-r border-white/20 pr-3 sm:pr-4">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-blue-200 hidden sm:inline">Goa Odyssey</span>
        </div>

        {/* 5 Chapters Navigation Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { label: '01 Susegad', id: 'section-hero' },
            { label: '02 Culinary', id: 'section-food' },
            { label: '03 Coastline', id: 'section-beaches' },
            { label: '04 Heritage', id: 'section-heritage' },
            { label: '05 Yield & ROI', id: 'section-investment' }
          ].map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => scrollToSection(chap.id)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-medium transition-all tracking-wide whitespace-nowrap cursor-pointer ${
                activeSection === idx
                  ? 'bg-[#044F92] text-white shadow-md font-semibold border border-[#38bdf8]/50'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {chap.label}
            </button>
          ))}
        </div>

        {/* Ambient Ocean Audio Button */}
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
          CHAPTER 1: HERO INTRO - THE GOAN LIFESTYLE & SUSEGAD HOOK
          ========================================================================= */}
      <section
        id="section-hero"
        className="relative min-h-[92vh] pt-32 pb-24 px-6 sm:px-8 lg:px-12 flex items-center border-b border-[#e5e1da] overflow-hidden"
      >
        {/* Soft Ambient Light Gradient */}
        <div className="absolute top-0 right-0 w-3/5 h-4/5 bg-gradient-to-bl from-[#eef5fb] via-[#f7fafc] to-transparent -z-10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#fff7ed] rounded-full filter blur-3xl -z-10 opacity-70" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Narrative */}
          <div className="lg:col-span-7 space-y-7 z-20">
            <ScrollReveal variant="from-left" distance={30}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f2f7fc] border border-[#cfe0ee] rounded-full text-[#044F92] text-xs font-semibold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-[#044F92]" />
                <span>Where Heritage Meets High Returns</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#1a1a1a] tracking-tight leading-[1.08]">
                Experience the <br />
                <span className="text-[#044F92] italic font-serif">Susegad Philosophy</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-base sm:text-lg text-[#5a554e] font-light leading-relaxed max-w-xl">
                Shift from chaotic city life to serene coastal living, private sundecks, and scenic emerald paddy fields. In Goa, time slows down not because life is lazy, but because life is savoured.
              </p>
            </ScrollReveal>

            {/* Interactive Lifestyle Switcher: Urban Chaos vs Susegad Living */}
            <ScrollReveal variant="from-bottom" distance={30} delay={0.3}>
              <div className="p-5 sm:p-6 bg-white border border-[#cfe0ee] rounded-2xl shadow-xl space-y-4 max-w-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#044F92]" />
                    <span className="text-xs uppercase tracking-wider font-bold text-[#1a1a1a]">Lifestyle Contrast Mode</span>
                  </div>
                  <div className="inline-flex p-1 bg-[#f4f1ee] rounded-full text-xs">
                    <button
                      onClick={() => setLifestyleMode('susegad')}
                      className={`px-3 py-1 rounded-full font-medium transition-all ${
                        lifestyleMode === 'susegad'
                          ? 'bg-[#044F92] text-white shadow-sm font-semibold'
                          : 'text-[#5a554e] hover:text-[#1a1a1a]'
                      }`}
                    >
                      Goan Susegad
                    </button>
                    <button
                      onClick={() => setLifestyleMode('city')}
                      className={`px-3 py-1 rounded-full font-medium transition-all ${
                        lifestyleMode === 'city'
                          ? 'bg-[#8c3520] text-white shadow-sm font-semibold'
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
                      <p className="font-mono text-xl font-bold text-[#044F92]">0 Min</p>
                      <p className="text-[11px] text-[#5a554e] mt-0.5">Commute Stress</p>
                    </div>
                    <div className="p-3 bg-[#fef9ee] rounded-xl border border-amber-100">
                      <p className="font-mono text-xl font-bold text-amber-700">300+</p>
                      <p className="text-[11px] text-[#5a554e] mt-0.5">Sunny Horizons</p>
                    </div>
                    <div className="p-3 bg-[#f2fcf5] rounded-xl border border-emerald-100">
                      <p className="font-mono text-xl font-bold text-emerald-700">100%</p>
                      <p className="text-[11px] text-[#5a554e] mt-0.5">Mental Clarity</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 pt-2 text-center opacity-80">
                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                      <p className="font-mono text-xl font-bold text-red-700">2.5 Hrs</p>
                      <p className="text-[11px] text-red-900/80 mt-0.5">Daily Traffic Jam</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                      <p className="font-mono text-xl font-bold text-gray-700">380 AQI</p>
                      <p className="text-[11px] text-gray-600 mt-0.5">Smog & Concrete</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="font-mono text-xl font-bold text-amber-800">High</p>
                      <p className="text-[11px] text-amber-900/80 mt-0.5">Corporate Fatigue</p>
                    </div>
                  </div>
                )}

                <p className="text-xs text-[#8c857d] italic">
                  {lifestyleMode === 'susegad'
                    ? '“Susegad isn’t indolence; it is the fine art of living contentment in the presence of sea breeze and old trees.”'
                    : 'Break free from the concrete grind. Kamat Realty crafts sanctuaries that restore work-life harmony.'}
                </p>
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="from-bottom" distance={30} delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleTour}
                  className="px-7 py-3.5 bg-[#044F92] hover:bg-[#03396c] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer rounded-none"
                >
                  <span>Book Susegad Discovery Tour</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('section-food')}
                  className="px-6 py-3.5 bg-transparent border border-[#044F92] text-[#044F92] hover:bg-[#eef5fb] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
                >
                  Explore The Journey ↓
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3D Floating Asset - Ceramic Shell & Luxury Villa Key */}
          <div className="lg:col-span-5 flex justify-center items-center perspective-1000">
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center preserve-3d"
            >
              {/* Glassmorphic 3D Card Platform */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#044F92]/10 via-white/80 to-[#cfe0ee]/40 rounded-3xl border border-white/80 shadow-[0_25px_60px_-15px_rgba(4,79,146,0.18)] backdrop-blur-xl -rotate-2 transform transition-transform" />

              {/* Background Paddy Field & Pool Terrace Imagery */}
              <div className="absolute inset-4 rounded-2xl overflow-hidden border border-white/60 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1000&q=80"
                  alt="Goan Coastal Villa & Private Sundeck"
                  className="w-full h-full object-cover brightness-95 transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02182c]/80 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="inline-block px-2 py-0.5 bg-[#044F92] text-[9px] uppercase tracking-widest font-bold">
                    Assagao Valley Villa
                  </div>
                  <p className="font-display text-lg">Private Sundecks Overlooking Emerald Paddy Fields</p>
                </div>
              </div>

              {/* FLOATING 3D ASSET 1: Floating Goan Ceramic Shell */}
              <motion.div
                animate={{
                  y: [-12, 14, -12],
                  rotateZ: [-2, 3, -2]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut'
                }}
                className="absolute -top-6 -right-6 z-30 w-36 h-36 drop-shadow-[0_20px_30px_rgba(4,79,146,0.35)] cursor-pointer"
                title="Goan Handcrafted Ceramic Shell"
              >
                {/* 3D Ceramic Conch / Shell SVG with Specular Glaze */}
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
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Outer Spiral Shell */}
                  <path
                    d="M 60 15 C 85 15, 105 35, 105 60 C 105 85, 85 105, 55 105 C 30 105, 15 90, 18 68 C 20 48, 38 35, 55 35 C 72 35, 82 48, 80 62 C 78 74, 68 82, 58 80 C 50 78, 46 72, 48 65 C 50 60, 56 58, 60 62"
                    fill="url(#shellGlaze)"
                    stroke="url(#goldRim)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Internal Ridge Spirals */}
                  <path
                    d="M 60 18 Q 80 40 85 62"
                    stroke="#ffffff"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M 45 28 Q 65 50 70 75"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.6"
                  />
                  {/* Lustre Sparkle */}
                  <circle cx="48" cy="38" r="4" fill="#ffffff" filter="url(#glow)" />
                  <circle cx="82" cy="48" r="2.5" fill="#ffffff" />
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
                  {/* Ornate Key Bow / Head */}
                  <circle cx="35" cy="45" r="22" fill="none" stroke="url(#brassKey)" strokeWidth="6" />
                  <circle cx="35" cy="45" r="11" fill="none" stroke="url(#brassKey)" strokeWidth="3" />
                  {/* Portuguese Trefoil Flourish */}
                  <circle cx="35" cy="23" r="5" fill="url(#brassKey)" />
                  <circle cx="16" cy="45" r="5" fill="url(#brassKey)" />
                  <circle cx="35" cy="67" r="5" fill="url(#brassKey)" />
                  {/* Key Shaft */}
                  <rect x="54" y="42" width="65" height="6" rx="2" fill="url(#brassKey)" />
                  {/* Key Teeth (Bitting) */}
                  <path
                    d="M 100 48 L 100 66 L 106 66 L 106 48 L 112 48 L 112 60 L 118 60 L 118 48 Z"
                    fill="url(#brassKey)"
                  />
                  {/* Kamat Signature Crest engraving */}
                  <text x="35" y="48" fontSize="8" fontWeight="bold" fill="#664d12" textAnchor="middle" fontFamily="sans-serif">
                    KRW
                  </text>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 2: FOOD & CULINARY CULTURE
          ========================================================================= */}
      <section
        id="section-food"
        className="relative py-28 px-6 sm:px-8 lg:px-12 bg-[#faf7f2] border-b border-[#e5e1da] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
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

          {/* Interactive Thali Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* FLOATING 3D ASSET: Detailed Goan Fish Curry Thali */}
            <div className="lg:col-span-6 flex justify-center perspective-1000">
              <motion.div
                initial={{ opacity: 0, y: -60, x: 50, rotateZ: 45 }}
                whileInView={{ opacity: 1, y: 0, x: 0, rotateZ: 35 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                whileHover={{ rotateZ: 0, scale: 1.04, transition: { duration: 0.4 } }}
                className="relative w-full max-w-lg aspect-square p-6 flex items-center justify-center cursor-pointer preserve-3d"
              >
                {/* 3D Drop Shadow on Floor */}
                <div className="absolute inset-x-8 bottom-4 h-16 bg-black/25 rounded-full filter blur-2xl transform scale-90" />

                {/* STEAM EFFECT OVERLAY: Rising steam wisps */}
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

                {/* THE 3D BRASS THALI PLATTER (Rich Graphic SVG with Food Bowls) */}
                <svg viewBox="0 0 500 500" className="w-full h-full filter drop-shadow-2xl">
                  <defs>
                    <radialGradient id="brassPlatter" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffefbd" />
                      <stop offset="55%" stopColor="#dcb35c" />
                      <stop offset="85%" stopColor="#9c7224" />
                      <stop offset="100%" stopColor="#63440e" />
                    </radialGradient>
                    <radialGradient id="curryGrad" cx="40%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#ff7a38" />
                      <stop offset="60%" stopColor="#c74914" />
                      <stop offset="100%" stopColor="#7a2404" />
                    </radialGradient>
                    <radialGradient id="solkadhiGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#fca5a5" />
                      <stop offset="60%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#881337" />
                    </radialGradient>
                    <radialGradient id="riceGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fffbf5" />
                      <stop offset="70%" stopColor="#f0e5d5" />
                      <stop offset="100%" stopColor="#d6c3aa" />
                    </radialGradient>
                    <linearGradient id="friedFish" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="40%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                    <radialGradient id="bananaLeaf" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="70%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#065f46" />
                    </radialGradient>
                  </defs>

                  {/* Main Circular Brass Thali Plate */}
                  <circle cx="250" cy="250" r="230" fill="url(#brassPlatter)" stroke="#452e06" strokeWidth="6" />
                  <circle cx="250" cy="250" r="215" fill="none" stroke="#ffeaa7" strokeWidth="2" opacity="0.6" />

                  {/* Banana Leaf Base Layer */}
                  <circle cx="250" cy="250" r="200" fill="url(#bananaLeaf)" opacity="0.9" />

                  {/* Leaf veins */}
                  <path d="M 50 250 L 450 250" stroke="#047857" strokeWidth="3" opacity="0.7" />
                  <path d="M 120 180 L 250 250 L 120 320" stroke="#047857" strokeWidth="1.5" opacity="0.5" fill="none" />
                  <path d="M 380 180 L 250 250 L 380 320" stroke="#047857" strokeWidth="1.5" opacity="0.5" fill="none" />

                  {/* Central Steaming Goan Red Rice Dome */}
                  <g onClick={() => setActiveDish(0)} className="cursor-pointer group">
                    <circle cx="250" cy="250" r="80" fill="url(#riceGrad)" stroke="#b59a7a" strokeWidth="3" />
                    {/* Rice Grain Texture */}
                    <circle cx="230" cy="235" r="3" fill="#9c7e5a" opacity="0.6" />
                    <circle cx="260" cy="230" r="2.5" fill="#9c7e5a" opacity="0.6" />
                    <circle cx="245" cy="265" r="3" fill="#9c7e5a" opacity="0.6" />
                    <circle cx="270" cy="255" r="2.5" fill="#9c7e5a" opacity="0.6" />
                    {/* Coriander Garnish on Rice */}
                    <path d="M 248 245 C 242 240, 240 248, 245 250 C 248 252, 255 248, 252 242 Z" fill="#16a34a" />
                  </g>

                  {/* Dish 1: Authentic Goan Kingfish Curry (Kodi) Bowl (Top Right) */}
                  <g onClick={() => setActiveDish(1)} className="cursor-pointer">
                    <circle cx="340" cy="150" r="54" fill="url(#brassPlatter)" stroke="#452e06" strokeWidth="3" />
                    <circle cx="340" cy="150" r="48" fill="url(#curryGrad)" />
                    {/* Floating Coconut Cream & Green Chilly in Curry */}
                    <path d="M 330 140 Q 345 145 342 160" stroke="#fef3c7" strokeWidth="4" fill="none" opacity="0.8" />
                    <path d="M 345 135 L 355 148" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
                  </g>

                  {/* Dish 2: Surmai (Kingfish) Rawa Fry (Bottom Right) */}
                  <g onClick={() => setActiveDish(2)} className="cursor-pointer">
                    <circle cx="350" cy="320" r="52" fill="url(#brassPlatter)" stroke="#452e06" strokeWidth="3" />
                    {/* Rawa Crust Fish Darne Steak */}
                    <ellipse cx="350" cy="320" rx="38" ry="26" fill="url(#friedFish)" transform="rotate(-15 350 320)" />
                    <line x1="330" y1="312" x2="370" y2="312" stroke="#451a03" strokeWidth="2" opacity="0.6" />
                    <line x1="335" y1="324" x2="368" y2="324" stroke="#451a03" strokeWidth="2" opacity="0.6" />
                    {/* Fresh Lemon Wedge */}
                    <path d="M 320 338 A 12 12 0 0 1 336 348 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
                  </g>

                  {/* Dish 3: Pink Kokum Solkadhi (Bottom Left) */}
                  <g onClick={() => setActiveDish(3)} className="cursor-pointer">
                    <circle cx="150" cy="330" r="48" fill="url(#brassPlatter)" stroke="#452e06" strokeWidth="3" />
                    <circle cx="150" cy="330" r="42" fill="url(#solkadhiGrad)" />
                    {/* Coriander & Fresh Garlic Flecks */}
                    <circle cx="145" cy="325" r="2" fill="#15803d" />
                    <circle cx="158" cy="335" r="2.5" fill="#fef08a" />
                  </g>

                  {/* Dish 4: Authentic Freshly Baked Poee / Crusty Bread (Top Left) */}
                  <g onClick={() => setActiveDish(4)} className="cursor-pointer">
                    <circle cx="155" cy="165" r="50" fill="url(#brassPlatter)" stroke="#452e06" strokeWidth="3" />
                    {/* Round Puffed Poee */}
                    <ellipse cx="155" cy="165" rx="42" ry="34" fill="#f5d0a9" stroke="#b45309" strokeWidth="2" />
                    {/* Wheat Bran Specs */}
                    <circle cx="145" cy="160" r="2" fill="#78350f" opacity="0.7" />
                    <circle cx="168" cy="170" r="2" fill="#78350f" opacity="0.7" />
                    <circle cx="160" cy="155" r="1.5" fill="#78350f" opacity="0.7" />
                  </g>
                </svg>

                {/* Floating Hint Tag */}
                <div className="absolute top-4 left-6 bg-[#044F92] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  Interactive 3D Thali (Click to Inspect)
                </div>
              </motion.div>
            </div>

            {/* Right Column: Culinary Hotspot Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              {/* Dish Inspector Card */}
              <div className="p-6 bg-white border border-[#cfe0ee] rounded-2xl shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-[#e5e1da] pb-3">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#044F92] flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#c25e38]" />
                    <span>Coastal Gastronomy Spotlight</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#8c857d]">Item {activeDish + 1} of 5</span>
                </div>

                {[
                  {
                    title: 'Goan Red Rice (Ukda Tandool)',
                    type: 'Foundation Staple',
                    origin: 'Tiswadi & Bardez Paddy Valleys',
                    desc: 'Nutrient-rich, unpolished indigenous grains boiled in clay vessels, yielding an earthy, nutty aroma that pairs seamlessly with spiced curries.'
                  },
                  {
                    title: 'Kingfish Kokum Curry (Xitt Kodi)',
                    type: 'Signature Gravy',
                    origin: 'Authentic Konkani Fisher Family Kitchens',
                    desc: 'Freshly extracted coconut milk infused with tart red kokum (wild mangosteen), Kashmiri byadgi chillies, coriander seeds, and tender slices of freshly caught Surmai.'
                  },
                  {
                    title: 'Surmai Rawa Crispy Pan Fry',
                    type: 'Crispy Delicacy',
                    origin: 'Malvan & Goan Coastal Strips',
                    desc: 'Coated in stone-ground recheado masala, dusted in semolina (rawa) and shallow-fried in coconut oil to golden perfection with crisp charred edges.'
                  },
                  {
                    title: 'Digestive Kokum Solkadhi',
                    type: 'Cooling Elixir',
                    origin: 'Ancestral Konkan Ayurveda',
                    desc: 'An exquisite pink nectar crafted from sun-dried kokum rinds, pressed coconut milk, crushed green chillies, garlic, and fresh sea salt to soothe the palate.'
                  },
                  {
                    title: 'Warm Clay-Oven Baked Poee',
                    type: 'Artisanal Portuguese Heritage Bread',
                    origin: 'Poder Bakeries of Fontainhas & Moira',
                    desc: 'Fermented whole wheat pocket bread with a hollow center, baked in wood-fired earthen ovens at daybreak by whistling village bakers.'
                  }
                ][activeDish] && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-2xl text-[#1a1a1a]">
                        {[
                          'Goan Red Rice (Ukda Tandool)',
                          'Kingfish Kokum Curry (Xitt Kodi)',
                          'Surmai Rawa Crispy Pan Fry',
                          'Digestive Kokum Solkadhi',
                          'Warm Clay-Oven Baked Poee'
                        ][activeDish]}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-[#f2f7fc] text-[#044F92] border border-[#cfe0ee]">
                        {[
                          'Foundation Staple',
                          'Signature Gravy',
                          'Crispy Delicacy',
                          'Cooling Elixir',
                          'Artisanal Bread'
                        ][activeDish]}
                      </span>
                    </div>

                    <p className="text-sm text-[#5a554e] leading-relaxed">
                      {[
                        'Nutrient-rich, unpolished indigenous grains boiled in clay vessels, yielding an earthy, nutty aroma that pairs seamlessly with spiced coastal curries.',
                        'Freshly extracted coconut milk infused with tart red kokum (wild mangosteen), Kashmiri byadgi chillies, coriander seeds, and tender slices of freshly caught Surmai.',
                        'Coated in stone-ground recheado masala, dusted in semolina (rawa) and shallow-fried in coconut oil to golden perfection with crisp charred edges.',
                        'An exquisite pink nectar crafted from sun-dried kokum rinds, pressed coconut milk, crushed green chillies, garlic, and fresh sea salt to soothe the palate.',
                        'Fermented whole wheat pocket bread with a hollow center, baked in wood-fired earthen ovens at daybreak by whistling village bakers (Poders).'
                      ][activeDish]}
                    </p>

                    <div className="flex gap-2 pt-2">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveDish(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            activeDish === idx ? 'w-8 bg-[#044F92]' : 'w-2 bg-[#cfe0ee] hover:bg-[#8cb7de]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Assagao Michelin-Standard Hotspots Grid */}
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
          CHAPTER 3: BEACHES & COASTAL LIVING
          ========================================================================= */}
      <section
        id="section-beaches"
        className="relative py-28 px-6 sm:px-8 lg:px-12 bg-[#02182c] text-white border-b border-[#044F92] overflow-hidden"
      >
        {/* Deep Ocean Glow Effects */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#044F92]/40 rounded-full blur-[120px] pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <ScrollReveal variant="from-left" distance={30}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-blue-200 text-xs font-semibold uppercase tracking-[0.2em]">
                <Palmtree className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Pristine Coastline</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
                Golden Sands & <br />
                <span className="text-[#38bdf8] font-serif italic">Endless Sunsets</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-base sm:text-lg text-blue-100/80 font-light leading-relaxed">
                Explore the dual coasts: vibrant beach clubs and high-energy surf breaks in North Goa versus secluded, tranquil turquoise waters and dolphin sanctuaries in South Goa.
              </p>
            </ScrollReveal>
          </div>

          {/* Interactive Dual Coast Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Interactive North vs South Toggle */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex p-1.5 bg-[#032b50] rounded-xl border border-white/20 max-w-md">
                <button
                  onClick={() => setActiveCoast('north')}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeCoast === 'north'
                      ? 'bg-[#044F92] text-white shadow-lg border border-[#38bdf8]/40'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4 text-[#38bdf8]" />
                  <span>North Goa Coast</span>
                </button>
                <button
                  onClick={() => setActiveCoast('south')}
                  className={`flex-1 py-3 px-4 rounded-lg text-xs uppercase tracking-widest font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeCoast === 'south'
                      ? 'bg-[#044F92] text-white shadow-lg border border-[#38bdf8]/40'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  <Waves className="w-4 h-4 text-[#38bdf8]" />
                  <span>South Goa Coast</span>
                </button>
              </div>

              {activeCoast === 'north' ? (
                <motion.div
                  key="north"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-white">Vibrant Beach Clubs & Sunset Lounges</h3>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30">
                      High Energy
                    </span>
                  </div>

                  <p className="text-sm text-blue-100/80 leading-relaxed font-light">
                    North Goa pulses with cosmopolitan coastal energy. From cliff-top sunset sessions at Thalassa and Antares in Vagator to bohemian beach lounges along Ashvem and Morjim.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-semibold">Iconic Enclaves</p>
                      <p className="text-xs text-white font-medium mt-0.5">Vagator, Anjuna, Ashvem & Mandrem</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-semibold">Water Culture</p>
                      <p className="text-xs text-white font-medium mt-0.5">Surf Academies & Catamaran Sailing</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigate('projects', { filterStatus: 'all' })}
                      className="text-xs text-[#38bdf8] hover:text-white flex items-center gap-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>Explore Kamat Villas in North Goa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="south"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-white">Secluded Coves & Crystal Waters</h3>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Untouched Serenity
                    </span>
                  </div>

                  <p className="text-sm text-blue-100/80 leading-relaxed font-light">
                    South Goa represents the pure, untamed essence of the Arabian Sea. Crescent bays framed by swaying coconut plantations, calm turquoise swimming waters, and private catamaran anchorages.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Iconic Enclaves</p>
                      <p className="text-xs text-white font-medium mt-0.5">Palolem, Agonda, Cola & Benaulim</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Marine Sanctuary</p>
                      <p className="text-xs text-white font-medium mt-0.5">Dolphin Sightings & Sea Turtle Nesting</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigate('locations')}
                      className="text-xs text-[#38bdf8] hover:text-white flex items-center gap-1 font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <span>View South Goa Geolocation Map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: FLOATING 3D ASSET: 3D Coconut Palm & Teak Surfboard */}
            <div className="lg:col-span-6 flex justify-center perspective-1000">
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center preserve-3d"
              >
                {/* Coastal Sunset Backdrop Image with Wave Glass Frame */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                  <img
                    src={
                      activeCoast === 'north'
                        ? 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80'
                        : 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80'
                    }
                    alt="Goa Coastal Sunset"
                    className="w-full h-full object-cover filter brightness-90 transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02182c] via-transparent to-black/30" />
                </div>

                {/* 3D FLOATING SURFBOARD (Custom Teak & Azure Inlay Graphic) */}
                <motion.div
                  animate={{
                    y: [-15, 12, -15],
                    rotateZ: [-6, -2, -6],
                    rotateX: [6, -6, 6]
                  }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                  className="absolute z-20 w-36 sm:w-44 h-80 sm:h-96 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] cursor-pointer"
                  title="3D Teak & Blue Resin Inlay Surfboard"
                >
                  <svg viewBox="0 0 160 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="surfWood" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d2996e" />
                        <stop offset="50%" stopColor="#9a5a32" />
                        <stop offset="100%" stopColor="#673618" />
                      </linearGradient>
                      <linearGradient id="surfResin" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#044F92" />
                        <stop offset="100%" stopColor="#02182c" />
                      </linearGradient>
                    </defs>

                    {/* Streamlined Surfboard Body */}
                    <path
                      d="M 80 15 C 130 90, 145 280, 100 375 C 90 395, 70 395, 60 375 C 15 280, 30 90, 80 15 Z"
                      fill="url(#surfWood)"
                      stroke="#451e06"
                      strokeWidth="3"
                    />

                    {/* Central Resin Ocean Wave Stripe */}
                    <path
                      d="M 80 15 C 95 90, 98 280, 85 375 C 80 390, 75 390, 75 375 C 62 280, 65 90, 80 15 Z"
                      fill="url(#surfResin)"
                    />

                    {/* Gold Inlay Pin Lines */}
                    <path
                      d="M 75 25 C 70 95, 70 270, 75 365"
                      stroke="#fde047"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M 85 25 C 90 95, 90 270, 85 365"
                      stroke="#fde047"
                      strokeWidth="1.5"
                      fill="none"
                    />

                    {/* Specular Top Glare */}
                    <ellipse cx="78" cy="110" rx="15" ry="50" fill="#ffffff" opacity="0.3" transform="rotate(-5 78 110)" />

                    {/* Kamat Realty Insignia on Board */}
                    <text x="80" y="220" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="3" fontFamily="sans-serif">
                      KAMAT
                    </text>
                  </svg>
                </motion.div>

                {/* 3D FLOATING COCONUT PALM BRANCH */}
                <motion.div
                  animate={{
                    rotateZ: [8, 14, 8],
                    y: [-8, 8, -8]
                  }}
                  transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut' }}
                  className="absolute -top-10 -right-8 z-30 w-44 h-44 pointer-events-none filter drop-shadow-xl"
                >
                  <svg viewBox="0 0 180 180" className="w-full h-full">
                    <defs>
                      <linearGradient id="palmFrond" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="60%" stopColor="#16a34a" />
                        <stop offset="100%" stopColor="#14532d" />
                      </linearGradient>
                    </defs>
                    {/* Stem */}
                    <path d="M 170 10 Q 110 70 20 160" stroke="#713f12" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                    {/* Frond Leaves */}
                    <path d="M 150 25 Q 120 15 110 40" stroke="url(#palmFrond)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 135 40 Q 90 25 85 60" stroke="url(#palmFrond)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    <path d="M 115 55 Q 70 45 65 85" stroke="url(#palmFrond)" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M 95 75 Q 40 70 45 115" stroke="url(#palmFrond)" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M 70 100 Q 20 105 25 145" stroke="url(#palmFrond)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 4: CULTURAL HERITAGE & PORTUGUESE ARCHITECTURE
          ========================================================================= */}
      <section
        id="section-heritage"
        className="relative py-28 px-6 sm:px-8 lg:px-12 bg-[#fffdfa] border-b border-[#e5e1da] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <ScrollReveal variant="from-left" distance={30}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fef3c7] border border-[#fde68a] rounded-full text-[#92400e] text-xs font-semibold uppercase tracking-[0.2em]">
                <Building2 className="w-3.5 h-3.5 text-[#b45309]" />
                <span>Timeless Charm</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.1}>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1a1a] tracking-tight">
                Indo-Portuguese <br />
                <span className="text-[#044F92] font-serif italic">Architecture & History</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="from-left" distance={40} delay={0.2}>
              <p className="text-base sm:text-lg text-[#5a554e] font-light leading-relaxed">
                Vibrant ochre-yellow estates, terracotta tiled roofs, and ornate balconies of Fontainhas and Moira. Kamat Realty pays homage to this 450-year heritage with modern structural durability.
              </p>
            </ScrollReveal>
          </div>

          {/* Heritage Architectural Anatomy & 3D Azulejo Window Facade */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* FLOATING 3D ASSET: Vintage Azulejo Tile & Portuguese Window Facade */}
            <div className="lg:col-span-6 flex justify-center perspective-1000">
              <motion.div
                initial={{ opacity: 0, rotateY: 60 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                whileHover={{ rotateY: -15, scale: 1.03, transition: { duration: 0.4 } }}
                className="relative w-full max-w-md aspect-[4/5] p-6 bg-gradient-to-br from-[#fefbf6] to-[#eef5fb] rounded-3xl border border-[#cfe0ee] shadow-2xl flex items-center justify-center cursor-pointer preserve-3d"
              >
                {/* 3D Portuguese Window Facade & Hand-Painted Azulejo Ceramic Tiles */}
                <svg viewBox="0 0 400 480" className="w-full h-full filter drop-shadow-xl">
                  <defs>
                    <linearGradient id="stuccoOchre" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="60%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                    <linearGradient id="shutterWood" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="50%" stopColor="#044F92" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                    <pattern id="azulejoPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                      {/* White Ceramic Tile Base */}
                      <rect width="80" height="80" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                      {/* Cobalt Blue Portuguese Filigree */}
                      <circle cx="40" cy="40" r="28" fill="none" stroke="#044F92" strokeWidth="2.5" />
                      <path d="M 40 12 C 30 25, 30 35, 40 40 C 50 35, 50 25, 40 12 Z" fill="#044F92" />
                      <path d="M 40 68 C 30 55, 30 45, 40 40 C 50 45, 50 55, 40 68 Z" fill="#044F92" />
                      <path d="M 12 40 C 25 30, 35 30, 40 40 C 35 50, 25 50, 12 40 Z" fill="#044F92" />
                      <path d="M 68 40 C 55 30, 45 30, 40 40 C 45 50, 55 50, 68 40 Z" fill="#044F92" />
                      {/* Corner Accents */}
                      <circle cx="0" cy="0" r="10" fill="#044F92" />
                      <circle cx="80" cy="0" r="10" fill="#044F92" />
                      <circle cx="0" cy="80" r="10" fill="#044F92" />
                      <circle cx="80" cy="80" r="10" fill="#044F92" />
                    </pattern>
                  </defs>

                  {/* Wall Framing with Azulejo Border */}
                  <rect x="20" y="20" width="360" height="440" rx="16" fill="url(#azulejoPattern)" stroke="#044F92" strokeWidth="4" />

                  {/* Arched Portuguese Window Stucco Surround (Ochre Yellow) */}
                  <path
                    d="M 80 430 L 80 180 A 120 120 0 0 1 320 180 L 320 430 Z"
                    fill="url(#stuccoOchre)"
                    stroke="#92400e"
                    strokeWidth="6"
                  />

                  {/* Molded Plaster Trim / Arch Rib */}
                  <path
                    d="M 100 430 L 100 185 A 100 100 0 0 1 300 185 L 300 430 Z"
                    fill="#1a1a1a"
                    stroke="#fef08a"
                    strokeWidth="3"
                  />

                  {/* Translucent Oyster Shell Window Panes (Carepas) */}
                  <g opacity="0.85">
                    <rect x="110" y="195" width="85" height="110" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                    <rect x="205" y="195" width="85" height="110" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="110" y1="230" x2="195" y2="230" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="110" y1="265" x2="195" y2="265" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="205" y1="230" x2="290" y2="230" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="205" y1="265" x2="290" y2="265" stroke="#94a3b8" strokeWidth="1.5" />
                  </g>

                  {/* Wrought Iron Ornate Balcony Railing (Balcão) */}
                  <g>
                    <rect x="90" y="320" width="220" height="110" fill="#02182c" opacity="0.2" />
                    <rect x="90" y="320" width="220" height="12" fill="#032b50" />
                    <rect x="90" y="420" width="220" height="10" fill="#032b50" />
                    {/* Railing Bars & Spirals */}
                    {[105, 125, 145, 165, 185, 205, 225, 245, 265, 285].map((xVal, i) => (
                      <line key={i} x1={xVal} y1="332" x2={xVal} y2="420" stroke="#03396c" strokeWidth="4" />
                    ))}
                    <circle cx="200" cy="370" r="22" fill="none" stroke="#38bdf8" strokeWidth="3" />
                  </g>

                  {/* Bougainvillea Flower Foliage Cascading over Arch */}
                  <g>
                    <circle cx="85" cy="150" r="10" fill="#ec4899" />
                    <circle cx="95" cy="140" r="8" fill="#db2777" />
                    <circle cx="78" cy="165" r="9" fill="#f43f5e" />
                    <circle cx="108" cy="130" r="11" fill="#e11d48" />
                    <circle cx="130" cy="115" r="9" fill="#be123c" />
                    {/* Green Leaves */}
                    <ellipse cx="80" cy="138" rx="6" ry="3" fill="#15803d" />
                    <ellipse cx="115" cy="142" rx="7" ry="4" fill="#16a34a" />
                  </g>
                </svg>

                {/* Badge Tag */}
                <div className="absolute -bottom-4 bg-white border border-[#044F92] text-[#044F92] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 shadow-xl">
                  Original Azulejo Glaze & Balcão Balcony
                </div>
              </motion.div>
            </div>

            {/* Right: Architectural Anatomy Hotspots */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest font-bold text-[#044F92]">Architectural Anatomy</p>
                <h3 className="font-display text-3xl text-[#1a1a1a]">Elements of Classical Goan Estates</h3>
                <p className="text-sm text-[#5a554e] font-light leading-relaxed">
                  Every Kamat home blends the passive cooling ingenuity of 18th-century Goan master builders with seismic-proof RCC framing and smart home automation.
                </p>
              </div>

              {/* 4 Feature Accordion Cards */}
              <div className="space-y-3">
                {[
                  {
                    title: 'Vibrant Ochre & Indigo Mineral Stucco',
                    detail: 'Historically derived from local laterite stone earth and natural plant dyes to repel tropical humidity and monsoon downpours.'
                  },
                  {
                    title: 'Translucent Oyster Shell Carepas Windows',
                    detail: 'Before glass arrived in Goa, artisans hand-cut windowpane oyster shells (Placuna placenta) to diffuse harsh tropical glare into warm, pearlescent ambient light.'
                  },
                  {
                    title: 'The Balcão (Covered Porch Verandah)',
                    detail: 'The communal heart of Goan homes with built-in masonry benches (assentos) where neighbours gather to converse and watch the twilight.'
                  },
                  {
                    title: 'High-Pitch Mangalore Terracotta Roofs',
                    detail: 'Steeply angled baked clay tiles that channel monsoon deluge away instantly, creating naturally insulated airy 14-foot interior ceilings.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveArchFeature(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      activeArchFeature === idx
                        ? 'bg-[#eef5fb] border-[#044F92] shadow-sm'
                        : 'bg-white border-[#e5e1da] hover:border-[#cfe0ee]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg text-[#1a1a1a] flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${activeArchFeature === idx ? 'bg-[#044F92]' : 'bg-[#c2d6e8]'}`} />
                        {item.title}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          activeArchFeature === idx ? 'rotate-90 text-[#044F92]' : 'text-[#8c857d]'
                        }`}
                      />
                    </div>
                    {activeArchFeature === idx && (
                      <p className="text-xs text-[#5a554e] mt-2 pl-4 border-l-2 border-[#044F92] leading-relaxed">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('about')}
                  className="px-6 py-3 bg-[#044F92] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#03396c] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Discover Kamat’s 32-Yr Heritage</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
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
          {/* Header */}
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

          {/* 3D Highway Ribbon & MOPA Aircraft Landing Mockup + ROI Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* FLOATING 3D ASSET: Winding 3D Highway Ribbon & Airplane Landing Mockup */}
            <div className="lg:col-span-6 flex justify-center perspective-1000">
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative w-full max-w-lg aspect-square p-6 bg-white rounded-3xl border border-[#cfe0ee] shadow-2xl flex items-center justify-center preserve-3d overflow-hidden"
              >
                {/* Background Radar & Route Grid */}
                <div className="absolute inset-0 editorial-grid opacity-30 pointer-events-none" />

                {/* THE 3D WINDING HIGHWAY RIBBON & LANDING JET (SVG) */}
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

                  {/* Isometric Ground Elevation Plate */}
                  <polygon points="50,380 250,470 450,380 250,290" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />

                  {/* 3D Winding Highway Ribbon (MOPA Expressway) */}
                  <path
                    d="M 60 420 C 180 320, 100 220, 240 180 C 340 150, 360 80, 420 40"
                    fill="none"
                    stroke="url(#highwayGrad)"
                    strokeWidth="38"
                    strokeLinecap="round"
                  />
                  {/* Road Center Dashed Line */}
                  <path
                    d="M 60 420 C 180 320, 100 220, 240 180 C 340 150, 360 80, 420 40"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeDasharray="14 10"
                    strokeLinecap="round"
                    className="animate-shimmer"
                  />

                  {/* Destination Nodes */}
                  {/* Node 1: MOPA Airport */}
                  <circle cx="420" cy="40" r="18" fill="#044F92" stroke="#ffffff" strokeWidth="3" />
                  <text x="420" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    MOPA
                  </text>

                  {/* Node 2: Assagao / Vagator */}
                  <circle cx="240" cy="180" r="14" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
                  <text x="240" y="210" fill="#044F92" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    Assagao (28 Min)
                  </text>

                  {/* Node 3: Panaji CBD */}
                  <circle cx="60" cy="420" r="16" fill="#044F92" stroke="#ffffff" strokeWidth="3" />
                  <text x="70" y="450" fill="#044F92" fontSize="11" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">
                    Panaji Capital
                  </text>

                  {/* 3D COMMERCIAL AIRPLANE LANDING MOCKUP */}
                  <g transform="translate(320, 90) rotate(22)">
                    {/* Airplane Fuselage */}
                    <path
                      d="M 0 -35 C 10 -35, 12 35, 0 45 C -12 35, -10 -35, 0 -35 Z"
                      fill="url(#jetChrome)"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    {/* Main Swept Wings */}
                    <polygon points="0,-5 85,25 75,32 0,10 -75,32 -85,25" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                    {/* Tailplane (Stabilizers) */}
                    <polygon points="0,32 30,48 24,52 0,42 -24,52 -30,48" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                    {/* Vertical Fin */}
                    <polygon points="0,25 0,46 -4,44 -2,25" fill="#044F92" />
                    {/* Jet Engines */}
                    <ellipse cx="28" cy="14" rx="4" ry="10" fill="#334155" />
                    <ellipse cx="-28" cy="14" rx="4" ry="10" fill="#334155" />
                    {/* Cockpit Windshield */}
                    <path d="M -5 -25 Q 0 -30 5 -25 Z" fill="#0284c7" />
                  </g>
                </svg>

                {/* Infrastructure Metric Pills */}
                <div className="absolute top-4 left-4 bg-[#044F92] text-white px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider shadow-md">
                  Manohar Int'l Airport (MOPA) Active
                </div>
                <div className="absolute bottom-4 right-4 bg-white border border-[#cfe0ee] text-[#1a1a1a] px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>4-Lane Expressway Corridor</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Interactive Goa Vacation Rental Yield Calculator */}
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

                {/* Slider 1: Capital Investment */}
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

                {/* Slider 2: Annual Occupancy */}
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

                {/* Results Metrics Dashboard */}
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

                {/* Key Drivers Comparison */}
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

                {/* Final Booking CTAs */}
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

