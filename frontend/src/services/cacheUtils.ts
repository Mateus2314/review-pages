const CACHE_PREFIX = 'rp_api_';
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

export function getCachedResponse<T>(url: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + url);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiry) {
      localStorage.removeItem(CACHE_PREFIX + url);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

export function setCachedResponse<T>(url: string, data: T, ttl = DEFAULT_TTL): void {
  try {
    const entry: CacheEntry<T> = { data, expiry: Date.now() + ttl };
    localStorage.setItem(CACHE_PREFIX + url, JSON.stringify(entry));
  } catch {
    // localStorage quota exceeded — silently ignore
  }
}

/** Invalidate all cache entries whose stored URL starts with the given prefix */
export function invalidateCache(prefix: string): void {
  const fullPrefix = CACHE_PREFIX + prefix;
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(fullPrefix)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
}

/** Invalidate all caches whose URL contains a known reading/chapter path */
export function invalidateReadingCache(): void {
  invalidateCache('/readings');
  invalidateCache('/chapters');
  invalidateCache('/stats');
  invalidateCache('/comments');
}
