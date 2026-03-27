import { useRef, useState, useEffect } from 'react';
import { cn } from '../utils/cn';

interface CardStackProps {
  children: React.ReactNode;
  index: number;
  total: number;
  className?: string;
}

export function CardStack({ children, index, total, className }: CardStackProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(0);
  const triggerYRef = useRef(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const calculatePosition = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!cardRef.current) return;
      
      // If switching to mobile, ensure styles are reset
      if (mobile) {
        cardRef.current.style.opacity = '1';
        cardRef.current.style.visibility = 'visible';
        cardRef.current.style.pointerEvents = 'auto';
        return;
      }
      
      const windowHeight = window.innerHeight;
      const cardHeight = cardRef.current.offsetHeight;
      const headerOffset = 0;
      
      let newTop = 0;
      if (cardHeight > windowHeight - headerOffset) {
        newTop = windowHeight - cardHeight;
      } else {
        newTop = headerOffset;
      }
      setTopPosition(newTop);

      // Pre-calculate the exact scroll Y where occlusion should happen
      if (markerRef.current) {
        const rect = markerRef.current.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const marginBottom = windowHeight * 0.4; // 40vh margin
        triggerYRef.current = absoluteTop + cardHeight + marginBottom - newTop;
      }
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    
    const observer = new ResizeObserver(calculatePosition);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      window.removeEventListener('resize', calculatePosition);
      observer.disconnect();
    };
  }, [index]);

  useEffect(() => {
    if (index === total - 1) return; // The last card never hides
    if (isMobile) return; // Disable scroll listener entirely on mobile/iPad

    let ticking = false;
    let isCurrentlyHidden = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!cardRef.current || isMobile) {
            ticking = false;
            return;
          }

          const scrollY = window.scrollY;
          const triggerY = triggerYRef.current;
          const fadeStart = triggerY - 400;

          // Direct DOM mutation completely bypasses React's render cycle.
          // This eliminates layout thrashing and guarantees 60fps scrolling.
          if (scrollY >= triggerY) {
            if (!isCurrentlyHidden) {
              cardRef.current.style.opacity = '0';
              cardRef.current.style.visibility = 'hidden';
              cardRef.current.style.pointerEvents = 'none';
              isCurrentlyHidden = true;
            }
          } else if (scrollY >= fadeStart) {
            const progress = 1 - ((scrollY - fadeStart) / (triggerY - fadeStart));
            cardRef.current.style.opacity = progress.toString();
            cardRef.current.style.visibility = 'visible';
            cardRef.current.style.pointerEvents = 'auto';
            isCurrentlyHidden = false;
          } else {
            if (isCurrentlyHidden || cardRef.current.style.opacity !== '1') {
              cardRef.current.style.opacity = '1';
              cardRef.current.style.visibility = 'visible';
              cardRef.current.style.pointerEvents = 'auto';
              isCurrentlyHidden = false;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [index, total, isMobile]);

  return (
    <>
      <div ref={markerRef} className="w-full h-0" />
      
      <div
        ref={cardRef}
        style={{ 
          top: isMobile ? 'auto' : `${topPosition}px`,
          zIndex: index + 10,
          marginBottom: isMobile ? '0' : (index === total - 1 ? '0' : '40vh'),
          // Force GPU acceleration to prevent paint lag on desktop
          transform: isMobile ? 'none' : 'translateZ(0)',
          willChange: isMobile ? 'auto' : 'transform, opacity, visibility',
        }}
        className={cn(
          "w-full overflow-hidden",
          isMobile ? "relative" : "sticky",
          // Reduce blur slightly on mobile (xl instead of 2xl) for massive performance gain, keep 2xl on desktop
          "bg-white/40 backdrop-blur-xl md:backdrop-blur-2xl border-t border-white/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]",
          "rounded-t-[2rem] md:rounded-t-[3rem]",
          "pb-24 md:pb-32",
          className
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        
        {children}
      </div>
    </>
  );
}
