'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PagePreloaderProps {
  /** Minimum duration in milliseconds to show the preloader (defaults to 3500ms) */
  minDuration?: number;
  /** Optional callback fired when preloader finished fading out */
  onComplete?: () => void;
}

export const PagePreloader: React.FC<PagePreloaderProps> = ({
  minDuration = 3500,
  onComplete,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    // Clear any legacy sessionStorage blocker so preloader loads properly
    try {
      window.sessionStorage.removeItem('kamat_preloader_shown');
    } catch {
      // ignore
    }
  }, []);

  // Ensure video autoplays smoothly when mounted
  useEffect(() => {
    if (mounted && isVisible && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback handler
        });
      }
    }
  }, [mounted, isVisible]);

  useEffect(() => {
    if (!mounted || !isVisible) {
      document.body.style.overflow = '';
      return;
    }

    // Disable scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    let animationFrameId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const calculated = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      setProgress(calculated);

      if (elapsed < minDuration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, minDuration);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [mounted, isVisible, minDuration]);

  if (!mounted) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }}
    >
      {isVisible && (
        <motion.div
          key="global-page-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#f2f2f2] text-slate-900 select-none overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading Kamat Realty"
        >
          {/* Centered Animated WebM Logo matching #f2f2f2 canvas background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center justify-center z-10"
          >
            <div className="relative p-4 sm:p-6 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/kamat-logo.png"
                className="w-64 sm:w-80 md:w-96 lg:w-[440px] h-auto max-h-[50vh] object-contain select-none pointer-events-none mix-blend-multiply"
              >
                <source src="/kamat-animated-logo.webm" type="video/webm" />
                <img
                  src="/kamat-logo.png"
                  alt="Kamat Realty"
                  className="w-64 sm:w-80 md:w-96 lg:w-[440px] object-contain"
                />
              </video>
            </div>

            {/* Luxury Minimalist Loading Progress Accent */}
            <div className="w-36 sm:w-48 h-[2px] bg-slate-300/60 rounded-full overflow-hidden mt-1 relative shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#044F92] via-[#1A73E8] to-[#044F92] rounded-full shadow-[0_0_8px_rgba(4,79,146,0.35)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>

            {/* Subtle Brand Tagline */}
            <p className="mt-4 text-[10px] sm:text-xs tracking-[0.35em] uppercase text-slate-500 font-structural font-medium">
              Architectural Landmarks
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PagePreloader;


