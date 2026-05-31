"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/portfolio.config";
import type { Project } from "@/types/macos";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative flex h-full flex-col overflow-hidden text-white">
      <div className="flex-1 overflow-auto p-4 macos-scroll">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {portfolio.projects.map((project) => (
            <button
              key={project.name}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="group overflow-hidden rounded-xl bg-white/10 text-left transition-all hover:bg-white/15 hover:shadow-lg"
            >
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-blue-500/30 to-purple-500/30">
                <span className="text-3xl font-bold text-white/80">{project.name[0]}</span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold">{project.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-white/60">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-[#2a2a2e]/95 p-4 backdrop-blur-xl lg:p-6"
            >
              <div className="mb-1 flex items-start justify-between">
                <h2 className="text-lg font-semibold">{selectedProject.name}</h2>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full p-1 text-white/60 hover:bg-white/10"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <p className="mb-4 text-sm text-white/70">{selectedProject.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur hover:bg-white/25"
                  >
                    GitHub
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[var(--accent-blue)] px-4 py-2 text-sm hover:opacity-90"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
