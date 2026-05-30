"use client";

import { useEffect, useState } from "react";
import { portfolio } from "@/portfolio.config";

interface TerminalLine {
  type: "command" | "output" | "blank";
  text: string;
}

function buildScript(): TerminalLine[] {
  const lines: TerminalLine[] = [
    { type: "command", text: "whoami" },
    { type: "output", text: portfolio.name.toLowerCase().replace(" ", "-") },
    { type: "blank", text: "" },
    { type: "command", text: "cat skills.txt" },
  ];

  const allSkills = [
    ...portfolio.skills.languages,
    ...portfolio.skills.frameworks,
    ...portfolio.skills.tools,
  ];
  allSkills.forEach((skill) => lines.push({ type: "output", text: `  • ${skill}` }));

  lines.push({ type: "blank", text: "" });
  lines.push({ type: "command", text: "ls projects/" });
  portfolio.projects.forEach((p) => lines.push({ type: "output", text: `  ${p.name}/` }));
  lines.push({ type: "blank", text: "" });
  lines.push({ type: "command", text: 'echo "Available for work: YES"' });
  lines.push({ type: "output", text: "Available for work: YES" });

  return lines;
}

function randomDelay() {
  return 40 + Math.random() * 40;
}

export default function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<Array<{ type: string; text: string; typed?: string }>>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const script = buildScript();

  useEffect(() => {
    if (currentLineIndex >= script.length) return;

    const line = script[currentLineIndex];
    const fullText = line.type === "command" ? `$ ${line.text}` : line.text;

    if (line.type === "blank") {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, { type: "blank", text: "" }]);
        setCurrentLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 200);
      return () => clearTimeout(timer);
    }

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.type === line.type && updated.length === currentLineIndex + 1) {
            updated[updated.length - 1] = { ...last, typed: fullText.slice(0, charIndex + 1) };
          } else {
            updated.push({ type: line.type, text: fullText, typed: fullText.slice(0, charIndex + 1) });
          }
          return updated;
        });
        setCharIndex((c) => c + 1);
      }, randomDelay());
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentLineIndex, charIndex, script]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((s) => !s), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full overflow-auto p-4 font-mono text-sm macos-scroll"
      style={{ background: "#1E1E2E", color: "#E0E0E0" }}
    >
      <div className="mb-2 text-white/40">Last login: {new Date().toLocaleString()}</div>
      {displayedLines.map((line, i) => (
        <div key={i} className={line.type === "command" ? "text-[#28C840]" : "text-[#E0E0E0]"}>
          {line.typed ?? line.text}
        </div>
      ))}
      {currentLineIndex < script.length && (
        <span className={`inline-block w-2 bg-[#28C840] ${showCursor ? "terminal-cursor" : "opacity-0"}`}>
          &nbsp;
        </span>
      )}
    </div>
  );
}
