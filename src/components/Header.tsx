import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { MagneticButton } from './MagneticButton';

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
    >
      <div className={`
        pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full
        transition-all duration-500 w-full max-w-5xl
        ${scrolled ? 'bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.05)]' : 'bg-transparent border border-transparent'}
      `}>
        <div className="text-xl font-bold tracking-tighter text-slate-800 flex items-center gap-3 cursor-hover">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg shadow-inner border border-white/20">
            H
          </div>
          <span className="hidden sm:block font-extrabold tracking-tight">Hakinexus</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#about" className="hover:text-slate-900 transition-colors cursor-hover relative group py-2">
            About
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full rounded-full" />
          </a>
          <a href="#work" className="hover:text-slate-900 transition-colors cursor-hover relative group py-2">
            Work
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full rounded-full" />
          </a>
          <a href="#contact" className="hover:text-slate-900 transition-colors cursor-hover relative group py-2">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full rounded-full" />
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <MagneticButton variant="primary" className="px-6 py-2.5 text-sm">
            Hire Me
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
}
