import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const layoutPath = process.argv[2];
if (!layoutPath) throw new Error("Pass the recovered legacy layout map as the first argument.");

const projectRoot = path.resolve(import.meta.dirname, "..");
const contentPath = path.join(projectRoot, "content", "legacy-import.json");
const pages = JSON.parse(await readFile(contentPath, "utf8"));
const layoutPages = JSON.parse(await readFile(layoutPath, "utf8"));
const layoutByPath = new Map(layoutPages.map((page) => [page.path, page]));

for (const page of pages) {
  const layout = layoutByPath.get(page.path);
  if (!layout) throw new Error(`Missing layout data for ${page.path}`);

  const imageSections = layout.sections.flatMap((section) =>
    section.images.map(() => section.index),
  );
  if (imageSections.length !== page.images.length) {
    throw new Error(`Image count mismatch for ${page.path}`);
  }
  page.images = page.images.map((image, index) => ({
    ...image,
    sectionIndex: imageSections[index],
  }));

  const frameSections = layout.sections.flatMap((section) =>
    section.frames.map(() => section.index),
  );
  let frameIndex = 0;
  page.iframes = page.iframes.map((frame) => {
    if (frame.src.includes("drive.google.com/auth_warmup")) return frame;
    const sectionIndex = frameSections[frameIndex];
    frameIndex += 1;
    return { ...frame, sectionIndex };
  });
  if (frameIndex !== frameSections.length) {
    throw new Error(`Embed count mismatch for ${page.path}`);
  }
}

await writeFile(contentPath, `${JSON.stringify(pages, null, 2)}\n`, "utf8");
console.log(`Added original section placement to ${pages.length} legacy pages.`);
