import Link from "next/link";
import { SectionLinks } from "@/components/section-links";
import { getLegacyPage, getLegacySummary } from "@/content/legacy-content";

const artsStories = [
  ["Convention Watch", "/stories/convention-watch"],
  ["Local Artist Spotlight", "/stories/local-artist-spotlight"],
  ["Upcoming Events", "/stories/local-artist-spotlight/upcoming-events"],
  ["Featured Artists", "/stories/local-artist-spotlight/featured-artists"],
] as const;

export default function ArtsCulturePage() {
  return (
    <div className="arts-section-shell">
      <header className="section-hub-header arts-article-masthead">
        <Link href="/" className="section-hub-brand">Sacramento Special Report</Link>
        <SectionLinks className="article-section-nav" />
      </header>
      <main className="section-hub arts-culture-hub">
        <p className="kicker">Arts &amp; Culture</p>
        <h1>The stranger side of Sacramento&apos;s creative life.</h1>
        <p className="section-hub-dek">Convention floors, working artists, strange artifacts and whatever is happening after dark.</p>
        <div className="arts-story-grid">
          {artsStories.map(([title, path], index) => {
            const page = getLegacyPage(path);
            const image = page?.images[0];
            return (
              <Link href={path} className={index === 0 ? "arts-story-card arts-story-lead" : "arts-story-card"} key={path}>
                {image && <img src={image.src} alt="" />}
                <span>{index === 0 ? "Convention Desk" : "Culture Desk"}</span>
                <h2>{title}</h2>
                {page && <p>{getLegacySummary(page)}</p>}
                <strong>Enter →</strong>
              </Link>
            );
          })}
        </div>
        <div className="hub-link-cloud arts-link-cloud">
          <Link href="/shows">SSR Shows</Link>
          <Link href="/stories/gamers-global-warming-ai">Gamers &amp; Global Warming</Link>
          <Link href="/stories/forest-monkies">Monkies for the Forest</Link>
          <Link href="/stories/the-guru-of-news-interview">The Guru of News</Link>
          <Link href="/home/truth">The Truth</Link>
        </div>
      </main>
    </div>
  );
}
