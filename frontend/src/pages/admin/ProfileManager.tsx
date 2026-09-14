import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import api from '../../lib/api';

export function ProfileManager() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'profile' | 'about'>('profile');

  // --- Profile Query & State ---
  const { data: profiles, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/profile');
      return data;
    }
  });
  
  const [profileForm, setProfileForm] = useState<any>({});
  
  useEffect(() => {
    if (profiles?.[0]) {
      setProfileForm(profiles[0]);
    }
  }, [profiles]);

  const saveProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      const { id, ...updateData } = data;
      await api.patch(`/admin/profile/${id}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      alert('Profile updated successfully');
    }
  });

  // --- About Query & State ---
  const { data: aboutContent, isLoading: isLoadingAbout } = useQuery({
    queryKey: ['aboutContent'],
    queryFn: async () => {
      const { data } = await api.get('/profile/about');
      return data;
    }
  });

  const [aboutForms, setAboutForms] = useState<any[]>([]);

  useEffect(() => {
    if (aboutContent) {
      setAboutForms(aboutContent);
    }
  }, [aboutContent]);

  const saveAboutMutation = useMutation({
    mutationFn: async (item: any) => {
      const { id, ...updateData } = item;
      await api.patch(`/admin/profile/about/${id}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutContent'] });
    }
  });

  const handleSaveAboutAll = () => {
    aboutForms.forEach(item => saveAboutMutation.mutate(item));
    alert('About section updated successfully');
  };

  if (isLoadingProfile || isLoadingAbout) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Profile Manager</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'profile' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
          Main Profile Info
        </button>
        <button onClick={() => setActiveTab('about')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'about' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
          About Section Content
        </button>
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={e => { e.preventDefault(); saveProfileMutation.mutate(profileForm); }} className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Name (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.nameEn || ''} onChange={e => setProfileForm({...profileForm, nameEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Name (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={profileForm.nameAr || ''} onChange={e => setProfileForm({...profileForm, nameAr: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Role Title (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.roleTitleEn || ''} onChange={e => setProfileForm({...profileForm, roleTitleEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Role Title (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={profileForm.roleTitleAr || ''} onChange={e => setProfileForm({...profileForm, roleTitleAr: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Headline (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.headlineEn || ''} onChange={e => setProfileForm({...profileForm, headlineEn: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Headline (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={profileForm.headlineAr || ''} onChange={e => setProfileForm({...profileForm, headlineAr: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Bio (En)</label>
              <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.bioEn || ''} onChange={e => setProfileForm({...profileForm, bioEn: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1">Bio (Ar)</label>
              <textarea rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={profileForm.bioAr || ''} onChange={e => setProfileForm({...profileForm, bioAr: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Education (En)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.educationEn || ''} onChange={e => setProfileForm({...profileForm, educationEn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Education (Ar)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={profileForm.educationAr || ''} onChange={e => setProfileForm({...profileForm, educationAr: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">GPA</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.gpa || ''} onChange={e => setProfileForm({...profileForm, gpa: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Graduation Year</label>
              <input type="number" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.graduationYear || 0} onChange={e => setProfileForm({...profileForm, graduationYear: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
              <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.email || ''} onChange={e => setProfileForm({...profileForm, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">CV File URL</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.cvFileUrl || ''} onChange={e => setProfileForm({...profileForm, cvFileUrl: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">LinkedIn URL</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.linkedinUrl || ''} onChange={e => setProfileForm({...profileForm, linkedinUrl: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">GitHub URL</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={profileForm.githubUrl || ''} onChange={e => setProfileForm({...profileForm, githubUrl: e.target.value})} />
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-700">
            <button type="submit" disabled={saveProfileMutation.isPending} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <Save className="w-4 h-4" /> {saveProfileMutation.isPending ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'about' && (
        <div className="space-y-6">
          <p className="text-slate-400 text-sm">Update the paragraphs that appear in the About section on the home page.</p>
          {aboutForms.map((item, index) => (
            <div key={item.id} className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-4">
              <h3 className="text-white font-medium mb-2">Paragraph {item.order}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">English</label>
                  <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" value={item.paragraphEn} onChange={e => {
                    const newForms = [...aboutForms];
                    newForms[index].paragraphEn = e.target.value;
                    setAboutForms(newForms);
                  }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Arabic</label>
                  <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-right" dir="rtl" value={item.paragraphAr} onChange={e => {
                    const newForms = [...aboutForms];
                    newForms[index].paragraphAr = e.target.value;
                    setAboutForms(newForms);
                  }} />
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end pt-4">
            <button onClick={handleSaveAboutAll} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <Save className="w-4 h-4" /> Save All Paragraphs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
