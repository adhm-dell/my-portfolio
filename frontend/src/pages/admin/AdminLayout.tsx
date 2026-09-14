import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router';
import { LayoutDashboard, Layers, Briefcase, User, Mail, LogOut, Code, Image as ImageIcon } from 'lucide-react';
import api from '../../lib/api';

export function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/admin/auth/me');
        setIsAuthenticated(true);
      } catch (err) {
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Layers },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Skills', path: '/admin/skills', icon: Code },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Profile', path: '/admin/profile', icon: User },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-300">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center text-white font-bold font-mono">AS</div>
          <span className="font-bold text-white tracking-wide">Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-brand-500/10 text-brand-400' 
                    : 'hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-900">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
