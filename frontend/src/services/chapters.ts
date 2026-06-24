import api from './api';
import type { Chapter } from '../types';

export async function listChapters(readingId: number) {
  const { data } = await api.get<Chapter[]>(`/readings/${readingId}/chapters`);
  return data;
}

export async function getChapter(id: number) {
  const { data } = await api.get<Chapter>(`/chapters/${id}`);
  return data;
}
