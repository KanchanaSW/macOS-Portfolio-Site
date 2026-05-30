"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/portfolio.config";
import { useSystemStore } from "@/hooks/useWindowManager";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { AppleLogo } from "./AppIcons";

export const BOOT_SEEN_KEY = "macos-portfolio-boot-seen";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"logo" | "progress" | "fadeout">("logo");
  const [showSkip, setShowSkip] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { setBootComplete } = useSystemStore();

  useEffect(() => {
    const seen = localStorage.getItem(BOOT_SEEN_KEY);
    if (seen || prefersReducedMotion) {
      setVisible(false);
      onComplete();
      setBootComplete(true);
      return;
    }

    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    const progressTimer = setTimeout(() => setPhase("progress"), 500);
    const fadeTimer = setTimeout(() => setPhase("fadeout"), 2800);
    const completeTimer = setTimeout(() => {
      localStorage.setItem(BOOT_SEEN_KEY, "true");
      setVisible(false);
      onComplete();
      setBootComplete(true);
    }, 3500);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, setBootComplete, prefersReducedMotion]);

  const handleSkip = () => {
    localStorage.setItem(BOOT_SEEN_KEY, "true");
    setVisible(false);
    onComplete();
    setBootComplete(true);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
        transition={{ duration: 0.7 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <AppleLogo className="h-16 w-14 text-white" />
        </motion.div>

        {phase !== "logo" && (
          <div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white boot-progress-bar" />
          </div>
        )}

        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            type="button"
            onClick={handleSkip}
            className="absolute bottom-12 rounded-full border border-white/30 px-4 py-2 text-sm text-white/70 hover:bg-white/10"
          >
            Skip intro
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function WelcomeNotification() {
  const { bootComplete, addNotification } = useSystemStore();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!bootComplete || sent) return;

    const welcomeKey = "macos-portfolio-welcome-shown";
    const welcomeShown = sessionStorage.getItem(welcomeKey);
    if (welcomeShown) return;

    const timer = setTimeout(() => {
      addNotification("Welcome", `Welcome to ${portfolio.name}'s Mac`);
      sessionStorage.setItem(welcomeKey, "true");
      setSent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [bootComplete, addNotification, sent]);

  return null;
}
