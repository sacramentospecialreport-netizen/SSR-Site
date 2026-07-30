import importedPages from "./legacy-import.json";
import { legacyPages } from "./legacy-pages";

export type LegacyEmbed = {
  src: string;
  title: string;
  kind: "video" | "audio" | "form" | "map" | "interactive" | "unavailable";
};

export type LegacyContentPage = (typeof importedPages)[number];
export type LegacyImage = LegacyContentPage["images"][number];

export type LegacyFlowSection = {
  index: number;
  blocks: string[];
  images: LegacyImage[];
  embeds: LegacyEmbed[];
};

const titleByPath = new Map<string, string>(legacyPages.map(([title, path]) => [path, title]));

const customShowEmbeds: Record<string, { src: string; title: string }> = {
  "967577131": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1735656493/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "An Outside Look: Traffic Report",
  },
  "280102024": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=2099501062/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "An Inside Look: Deep Dive into Bohemian Grove",
  },
  "543825365": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1217666187/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "21 Reasons to Flee Cambodia",
  },
  "333029691": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1415373124/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "Behind the Scenes",
  },
  "557635335": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=390272254/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "Cambodia, Revisited",
  },
  "819425414": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1668595456/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "To Honor the Flights",
  },
  "521532417": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1579740569/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "No More",
  },
};

const showVideoTitles: Record<string, string> = {
  EDcVcQ9kq38: "On the Streets: Artist Spotlight — Tony Harris",
  "5Lmwg7VwtFc": "In the Field: Sacramento Storm Coverage",
  S1b1EZVgRd8: "Where's the Money? Is Minimum Wage Too High?",
};

const unavailableShowVideos = new Set(["EDcVcQ9kq38", "5Lmwg7VwtFc"]);

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

function normalizeLegacyEmbed(
  frame: LegacyContentPage["iframes"][number],
  index: number,
): LegacyEmbed {
  if (frame.src.includes("gstatic.com/atari/embeds")) {
    const key = new URL(frame.src).searchParams.get("r") ?? "";
    const showEmbed = customShowEmbeds[key];
    if (showEmbed) return { ...showEmbed, kind: "audio" };
  }
  const youtube = frame.src.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (youtube) {
    const videoId = youtube[1];
    const title = showVideoTitles[videoId] || frame.title || `SSR video ${index + 1}`;
    if (unavailableShowVideos.has(videoId)) {
      return { src: "", title, kind: "unavailable" };
    }
    return {
      src: `https://www.youtube-nocookie.com/embed/${videoId}`,
      title,
      kind: "video",
    };
  }
  if (frame.src.includes("docs.google.com/forms")) {
    return { src: frame.src, title: frame.title || "SSR community form", kind: "form" };
  }
  if (frame.src.includes("maps")) {
    return { src: frame.src, title: frame.title || "SSR field map", kind: "map" };
  }
  return {
    src: frame.src,
    title: frame.title || `SSR interactive ${index + 1}`,
    kind: "interactive",
  };
}

export function getLegacyEmbeds(page: LegacyContentPage): LegacyEmbed[] {
  return page.iframes
    .filter((frame) => frame.src && !frame.src.includes("drive.google.com/auth_warmup"))
    .map(normalizeLegacyEmbed);
}

export function getLegacyFlowSections(page: LegacyContentPage): LegacyFlowSection[] {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const title = normalize(getLegacyTitle(page));
  const textSections = page.sections.filter(
    (section) =>
      section.text.trim() &&
      !section.text.includes("SACRAMENTO SPECIAL REPORT, SUBSIDIARY"),
  );
  const firstTextIndex = textSections[0]?.index;
  const frames = page.iframes.filter(
    (frame) => frame.src && !frame.src.includes("drive.google.com/auth_warmup"),
  );
  const indices = new Set<number>([
    ...textSections.map((section) => section.index),
    ...page.images.map((image) => image.sectionIndex),
    ...frames
      .map((frame) => frame.sectionIndex)
      .filter((index): index is number => typeof index === "number"),
  ]);

  return [...indices].sort((a, b) => a - b).map((index) => {
    const text = textSections.find((section) => section.index === index)?.text.trim() ?? "";
    const blocks = text.split(/\n\s*\n/g).map((block) => block.trim()).filter(Boolean);
    if (index === firstTextIndex && blocks[0] && normalize(blocks[0]) === title) blocks.shift();
    return {
      index,
      blocks,
      images: page.images.filter((image) => image.sectionIndex === index),
      embeds: frames
        .map((frame, frameIndex) => ({
          frame,
          embed: normalizeLegacyEmbed(frame, frameIndex),
        }))
        .filter(({ frame }) => frame.sectionIndex === index)
        .map(({ embed }) => embed),
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
