"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { AppId } from "@/types/macos";
import { DOCK_APPS } from "@/lib/appRegistry";
import { registerDockIconElement } from "@/lib/dockRefs";
import { useWindowManager } from "@/hooks/useWindowManager";
import { AppIcon } from "./AppIcons";

const MAGNIFY_SCALE = 1.6;
const NEIGHBOR_SCALE = 1.25;

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
    if (distance === 2) return 1.1;
    return 1;
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
      className="fixed bottom-3 left-1/2 z-[900] -translate-x-1/2"
    >
      <div
        className="flex items-end gap-1 rounded-2xl px-3 py-2 macos-glass-panel"
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
            isActive={!!windows[app.id]?.isOpen && !windows[app.id]?.isMinimized}
            isBouncing={bouncingId === app.id}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(app.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface DockIconProps {
  appId: AppId;
  icon: string;
  label: string;
  scale: number;
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
    <button
      ref={setRef}
      type="button"
      className={`relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${isBouncing ? "dock-bounce" : ""}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
        transition: "transform 0.15s ease-out",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label={`Open ${label}`}
    >
      <AppIcon name={icon} size={48} />
      {isActive && (
        <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-white/80" aria-hidden="true" />
      )}
    </button>
  );
}
