import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import api, { getMediaUrl } from '../lib/api';

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data } = await api.get(`/projects/${slug}`);
      return data;
    },
    retry: false
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          <div className="h-10 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-24 px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Project Not Found</h1>
        <Link to="/" className="text-brand-600 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const title = isAr ? project.titleAr : project.titleEn;
  const subtitle = isAr ? project.subtitleAr : project.subtitleEn;
  const description = isAr ? project.descriptionAr : project.descriptionEn;
  const problem = isAr ? project.problemAr : project.problemEn;
  const solution = isAr ? project.solutionAr : project.solutionEn;
  const features = isAr ? project.featuresAr : project.featuresEn;
  const tags = project.technologies || [];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        {isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
      </Link>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">{title}</h1>
          <h2 className="text-xl sm:text-2xl font-medium text-brand-600 dark:text-brand-400 mb-6">{subtitle}</h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag: string) => (
              <span key={tag} className="badge-code px-3 py-1.5 rounded-lg text-sm font-mono">{tag}</span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition shadow-lg shadow-brand-500/25">
                <ExternalLink className="w-5 h-5" />
                {isAr ? 'زيارة الموقع' : 'Visit Live Site'}
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition">
                <GithubIcon className="w-5 h-5" />
                {isAr ? 'عرض الكود' : 'Source Code'}
              </a>
            )}
          </div>
        </div>

        {/* Hero Media */}
        <div className="h-full min-h-[300px] rounded-3xl overflow-hidden shadow-2xl relative">
          {project.coverImageUrl ? (
            <img src={getMediaUrl(project.coverImageUrl)} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">No Image</div>
          )}
        </div>
      </div>

      {/* Problem / Solution Section */}
      {(problem || solution) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {problem && (
            <div className="glass-panel p-8 rounded-3xl border border-slate-300 dark:border-dark-borderLight">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {isAr ? 'المشكلة' : 'The Problem'}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{problem}</p>
            </div>
          )}
          {solution && (
            <div className="glass-panel p-8 rounded-3xl border border-slate-300 dark:border-dark-borderLight bg-brand-50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-500/20">
              <h3 className="text-2xl font-bold text-brand-700 dark:text-brand-400 mb-4">
                {isAr ? 'الحل' : 'The Solution'}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{solution}</p>
            </div>
          )}
        </div>
      )}

      {/* Features Section */}
      {features && features.length > 0 && (
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            {isAr ? 'المميزات الرئيسية' : 'Key Features'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
                <p className="text-slate-700 dark:text-slate-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Gallery */}
      {project.media && project.media.length > 0 && (
        <div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            {isAr ? 'معرض الصور والفيديو' : 'Media Gallery'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.media.map((item: any) => (
              <div key={item.id} className="rounded-2xl overflow-hidden shadow-lg border border-slate-300 dark:border-dark-borderLight aspect-video bg-slate-900">
                {item.type === 'IMAGE' && (
                  <img src={getMediaUrl(item.url)} alt={item.titleEn || title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
                )}
                {item.type === 'VIDEO_UPLOAD' && (
                  <video src={getMediaUrl(item.url)} controls className="w-full h-full object-contain" />
                )}
                {item.type === 'YOUTUBE' && (
                  <iframe 
                    src={item.url.replace('watch?v=', 'embed/')} 
                    title={item.titleEn || 'YouTube video'}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
