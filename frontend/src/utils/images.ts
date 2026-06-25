const API_URL = import.meta.env.VITE_API_URL || 'https://review-pages.onrender.com';
const BACKEND_URL = API_URL.replace(/\/api\/v1\/?$/, '');

export function transformImageUri(src: string): string {
  if (src.startsWith('/images/')) {
    return BACKEND_URL + src;
  }
  return src;
}
