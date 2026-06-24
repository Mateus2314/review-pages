import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listReadings } from '../services/readings';
import { getMe } from '../services/auth';
import type { User, Reading } from '../types';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<User | null>(null);
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    getMe().then(setProfile);
    listReadings({ page: 0, size: 50 }).then((d) => setReadings(d.content));
  }, [id]);

  if (!profile) return <p className="text-center text-gray-500">Carregando...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-700 mx-auto mb-3">
          {profile.name[0].toUpperCase()}
        </div>
        <h1 className="text-xl font-bold">{profile.name}</h1>
        {profile.bio && <p className="text-gray-500 mt-1">{profile.bio}</p>}
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
          <span>📚 {profile.totalReadings} leituras</span>
          <span>✅ {profile.finishedReadings} lidos</span>
          <span>⭐ {profile.averageRating.toFixed(1)} média</span>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Leituras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {readings.map((r) => (
          <Link key={r.id} to={`/readings/${r.id}`}
            className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-medium text-gray-900">{r.title}</h3>
              <span className="text-xs text-gray-400">⭐ {r.rating}</span>
            </div>
            {r.author && <p className="text-sm text-gray-500">{r.author}</p>}
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{r.type === 'BOOK' ? 'Livro' : 'Artigo'}</span>
              {r.tags?.split(',').slice(0, 2).map((t) => (
                <span key={t} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{t.trim()}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
