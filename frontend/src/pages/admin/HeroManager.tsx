import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import api from '../../lib/api';

export function HeroManager() {
  const queryClient = useQueryClient();

  const { data: heroSettings, isLoading } = useQuery({
    queryKey: ['heroSettings'],
    queryFn: async () => {
      const { data } = await api.get('/hero-settings');
      return data;
    }
  });
  
  const [form, setForm] = useState<any>({});
  
  useEffect(() => {
    if (heroSettings) {
      setForm(heroSettings);
    }
  }, [heroSettings]);

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.patch('/hero-settings', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroSettings'] });
      alert('Hero settings updated successfully');
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Hero Section Manager</h1>
      </div>

      <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(form); }} className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-8">
        
        {/* Main Text Content */}
        <div>
          <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Main Hero Text</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Badge Text (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.badgeTextEn || ''} onChange={e => setForm({...form, badgeTextEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Badge Text (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.badgeTextAr || ''} onChange={e => setForm({...form, badgeTextAr: e.target.value})} />
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-400 mb-1">Heading (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-bold" value={form.headingEn || ''} onChange={e => setForm({...form, headingEn: e.target.value})} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-400 mb-1">Heading (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-bold text-right" dir="rtl" value={form.headingAr || ''} onChange={e => setForm({...form, headingAr: e.target.value})} />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-400 mb-1">Sub Heading (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.subHeadingEn || ''} onChange={e => setForm({...form, subHeadingEn: e.target.value})} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-slate-400 mb-1">Sub Heading (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.subHeadingAr || ''} onChange={e => setForm({...form, subHeadingAr: e.target.value})} />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Description / Bio (En)</label>
              <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.descriptionEn || ''} onChange={e => setForm({...form, descriptionEn: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Description / Bio (Ar)</label>
              <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.descriptionAr || ''} onChange={e => setForm({...form, descriptionAr: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">CTA Button Text (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.ctaTextEn || ''} onChange={e => setForm({...form, ctaTextEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">CTA Button Text (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.ctaTextAr || ''} onChange={e => setForm({...form, ctaTextAr: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div>
          <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Hero Stats (3 Grid items)</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-4 border border-slate-700 rounded-lg p-4">
              <div><label className="text-xs text-slate-400">Stat 1 Value</label><input type="text" className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" value={form.stat1Value || ''} onChange={e => setForm({...form, stat1Value: e.target.value})} /></div>
              <div><label className="text-xs text-slate-400">Stat 1 Label (En/Ar)</label>
                <div className="flex gap-2">
                  <input type="text" className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" value={form.stat1LabelEn || ''} onChange={e => setForm({...form, stat1LabelEn: e.target.value})} />
                  <input type="text" className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" dir="rtl" value={form.stat1LabelAr || ''} onChange={e => setForm({...form, stat1LabelAr: e.target.value})} />
                </div>
              </div>
              <div><label className="text-xs text-slate-400">Stat 1 Subtext (En/Ar)</label>
                <div className="flex gap-2">
                  <input type="text" className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" value={form.stat1SubtextEn || ''} onChange={e => setForm({...form, stat1SubtextEn: e.target.value})} />
                  <input type="text" className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" dir="rtl" value={form.stat1SubtextAr || ''} onChange={e => setForm({...form, stat1SubtextAr: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="space-y-4 border border-slate-700 rounded-lg p-4">
              <div><label className="text-xs text-slate-400">Stat 2 Value</label><input type="text" className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" value={form.stat2Value || ''} onChange={e => setForm({...form, stat2Value: e.target.value})} /></div>
              <div><label className="text-xs text-slate-400">Stat 2 Subtext (En/Ar)</label>
                <div className="flex gap-2">
                  <input type="text" className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" value={form.stat2SubtextEn || ''} onChange={e => setForm({...form, stat2SubtextEn: e.target.value})} />
                  <input type="text" className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" dir="rtl" value={form.stat2SubtextAr || ''} onChange={e => setForm({...form, stat2SubtextAr: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="space-y-4 border border-slate-700 rounded-lg p-4">
              <div><label className="text-xs text-slate-400">Stat 3 Value</label><input type="text" className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" value={form.stat3Value || ''} onChange={e => setForm({...form, stat3Value: e.target.value})} /></div>
              <div><label className="text-xs text-slate-400">Stat 3 Subtext (En/Ar)</label>
                <div className="flex gap-2">
                  <input type="text" className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" value={form.stat3SubtextEn || ''} onChange={e => setForm({...form, stat3SubtextEn: e.target.value})} />
                  <input type="text" className="w-1/2 bg-slate-900 border border-slate-700 rounded p-1 text-white text-sm" dir="rtl" value={form.stat3SubtextAr || ''} onChange={e => setForm({...form, stat3SubtextAr: e.target.value})} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code Snippet */}
        <div>
          <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Terminal Code Snippet</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Code snippet (En)</label>
              <textarea rows={6} className="w-full font-mono bg-slate-900 border border-slate-700 rounded-lg p-2 text-emerald-400" value={form.terminalCodeEn || ''} onChange={e => setForm({...form, terminalCodeEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Code snippet (Ar)</label>
              <textarea rows={6} className="w-full font-mono bg-slate-900 border border-slate-700 rounded-lg p-2 text-emerald-400 text-left" dir="ltr" value={form.terminalCodeAr || ''} onChange={e => setForm({...form, terminalCodeAr: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Featured Project */}
        <div>
          <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Featured Project Card (Right Side)</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Project Title (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.projectTitleEn || ''} onChange={e => setForm({...form, projectTitleEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Project Title (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.projectTitleAr || ''} onChange={e => setForm({...form, projectTitleAr: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Project Description (En)</label>
              <textarea rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.projectDescEn || ''} onChange={e => setForm({...form, projectDescEn: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Project Description (Ar)</label>
              <textarea rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.projectDescAr || ''} onChange={e => setForm({...form, projectDescAr: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Tags (En) - comma separated</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.projectTagsEn?.join(', ') || ''} onChange={e => setForm({...form, projectTagsEn: e.target.value.split(',').map((s: string) => s.trim())})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Tags (Ar) - comma separated</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={form.projectTagsAr?.join(', ') || ''} onChange={e => setForm({...form, projectTagsAr: e.target.value.split(',').map((s: string) => s.trim())})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Project URL / Link</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={form.projectLink || ''} onChange={e => setForm({...form, projectLink: e.target.value})} />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t border-slate-700">
          <button type="submit" disabled={saveMutation.isPending} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
            <Save className="w-4 h-4" /> {saveMutation.isPending ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
