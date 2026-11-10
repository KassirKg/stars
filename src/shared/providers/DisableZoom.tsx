'use client';

import { useEffect } from 'react';

const ZOOM_KEYS = new Set(['+', '-', '=', '_', '0']);

/**
 * Блокирует масштабирование страницы:
 * - Ctrl/⌘ + колесо мыши и pinch на трекпаде (desktop);
 * - Ctrl/⌘ + «+», «-», «0» (desktop);
 * - gesture-события Safari (macOS/iOS) и multi-touch pinch (mobile).
 *
 * Зум из меню браузера заблокировать невозможно.
 */
export const DisableZoom = () => {
  useEffect(() => {
    const preventDefault = (event: Event) => event.preventDefault();

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && ZOOM_KEYS.has(event.key)) {
        event.preventDefault();
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 1) event.preventDefault();
    };

    const nonPassive: AddEventListenerOptions = { passive: false };

    window.addEventListener('wheel', onWheel, nonPassive);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('touchmove', onTouchMove, nonPassive);
    document.addEventListener('gesturestart', preventDefault, nonPassive);
    document.addEventListener('gesturechange', preventDefault, nonPassive);
    document.addEventListener('gestureend', preventDefault, nonPassive);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
      document.removeEventListener('gestureend', preventDefault);
    };
  }, []);

  return null;
};
