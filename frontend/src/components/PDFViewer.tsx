import { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Maximize,
  Minimize,
  FileText,
  Loader2,
  AlertCircle,
} from 'lucide-react';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export default function PDFViewer({ pdfUrl, title, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '') || '';
  const fullPdfUrl = pdfUrl.startsWith('http') ? pdfUrl : `${API_BASE}${pdfUrl}`;
  const downloadUrl = fullPdfUrl;

  function onDocumentLoadSuccess({ numPages: pages }: { numPages: number }) {
    setNumPages(pages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(err: Error) {
    console.error('PDF load error:', err);
    setLoading(false);
    setError('Não foi possível carregar o PDF. Verifique se o arquivo existe.');
  }

  const goNext = useCallback(() => {
    if (numPages && pageNumber < numPages) setPageNumber((p) => p + 1);
  }, [pageNumber, numPages]);

  const goPrev = useCallback(() => {
    if (pageNumber > 1) setPageNumber((p) => p - 1);
  }, [pageNumber]);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(s + 0.25, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(s - 0.25, 0.5));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch {
        /* not supported or denied */
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, zoomIn, zoomOut, onClose, toggleFullscreen]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#0F0728]"
    >
      {/* ── Top bar ── */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#1A1040]/90 backdrop-blur-md border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="h-5 w-px bg-white/10" />

          <FileText className="w-4 h-4 text-purple-400 shrink-0" />
          <h1 className="text-sm font-medium text-white truncate max-w-md">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-1">
          {/* Zoom controls */}
          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Reduzir zoom (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 w-12 text-center font-mono tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={scale >= 3.0}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Aumentar zoom (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-white/10 mx-1" />

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title={isFullscreen ? 'Sair da tela cheia (F)' : 'Tela cheia (F)'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Download */}
          <a
            href={downloadUrl}
            download
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Download do PDF"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-auto bg-[#0A0520] bg-[radial-gradient(ellipse_at_center,_#1A1040_0%,_#0A0520_70%)]">
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
            <p className="text-sm">Carregando documento...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center gap-4 text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 text-sm max-w-md">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-sm transition-colors"
            >
              Voltar
            </button>
          </div>
        )}

        {/* PDF document */}
        <div className="py-8 px-4" style={{ display: loading || error ? 'none' : 'block' }}>
          <Document
            file={fullPdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-2xl rounded-lg overflow-hidden"
              canvasBackground="white"
            />
          </Document>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      {numPages && !error && (
        <footer className="flex items-center justify-center gap-4 px-4 py-3 bg-[#1A1040]/90 backdrop-blur-md border-t border-white/10 shrink-0">
          <button
            onClick={goPrev}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Página anterior (←)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={numPages}
              value={pageNumber}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (v >= 1 && v <= numPages) setPageNumber(v);
              }}
              className="w-14 h-8 bg-white/10 border border-white/10 rounded-lg text-center text-sm text-white font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-purple-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-slate-400 text-sm font-mono tabular-nums">
              / {numPages}
            </span>
          </div>

          <button
            onClick={goNext}
            disabled={numPages !== null && pageNumber >= numPages}
            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Próxima página (→)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </footer>
      )}
    </div>
  );
}
