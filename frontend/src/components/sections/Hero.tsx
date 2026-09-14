import { useTranslation } from 'react-i18next';
import { Layers, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons';
import { Link } from 'react-router';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative pt-20 pb-24 md:pt-28 md:pb-36 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Column */}
        <div className="lg:col-span-7 space-y-7 text-start">
          
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-200/90 dark:bg-slate-900/90 border border-brand-500/30 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-brand-500 dark:bg-brand-400 animate-ping"></span>
            <span>Full Stack Software Engineer & Product Builder</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
            <span className="block text-slate-600 dark:text-slate-300 font-medium text-2xl sm:text-3xl mb-2">{t('hero.greeting')} Adham Salah</span>
            <span className="gradient-text">Building Scalable Digital Products</span>
            <span className="block text-slate-500 dark:text-slate-400 text-3xl sm:text-4xl mt-1 font-light">From Idea to Production.</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            {t('hero.subtitle')} Passionate Full Stack Software Engineer crafting comprehensive, resilient web platforms, real-time engines, AI systems, and robust desktop applications. Focused on engineering high-impact digital solutions that solve tangible business challenges.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2 pb-2 max-w-lg border-y border-slate-300 dark:border-dark-border py-4">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono flex items-center">
                <span>3.65</span>
                <span className="text-xs text-brand-600 dark:text-brand-400 ml-1 font-sans">GPA</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Helwan FCI '26</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">1500+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Exercises Built</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Production Ready</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/projects" className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-dark-bg hover:bg-slate-800 dark:hover:bg-slate-200 font-bold text-sm transition shadow-xl active:scale-95">
              <Layers className="w-4 h-4 text-brand-400 dark:text-brand-600" />
              <span>{t('hero.cta')}</span>
              <span className="w-5 h-5 rounded-full bg-white dark:bg-dark-bg text-slate-900 dark:text-white text-[11px] flex items-center justify-center font-mono font-bold">5+</span>
            </Link>

            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition border border-slate-300 dark:border-dark-borderLight active:scale-95">
              <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Contact Me</span>
            </Link>

            <a href="https://github.com/adhm-dell" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-xl glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition border border-slate-300 dark:border-dark-borderLight active:scale-95">
              <GithubIcon className="w-5 h-5" />
            </a>

            <a href="https://linkedin.com/in/adhm-salah-283343270" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-xl glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition border border-slate-300 dark:border-dark-borderLight active:scale-95">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Visual Feature Showcase Card */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="glass-panel glass-panel-glow rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden h-[400px]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-300 dark:border-dark-border mb-5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="font-mono text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="text-brand-600 dark:text-brand-400">~/adham/portfolio</span>
                <span className="bg-slate-200 dark:bg-slate-800 px-1.5 rounded">main</span>
              </div>
            </div>
            
            <div className="font-mono text-sm space-y-3">
              <div className="text-slate-400"><span className="text-brand-500 mr-2">❯</span>npm run dev</div>
              <div className="text-sky-400 pl-4">VITE v5.0.0  ready in 143 ms</div>
              <br/>
              <div className="text-slate-300 pl-4">➜  Local:   <a href="#" className="text-brand-400 hover:underline">http://localhost:5173/</a></div>
              <div className="text-slate-300 pl-4">➜  Network: use --host to expose</div>
              <div className="text-slate-300 pl-4">➜  Backend: <span className="text-emerald-400">Connected (PostgreSQL)</span></div>
              <br/>
              <div className="animate-pulse text-slate-500 pl-4">Waiting for changes...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
