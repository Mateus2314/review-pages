const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://review-pages.onrender.com';

export function transformImageUri(src: string): string {
  if (src.startsWith('/images/')) {
    return BACKEND_URL + src;
  }
  return src;
}
