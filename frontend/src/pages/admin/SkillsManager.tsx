import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, X, Folder, LayoutGrid } from 'lucide-react';
import api from '../../lib/api';

export function SkillsManager() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'categories' | 'items'>('categories');
  
  // Category Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [catEditingId, setCatEditingId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState({ key: '', titleEn: '', titleAr: '', subtitleEn: '', subtitleAr: '', icon: '', order: 0 });

  // Skill Item Modal State
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [skillEditingId, setSkillEditingId] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState({ name: '', categoryId: '', order: 0 });

  const { data: categories, isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await api.get('/skills');
      return data;
    }
  });

  // --- Category Mutations ---
  const saveCatMutation = useMutation({
    mutationFn: async (data: any) => {
      if (catEditingId) await api.patch(`/admin/skills/categories/${catEditingId}`, data);
      else await api.post('/admin/skills/categories', data);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['skills'] }); setIsCatModalOpen(false); }
  });
  const deleteCatMutation = useMutation({
    mutationFn: async (id: string) => await api.delete(`/admin/skills/categories/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] })
  });

  // --- Skill Mutations ---
  const saveSkillMutation = useMutation({
    mutationFn: async (data: any) => {
      if (skillEditingId) await api.patch(`/admin/skills/items/${skillEditingId}`, data);
      else await api.post('/admin/skills/items', data);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['skills'] }); setIsSkillModalOpen(false); }
  });
  const deleteSkillMutation = useMutation({
    mutationFn: async (id: string) => await api.delete(`/admin/skills/items/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] })
  });

  const openCatModal = (cat?: any) => {
    if (cat) {
      setCatEditingId(cat.id);
      setCatForm({ key: cat.key, titleEn: cat.titleEn, titleAr: cat.titleAr, subtitleEn: cat.subtitleEn, subtitleAr: cat.subtitleAr, icon: cat.icon, order: cat.order });
    } else {
      setCatEditingId(null);
      setCatForm({ key: '', titleEn: '', titleAr: '', subtitleEn: '', subtitleAr: '', icon: '', order: (categories?.length || 0) + 1 });
    }
    setIsCatModalOpen(true);
  };

  const openSkillModal = (skill?: any, defaultCatId?: string) => {
    if (skill) {
      setSkillEditingId(skill.id);
      setSkillForm({ name: skill.name, categoryId: skill.categoryId, order: skill.order });
    } else {
      setSkillEditingId(null);
      setSkillForm({ name: '', categoryId: defaultCatId || (categories?.[0]?.id || ''), order: 0 });
    }
    setIsSkillModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Skills Manager</h1>
        <div className="flex gap-2">
          <button onClick={() => openCatModal()} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-slate-600">
            <Folder className="w-4 h-4" /> Add Category
          </button>
          <button onClick={() => openSkillModal()} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
            <LayoutGrid className="w-4 h-4" /> Add Skill Item
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('categories')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'categories' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
          Categories
        </button>
        <button onClick={() => setActiveTab('items')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'items' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
          Skill Items
        </button>
      </div>

      {activeTab === 'categories' && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="p-4 font-medium text-slate-400">Order</th>
                <th className="p-4 font-medium text-slate-400">Key</th>
                <th className="p-4 font-medium text-slate-400">Title (En)</th>
                <th className="p-4 font-medium text-slate-400">Icon</th>
                <th className="p-4 font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {categories?.map((cat: any) => (
                <tr key={cat.id} className="hover:bg-slate-700/50">
                  <td className="p-4 text-slate-300">{cat.order}</td>
                  <td className="p-4 font-mono text-sm text-brand-400">{cat.key}</td>
                  <td className="p-4 font-medium text-white">{cat.titleEn}</td>
                  <td className="p-4 text-slate-300">
                    <div className="w-6 h-6" dangerouslySetInnerHTML={{__html: cat.icon}}></div>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => openCatModal(cat)} className="text-sky-400 hover:text-sky-300 p-2"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => { if(window.confirm('Delete category?')) deleteCatMutation.mutate(cat.id); }} className="text-red-400 hover:text-red-300 p-2"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'items' && (
        <div className="space-y-6">
          {categories?.map((cat: any) => (
            <div key={cat.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-white">{cat.titleEn} <span className="text-slate-500 font-normal ml-2">({cat.skills?.length || 0} skills)</span></h3>
                <button onClick={() => openSkillModal(undefined, cat.id)} className="text-brand-400 hover:text-brand-300 text-sm flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add to category
                </button>
              </div>
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-700/50">
                  {cat.skills?.length === 0 && (
                    <tr><td className="p-4 text-slate-500 text-sm">No skills in this category.</td></tr>
                  )}
                  {cat.skills?.map((skill: any) => (
                    <tr key={skill.id} className="hover:bg-slate-700/30">
                      <td className="p-4 w-12 text-slate-500 text-sm">{skill.order}</td>
                      <td className="p-4 font-medium text-slate-200">{skill.name}</td>
                      <td className="p-4 flex gap-2 justify-end">
                        <button onClick={() => openSkillModal(skill, cat.id)} className="text-sky-400 hover:text-sky-300 p-2"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => { if(window.confirm('Delete skill?')) deleteSkillMutation.mutate(skill.id); }} className="text-red-400 hover:text-red-300 p-2"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Category Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">{catEditingId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setIsCatModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); saveCatMutation.mutate(catForm); }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Key (unique ID)</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={catForm.key} onChange={e => setCatForm({...catForm, key: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Order</label>
                  <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={catForm.order} onChange={e => setCatForm({...catForm, order: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Title (En)</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={catForm.titleEn} onChange={e => setCatForm({...catForm, titleEn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Title (Ar)</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={catForm.titleAr} onChange={e => setCatForm({...catForm, titleAr: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Subtitle (En)</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={catForm.subtitleEn} onChange={e => setCatForm({...catForm, subtitleEn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Subtitle (Ar)</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={catForm.subtitleAr} onChange={e => setCatForm({...catForm, subtitleAr: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Icon (SVG Code)</label>
                <textarea rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white font-mono text-xs" value={catForm.icon} onChange={e => setCatForm({...catForm, icon: e.target.value})} />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsCatModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={saveCatMutation.isPending} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">{skillEditingId ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setIsSkillModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); saveSkillMutation.mutate(skillForm); }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                <select required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={skillForm.categoryId} onChange={e => setSkillForm({...skillForm, categoryId: e.target.value})}>
                  {categories?.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.titleEn}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Skill Name (e.g. React)</label>
                <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Order</label>
                <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={skillForm.order} onChange={e => setSkillForm({...skillForm, order: parseInt(e.target.value)})} />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsSkillModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={saveSkillMutation.isPending} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
