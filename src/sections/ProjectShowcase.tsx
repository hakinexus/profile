import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '../components/GlassPanel';
import { MagneticButton } from '../components/MagneticButton';
import { Star, GitFork, ExternalLink, Github, Loader2, Clock } from 'lucide-react';
import { getRelativeTime } from '../utils/time';

const GITHUB_USERNAME = 'hakinexus';

interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string;
  pushed_at: string;
}

export function ProjectShowcase() {
  const [activeTab, setActiveTab] = useState('All');
  const [projects, setProjects] = useState<Repo[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Filter out forks and repos without descriptions, then sort by stars
          const validRepos = data
            .filter(repo => !repo.fork && repo.description)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6); // Top 6 projects

          setProjects(validRepos);

          // Extract unique languages for categories
          const langs = new Set<string>();
          validRepos.forEach(repo => {
            if (repo.language) langs.add(repo.language);
          });
          setCategories(['All', ...Array.from(langs)]);
        }
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const filteredProjects = projects.filter(
    (project) => activeTab === 'All' || project.language === activeTab
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
            A curated collection of my top open-source projects, pulled directly from GitHub.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium animate-pulse">Fetching repositories...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No repositories found for {GITHUB_USERNAME}.
          </div>
        ) : (
          <>
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
                    <motion.div
                      whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="h-full"
                    >
                      <GlassPanel hoverable className="h-full flex flex-col p-0 overflow-hidden relative">
                        {/* Image Container */}
                        <div className="relative h-64 overflow-hidden bg-slate-100 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                          
                          {/* GitHub Open Graph Image */}
                          <img
                            src={`https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${project.name}`}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback if OG image fails to load
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop';
                            }}
                          />
                          
                          {/* Glare effect on hover */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out" />
                          
                          {/* Action Buttons (appears on hover) */}
                          <div className="absolute inset-0 flex items-center justify-center gap-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.homepage && (
                              <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                                <MagneticButton variant="glass" className="px-6 py-3 text-sm">
                                  Live <ExternalLink className="w-4 h-4 ml-1" />
                                </MagneticButton>
                              </a>
                            )}
                            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                              <MagneticButton variant="glass" className="px-6 py-3 text-sm">
                                Code <Github className="w-4 h-4 ml-1" />
                              </MagneticButton>
                            </a>
                          </div>
                        </div>

                        {/* Content Container */}
                        <div className="p-8 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-slate-800 truncate pr-4" title={project.name}>
                              {project.name.replace(/-/g, ' ')}
                            </h3>
                            <div className="flex items-center gap-3 text-sm font-medium text-slate-600 bg-white/40 px-3 py-1 rounded-full border border-white/60 shrink-0">
                              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500" /> {project.stargazers_count}</span>
                              <span className="flex items-center gap-1"><GitFork className="w-4 h-4 text-slate-400" /> {project.forks_count}</span>
                            </div>
                          </div>
                          <p className="text-slate-600 flex-grow line-clamp-3">{project.description}</p>
                          <div className="mt-6 flex items-center justify-between">
                            {project.language && (
                              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 bg-indigo-50/50 px-3 py-1 rounded-full border border-indigo-100/50">
                                {project.language}
                              </span>
                            )}
                            {project.pushed_at && (
                              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60">
                                <Clock className="w-3.5 h-3.5" />
                                {getRelativeTime(project.pushed_at)}
                              </div>
                            )}
                          </div>
                        </div>
                      </GlassPanel>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
