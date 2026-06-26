import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Star, ChevronRight, Quote, Library, BookMarked } from 'lucide-react';
import { getReading } from '../services/readings';
import { listChapters } from '../services/chapters';
import { searchBook } from '../services/googleBooks';
import type { Reading, Chapter } from '../types';

const statusLabel: Record<string, string> = {
  WANT_TO_READ: 'Quero ler', READING: 'Lendo', FINISHED: 'Lido', DNF: 'Abandonei'
};

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Reading | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      getReading(Number(id)),
      listChapters(Number(id)),
      searchBook('A Fé na era do ceticismo Timothy Keller').catch(() => null)
    ]).then(([b, ch, gb]) => {
      setBook(b);
      setChapters(ch);
      if (gb?.coverUrl) setCoverUrl(gb.coverUrl);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#07051A]">
      <div className="animate-pulse text-purple-400">Carregando...</div>
    </div>
  );
  if (!book) return <p className="text-center text-red-500 py-20">Livro não encontrado</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07051A] via-[#1A1040] to-[#0F172A] px-6 py-20 lg:py-28">
        <div className="absolute -left-32 -top-32 w-[500px] h-[500px] rounded-full bg-[#2D1B69] opacity-30 blur-3xl" />
        <div className="absolute -right-20 top-1/3 w-[300px] h-[300px] rounded-full bg-[#4C1D95] opacity-20 blur-3xl" />

        <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-shrink-0">
            <div className="w-52 h-80 lg:w-64 lg:h-96 rounded shadow-2xl shadow-black/50 overflow-hidden flex items-center justify-center bg-[#1E1B4B]">
              {coverUrl ? (
                <img src={coverUrl} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <BookOpen className="w-16 h-16 text-purple-600/50" />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-purple-400 tracking-[0.2em] uppercase">
              APOLOGÉTICA · FILOSOFIA
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl text-white font-bold leading-tight mt-3">
              {book.title}
            </h1>
            <div className="text-2xl text-purple-500 my-3">——</div>
            <p className="text-lg text-purple-200 font-light">{book.author}</p>

            {book.review && (
              <p className="text-slate-400 leading-relaxed mt-5 max-w-xl text-[15px]">
                {book.review}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6">
              {book.tags?.split(',').map(t => (
                <span key={t} className="text-xs font-medium text-purple-400 bg-purple-950/50 px-4 py-1.5 rounded-full border border-purple-900/30">
                  {t.trim()}
                </span>
              ))}
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {book.rating}/5
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { icon: BookMarked, label: 'Capítulos', value: String(chapters.length) },
            { icon: Library, label: 'Páginas', value: String(book.pageCount || '-') },
            { icon: Star, label: 'Avaliação', value: String(book.rating) },
            { icon: BookOpen, label: 'Status', value: statusLabel[book.status] }
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm shadow-black/5 p-6 lg:p-8 text-center">
              <s.icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
              <p className="font-serif text-3xl lg:text-4xl text-indigo-900 font-bold">{s.value}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <h2 className="font-serif text-2xl lg:text-3xl text-slate-900 font-bold mb-8">Capítulos</h2>

        <div className="space-y-1">
          {chapters.map((ch, i) => {
            const isLast = i === chapters.length - 1;
            return (
              <Link
                key={ch.id}
                to={`/books/${id}/chapters/${ch.id}`}
                className={`flex items-center gap-4 lg:gap-6 px-5 lg:px-6 py-5 rounded-xl transition-all duration-200 group ${
                  isLast
                    ? 'bg-indigo-50 shadow-lg shadow-indigo-500/10'
                    : 'bg-white hover:bg-slate-50 shadow-sm shadow-black/[0.03] hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-colors ${
                  isLast ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span className={`flex-1 font-medium transition-colors ${
                  isLast ? 'text-slate-900' : 'text-slate-700 group-hover:text-indigo-700'
                }`}>
                  {ch.title}
                </span>
                <ChevronRight className={`w-5 h-5 transition-colors ${
                  isLast ? 'text-indigo-400' : 'text-slate-300 group-hover:text-indigo-400'
                }`} />
              </Link>
            );
          })}
          {chapters.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-12">Nenhum capítulo disponível ainda.</p>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#1A1040] to-[#07051A] px-6 py-20 lg:py-24 text-center">
        <Quote className="w-10 h-10 text-purple-600 mx-auto mb-4" />
        <blockquote className="max-w-2xl mx-auto">
          <p className="font-serif text-xl lg:text-2xl text-slate-200 italic leading-relaxed font-light">
            "Se Jesus não era quem ele dizia ser, então ele era deliberadamente enganador ou estava iludido. A única alternativa racional restante é que ele era exatamente quem afirmava ser: Senhor."
          </p>
          <footer className="text-sm text-purple-400 font-medium mt-6 tracking-wide">
            — Timothy Keller, sobre o trilema de C.S. Lewis
          </footer>
        </blockquote>
      </section>
    </div>
  );
}
