import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Layers } from 'lucide-react';
import api from '../../lib/api';

import { Link } from 'react-router';

export function TechStack({ featuredOnly }: { featuredOnly?: boolean }) {
  const { t, i18n } = useTranslation();
  const { data: categories, isLoading } = useQuery({
    queryKey: ['skills', featuredOnly],
    queryFn: async () => {
      const { data } = await api.get(featuredOnly ? '/skills?featured=true' : '/skills');
      return data;
    }
  });

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      <div className="flex items-center gap-4 mb-16 justify-center">
        <div className="h-px bg-gradient-to-r from-transparent to-slate-300 dark:to-dark-border flex-grow max-w-[100px]"></div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Layers className="w-6 h-6 text-brand-500" />
          {t('nav.tech')}
        </h2>
        <div className="h-px bg-gradient-to-l from-transparent to-slate-300 dark:to-dark-border flex-grow max-w-[100px]"></div>
        {featuredOnly && (
          <Link to="/tech" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors ml-4">
            View All &rarr;
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse glass-panel rounded-2xl h-48"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((cat: any) => {
            const isAr = i18n.language === 'ar';
            const title = isAr ? cat.titleAr : cat.titleEn;
            
            return (
            <div key={cat.id} className="glass-panel rounded-2xl p-6 border border-slate-300 dark:border-dark-borderLight hover:border-brand-500/50 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                {cat.icon && (
                  <div dangerouslySetInnerHTML={{ __html: cat.icon }} className="w-8 h-8 text-brand-500 flex items-center justify-center bg-brand-500/10 rounded-lg" />
                )}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills?.map((skill: any) => (
                  <div key={skill.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-dark-elevated border border-slate-300 dark:border-dark-border text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500/30 transition-colors cursor-default">
                    {skill.icon && <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" />}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )})}
        </div>
      )}
    </section>
  );
}
