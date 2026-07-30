import importedPages from "./legacy-import.json";
import { legacyPages } from "./legacy-pages";

export type LegacyEmbed = {
  src: string;
  title: string;
  kind: "video" | "form" | "map" | "interactive";
};

export type LegacyContentPage = (typeof importedPages)[number];

const titleByPath = new Map<string, string>(legacyPages.map(([title, path]) => [path, title]));

export const legacyContentPages = importedPages as LegacyContentPage[];

export function getLegacyPage(path: string) {
  return legacyContentPages.find((page) => page.path === path);
}

export function getLegacyTitle(page: LegacyContentPage) {
  return titleByPath.get(page.path) ?? page.path.split("/").filter(Boolean).at(-1) ?? "SSR Report";
}

export function getLegacySection(page: LegacyContentPage) {
  if (page.path.startsWith("/hot-street")) return "Hot Street";
  if (page.path.startsWith("/about")) return "About SSR";
  if (page.path.startsWith("/home/drought")) return "Drought Watch";
  if (page.path.includes("safety")) return "Public Safety";
  if (page.path.includes("artist") || page.path.includes("convention")) return "Arts & Culture";
  if (page.path.startsWith("/shows") || page.path.startsWith("/live")) return "SSR Broadcast";
  return "From the SSR Desk";
}

export function getLegacyTextSections(page: LegacyContentPage) {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const title = normalize(getLegacyTitle(page));
  return page.sections
    .map((section) => section.text.trim())
    .filter((text) => text && !text.includes("SACRAMENTO SPECIAL REPORT, SUBSIDIARY"))
    .map((text, index) => {
      const blocks = text.split(/\n\s*\n/g).map((block) => block.trim()).filter(Boolean);
      if (index === 0 && blocks[0] && normalize(blocks[0]) === title) blocks.shift();
      return blocks;
    })
    .filter((blocks) => blocks.length);
}

export function getLegacyEmbeds(page: LegacyContentPage): LegacyEmbed[] {
  return page.iframes
    .filter((frame) => frame.src && !frame.src.includes("drive.google.com/auth_warmup"))
    .map((frame, index) => {
      const youtube = frame.src.match(/youtube\.com\/embed\/([^?&/]+)/);
      if (youtube) {
        return {
          src: `https://www.youtube-nocookie.com/embed/${youtube[1]}`,
          title: frame.title || `SSR video ${index + 1}`,
          kind: "video" as const,
        };
      }
      if (frame.src.includes("docs.google.com/forms")) {
        return { src: frame.src, title: frame.title || "SSR community form", kind: "form" as const };
      }
      if (frame.src.includes("maps")) {
        return { src: frame.src, title: frame.title || "SSR field map", kind: "map" as const };
      }
      return {
        src: frame.src,
        title: frame.title || `SSR interactive ${index + 1}`,
        kind: "interactive" as const,
      };
    });
}

export function getRelatedLegacyPages(page: LegacyContentPage) {
  const prefix = `${page.path}/`;
  return legacyContentPages.filter((candidate) => {
    if (!candidate.path.startsWith(prefix)) return false;
    return !candidate.path.slice(prefix.length).includes("/");
  });
}

export function getLegacySummary(page: LegacyContentPage) {
  const sections = getLegacyTextSections(page);
  const firstParagraph = sections.flat().find((block) => block.length > 70);
  return firstParagraph ?? `Original Sacramento Special Report coverage from ${getLegacySection(page)}.`;
}
