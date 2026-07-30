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

const tradingViewWidget = (widget: string, config: Record<string, unknown>) =>
  `https://www.tradingview-widget.com/embed-widget/${widget}/?locale=en#${encodeURIComponent(JSON.stringify(config))}`;

const customLegacyEmbeds: Record<string, LegacyEmbed> = {
  "967577131": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1735656493/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "An Outside Look: Traffic Report",
    kind: "audio",
  },
  "280102024": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=2099501062/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "An Inside Look: Deep Dive into Bohemian Grove",
    kind: "audio",
  },
  "543825365": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1217666187/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "21 Reasons to Flee Cambodia",
    kind: "audio",
  },
  "333029691": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1415373124/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "Behind the Scenes",
    kind: "audio",
  },
  "557635335": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=390272254/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "Cambodia, Revisited",
    kind: "audio",
  },
  "819425414": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1668595456/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "To Honor the Flights",
    kind: "audio",
  },
  "521532417": {
    src: "https://bandcamp.com/EmbeddedPlayer/track=1579740569/size=small/bgcol=ffffff/linkcol=8d1d21/transparent=true/",
    title: "No More",
    kind: "audio",
  },
  "654875840": {
    src: tradingViewWidget("ticker-tape", {
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
        { proName: "FX_IDC:EURUSD", title: "FNAF Tyle, LLC" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitchcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
    }),
    title: "Hot Street market ticker",
    kind: "interactive",
  },
  "691486532": {
    src: "https://s.tradingview.com/widgetembed/?symbol=AMEX%3ABATT&interval=D&theme=light&style=1&locale=en&allow_symbol_change=1",
    title: "BATT market chart",
    kind: "interactive",
  },
  "809539056": {
    src: "https://s.tradingview.com/widgetembed/?symbol=NYSE%3ANYT&interval=1&theme=light&style=1&locale=en&allow_symbol_change=1",
    title: "NYT market chart",
    kind: "interactive",
  },
  "665377745": {
    src: tradingViewWidget("market-overview", {
      colorTheme: "light",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "100%",
      height: 560,
      tabs: [
        {
          title: "Indices",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
            { s: "FOREXCOM:NSXUSD", d: "US 100" },
            { s: "FOREXCOM:DJI", d: "Dow 30" },
          ],
        },
      ],
    }),
    title: "Market overview",
    kind: "interactive",
  },
  "23966201": {
    src: tradingViewWidget("technical-analysis", {
      interval: "1m",
      width: "100%",
      height: 450,
      symbol: "NYSE:NYT",
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: "light",
    }),
    title: "NYT technical analysis",
    kind: "interactive",
  },
  "62297962": {
    src: "https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=648685&pref_coin_id=1505",
    title: "Cryptocurrency price chart",
    kind: "interactive",
  },
  "493627515": {
    src: tradingViewWidget("crypto-mkt-screener", {
      width: "100%",
      height: 520,
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "light",
      market: "crypto",
      enableScrolling: true,
      locale: "en",
    }),
    title: "Cryptocurrency market screener",
    kind: "interactive",
  },
  "114469766": {
    src: tradingViewWidget("forex-heat-map", {
      width: "100%",
      height: 430,
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"],
      isTransparent: false,
      colorTheme: "light",
      locale: "en",
    }),
    title: "Currency heat map",
    kind: "interactive",
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
  pagePath: string,
): LegacyEmbed {
  if (frame.src.includes("gstatic.com/atari/embeds")) {
    const key = new URL(frame.src).searchParams.get("r") ?? "";
    const customEmbed = customLegacyEmbeds[key];
    if (customEmbed) return customEmbed;
    if (pagePath === "/hot-street/hot-street-crime") {
      return {
        src: "https://communitycrimemap.com/",
        title: "Community crime map",
        kind: "map",
      };
    }
  }
  const youtube = frame.src.match(/youtube\.com\/embed\/([^?&/]+)/);
  if (youtube) {
    const replacements: Record<string, string> = {
      H7K6DFzqy_A: "ExvwZYDD0Rs",
      "-Fv1572rMNc": "tWqRjVM26fA",
    };
    const videoId = replacements[youtube[1]] ?? youtube[1];
    const replacementTitles: Record<string, string> = {
      ExvwZYDD0Rs: "Sac Anime 2023 Convention Coverage",
      tWqRjVM26fA: "Exclusive with Odin Makes",
    };
    const title = replacementTitles[videoId] || showVideoTitles[videoId] || frame.title || `SSR video ${index + 1}`;
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
    .map((frame, index) => normalizeLegacyEmbed(frame, index, page.path));
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
          embed: normalizeLegacyEmbed(frame, frameIndex, page.path),
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
