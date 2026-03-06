import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '../components/GlassPanel';
import { MagneticButton } from '../components/MagneticButton';
import { Star, GitFork, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Liquid UI Component Library',
    description: 'A React component library built with Framer Motion and Tailwind CSS for creating stunning glassmorphic interfaces.',
    category: 'UI Tools',
    stars: 1240,
    forks: 342,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Nexus Analytics Dashboard',
    description: 'Real-time analytics dashboard with WebSockets, D3.js visualizations, and a sleek dark mode toggle.',
    category: 'Web Apps',
    stars: 890,
    forks: 120,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'use-liquid-state',
    description: 'A lightweight state management hook for React that provides fluid transitions between states.',
    category: 'NPM Packages',
    stars: 450,
    forks: 89,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Ethereal E-Commerce',
    description: 'A headless e-commerce storefront built with Next.js, Shopify Storefront API, and Framer Motion.',
    category: 'Web Apps',
    stars: 2100,
    forks: 560,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
];

const categories = ['All', 'Web Apps', 'NPM Packages', 'UI Tools'];

export function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeTab === 'All' || project.category === activeTab
  );

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-4">
            The Arsenal
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A curated collection of my best work, open-source projects, and experiments.
          </p>
        </motion.div>

        {/* Filtering Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === category ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="group perspective-1000"
              >
                {/* We use a wrapper to handle the tilt effect */}
                <motion.div
                  whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="h-full"
                >
                  <GlassPanel hoverable className="h-full flex flex-col p-0 overflow-hidden relative">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Glare effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out" />
                      
                      {/* View Live Button (appears on hover) */}
                      <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <MagneticButton variant="glass" className="px-6 py-3 text-sm">
                          View Live <ExternalLink className="w-4 h-4 ml-1" />
                        </MagneticButton>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-slate-800">{project.title}</h3>
                        <div className="flex items-center gap-3 text-sm font-medium text-slate-600 bg-white/40 px-3 py-1 rounded-full border border-white/60">
                          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500" /> {project.stars}</span>
                          <span className="flex items-center gap-1"><GitFork className="w-4 h-4 text-slate-400" /> {project.forks}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 flex-grow">{project.description}</p>
                      <div className="mt-6">
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 bg-indigo-50/50 px-3 py-1 rounded-full border border-indigo-100/50">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
