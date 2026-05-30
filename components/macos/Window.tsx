"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import type { AppId } from "@/types/macos";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useDraggable } from "@/hooks/useDraggable";
import { getAppDefinition } from "@/lib/appRegistry";
import { getDockIconElement } from "@/lib/dockRefs";
import { TrafficLights } from "./TrafficLights";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";
import Finder from "@/components/apps/Finder";
import Projects from "@/components/apps/Projects";
import Terminal from "@/components/apps/Terminal";
import Messages from "@/components/apps/Messages";
import Resume from "@/components/apps/Resume";

const APP_COMPONENTS: Partial<Record<AppId, React.ComponentType>> = {
  finder: Finder,
  projects: Projects,
  terminal: Terminal,
  messages: Messages,
  resume: Resume,
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
              left: win.position.x,
              top: win.position.y,
              width: win.size.width,
              height: win.size.height,
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
      className={`flex flex-col overflow-hidden rounded-xl shadow-[var(--macos-shadow)] ${
        isFocused ? "ring-1 ring-white/10" : ""
      }`}
      onMouseDown={() => focusWindow(appId)}
    >
      <div
        className="flex h-11 flex-shrink-0 cursor-default items-center macos-glass-panel"
        style={{ backdropFilter: "blur(20px)" }}
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
          <span className="text-sm font-medium text-white/60">{title}</span>
        </div>
      </div>

      <div
        className="flex-1 overflow-hidden macos-glass-panel"
        style={{ backdropFilter: "blur(40px)", background: "rgba(255,255,255,0.08)" }}
      >
        {children}
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
