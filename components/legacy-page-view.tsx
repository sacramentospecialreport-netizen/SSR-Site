import Link from "next/link";
import { LegacyCarousel } from "@/components/legacy-carousel";
import { SectionLinks } from "@/components/section-links";
import {
  getLegacyEmbeds,
  getLegacyFlowSections,
  getLegacySection,
  getLegacySummary,
  getLegacyTitle,
  getRelatedLegacyPages,
  type LegacyContentPage,
  type LegacyEmbed,
} from "@/content/legacy-content";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function LegacyEmbedPlayer({ embed }: { embed: LegacyEmbed }) {
  return (
    <figure className={`legacy-embed legacy-embed-${embed.kind}`}>
      {embed.kind === "unavailable" ? (
        <div className="legacy-embed-notice">
          <span>SSR Video Archive</span>
          <strong>{embed.title}</strong>
          <p>The original video is currently private on YouTube.</p>
        </div>
      ) : (
        <iframe
          src={embed.src}
          title={embed.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
      {embed.title && <figcaption>{embed.title}</figcaption>}
    </figure>
  );
}

const showGroups = [
  {
    title: "Local",
    programs: [
      { name: "An Outside Look", imageIndex: 0, embedIndex: 0 },
      { name: "On the Streets", imageIndex: 1, embedIndex: 1 },
      { name: "An Inside Look", imageIndex: 2, embedIndex: 2 },
      { name: "In the Field", imageIndex: 3, embedIndex: 3 },
    ],
  },
  {
    title: "Arts & Culture",
    programs: [
      { name: "Gruel: the Next Kale", imageIndex: 4 },
      { name: "21 Reasons to Flee Cambodia", imageIndex: 5, embedIndex: 4 },
      { name: "Taint's Video's Inc.", imageIndex: 6, embedIndex: 5 },
      { name: "Cambodia, Revisited", imageIndex: 7, embedIndex: 6 },
    ],
  },
  {
    title: "Economics",
    programs: [
      { name: "To Honor the Flights", imageIndex: 8, embedIndex: 7 },
      { name: "Where's the Money?", imageIndex: 9, embedIndex: 8 },
      { name: "Live From CBC", imageIndex: 10 },
      { name: "No More", imageIndex: 11, embedIndex: 9 },
    ],
  },
] as const;

function ShowsProgramming({ page }: { page: LegacyContentPage }) {
  const embeds = getLegacyEmbeds(page);
  return (
    <div className="shows-programming">
      <p className="shows-programming-intro">
        See the Sacramento Special Report programming schedule and revisit original broadcasts from the SSR archive.
      </p>
      {showGroups.map((group) => (
        <section className="shows-program-group" key={group.title}>
          <div className="section-heading">
            <h2>{group.title}</h2>
            <span>SSR Programming</span>
          </div>
          <div className="shows-program-grid">
            {group.programs.map((program) => {
              const image = page.images[program.imageIndex];
              const embed = "embedIndex" in program ? embeds[program.embedIndex] : undefined;
              return (
                <article className="shows-program-card" key={program.name}>
                  {image && (
                    <img
                      className="shows-program-art"
                      src={image.src}
                      alt={`${program.name} program artwork`}
                      loading="lazy"
                    />
                  )}
                  <div className="shows-program-title">
                    <span>{group.title}</span>
                    <h3>{program.name}</h3>
                  </div>
                  {embed ? (
                    <LegacyEmbedPlayer embed={embed} />
                  ) : (
                    <p className="shows-program-archive-note">Program artwork from the SSR broadcast archive.</p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function HotStreetProgramming() {
  const desks = [
    {
      href: "/hot-street/hot-street-finance",
      eyebrow: "Markets",
      title: "Hot Street Finance",
      copy: "Live market tickers, charts, technical analysis and SSR's ongoing study of financial gravity.",
    },
    {
      href: "/hot-street/hot-street-crypto",
      eyebrow: "Digital Currency",
      title: "Hot Street Crypto",
      copy: "Cryptocurrency charts, screeners and heat maps from the speculative edge.",
    },
    {
      href: "/hot-street/hot-street-crime",
      eyebrow: "Public Safety",
      title: "Hot Street Crime",
      copy: "Open the community crime map and examine what is happening around Sacramento.",
    },
  ];
  return (
    <div className="hot-street-programming">
      <div className="hot-street-grid">
        {desks.map((desk) => (
          <Link href={desk.href} className="hot-street-card" key={desk.href}>
            <span>{desk.eyebrow}</span><h2>{desk.title}</h2><p>{desk.copy}</p><strong>Open desk →</strong>
          </Link>
        ))}
      </div>
      <div className="hub-link-cloud">
        <Link href="/sections/public-safety">Public Safety Desk</Link>
        <Link href="/home/safety-quiz">Safety Quiz</Link>
        <Link href="/home/drought-watch">Drought Watch</Link>
        <Link href="/stories/the-cost-of-driving">The Cost of Driving</Link>
        <Link href="/stories/gas">Gas</Link>
      </div>
    </div>
  );
}

function splitNumberedBlock(block: string) {
  const match = block.match(/^(\d+)\.\s+([\s\S]+)$/);
  if (!match) return null;
  const [, number, content] = match;
  const firstSentence = content.match(/^(.+?[.!?]["']?)\s+([\s\S]+)$/);
  if (firstSentence && firstSentence[1].length > 20 && content.length > 140) {
    return {
      number,
      heading: firstSentence[1],
      body: firstSentence[2].trim(),
    };
  }
  return { number, heading: content, body: "" };
}

const headquartersCaptions = [
  { title: "The SSR tower", body: "Sacramento Special Report headquarters, viewed from street level." },
  { title: "Main conference room", body: "The newsroom's long table for editorial conferences and visiting delegations." },
  { title: "Consultation room", body: "A smaller meeting room reserved for sensitive sources and difficult conversations." },
  { title: "Field briefing hall", body: "A sunlit briefing room prepared for correspondents returning from the streets." },
  { title: "Executive news table", body: "The upper newsroom table, where matters of exceptional consequence are reviewed." },
];

function getCarouselCaptions(page: LegacyContentPage, blocks: string[], count: number) {
  if (page.path === "/about/headquarters") return headquartersCaptions.slice(0, count);
  if (blocks.length >= count * 2) {
    return Array.from({ length: count }, (_, index) => ({
      title: blocks[index * 2],
      body: blocks[index * 2 + 1],
    }));
  }
  const title = getLegacyTitle(page);
  return Array.from({ length: count }, (_, index) => ({
    title: `${title} — archive image ${index + 1}`,
    body: blocks[0] || "From the Sacramento Special Report visual archive.",
  }));
}

export function LegacyPageView({ page }: { page: LegacyContentPage }) {
  const title = getLegacyTitle(page);
  const section = getLegacySection(page);
  const summary = getLegacySummary(page);
  const flowSections = getLegacyFlowSections(page);
  const articleFlowSections = flowSections.map((flow) => ({
    ...flow,
    blocks: flow.blocks.filter((block) => block.trim() !== summary.trim()),
  }));
  const related = getRelatedLegacyPages(page);
  const isArts =
    page.path.startsWith("/stories/convention-watch") ||
    page.path.startsWith("/stories/local-artist-spotlight");

  return (
    <div className={isArts ? "arts-section-shell" : undefined}>
      <header className={`article-masthead${isArts ? " arts-article-masthead" : ""}`}>
        <Link href="/">
          <img src={`${assetBase}/legacy/ssr-logo.png`} alt="" />
          <span>Sacramento Special Report</span>
        </Link>
        <SectionLinks className="article-section-nav" />
      </header>
      <main className={`legacy-report-page${isArts ? " arts-legacy-report" : ""}`}>
        <Link className="article-back" href="/">← Back to the front page</Link>
        <p className="kicker">{section}</p>
        <h1>{title}</h1>
        <p className="legacy-standfirst">{summary}</p>
        <div className="legacy-provenance">
          <strong>SSR Newsroom</strong>
          <span>Original report</span>
        </div>

        {page.path === "/shows" ? (
          <ShowsProgramming page={page} />
        ) : page.path === "/hot-street" ? (
          <HotStreetProgramming />
        ) : (
        <div className="legacy-report-grid">
          <article className="legacy-report-copy">
            {articleFlowSections.map((flow, flowIndex) => (
              <section className="legacy-flow-section" key={`${page.path}-${flow.index}`}>
                {flow.images.length > 1 ? (
                  <LegacyCarousel
                    images={flow.images}
                    captions={getCarouselCaptions(page, flow.blocks, flow.images.length)}
                    label={`${title} image gallery`}
                  />
                ) : flow.images.length === 1 ? (
                  <div className={`legacy-inline-images${flow.images.length > 1 ? " legacy-inline-images-grid" : ""}`}>
                    {flow.images.map((image, imageIndex) => (
                      <figure key={`${image.src}-${imageIndex}`}>
                        <img
                          src={image.src}
                          alt={image.alt || `${title} archival image ${imageIndex + 1}`}
                          loading={flowIndex === 0 && imageIndex === 0 ? "eager" : "lazy"}
                        />
                      </figure>
                    ))}
                  </div>
                ) : null}
                {(page.path === "/stories" && flow.images.length > 1 ? [] : flow.blocks).map((block, blockIndex) => {
                  const numbered = splitNumberedBlock(block);
                  if (numbered) {
                    return (
                      <div className="legacy-numbered-item" key={`${block}-${blockIndex}`}>
                        <h2><span>{numbered.number}</span>{numbered.heading}</h2>
                        {numbered.body && <p className="legacy-article-paragraph">{numbered.body}</p>}
                      </div>
                    );
                  }
                  const bylineWords = block.trim().split(/\s+/);
                  const isByline =
                    flowIndex === 0 &&
                    blockIndex === 0 &&
                    bylineWords.length >= 2 &&
                    bylineWords.length <= 4 &&
                    block.length < 60 &&
                    !/[.!?]$/.test(block) &&
                    !/\b(latest|from|the|stories|shows|watch|headquarters|results)\b/i.test(block);
                  const isSubhead =
                    blockIndex === 0 &&
                    (flowIndex > 0 || page.path === "/stories") &&
                    block.length < 120 &&
                    !/[.!?]$/.test(block);
                  if (isByline) {
                    return <p className="legacy-inline-byline" key={`${block}-${blockIndex}`}>By {block}</p>;
                  }
                  if (page.path === "/home/drought-watch" && block.startsWith("Drought Got You Down?")) {
                    return (
                      <p className="legacy-pathway-link" key={block}>
                        <Link href="/home/truth">{block} →</Link>
                      </p>
                    );
                  }
                  if (block.startsWith("NOTHING IN THE SITE CONSTITUTES")) {
                    return <p className="legal-microcopy" key={`${block}-${blockIndex}`}>{block}</p>;
                  }
                  if (page.path === "/home/truth" && /taras batyr/i.test(block)) {
                    return (
                      <div className="taras-inline-file" key={`${block}-${blockIndex}`}>
                        <p className="legacy-article-paragraph">{block}</p>
                        <Link href="/taras-batyr">Open the Taras batyr artifact file →</Link>
                      </div>
                    );
                  }
                  if (isSubhead) return <h2 key={block}>{block}</h2>;
                  return (
                    <p className="legacy-article-paragraph" key={`${block}-${blockIndex}`}>
                      {block}
                    </p>
                  );
                })}
                {flow.embeds.length > 0 && (
                  <div className="legacy-inline-embeds">
                    {flow.embeds.map((embed, embedIndex) => (
                      <LegacyEmbedPlayer embed={embed} key={`${embed.src}-${embedIndex}`} />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </article>
          <aside className="legacy-report-rail">
            <span>SSR Original</span>
            <p>This report has been preserved in full from Sacramento Special Report&apos;s original newsroom.</p>
          </aside>
        </div>
        )}

        {related.length > 0 && (
          <section className="legacy-related">
            <div className="section-heading">
              <h2>Continue Reading</h2>
              <span>More from this desk</span>
            </div>
            <div className="legacy-related-grid">
              {related.map((item) => (
                <Link href={item.path} key={item.path}>
                  {item.images[0] && <img src={item.images[0].src} alt="" loading="lazy" />}
                  <span>{getLegacySection(item)}</span>
                  <strong>{getLegacyTitle(item)}</strong>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
