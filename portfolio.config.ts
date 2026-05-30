import type { Project, Skills, WallpaperStyle } from "./types/macos";

/**
 * Portfolio configuration — edit this file to personalize your site.
 */
export const portfolio = {
  /** Your full name */
  name: "Alex Morgan",
  /** Professional title shown in About This Mac */
  title: "Full Stack Developer",
  /** Contact email */
  email: "hello@alexmorgan.dev",
  /** Path to headshot (place image in /public/images/) */
  photo: "/images/photo.svg",
  /** Short bio paragraphs for Finder README preview */
  bio: `I'm a full stack developer passionate about crafting delightful user experiences and robust systems. I specialize in React, TypeScript, and Node.js, with a love for design systems and interactive interfaces.

With 5+ years of experience, I've shipped products for startups and enterprise teams — from real-time dashboards to consumer mobile apps. I believe great software feels invisible: fast, intuitive, and polished.

When I'm not coding, you'll find me exploring new design trends, contributing to open source, or experimenting with creative web projects like this one.`,
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"],
    tools: ["Git", "Docker", "AWS", "Figma", "PostgreSQL", "Redis"],
  } satisfies Skills,
  projects: [
    {
      name: "TaskFlow",
      description:
        "A collaborative project management platform with real-time updates, kanban boards, and team analytics.",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      name: "WeatherLens",
      description:
        "Beautiful weather app with animated backgrounds that reflect current conditions and 7-day forecasts.",
      tech: ["React", "OpenWeather API", "Framer Motion"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      name: "DevMetrics",
      description:
        "Developer productivity dashboard aggregating GitHub stats, commit patterns, and code review insights.",
      tech: ["Node.js", "GraphQL", "D3.js", "PostgreSQL"],
      github: "https://github.com",
    },
    {
      name: "macOS Portfolio",
      description:
        "This portfolio site — an interactive macOS desktop experience built with Next.js and Framer Motion.",
      tech: ["Next.js", "Framer Motion", "Zustand", "Tailwind"],
      github: "https://github.com",
      live: "https://example.com",
    },
  ] satisfies Project[],
  /** Wallpaper style: aurora | big-sur | sequoia | monterey */
  wallpaper: "aurora" as WallpaperStyle,
  resume: {
    summary:
      "Full stack developer with 5+ years building performant web applications. Passionate about UX, design systems, and creative coding.",
    experience: [
      {
        role: "Senior Frontend Engineer",
        company: "TechCorp Inc.",
        period: "2022 — Present",
        bullets: [
          "Led migration to Next.js App Router, improving LCP by 40%",
          "Built internal design system used by 12 product teams",
          "Mentored 4 junior developers through code reviews and pairing",
        ],
      },
      {
        role: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2020 — 2022",
        bullets: [
          "Shipped MVP to 10k users in 3 months",
          "Implemented real-time features with WebSockets",
          "Reduced API response times by 60% through caching",
        ],
      },
    ],
    education: {
      degree: "B.S. Computer Science",
      school: "State University",
      year: "2020",
    },
  },
  messages: {
    greeting: "Hey! Thanks for checking out my portfolio 👋",
    availability: "I'm currently open to new opportunities",
    contact: "Feel free to reach out at hello@alexmorgan.dev",
    cannedReplies: {
      hire: "Yes! I'm open to full-time and contract roles. Drop me an email and let's chat!",
      email: "You can reach me at hello@alexmorgan.dev — I typically respond within 24 hours.",
      project: "Check out the Projects app in the dock for my latest work!",
      default:
        "Thanks for reaching out! Feel free to ask about my projects, skills, or availability.",
    },
  },
};

export type Portfolio = typeof portfolio;
