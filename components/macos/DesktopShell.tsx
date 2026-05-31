"use client";

import { useState, useEffect } from "react";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Desktop } from "./Desktop";
import { WindowLayer } from "./Window";
import { QuickLook } from "./QuickLook";
import { Spotlight } from "./Spotlight";
import { ControlCenter } from "./ControlCenter";
import { NotificationCenter } from "./Notification";
import { BootSequence, WelcomeNotification } from "./BootSequence";
import { MobileSpringboard, IOSStatusBar } from "./MobileSpringboard";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function DesktopShell() {
  const [bootDone, setBootDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  useKeyboardShortcuts();

  useEffect(() => {
    setMounted(true);
    const seen = localStorage.getItem("macos-portfolio-boot-seen");
    if (seen || prefersReducedMotion) {
      setBootDone(true);
    }
  }, [prefersReducedMotion]);

  if (!mounted) return null;

  return (
    <>
      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}

      {bootDone && (
        <>
          {isMobile ? <IOSStatusBar /> : <MenuBar />}
          <Desktop />
          {isMobile && <MobileSpringboard />}
          <WindowLayer />
          <QuickLook />
          {!isMobile && <Dock />}
          <Spotlight />
          <ControlCenter />
          <NotificationCenter />
          <WelcomeNotification />
        </>
      )}
    </>
  );
}
