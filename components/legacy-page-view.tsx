import Link from "next/link";
import {
  getLegacyFlowSections,
  getLegacySection,
  getLegacySummary,
  getLegacyTitle,
  getRelatedLegacyPages,
  type LegacyContentPage,
} from "@/content/legacy-content";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
                      <figure className={`legacy-embed legacy-embed-${embed.kind}`} key={`${embed.src}-${embedIndex}`}>
                        <iframe
                          src={embed.src}
                          title={embed.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                        {embed.title && <figcaption>{embed.title}</figcaption>}
                      </figure>
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
