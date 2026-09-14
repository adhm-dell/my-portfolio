import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowUp, ArrowDown, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import api from '../../lib/api';

const defaultForm = {
  titleEn: '', titleAr: '',
  subtitleEn: '', subtitleAr: '',
  descriptionEn: '', descriptionAr: '',
  problemEn: '', problemAr: '',
  solutionEn: '', solutionAr: '',
  featuresEn: '', featuresAr: '',
  technologies: '',
  liveUrl: '', githubUrl: '',
  coverImageUrl: '', category: 'web',
  badgeEn: '', badgeAr: '',
  year: new Date().getFullYear(),
  slug: '', isFeatured: false
};

export function ProjectsManager() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get('/projects');
      return data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.post('/admin/projects', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      await api.patch(`/admin/projects/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string, newOrder: number }) => {
      await api.patch(`/admin/projects/${id}`, { order: newOrder });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const moveUp = (index: number) => {
    if (index === 0) return;
    const current = projects[index];
    const above = projects[index - 1];
    updateOrderMutation.mutate({ id: current.id, newOrder: above.order });
    updateOrderMutation.mutate({ id: above.id, newOrder: current.order });
  };

  const moveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const current = projects[index];
    const below = projects[index + 1];
    updateOrderMutation.mutate({ id: current.id, newOrder: below.order });
    updateOrderMutation.mutate({ id: below.id, newOrder: current.order });
  };

  const openModal = (project?: any) => {
    if (project) {
      setEditingId(project.id);
      setForm({
        ...project,
        featuresEn: project.featuresEn?.join('\n') || '',
        featuresAr: project.featuresAr?.join('\n') || '',
        technologies: project.technologies?.join(', ') || ''
      });
    } else {
      setEditingId(null);
      setForm(defaultForm);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm(defaultForm);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      year: Number(form.year),
      featuresEn: form.featuresEn.split('\n').filter(Boolean),
      featuresAr: form.featuresAr.split('\n').filter(Boolean),
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Projects Manager</h1>
        <button onClick={() => openModal()} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="p-4 font-medium text-slate-400">Order</th>
              <th className="p-4 font-medium text-slate-400">Title (En)</th>
              <th className="p-4 font-medium text-slate-400">Category</th>
              <th className="p-4 font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {projects?.map((project: any, index: number) => (
              <tr key={project.id} className="hover:bg-slate-700/50">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => moveDown(index)} disabled={index === projects.length - 1} className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <span className="ml-2 w-4 text-center">{project.order}</span>
                  </div>
                </td>
                <td className="p-4 font-medium text-white">{project.titleEn}</td>
                <td className="p-4 text-slate-400 capitalize">{project.category}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => openModal(project)} className="text-sky-400 hover:text-sky-300 p-2"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => { if(window.confirm('Delete project?')) deleteMutation.mutate(project.id); }} className="text-red-400 hover:text-red-300 p-2"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Slug (URL friendly)</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                  <select required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="saas">SaaS</option>
                    <option value="desktop">Desktop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Title (En)</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Title (Ar)</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.titleAr} onChange={e => setForm({...form, titleAr: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Subtitle (En)</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.subtitleEn} onChange={e => setForm({...form, subtitleEn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Subtitle (Ar)</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.subtitleAr} onChange={e => setForm({...form, subtitleAr: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description (En)</label>
                  <textarea required rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description (Ar)</label>
                  <textarea required rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.descriptionAr} onChange={e => setForm({...form, descriptionAr: e.target.value})} />
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Problem (En)</label>
                    <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.problemEn} onChange={e => setForm({...form, problemEn: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Problem (Ar)</label>
                    <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.problemAr} onChange={e => setForm({...form, problemAr: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Solution (En)</label>
                    <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.solutionEn} onChange={e => setForm({...form, solutionEn: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Solution (Ar)</label>
                    <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.solutionAr} onChange={e => setForm({...form, solutionAr: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Features (En - One per line)</label>
                    <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.featuresEn} onChange={e => setForm({...form, featuresEn: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Features (Ar - One per line)</label>
                    <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.featuresAr} onChange={e => setForm({...form, featuresAr: e.target.value})} />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">Technologies (Comma separated)</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} placeholder="React, Node.js, Prisma" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Cover Image URL</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.coverImageUrl} onChange={e => setForm({...form, coverImageUrl: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Year</label>
                    <input required type="number" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.year} onChange={e => setForm({...form, year: parseInt(e.target.value)})} />
                  </div>
                  <div className="flex items-center mt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-white">
                      <input type="checkbox" className="form-checkbox bg-slate-900 border-slate-700 text-brand-500 rounded focus:ring-brand-500 focus:ring-offset-slate-900 w-5 h-5 transition-all" checked={form.isFeatured} onChange={e => setForm({...form, isFeatured: e.target.checked})} />
                      Is Featured
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Live URL</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">GitHub URL</label>
                  <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Badge (En)</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.badgeEn} onChange={e => setForm({...form, badgeEn: e.target.value})} placeholder="e.g. Most Recent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Badge (Ar)</label>
                  <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.badgeAr} onChange={e => setForm({...form, badgeAr: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-slate-700">
                <button type="button" onClick={closeModal} className="px-6 py-2 rounded-lg text-slate-300 hover:text-white transition">Cancel</button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
