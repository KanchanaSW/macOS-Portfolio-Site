"use client";

import { motion } from "framer-motion";
import type { AppId } from "@/types/macos";
import { DESKTOP_ICONS } from "@/lib/appRegistry";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { AppIcon } from "./AppIcons";
import { portfolio } from "@/portfolio.config";

const wallpaperClasses: Record<string, string> = {
  aurora: "wallpaper-aurora",
  "big-sur": "wallpaper-big-sur",
  sequoia: "wallpaper-sequoia",
  monterey: "wallpaper-monterey",
};

export function Desktop() {
  const { openWindow } = useWindowManager();
  const isMobile = useIsMobile();
  const wallpaperClass = wallpaperClasses[portfolio.wallpaper] ?? "wallpaper-aurora";

  const handleClick = (id: AppId) => {
    openWindow(id);
  };

  return (
    <div className={`fixed inset-0 ${wallpaperClass}`}>
      {!isMobile && (
      <div className="absolute left-4 top-10 flex flex-col gap-4 pt-2 md:left-6">
        {DESKTOP_ICONS.map((icon, index) => (
          <motion.button
            key={icon.id}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            className="group flex w-20 flex-col items-center gap-1 rounded-lg p-2 outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/40"
            onClick={() => handleClick(icon.id)}
            aria-label={`Open ${icon.label}`}
          >
            <div className="rounded-xl p-1 transition-shadow group-hover:shadow-lg macos-glass-panel">
              <AppIcon name={icon.icon} size={48} />
            </div>
            <span className="max-w-full truncate text-center text-xs text-white drop-shadow-md">
              {icon.label}
            </span>
          </motion.button>
        ))}
      </div>
      )}
    </div>
  );
}
