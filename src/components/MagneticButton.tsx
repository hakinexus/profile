import { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
}

export function MagneticButton({ children, variant = 'glass', className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: 'bg-slate-900 text-white border-transparent shadow-lg hover:shadow-xl',
    secondary: 'bg-transparent text-slate-800 border-slate-300 hover:border-slate-400',
    glass: 'bg-white/60 text-slate-900 border-white/80 shadow-lg hover:shadow-xl backdrop-blur-md'
  };

  const hoverFills = {
    primary: 'bg-slate-800',
    secondary: 'bg-slate-100',
    glass: 'bg-white/80'
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'relative px-6 py-3 rounded-full overflow-hidden group border font-semibold tracking-wide transition-colors duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <div className={cn(
        "absolute inset-0 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0",
        hoverFills[variant]
      )} />
    </motion.button>
  );
}
