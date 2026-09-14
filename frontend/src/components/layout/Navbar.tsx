import { useTranslation } from 'react-i18next';
import { Globe, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');

  // Handle language switch
  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('en') ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
  };

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.theme = nextTheme;
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <header className="sticky top-4 z-40 max-w-7xl mx-auto px-4 sm:px-6">
      <nav className="glass-panel rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl shadow-black/40 border border-dark-border/80">
        {/* Logo & Status */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 p-0.5 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
              <span className="font-mono font-bold text-lg text-brand-400">AS</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-white tracking-tight">Adham Salah</span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400 animate-pulse"></span>
                <span>{t('common.available_for_work')}</span>
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Full Stack Engineer</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link to="/about" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition">{t('nav.about')}</Link>
          <Link to="/projects" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition">{t('nav.projects')}</Link>
          <Link to="/tech" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition">{t('nav.tech')}</Link>
          <Link to="/philosophy" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition">{t('nav.philosophy')}</Link>
          <Link to="/experience" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition">{t('nav.experience')}</Link>
          <Link to="/contact" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition">{t('nav.contact')}</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button onClick={toggleTheme} className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300/80 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-dark-border text-slate-700 dark:text-slate-200 transition shadow-inner">
             {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <button onClick={toggleLanguage} className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300/80 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-dark-border text-xs font-semibold text-slate-700 dark:text-slate-200 transition shadow-inner">
            <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
            <span className="text-[10px] text-brand-600 dark:text-brand-400 font-mono bg-brand-500/10 px-1.5 py-0.5 rounded border border-brand-500/20">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-sky-500 hover:from-brand-600 hover:to-sky-600 text-white dark:text-dark-bg font-semibold text-xs px-4 py-2 rounded-xl transition shadow-lg shadow-brand-500/20 active:scale-95">
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
