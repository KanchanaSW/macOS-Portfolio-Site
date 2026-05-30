"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/portfolio.config";
import { useWindowManager, useSystemStore } from "@/hooks/useWindowManager";
import { getAppDefinition } from "@/lib/appRegistry";
import { AppleLogo, WifiIcon, BatteryIcon, ControlCenterIcon } from "./AppIcons";

export function MenuBar() {
  const { focusedWindowId } = useWindowManager();
  const {
    clock,
    appleMenuOpen,
    setAppleMenuOpen,
    setControlCenterOpen,
    updateClock,
  } = useSystemStore();

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [updateClock]);

  const focusedTitle = focusedWindowId
    ? getAppDefinition(focusedWindowId)?.title ?? "Finder"
    : "Finder";

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[1000] flex h-7 items-center justify-between px-4 text-xs text-white/90 macos-blur"
      style={{
        background: "rgba(255,255,255,0.15)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        height: "28px",
      }}
    >
      {/* Left */}
      <div className="relative flex items-center gap-4">
        <button
          type="button"
          className="flex items-center opacity-90 hover:opacity-100"
          onClick={() => setAppleMenuOpen(!appleMenuOpen)}
          aria-label="Apple menu"
          aria-expanded={appleMenuOpen}
        >
          <AppleLogo className="h-3.5 w-3" />
        </button>
        <span className="font-semibold">{focusedTitle}</span>

        <AnimatePresence>
          {appleMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-1 w-56 rounded-lg p-3 macos-glass-panel shadow-xl"
            >
              <p className="text-sm font-semibold text-white">{portfolio.name}</p>
              <p className="text-xs text-white/60">{portfolio.title}</p>
              <div className="my-2 h-px bg-white/10" />
              <p className="text-xs text-white/50">About This Mac</p>
              <p className="mt-1 text-xs text-white/40">macOS Portfolio v1.0</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Center - hidden on small screens */}
      <span className="hidden font-medium text-white/80 md:block">{focusedTitle}</span>

      {/* Right */}
      <div className="flex items-center gap-3">
        <WifiIcon className="h-3 w-4 opacity-80" />
        <div className="flex items-center gap-1">
          <BatteryIcon className="h-3 w-5 opacity-80" />
          <span className="text-[10px] opacity-80">87%</span>
        </div>
        <span className="hidden sm:inline">{clock}</span>
        <button
          type="button"
          onClick={() => setControlCenterOpen(true)}
          className="opacity-80 hover:opacity-100"
          aria-label="Control Center"
        >
          <ControlCenterIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
