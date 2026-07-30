import Link from "next/link";
import { SectionLinks } from "@/components/section-links";

export default function PublicSafetyPage() {
  return (
    <>
      <header className="section-hub-header">
        <Link href="/" className="section-hub-brand">Sacramento Special Report</Link>
        <SectionLinks className="article-section-nav" />
      </header>
      <main className="section-hub public-safety-hub">
        <p className="kicker">Public Safety Desk</p>
        <h1>Sirens, surveys and the streets of Sacramento.</h1>
        <p className="section-hub-dek">Take the quiz, inspect the results, or follow a less predictable route through SSR&apos;s public-safety reporting.</p>
        <div className="section-hub-feature-grid">
          <Link className="section-hub-feature safety-quiz-feature" href="/home/safety-quiz">
            <span>Interactive</span><h2>Take the Public Safety Quiz</h2>
            <p>What is the safest color? How large should a flashlight be? The official SSR questionnaire awaits.</p>
            <strong>Begin the quiz →</strong>
          </Link>
          <Link className="section-hub-feature" href="/home/public-safety-survey-results">
            <span>Data Desk</span><h2>Public Safety Survey Results</h2>
            <p>See what Sacramento told us about police, parking, language and street kitties.</p>
            <strong>Study the results →</strong>
          </Link>
        </div>
        <div className="hub-link-cloud" aria-label="Related public safety paths">
          <Link href="/hot-street/hot-street-crime">Community Crime Map</Link>
          <Link href="/stories/directed-energy-and-you">Directed Energy and You</Link>
          <Link href="/stories/alligators-appearing-in-the-american-river">River Alligator Watch</Link>
          <Link href="/stories/flea-market-infested-with-ticks-discrepancy-confuses-city-hall">Tick Discrepancy</Link>
          <Link href="/home/truth">Emergency Spiritual Guidance</Link>
        </div>
      </main>
    </>
  );
}
