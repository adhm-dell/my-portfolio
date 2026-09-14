import { useTranslation } from 'react-i18next';
import { Mail, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import api from '../../lib/api';

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto relative">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-300 dark:border-dark-border shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-sky-500/5 pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <Mail className="w-8 h-8 text-brand-500" />
              {t('nav.contact')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="space-y-4">
              <a href="mailto:hello@example.com" className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition group">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-dark-elevated flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">hello@example.com</span>
              </a>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  disabled={status === 'loading'}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-dark-bg border border-slate-300 dark:border-dark-borderLight rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder-slate-400 dark:placeholder-slate-600" 
                  placeholder="John Doe" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  disabled={status === 'loading'}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-dark-bg border border-slate-300 dark:border-dark-borderLight rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder-slate-400 dark:placeholder-slate-600" 
                  placeholder="john@example.com" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  required 
                  disabled={status === 'loading'}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-100 dark:bg-dark-bg border border-slate-300 dark:border-dark-borderLight rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder-slate-400 dark:placeholder-slate-600 resize-none" 
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-sky-500 hover:from-brand-600 hover:to-sky-600 text-white dark:text-dark-bg font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-brand-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="p-3 bg-brand-500/20 border border-brand-500/50 text-brand-700 dark:text-brand-400 rounded-lg text-sm text-center">
                  Message sent successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-700 dark:text-red-400 rounded-lg text-sm text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
