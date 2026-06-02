"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const START_EVENT = "routeprogress:start";

/**
 * Imperatively kick off the progress bar. Use this for navigations that don't
 * go through a plain <Link> click — e.g. `router.push(...)` inside a button
 * handler — so the user still gets instant feedback that something is happening.
 */
export function startRouteProgress() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(START_EVENT));
  }
}

function isModifiedEvent(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

/**
 * A thin top-of-viewport bar that appears the moment a navigation begins and
 * fills in as it completes. It listens for clicks on any internal link, so
 * every <Link> in the app gets instant "I heard you" feedback for free, even
 * while a server-rendered page is still loading.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  // The route we were on when the bar started, used to detect completion.
  const startKeyRef = useRef<string | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    startKeyRef.current = null;
    setProgress(100);
    timers.current.push(
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 220),
    );
  }, [clearTimers]);

  const begin = useCallback(
    (currentKey: string) => {
      clearTimers();
      startKeyRef.current = currentKey;
      setVisible(true);
      setProgress(8);
      // Creep toward ~90% so the bar keeps signalling progress while the
      // destination renders. The final 10% lands when the route changes.
      timers.current.push(setTimeout(() => setProgress(45), 80));
      timers.current.push(setTimeout(() => setProgress(72), 320));
      timers.current.push(setTimeout(() => setProgress(90), 900));
      // Safety net: never let the bar hang if navigation is cancelled.
      timers.current.push(setTimeout(() => finish(), 8000));
    },
    [clearTimers, finish],
  );

  // Auto-detect internal link clicks anywhere in the document.
  useEffect(() => {
    const currentKey = () =>
      `${window.location.pathname}${window.location.search}`;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        isModifiedEvent(event)
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // No navigation if it points at the page we're already on.
      if (`${url.pathname}${url.search}` === currentKey()) return;

      begin(currentKey());
    };

    const onStart = () => begin(currentKey());

    document.addEventListener("click", onClick, true);
    window.addEventListener(START_EVENT, onStart);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(START_EVENT, onStart);
    };
  }, [begin]);

  // When the route actually changes, complete the bar. The key format here
  // must match the `window.location`-derived one used when the bar started.
  useEffect(() => {
    if (startKeyRef.current === null) return;
    const query = searchParams.toString();
    const key = `${pathname}${query ? `?${query}` : ""}`;
    if (key !== startKeyRef.current) {
      finish();
    }
  }, [pathname, searchParams, finish]);

  // Clean up any pending timers on unmount.
  useEffect(() => clearTimers, [clearTimers]);

  return (
    <div
      aria-hidden
      className={`route-progress${visible ? " route-progress-visible" : ""}`}
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
}
