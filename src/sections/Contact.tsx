import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '../components/GlassPanel';
import { MagneticButton } from '../components/MagneticButton';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ready to build something extraordinary? Drop me a line.
          </p>
        </motion.div>

        <motion.div
          initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          whileInView={isMobile ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassPanel className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 bg-white/30 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/50 transition-all duration-300 shadow-inner text-slate-800 placeholder-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-white/30 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/50 transition-all duration-300 shadow-inner text-slate-800 placeholder-slate-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 ml-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/30 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/50 transition-all duration-300 shadow-inner text-slate-800 placeholder-slate-400 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-4 flex justify-end">
                <MagneticButton
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="px-8 py-4 disabled:opacity-80 disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </motion.div>
                    ) : isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 text-emerald-400"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Message Sent</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </MagneticButton>
              </div>
            </form>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
