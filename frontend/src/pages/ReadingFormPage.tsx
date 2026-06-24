import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReading, createReading, updateReading } from '../services/readings';
import type { ReadingForm } from '../types';

const defaultForm: ReadingForm = {
  title: '', type: 'BOOK', author: '', coverUrl: '',
  rating: 0, review: '', tags: '', status: 'WANT_TO_READ',
  startedAt: '', finishedAt: '', pageCount: null, currentPage: null
};

export default function ReadingFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<ReadingForm>(defaultForm);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (id) {
      getReading(Number(id)).then((r) => {
        setForm({
          title: r.title, type: r.type, author: r.author || '',
          coverUrl: r.coverUrl || '', rating: r.rating,
          review: r.review || '', tags: r.tags || '',
          status: r.status,
          startedAt: r.startedAt ? r.startedAt.slice(0, 16) : '',
          finishedAt: r.finishedAt ? r.finishedAt.slice(0, 16) : '',
          pageCount: r.pageCount ?? null,
          currentPage: r.currentPage ?? null,
        });
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    if (isEdit) {
      await updateReading(Number(id), payload);
    } else {
      await createReading(payload);
    }
    navigate(isEdit ? `/readings/${id}` : '/readings');
  };

  const set = (key: keyof ReadingForm, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (loading) return <p className="text-center text-gray-500">Carregando...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Editar' : 'Nova'} leitura</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input value={form.title} onChange={(e) => set('title', e.target.value)} required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select value={form.type} onChange={(e) => set('type', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="BOOK">Livro</option>
              <option value="ARTICLE">Artigo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="WANT_TO_READ">Quero ler</option>
              <option value="READING">Lendo</option>
              <option value="FINISHED">Lido</option>
              <option value="DNF">Abandonei</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
            <input value={form.author} onChange={(e) => set('author', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nota (0-5)</label>
            <input type="number" min={0} max={5} value={form.rating}
              onChange={(e) => set('rating', Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Páginas</label>
            <input type="number" min={0} value={form.pageCount ?? ''}
              onChange={(e) => set('pageCount', e.target.value ? Number(e.target.value) : null)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Página atual</label>
            <input type="number" min={0} value={form.currentPage ?? ''}
              onChange={(e) => set('currentPage', e.target.value ? Number(e.target.value) : null)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (separadas por vírgula)</label>
            <input value={form.tags} onChange={(e) => set('tags', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de início</label>
            <input type="datetime-local" value={form.startedAt}
              onChange={(e) => set('startedAt', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de conclusão</label>
            <input type="datetime-local" value={form.finishedAt}
              onChange={(e) => set('finishedAt', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Resenha</label>
            <textarea rows={5} value={form.review} onChange={(e) => set('review', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            {isEdit ? 'Salvar' : 'Criar'}
          </button>
          <button type="button" onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
