const MENUBAR_HEIGHT = 28;
const DOCK_HEIGHT = 80;
const STATUSBAR_HEIGHT = 44;
const WINDOW_MARGIN = 16;

export { MENUBAR_HEIGHT, DOCK_HEIGHT, STATUSBAR_HEIGHT, WINDOW_MARGIN };

export interface ViewportChrome {
  top: number;
  bottom: number;
}

function getViewportWidth(): number {
  if (typeof window === "undefined") return 800;
  return window.innerWidth;
}

function getViewportHeight(): number {
  if (typeof window === "undefined") return 600;
  return window.innerHeight;
}

function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 767;
}

export function getViewportChrome(): ViewportChrome {
  if (isMobileViewport()) {
    return { top: STATUSBAR_HEIGHT, bottom: 0 };
  }
  return { top: MENUBAR_HEIGHT, bottom: DOCK_HEIGHT };
}

export function getMaxWindowHeight(): number {
  const chrome = getViewportChrome();
  return getViewportHeight() - chrome.top - chrome.bottom - WINDOW_MARGIN;
}

export function getMaxWindowWidth(): number {
  return getViewportWidth() - WINDOW_MARGIN * 2;
}

export function clampWindowSize(size: { width: number; height: number }): {
  width: number;
  height: number;
} {
  return {
    width: Math.min(size.width, getMaxWindowWidth()),
    height: Math.min(size.height, getMaxWindowHeight()),
  };
}

export function clampWindowPosition(
  position: { x: number; y: number },
  size: { width: number; height: number }
): { x: number; y: number } {
  if (typeof window === "undefined") return position;

  const chrome = getViewportChrome();
  const minY = chrome.top + WINDOW_MARGIN / 2;
  const maxY = getViewportHeight() - chrome.bottom - size.height - WINDOW_MARGIN / 2;
  const minX = WINDOW_MARGIN / 2;
  const maxX = getViewportWidth() - size.width - WINDOW_MARGIN / 2;

  return {
    x: Math.max(minX, Math.min(position.x, maxX)),
    y: Math.max(minY, Math.min(position.y, maxY)),
  };
}

export function getCenteredWindowBounds(size: { width: number; height: number }): {
  position: { x: number; y: number };
  size: { width: number; height: number };
} {
  const clampedSize = clampWindowSize(size);

  if (typeof window === "undefined") {
    return { position: { x: 280, y: MENUBAR_HEIGHT + WINDOW_MARGIN / 2 }, size: clampedSize };
  }

  const chrome = getViewportChrome();
  const x = Math.round((getViewportWidth() - clampedSize.width) / 2);
  const y = chrome.top + WINDOW_MARGIN / 2;

  return {
    position: clampWindowPosition({ x, y }, clampedSize),
    size: clampedSize,
  };
}

export function getCompactWindowBounds(): {
  position: { x: number; y: number };
  size: { width: number; height: number };
} {
  const chrome = getViewportChrome();
  const width = getViewportWidth();
  const bottomInset = isMobileViewport() ? 0 : chrome.bottom;
  const height = getViewportHeight() - chrome.top - bottomInset;

  return {
    position: { x: 0, y: chrome.top },
    size: { width, height },
  };
}

export function isCompactViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 1023;
}

export function getViewportWindowBounds(
  position: { x: number; y: number },
  size: { width: number; height: number }
): { position: { x: number; y: number }; size: { width: number; height: number } } {
  const clampedSize = clampWindowSize(size);
  const clampedPosition = clampWindowPosition(position, clampedSize);
  return { position: clampedPosition, size: clampedSize };
}
