import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Star, BookOpen, Trash2, Pencil } from 'lucide-react';
import { getReading, deleteReading, addComment, getComments, toggleLike, deleteComment } from '../services/readings';
import { getStoredUser } from '../services/auth';
import type { Reading, Comment } from '../types';

const statusLabels: Record<string, string> = {
  WANT_TO_READ: 'Quero ler', READING: 'Lendo', FINISHED: 'Lido', DNF: 'Abandonei'
};

export default function ReadingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = getStoredUser();
  const [reading, setReading] = useState<Reading | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const r = await getReading(Number(id));
    setReading(r);
    setLikeCount(r.likeCount);
    setLiked(r.likedByMe);
    setComments(await getComments(Number(id)));
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const handleDelete = async () => {
    if (!confirm('Excluir esta leitura?')) return;
    await deleteReading(Number(id));
    navigate('/readings');
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await addComment(Number(id), newComment);
    setNewComment('');
    setComments(await getComments(Number(id)));
  };

  const handleLike = async () => {
    const result = await toggleLike(Number(id));
    setLiked(result.liked);
    setLikeCount(result.count);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-pulse text-slate-400">Carregando...</div></div>;
  if (!reading) return <p className="text-center text-red-500 py-20">Leitura não encontrada</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/readings" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para leituras
        </Link>

        <div className="bg-white rounded-2xl shadow-sm shadow-black/[0.03] p-8 mb-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                {reading.type === 'BOOK' ? <BookOpen className="w-3.5 h-3.5" /> : null}
                {reading.type === 'BOOK' ? 'Livro' : 'Artigo'}
              </span>
              <h1 className="font-serif text-2xl lg:text-3xl text-slate-900 font-bold mt-3">{reading.title}</h1>
              {reading.author && <p className="text-slate-500 mt-1">{reading.author}</p>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {user?.id === reading.userId && (
                <>
                  <Link to={`/readings/${reading.id}/edit`}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button onClick={handleDelete}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">{statusLabels[reading.status]}</span>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              {reading.rating}/5
            </span>
            {reading.pageCount && <span className="text-sm text-slate-400">{reading.pageCount} páginas</span>}
          </div>

          {reading.tags && (
            <div className="flex flex-wrap gap-2 mb-5">
              {reading.tags.split(',').map((tag) => (
                <span key={tag} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {reading.review && (
            <div className="bg-slate-50 rounded-xl p-5 mb-5">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{reading.review}</p>
            </div>
          )}

          <div className="flex items-center gap-6 text-sm">
            <button onClick={handleLike} className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} />
              {likeCount}
            </button>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MessageCircle className="w-4 h-4" />
              {comments.length}
            </span>
            <span className="text-slate-400">Por {reading.userName}</span>
            {reading.type === 'BOOK' && (
              <Link to={`/books/${reading.id}`} className="ml-auto text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1 transition-colors">
                <BookOpen className="w-4 h-4" />
                Ver capítulos
              </Link>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm shadow-black/[0.03] p-8">
          <h2 className="font-serif text-lg text-slate-900 font-bold mb-5">Comentários</h2>

          {user && (
            <form onSubmit={handleComment} className="flex gap-3 mb-6">
              <input value={newComment} onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escreva um comentário..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              <button type="submit" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                Enviar
              </button>
            </form>
          )}

          <div className="space-y-5">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-medium text-indigo-700 flex-shrink-0">
                  {c.userName[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-900">{c.userName}</span>
                    <span className="text-xs text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{c.text}</p>
                </div>
                {user?.id === c.userId && (
                  <button onClick={() => deleteComment(c.id).then(load)}
                    className="p-1 text-slate-300 hover:text-red-500 transition-colors flex-shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-8">Nenhum comentário ainda. Seja o primeiro!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
