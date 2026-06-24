import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, MessageCircle, Heart, FileText, ArrowRight } from 'lucide-react';
import { listReadings } from '../services/readings';
import type { Reading } from '../types';

const statusLabels: Record<string, string> = {
  WANT_TO_READ: 'Quero ler', READING: 'Lendo', FINISHED: 'Lido', DNF: 'Abandonei'
};
const statusColors: Record<string, string> = {
  WANT_TO_READ: 'bg-amber-100 text-amber-800',
  READING: 'bg-blue-100 text-blue-800',
  FINISHED: 'bg-emerald-100 text-emerald-800',
  DNF: 'bg-slate-100 text-slate-600'
};

export default function ReadingsPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    listReadings({ type: filterType || undefined, status: filterStatus || undefined, page, size: 12 })
      .then((data) => {
        setReadings(data.content);
        setTotalPages(data.totalPages);
      });
  }, [page, filterType, filterStatus]);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-[#0F0728] via-[#1A1040] to-[#0F172A] px-6 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-serif text-3xl lg:text-4xl text-white font-bold">Leituras</h1>
            <Link to="/readings/new" className="inline-flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-purple-500 transition-all hover:shadow-lg hover:shadow-purple-600/25">
              <BookOpen className="w-4 h-4" />
              Nova leitura
            </Link>
          </div>
          <p className="text-slate-400 text-sm mt-2">Explore todas as leituras da comunidade</p>

          <div className="flex gap-3 mt-8">
            <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(0); }}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-purple-500 appearance-none cursor-pointer">
              <option value="" className="bg-[#0F0728]">Todos os tipos</option>
              <option value="BOOK" className="bg-[#0F0728]">Livros</option>
              <option value="ARTICLE" className="bg-[#0F0728]">Artigos</option>
            </select>
            <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(0); }}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-purple-500 appearance-none cursor-pointer">
              <option value="" className="bg-[#0F0728]">Todos os status</option>
              <option value="WANT_TO_READ" className="bg-[#0F0728]">Quero ler</option>
              <option value="READING" className="bg-[#0F0728]">Lendo</option>
              <option value="FINISHED" className="bg-[#0F0728]">Lido</option>
              <option value="DNF" className="bg-[#0F0728]">Abandonei</option>
            </select>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {readings.map((r) => (
            <Link key={r.id} to={`/readings/${r.id}`}
              className="group block bg-white rounded-xl shadow-sm shadow-black/[0.03] p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 border border-transparent hover:border-indigo-100">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${statusColors[r.status]}`}>
                  {statusLabels[r.status]}
                </span>
                <span className={`text-xs text-slate-400 flex items-center gap-1 ${r.type === 'BOOK' ? 'text-indigo-500' : 'text-sky-500'}`}>
                  {r.type === 'BOOK' ? <BookOpen className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                  {r.type === 'BOOK' ? 'Livro' : 'Artigo'}
                </span>
              </div>
              <h2 className="font-serif text-lg text-slate-900 font-bold mb-1 group-hover:text-indigo-700 transition-colors line-clamp-2">{r.title}</h2>
              {r.author && <p className="text-sm text-slate-500 mb-3">{r.author}</p>}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {r.rating}/5</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {r.commentCount}</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {r.likeCount}</span>
              </div>
              {r.rating >= 4 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-xs text-indigo-600 font-medium">
                    {r.type === 'BOOK' ? 'Ver capítulos' : 'Ler resenha'} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {readings.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Nenhuma leitura encontrada.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button disabled={page === 0} onClick={() => setPage(page - 1)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors">
              Anterior
            </button>
            <span className="px-4 py-2 text-sm text-slate-400">
              {page + 1} / {totalPages}
            </span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors">
              Próxima
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
