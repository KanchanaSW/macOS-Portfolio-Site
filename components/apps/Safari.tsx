"use client";

import { useState, useCallback, useMemo } from "react";
import { portfolio } from "@/portfolio.config";
import { useIsCompact } from "@/hooks/useMediaQuery";
import type { BlogPost } from "@/types/macos";

type SelectionId = "home" | `post-${number}`;

function getBlogHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "medium.com";
  }
}

function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function ToolbarButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-md text-[#3C3C43] opacity-90 hover:bg-black/[0.06] disabled:cursor-default disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3 2.5h7v1.5H5.12l6.19 6.19-1.06 1.06L4.06 5.06V9.5H2.5V2.5Zm8 0h2.5v2.5H12V4.56l-6.19 6.19-1.06-1.06L10.94 3.5H9V2.5Z" />
    </svg>
  );
}

function NavItem({
  label,
  isActive,
  onSelect,
  onOpenExternal,
}: {
  label: string;
  isActive: boolean;
  onSelect: () => void;
  onOpenExternal?: () => void;
}) {
  return (
    <div
      className={`group flex items-start gap-1 rounded-md px-2 py-1.5 ${
        isActive ? "bg-white shadow-sm ring-1 ring-black/[0.06]" : "hover:bg-black/[0.04]"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`min-w-0 flex-1 text-left text-[12px] leading-snug ${
          isActive ? "font-medium text-[#007AFF]" : "text-[#3C3C43]"
        }`}
      >
        <span className="line-clamp-2">{label}</span>
      </button>
      {onOpenExternal && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenExternal();
          }}
          className="mt-0.5 flex-shrink-0 rounded p-0.5 text-[#3C3C43]/50 opacity-0 hover:bg-black/[0.06] hover:text-[#007AFF] group-hover:opacity-100"
          aria-label={`Open ${label} in new tab`}
        >
          <ExternalLinkIcon />
        </button>
      )}
    </div>
  );
}

function getSelection(
  selectedId: SelectionId,
  posts: BlogPost[]
): { url: string; title: string; isHome: boolean } | null {
  if (selectedId === "home") {
    if (!portfolio.blog) return null;
    return {
      url: portfolio.blog,
      title: portfolio.blogTitle ?? "Developer Blog",
      isHome: true,
    };
  }
  const index = parseInt(selectedId.replace("post-", ""), 10);
  const post = posts[index];
  if (!post) return null;
  return { url: post.url, title: post.title, isHome: false };
}

const BLOG_POSTS = portfolio.blogPosts ?? [];

export default function Safari() {
  const [selectedId, setSelectedId] = useState<SelectionId>("home");
  const [copied, setCopied] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const isCompact = useIsCompact();

  const hasBlog = !!portfolio.blog || BLOG_POSTS.length > 0;

  const selection = useMemo(
    () => getSelection(selectedId, BLOG_POSTS),
    [selectedId]
  );

  const currentUrl = selection?.url ?? "";
  const currentTitle = selection?.title ?? "";
  const isHome = selection?.isHome ?? false;

  const handleCopy = useCallback(async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [currentUrl]);

  const handleSelect = useCallback(
    (id: SelectionId) => {
      setSelectedId(id);
      if (isCompact) setShowSidebar(false);
    },
    [isCompact]
  );

  const handleBack = useCallback(() => {
    setShowSidebar(true);
  }, []);

  if (!hasBlog) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F5F5F7] text-sm text-[#3C3C43]/70">
        No blog URL configured.
      </div>
    );
  }

  if (!selection) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F5F5F7] text-sm text-[#3C3C43]/70">
        Select an article from the sidebar.
      </div>
    );
  }

  const host = getBlogHost(currentUrl);
  const description = isHome
    ? (portfolio.blogDescription ??
      "Articles on frontend engineering, tech leadership, and shipping quality software.")
    : "Opens on Medium in your browser.";

  const showList = !isCompact || showSidebar;
  const showContent = !isCompact || !showSidebar;

  return (
    <div className="flex h-full flex-col bg-[#F5F5F7]">
      <div
        className="flex flex-shrink-0 items-center gap-1.5 border-b border-black/[0.08] px-2 py-1.5"
        style={{ background: "#E8E8ED" }}
      >
        <ToolbarButton
          label="Back"
          disabled={!isCompact || showSidebar}
          onClick={isCompact && !showSidebar ? handleBack : undefined}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M10.5 3.5 5 8l5.5 4.5-.75.875L3.625 8l6.125-5.125.75.625Z" />
          </svg>
        </ToolbarButton>
        <ToolbarButton label="Forward" disabled>
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M5.5 3.5 11 8l-5.5 4.5.75.875L12.375 8 6.25 2.875l-.75.625Z" />
          </svg>
        </ToolbarButton>
        <ToolbarButton label="Reload" onClick={() => {}}>
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M8 1.5a6.5 6.5 0 0 1 6.35 5.1.75.75 0 1 1-1.45-.38A5 5 0 1 0 13 8h-1.25a.75.75 0 0 1 0-1.5H14.5a.75.75 0 0 1 .75.75V11a.75.75 0 0 1-1.5 0V9.1A6.5 6.5 0 0 1 8 1.5Z" />
          </svg>
        </ToolbarButton>

        <div className="mx-1 flex min-w-0 flex-1 items-center rounded-md bg-white/90 px-3 py-1 shadow-sm ring-1 ring-black/[0.06]">
          <span className="mr-2 text-[10px] text-[#3C3C43]/50">🔒</span>
          <span className="truncate font-mono text-xs text-[#3C3C43]">{currentUrl}</span>
        </div>

        <ToolbarButton label="Open in new tab" onClick={() => openUrl(currentUrl)}>
          <ExternalLinkIcon />
        </ToolbarButton>
      </div>

      <div className="flex min-h-0 flex-1">
        {showList && (
        <aside
          className={`flex flex-col border-r border-black/[0.08] macos-scroll ${
            isCompact ? "w-full flex-shrink" : "w-[220px] flex-shrink-0"
          }`}
          style={{ background: "#EFEFF4" }}
        >
          <div className="flex-1 overflow-auto px-2 py-3">
            {portfolio.blog && (
              <div className="mb-4">
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wide text-[#3C3C43]/50">
                  Favorites
                </p>
                <NavItem
                  label={portfolio.blogTitle ?? "Developer Blog"}
                  isActive={selectedId === "home"}
                  onSelect={() => handleSelect("home")}
                  onOpenExternal={() => openUrl(portfolio.blog!)}
                />
              </div>
            )}

            {BLOG_POSTS.length > 0 && (
              <div>
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wide text-[#3C3C43]/50">
                  Articles
                </p>
                <div className="space-y-0.5">
                  {BLOG_POSTS.map((post, index) => {
                    const id = `post-${index}` as SelectionId;
                    return (
                      <NavItem
                        key={id}
                        label={post.title}
                        isActive={selectedId === id}
                        onSelect={() => handleSelect(id)}
                        onOpenExternal={() => openUrl(post.url)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>
        )}

        {showContent && (
        <div className="flex flex-1 items-center justify-center overflow-auto p-4 lg:p-8 macos-scroll">
          <div className="w-full max-w-lg rounded-2xl bg-white p-4 lg:p-8 shadow-lg ring-1 ring-black/[0.06]">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-md bg-[#F2F2F7] px-2 py-0.5 text-[11px] font-medium text-[#3C3C43]/70">
                {host}
              </span>
            </div>
            <h2 className="text-xl font-semibold leading-snug text-[#1C1C1E]">{currentTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#3C3C43]/80">{description}</p>
            <p className="mt-4 break-all font-mono text-xs text-[#3C3C43]/50">{currentUrl}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openUrl(currentUrl)}
                className="rounded-lg bg-[#007AFF] px-4 py-2 text-sm font-medium text-white hover:bg-[#0066DB]"
              >
                Open in new tab
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-lg bg-[#F2F2F7] px-4 py-2 text-sm font-medium text-[#1C1C1E] hover:bg-[#E5E5EA]"
              >
                {copied ? "Copied!" : "Copy URL"}
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
