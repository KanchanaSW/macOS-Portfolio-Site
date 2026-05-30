"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { portfolio } from "@/portfolio.config";
import { useSystemStore } from "@/hooks/useWindowManager";
import { useWindowManager } from "@/hooks/useWindowManager";
import { APP_DEFINITIONS } from "@/lib/appRegistry";
import { AppIcon } from "./AppIcons";
import type { AppId, SpotlightResult } from "@/types/macos";

function buildSearchIndex(): SpotlightResult[] {
  const results: SpotlightResult[] = APP_DEFINITIONS.map((app) => ({
    id: app.id,
    title: app.title,
    subtitle: "Application",
    appId: app.id,
    type: "app",
  }));

  portfolio.projects.forEach((p) => {
    results.push({
      id: `project-${p.name}`,
      title: p.name,
      subtitle: p.description.slice(0, 60),
      appId: "projects",
      type: "project",
    });
  });

  const allSkills = [
    ...portfolio.skills.languages,
    ...portfolio.skills.frameworks,
    ...portfolio.skills.tools,
  ];
  allSkills.forEach((skill) => {
    results.push({
      id: `skill-${skill}`,
      title: skill,
      subtitle: "Skill",
      appId: "terminal",
      type: "skill",
    });
  });

  return results;
}

export function Spotlight() {
  const { spotlightOpen, setSpotlightOpen } = useSystemStore();
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = buildSearchIndex();

  const filtered = query.trim()
    ? index.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle?.toLowerCase().includes(query.toLowerCase())
      )
    : index.slice(0, 6);

  useEffect(() => {
    if (spotlightOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [spotlightOpen]);

  const handleSelect = (result: SpotlightResult) => {
    openWindow(result.appId);
    setSpotlightOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {spotlightOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-start justify-center bg-black/40 pt-[20vh] backdrop-blur-sm"
          onClick={() => setSpotlightOpen(false)}
        >
          <FocusTrap focusTrapOptions={{ escapeDeactivates: true, onDeactivate: () => setSpotlightOpen(false) }}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg overflow-hidden rounded-xl macos-glass-panel shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Spotlight Search"
                className="w-full border-b border-white/10 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none"
              />
              <ul className="max-h-64 overflow-auto py-2 macos-scroll">
                {filtered.map((result, i) => {
                  const appDef = APP_DEFINITIONS.find((a) => a.id === result.appId);
                  return (
                    <li key={result.id}>
                      <button
                        type="button"
                        className={`flex w-full items-center gap-3 px-4 py-2 text-left ${
                          i === selectedIndex ? "bg-[var(--accent-blue)]" : "hover:bg-white/10"
                        }`}
                        onClick={() => handleSelect(result)}
                      >
                        {appDef && <AppIcon name={appDef.icon} size={32} />}
                        <div>
                          <p className="text-sm text-white">{result.title}</p>
                          <p className="text-xs text-white/50">{result.subtitle}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
                {filtered.length === 0 && (
                  <li className="px-4 py-3 text-sm text-white/50">No results</li>
                )}
              </ul>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
