import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, MailOpen, Trash2 } from 'lucide-react';
import api from '../../lib/api';

export function MessagesManager() {
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data } = await api.get('/admin/contact');
      return data;
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/admin/contact/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  if (isLoading) return <div>Loading messages...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Messages Inbox</h1>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="p-4 font-medium text-slate-400">Status</th>
              <th className="p-4 font-medium text-slate-400">Date</th>
              <th className="p-4 font-medium text-slate-400">Name</th>
              <th className="p-4 font-medium text-slate-400">Email</th>
              <th className="p-4 font-medium text-slate-400">Message</th>
              <th className="p-4 font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {messages?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">No messages found.</td>
              </tr>
            )}
            {messages?.map((msg: any) => (
              <tr key={msg.id} className={`hover:bg-slate-700/50 ${msg.isRead ? 'opacity-70' : 'font-semibold'}`}>
                <td className="p-4">
                  {msg.isRead ? (
                    <MailOpen className="w-5 h-5 text-slate-500" />
                  ) : (
                    <Mail className="w-5 h-5 text-brand-500" />
                  )}
                </td>
                <td className="p-4 text-sm text-slate-300">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-white">{msg.name}</td>
                <td className="p-4 text-sky-400">
                  <a href={`mailto:${msg.email}`}>{msg.email}</a>
                </td>
                <td className="p-4 text-sm text-slate-300 max-w-xs truncate">
                  {msg.message}
                </td>
                <td className="p-4 flex gap-2">
                  {!msg.isRead && (
                    <button 
                      onClick={() => markAsReadMutation.mutate(msg.id)}
                      className="text-brand-400 hover:text-brand-300 p-2 text-xs"
                      title="Mark as read"
                    >
                      Read
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this message?')) {
                        deleteMutation.mutate(msg.id);
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
    </div>
  );
}
