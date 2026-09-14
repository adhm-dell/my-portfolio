import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import api from '../../lib/api';

export function ExperienceManager() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    roleEn: '',
    roleAr: '',
    company: '',
    durationLabel: '',
    descriptionEn: '',
    descriptionAr: '',
    responsibilitiesEn: '', // we will split by newline
    responsibilitiesAr: '', // we will split by newline
    location: '',
    order: 0,
    isFeatured: false,
  });

  const { data: experiences, isLoading } = useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data } = await api.get('/experience');
      return data;
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingId) {
        await api.patch(`/admin/experience/${editingId}`, data);
      } else {
        await api.post('/admin/experience', data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/experience/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
    }
  });

  const openModal = (exp?: any) => {
    if (exp) {
      setEditingId(exp.id);
      setFormData({
        roleEn: exp.roleEn,
        roleAr: exp.roleAr,
        company: exp.company,
        durationLabel: exp.durationLabel,
        descriptionEn: exp.descriptionEn,
        descriptionAr: exp.descriptionAr,
        responsibilitiesEn: exp.responsibilitiesEn.join('\n'),
        responsibilitiesAr: exp.responsibilitiesAr.join('\n'),
        location: exp.location || '',
        order: exp.order,
        isFeatured: exp.isFeatured,
      });
    } else {
      setEditingId(null);
      setFormData({
        roleEn: '', roleAr: '', company: '', durationLabel: '',
        descriptionEn: '', descriptionAr: '', responsibilitiesEn: '',
        responsibilitiesAr: '', location: '', order: (experiences?.length || 0) + 1,
        isFeatured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      ...formData,
      responsibilitiesEn: formData.responsibilitiesEn.split('\n').map(s => s.trim()).filter(Boolean),
      responsibilitiesAr: formData.responsibilitiesAr.split('\n').map(s => s.trim()).filter(Boolean),
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Experience Manager</h1>
        <button 
          onClick={() => openModal()}
          className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="p-4 font-medium text-slate-400">Order</th>
              <th className="p-4 font-medium text-slate-400">Role</th>
              <th className="p-4 font-medium text-slate-400">Company</th>
              <th className="p-4 font-medium text-slate-400">Duration</th>
              <th className="p-4 font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {experiences?.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No experiences added.</td></tr>
            )}
            {experiences?.map((exp: any) => (
              <tr key={exp.id} className="hover:bg-slate-700/50">
                <td className="p-4 text-slate-300">{exp.order}</td>
                <td className="p-4 font-medium text-white">
                  <div className="flex items-center gap-2">
                    {exp.roleEn}
                    {exp.isFeatured && (
                      <span className="bg-brand-500/20 text-brand-400 text-[10px] px-2 py-0.5 rounded border border-brand-500/30">Featured</span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-slate-300">{exp.company}</td>
                <td className="p-4 text-slate-300">{exp.durationLabel}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => openModal(exp)} className="text-sky-400 hover:text-sky-300 p-2">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Delete this experience?')) {
                        deleteMutation.mutate(exp.id);
                      }
                    }}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl my-8">
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Role (En)</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={formData.roleEn} onChange={e => setFormData({...formData, roleEn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Role (Ar)</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={formData.roleAr} onChange={e => setFormData({...formData, roleAr: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Company</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Duration Label</label>
                  <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" placeholder="e.g. 2022 - Present" value={formData.durationLabel} onChange={e => setFormData({...formData, durationLabel: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description (En)</label>
                  <textarea required rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description (Ar)</label>
                  <textarea required rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={formData.descriptionAr} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Responsibilities (En) - 1 per line</label>
                  <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={formData.responsibilitiesEn} onChange={e => setFormData({...formData, responsibilitiesEn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Responsibilities (Ar) - 1 per line</label>
                  <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={formData.responsibilitiesAr} onChange={e => setFormData({...formData, responsibilitiesAr: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Location</label>
                  <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Order</label>
                  <input type="number" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
                </div>
                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <input type="checkbox" className="form-checkbox bg-slate-800 border-slate-700 text-brand-500 rounded focus:ring-brand-500 focus:ring-offset-slate-900 w-5 h-5 transition-all" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} />
                    Is Featured
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={saveMutation.isPending} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg disabled:opacity-50">
                  {saveMutation.isPending ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
