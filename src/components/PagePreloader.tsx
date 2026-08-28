import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image } from './Image';

interface PagePreloaderProps {
  /** Minimum duration in milliseconds to show the preloader (defaults to 2000ms / 2s) */
  minDuration?: number;
  /** Optional callback fired when preloader finished fading out */
  onComplete?: () => void;
}

export const PagePreloader: React.FC<PagePreloaderProps> = ({
  minDuration = 2000,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // Only run on fresh page load/hydration, avoid blocking every manual text edit in HMR
    if (typeof window !== 'undefined') {
      const hasLoaded = window.sessionStorage.getItem('kamat_preloader_shown');
      if (hasLoaded === 'true') {
        return false;
      }
    }
    return true;
  });

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = '';
      return;
    }

    // Disable scroll only while preloader is active
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
      try {
        window.sessionStorage.setItem('kamat_preloader_shown', 'true');
      } catch (e) {
        // ignore
      }
      document.body.style.overflow = '';
    }, minDuration);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [minDuration, isVisible]);

  if (!isVisible) return null;

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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#000000] text-white select-none overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading Kamat Realty"
        >
          {/* Subtle architectural luxury ambient backdrop glow matching brand blue */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(4,79,146,0.18)_0%,rgba(0,0,0,0)_65%)]" />

          {/* Centered Animated GIF Logo with Next.js Image specification */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center justify-center z-10"
          >
            <div className="relative p-4 sm:p-6 flex items-center justify-center">
              <Image
                src="/Kamat Animated Logo.gif"
                alt="Kamat Realty Luxury Real Estate"
                width={480}
                height={270}
                priority
                unoptimized
                className="w-64 sm:w-80 md:w-96 lg:w-[440px] h-auto max-h-[50vh] object-contain select-none pointer-events-none"
              />
            </div>

            {/* Luxury Minimalist Loading Progress Accent */}
            <div className="w-36 sm:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-1 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#044F92] via-[#3b82f6] to-[#044F92] rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>

            {/* Subtle Brand Tagline */}
            <p className="mt-4 text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/50 font-structural font-medium">
              Architectural Landmarks
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PagePreloader;
