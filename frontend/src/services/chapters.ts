import { cachedGet } from './api';
import type { Chapter } from '../types';

export async function listChapters(readingId: number) {
  return cachedGet<Chapter[]>(`/readings/${readingId}/chapters`);
}

export async function getChapter(id: number) {
  return cachedGet<Chapter>(`/chapters/${id}`);
}
