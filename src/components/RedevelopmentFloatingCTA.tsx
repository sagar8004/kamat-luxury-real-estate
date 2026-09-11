'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Sparkles, ArrowUpRight, X } from 'lucide-react';

export const RedevelopmentFloatingCTA: React.FC = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Show after minor scroll or after a short delay so it doesn't distract on first paint
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also trigger after 2 seconds automatically
    const timer = setTimeout(() => setHasScrolled(true), 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Hide on the redevelopment page itself or if dismissed
  if (pathname === '/redevelopment' || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {hasScrolled && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 select-none group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Ambient Radar Glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-cyan-400/30 blur-md group-hover:blur-lg opacity-70 group-hover:opacity-100 transition-all animate-pulse pointer-events-none" />

          {/* Floating Action Link Button */}
          <Link
            href="/redevelopment"
            className="relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#032d54] via-[#044F92] to-[#02182c] border border-cyan-400/40 hover:border-cyan-300 rounded-full shadow-[0_10px_30px_rgba(4,79,146,0.45)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.5)] transition-all duration-300 text-white cursor-pointer active:scale-95 overflow-hidden"
          >
            {/* Shimmer Light Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            {/* Icon Container with Rotating Glow Ring */}
            <div className="relative w-9 h-9 rounded-full bg-white/10 border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Little Sparkle Badge */}
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-cyan-400 text-[#032d54]"
              >
                <Sparkles className="w-2 h-2" />
              </motion.span>
            </div>

            {/* Text Labels */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-300 font-bold">
                  Kamat Redevelopment
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <span className="font-display text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-cyan-100 transition-colors">
                Unlock Property Value
              </span>
            </div>

            {/* Arrow Action Indicator */}
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 group-hover:bg-cyan-400 border border-cyan-400/40 flex items-center justify-center ml-1 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-cyan-200 group-hover:text-[#032d54] transition-colors" />
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
