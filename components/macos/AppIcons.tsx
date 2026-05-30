"use client";

interface AppIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function AppIcon({ name, size = 48, className = "" }: AppIconProps) {
  const icons: Record<string, React.ReactNode> = {
    finder: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect width="48" height="48" rx="12" fill="url(#finder-bg)" />
        <path
          d="M24 10C18 10 14 16 14 22C14 28 18 34 24 38C30 34 34 28 34 22C34 16 30 10 24 10Z"
          fill="#007AFF"
        />
        <circle cx="20" cy="20" r="2" fill="white" />
        <circle cx="28" cy="20" r="2" fill="white" />
        <defs>
          <linearGradient id="finder-bg" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#E8F4FF" />
            <stop offset="1" stopColor="#B8D4F0" />
          </linearGradient>
        </defs>
      </svg>
    ),
    projects: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect width="48" height="48" rx="12" fill="url(#projects-bg)" />
        <rect x="12" y="14" width="24" height="18" rx="2" fill="white" opacity="0.9" />
        <rect x="14" y="16" width="8" height="6" rx="1" fill="#FF6B6B" />
        <rect x="24" y="16" width="10" height="6" rx="1" fill="#4ECDC4" />
        <rect x="14" y="24" width="20" height="6" rx="1" fill="#FFE66D" />
        <defs>
          <linearGradient id="projects-bg" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#FFF5E6" />
            <stop offset="1" stopColor="#FFD699" />
          </linearGradient>
        </defs>
      </svg>
    ),
    terminal: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect width="48" height="48" rx="12" fill="#1E1E2E" />
        <path d="M14 18L20 24L14 30" stroke="#28C840" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 30H32" stroke="#28C840" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    messages: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect width="48" height="48" rx="12" fill="url(#messages-bg)" />
        <path
          d="M12 16C12 14.9 12.9 14 14 14H34C35.1 14 36 14.9 36 16V28C36 29.1 35.1 30 34 30H18L12 36V16Z"
          fill="white"
        />
        <defs>
          <linearGradient id="messages-bg" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#34C759" />
            <stop offset="1" stopColor="#248A3D" />
          </linearGradient>
        </defs>
      </svg>
    ),
    resume: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect width="48" height="48" rx="12" fill="url(#resume-bg)" />
        <rect x="14" y="12" width="20" height="26" rx="2" fill="white" />
        <rect x="17" y="16" width="14" height="2" rx="1" fill="#666" />
        <rect x="17" y="20" width="10" height="1.5" rx="0.75" fill="#999" />
        <rect x="17" y="23" width="12" height="1.5" rx="0.75" fill="#999" />
        <rect x="17" y="26" width="8" height="1.5" rx="0.75" fill="#999" />
        <defs>
          <linearGradient id="resume-bg" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#FF6B6B" />
            <stop offset="1" stopColor="#EE5A24" />
          </linearGradient>
        </defs>
      </svg>
    ),
    music: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect width="48" height="48" rx="12" fill="url(#music-bg)" />
        <circle cx="24" cy="24" r="10" fill="#FC3C44" />
        <path d="M24 14V34M14 24H34" stroke="white" strokeWidth="2" opacity="0.3" />
        <defs>
          <linearGradient id="music-bg" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#FC3C44" />
            <stop offset="1" stopColor="#FA233B" />
          </linearGradient>
        </defs>
      </svg>
    ),
  };

  const icon = icons[name] ?? icons.finder;

  return (
    <div style={{ width: size, height: size }} className="flex-shrink-0">
      {icon}
    </div>
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
