import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourcePath = path.join(projectRoot, "content", "legacy-import.json");
const outputDir = path.join(projectRoot, "public", "legacy-import");
const pages = JSON.parse(await readFile(sourcePath, "utf8"));

await mkdir(outputDir, { recursive: true });

const extensionFor = (contentType) => {
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("svg")) return ".svg";
  return ".jpg";
};

const urls = [
  ...new Set(
    pages.flatMap((page) => page.images.map((image) => image.src)).filter((url) => url.startsWith("http")),
  ),
];
const localized = new Map();
const failed = [];

for (let index = 0; index < urls.length; index += 8) {
  await Promise.all(
    urls.slice(index, index + 8).map(async (url) => {
      try {
        const response = await fetch(url, {
          headers: {
            Referer: "https://sites.google.com/view/ssr-news/",
            "User-Agent": "Mozilla/5.0",
          },
        });
        if (!response.ok) throw new Error(String(response.status));
        const contentType = response.headers.get("content-type") ?? "image/jpeg";
        const fileName = `${createHash("sha1").update(url).digest("hex").slice(0, 16)}${extensionFor(contentType)}`;
        await writeFile(path.join(outputDir, fileName), Buffer.from(await response.arrayBuffer()));
        localized.set(url, `/legacy-import/${fileName}`);
      } catch {
        failed.push(url);
      }
    }),
  );
}

for (const page of pages) {
  page.images = page.images.map((image) => ({
    ...image,
    src: localized.get(image.src) ?? image.src,
  }));
}

await writeFile(sourcePath, `${JSON.stringify(pages, null, 2)}\n`, "utf8");
console.log(`Localized ${localized.size} legacy images; ${failed.length} remain remote.`);
