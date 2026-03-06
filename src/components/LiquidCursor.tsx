import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function LiquidCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
      }}
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 12),
        y: mousePosition.y - (isHovering ? 24 : 12),
        scale: isHovering ? 2 : 1,
        opacity: isHovering ? 0.5 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
    />
  );
}
