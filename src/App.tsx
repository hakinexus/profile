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

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen mesh-bg relative selection:bg-indigo-500/30 selection:text-indigo-900">
        <LiquidCursor />
        <Header />

        <main>
          <div id="about">
            <Hero />
          </div>
          <GitHubCommandCenter />
          <div id="work">
            <ProjectShowcase />
            <TechStack />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </main>

        <footer className="py-8 text-center text-slate-500 text-sm relative z-10 border-t border-white/40 bg-white/20 backdrop-blur-md">
          <p>© {new Date().getFullYear()} Hakinexus. Crafted with Liquid Glass.</p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
