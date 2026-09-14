import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadCloud, Image as ImageIcon, Video, Trash2, Link as LinkIcon, Plus } from 'lucide-react';
import api, { getMediaUrl } from '../../lib/api';

export function MediaManager() {
  const queryClient = useQueryClient();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Fetch Projects ---
  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get('/projects');
      return data;
    }
  });

  const selectedProject = projects?.find((p: any) => p.id === selectedProjectId);

  // --- Mutations ---
  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/admin/upload', formData);
      return data.url;
    }
  });

  const addMediaMutation = useMutation({
    mutationFn: async ({ url, type }: { url: string, type: string }) => {
      if (!selectedProjectId) return;
      await api.post(`/admin/projects/${selectedProjectId}/media`, {
        url,
        type,
        order: (selectedProject?.media?.length || 0) + 1
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const deleteMediaMutation = useMutation({
    mutationFn: async (mediaId: string) => {
      await api.delete(`/admin/projects/media/${mediaId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  // --- Handlers ---
  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!selectedProjectId) return alert('Select a project first');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProjectId) return alert('Select a project first');
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const url = await uploadFileMutation.mutateAsync(file);
        const type = file.type.startsWith('video/') ? 'VIDEO_UPLOAD' : 'IMAGE';
        await addMediaMutation.mutateAsync({ url, type });
      } catch (err) {
        console.error('Failed to upload file:', err);
        alert('Failed to upload file');
      }
    }
  };

  const handleAddYoutube = () => {
    if (!selectedProjectId) return alert('Select a project first');
    const url = prompt('Enter YouTube URL:');
    if (url) {
      addMediaMutation.mutate({ url, type: 'YOUTUBE' });
    }
  };

  if (isLoadingProjects) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Media Manager</h1>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
        <label className="block text-sm font-medium text-slate-400 mb-2">Select Project to Manage Media</label>
        <select 
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
          value={selectedProjectId}
          onChange={e => setSelectedProjectId(e.target.value)}
        >
          <option value="">-- Select a Project --</option>
          {projects?.map((p: any) => (
            <option key={p.id} value={p.id}>{p.titleEn} ({p.category})</option>
          ))}
        </select>
      </div>

      {selectedProject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Upload Zone */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 h-full flex flex-col">
              <h3 className="text-white font-medium mb-4">Add Media</h3>
              
              <div 
                className={`flex-grow border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-colors cursor-pointer
                  ${isDragging ? 'border-brand-500 bg-brand-500/10' : 'border-slate-600 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800'}`}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*,video/*" onChange={handleFileInput} />
                <UploadCloud className={`w-12 h-12 mb-4 ${isDragging ? 'text-brand-500' : 'text-slate-500'}`} />
                <p className="text-slate-300 font-medium mb-1">Drag & Drop files here</p>
                <p className="text-slate-500 text-sm">or click to browse</p>
                <p className="text-slate-600 text-xs mt-4 max-w-xs">Supports JPG, PNG, WEBP, MP4 (Max 500MB)</p>
                
                {(uploadFileMutation.isPending || addMediaMutation.isPending) && (
                  <div className="mt-4 text-brand-400 font-medium text-sm animate-pulse">Uploading...</div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700 flex gap-2">
                <button onClick={handleAddYoutube} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition">
                  <LinkIcon className="w-4 h-4" /> YouTube Link
                </button>
              </div>
            </div>
          </div>

          {/* Media Gallery */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h3 className="text-white font-medium mb-4 flex justify-between items-center">
              Gallery <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs">{selectedProject.media?.length || 0} items</span>
            </h3>

            {(!selectedProject.media || selectedProject.media.length === 0) ? (
              <div className="h-64 flex items-center justify-center border border-dashed border-slate-700 rounded-xl">
                <p className="text-slate-500">No media uploaded for this project yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {selectedProject.media.map((media: any) => (
                  <div key={media.id} className="group relative bg-slate-900 rounded-lg overflow-hidden border border-slate-700 aspect-video">
                    {media.type === 'IMAGE' && (
                      <img src={getMediaUrl(media.url)} alt="media" className="w-full h-full object-cover" />
                    )}
                    {media.type === 'VIDEO_UPLOAD' && (
                      <video src={getMediaUrl(media.url)} className="w-full h-full object-cover" />
                    )}
                    {media.type === 'YOUTUBE' && (
                      <div className="w-full h-full flex items-center justify-center bg-red-950/20 text-red-500">
                        <LinkIcon className="w-8 h-8" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                      <span className="text-xs text-slate-300 font-mono bg-slate-800 px-2 py-1 rounded">{media.type}</span>
                      <button 
                        onClick={() => { if(window.confirm('Delete media?')) deleteMediaMutation.mutate(media.id); }}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-full transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute top-2 left-2 bg-black/60 p-1 rounded text-white shadow">
                      {media.type === 'IMAGE' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
