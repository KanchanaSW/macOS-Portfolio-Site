"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import type { AppId } from "@/types/macos";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useDraggable } from "@/hooks/useDraggable";
import { getAppDefinition } from "@/lib/appRegistry";
import { getDockIconElement } from "@/lib/dockRefs";
import { getViewportWindowBounds } from "@/lib/windowBounds";
import { TrafficLights } from "./TrafficLights";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";
import { WindowControlsProvider } from "@/contexts/WindowControlsContext";
import Finder from "@/components/apps/Finder";
import Projects from "@/components/apps/Projects";
import Terminal from "@/components/apps/Terminal";
import Messages from "@/components/apps/Messages";
import Resume from "@/components/apps/Resume";
import Safari from "@/components/apps/Safari";

const APP_COMPONENTS: Partial<Record<AppId, React.ComponentType>> = {
  finder: Finder,
  projects: Projects,
  terminal: Terminal,
  messages: Messages,
  resume: Resume,
  safari: Safari,
};

const springConfig = { type: "spring" as const, stiffness: 300, damping: 30 };

interface WindowProps {
  appId: AppId;
  title: string;
  children: React.ReactNode;
}

function WindowFrame({ appId, title, children }: WindowProps) {
  const {
    windows,
    focusedWindowId,
    closeWindow,
    minimizeWindow,
    focusWindow,
    toggleFullscreen,
    updatePosition,
  } = useWindowManager();

  const win = windows[appId];
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [minimizeStyle, setMinimizeStyle] = useState<React.CSSProperties>({});

  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDraggable(
    win?.position ?? { x: 0, y: 0 },
    {
      disabled: isMobile || isTablet || win?.isFullscreen,
      onDragEnd: (pos) => updatePosition(appId, pos),
    }
  );

  const handleMinimize = () => {
    const dockEl = getDockIconElement(appId);
    if (dockEl && windowRef.current) {
      const windowRect = windowRef.current.getBoundingClientRect();
      const dockRect = dockEl.getBoundingClientRect();

      setMinimizeStyle({
        position: "fixed",
        left: windowRect.left,
        top: windowRect.top,
        width: windowRect.width,
        height: windowRect.height,
        zIndex: win?.zIndex ?? 100,
      });
      setIsMinimizing(true);

      requestAnimationFrame(() => {
        setMinimizeStyle({
          position: "fixed",
          left: dockRect.left + dockRect.width / 2 - 20,
          top: dockRect.top,
          width: 40,
          height: 30,
          zIndex: win?.zIndex ?? 100,
          opacity: 0,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: "8px",
        });
      });

      setTimeout(() => {
        minimizeWindow(appId);
        setIsMinimizing(false);
        setMinimizeStyle({});
      }, 400);
    } else {
      minimizeWindow(appId);
    }
  };

  if (!win?.isOpen || win.isMinimized) return null;

  const isFocused = focusedWindowId === appId;
  const dragDisabled = isMobile || isTablet || win.isFullscreen;
  const viewportBounds = getViewportWindowBounds(win.position, win.size);
  const usesUnifiedToolbar = appId === "finder" && !isMobile && !isTablet;

  const windowControlsValue = {
    onClose: () => closeWindow(appId),
    onMinimize: handleMinimize,
    onFullscreen: () => toggleFullscreen(appId),
    isFullscreen: win.isFullscreen,
    unifiedToolbar: usesUnifiedToolbar,
    onDragStart: dragDisabled ? undefined : handlePointerDown,
    onDragMove: dragDisabled
      ? undefined
      : (e: React.PointerEvent) => handlePointerMove(e, (pos) => updatePosition(appId, pos)),
    onDragEnd: dragDisabled ? undefined : (e: React.PointerEvent) => handlePointerUp(e, win.position),
  };

  const windowStyle: React.CSSProperties = isMinimizing
    ? minimizeStyle
    : win.isFullscreen
      ? {
          position: "fixed",
          left: 0,
          top: 28,
          width: "100vw",
          height: "calc(100vh - 28px - 80px)",
          zIndex: win.zIndex,
        }
      : isMobile
        ? {
            position: "fixed",
            left: 0,
            top: 44,
            width: "100vw",
            height: "calc(100vh - 44px)",
            zIndex: win.zIndex,
          }
        : isTablet
          ? {
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              maxWidth: win.size.width,
              height: "80vh",
              zIndex: win.zIndex,
            }
          : {
              position: "fixed",
              left: viewportBounds.position.x,
              top: viewportBounds.position.y,
              width: viewportBounds.size.width,
              height: viewportBounds.size.height,
              maxHeight: "calc(100vh - 28px - 80px - 16px)",
              zIndex: win.zIndex,
            };

  const frame = (
    <motion.div
      ref={windowRef}
      role="dialog"
      aria-label={title}
      aria-modal={isFocused}
      initial={isMinimizing ? false : { scale: 0.8, opacity: 0 }}
      animate={isMinimizing ? {} : { scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={springConfig}
      style={windowStyle}
      className={`flex flex-col overflow-hidden rounded-[10px] macos-window ${
        isFocused ? "ring-1 ring-white/[0.08]" : "ring-1 ring-transparent"
      }`}
      onMouseDown={() => focusWindow(appId)}
    >
      {!usesUnifiedToolbar && (
        <div
          className="flex h-[52px] flex-shrink-0 cursor-default items-center border-b border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <TrafficLights
            onClose={() => closeWindow(appId)}
            onMinimize={handleMinimize}
            onFullscreen={() => toggleFullscreen(appId)}
            isFullscreen={win.isFullscreen}
          />
          <div
            className="flex flex-1 cursor-default items-center justify-center pr-[68px]"
            onPointerDown={dragDisabled ? undefined : handlePointerDown}
            onPointerMove={
              dragDisabled ? undefined : (e) => handlePointerMove(e, (pos) => updatePosition(appId, pos))
            }
            onPointerUp={dragDisabled ? undefined : (e) => handlePointerUp(e, win.position)}
          >
            <span className="text-[13px] font-semibold text-white/85">{title}</span>
          </div>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <WindowControlsProvider value={windowControlsValue}>{children}</WindowControlsProvider>
      </div>
    </motion.div>
  );

  if (isFocused && !isMinimizing) {
    return (
      <FocusTrap focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}>
        {frame}
      </FocusTrap>
    );
  }

  return frame;
}

export function WindowLayer() {
  const { windows } = useWindowManager();
  const openWindows = Object.values(windows).filter((w) => w.isOpen && !w.isMinimized);

  return (
    <AnimatePresence>
      {openWindows.map((win) => {
        const def = getAppDefinition(win.id);
        const AppComponent = APP_COMPONENTS[win.id];
        if (!def || !AppComponent) return null;

        return (
          <WindowFrame key={win.id} appId={win.id} title={def.title}>
            <AppComponent />
          </WindowFrame>
        );
      })}
    </AnimatePresence>
  );
}
