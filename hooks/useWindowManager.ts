"use client";

import { create } from "zustand";
import type { AppId, WindowState } from "@/types/macos";
import { getAppDefinition, resolveAppId } from "@/lib/appRegistry";

const BASE_Z_INDEX = 100;
const STORAGE_KEY = "macos-window-positions";

interface WindowManagerState {
  windows: Record<AppId, WindowState>;
  focusedWindowId: AppId | null;
  maxZIndex: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleFullscreen: (id: AppId) => void;
  updatePosition: (id: AppId, position: { x: number; y: number }) => void;
  updateSize: (id: AppId, size: { width: number; height: number }) => void;
  getFrontmostWindow: () => WindowState | null;
}

function createInitialWindow(id: AppId, zIndex: number): WindowState {
  const def = getAppDefinition(id);
  const savedPositions = loadSavedPositions();
  const saved = savedPositions[id];

  return {
    id,
    isOpen: true,
    isMinimized: false,
    isFullscreen: false,
    zIndex,
    position: saved?.position ?? def?.defaultPosition ?? { x: 100, y: 80 },
    size: saved?.size ?? def?.defaultSize ?? { width: 600, height: 400 },
  };
}

function loadSavedPositions(): Partial<
  Record<AppId, { position: { x: number; y: number }; size: { width: number; height: number } }>
> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePosition(
  id: AppId,
  position: { x: number; y: number },
  size: { width: number; height: number }
) {
  if (typeof window === "undefined") return;
  const saved = loadSavedPositions();
  saved[id] = { position, size };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

export const useWindowManager = create<WindowManagerState>((set, get) => ({
  windows: {} as Record<AppId, WindowState>,
  focusedWindowId: null,
  maxZIndex: BASE_Z_INDEX,

  openWindow: (rawId) => {
    const id = resolveAppId(rawId);
    const def = getAppDefinition(id);
    if (!def || def.decorative) return;

    const { windows, maxZIndex } = get();
    const existing = windows[id];

    if (existing?.isOpen) {
      if (existing.isMinimized) {
        get().restoreWindow(id);
      } else {
        get().focusWindow(id);
      }
      return;
    }

    const newZ = maxZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: createInitialWindow(id, newZ),
      },
      focusedWindowId: id,
      maxZIndex: newZ,
    });
  },

  closeWindow: (rawId) => {
    const id = resolveAppId(rawId);
    const { windows, focusedWindowId } = get();
    const win = windows[id];
    if (!win) return;

    if (win.isOpen) {
      savePosition(id, win.position, win.size);
    }

    const updated = { ...windows, [id]: { ...win, isOpen: false, isMinimized: false, isFullscreen: false } };
    const openWindows = Object.values(updated).filter((w) => w.isOpen && !w.isMinimized);
    const newFocus = openWindows.sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;

    set({
      windows: updated,
      focusedWindowId: focusedWindowId === id ? newFocus : focusedWindowId,
    });
  },

  minimizeWindow: (rawId) => {
    const id = resolveAppId(rawId);
    const { windows } = get();
    const win = windows[id];
    if (!win?.isOpen) return;

    set({
      windows: {
        ...windows,
        [id]: { ...win, isMinimized: true },
      },
      focusedWindowId: null,
    });
  },

  restoreWindow: (rawId) => {
    const id = resolveAppId(rawId);
    const { windows, maxZIndex } = get();
    const win = windows[id];
    if (!win) return;

    const newZ = maxZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: { ...win, isOpen: true, isMinimized: false, zIndex: newZ },
      },
      focusedWindowId: id,
      maxZIndex: newZ,
    });
  },

  focusWindow: (rawId) => {
    const id = resolveAppId(rawId);
    const { windows, maxZIndex } = get();
    const win = windows[id];
    if (!win?.isOpen || win.isMinimized) return;

    const newZ = maxZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: { ...win, zIndex: newZ },
      },
      focusedWindowId: id,
      maxZIndex: newZ,
    });
  },

  toggleFullscreen: (rawId) => {
    const id = resolveAppId(rawId);
    const { windows } = get();
    const win = windows[id];
    if (!win?.isOpen || win.isMinimized) return;

    set({
      windows: {
        ...windows,
        [id]: { ...win, isFullscreen: !win.isFullscreen },
      },
    });
  },

  updatePosition: (rawId, position) => {
    const id = resolveAppId(rawId);
    const { windows } = get();
    const win = windows[id];
    if (!win) return;

    const updated = { ...win, position };
    savePosition(id, updated.position, updated.size);
    set({ windows: { ...windows, [id]: updated } });
  },

  updateSize: (rawId, size) => {
    const id = resolveAppId(rawId);
    const { windows } = get();
    const win = windows[id];
    if (!win) return;

    const updated = { ...win, size };
    savePosition(id, updated.position, updated.size);
    set({ windows: { ...windows, [id]: updated } });
  },

  getFrontmostWindow: () => {
    const { windows } = get();
    const open = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);
    return open.sort((a, b) => b.zIndex - a.zIndex)[0] ?? null;
  },
}));

interface SystemState {
  clock: string;
  spotlightOpen: boolean;
  controlCenterOpen: boolean;
  appleMenuOpen: boolean;
  bootComplete: boolean;
  notifications: Array<{ id: string; title: string; body: string }>;
  setSpotlightOpen: (open: boolean) => void;
  setControlCenterOpen: (open: boolean) => void;
  setAppleMenuOpen: (open: boolean) => void;
  setBootComplete: (complete: boolean) => void;
  addNotification: (title: string, body: string) => void;
  dismissNotification: (id: string) => void;
  updateClock: () => void;
}

export const useSystemStore = create<SystemState>((set, get) => ({
  clock: "",
  spotlightOpen: false,
  controlCenterOpen: false,
  appleMenuOpen: false,
  bootComplete: false,
  notifications: [],

  setSpotlightOpen: (open) => set({ spotlightOpen: open, controlCenterOpen: false, appleMenuOpen: false }),
  setControlCenterOpen: (open) => set({ controlCenterOpen: open, spotlightOpen: false, appleMenuOpen: false }),
  setAppleMenuOpen: (open) => set({ appleMenuOpen: open, controlCenterOpen: false }),
  setBootComplete: (complete) => set({ bootComplete: complete }),

  addNotification: (title, body) => {
    const id = `notif-${Date.now()}`;
    set({ notifications: [...get().notifications, { id, title, body }] });
    setTimeout(() => get().dismissNotification(id), 4000);
  },

  dismissNotification: (id) => {
    set({ notifications: get().notifications.filter((n) => n.id !== id) });
  },

  updateClock: () => {
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    set({ clock: formatted });
  },
}));
