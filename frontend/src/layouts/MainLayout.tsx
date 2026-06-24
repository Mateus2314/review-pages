import { Link, useNavigate } from 'react-router-dom';
import { getStoredUser, logout } from '../services/auth';
import { BookOpen } from 'lucide-react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const user = getStoredUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F0728]/90 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-white font-bold text-lg">
            <BookOpen className="w-5 h-5 text-purple-400" />
            Review Pages
          </Link>
          <nav className="flex items-center gap-1">
            <Link to="/readings" className="text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              Leituras
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                  Dashboard
                </Link>
                <Link to={`/profile/${user.id}`} className="text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                  {user.name}
                </Link>
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors ml-2"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm bg-purple-600 text-white hover:bg-purple-500 px-4 py-2 rounded-lg transition-colors ml-2"
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}
