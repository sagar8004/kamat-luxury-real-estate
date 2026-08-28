import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  unoptimized?: boolean;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  quality?: number | string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Image component adhering to the Next.js Image API specification for Vite/React applications.
 * Supports `priority` (eager loading & high fetch priority) and `unoptimized` (direct raw asset delivery).
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  unoptimized = false,
  fill = false,
  className = '',
  style,
  loading,
  decoding,
  ...rest
}) => {
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(fill
      ? {
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          objectFit: (style && 'objectFit' in style && style.objectFit ? style.objectFit : 'cover') as React.CSSProperties['objectFit'],
        }
      : {}),
  };

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? 'eager' : loading || 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={decoding || (priority ? 'sync' : 'async')}
      className={className}
      style={combinedStyle}
      data-unoptimized={unoptimized ? 'true' : undefined}
      data-priority={priority ? 'true' : undefined}
      {...rest}
    />
  );
};

export default Image;
