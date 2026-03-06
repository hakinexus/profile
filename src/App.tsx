/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LiquidCursor } from './components/LiquidCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { GitHubCommandCenter } from './sections/GitHubCommandCenter';
import { ProjectShowcase } from './sections/ProjectShowcase';
import { TechStack } from './sections/TechStack';
import { Contact } from './sections/Contact';
import { CardStack } from './components/CardStack';

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen mesh-bg relative selection:bg-indigo-500/30 selection:text-indigo-900">
        <LiquidCursor />
        <Header />

        <main className="relative">
          {/* Hero section is not a card, it's the base layer */}
          <div id="about" className="relative z-0">
            <Hero />
          </div>

          {/* Subsequent sections are stacked cards */}
          <div className="relative z-10">
            <div id="metrics" className="relative w-full h-0" />
            <CardStack index={0} total={4}>
              <GitHubCommandCenter />
            </CardStack>
            
            <div id="work" className="relative w-full h-0" />
            <CardStack index={1} total={4}>
              <ProjectShowcase />
            </CardStack>
            
            <div id="tech" className="relative w-full h-0" />
            <CardStack index={2} total={4}>
              <TechStack />
            </CardStack>
            
            <div id="contact" className="relative w-full h-0" />
            <CardStack index={3} total={4}>
              <Contact />
              
              {/* Footer is inside the last card so it scrolls up with it */}
              <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/40 bg-white/20 backdrop-blur-md mt-16">
                <p>© {new Date().getFullYear()} Hakinexus. Crafted with Liquid Glass.</p>
              </footer>
            </CardStack>
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
