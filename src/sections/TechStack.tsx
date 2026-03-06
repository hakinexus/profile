import { useRef } from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'React', level: 'Expert', color: 'bg-cyan-400', size: 'w-32 h-32', delay: 0 },
  { name: 'TypeScript', level: 'Expert', color: 'bg-blue-500', size: 'w-28 h-28', delay: 0.2 },
  { name: 'Node.js', level: 'Advanced', color: 'bg-emerald-500', size: 'w-24 h-24', delay: 0.4 },
  { name: 'Next.js', level: 'Expert', color: 'bg-slate-800', size: 'w-36 h-36', delay: 0.1 },
  { name: 'Tailwind', level: 'Expert', color: 'bg-sky-400', size: 'w-20 h-20', delay: 0.3 },
  { name: 'Framer', level: 'Advanced', color: 'bg-fuchsia-500', size: 'w-24 h-24', delay: 0.5 },
  { name: 'Three.js', level: 'Proficient', color: 'bg-slate-900', size: 'w-28 h-28', delay: 0.2 },
  { name: 'GraphQL', level: 'Proficient', color: 'bg-pink-500', size: 'w-20 h-20', delay: 0.6 },
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-4">
            The Liquid Core
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            My primary tools and technologies, ranked by proficiency.
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative h-[600px] w-full max-w-4xl mx-auto flex items-center justify-center"
        >
          {/* We use CSS animations for the floating effect to keep it lightweight, 
              combined with framer-motion for the initial reveal */}
          {techStack.map((tech, index) => {
            // Calculate a random position within a radius
            const angle = (index / techStack.length) * Math.PI * 2;
            const radius = 150 + Math.random() * 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, scale: 1, x, y }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: tech.delay,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                className="absolute"
                style={{
                  // Add a subtle continuous floating animation using CSS
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                <div 
                  className={`
                    ${tech.size} rounded-full flex flex-col items-center justify-center
                    glass-panel border-2 border-white/60 shadow-xl
                    transition-transform duration-300 hover:scale-110 cursor-hover
                    relative overflow-hidden group
                  `}
                >
                  {/* Subtle color tint based on the tech */}
                  <div className={`absolute inset-0 opacity-20 ${tech.color} mix-blend-overlay`} />
                  
                  {/* Glare effect */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full" />
                  
                  <div className="flex flex-col items-center justify-center z-10 drop-shadow-sm">
                    <span className="font-bold text-slate-800 text-center px-2">
                      {tech.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600/80 mt-1">
                      {tech.level}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </section>
  );
}
