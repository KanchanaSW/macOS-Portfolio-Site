"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolio } from "@/portfolio.config";

const SIDEBAR_ITEMS = [
  { label: "iCloud", icon: "☁️" },
  { label: "Recent", icon: "🕐" },
  { label: "Desktop", icon: "🖥️", active: true },
  { label: "Documents", icon: "📄" },
];

const FILES = [
  { name: "README.md", type: "md", preview: "bio" },
  { name: `${portfolio.name.split(" ")[0]}.jpg`, type: "photo", preview: "photo" },
];

export default function Finder() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileClick = (file: (typeof FILES)[0]) => {
    setSelectedFile(file.name);
    setShowPreview(true);
  };

  return (
    <div className="flex h-full text-white">
      {/* Sidebar */}
      <aside className="w-44 flex-shrink-0 border-r border-white/10 bg-black/20 p-3">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">Favorites</p>
        <ul className="space-y-0.5">
          {SIDEBAR_ITEMS.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
                  item.active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <button type="button" className="rounded p-1 text-white/50 hover:bg-white/10" aria-label="Back">
            ‹
          </button>
          <button type="button" className="rounded p-1 text-white/50 hover:bg-white/10" aria-label="Forward">
            ›
          </button>
          <span className="ml-2 text-xs text-white/60">Desktop</span>
          <div className="ml-auto flex gap-1">
            <button type="button" className="rounded p-1 text-white/50 hover:bg-white/10" aria-label="Icon view">
              ⊞
            </button>
            <button type="button" className="rounded p-1 text-white/50 hover:bg-white/10" aria-label="List view">
              ☰
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* File grid */}
          <div className="flex-1 overflow-auto p-4 macos-scroll">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
              {FILES.map((file) => (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => handleFileClick(file)}
                  className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-white/10 ${
                    selectedFile === file.name ? "bg-white/15 ring-1 ring-white/20" : ""
                  }`}
                >
                  {file.type === "photo" ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                      <Image
                        src={portfolio.photo}
                        alt={portfolio.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-2xl">
                      📄
                    </div>
                  )}
                  <span className="max-w-full truncate text-xs text-white/80">{file.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Look preview */}
          {showPreview && (
            <div className="w-64 flex-shrink-0 border-l border-white/10 bg-black/20 p-4 macos-scroll overflow-auto">
              <p className="mb-2 text-xs font-semibold text-white/50">Quick Look</p>
              {selectedFile?.endsWith(".jpg") ? (
                <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg">
                  <Image src={portfolio.photo} alt={portfolio.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="space-y-3 text-xs leading-relaxed text-white/80">
                  <h3 className="text-sm font-semibold text-white">{portfolio.name}</h3>
                  <p className="text-white/50">{portfolio.title}</p>
                  {portfolio.bio.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
