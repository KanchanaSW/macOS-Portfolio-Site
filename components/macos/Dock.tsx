"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppId } from "@/types/macos";
import { DOCK_APPS } from "@/lib/appRegistry";
import { registerDockIconElement } from "@/lib/dockRefs";
import { useWindowManager } from "@/hooks/useWindowManager";
import { AppIcon } from "./AppIcons";

const MAGNIFY_SCALE = 1.25;
const NEIGHBOR_SCALE = 1.1;

export function Dock() {
  const { windows, openWindow, restoreWindow } = useWindowManager();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bouncingId, setBouncingId] = useState<AppId | null>(null);

  const handleClick = useCallback(
    (id: AppId) => {
      const win = windows[id];
      setBouncingId(id);
      setTimeout(() => setBouncingId(null), 500);

      if (win?.isOpen && win.isMinimized) {
        restoreWindow(id);
      } else if (win?.isOpen) {
        openWindow(id);
      } else {
        openWindow(id);
      }
    },
    [windows, openWindow, restoreWindow]
  );

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return MAGNIFY_SCALE;
    if (distance === 1) return NEIGHBOR_SCALE;
    if (distance === 2) return 1.04;
    return 1;
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[900] flex justify-center">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
        className="pointer-events-auto"
      >
        <div
          className="flex items-end justify-center gap-1 overflow-visible rounded-2xl px-3 py-2 macos-glass-panel"
          style={{
            backdropFilter: "blur(20px) saturate(180%)",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {DOCK_APPS.map((app, index) => (
            <DockIcon
              key={app.id}
              appId={app.id}
              icon={app.icon}
              label={app.title}
              scale={getScale(index)}
              isHovered={hoveredIndex === index}
              isActive={!!windows[app.id]?.isOpen && !windows[app.id]?.isMinimized}
              isBouncing={bouncingId === app.id}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(app.id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

interface DockIconProps {
  appId: AppId;
  icon: string;
  label: string;
  scale: number;
  isHovered: boolean;
  isActive: boolean;
  isBouncing: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function DockIcon({
  appId,
  icon,
  label,
  scale,
  isHovered,
  isActive,
  isBouncing,
  onHover,
  onLeave,
  onClick,
}: DockIconProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const setRef = useCallback(
    (el: HTMLButtonElement | null) => {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el;
      registerDockIconElement(appId, el);
    },
    [appId]
  );

  return (
    <div
      className="relative flex w-12 flex-col items-center justify-end"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <AnimatePresence>
        {isHovered && (
          <div
            className="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2"
            style={{ marginBottom: `${12 + Math.round((scale - 1) * 48)}px` }}
          >
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="relative whitespace-nowrap"
            >
              <div
                className="rounded-md px-2.5 py-1 text-[11px] font-medium text-white shadow-lg"
                style={{
                  background: "rgba(30, 30, 30, 0.85)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {label}
              </div>
              <div
                className="absolute left-1/2 top-full -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent"
                style={{ borderTopColor: "rgba(30, 30, 30, 0.85)" }}
                aria-hidden
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <button
        ref={setRef}
        type="button"
        className={`relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${isBouncing ? "dock-bounce" : ""}`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "bottom center",
          transition: "transform 0.15s ease-out",
        }}
        onClick={onClick}
        aria-label={`Open ${label}`}
      >
        <AppIcon name={icon} size={48} />
        {isActive && (
          <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-white/80" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
