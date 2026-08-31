'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, ChevronDown } from 'lucide-react';
import { PropertyCategory } from '../types/property';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `/hero-frames/ezgif-frame-${paddedIndex}.jpg`;
};

interface HeroScrollAnimationProps {
  onNavigate: (page: string, params?: { propertyId?: string; filterStatus?: string }) => void;
  onOpenTourModal: () => void;
  onSearch?: (query: string, area: string, category: PropertyCategory) => void;
}

export const HeroScrollAnimation: React.FC<HeroScrollAnimationProps> = ({
  onNavigate,
  onOpenTourModal,
  onSearch,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(-1);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Draw frame to canvas with optimal aspect-ratio cover math
  const drawFrame = useCallback((targetFrameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find target image or closest loaded frame
    let img = imagesRef.current[targetFrameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let nearest = 0;
      let minDiff = Infinity;
      loadedFramesRef.current.forEach((idx) => {
        const diff = Math.abs(idx - targetFrameIndex);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = idx;
        }
      });
      img = imagesRef.current[nearest];
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Cover calculations
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    let renderW = w;
    let renderH = h;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      renderW = h * imgRatio;
      offsetX = (w - renderW) / 2;
    } else {
      renderH = w / imgRatio;
      offsetY = (h - renderH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Elegant cinematic lighting scrim
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, 'rgba(2, 16, 32, 0.40)');
    gradient.addColorStop(0.35, 'rgba(2, 16, 32, 0.15)');
    gradient.addColorStop(0.65, 'rgba(2, 16, 32, 0.25)');
    gradient.addColorStop(1, 'rgba(2, 16, 32, 0.65)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
    currentFrameRef.current = targetFrameIndex;
  }, []);

  // Preload all 240 frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;

    // Load first frame immediately
    const firstImg = typeof window !== 'undefined' ? new window.Image() : new (window as any).Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      loadedFramesRef.current.add(0);
      count++;
      if (isMounted) {
        setLoadedCount(1);
        imagesRef.current = images;
        drawFrame(0);
      }
    };
    images[0] = firstImg;

    // Load remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = typeof window !== 'undefined' ? new window.Image() : new (window as any).Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedFramesRef.current.add(i);
        count++;
        if (isMounted) {
          if (count % 15 === 0 || count === TOTAL_FRAMES) {
            setLoadedCount(count);
          }
          if (currentFrameRef.current === i) {
            drawFrame(i);
          }
        }
      };
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Robust direct scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);

      const targetFrame = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (targetFrame !== currentFrameRef.current) {
        requestAnimationFrame(() => drawFrame(targetFrame));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [drawFrame]);

  // Initial draw after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      drawFrame(0);
    }, 100);
    return () => clearTimeout(timer);
  }, [drawFrame]);

  const scrollToPhase = (targetProgress: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: containerTop + targetProgress * totalScrollable,
      behavior: 'smooth',
    });
  };

  // Determine active phase
  const activePhase =
    scrollProgress < 0.25 ? 0 : scrollProgress < 0.52 ? 1 : scrollProgress < 0.78 ? 2 : 3;

  // Helper to compute cinematic 3D transform and opacity for each phase
  const getPhaseStyles = (start: number, peakStart: number, peakEnd: number, end: number) => {
    let opacity = 0;
    let scale = 0.8;
    let translateY = 40;
    let blur = 10;
    let pointerEvents: 'auto' | 'none' = 'none';

    if (scrollProgress >= start && scrollProgress <= end) {
      pointerEvents = 'auto';
      if (scrollProgress < peakStart) {
        // Emerging from behind (scaling up, unblurring, fading in)
        const t = (scrollProgress - start) / (peakStart - start);
        opacity = t;
        scale = 0.8 + t * 0.2;
        translateY = 40 * (1 - t);
        blur = 10 * (1 - t);
      } else if (scrollProgress <= peakEnd) {
        // In full crisp focus
        opacity = 1;
        scale = 1.0;
        translateY = 0;
        blur = 0;
      } else {
        // Exiting forward / dissolving
        const t = (scrollProgress - peakEnd) / (end - peakEnd);
        opacity = 1 - t;
        scale = 1.0 + t * 0.15;
        translateY = -30 * t;
        blur = 8 * t;
      }
    } else if (scrollProgress > end) {
      opacity = 0;
      scale = 1.15;
      translateY = -40;
      blur = 10;
    }

    return {
      opacity,
      transform: `perspective(1000px) scale(${scale}) translateY(${translateY}px)`,
      filter: blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : 'none',
      pointerEvents,
      visibility: opacity > 0.01 ? ('visible' as const) : ('hidden' as const),
    };
  };

  const phase1Style = getPhaseStyles(-0.05, 0.0, 0.18, 0.26);
  const phase2Style = getPhaseStyles(0.24, 0.32, 0.46, 0.54);
  const phase3Style = getPhaseStyles(0.52, 0.60, 0.72, 0.80);
  const phase4Style = getPhaseStyles(0.77, 0.85, 1.05, 1.10);

  return (
    <div
      id="hero-scroll-section"
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#021020] text-white"
    >
      {/* Sticky Canvas Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between perspective-1000">

        {/* Background Canvas for Frame Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Ambient Top & Bottom Vignette Scrims */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#021426]/60 via-transparent to-[#021020]/75" />

        {/* Subtle Buffer indicator */}
        {loadedCount < 60 && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
            <div className="w-2.5 h-2.5 border-2 border-[#38bdf8] border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-blue-200">
              Buffering Visual Frames ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)
            </span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CINEMATIC TEXT STAGES (Emerging from Behind with 3D Depth, Blur & Scale) */}
        {/* ========================================================================= */}

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 h-full flex flex-col justify-center items-center pointer-events-none">

          {/* ----------------------------------------------------------------------- */}
          {/* PHASE 1 (0% - 25%): Intro Architectural Masterpieces Reveal */}
          {/* ----------------------------------------------------------------------- */}
          <div
            style={phase1Style}
            className="absolute inset-0 flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-6 will-change-transform"
          >
            {/* Top Brand Crest Badge */}
            {/* <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/25 rounded-full text-white text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium shadow-xl mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
              <span>Goa’s Premier Luxury Architecture • Est. 1994</span>
            </div> */}

            {/* Main Grand Display Headline emerging from behind */}
            <h1 className="font-secondary text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-white text-shadow-cinematic max-w-5xl drop-shadow-2xl">
              Built on Trust <br />
              <span className="italic font-secondary text-[#93c5fd] font-light">
                Most Trusted Partner
              </span>
            </h1>

            <p className="font-primary text-sm sm:text-lg md:text-xl text-blue-100/95 font-light leading-relaxed max-w-2xl mt-6 text-shadow-cinematic drop-shadow-lg">
              Sculpting private pool villas, cliffside ocean estates, and heritage residences across Goa’s most prestigious enclaves.
            </p>

            {/* Interactive Scroll Down Pulse prompt */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <span className="font-secondary text-[10px] uppercase tracking-[0.3em] text-blue-200/90 drop-shadow">
                Scroll Down to Experience
              </span>
              <div className="w-5 h-9 rounded-full border-2 border-white/50 flex items-start justify-center p-1 bg-black/30 backdrop-blur-sm shadow-lg">
                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-2 bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8]"
                />
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* PHASE 2 (25% - 52%): Timeless Coastal Grandeur & Key Enclaves */}
          {/* ----------------------------------------------------------------------- */}
          <div
            style={phase2Style}
            className="absolute inset-0 flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-6 will-change-transform"
          >
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black/40 backdrop-blur-md border border-white/25 text-[10px] uppercase tracking-[0.25em] text-[#38bdf8] font-bold mb-4 shadow-lg font-secondary">
              <span>Signature Coastal Enclaves</span>
            </div> */}

            <h2 className="font-secondary text-4xl sm:text-5xl md:text-7xl font-normal leading-tight text-white text-shadow-cinematic max-w-4xl drop-shadow-2xl">
              Proven Credibility <br />
              <span className="italic font-secondary text-[#93c5fd] font-light">A Decades-Long Legacy</span>
            </h2>

            <p className="font-primary text-sm sm:text-base md:text-lg text-blue-100/95 font-light max-w-2xl mt-5 text-shadow-cinematic drop-shadow-lg leading-relaxed">
              From the tranquil teak canopies of Assagao to the panoramic Arabian Sea horizons of Miramar and Candolim.
            </p>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* PHASE 3 (52% - 78%): 32 Years of Engineering & Heritage Mastery */}
          {/* ----------------------------------------------------------------------- */}
          <div
            style={phase3Style}
            className="absolute inset-0 flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-6 will-change-transform"
          >
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black/40 backdrop-blur-md border border-white/25 text-[10px] uppercase tracking-[0.25em] text-[#38bdf8] font-bold mb-4 shadow-lg font-secondary">
              <span>Master Builders of Goa</span>
            </div> */}

            <h2 className="font-secondary text-4xl sm:text-5xl md:text-7xl font-normal leading-tight text-white text-shadow-cinematic max-w-4xl drop-shadow-2xl">
              Engineered to Endure <br />
              <span className="italic font-secondary text-[#93c5fd] font-light">for Generations</span>
            </h2>

            <p className="font-primary text-sm sm:text-base md:text-lg text-blue-100/95 font-light max-w-2xl mt-5 text-shadow-cinematic drop-shadow-lg leading-relaxed">
              Seismic-proof RCC engineering, marine-grade corrosion-resistant framing, and hand-chiseled laterite thermal masonry.
            </p>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* PHASE 4 (78% - 100%): Grand Final Call to Action */}
          {/* ----------------------------------------------------------------------- */}
          <div
            style={phase4Style}
            className="absolute inset-0 flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-6 will-change-transform"
          >
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black/40 backdrop-blur-md border border-white/25 text-[10px] uppercase tracking-[0.25em] text-[#38bdf8] font-bold mb-4 shadow-lg font-secondary">
              <span>Your Sanctuary Awaits</span>
            </div> */}

            <h2 className="font-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] text-white text-shadow-cinematic max-w-4xl drop-shadow-2xl">
              Discover Goa’s Most <br />
              <span className="italic font-secondary text-[#93c5fd] font-light">Prestigious Estates</span>
            </h2>

            <p className="font-primary text-sm sm:text-base md:text-lg text-blue-100/95 font-light max-w-2xl mt-4 text-shadow-cinematic drop-shadow-lg leading-relaxed">
              Browse our curated portfolio of residential & commercial landmarks or schedule an exclusive chauffeured private site visit.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 pointer-events-auto">
              <button
                id="hero-scroll-explore-btn"
                onClick={() => onNavigate('projects')}
                className="px-8 py-4 bg-white text-[#044F92] hover:bg-blue-50 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-2xl flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Developments</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-scroll-tour-btn"
                onClick={onOpenTourModal}
                className="px-8 py-4 bg-black/40 hover:bg-black/60 text-white border border-white/50 hover:border-white text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md"
              >
                <Compass className="w-4 h-4 text-[#38bdf8]" />
                <span>Book VIP Site Visit</span>
              </button>
            </div>

            {/* Clean subtle scroll prompt down to filter search & trust */}
            <div className="mt-8 flex items-center gap-2 text-blue-200/80 text-[11px] uppercase tracking-[0.2em]">
              <span>Scroll Down to Filter Estates & View Trust Pillars</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#38bdf8]" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SIDE TIMELINE SCRUBBER & NAVIGATION DOTS */}
        {/* ========================================================================= */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4 bg-black/50 backdrop-blur-md px-3 py-5 rounded-full border border-white/20 shadow-xl">
          {[
            { label: 'Masterpiece', target: 0.05 },
            { label: 'Enclaves', target: 0.38 },
            { label: 'Engineering', target: 0.66 },
            { label: 'Explore', target: 0.95 },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => scrollToPhase(item.target)}
              title={item.label}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activePhase === idx
                  ? 'w-3 h-3 bg-[#38bdf8] ring-4 ring-[#38bdf8]/40 scale-110'
                  : 'bg-white/40 hover:bg-white/80'
                  }`}
              />
              <span className="absolute right-8 px-2 py-1 bg-black/80 backdrop-blur-sm border border-white/20 text-[9px] uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM PROGRESS BAR */}
        {/* ========================================================================= */}
        <div className="relative z-30 w-full px-6 sm:px-10 pb-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-blue-200/90 font-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span>Interactive Scroll Journey</span>
          </div>

          <div className="w-48 sm:w-64 h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-[#38bdf8] to-blue-400 transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          <div>
            <span>0{activePhase + 1} / 04</span>
          </div>
        </div>

      </div>
    </div>
  );
};

