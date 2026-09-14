import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, GripVertical, Save, X } from 'lucide-react';
import api from '../../lib/api';

export function PhilosophyManager() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const { data: cards, isLoading } = useQuery({
    queryKey: ['philosophy'],
    queryFn: async () => {
      const { data } = await api.get('/philosophy');
      return data;
    }
  });

  const [form, setForm] = useState<any>({});

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (data.id) {
        const { id, ...updateData } = data;
        await api.patch(`/philosophy/${id}`, updateData);
      } else {
        await api.post('/philosophy', data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['philosophy'] });
      setEditingId(null);
      setIsAdding(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/philosophy/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['philosophy'] });
    }
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderedIds: string[]) => {
      await api.patch('/philosophy/reorder', { orderedIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['philosophy'] });
    }
  });

  const handleEdit = (card: any) => {
    setForm(card);
    setEditingId(card.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setForm({ categoryEn: '', categoryAr: '', titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', color: 'text-emerald-400' });
    setIsAdding(true);
    setEditingId(null);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (!cards) return;
    const newItems = [...cards];
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
          <h1 className="text-2xl font-bold text-white">Philosophy / Architecture Cards</h1>
        </div>
        <button onClick={handleAdd} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Card
        </button>
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(form); }} className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8 space-y-4">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
            <h2 className="text-lg font-medium text-white">{isAdding ? 'Add Card' : 'Edit Card'}</h2>
            <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Category (En) e.g. ARCHITECTURE</label>
              <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.categoryEn} onChange={e => setForm({...form, categoryEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Category (Ar)</label>
              <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.categoryAr} onChange={e => setForm({...form, categoryAr: e.target.value})} />
            </div>
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
              <label className="block text-sm font-medium text-slate-400 mb-1">Color Class (e.g., text-emerald-400, text-sky-400)</label>
              <input type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono text-sm" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={saveMutation.isPending} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Card
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards?.map((card: any, index: number) => (
          <div key={card.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col relative group">
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-30"><GripVertical className="w-3 h-3" /></button>
              <button onClick={() => moveItem(index, 'down')} disabled={index === cards.length - 1} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-30"><GripVertical className="w-3 h-3" /></button>
              <button onClick={() => handleEdit(card)} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"><Pencil className="w-3 h-3" /></button>
              <button onClick={() => { if(confirm('Are you sure?')) deleteMutation.mutate(card.id); }} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg"><Trash2 className="w-3 h-3" /></button>
            </div>
            
            <div className="mb-4">
              <span className={`font-mono text-[11px] font-bold tracking-wider ${card.color}`}>
                0{index + 1} / {card.categoryEn}
              </span>
            </div>
            <h3 className="text-white font-bold mb-2">{card.titleEn}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{card.descriptionEn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
