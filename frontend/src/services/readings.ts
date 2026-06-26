import api, { cachedGet } from './api';
import type { Reading, ReadingForm, Stats } from '../types';

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export async function listReadings(params?: {
  type?: string;
  status?: string;
  tag?: string;
  page?: number;
  size?: number;
}) {
  const query = new URLSearchParams();
  if (params?.type) query.set('type', params.type);
  if (params?.status) query.set('status', params.status);
  if (params?.tag) query.set('tag', params.tag);
  if (params?.page !== undefined) query.set('page', String(params.page));
  if (params?.size !== undefined) query.set('size', String(params.size));
  const qs = query.toString();
  const url = '/readings' + (qs ? '?' + qs : '');
  return cachedGet<PageResponse<Reading>>(url);
}

export async function getReading(id: number) {
  return cachedGet<Reading>(`/readings/${id}`);
}

export async function createReading(form: ReadingForm) {
  const { data } = await api.post<Reading>('/readings', form);
  return data;
}

export async function updateReading(id: number, form: ReadingForm) {
  const { data } = await api.put<Reading>(`/readings/${id}`, form);
  return data;
}

export async function deleteReading(id: number) {
  await api.delete(`/readings/${id}`);
}

export async function addComment(readingId: number, text: string) {
  const { data } = await api.post(`/readings/${readingId}/comments`, { text });
  return data;
}

export async function deleteComment(id: number) {
  await api.delete(`/comments/${id}`);
}

export async function getComments(readingId: number) {
  return cachedGet<any[]>(`/readings/${readingId}/comments`);
}

export async function toggleLike(readingId: number) {
  const { data } = await api.post(`/readings/${readingId}/like`);
  return data as { liked: boolean; count: number };
}

export async function getStats() {
  return cachedGet<Stats>('/stats');
}

export async function submitFeedback(message: string, type: string) {
  const { data } = await api.post('/feedback', { message, type });
  return data;
}
