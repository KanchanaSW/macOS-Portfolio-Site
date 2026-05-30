"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSystemStore } from "@/hooks/useWindowManager";

export function ControlCenter() {
  const { controlCenterOpen, setControlCenterOpen } = useSystemStore();

  return (
    <AnimatePresence>
      {controlCenterOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1500]"
            onClick={() => setControlCenterOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed right-4 top-9 z-[1501] w-72 rounded-2xl p-4 macos-glass-panel shadow-2xl"
          >
            <div className="mb-3 grid grid-cols-2 gap-2">
              <ToggleModule label="Wi-Fi" value="Home Network" active />
              <ToggleModule label="Bluetooth" value="On" active />
              <ToggleModule label="AirDrop" value="Contacts Only" />
              <ToggleModule label="Focus" value="Off" />
            </div>
            <div className="space-y-3">
              <SliderModule label="Display" value={75} />
              <SliderModule label="Sound" value={50} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["🌙", "🔒", "📷"].map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className="flex h-12 items-center justify-center rounded-xl bg-white/10 text-xl hover:bg-white/15"
                >
                  {icon}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ToggleModule({ label, value, active = false }: { label: string; value: string; active?: boolean }) {
  return (
    <div className={`rounded-xl p-3 ${active ? "bg-[var(--accent-blue)]" : "bg-white/10"}`}>
      <p className="text-xs font-semibold text-white">{label}</p>
      <p className="text-[10px] text-white/70">{value}</p>
    </div>
  );
}

function SliderModule({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/10 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-white">{label}</span>
        <span className="text-[10px] text-white/50">{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/20">
        <div className="h-full rounded-full bg-white" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
