"use client";

import Image from "next/image";

interface AppIconProps {
  name: string;
  size?: number;
  className?: string;
}

/** macOS system app icons extracted to /public/icons */
const ICON_FILES: Record<string, string> = {
  finder: "/icons/finder.png",
  projects: "/icons/projects.png",
  terminal: "/icons/terminal.png",
  messages: "/icons/messages.png",
  resume: "/icons/resume.png",
  music: "/icons/music.png",
};

export function AppIcon({ name, size = 48, className = "" }: AppIconProps) {
  const src = ICON_FILES[name] ?? ICON_FILES.finder;

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={`flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
      draggable={false}
    />
  );
}

export function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 17" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.5 8.8c0-2.1 1.7-3.1 1.8-3.2-1-.1-2-.6-2.6-1.5-.6-.9-.9-2-.8-3.2 0-1.1.3-2.2.9-3.1C9.8.5 8.2 0 6.7 0 5.1 0 3.8.6 2.9 1.6c-.9 1-1.4 2.4-1.3 3.9 0 1.5.6 2.9 1.6 3.9.5.5 1.1.9 1.8 1.2.7.3 1.5.4 2.3.4h.1c.8 0 1.5-.1 2.2-.4.7-.3 1.3-.7 1.8-1.2.5-.5.9-1.1 1.1-1.8zM9.5 16.5c-.5.7-1.1 1.3-1.8 1.8-.7.5-1.5.7-2.4.7-.9 0-1.7-.2-2.4-.7-.7-.5-1.3-1.1-1.8-1.8C.5 15.5 0 14.3 0 12.9h14c0 1.4-.5 2.6-1.3 3.6-.4.5-.8 1-1.2 1z" />
    </svg>
  );
}

export function WifiIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 12" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.5 6.5a6.5 6.5 0 019 0l-1.2 1.2a4.8 4.8 0 00-6.6 0L3.5 6.5zM0 3a11 11 0 0116 0l-1.3 1.3a9.2 9.2 0 00-13.4 0L0 3z" />
    </svg>
  );
}

export function BatteryIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 25 12" fill="currentColor" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" fill="none" />
      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
      <path d="M23 4v4a2 2 0 000-4z" fill="currentColor" />
    </svg>
  );
}

export function ControlCenterIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  );
}
