import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, GripVertical, Save, X } from 'lucide-react';
import api from '../../lib/api';

export function AboutManager() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const { data: features, isLoading } = useQuery({
    queryKey: ['about-features'],
    queryFn: async () => {
      const { data } = await api.get('/about-features');
      return data;
    }
  });

  const [form, setForm] = useState<any>({});

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (data.id) {
        const { id, ...updateData } = data;
        await api.patch(`/about-features/${id}`, updateData);
      } else {
        await api.post('/about-features', data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-features'] });
      setEditingId(null);
      setIsAdding(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/about-features/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-features'] });
    }
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderedIds: string[]) => {
      await api.patch('/about-features/reorder', { orderedIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-features'] });
    }
  });

  const handleEdit = (feature: any) => {
    setForm(feature);
    setEditingId(feature.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setForm({ titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', iconColor: 'bg-sky-900/60' });
    setIsAdding(true);
    setEditingId(null);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (!features) return;
    const newItems = [...features];
    if (direction === 'up' && index > 0) {
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    } else {
      return;
    }
    reorderMutation.mutate(newItems.map(i => i.id));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">About Section Features</h1>
          <p className="text-slate-400 text-sm mt-1">Manage the left-side feature cards in the About section (e.g. Architectural Depth).</p>
        </div>
        <button onClick={handleAdd} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Feature
        </button>
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(form); }} className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8 space-y-4">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
            <h2 className="text-lg font-medium text-white">{isAdding ? 'Add Feature' : 'Edit Feature'}</h2>
            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Title (En)</label>
              <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.titleEn} onChange={e => setForm({...form, titleEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Title (Ar)</label>
              <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.titleAr} onChange={e => setForm({...form, titleAr: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Description (En)</label>
              <textarea rows={3} required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.descriptionEn} onChange={e => setForm({...form, descriptionEn: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Description (Ar)</label>
              <textarea rows={3} required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.descriptionAr} onChange={e => setForm({...form, descriptionAr: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Icon Color Class (e.g., bg-sky-900/60)</label>
              <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm" value={form.iconColor} onChange={e => setForm({...form, iconColor: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={saveMutation.isPending} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Feature
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {features?.map((feature: any, index: number) => (
          <div key={feature.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
            <div className="flex flex-col gap-1 text-slate-500 cursor-ns-resize">
              <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="hover:text-white disabled:opacity-30"><GripVertical className="w-4 h-4" /></button>
              <button onClick={() => moveItem(index, 'down')} disabled={index === features.length - 1} className="hover:text-white disabled:opacity-30"><GripVertical className="w-4 h-4" /></button>
            </div>
            
            <div className={`w-10 h-10 rounded-xl bg-[#1e293b] border border-slate-700/50 shadow-inner flex items-center justify-center shrink-0`}>
              <div className={`w-5 h-5 rounded border ${feature.iconColor.replace('bg-', 'border-').replace('/60', '/50')} ${feature.iconColor}`}></div>
            </div>

            <div className="flex-grow">
              <h3 className="text-white font-medium">{feature.titleEn}</h3>
              <p className="text-slate-400 text-sm truncate max-w-2xl">{feature.descriptionEn}</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => handleEdit(feature)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => { if(confirm('Are you sure?')) deleteMutation.mutate(feature.id); }} className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
