import Link from "next/link";
import { SectionLinks } from "@/components/section-links";

export default function TarasBatyrPage() {
  return (
    <div className="taras-shell">
      <header className="section-hub-header taras-header">
        <Link href="/" className="section-hub-brand">Sacramento Special Report</Link>
        <SectionLinks className="article-section-nav" />
      </header>
      <main className="section-hub taras-page">
        <p className="kicker">SSR Artifact File 001</p>
        <h1>Taras batyr</h1>
        <p className="section-hub-dek">
          The true object with which we can taste the truth.
        </p>
        <article className="taras-dossier">
          <span>Last reported location</span>
          <p>
            The original SSR record places Taras batyr in a small box in Eastern Europe,
            very near the Jewish ghetto of Kiev.
          </p>
          <div className="taras-status"><i /> Location unverified</div>
        </article>
        <div className="hub-link-cloud taras-paths">
          <Link href="/artifact-files">Open artifact registry</Link>
          <Link href="/home/truth">Read the complete Truth file</Link>
          <Link href="/home/drought-watch">Return to Drought Watch</Link>
          <Link href="/stories/the-guru-of-news-interview">Consult the Guru of News</Link>
          <Link href="/">Escape to the front page</Link>
        </div>
      </main>
    </div>
  );
}
