import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats, listReadings } from '../services/readings';
import { getStoredUser } from '../services/auth';
import type { Stats, Reading } from '../types';

export default function DashboardPage() {
  const user = getStoredUser();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Reading[]>([]);

  useEffect(() => {
    getStats().then(setStats);
    listReadings({ page: 0, size: 5 }).then((d) => setRecent(d.content));
  }, []);

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-indigo-600">{stats.totalReadings}</p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.finishedReadings}</p>
            <p className="text-sm text-gray-500">Lidos</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.readingNow}</p>
            <p className="text-sm text-gray-500">Lendo</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}</p>
            <p className="text-sm text-gray-500">Média</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Leituras recentes</h2>
          <Link to="/readings" className="text-sm text-indigo-600 hover:underline">Ver todas</Link>
        </div>
        <div className="space-y-3">
          {recent.map((r) => (
            <Link key={r.id} to={`/readings/${r.id}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">{r.title}</p>
                <p className="text-sm text-gray-500">{r.author} • ⭐ {r.rating}/5</p>
              </div>
              <span className="text-xs text-gray-400">{r.type === 'BOOK' ? '📚' : '📄'}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
