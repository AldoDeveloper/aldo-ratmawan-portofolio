import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface CustomCarouselProps {
  children: React.ReactNode;
  perPage?: number;
  gap?: number;
  autoplay?: boolean;
  interval?: number;
  infiniteLoop?: boolean;
  arrows?: boolean;
  pagination?: boolean;
  speed?: number;
  easing?: string;
  height?: string;
  width?: string;
  className?: string;
  slideClassName?: string;
  breakpoints?: { mobile?: number; tablet?: number; desktop?: number };
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  perPage = 3,
  gap = 16,
  autoplay = true,
  interval = 4000,
  infiniteLoop = true,
  arrows = true,
  pagination = true,
  speed = 600,
  easing = 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  height = '320px',
  width = '100%',
  className = '',
  slideClassName = '',
  breakpoints = {}, // ⚠️ Hapus default hardcode agar tidak override perPage
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [resolvedPerPage, setResolvedPerPage] = useState(perPage);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;
  const isTransitioningRef = useRef(isTransitioning);
  isTransitioningRef.current = isTransitioning;

  const slides = React.Children.toArray(children).filter(Boolean);
  const totalSlides = slides.length;
  
  const canScroll = totalSlides > resolvedPerPage;
  const shouldInfinite = infiniteLoop && canScroll;

  // 🔄 1. Responsive + perPage Sync (FIXED)
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      let target = perPage; // Default: pakai prop perPage
      if (w < 640) target = breakpoints.mobile ?? perPage;
      else if (w < 1024) target = breakpoints.tablet ?? perPage;
      else target = breakpoints.desktop ?? perPage;
      setResolvedPerPage(target);
    };
    handleResize(); // Jalankan saat mount & perPage berubah
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints, perPage]);

  // Reset posisi saat perPage berubah
  useEffect(() => {
    setCurrentIndex(canScroll ? resolvedPerPage : 0);
    setDragOffset(0);
    setIsTransitioning(false);
  }, [resolvedPerPage, canScroll]);

  // 📐 2. Ukur Container
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) setContainerWidth(w);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 📏 3. Perhitungan Presisi
  const itemWidth = useMemo(() => {
    if (containerWidth <= 0) return 0;
    return canScroll 
      ? (containerWidth - (resolvedPerPage - 1) * gap) / resolvedPerPage 
      : containerWidth / totalSlides;
  }, [containerWidth, resolvedPerPage, gap, totalSlides, canScroll]);

  const trackStep = itemWidth + gap;

  // ♾️ 4. Clone Strategy
  const extendedSlides = useMemo(() => {
    if (!shouldInfinite) return slides;
    return [
      ...slides.slice(-resolvedPerPage),
      ...slides,
      ...slides.slice(0, resolvedPerPage),
    ];
  }, [slides, resolvedPerPage, shouldInfinite]);

  const startIndex = shouldInfinite ? resolvedPerPage : 0;

  // 🎯 5. Navigasi
  const goTo = useCallback((index: number) => {
    if (!canScroll || isTransitioningRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setDragOffset(0);
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
  }, [canScroll]);

  const next = useCallback(() => goTo(currentIndexRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(currentIndexRef.current - 1), [goTo]);

  // 🔄 6. Seamless Reset
  const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || !isTransitioningRef.current || !canScroll) return;
    let resetIndex = currentIndexRef.current;
    if (shouldInfinite) {
      if (currentIndexRef.current >= startIndex + totalSlides) resetIndex = startIndex;
      else if (currentIndexRef.current < startIndex) resetIndex = startIndex + totalSlides - 1;
    }
    if (resetIndex !== currentIndexRef.current) {
      setIsTransitioning(false);
      setCurrentIndex(resetIndex);
      requestAnimationFrame(() => setIsTransitioning(true));
    } else {
      setIsTransitioning(false);
    }
  }, [shouldInfinite, totalSlides, startIndex, canScroll]);

  // 🖱️ 7. Pointer/Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!canScroll) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setIsTransitioning(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!canScroll || !isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(Math.max(-trackStep * 0.8, Math.min(trackStep * 0.8, diff)));
  };

  const handlePointerUp = () => {
    if (!canScroll || !isDragging) return;
    setIsDragging(false);
    setIsTransitioning(true);
    const threshold = trackStep * 0.2;
    if (Math.abs(dragOffset) > threshold) {
      dragOffset < 0 ? goTo(currentIndexRef.current + 1) : goTo(currentIndexRef.current - 1);
    } else {
      goTo(currentIndexRef.current);
    }
  };

  // ⏱️ 8. Autoplay
  useEffect(() => {
    if (autoplay && canScroll && !isPaused && !isDragging && !isTransitioningRef.current) {
      autoplayTimerRef.current = setInterval(() => goTo(currentIndexRef.current + 1), interval);
    }
    return () => { if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current); };
  }, [autoplay, canScroll, isPaused, isDragging, interval, goTo]);

  const realIndex = useMemo(() => {
    if (!canScroll || !shouldInfinite) return Math.min(currentIndex, totalSlides - 1);
    let idx = currentIndex - startIndex;
    if (idx < 0) idx += totalSlides;
    if (idx >= totalSlides) idx -= totalSlides;
    return idx;
  }, [currentIndex, canScroll, shouldInfinite, startIndex, totalSlides]);

  const translateX = canScroll ? -(currentIndex * trackStep) + dragOffset : 0;

  return (
    <div
      className={`relative w-full mx-auto select-none ${canScroll ? 'touch-pan-y cursor-grab active:cursor-grabbing' : 'cursor-default'} ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
      >
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning && !isDragging ? `transform ${speed}ms ${easing}` : 'none',
            pointerEvents: canScroll ? 'auto' : 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, i) => (
            <div
              key={i}
              className={`flex-shrink-0 h-full ${slideClassName}`}
              style={{ width: itemWidth, marginRight: `${gap}px` }}
            >
              <div className="w-full h-full flex items-center justify-center p-4 transition-transform duration-300">
                {slide}
              </div>
            </div>
          ))}
        </div>

        {canScroll && arrows && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-md hover:bg-white dark:hover:bg-gray-700 transition z-10" aria-label="Previous">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-md hover:bg-white dark:hover:bg-gray-700 transition z-10" aria-label="Next">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        {canScroll && pagination && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i + startIndex)}
                className={`h-2 rounded-full transition-all duration-300 ${realIndex === i ? 'w-6 bg-indigo-500 dark:bg-indigo-400' : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel;