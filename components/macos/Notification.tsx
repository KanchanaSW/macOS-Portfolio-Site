"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSystemStore } from "@/hooks/useWindowManager";

export function NotificationCenter() {
  const { notifications, dismissNotification } = useSystemStore();

  return (
    <div className="fixed right-4 top-9 z-[1100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-auto w-72 max-w-[calc(100vw-2rem)] rounded-2xl p-4 macos-glass-panel shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{notif.title}</p>
                <p className="mt-0.5 text-xs text-white/70">{notif.body}</p>
              </div>
              <button
                type="button"
                onClick={() => dismissNotification(notif.id)}
                className="ml-2 text-white/40 hover:text-white/70"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
