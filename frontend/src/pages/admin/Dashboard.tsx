import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export function Dashboard() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/profile');
      return data;
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 text-sm mb-1">Welcome back,</h3>
          <p className="text-xl font-semibold text-white">{profile?.name || 'Admin'}</p>
        </div>
      </div>
    </div>
  );
}
