import Link from "next/link";
import {
  getLegacyEmbeds,
  getLegacySection,
  getLegacySummary,
  getLegacyTextSections,
  getLegacyTitle,
  getRelatedLegacyPages,
  type LegacyContentPage,
} from "@/content/legacy-content";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LegacyPageView({ page }: { page: LegacyContentPage }) {
  const title = getLegacyTitle(page);
  const section = getLegacySection(page);
  const textSections = getLegacyTextSections(page);
  const embeds = getLegacyEmbeds(page);
  const related = getRelatedLegacyPages(page);
  const images = page.images.filter((image) => image.src);
  const leadImage = images[0];
  const gallery = images.slice(1);

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

        {leadImage && (
          <figure className="legacy-hero-image">
            <img src={leadImage.src} alt={leadImage.alt || title} />
            <figcaption>From the Sacramento Special Report newsroom archive</figcaption>
          </figure>
        )}

        <div className="legacy-report-grid">
          <article className="legacy-report-copy">
            {textSections.map((blocks, sectionIndex) => (
              <section key={`${page.path}-${sectionIndex}`}>
                {blocks.map((block, blockIndex) => {
                  const isSubhead =
                    blockIndex === 0 &&
                    sectionIndex > 0 &&
                    block.length < 100 &&
                    !/[.!?]$/.test(block);
                  return isSubhead ? <h2 key={block}>{block}</h2> : <p key={`${block}-${blockIndex}`}>{block}</p>;
                })}
              </section>
            ))}
          </article>
          <aside className="legacy-report-rail">
            <span>SSR Original</span>
            <p>This report has been preserved in full from Sacramento Special Report&apos;s original newsroom.</p>
          </aside>
        </div>

        {embeds.length > 0 && (
          <section className="legacy-media-section">
            <div className="section-heading">
              <h2>Watch & Explore</h2>
              <span>Original embedded coverage</span>
            </div>
            <div className="legacy-embed-grid">
              {embeds.map((embed, index) => (
                <figure className={`legacy-embed legacy-embed-${embed.kind}`} key={`${embed.src}-${index}`}>
                  <iframe
                    src={embed.src}
                    title={embed.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <figcaption>{embed.title}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="legacy-gallery">
            {gallery.map((image, index) => (
              <figure key={`${image.src}-${index}`}>
                <img src={image.src} alt={image.alt || `${title} archival image ${index + 2}`} loading="lazy" />
              </figure>
            ))}
          </section>
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
