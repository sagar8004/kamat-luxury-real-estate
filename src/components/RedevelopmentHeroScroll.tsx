'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `/redevelopment_frames/frame_${paddedIndex}.webp`;
};

interface RedevelopmentHeroScrollProps {
  onScrollToForm: () => void;
  onExploreBenefits: () => void;
}

export const RedevelopmentHeroScroll: React.FC<RedevelopmentHeroScrollProps> = ({
  onScrollToForm,
  onExploreBenefits,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(-1);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Draw frame to canvas with high-DPI aspect-ratio cover
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

    // Subtle cinematic bottom vignette (clean top for maximum building frame visibility)
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, 'rgba(2, 16, 32, 0.05)');
    gradient.addColorStop(0.4, 'rgba(2, 16, 32, 0.0)');
    gradient.addColorStop(0.7, 'rgba(2, 16, 32, 0.20)');
    gradient.addColorStop(1, 'rgba(2, 16, 32, 0.65)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
    currentFrameRef.current = targetFrameIndex;
  }, []);

  // Intelligent prioritized frame preloading
  useEffect(() => {
    let isCancelled = false;

    // Phase 1: High priority keyframes across the 240 sequence
    const priorityIndices: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += 6) {
      priorityIndices.push(i);
    }

    // Phase 2: Secondary intermediate frames
    const secondaryIndices: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += 2) {
      if (!priorityIndices.includes(i)) secondaryIndices.push(i);
    }

    // Phase 3: Remaining frames
    const remainingIndices: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!priorityIndices.includes(i) && !secondaryIndices.includes(i)) {
        remainingIndices.push(i);
      }
    }

    const loadQueue = [...priorityIndices, ...secondaryIndices, ...remainingIndices];

    loadQueue.forEach((idx) => {
      const img = new Image();
      img.src = getFramePath(idx);

      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[idx] = img;
        loadedFramesRef.current.add(idx);
        setLoadedCount((prev) => {
          const next = prev + 1;
          if (idx === 0 || next === 1) {
            drawFrame(0);
          }
          return next;
        });
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Scroll handler with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const container = containerRef.current;
          if (!container) {
            ticking = false;
            return;
          }

          const rect = container.getBoundingClientRect();
          const totalScrollable = container.offsetHeight - window.innerHeight;

          if (totalScrollable <= 0) {
            ticking = false;
            return;
          }

          const currentScroll = -rect.top;
          const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

          setScrollProgress(rawProgress);

          const targetFrameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(rawProgress * (TOTAL_FRAMES - 1)))
          );

          if (targetFrameIndex !== currentFrameRef.current) {
            drawFrame(targetFrameIndex);
          }

          ticking = false;
        });
        ticking = true;
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

  // Determine if we reached the final stage (e.g. > 78% scroll progress)
  const isFinalStage = scrollProgress >= 0.78;

  return (
    <div id="redevelopment-hero-scroll-section" ref={containerRef} className="relative w-full h-[400vh] bg-[#021020]">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas Frame Renderer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Subtle Ambient Vignette (Clean top for 100% building top visibility) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#021020]/75 pointer-events-none z-10" />

        {/* Floating Scroll Down Prompt (Active during frame playback until final text) */}
        {!isFinalStage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-cyan-300 drop-shadow-md">
              Scroll to Experience Redevelopment
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
            >
              <ChevronDown className="w-4 h-4 text-cyan-300" />
            </motion.div>
          </motion.div>
        )}

        {/* FINAL TEXT REVEAL: Appears ONLY at the end of the scroll animation */}
        {isFinalStage && (
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6 select-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-cyan-400/30 text-cyan-200 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Kamat Property Redevelopment & Joint Development</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-white max-w-4xl mx-auto leading-[1.08] drop-shadow-2xl"
            >
              Your Trusted Redevelopment Partner, <span className="italic font-serif text-cyan-200">Not Just a Builder.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-blue-100/90 text-sm sm:text-base lg:text-lg font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            >
              Unlock the true potential of your aging building, society, or ancestral plot. Partner with Kamat Realty for 100% funded modern transformation, larger living spaces, and multi-generational wealth.
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-2 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                onClick={onScrollToForm}
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#032d54] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.45)] cursor-pointer"
              >
                <span>Evaluate Your Property</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreBenefits}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer backdrop-blur-md"
              >
                Explore Partnership Models
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/15 max-w-3xl mx-auto text-left"
            >
              <div className="space-y-0.5">
                <span className="font-display text-xl sm:text-2xl font-bold text-white block">32+ Years</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-wider block">Undefeated Heritage</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-display text-xl sm:text-2xl font-bold text-cyan-300 block">100% Funded</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-wider block">Zero Capital by Owners</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-display text-xl sm:text-2xl font-bold text-white block">20% - 40%</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-wider block">Extra Carpet Area</span>
              </div>
              <div className="space-y-0.5">
                <span className="font-display text-xl sm:text-2xl font-bold text-cyan-300 block">0 Legal Risk</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-wider block">RERA & Escrow Security</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Bottom Progress Bar Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-white transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
