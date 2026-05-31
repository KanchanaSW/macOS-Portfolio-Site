import type { Project, Skills, WallpaperStyle } from "./types/macos";

/**
 * Portfolio configuration — edit this file to personalize your site.
 */
export const portfolio = {
  /** Your full name */
  name: "Kanchana Walagambahu",
  /** Professional title shown in About This Mac */
  title: "Senior Software Engineer – Frontend",
  /** Contact email */
  email: "sachithrakanchana.ks@gmail.com",
  /** Path to headshot (place image in /public/images/) */
  photo: "/images/photo.jpg",
  /** Short bio paragraphs for Finder README preview */
  bio: `I'm a Senior Software Engineer and emerging Tech Lead based in Colombo, Sri Lanka, with 4+ years of experience building scalable React and Next.js applications for enterprise SaaS products.

I specialize in end-to-end feature delivery — from product feasibility discussions and structured developer guides to coordinating parallel FE/BE workstreams that ship fast without compromising quality. I love architecting modular frontend systems, mentoring engineering teams, and implementing performance and caching solutions that reduce costs and improve UX.

When I'm not coding, you'll find me exploring AI-assisted development tools, contributing to personal projects, or sharing what I've learned through internal tech talks.`,
  skills: {
    languages: [
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "SASS",
      "Java",
      "Kotlin",
      "SQL",
    ],
    frameworks: [
      "React",
      "Next.js",
      "Redux",
      "Zustand",
      "React Query",
      "GraphQL",
      "Node.js",
      "Express.js",
      "Spring Boot",
    ],
    tools: [
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Ant Design",
      "Material UI",
      "Framer Motion",
      "Firebase",
      "Supabase",
      "Convex",
      "SonarQube",
      "Storybook",
      "CI/CD",
    ],
  } satisfies Skills,
  projects: [
    {
      name: "JSON Vibe",
      description:
        "A production-ready shareable JSON editor with real-time validation, format conversion, ERD-style schema visualization, client-side encryption, and zero-backend URL sharing.",
      tech: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "CodeMirror 6",
        "React Flow",
        "Web Crypto API",
      ],
      // github: "https://github.com/KanchanaSW",
      live: "https://jsonshare.org",
    },
    {
      name: "Sri Lankan Stock Analysis",
      description:
        "AI-assisted stock analysis platform for the Colombo Stock Exchange with automated data pipelines, three-tier scoring, and Groq-powered investment insights.",
      tech: [
        "Next.js",
        "TypeScript",
        "Convex",
        "Recharts",
        "Groq API",
        "GitHub Actions",
      ],
      // github: "https://github.com/KanchanaSW",
      live: "https://slstocks.netlify.app",
    },
    {
      name: "Wildwood Packiyo",
      description:
        "Full-stack inventory and order management platform with real-time updates, advanced dashboards, bulk operations, and GraphQL-powered data fetching.",
      tech: [
        "Next.js",
        "React",
        "GraphQL",
        "shadcn/ui",
        "React Hook Form",
        "Framer Motion",
      ],
      // github: "https://github.com/KanchanaSW",
    },
    {
      name: "SmartNas",
      description:
        "Android application for Smart Axiata with Firebase Crashlytics monitoring, Adjust SDK attribution tracking, and SonarQube quality enforcement.",
      tech: [
        "Android",
        "Kotlin",
        "Firebase",
        "Retrofit",
        "Dagger",
        "Material Design",
      ],
      // github: "https://github.com/KanchanaSW",
    },
    {
      name: "macOS Portfolio",
      description:
        "This portfolio site — an interactive macOS desktop experience built with Next.js and Framer Motion.",
      tech: ["Next.js", "Framer Motion", "Zustand", "Tailwind"],
      github: "https://github.com/KanchanaSW",
    },
  ] satisfies Project[],
  /** Wallpaper style: aurora | big-sur | sequoia | monterey */
  wallpaper: "aurora" as WallpaperStyle,
  resume: {
    summary:
      "Senior Software Engineer and emerging Tech Lead with 4+ years delivering scalable React and Next.js applications for enterprise SaaS. Proven in mentoring teams, architecting modular frontend systems, and bridging Product, Design, QA, and Engineering to ship the right thing, fast.",
    experience: [
      {
        role: "Senior Software Engineer",
        company: "Axiata Digital Labs",
        period: "Mar 2025 — Present",
        bullets: [
          "Conducted technical feasibility discussions with Product and UI/UX, reducing mid-sprint rework across releases",
          "Resolved critical performance bottlenecks with fine-grained APIs and CMS-driven dynamic TTL caching",
          "Co-led frontend architecture for Axonect Enterprise Product Catalog with a modular component strategy",
          "Mentored junior developers and interns through weekly 1:1s, PR reviews, and coding standards enforcement",
        ],
      },
      {
        role: "Software Engineer",
        company: "Axiata Digital Labs",
        period: "Oct 2022 — Mar 2025",
        bullets: [
          "Fast-tracked critical features by parallelising FE/BE work with mocked APIs and staged QA handoffs",
          "Delivered internal tech talk on AI-assisted development with Cursor, driving team-wide adoption",
          "Resolved 20+ critical frontend bugs and Firebase Crashlytics-reported Android crashes on SmartNas",
          "Integrated Adjust SDK event tracking and resolved SonarQube-flagged issues across codebases",
        ],
      },
      // {
      //   role: "Frontend Developer",
      //   company: "Tribird (Remote, Part-time)",
      //   period: "Mar 2025 — Aug 2025",
      //   bullets: [
      //     "Built Wildwood Packiyo with Next.js 15, React 19, GraphQL, React Query, and Zustand",
      //     "Developed interactive dashboards with Recharts and React Table, advanced filtering, and bulk operations",
      //     "Leveraged SSR, dynamic routing, and code splitting to improve SEO and initial page load times",
      //   ],
      // },
      {
        role: "Associate Software Engineer",
        company: "Informatics International",
        period: "Mar 2022 — Oct 2022",
        bullets: [
          "Developed enterprise UIs with React, TypeScript, Material UI, and Redux",
          "Partnered with UX designers and backend teams to define API contracts and component specs",
          "Optimized Redux state management and resolved 10+ front-end issues",
        ],
      },
    ],
    education: {
      degree: "B.Eng (Hons) Software Engineering",
      school: "Staffordshire University (APIIT Sri Lanka)",
      year: "2022",
    },
  },
  messages: {
    greeting: "Hey! Thanks for checking out my portfolio 👋",
    availability: "I'm currently open to new opportunities",
    contact: "Feel free to reach out at sachithrakanchana.ks@gmail.com",
    cannedReplies: {
      hire: "Yes! I'm open to full-time and contract roles. Drop me an email and let's chat!",
      email:
        "You can reach me at sachithrakanchana.ks@gmail.com — I typically respond within 24 hours.",
      project: "Check out the Projects app in the dock for my latest work!",
      default:
        "Thanks for reaching out! Feel free to ask about my projects, skills, or availability.",
    },
  },
};

export type Portfolio = typeof portfolio;
