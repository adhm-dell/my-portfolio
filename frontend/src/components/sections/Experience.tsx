import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Briefcase } from 'lucide-react';
import api from '../../lib/api';

import { Link } from 'react-router';

export function Experience({ featuredOnly }: { featuredOnly?: boolean }) {
  const { t, i18n } = useTranslation();
  const { data: experience, isLoading } = useQuery({
    queryKey: ['experience', featuredOnly],
    queryFn: async () => {
      const { data } = await api.get(featuredOnly ? '/experience?featured=true' : '/experience');
      return data;
    }
  });

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto relative">
      <div className="flex items-center gap-4 mb-16 justify-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-brand-500" />
          {t('nav.experience')}
        </h2>
        {featuredOnly && (
          <Link to="/experience" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors ml-4">
            View All &rarr;
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse glass-panel rounded-2xl h-40"></div>
          ))}
        </div>
      ) : (
        <div className="relative border-l border-slate-300 dark:border-dark-borderLight ml-3 space-y-12">
            {experience?.map((exp: any) => {
            const isAr = i18n.language === 'ar';
            const role = isAr ? exp.roleAr : exp.roleEn;
            const description = isAr ? exp.descriptionAr : exp.descriptionEn;
            const responsibilities = isAr ? exp.responsibilitiesAr : exp.responsibilitiesEn;
            
            return (
            <div key={exp.id} className="relative pl-8">
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 bg-brand-500 rounded-full -left-2 top-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)] border-4 border-slate-100 dark:border-dark-bg"></div>
              
              <div className="glass-panel p-6 rounded-2xl border border-slate-300 dark:border-dark-borderLight hover:border-brand-500/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{role}</h3>
                    <div className="text-brand-600 dark:text-brand-400 font-medium">{exp.company}</div>
                  </div>
                  <div className="text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-dark-elevated px-3 py-1 rounded-full self-start">
                    {exp.durationLabel}
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-4 whitespace-pre-line leading-relaxed">
                  {description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {responsibilities?.map((resp: string) => (
                    <span key={resp} className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-800/50 px-2 py-1 rounded">
                      {resp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )})}
        </div>
      )}
    </section>
  );
}
