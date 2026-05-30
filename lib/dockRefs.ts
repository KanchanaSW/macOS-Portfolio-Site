import type { AppId } from "@/types/macos";

const dockIconElements: Partial<Record<AppId, HTMLElement>> = {};

export function registerDockIconElement(appId: AppId, element: HTMLElement | null) {
  if (element) {
    dockIconElements[appId] = element;
  } else {
    delete dockIconElements[appId];
  }
}

export function getDockIconElement(appId: AppId): HTMLElement | undefined {
  return dockIconElements[appId];
}
