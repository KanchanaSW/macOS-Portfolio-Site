"use client";

import Image from "next/image";
import { portfolio } from "@/portfolio.config";

const bioParagraphs = portfolio.bio
  .split("\n\n")
  .map((para) => para.trim())
  .filter(Boolean);

const skillsPreview = [
  ...portfolio.skills.languages,
  ...portfolio.skills.frameworks.slice(0, 4),
];

function EnvelopeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 flex-shrink-0 text-white/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" />
      <path d="M1.5 4.5 8 9.5l6.5-5" />
    </svg>
  );
}

export function AboutMePreview() {
  return (
    <div className="p-4 lg:p-6">
      <article className="rounded-sm border border-white/[0.12] p-5 lg:p-6">
        <header className="mb-5 flex gap-4">
          <div className="relative h-[120px] w-[120px] flex-shrink-0 overflow-hidden border border-white/20 lg:h-[130px] lg:w-[130px]">
            <Image
              src={portfolio.photo}
              alt={portfolio.name}
              fill
              className="object-cover"
              sizes="130px"
            />
          </div>
          <div className="min-w-0 pt-1">
            <h1 className="text-[18px] font-semibold leading-tight text-white/90 lg:text-[20px]">
              {portfolio.name}
            </h1>
            <p className="mt-1 text-[13px] text-white/50">{portfolio.title}</p>
          </div>
        </header>

        <div className="space-y-3">
          {bioParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-[13px] leading-relaxed text-white/85">
              {paragraph}
            </p>
          ))}
        </div>

        <a
          href={`mailto:${portfolio.email}`}
          className="mt-4 inline-flex items-center gap-2 text-[13px] text-[var(--macos-selection-blue)] underline underline-offset-2 hover:opacity-90"
        >
          <EnvelopeIcon />
          {portfolio.email}
        </a>

        <hr className="my-5 border-0 border-t border-white/[0.08]" />

        <div className="flex flex-wrap gap-2">
          <a
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[88px] items-center justify-center bg-white/10 px-4 py-1.5 text-[13px] text-white/90 transition-colors hover:bg-white/15"
          >
            GitHub
          </a>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[88px] items-center justify-center bg-white/10 px-4 py-1.5 text-[13px] text-white/90 transition-colors hover:bg-white/15"
          >
            LinkedIn
          </a>
        </div>
      </article>

      <section className="mt-6">
        <h2 className="mb-2 text-[13px] font-semibold text-white/70">Skills</h2>
        <ul className="list-inside list-disc space-y-1 text-[13px] text-white/85">
          {skillsPreview.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
