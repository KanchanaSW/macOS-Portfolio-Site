"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/portfolio.config";
import { AboutMePreview } from "@/components/macos/AboutMePreview";
import {
  getQuickLookMarkdown,
  getQuickLookOpenWithLabel,
} from "@/lib/finderFiles";
import { useQuickLook } from "@/hooks/useQuickLook";
import { useDraggable } from "@/hooks/useDraggable";
import { useIsCompact } from "@/hooks/useMediaQuery";

const springConfig = { type: "spring" as const, stiffness: 320, damping: 28 };

function QuickLookControls({
  onClose,
  onExpand,
}: {
  onClose: () => void;
  onExpand: () => void;
}) {
  return (
    <div className="flex items-center gap-2 pl-3" role="group" aria-label="Quick Look controls">
      <button
        type="button"
        onClick={onClose}
        className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
        aria-label="Close Quick Look"
      >
        <svg viewBox="0 0 8 8" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 2l4 4M6 2L2 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onExpand}
        className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
        aria-label="Expand Quick Look"
      >
        <svg viewBox="0 0 8 8" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M1 3V1h2M5 1h2v2M7 5v2H5M3 7H1V5" />
        </svg>
      </button>
    </div>
  );
}

export function QuickLook() {
  const { isOpen, file, position, size, zIndex, closeQuickLook, updatePosition, focusQuickLook, relayoutQuickLook } =
    useQuickLook();
  const windowRef = useRef<HTMLDivElement>(null);
  const isCompact = useIsCompact();

  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDraggable(position, {
    disabled: isCompact,
    onDragEnd: updatePosition,
  });

  useEffect(() => {
    if (!isOpen || !file) return;

    const handleResize = () => {
      relayoutQuickLook();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, file, relayoutQuickLook]);

  if (!file) return null;

  const markdown = file.type === "code" ? getQuickLookMarkdown(file) : "";
  const openWithLabel = getQuickLookOpenWithLabel(file);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={windowRef}
          role="dialog"
          aria-label={`Quick Look preview of ${file.name}`}
          aria-modal="false"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={springConfig}
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            zIndex,
          }}
          className={`flex flex-col overflow-hidden macos-window text-white ${
            isCompact ? "rounded-none" : "rounded-[10px]"
          }`}
          onMouseDown={focusQuickLook}
        >
          <div
            className="relative flex h-[52px] flex-shrink-0 cursor-default items-center border-b border-white/[0.06]"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onPointerDown={handlePointerDown}
            onPointerMove={(e) => handlePointerMove(e, updatePosition)}
            onPointerUp={(e) => handlePointerUp(e, position)}
          >
            <QuickLookControls onClose={closeQuickLook} onExpand={() => {}} />

            <div className="pointer-events-none absolute left-1/2 max-w-[45%] -translate-x-1/2 truncate text-[13px] font-medium text-white">
              {file.name}
            </div>

            <div className="ml-auto flex items-center gap-2 pr-3">
              {!isCompact && (
              <button
                type="button"
                aria-label="Share"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                  <path d="M11 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM5 8.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm6 3a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Zm-1.06-2.03a.75.75 0 0 0-1.28.77l.97.56a2.25 2.25 0 0 1-2.3 3.9.75.75 0 1 0 .82 1.26 3.75 3.75 0 0 0 3.84-6.5l.97-.56a.75.75 0 0 0-.02-1.43Z" />
                </svg>
              </button>
              )}
              <button
                type="button"
                className="rounded-full bg-[var(--macos-selection-blue)] px-3 py-1 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
              >
                {isCompact ? "Open" : openWithLabel}
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto macos-scroll bg-[rgba(0,0,0,0.18)]">
            {file.type === "photo" ? (
              <div className="flex h-full items-center justify-center p-6">
                <div className="relative aspect-[4/5] w-full max-w-full overflow-hidden rounded-lg shadow-lg lg:max-w-[420px]">
                  <Image
                    src={portfolio.photo}
                    alt={portfolio.name}
                    fill
                    className="object-cover"
                    sizes="420px"
                    priority
                  />
                </div>
              </div>
            ) : file.type === "md" ? (
              <AboutMePreview />
            ) : (
              <pre className="whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-[1.65] text-white lg:p-6">
                {markdown}
              </pre>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
