import { motion } from 'framer-motion';
import { GlassPanel } from '../components/GlassPanel';
import { Code2, Database, Server, Layout, Smartphone, Cpu, Globe, Layers } from 'lucide-react';

const techStack = [
  { name: 'React', level: 'Expert', percentage: 95, color: 'bg-cyan-400', icon: Layout },
  { name: 'TypeScript', level: 'Expert', percentage: 90, color: 'bg-blue-500', icon: Code2 },
  { name: 'Node.js', level: 'Advanced', percentage: 85, color: 'bg-emerald-500', icon: Server },
  { name: 'Next.js', level: 'Expert', percentage: 92, color: 'bg-slate-800', icon: Globe },
  { name: 'Tailwind CSS', level: 'Expert', percentage: 98, color: 'bg-sky-400', icon: Layers },
  { name: 'Framer Motion', level: 'Advanced', percentage: 80, color: 'bg-fuchsia-500', icon: Smartphone },
  { name: 'Three.js', level: 'Proficient', percentage: 65, color: 'bg-slate-900', icon: Cpu },
  { name: 'PostgreSQL', level: 'Proficient', percentage: 70, color: 'bg-blue-400', icon: Database },
];

export function TechStack() {
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
            My primary tools and technologies, engineered for high-performance applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <GlassPanel hoverable className="p-6 group relative overflow-hidden h-full flex flex-col justify-between">
                {/* Subtle background glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${tech.color}`} />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <tech.icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/40 px-2.5 py-1 rounded-md border border-white/50">
                      {tech.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{tech.name}</h3>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Proficiency</span>
                    <span>{tech.percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                      className={`absolute top-0 left-0 h-full ${tech.color} rounded-full`}
                    />
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
