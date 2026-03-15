import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { GlassPanel } from '../components/GlassPanel';
import { Star, Code2, Activity, Trophy, FolderGit2, Calendar as CalendarIcon, Palette } from 'lucide-react';
import React from 'react';

// Change this to your actual GitHub username
const GITHUB_USERNAME = 'hakinexus';

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, to, spring]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const THEMES = {
  indigo: ['#f1f5f9', '#c7d2fe', '#818cf8', '#4f46e5', '#312e81'],
  emerald: ['#f0fdf4', '#bbf7d0', '#4ade80', '#16a34a', '#14532d'],
  rose: ['#fff1f2', '#fecdd3', '#fb7185', '#e11d48', '#881337'],
  amber: ['#fffbeb', '#fde68a', '#f59e0b', '#b45309', '#78350f'],
};

type ThemeKey = keyof typeof THEMES;

export function GitHubCommandCenter() {
  const [stats, setStats] = useState({ stars: 0, repos: 0, languages: [] as {name: string, percentage: number}[] });
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | 'last'>('last');
  const [theme, setTheme] = useState<ThemeKey>('indigo');
  const currentYear = new Date().getFullYear();
  const years = ['last', currentYear, currentYear - 1, currentYear - 2];

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

        <div className="grid grid-cols-3 gap-3 md:gap-8 mb-12">
          {/* Total Stars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
          >
            <GlassPanel hoverable className="flex flex-col items-center justify-center p-3 md:p-8 text-center h-full group">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-amber-100/50 flex items-center justify-center mb-2 md:mb-6 shadow-inner border border-amber-200/50 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-5 h-5 md:w-8 md:h-8 text-amber-500" />
              </div>
              <h3 className="text-2xl md:text-5xl font-bold text-slate-800 mb-0.5 md:mb-2">
                {loading ? (
                  <div className="h-8 w-16 bg-slate-200 animate-pulse rounded mx-auto" />
                ) : (
                  <CountUp to={stats.stars} />
                )}
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-[9px] md:text-sm">Stars</p>
            </GlassPanel>
          </motion.div>

          {/* Public Repos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <GlassPanel hoverable className="flex flex-col items-center justify-center p-3 md:p-8 text-center h-full group">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-emerald-100/50 flex items-center justify-center mb-2 md:mb-6 shadow-inner border border-emerald-200/50 group-hover:scale-110 transition-transform duration-300">
                <FolderGit2 className="w-5 h-5 md:w-8 md:h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl md:text-5xl font-bold text-slate-800 mb-0.5 md:mb-2">
                {loading ? (
                  <div className="h-8 w-16 bg-slate-200 animate-pulse rounded mx-auto" />
                ) : (
                  <CountUp to={stats.repos} />
                )}
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-[9px] md:text-sm">Repos</p>
            </GlassPanel>
          </motion.div>

          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <GlassPanel hoverable className="flex flex-col items-center justify-center p-3 md:p-8 text-center h-full relative overflow-hidden group">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-blue-100/50 flex items-center justify-center mb-2 md:mb-6 shadow-inner border border-blue-200/50 z-10 group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-5 h-5 md:w-8 md:h-8 text-blue-500" />
              </div>
              
              {/* Desktop View */}
              <h3 className="hidden md:block text-2xl font-bold text-slate-800 mb-4 z-10">Language Ranking</h3>
              <div className="hidden md:block w-full space-y-3 z-10">
                {loading ? (
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-slate-200 animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-slate-200 animate-pulse rounded w-1/2" />
                    <div className="h-4 bg-slate-200 animate-pulse rounded w-2/3" />
                  </div>
                ) : (
                  displayLanguages.map((lang, index) => (
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
                  ))
                )}
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex flex-col items-center z-10 w-full px-1">
                <h3 className="text-lg font-bold text-slate-800 mb-0.5 break-words text-center w-full leading-tight">
                  {loading ? (
                    <div className="h-6 w-20 bg-slate-200 animate-pulse rounded mx-auto" />
                  ) : (
                    displayLanguages[0]?.name || 'Code'
                  )}
                </h3>
                <p className="text-slate-500 font-medium uppercase tracking-wider text-[9px]">Top Lang</p>
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
          <GlassPanel className="p-4 md:p-8 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Activity className={`w-6 h-6 text-${theme === 'indigo' ? 'indigo' : theme === 'emerald' ? 'emerald' : theme === 'rose' ? 'rose' : 'amber'}-500 transition-colors duration-300`} />
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">Contribution Activity</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {/* Theme Switcher */}
                <div className="flex items-center gap-1 bg-slate-100/80 backdrop-blur-sm rounded-lg p-1 border border-slate-200/60 shadow-sm mr-2">
                  {(Object.keys(THEMES) as ThemeKey[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`w-5 h-5 rounded-md transition-all ${
                        theme === t 
                          ? 'ring-2 ring-offset-1 ring-slate-300 scale-110 shadow-sm' 
                          : 'hover:scale-110 opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: THEMES[t][3] }}
                      title={`Switch to ${t} theme`}
                    />
                  ))}
                </div>

                <div className="flex bg-slate-100/80 backdrop-blur-sm rounded-lg p-1 border border-slate-200/60 shadow-sm">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year as number | 'last')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        selectedYear === year
                          ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50'
                          : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'
                      }`}
                    >
                      {year === 'last' ? 'Last 365 Days' : year}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 inline-block w-fit">
                  Showing public contributions
                </p>
              </div>
            </div>
            
            <div className="p-6 bg-white/40 rounded-2xl border border-white/60 shadow-inner text-slate-700 transition-colors duration-500">
              <div className="w-full overflow-x-auto pb-2">
                <div className="w-max mx-auto min-w-full">
                  <GitHubCalendar 
                    username={GITHUB_USERNAME} 
                    year={selectedYear}
                    colorScheme="light"
                    errorMessage="Could not fetch GitHub data. Please try again later."
                    theme={{
                      light: THEMES[theme],
                    }}
                    fontSize={12}
                    blockSize={13}
                    blockMargin={4}
                    blockRadius={3}
                    showColorLegend={false}
                    showTotalCount={true}
                    showWeekdayLabels={['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']}
                    tooltips={{
                      activity: {
                        text: (activity) => `${activity.count} contributions on ${activity.date}`,
                      }
                    }}
                    labels={{
                      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                      totalCount: `{{count}} contributions in ${selectedYear === 'last' ? 'the last year' : selectedYear}`,
                    }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-2 text-xs text-slate-600 mt-2 px-1">
                <span>Less</span>
                <div className="flex gap-1">
                  {THEMES[theme].map((color) => (
                    <div 
                      key={color} 
                      className="w-[13px] h-[13px] rounded-[3px] transition-colors duration-500" 
                      style={{ backgroundColor: color }} 
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
