"use client";

import { createContext, useContext } from "react";

interface WindowControlsContextValue {
  onClose: () => void;
  onMinimize: () => void;
  onFullscreen: () => void;
  isFullscreen: boolean;
  unifiedToolbar: boolean;
  onDragStart?: (e: React.PointerEvent) => void;
  onDragMove?: (e: React.PointerEvent) => void;
  onDragEnd?: (e: React.PointerEvent) => void;
}

const WindowControlsContext = createContext<WindowControlsContextValue | null>(null);

export function WindowControlsProvider({
  value,
  children,
}: {
  value: WindowControlsContextValue;
  children: React.ReactNode;
}) {
  return (
    <WindowControlsContext.Provider value={value}>{children}</WindowControlsContext.Provider>
  );
}

export function useWindowControls() {
  const ctx = useContext(WindowControlsContext);
  if (!ctx) {
    throw new Error("useWindowControls must be used within WindowControlsProvider");
  }
  return ctx;
}

export function useOptionalWindowControls() {
  return useContext(WindowControlsContext);
}
