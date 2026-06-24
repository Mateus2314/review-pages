import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getChapter } from '../services/chapters';
import { getReading } from '../services/readings';
import type { Chapter } from '../types';

const numberWords = ['', 'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE', 'DEZ'];

export default function ChapterPage() {
  const { readingId, chapterId } = useParams<{ readingId: string; chapterId: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [bookTitle, setBookTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chapterId || !readingId) return;
    setLoading(true);
    Promise.all([
      getChapter(Number(chapterId)),
      getReading(Number(readingId))
    ]).then(([ch, book]) => {
      setChapter(ch);
      setBookTitle(book.title);
      setLoading(false);
    });
  }, [chapterId, readingId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0728]">
      <div className="animate-pulse text-purple-400">Carregando...</div>
    </div>
  );
  if (!chapter) return <p className="text-center text-red-500 py-20">Capítulo não encontrado</p>;

  const chNum = chapter.chapterOrder;
  const chapterNumber = String(chNum).padStart(2, '0');

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F0728] via-[#1A1040] to-[#0F172A] px-6 py-16 lg:py-20">
        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-[#2D1B69] opacity-40 blur-3xl" />

        <div className="relative max-w-3xl mx-auto">
          <Link
            to={`/books/${readingId}`}
            className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o livro
          </Link>

          <p className="text-xs font-semibold text-purple-600 tracking-[0.15em] uppercase mb-4">
            {bookTitle}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/30">
              <span className="text-2xl text-white font-bold">{chapterNumber}</span>
            </div>
            <span className="text-sm text-purple-400 font-medium tracking-[0.15em] uppercase">
              CAPÍTULO {numberWords[chNum] || String(chNum)}
            </span>
          </div>

          <h1 className="font-serif text-3xl lg:text-4xl text-white font-bold leading-tight">
            {chapter.title}
          </h1>

          <div className="flex items-center gap-3 mt-6 text-xs text-slate-500">
            <BookOpen className="w-4 h-4" />
            <span>Parte de {bookTitle}</span>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        {chapter.content ? (
          <div className="markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{chapter.content}</ReactMarkdown>
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400">O conteúdo deste capítulo ainda está sendo escrito.</p>
            <p className="text-slate-400 text-sm mt-1">Em breve estará disponível.</p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <Link
            to={`/books/${readingId}`}
            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para todos os capítulos
          </Link>
        </div>
      </section>
    </div>
  );
}
