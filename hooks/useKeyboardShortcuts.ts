"use client";

import { useEffect } from "react";
import { useWindowManager, useSystemStore } from "@/hooks/useWindowManager";
import { useQuickLook } from "@/hooks/useQuickLook";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function useKeyboardShortcuts() {
  const { closeWindow, getFrontmostWindow } = useWindowManager();
  const { isOpen: quickLookOpen, closeQuickLook } = useQuickLook();
  const { spotlightOpen, setSpotlightOpen, setControlCenterOpen, setAppleMenuOpen } = useSystemStore();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes frontmost window or spotlight
      if (e.key === "Escape") {
        if (quickLookOpen) {
          closeQuickLook();
          return;
        }
        if (spotlightOpen) {
          setSpotlightOpen(false);
          return;
        }
        setControlCenterOpen(false);
        setAppleMenuOpen(false);
        const front = getFrontmostWindow();
        if (front) {
          closeWindow(front.id);
        }
        return;
      }

      // Cmd+Space or Ctrl+Space for Spotlight
      if ((e.metaKey || e.ctrlKey) && e.code === "Space" && !isMobile) {
        e.preventDefault();
        setSpotlightOpen(!spotlightOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    spotlightOpen,
    quickLookOpen,
    closeQuickLook,
    setSpotlightOpen,
    setControlCenterOpen,
    setAppleMenuOpen,
    closeWindow,
    getFrontmostWindow,
    isMobile,
  ]);
}
