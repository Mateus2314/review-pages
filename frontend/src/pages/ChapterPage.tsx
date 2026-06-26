import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { transformImageUri } from '../utils/images';
import { getChapter } from '../services/chapters';
import { getReading } from '../services/readings';
import PDFViewer from '../components/PDFViewer';
import type { Chapter } from '../types';

/** Extracts a YouTube video ID from various URL formats */
function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0] || null;
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2];
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2];
    }
    return null;
  } catch {
    return null;
  }
}

/** Renders a YouTube video as an embedded iframe player */
function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="youtube-embed-wrapper my-6">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

const numberWords = ['', 'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE', 'DEZ'];

export default function ChapterPage() {
  const { readingId, chapterId } = useParams<{ readingId: string; chapterId: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [bookTitle, setBookTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPDF, setShowPDF] = useState(false);

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

  /** Custom ReactMarkdown components: renders YouTube links as embedded players */
  const markdownComponents: Partial<Components> = {
    a: ({ href, children, ...props }) => {
      if (href) {
        const videoId = getYouTubeId(href);
        if (videoId) {
          return <YouTubeEmbed videoId={videoId} />;
        }
      }
      return (
        <a href={href} {...props} className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2 decoration-indigo-300 hover:decoration-indigo-500 transition-colors">
          {children}
        </a>
      );
    }
  };

  const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '') || '';
  const downloadUrl = chapter?.pdfUrl
    ? (chapter.pdfUrl.startsWith('http') ? chapter.pdfUrl : `${API_BASE}${chapter.pdfUrl}`)
    : null;

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

          {/* PDF actions */}
          {chapter.pdfUrl && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowPDF(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-600/25"
              >
                <FileText className="w-4 h-4" />
                Visualizar apresentação
              </button>

              <a
                href={downloadUrl!}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg text-sm font-medium transition-all border border-white/10"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        {chapter.content ? (
          <div className="markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
              urlTransform={transformImageUri}
            >{chapter.content}</ReactMarkdown>
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

      {/* PDF Viewer Modal */}
      {showPDF && chapter.pdfUrl && (
        <PDFViewer
          pdfUrl={chapter.pdfUrl}
          title={`${chapter.title} — ${bookTitle}`}
          onClose={() => setShowPDF(false)}
        />
      )}
    </div>
  );
}
