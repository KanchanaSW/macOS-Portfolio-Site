import { portfolio } from "@/portfolio.config";
import type { AppId, AppDefinition } from "@/types/macos";

const BASE_APP_DEFINITIONS: AppDefinition[] = [
  {
    id: "finder",
    title: "About Me",
    icon: "finder",
    defaultSize: { width: 860, height: 520 },
    defaultPosition: { x: 120, y: 80 },
    dock: true,
    desktop: true,
  },
  {
    id: "projects",
    title: "Projects",
    icon: "projects",
    defaultSize: { width: 800, height: 560 },
    defaultPosition: { x: 180, y: 60 },
    dock: true,
    desktop: true,
  },
  {
    id: "terminal",
    title: "Skills",
    icon: "terminal",
    defaultSize: { width: 640, height: 420 },
    defaultPosition: { x: 240, y: 100 },
    dock: true,
    desktop: true,
  },
  {
    id: "messages",
    title: "Contact",
    icon: "messages",
    defaultSize: { width: 420, height: 580 },
    defaultPosition: { x: 300, y: 50 },
    dock: true,
    desktop: true,
  },
  {
    id: "resume",
    title: "Resume",
    icon: "resume",
    defaultSize: { width: 680, height: 820 },
    defaultPosition: { x: 200, y: 40 },
    dock: true,
    desktop: true,
  },
];

const hasBlog =
  !!portfolio.blog || (portfolio.blogPosts?.length ?? 0) > 0;

const SAFARI_APP: AppDefinition | undefined = hasBlog
  ? {
      id: "safari",
      title: portfolio.blogTitle ?? "Safari",
      icon: "safari",
      defaultSize: { width: 960, height: 640 },
      defaultPosition: { x: 160, y: 70 },
      dock: true,
      desktop: true,
    }
  : undefined;

export const APP_DEFINITIONS: AppDefinition[] = [
  ...BASE_APP_DEFINITIONS,
  ...(SAFARI_APP ? [SAFARI_APP] : []),
];

export const DECORATIVE_APPS: AppDefinition[] = [
  {
    id: "about",
    title: "Music",
    icon: "music",
    defaultSize: { width: 400, height: 300 },
    defaultPosition: { x: 100, y: 100 },
    dock: true,
    decorative: true,
  },
];

const BASE_DESKTOP_ICONS = [
  { id: "finder" as AppId, label: "About Me", icon: "finder" },
  { id: "projects" as AppId, label: "Projects", icon: "projects" },
  { id: "resume" as AppId, label: "Resume", icon: "resume" },
  { id: "messages" as AppId, label: "Contact", icon: "messages" },
  { id: "terminal" as AppId, label: "Skills", icon: "terminal" },
];

const SAFARI_DESKTOP_ICON = hasBlog
  ? [
      {
        id: "safari" as AppId,
        label: portfolio.blogTitle ?? "Blog",
        icon: "safari",
      },
    ]
  : [];

export const DESKTOP_ICONS = [...BASE_DESKTOP_ICONS, ...SAFARI_DESKTOP_ICON];

/** Finder sidebar — same apps as desktop; Safari label is always "Safari" */
export const FINDER_SIDEBAR_ITEMS = [
  ...BASE_DESKTOP_ICONS,
  ...(hasBlog ? [{ id: "safari" as AppId, label: "Safari", icon: "safari" }] : []),
];

const FINDER_SIDEBAR_APP_IDS = new Set(FINDER_SIDEBAR_ITEMS.map((item) => item.id));

export function isFinderSidebarApp(id: AppId): boolean {
  return FINDER_SIDEBAR_APP_IDS.has(id);
}

export function getAppDefinition(id: AppId): AppDefinition | undefined {
  return [...APP_DEFINITIONS, ...DECORATIVE_APPS].find((app) => app.id === id);
}

export const DOCK_APPS = [
  ...APP_DEFINITIONS.filter((a) => a.dock),
  ...DECORATIVE_APPS.filter((a) => a.dock),
];

/** Maps desktop icon ids to actual app ids */
export const APP_ID_ALIASES: Partial<Record<AppId, AppId>> = {
  about: "finder",
  skills: "terminal",
  contact: "messages",
};

export function resolveAppId(id: AppId): AppId {
  return APP_ID_ALIASES[id] ?? id;
}
