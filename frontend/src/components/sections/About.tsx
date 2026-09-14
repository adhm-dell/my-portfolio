import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export function About() {
  const { t, i18n } = useTranslation();
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ['aboutContent'],
    queryFn: async () => {
      const { data } = await api.get('/profile/about');
      return data;
    }
  });

  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          <span className="text-brand-600 dark:text-brand-400 font-mono text-xl mr-2">01.</span>
          {t('nav.about')}
        </h2>
        <div className="h-px bg-slate-300 dark:bg-dark-border flex-grow max-w-xs"></div>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4 max-w-3xl">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-700 dark:text-slate-400 leading-relaxed">
          {aboutContent?.map((item: any, index: number) => {
            const isAr = i18n.language === 'ar';
            const paragraph = isAr ? item.paragraphAr : item.paragraphEn;
            
            return (
            <div key={item.id} className={index === aboutContent.length - 1 ? 'md:col-span-2 md:w-1/2' : ''}>
              <p className="mb-4">{paragraph}</p>
            </div>
          )})}
        </div>
      )}
    </section>
  );
}
