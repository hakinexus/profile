import { motion } from 'framer-motion';
import { HeroBlob } from '../components/HeroBlob';
import { MagneticButton } from '../components/MagneticButton';
import { GlassPanel } from '../components/GlassPanel';
import { Github } from 'lucide-react';

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop, // Scroll exactly to the anchor (0 offset) since cards now stick to 0px
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      <HeroBlob />
      
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6 text-slate-900 drop-shadow-sm leading-[0.9]">
            Digital <br className="hidden md:block" />
            <span className="font-light italic text-slate-500">
              Artisan.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            I build fluid, high-performance web applications with a focus on God-level user experience and modern aesthetics.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton variant="glass" className="text-lg px-8 py-4" onClick={() => scrollTo('work')}>
              View My Arsenal
            </MagneticButton>
            
            <MagneticButton variant="secondary" className="text-lg px-8 py-4" onClick={() => scrollTo('contact')}>
              Let's Connect
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Live GitHub Status Pill */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-24 right-8 z-20 hidden md:block"
      >
        <GlassPanel className="py-2.5 px-5 rounded-full flex items-center gap-3 shadow-sm border border-white/60 bg-white/40">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Github className="w-4 h-4" /> Last commit 2 hours ago
          </span>
        </GlassPanel>
      </motion.div>
      
      {/* Scroll indicator - Hidden on very small screens to prevent overflow */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 opacity-60"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-slate-500">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}
