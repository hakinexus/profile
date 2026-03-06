import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { GlassPanel } from '../components/GlassPanel';
import { Star, Code2, Activity, Trophy, FolderGit2 } from 'lucide-react';

// Change this to your actual GitHub username
const GITHUB_USERNAME = 'hakinexus';

export function GitHubCommandCenter() {
  const [stats, setStats] = useState({ stars: 0, repos: 0, languages: [] as {name: string, percentage: number}[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user profile
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userRes.json();

        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        const reposData = await reposRes.json();

        if (Array.isArray(reposData)) {
          const stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

          // Calculate languages
          const langCounts: Record<string, number> = {};
          reposData.forEach(repo => {
            if (repo.language) {
              langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            }
          });

          const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
          const languages = Object.entries(langCounts)
            .map(([name, count]) => ({
              name,
              percentage: Math.round((count / totalLangRepos) * 100)
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 3); // Top 3

          setStats({ stars, repos: userData.public_repos || 0, languages });
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  // Fallback languages if API fails or user has no repos
  const displayLanguages = stats.languages.length > 0 ? stats.languages : [
    { name: 'TypeScript', percentage: 65 },
    { name: 'React', percentage: 25 },
    { name: 'Node.js', percentage: 10 }
  ];

  const colors = [
    { bg: 'bg-blue-500', text: 'text-blue-500', badge: 'bg-blue-50' },
    { bg: 'bg-cyan-400', text: 'text-cyan-500', badge: 'bg-cyan-50' },
    { bg: 'bg-emerald-400', text: 'text-emerald-500', badge: 'bg-emerald-50' }
  ];

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-amber-500" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800">
              Command Center
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Live metrics from my GitHub profile ({GITHUB_USERNAME}), reflecting my open-source contributions and daily coding activity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Total Stars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassPanel hoverable className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-16 h-16 rounded-full bg-amber-100/50 flex items-center justify-center mb-6 shadow-inner border border-amber-200/50">
                <Star className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-5xl font-bold text-slate-800 mb-2">
                {loading ? '...' : stats.stars}
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Total Stars</p>
            </GlassPanel>
          </motion.div>

          {/* Public Repos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassPanel hoverable className="flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-16 h-16 rounded-full bg-emerald-100/50 flex items-center justify-center mb-6 shadow-inner border border-emerald-200/50">
                <FolderGit2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-5xl font-bold text-slate-800 mb-2">
                {loading ? '...' : stats.repos}
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Public Repos</p>
            </GlassPanel>
          </motion.div>

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassPanel hoverable className="flex flex-col items-center justify-center p-8 text-center h-full relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-blue-100/50 flex items-center justify-center mb-6 shadow-inner border border-blue-200/50 z-10">
                <Code2 className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 z-10">Language Ranking</h3>
              
              <div className="w-full space-y-3 z-10">
                {displayLanguages.map((lang, index) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700 flex items-center gap-2">
                        <span className={`text-xs font-bold ${colors[index]?.text || 'text-slate-500'} ${colors[index]?.badge || 'bg-slate-50'} px-1.5 py-0.5 rounded`}>
                          #{index + 1}
                        </span> 
                        {lang.name}
                      </span>
                      <span className="text-slate-500">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                        className={`h-full ${colors[index]?.bg || 'bg-slate-400'} rounded-full`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </div>

        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <GlassPanel className="p-8 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-indigo-500" />
              <h3 className="text-2xl font-bold text-slate-800">Contribution Activity</h3>
            </div>
            
            <div className="w-full overflow-x-auto pb-4 flex justify-center">
              <div className="min-w-max p-4 bg-white/40 rounded-xl border border-white/60 shadow-inner">
                <GitHubCalendar 
                  username={GITHUB_USERNAME} 
                  colorScheme="light"
                  theme={{
                    light: ['#e2e8f0', '#c7d2fe', '#818cf8', '#4f46e5', '#312e81'],
                  }}
                  fontSize={12}
                  blockSize={12}
                  blockMargin={4}
                  blockRadius={3}
                />
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
