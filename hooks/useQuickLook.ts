"use client";

import { create } from "zustand";
import type { FinderFile } from "@/lib/finderFiles";
import {
  clampWindowPosition,
  getCenteredWindowBounds,
  getCompactWindowBounds,
  getMaxWindowHeight,
  getMaxWindowWidth,
  isCompactViewport,
} from "@/lib/windowBounds";

const BASE_Z = 200;

interface QuickLookState {
  isOpen: boolean;
  file: FinderFile | null;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  openQuickLook: (file: FinderFile) => void;
  relayoutQuickLook: () => void;
  closeQuickLook: () => void;
  updatePosition: (position: { x: number; y: number }) => void;
  focusQuickLook: () => void;
}

function getQuickLookLayout(file: FinderFile) {
  if (isCompactViewport()) {
    const { position, size } = getCompactWindowBounds();
    return { position, size };
  }

  const height = getMaxWindowHeight();
  const width =
    file.type === "photo"
      ? Math.min(520, Math.floor(getMaxWindowWidth() * 0.42))
      : Math.min(680, Math.floor(getMaxWindowWidth() * 0.46));

  return getCenteredWindowBounds({ width, height });
}

export const useQuickLook = create<QuickLookState>((set, get) => ({
  isOpen: false,
  file: null,
  position: { x: 280, y: 36 },
  size: { width: 640, height: 600 },
  zIndex: BASE_Z,

  openQuickLook: (file) => {
    const { position, size } = getQuickLookLayout(file);
    const { zIndex } = get();

    set({
      isOpen: true,
      file,
      size,
      position,
      zIndex: zIndex + 1,
    });
  },

  relayoutQuickLook: () => {
    const { file, isOpen } = get();
    if (!isOpen || !file) return;

    const { position, size } = getQuickLookLayout(file);
    set({ position, size });
  },

  closeQuickLook: () => {
    set({ isOpen: false, file: null });
  },

  updatePosition: (position) => {
    const { size } = get();
    set({ position: clampWindowPosition(position, size) });
  },

  focusQuickLook: () => {
    set({ zIndex: get().zIndex + 1 });
  },
}));
