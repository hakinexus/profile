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
  const [topPosition, setTopPosition] = useState('0px');

  useEffect(() => {
    const calculatePosition = () => {
      if (!cardRef.current) return;
      
      const windowHeight = window.innerHeight;
      const cardHeight = cardRef.current.offsetHeight;
      
      // Set headerOffset to 0 so cards stick to the very top of the screen.
      // This allows them to go behind the floating header pill and completely
      // cover the previous cards, fixing the visual bug where previous sections peek through.
      const headerOffset = 0;
      
      // If the card is taller than the viewport (minus the header offset),
      // we need to let it scroll to its bottom before it sticks.
      // So we set the top position to be a negative value that aligns its bottom with the viewport bottom.
      if (cardHeight > windowHeight - headerOffset) {
        // We want the bottom of the card to align with the bottom of the viewport.
        // top = windowHeight - cardHeight
        // But we also want to ensure it doesn't stick higher than the header offset if it somehow shrinks.
        setTopPosition(`${windowHeight - cardHeight}px`);
      } else {
        // If it's shorter, just stick it below the header
        setTopPosition(`${headerOffset}px`);
      }
    };

    // Calculate initially and on resize
    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    
    // Also observe the element itself in case its content changes size
    const observer = new ResizeObserver(calculatePosition);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      window.removeEventListener('resize', calculatePosition);
      observer.disconnect();
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{ 
        top: topPosition,
        zIndex: index + 10,
        // Add margin bottom so the next card doesn't immediately cover this one when it sticks.
        // The last card doesn't need this margin.
        marginBottom: index === total - 1 ? '0' : '40vh',
      }}
      className={cn(
        "sticky w-full overflow-hidden",
        "bg-white/40 backdrop-blur-2xl border-t border-white/60 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]",
        "rounded-t-[2rem] md:rounded-t-[3rem]",
        // Add padding at the bottom so content doesn't get cut off by the next card
        "pb-24 md:pb-32",
        className
      )}
    >
      {/* Inner glare effect for the glass card */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      
      {children}
    </div>
  );
}
