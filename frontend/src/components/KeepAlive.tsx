import { useEffect, useRef } from 'react';

const PING_INTERVAL = 5 * 60 * 1000; // 5 minutes (Render free tier spins down after 15 min)

/** Resolve the health endpoint URL from VITE_API_URL or fallback */
function getHealthUrl(): string {
  const apiBase = import.meta.env.VITE_API_URL || '/api/v1';
  if (apiBase.startsWith('http')) {
    return new URL('/actuator/health', apiBase).toString();
  }
  return '/actuator/health';
}

/**
 * Keep the Render backend warm by pinging the health endpoint periodically.
 * Only pings while the tab is visible to avoid background throttling.
 */
export default function KeepAlive() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastPingRef = useRef(0);

  useEffect(() => {
    function startPinging() {
      if (intervalRef.current) return;

      // Ping immediately when page becomes visible
      doPing();

      intervalRef.current = setInterval(doPing, PING_INTERVAL);
    }

    function stopPinging() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    async function doPing() {
      // Throttle: don't ping more than once per 60s
      const now = Date.now();
      if (now - lastPingRef.current < 60_000) return;
      lastPingRef.current = now;

      const url = getHealthUrl();
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10_000);
        await fetch(url, {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store',
        });
        clearTimeout(timeout);
      } catch {
        // Silent — backend might be cold-starting, that's expected
      }
    }

    // Ping when tab becomes visible (user returns to the page)
    function onVisibilityChange() {
      if (document.visibilityState === 'visible') {
        doPing();
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange);

    // Start pinging if tab is already visible
    if (document.visibilityState === 'visible') {
      startPinging();
    }

    return () => {
      stopPinging();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return null; // Invisible component
}
