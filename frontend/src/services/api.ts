import axios from 'axios';
import { getCachedResponse, setCachedResponse, invalidateCache } from './cacheUtils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => {
    // On successful mutations, invalidate reading-related caches
    if (res.config.method && ['post', 'put', 'patch', 'delete'].includes(res.config.method)) {
      invalidateCache('/readings');
      invalidateCache('/chapters');
      invalidateCache('/comments');
    }
    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

/* ── Cached GET helper ──
 *  1. Returns cached data immediately (synchronous) if fresh
 *  2. Fires the real request in the background
 *  3. Returns the fresh response when it arrives
 *  This gives instant perceived load while keeping data up to date. */
export async function cachedGet<T>(url: string, params?: Record<string, any>): Promise<T> {
  const cached = getCachedResponse<T>(url);
  if (cached) {
    // Fire real request in background to refresh cache
    api.get<T>(url, { params }).then((res) => {
      setCachedResponse(url, res.data);
    }).catch(() => {
      /* silent — stale data is better than nothing */
    });
    return cached;
  }

  const { data } = await api.get<T>(url, { params });
  setCachedResponse(url, data);
  return data;
}

export default api;
