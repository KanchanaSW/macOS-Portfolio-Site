const MENUBAR_HEIGHT = 28;
const DOCK_HEIGHT = 80;
const WINDOW_MARGIN = 16;

export function getMaxWindowHeight(): number {
  if (typeof window === "undefined") return 600;
  return window.innerHeight - MENUBAR_HEIGHT - DOCK_HEIGHT - WINDOW_MARGIN;
}

export function getMaxWindowWidth(): number {
  if (typeof window === "undefined") return 800;
  return window.innerWidth - WINDOW_MARGIN * 2;
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

  const minY = MENUBAR_HEIGHT + WINDOW_MARGIN / 2;
  const maxY = window.innerHeight - DOCK_HEIGHT - size.height - WINDOW_MARGIN / 2;
  const minX = WINDOW_MARGIN / 2;
  const maxX = window.innerWidth - size.width - WINDOW_MARGIN / 2;

  return {
    x: Math.max(minX, Math.min(position.x, maxX)),
    y: Math.max(minY, Math.min(position.y, maxY)),
  };
}

export function getViewportWindowBounds(
  position: { x: number; y: number },
  size: { width: number; height: number }
): { position: { x: number; y: number }; size: { width: number; height: number } } {
  const clampedSize = clampWindowSize(size);
  const clampedPosition = clampWindowPosition(position, clampedSize);
  return { position: clampedPosition, size: clampedSize };
}
