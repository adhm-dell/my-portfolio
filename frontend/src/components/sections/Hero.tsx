import { useTranslation } from 'react-i18next';
import { Layers, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export function Hero() {
  const { t, i18n } = useTranslation();
  
  const { data: rawSettings } = useQuery({
    queryKey: ['heroSettings'],
    queryFn: async () => {
      const { data } = await api.get('/hero-settings');
      return data;
    }
  });

  const isAr = i18n.language === 'ar';
  
  const settings = rawSettings ? {
    terminalCode: isAr ? rawSettings.terminalCodeAr : rawSettings.terminalCodeEn,
    projectTitle: isAr ? rawSettings.projectTitleAr : rawSettings.projectTitleEn,
    projectDesc: isAr ? rawSettings.projectDescAr : rawSettings.projectDescEn,
    projectTags: isAr ? rawSettings.projectTagsAr : rawSettings.projectTagsEn,
    projectLink: rawSettings.projectLink,
    
    badgeText: isAr ? rawSettings.badgeTextAr : rawSettings.badgeTextEn,
    heading: isAr ? rawSettings.headingAr : rawSettings.headingEn,
    subHeading: isAr ? rawSettings.subHeadingAr : rawSettings.subHeadingEn,
    description: isAr ? rawSettings.descriptionAr : rawSettings.descriptionEn,
    ctaText: isAr ? rawSettings.ctaTextAr : rawSettings.ctaTextEn,
    
    stat1Value: rawSettings.stat1Value,
    stat1Label: isAr ? rawSettings.stat1LabelAr : rawSettings.stat1LabelEn,
    stat1Subtext: isAr ? rawSettings.stat1SubtextAr : rawSettings.stat1SubtextEn,
    
    stat2Value: rawSettings.stat2Value,
    stat2Subtext: isAr ? rawSettings.stat2SubtextAr : rawSettings.stat2SubtextEn,

    stat3Value: rawSettings.stat3Value,
    stat3Subtext: isAr ? rawSettings.stat3SubtextAr : rawSettings.stat3SubtextEn,
  } : null;

  return (
    <section id="hero" className="relative pt-20 pb-24 md:pt-28 md:pb-36 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Column */}
        <div className="lg:col-span-7 space-y-7 text-start">
          
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-200/90 dark:bg-slate-900/90 border border-brand-500/30 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-brand-500 dark:bg-brand-400 animate-ping"></span>
            <span>{settings?.badgeText || "Full Stack Software Engineer & Product Builder"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
            <span className="block text-slate-600 dark:text-slate-300 font-medium text-2xl sm:text-3xl mb-2">{t('hero.greeting')} Adham Salah</span>
            <span className="gradient-text">{settings?.heading || "Building Scalable Digital Products"}</span>
            <span className="block text-slate-500 dark:text-slate-400 text-3xl sm:text-4xl mt-1 font-light">{settings?.subHeading || "From Idea to Production."}</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            {settings?.description || `${t('hero.subtitle')} Passionate Full Stack Software Engineer crafting comprehensive, resilient web platforms...`}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2 pb-2 max-w-lg border-y border-slate-300 dark:border-dark-border py-4">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono flex items-center">
                <span>{settings?.stat1Value || "3.65"}</span>
                <span className="text-xs text-brand-600 dark:text-brand-400 ml-1 font-sans">{settings?.stat1Label || "GPA"}</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{settings?.stat1Subtext || "Helwan FCI '26"}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{settings?.stat2Value || "1500+"}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{settings?.stat2Subtext || "Exercises Built"}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{settings?.stat3Value || "100%"}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{settings?.stat3Subtext || "Production Ready"}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/projects" className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-dark-bg hover:bg-slate-800 dark:hover:bg-slate-200 font-bold text-sm transition shadow-xl active:scale-95">
              <Layers className="w-4 h-4 text-brand-400 dark:text-brand-600" />
              <span>{settings?.ctaText || t('hero.cta')}</span>
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
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-7 shadow-2xl relative h-full flex flex-col border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="font-mono text-[11px] text-slate-400 flex items-center gap-2">
                <span>adham_salah.config.ts</span>
              </div>
              <div className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                v2.6.0-stable
              </div>
            </div>
            
            <div className="font-mono text-sm space-y-2.5 mb-8 text-slate-300">
              {settings?.terminalCode.split('\n').map((line: string, i: number) => (
                <div key={i} className="flex">
                  <span className="text-slate-600 w-6 text-right mr-4 select-none text-xs leading-[20px]">{String(i + 1).padStart(2, '0')}</span>
                  <div className="leading-[20px] whitespace-pre-wrap">{line}</div>
                </div>
              ))}
            </div>

            <Link to={settings?.projectLink || "#"} className="mt-auto bg-slate-800/40 rounded-2xl p-5 border border-slate-700/50 group hover:border-emerald-500/30 transition-colors block">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1e293b] border border-slate-700/80 shadow-inner flex items-center justify-center">
                    <div className="w-6 h-6 rounded bg-emerald-900/60 border border-emerald-700/50"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{settings?.projectTitle}</h4>
                    <span className="text-[11px] text-slate-400">Flagship Case Study</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors pt-1">Explore</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {settings?.projectDesc}
              </p>
              <div className="flex flex-wrap gap-2">
                {settings?.projectTags.map((tech: string) => (
                  <span key={tech} className="px-2 py-1 bg-[#0f172a] text-slate-300 text-[10px] font-mono rounded-md border border-slate-800">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
