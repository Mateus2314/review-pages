import api from './api';
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
  const { data } = await api.get<PageResponse<Reading>>('/readings', { params });
  return data;
}

export async function getReading(id: number) {
  const { data } = await api.get<Reading>(`/readings/${id}`);
  return data;
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
  const { data } = await api.get(`/readings/${readingId}/comments`);
  return data;
}

export async function toggleLike(readingId: number) {
  const { data } = await api.post(`/readings/${readingId}/like`);
  return data as { liked: boolean; count: number };
}

export async function getStats() {
  const { data } = await api.get<Stats>('/stats');
  return data;
}

export async function submitFeedback(message: string, type: string) {
  const { data } = await api.post('/feedback', { message, type });
  return data;
}
