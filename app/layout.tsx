import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Kanchana - Portfolio",
  description: "Interactive macOS desktop portfolio showcasing projects, skills, and experience.",
  openGraph: {
    title: "Kanchana - Portfolio",
    description: "Interactive macOS desktop portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased`}>{children}</body>
    </html>
  );
}
