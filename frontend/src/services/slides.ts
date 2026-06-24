import api from './api';
import type { Slide } from '../types';

export function generateSlides(chapterId: number): Promise<Slide[]> {
  return api.get(`/chapters/${chapterId}/slides`).then((res) => res.data);
}
