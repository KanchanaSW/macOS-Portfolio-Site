import { portfolio } from "@/portfolio.config";

export type FinderFileType = "md" | "photo" | "code";

export interface FinderFile {
  name: string;
  size: string;
  kind: string;
  dateAdded: string;
  type: FinderFileType;
}

export const FINDER_FILES: FinderFile[] = [
  {
    name: `${portfolio.name.replace(/\s+/g, "_")}.md`,
    size: "2 KB",
    kind: "Markdown document",
    dateAdded: "Today at 09:14",
    type: "md",
  },
  {
    name: `${portfolio.name.split(" ")[0]}.jpg`,
    size: "148 KB",
    kind: "JPEG image",
    dateAdded: "Yesterday at 22:05",
    type: "photo",
  },
  {
    name: "portfolio.config.ts",
    size: "4 KB",
    kind: "TypeScript source",
    dateAdded: "28 May 2026 at 18:44",
    type: "code",
  },
];

function formatSkillsList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export function getQuickLookMarkdown(file: FinderFile): string {
  if (file.type === "code") {
    return `export const portfolio = {
  name: "${portfolio.name}",
  title: "${portfolio.title}",
  email: "${portfolio.email}",
  photo: "${portfolio.photo}",
  wallpaper: "${portfolio.wallpaper}",
};`;
  }

  const aboutParagraphs = portfolio.bio
    .split("\n\n")
    .map((para) => para.trim())
    .filter(Boolean)
    .join("\n\n");

  return `# ${portfolio.name}
## ${portfolio.title}

## About Me
${aboutParagraphs}

## Skills
${formatSkillsList([...portfolio.skills.languages, ...portfolio.skills.frameworks.slice(0, 4)])}`;
}

export function getQuickLookOpenWithLabel(file: FinderFile): string {
  switch (file.type) {
    case "md":
      return "Open with TextEdit";
    case "photo":
      return "Open with Preview";
    case "code":
      return "Open with Cursor";
    default:
      return "Open with Finder";
  }
}
