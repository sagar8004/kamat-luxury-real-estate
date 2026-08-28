import React from 'react';
import { motion, Variants } from 'motion/react';

export type AnimationVariant =
  | 'from-left'
  | 'from-right'
  | 'from-behind'
  | 'fade-up'
  | 'scale-up'
  | 'blur-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
  threshold?: number;
}

const getVariants = (variant: string, distance: number): Variants => {
  switch (variant) {
    case 'from-left':
      return {
        hidden: {
          opacity: 0,
          x: -distance,
          filter: 'blur(4px)',
        },
        visible: {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1], // luxury easeOutExpo curve
          },
        },
      };

    case 'from-right':
      return {
        hidden: {
          opacity: 0,
          x: distance,
          filter: 'blur(4px)',
        },
        visible: {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

    case 'from-behind':
      return {
        hidden: {
          opacity: 0,
          scale: 0.84,
          z: -120,
          filter: 'blur(10px)',
        },
        visible: {
          opacity: 1,
          scale: 1,
          z: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 1.0,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

    case 'scale-up':
      return {
        hidden: {
          opacity: 0,
          scale: 0.92,
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

    case 'blur-in':
      return {
        hidden: {
          opacity: 0,
          filter: 'blur(16px)',
          scale: 1.04,
        },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

    case 'fade-up':
    default:
      return {
        hidden: {
          opacity: 0,
          y: distance,
          filter: 'blur(3px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };
  }
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration,
  className = '',
  distance = 50,
  once = false,
  threshold = 0.15,
}) => {
  const variants = getVariants(variant, distance);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      transition={{
        delay,
        ...(duration ? { duration } : {}),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}> = ({ children, className = '', staggerDelay = 0.12, once = false }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'from-left' | 'from-right' | 'from-behind' | 'fade-up';
}> = ({ children, className = '', variant = 'fade-up' }) => {
  let itemVariants: Variants = {
    hidden: { opacity: 0, y: 35, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (variant === 'from-left') {
    itemVariants = {
      hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
      visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
      },
    };
  } else if (variant === 'from-behind') {
    itemVariants = {
      hidden: { opacity: 0, scale: 0.86, filter: 'blur(8px)' },
      visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      },
    };
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
