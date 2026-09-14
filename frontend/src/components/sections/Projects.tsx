import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../icons';
import { Link } from 'react-router';
import api, { getMediaUrl } from '../../lib/api';

export function Projects({ featuredOnly }: { featuredOnly?: boolean }) {
  const { t, i18n } = useTranslation();
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', featuredOnly],
    queryFn: async () => {
      const { data } = await api.get(featuredOnly ? '/projects?featured=true' : '/projects');
      return data;
    }
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          <span className="text-brand-600 dark:text-brand-400 font-mono text-xl mr-2">02.</span>
          {t('nav.projects')}
        </h2>
        <div className="h-px bg-slate-300 dark:bg-dark-border flex-grow max-w-xs"></div>
        {featuredOnly && (
          <Link to="/projects" className="ml-auto text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors">
            View All &rarr;
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse glass-panel rounded-2xl h-80"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project: any) => {
            const isAr = i18n.language === 'ar';
            const title = isAr ? project.titleAr : project.titleEn;
            const description = isAr ? project.descriptionAr : project.descriptionEn;
            const tags = project.technologies || [];
            return (
            <div key={project.id} className="group glass-panel rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-300 dark:border-dark-borderLight flex flex-col">
              <Link to={`/project/${project.slug}`} className="h-48 overflow-hidden relative shrink-0 block">
                {project.coverImageUrl ? (
                  <img src={getMediaUrl(project.coverImageUrl)} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">No Image</div>
                )}
                <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/50 group-hover:bg-transparent transition-colors duration-300"></div>
              </Link>
              <div className="p-6 flex flex-col grow">
                <Link to={`/project/${project.slug}`}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{title}</h3>
                </Link>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 grow">{description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="badge-code px-2 py-1 rounded text-[10px] font-mono">{tag}</span>
                  ))}
                  {tags.length > 3 && (
                    <span className="badge-code px-2 py-1 rounded text-[10px] font-mono">+{tags.length - 3}</span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )})}
        </div>
      )}
    </section>
  );
}
