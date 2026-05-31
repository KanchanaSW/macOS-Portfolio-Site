"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolio } from "@/portfolio.config";
import { useWindowControls } from "@/contexts/WindowControlsContext";
import { TrafficLights } from "@/components/macos/TrafficLights";
import { FINDER_FILES } from "@/lib/finderFiles";
import { useQuickLook } from "@/hooks/useQuickLook";

const SIDEBAR_SECTIONS = [
  {
    items: [
      { id: "recents", label: "Recents", icon: "clock" },
      { id: "shared", label: "Shared", icon: "shared" },
    ],
  },
  {
    title: "Favourites",
    items: [
      { id: "applications", label: "Applications", icon: "app" },
      { id: "downloads", label: "Downloads", icon: "download" },
      { id: "pictures", label: "Pictures", icon: "photo" },
      { id: "desktop", label: "Desktop", icon: "desktop" },
      { id: "documents", label: "Documents", icon: "doc" },
    ],
  },
  {
    title: "Locations",
    items: [
      { id: "icloud", label: "iCloud Drive", icon: "icloud" },
      { id: "home", label: portfolio.name.split(" ")[0].toLowerCase(), icon: "home" },
      { id: "airdrop", label: "AirDrop", icon: "airdrop" },
      { id: "bin", label: "Bin", icon: "bin" },
    ],
  },
  {
    title: "Tags",
    items: [{ id: "red", label: "Red", icon: "tag-red" }],
  },
];

const FILES = FINDER_FILES;

function SidebarIcon({ icon }: { icon: string }) {
  const className = "h-4 w-4 flex-shrink-0 opacity-90";

  switch (icon) {
    case "clock":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm-.75 3.75a.75.75 0 0 1 1.5 0v3.69l2.22 1.28a.75.75 0 1 1-.75 1.3l-2.5-1.44A.75.75 0 0 1 7.25 8V3.75Z" />
        </svg>
      );
    case "shared":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M6.5 2A2.5 2.5 0 0 0 4 4.5V5H3a2 2 0 0 0-2 2v5.5A1.5 1.5 0 0 0 2.5 14h7A1.5 1.5 0 0 0 11 12.5V11h1.5A2.5 2.5 0 0 0 15 8.5v-1A2.5 2.5 0 0 0 12.5 5H11V4.5A2.5 2.5 0 0 0 8.5 2h-2Zm0 1h2A1.5 1.5 0 0 1 10 4.5V6h3a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 13 10H6.5A1.5 1.5 0 0 1 5 8.5V4.5A1.5 1.5 0 0 1 6.5 3Z" />
        </svg>
      );
    case "app":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5V5h1.5A1.5 1.5 0 0 1 16 6.5v7A1.5 1.5 0 0 1 14.5 15h-13A1.5 1.5 0 0 1 0 13.5v-7A1.5 1.5 0 0 1 1.5 5H3V2.5Zm1.5-.5a.5.5 0 0 0-.5.5V5h9V2.5a.5.5 0 0 0-.5-.5h-7ZM1.5 6a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-13Z" />
        </svg>
      );
    case "download":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.5 1.5a.75.75 0 0 0-1.5 0V9.44L5.03 7.47a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.5 9.44V1.5ZM2 11.75a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5H2Z" />
        </svg>
      );
    case "photo":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9ZM3.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-9Zm1.25 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm7.03 5.28-2.5-3a.75.75 0 0 0-1.16 0l-1.5 1.8-1-1.2a.75.75 0 0 0-1.14.06l-2 2.5a.75.75 0 0 0 .59 1.21h8.72a.75.75 0 0 0 .6-1.37Z" />
        </svg>
      );
    case "desktop":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v6A1.5 1.5 0 0 1 12.5 11H10v1.25a.75.75 0 0 1-1.5 0V11H5v1.25a.75.75 0 0 1-1.5 0V11H3.5A1.5 1.5 0 0 1 2 9.5v-6ZM3.5 3a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-9Z" />
        </svg>
      );
    case "doc":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 1.5A1.5 1.5 0 0 1 5.5 0h5.086a1.5 1.5 0 0 1 1.06.44l2.914 2.914A1.5 1.5 0 0 1 15 4.414V12.5A1.5 1.5 0 0 1 13.5 14h-8A1.5 1.5 0 0 1 4 12.5v-11Z" />
        </svg>
      );
    case "icloud":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.5 6a3.5 3.5 0 0 0-6.87-.87A2.75 2.75 0 0 0 2.5 7.75c0 .69.25 1.32.67 1.81A3.25 3.25 0 0 0 4 14h8a3 3 0 0 0 .5-5.96A3.48 3.48 0 0 0 11.5 6Z" />
        </svg>
      );
    case "home":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1.5 1.75 7.25V14a1 1 0 0 0 1 1h4.5v-4h2.5v4H14a1 1 0 0 0 1-1V7.25L8 1.5Z" />
        </svg>
      );
    case "airdrop":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1.25a.75.75 0 0 1 .53.22l5 5a.75.75 0 1 1-1.06 1.06L8.75 3.56V12.5a.75.75 0 0 1-1.5 0V3.56L3.53 7.53a.75.75 0 0 1-1.06-1.06l5-5A.75.75 0 0 1 8 1.25Z" />
        </svg>
      );
    case "bin":
      return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 1.5A1.5 1.5 0 0 1 7.5 0h1A1.5 1.5 0 0 1 10 1.5V2h3.25a.75.75 0 0 1 0 1.5H13v9.75A2.75 2.75 0 0 1 10.25 16h-4.5A2.75 2.75 0 0 1 3 13.25V3.5H2.75a.75.75 0 0 1 0-1.5H6V1.5Zm1.5-.5a.5.5 0 0 0-.5.5V2h1V1.5a.5.5 0 0 0-.5-.5ZM4.5 3.5v9.75c0 .69.56 1.25 1.25 1.25h4.5c.69 0 1.25-.56 1.25-1.25V3.5h-7Z" />
        </svg>
      );
    case "tag-red":
      return <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#ff3b30]" />;
    default:
      return null;
  }
}

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
  const [activeSidebar, setActiveSidebar] = useState("desktop");
  const { openQuickLook } = useQuickLook();
  const { onClose, onMinimize, onFullscreen, isFullscreen, unifiedToolbar, onDragStart, onDragMove, onDragEnd } =
    useWindowControls();

  const currentFolder = SIDEBAR_SECTIONS.flatMap((s) => s.items).find((i) => i.id === activeSidebar)
    ?.label ?? "Desktop";

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
          {SIDEBAR_SECTIONS.map((section, idx) => (
            <div key={idx} className={idx > 0 ? "mt-3" : ""}>
              {section.title && (
                <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wide text-white/35">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveSidebar(item.id)}
                      className={`macos-finder-sidebar-item flex w-full items-center gap-2 px-2 py-[5px] text-[13px] ${
                        activeSidebar === item.id
                          ? "macos-finder-sidebar-item-active"
                          : "text-white/85"
                      }`}
                    >
                      <SidebarIcon icon={item.icon} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
