export type AppId =
  | "finder"
  | "projects"
  | "terminal"
  | "messages"
  | "resume"
  | "safari"
  | "about"
  | "skills"
  | "contact";

export type WallpaperStyle = "aurora" | "big-sur" | "sequoia" | "monterey";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export interface BlogPost {
  title: string;
  url: string;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
}

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isFullscreen: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
}

export interface AppDefinition {
  id: AppId;
  title: string;
  icon: string;
  defaultSize: WindowSize;
  defaultPosition: WindowPosition;
  dock?: boolean;
  desktop?: boolean;
  decorative?: boolean;
}

export interface DesktopIcon {
  id: AppId;
  label: string;
  icon: string;
}

export interface Message {
  id: string;
  text: string;
  sender: "owner" | "visitor";
  timestamp: Date;
  rich?: "contact";
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
}

export interface SpotlightResult {
  id: string;
  title: string;
  subtitle?: string;
  appId: AppId;
  type: "app" | "project" | "skill";
}
