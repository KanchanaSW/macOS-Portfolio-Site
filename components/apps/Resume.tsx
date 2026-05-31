"use client";

import { portfolio } from "@/portfolio.config";
import { exportResumePdf } from "@/lib/pdfExport";

export default function Resume() {
  const handleDownload = () => {
    exportResumePdf("resume-content", `${portfolio.name.replace(" ", "-")}-resume.pdf`);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#3a3a3c] text-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <button type="button" className="rounded p-1 text-white/50 hover:bg-white/10" aria-label="Zoom out">
            −
          </button>
          <button type="button" className="rounded p-1 text-white/50 hover:bg-white/10" aria-label="Zoom in">
            +
          </button>
          <span className="text-xs text-white/50">100%</span>
        </div>
        <span className="text-xs text-white/50">1 of 1</span>
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
        >
          Download PDF
        </button>
      </div>

      {/* Resume content */}
      <div className="min-h-0 flex-1 overflow-auto p-4 macos-scroll lg:p-6">
        <div
          id="resume-content"
          className="mx-auto max-w-lg rounded-lg bg-white p-4 text-gray-900 shadow-lg lg:p-8"
        >
          <header className="mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold">{portfolio.name}</h1>
            <p className="text-gray-600">{portfolio.title}</p>
            <p className="mt-1 text-sm text-gray-500">{portfolio.email}</p>
          </header>

          <section className="mb-6">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Summary</h2>
            <p className="text-sm leading-relaxed text-gray-700">{portfolio.resume.summary}</p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Experience</h2>
            {portfolio.resume.experience.map((exp) => (
              <div key={exp.company} className="mb-4">
                <div className="flex flex-col items-baseline justify-between gap-0.5 lg:flex-row lg:gap-0">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <span className="text-xs text-gray-500">{exp.period}</span>
                </div>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <ul className="mt-1 list-inside list-disc text-sm text-gray-700">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Skills</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Languages:</strong> {portfolio.skills.languages.join(", ")}</p>
              <p><strong>Frameworks:</strong> {portfolio.skills.frameworks.join(", ")}</p>
              <p><strong>Tools:</strong> {portfolio.skills.tools.join(", ")}</p>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">Education</h2>
            <p className="font-semibold">{portfolio.resume.education.degree}</p>
            <p className="text-sm text-gray-600">
              {portfolio.resume.education.school} · {portfolio.resume.education.year}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
