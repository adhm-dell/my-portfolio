import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export function About() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const { data: features } = useQuery({
    queryKey: ['about-features'],
    queryFn: async () => {
      const { data } = await api.get('/about-features');
      return data;
    }
  });

  const { data: profiles } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/profile');
      return data;
    }
  });

  const profile = profiles?.[0];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-500">
            ABOUT MY PHILOSOPHY
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-12 max-w-2xl leading-tight">
          Full Lifecycle Software Engineering for Production Realities
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (dynamic features) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features?.map((feature: any) => (
            <div key={feature.id} className="bg-slate-50 dark:bg-[#0f172a] p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1e293b] border border-slate-700/50 shadow-inner flex items-center justify-center">
                  <div className={`w-5 h-5 rounded border ${feature.iconColor.replace('bg-', 'border-').replace('/60', '/50')} ${feature.iconColor}`}></div>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{isAr ? feature.titleAr : feature.titleEn}</h3>
              </div>
              <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {isAr ? feature.descriptionAr : feature.descriptionEn}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column (dynamic profile info) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-50 dark:bg-[#0f172a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1e293b] border border-slate-700/50 shadow-inner"></div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Formal Education</h3>
                <span className="text-[11px] text-slate-500">Class of {profile?.graduationYear || '2026'}</span>
              </div>
            </div>
            <p className="text-[13px] text-slate-700 dark:text-slate-300 font-medium mb-4">
              {isAr ? profile?.educationAr : profile?.educationEn}
            </p>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-slate-500">Cumulative GPA</span>
              <span className="text-emerald-400">{profile?.gpa || 'N/A'}</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#0f172a] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1e293b] border border-slate-700/50 shadow-inner"></div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Industry Experience</h3>
                <span className="text-[11px] text-slate-500">Current Role</span>
              </div>
            </div>
            <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {isAr ? profile?.bioAr : profile?.bioEn}
            </p>
          </div>

          <a href={profile?.githubUrl || '#'} target="_blank" rel="noreferrer" className="bg-slate-50 dark:bg-[#0f172a] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 transition-colors flex justify-between items-center group cursor-pointer">
            <div>
              <div className="text-[11px] text-slate-500 mb-1">Quick Connect</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors">Github</div>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">Explore Repos</span>
          </a>
        </div>
      </div>
    </section>
  );
}
