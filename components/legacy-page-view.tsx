import Link from "next/link";
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

export function LegacyPageView({ page }: { page: LegacyContentPage }) {
  const title = getLegacyTitle(page);
  const section = getLegacySection(page);
  const flowSections = getLegacyFlowSections(page);
  const related = getRelatedLegacyPages(page);

  return (
    <>
      <header className="article-masthead">
        <Link href="/">
          <img src={`${assetBase}/legacy/ssr-logo.png`} alt="" />
          <span>Sacramento Special Report</span>
        </Link>
      </header>
      <main className="legacy-report-page">
        <Link className="article-back" href="/">← Back to the front page</Link>
        <p className="kicker">{section}</p>
        <h1>{title}</h1>
        <p className="legacy-standfirst">{getLegacySummary(page)}</p>
        <div className="legacy-provenance">
          <strong>SSR Newsroom</strong>
          <span>Original report</span>
        </div>

        {page.path === "/shows" ? (
          <ShowsProgramming page={page} />
        ) : (
        <div className="legacy-report-grid">
          <article className="legacy-report-copy">
            {flowSections.map((flow, flowIndex) => (
              <section className="legacy-flow-section" key={`${page.path}-${flow.index}`}>
                {flow.images.length > 0 && (
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
                )}
                {flow.blocks.map((block, blockIndex) => {
                  const isSubhead =
                    blockIndex === 0 &&
                    flowIndex > 0 &&
                    block.length < 100 &&
                    !/[.!?]$/.test(block);
                  return isSubhead ? <h2 key={block}>{block}</h2> : <p key={`${block}-${blockIndex}`}>{block}</p>;
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
    </>
  );
}
