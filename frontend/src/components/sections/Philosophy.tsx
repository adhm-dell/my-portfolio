import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export function Philosophy() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const { data: principles } = useQuery({
    queryKey: ['philosophy'],
    queryFn: async () => {
      const { data } = await api.get('/philosophy');
      return data;
    }
  });

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-500">
            ENGINEERING DISCIPLINE
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 max-w-2xl">
          How I Think as a Software<br />Engineer
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-sm leading-relaxed">
          Software is not merely code; it is a system of guarantees around uptime, maintainability, type correctness, and commercial scalability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {principles?.map((p: any, index: number) => (
          <div key={p.id} className="bg-slate-50 dark:bg-[#0f172a] p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800/80 group hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="mb-6">
              <span className={`font-mono text-[11px] font-bold tracking-wider ${p.color}`}>
                {String(index + 1).padStart(2, '0')} / {isAr ? p.categoryAr : p.categoryEn}
              </span>
            </div>
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? p.titleAr : p.titleEn}
              </h3>
            </div>
            <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {isAr ? p.descriptionAr : p.descriptionEn}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
