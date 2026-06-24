import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, List, FileText, Play, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Slide } from '../types';

interface SlideViewerProps {
  slides: Slide[];
  onClose?: () => void;
}

const typeConfig: Record<string, { icon: React.ReactNode; bg: string }> = {
  TITLE: { icon: <Play className="w-4 h-4" />, bg: 'bg-gradient-to-br from-[#0F0728] via-[#1A1040] to-[#0F172A]' },
  QUOTE: { icon: <Quote className="w-4 h-4" />, bg: 'bg-gradient-to-br from-[#1A1040] via-[#0F0728] to-[#0F172A]' },
  CONTENT: { icon: <FileText className="w-4 h-4" />, bg: 'bg-white' },
  KEY_POINTS: { icon: <List className="w-4 h-4" />, bg: 'bg-white' },
  CLOSING: { icon: <Play className="w-4 h-4" />, bg: 'bg-gradient-to-br from-[#0F0728] via-[#1A1040] to-[#0F172A]' },
};

export default function SlideViewer({ slides, onClose }: SlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const goNext = useCallback(() => {
    if (current < slides.length - 1) setCurrent(c => c + 1);
  }, [current, slides.length]);

  const goPrev = useCallback(() => {
    if (current > 0) setCurrent(c => c - 1);
  }, [current]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onClose]);

  if (!slides.length) return null;

  const config = typeConfig[slide.type] || typeConfig.CONTENT;
  const progress = ((current + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      {/* Slide container */}
      <div className="relative w-full max-w-4xl">
        {/* Progress bar */}
        <div className="absolute -top-1 left-0 right-0 h-1 bg-slate-700/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Main slide card */}
        <div className={`relative rounded-2xl shadow-2xl overflow-hidden min-h-[500px] ${config.bg}`}>
          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Background image overlay for TITLE, QUOTE, CLOSING */}
          {slide.imageUrl && (slide.type === 'TITLE' || slide.type === 'QUOTE' || slide.type === 'CLOSING') && (
            <div className="absolute inset-0 z-0">
              <img
                src={slide.imageUrl}
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0728]/80 via-transparent to-[#0F0728]/60" />
            </div>
          )}

          {/* Title / Quote slides */}
          {slide.type === 'TITLE' && (
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-16 py-20 text-center">
              <span className="text-xs font-semibold text-purple-400 tracking-[0.15em] uppercase mb-6">
                APRESENTAÇÃO
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl text-white font-bold leading-tight mb-6">
                {slide.title}
              </h1>
              {slide.content && (
                <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                  {slide.content}
                </p>
              )}
            </div>
          )}

          {slide.type === 'QUOTE' && (
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-16 py-20 text-center">
              <Quote className="w-12 h-12 text-indigo-400 mb-6 opacity-60" />
              {slide.imageUrl && (
                <div className="mb-6 w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-400/30">
                  <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <blockquote className="font-serif text-2xl lg:text-3xl text-slate-100 leading-relaxed max-w-3xl mb-8 italic">
                &ldquo;{slide.quote}&rdquo;
              </blockquote>
              {slide.attribution && (
                <div>
                  <p className="text-purple-400 font-semibold text-lg">{slide.attribution}</p>
                </div>
              )}
            </div>
          )}

          {/* Content slides */}
          {(slide.type === 'CONTENT' || (slide.type !== 'TITLE' && slide.type !== 'QUOTE' && slide.type !== 'KEY_POINTS' && slide.type !== 'CLOSING')) && (
            <div className="px-16 py-14">
              {slide.imageUrl && (
                <div className="mb-6 rounded-xl overflow-hidden max-h-64">
                  <img src={slide.imageUrl} alt="" className="w-full h-48 object-cover" />
                </div>
              )}
              {slide.title && (
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">{slide.title}</h2>
              )}
              <div className="markdown text-slate-700 text-lg leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{slide.content}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* CLOSING slides */}
          {slide.type === 'CLOSING' && (
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] px-16 py-20 text-center">
              {slide.title && (
                <h2 className="font-serif text-3xl text-white font-bold leading-tight mb-6">{slide.title}</h2>
              )}
              {slide.content && (
                <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                  {slide.content}
                </p>
              )}
              {slide.bullets?.map((b, i) => (
                <p key={i} className="text-purple-400 text-base mt-2">{b}</p>
              ))}
            </div>
          )}

          {/* Key Points slides */}
          {slide.type === 'KEY_POINTS' && (
            <div className="px-16 py-14" style={slide.imageUrl ? { backgroundImage: `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(${slide.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
              {slide.title && (
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">{slide.title}</h2>
              )}
              <ul className="space-y-4">
                {slide.bullets?.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 text-lg leading-relaxed pt-1">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigation bar */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className={`p-3 rounded-full transition-all ${
              current === 0
                ? 'bg-slate-700/30 text-slate-600 cursor-not-allowed'
                : 'bg-slate-700/50 text-white hover:bg-slate-600'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Slide dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? 'bg-indigo-500 w-6' : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={current === slides.length - 1}
            className={`p-3 rounded-full transition-all ${
              current === slides.length - 1
                ? 'bg-slate-700/30 text-slate-600 cursor-not-allowed'
                : 'bg-slate-700/50 text-white hover:bg-slate-600'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide counter */}
        <p className="text-center text-slate-500 text-sm mt-3">
          {current + 1} / {slides.length}
        </p>
      </div>
    </div>
  );
}
