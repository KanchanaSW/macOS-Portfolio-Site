"use client";

import { DOCK_APPS } from "@/lib/appRegistry";
import { useWindowManager } from "@/hooks/useWindowManager";
import { AppIcon } from "./AppIcons";
import type { AppId } from "@/types/macos";

export function MobileSpringboard() {
  const { openWindow, windows } = useWindowManager();
  const apps = DOCK_APPS.filter((a) => !a.decorative);

  const hasOpenWindow = Object.values(windows).some((w) => w.isOpen && !w.isMinimized);
  if (hasOpenWindow) return null;

  return (
    <div className="fixed inset-0 z-10 flex flex-col pt-12 pb-safe">
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="grid grid-cols-4 gap-4 sm:gap-6">
          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => openWindow(app.id as AppId)}
              className="flex flex-col items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={`Open ${app.title}`}
            >
              <AppIcon name={app.icon} size={60} />
              <span className="max-w-full truncate text-center text-[10px] text-white drop-shadow">
                {app.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IOSStatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false });

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[1000] flex h-11 items-end justify-between px-6 pb-1 text-xs font-semibold text-white pt-safe"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <span>{time}</span>
      <div className="flex items-center gap-1">
        <span>●●●○</span>
        <span>WiFi</span>
        <span>🔋</span>
      </div>
    </div>
  );
}
