"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { portfolio } from "@/portfolio.config";
import type { AppId } from "@/types/macos";
import { useWindowControls } from "@/contexts/WindowControlsContext";
import { TrafficLights } from "@/components/macos/TrafficLights";
import { AppIcon } from "@/components/macos/AppIcons";
import { FINDER_FILES } from "@/lib/finderFiles";
import { FINDER_SIDEBAR_ITEMS, isFinderSidebarApp } from "@/lib/appRegistry";
import { useQuickLook } from "@/hooks/useQuickLook";
import { useWindowManager } from "@/hooks/useWindowManager";

const FILES = FINDER_FILES;

function FileIcon({ type }: { type: (typeof FILES)[0]["type"] }) {
  if (type === "photo") {
    return (
      <div className="relative h-4 w-4 flex-shrink-0 overflow-hidden rounded-[3px]">
        <Image src={portfolio.photo} alt="" fill className="object-cover" sizes="16px" />
      </div>
    );
  }

  const colors: Record<string, string> = {
    md: "from-blue-400 to-blue-600",
    code: "from-orange-400 to-orange-600",
  };

  return (
    <div
      className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[3px] bg-gradient-to-br ${colors[type] ?? "from-gray-400 to-gray-600"}`}
    >
      <span className="text-[7px] font-bold text-white/90">
        {type === "md" ? "M" : type === "code" ? "TS" : "F"}
      </span>
    </div>
  );
}

function ToolbarButton({
  children,
  label,
  active,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex h-7 w-7 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 ${
        active ? "bg-white/12 text-white" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default function Finder() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [activeSidebar, setActiveSidebar] = useState<AppId>("finder");
  const { openQuickLook } = useQuickLook();
  const { openWindow, focusWindow, windows, focusedWindowId } = useWindowManager();
  const { onClose, onMinimize, onFullscreen, isFullscreen, unifiedToolbar, onDragStart, onDragMove, onDragEnd } =
    useWindowControls();

  useEffect(() => {
    if (focusedWindowId && isFinderSidebarApp(focusedWindowId)) {
      setActiveSidebar(focusedWindowId);
    }
  }, [focusedWindowId]);

  const currentFolder =
    FINDER_SIDEBAR_ITEMS.find((item) => item.id === activeSidebar)?.label ?? "About Me";

  const handleSidebarClick = (id: AppId) => {
    setActiveSidebar(id);

    const existing = windows[id];
    if (existing?.isOpen && !existing.isMinimized) {
      focusWindow(id);
      return;
    }

    const hasOtherOpen = Object.values(windows).some(
      (w) => w.isOpen && !w.isMinimized && w.id !== id
    );
    openWindow(id, { stackBesideOpen: id !== "finder" && hasOtherOpen });
  };

  return (
    <div className="flex h-full flex-col text-[13px] text-white/90">
      {/* Unified toolbar */}
      <div className="macos-finder-toolbar flex-shrink-0">
        <div
          className="relative flex h-[52px] items-center gap-1 px-2"
          onPointerDown={unifiedToolbar ? onDragStart : undefined}
          onPointerMove={unifiedToolbar ? onDragMove : undefined}
          onPointerUp={unifiedToolbar ? onDragEnd : undefined}
        >
          {unifiedToolbar && (
            <TrafficLights
              onClose={onClose}
              onMinimize={onMinimize}
              onFullscreen={onFullscreen}
              isFullscreen={isFullscreen}
            />
          )}

          <div className="ml-1 flex items-center gap-0.5">
            <ToolbarButton label="Back">
              <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7.5 2.5 3.5 6l4 4" />
              </svg>
            </ToolbarButton>
            <ToolbarButton label="Forward">
              <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4.5 2.5 8.5 6l-4 4" />
              </svg>
            </ToolbarButton>
          </div>

          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
            <span className="text-[13px] font-semibold text-white/90">{currentFolder}</span>
          </div>

          <div className="ml-auto flex items-center gap-0.5">
            <ToolbarButton label="List view" active>
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M2 3.5A.5.5 0 0 1 2.5 3h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z" />
              </svg>
            </ToolbarButton>
            <ToolbarButton label="Icon view">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M2 2.5A.5.5 0 0 1 2.5 2h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3Zm0 6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3Zm0 6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3Z" />
              </svg>
            </ToolbarButton>
            <ToolbarButton label="Share">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M11 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM5 8.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm6 3a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm-1.06-2.03a.75.75 0 0 0-1.28.77l.97.56a2.25 2.25 0 0 1-2.3 3.9.75.75 0 1 0 .82 1.26 3.75 3.75 0 0 0 3.84-6.5l.97-.56a.75.75 0 0 0-.02-1.43Z" />
              </svg>
            </ToolbarButton>
            <ToolbarButton label="Search">
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M10.5 9.5a5 5 0 1 0-1.06 1.06l2.55 2.55a.75.75 0 1 0 1.06-1.06L10.5 9.5ZM6 10.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z" />
              </svg>
            </ToolbarButton>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 pb-2">
          <div className="flex h-7 flex-1 items-center rounded-md bg-black/25 px-2.5 text-[12px] text-white/50">
            {currentFolder}
          </div>
          <button
            type="button"
            aria-label="Add filter"
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/50 hover:bg-white/10"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="macos-finder-sidebar hidden w-[180px] flex-shrink-0 overflow-y-auto macos-scroll py-2 pl-2 pr-1 lg:flex lg:flex-col">
          <ul className="space-y-0.5">
            {FINDER_SIDEBAR_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleSidebarClick(item.id)}
                  className={`macos-finder-sidebar-item flex w-full items-center gap-2 px-2 py-[5px] text-[13px] ${
                    activeSidebar === item.id
                      ? "macos-finder-sidebar-item-active"
                      : "text-white/85"
                  }`}
                >
                  <AppIcon name={item.icon} size={16} />
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* List view */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="grid grid-cols-[1fr_auto] gap-2 border-b border-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/35 lg:grid-cols-[minmax(180px,2fr)_80px_1.2fr_1.4fr]">
            <span>Name</span>
            <span>Size</span>
            <span className="hidden lg:block">Kind</span>
            <span className="hidden lg:block">Date Added</span>
          </div>

          <div className="flex-1 overflow-y-auto macos-scroll">
            {FILES.map((file) => (
              <button
                key={file.name}
                type="button"
                onClick={() => {
                  setSelectedFile(file.name);
                  openQuickLook(file);
                }}
                className={`macos-finder-list-row grid w-full grid-cols-[1fr_auto] gap-2 px-3 py-[5px] text-left text-[13px] lg:grid-cols-[minmax(180px,2fr)_80px_1.2fr_1.4fr] ${
                  selectedFile === file.name ? "macos-finder-list-row-selected" : ""
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <FileIcon type={file.type} />
                  <span className="truncate">{file.name}</span>
                </span>
                <span className="text-white/55">{file.size}</span>
                <span className="hidden truncate text-white/55 lg:block">{file.kind}</span>
                <span className="hidden truncate text-white/55 lg:block">{file.dateAdded}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Path bar */}
      <div className="flex h-6 flex-shrink-0 items-center gap-1 overflow-x-auto whitespace-nowrap border-t border-white/[0.06] bg-black/15 px-3 text-[11px] text-white/45 macos-scroll">
        <span>Macintosh HD</span>
        <span className="text-white/25">›</span>
        <span>Users</span>
        <span className="text-white/25">›</span>
        <span>{portfolio.name.split(" ")[0].toLowerCase()}</span>
        <span className="text-white/25">›</span>
        <span className="text-white/65">{currentFolder}</span>
      </div>

      {/* Status bar */}
      <div className="flex h-[22px] flex-shrink-0 items-center justify-center border-t border-white/[0.06] bg-black/10 text-[11px] text-white/40">
        {FILES.length} items
      </div>
    </div>
  );
}
