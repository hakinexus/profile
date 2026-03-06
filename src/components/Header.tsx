import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MagneticButton } from './MagneticButton';
import { Menu, X } from 'lucide-react';

const GITHUB_USERNAME = 'hakinexus';

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(res => res.json())
      .then(data => {
        if (data.avatar_url) setAvatarUrl(data.avatar_url);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'work', 'tech', 'contact'];
      let current = 'about';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the anchor is above the middle of the viewport
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu on click
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop - 100, // offset for header
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pt-4 sm:pt-6 px-4 pointer-events-none"
    >
      <div className={`
        pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-full
        transition-all duration-500 w-full max-w-5xl relative
        ${scrolled || isMobileMenuOpen ? 'bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.05)]' : 'bg-transparent border border-transparent'}
      `}>
        <div 
          className="text-xl font-bold tracking-tighter text-slate-800 flex items-center gap-3 cursor-pointer" 
          onClick={(e) => scrollTo(e, 'about')}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" className="w-10 h-10 rounded-full border border-white/40 shadow-sm object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg shadow-inner border border-white/20">
              H
            </div>
          )}
          <span className="font-extrabold tracking-tight">Hakinexus</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a 
            href="#about" 
            onClick={(e) => scrollTo(e, 'about')}
            className={`transition-colors cursor-hover relative group py-2 ${activeSection === 'about' ? 'text-indigo-600' : 'hover:text-slate-900'}`}
          >
            About
            <span className={`absolute bottom-0 left-0 h-[2px] bg-indigo-500 transition-all duration-300 rounded-full ${activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </a>
          <a 
            href="#work" 
            onClick={(e) => scrollTo(e, 'work')}
            className={`transition-colors cursor-hover relative group py-2 ${activeSection === 'work' ? 'text-indigo-600' : 'hover:text-slate-900'}`}
          >
            Work
            <span className={`absolute bottom-0 left-0 h-[2px] bg-indigo-500 transition-all duration-300 rounded-full ${activeSection === 'work' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </a>
          <a 
            href="#tech" 
            onClick={(e) => scrollTo(e, 'tech')}
            className={`transition-colors cursor-hover relative group py-2 ${activeSection === 'tech' ? 'text-indigo-600' : 'hover:text-slate-900'}`}
          >
            Tech
            <span className={`absolute bottom-0 left-0 h-[2px] bg-indigo-500 transition-all duration-300 rounded-full ${activeSection === 'tech' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </a>
          <a 
            href="#contact" 
            onClick={(e) => scrollTo(e, 'contact')}
            className={`transition-colors cursor-hover relative group py-2 ${activeSection === 'contact' ? 'text-indigo-600' : 'hover:text-slate-900'}`}
          >
            Contact
            <span className={`absolute bottom-0 left-0 h-[2px] bg-indigo-500 transition-all duration-300 rounded-full ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </a>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-4">
          <MagneticButton variant="primary" className="px-6 py-2.5 text-sm" onClick={(e: any) => scrollTo(e, 'contact')}>
            Hire Me
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors pointer-events-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-full left-4 right-4 mt-2 p-6 rounded-3xl bg-white/90 backdrop-blur-3xl border border-white/60 shadow-2xl flex flex-col gap-6 md:hidden"
          >
            <nav className="flex flex-col gap-4 text-lg font-semibold text-slate-600 text-center">
              <a href="#about" onClick={(e) => scrollTo(e, 'about')} className={`py-2 ${activeSection === 'about' ? 'text-indigo-600' : ''}`}>About</a>
              <a href="#work" onClick={(e) => scrollTo(e, 'work')} className={`py-2 ${activeSection === 'work' ? 'text-indigo-600' : ''}`}>Work</a>
              <a href="#tech" onClick={(e) => scrollTo(e, 'tech')} className={`py-2 ${activeSection === 'tech' ? 'text-indigo-600' : ''}`}>Tech</a>
              <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className={`py-2 ${activeSection === 'contact' ? 'text-indigo-600' : ''}`}>Contact</a>
            </nav>
            <button 
              onClick={(e) => scrollTo(e, 'contact')}
              className="w-full py-4 rounded-full bg-slate-900 text-white font-semibold shadow-lg active:scale-95 transition-transform"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
