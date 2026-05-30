/**
 * Regenerate macOS app icons from the local system (macOS only).
 * Run: npm run icons
 */
import { fileIconToFile } from "file-icon";
import fs from "node:fs";
import { execSync } from "node:child_process";

const outDir = "public/icons";

const icons = [
  ["Finder", "finder.png"],
  ["Messages", "messages.png"],
  ["Terminal", "terminal.png"],
  ["Music", "music.png"],
  ["/System/Applications/Preview.app", "resume.png"],
];

fs.mkdirSync(outDir, { recursive: true });

for (const [app, file] of icons) {
  await fileIconToFile(app, { size: 512, destination: `${outDir}/${file}` });
  console.log("Extracted", file);
}

try {
  await fileIconToFile("Xcode", { size: 512, destination: `${outDir}/projects.png` });
  console.log("Extracted projects.png (Xcode)");
} catch {
  await fileIconToFile("App Store", { size: 512, destination: `${outDir}/projects.png` });
  console.log("Extracted projects.png (App Store — install Xcode for the dev icon)");
}

execSync(`sips -Z 256 ${outDir}/*.png`, { stdio: "inherit" });
console.log("Optimized icons to 256px");
