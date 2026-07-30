import Link from "next/link";
import { SectionLinks, sectionLinks } from "@/components/section-links";
import { getLegacyPage, getLegacySection, getLegacySummary, getLegacyTitle } from "@/content/legacy-content";
import { featuredStories, latestStories } from "@/content/legacy-pages";

const dateLabel = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Los_Angeles",
}).format(new Date());
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const frontPagePaths = [
  "/stories/14-brutal-truths-about-sacramento-ai",
  "/stories/governors-statement-sheds-light-on-ca",
  "/stories/will-downtown-be-getting-a-facelift",
  "/stories/new-anthropological-discovery",
  "/stories/flea-market-infested-with-ticks-discrepancy-confuses-city-hall",
  "/stories/alligators-appearing-in-the-american-river",
  "/stories/monkeypox-a-monkeys-perspective",
  "/stories/the-cost-of-driving",
  "/stories/hydrogen-found-in-city-water-supply",
  "/stories/cashmere-king-future-unsure",
  "/stories/golden-state-no-more",
  "/stories/forest-monkies",
].map(getLegacyPage).filter((page) => page !== undefined);

function StoryMeta({ byline, minutes }: { byline: string; minutes: string }) {
  return (
    <p className="story-meta">
      <span>By {byline}</span>
      <span>{minutes} min read</span>
    </p>
  );
}

export default function Home() {
  const [lead, secondary, tertiary] = featuredStories;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="utility-bar">
        <div className="page-shell utility-inner">
          <span>{dateLabel}</span>
          <span className="utility-edition">Sacramento Edition</span>
          <span className="weather"><i />89° Clear</span>
        </div>
      </div>

      <header className="site-header">
        <div className="page-shell masthead">
          <details className="mobile-menu">
            <summary aria-label="Open sections menu"><span /><span /><span /></summary>
            <nav aria-label="Mobile navigation">
              {sectionLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            </nav>
          </details>
          <div className="masthead-date">
            <strong>{dateLabel.split(",")[0]}</strong>
            <span>You Heard It Here First</span>
          </div>
          <Link className="brand" href="/" aria-label="Sacramento Special Report home">
            <img src={`${assetBase}/legacy/ssr-logo.png`} alt="" />
            <span>Sacramento<b>Special Report</b></span>
          </Link>
          <div className="header-actions">
            <Link className="live-button" href="/live"><span />Live</Link>
            <Link className="archive-button" href="/stories">Stories</Link>
          </div>
        </div>
        <SectionLinks />
      </header>

      <main id="main" className="page-shell">
        <section className="breaking-strip" aria-label="Developing coverage">
          <span>Developing</span>
          <p>Sacramento heat watch remains in effect as officials monitor river conditions.</p>
          <Link href="/home/drought-watch">Follow updates →</Link>
        </section>

        <section className="lead-grid" aria-label="Top stories">
          <article className="lead-story">
            <Link className="image-link lead-image" href={`/story/${lead.slug}`}>
              <img src={`${assetBase}/legacy/tower-bridge.jpg`} alt="Sacramento Tower Bridge at dusk" />
              <span className="photo-credit">SSR Archive</span>
            </Link>
            <div className="lead-copy">
              <p className="kicker">Sacramento</p>
              <h1><Link href={`/story/${lead.slug}`}>{lead.title}</Link></h1>
              <p className="dek">{lead.summary}</p>
              <StoryMeta byline={lead.byline} minutes={lead.minutes} />
            </div>
          </article>

          <aside className="side-column">
            <article className="side-story">
              <p className="kicker">Environment</p>
              <h2><Link href={`/story/${secondary.slug}`}>{secondary.title}</Link></h2>
              <p>{secondary.summary}</p>
              <StoryMeta byline={secondary.byline} minutes={secondary.minutes} />
            </article>
            <article className="side-story with-thumb">
              <div>
                <p className="kicker">Community</p>
                <h2><Link href={`/story/${tertiary.slug}`}>{tertiary.title}</Link></h2>
                <StoryMeta byline={tertiary.byline} minutes={tertiary.minutes} />
              </div>
              <Link href={`/story/${tertiary.slug}`}>
                <img src={`${assetBase}/legacy/volunteers.jpg`} alt="Volunteers working outdoors" />
              </Link>
            </article>
            <article className="brief-story">
              <span>01</span>
              <div>
                <p className="kicker">Exclusive</p>
                <h3><Link href="/stories/the-guru-of-news-interview">Inside the underground office of the Guru of News</Link></h3>
              </div>
            </article>
          </aside>
        </section>

        <section className="quick-links" aria-label="Special coverage">
          <Link href="/home/drought-watch"><span>Special Report</span><strong>Drought Watch</strong><small>Tracking California&apos;s water crisis →</small></Link>
          <Link href="/home/safety-quiz"><span>Interactive</span><strong>Public Safety Quiz</strong><small>Put your street knowledge to the test →</small></Link>
          <Link href="/sections/arts-culture"><span>After Dark</span><strong>Arts &amp; Culture</strong><small>Conventions, artists and stranger things →</small></Link>
          <Link href="/hot-street"><span>Markets</span><strong>Hot Street</strong><small>Finance, crypto and crime →</small></Link>
        </section>

        <section className="latest-section">
          <div className="section-heading">
            <h2>Latest From the Streets</h2>
            <Link href="/stories">View all stories →</Link>
          </div>
          <div className="latest-grid">
            {latestStories.map((story, index) => (
              <article className="latest-card" key={story.slug}>
                {index === 0 && <img src={`${assetBase}/legacy/survey-chart.png`} alt="Public survey data visualization" />}
                {index === 1 && <img src={`${assetBase}/legacy/portrait.jpg`} alt="Sacramento resident portrait" />}
                {index === 2 && <div className="weather-card"><img src={`${assetBase}/legacy/weather.gif`} alt="Northern California weather radar" /></div>}
                <p className="kicker">{story.section}</p>
                <h3><Link href={`/story/${story.slug}`}>{story.title}</Link></h3>
                <p>{story.summary}</p>
                <StoryMeta byline={story.byline} minutes={story.minutes} />
              </article>
            ))}
          </div>
        </section>

        <section className="front-page-depth">
          <div className="section-heading">
            <h2>More From Sacramento</h2>
            <Link href="/stories">Descend into the newsroom →</Link>
          </div>
          <div className="front-page-story-grid">
            {frontPagePaths.map((page) => (
              <article className="front-page-story-card" key={page.path}>
                {page.images[0] && <Link href={page.path}><img src={page.images[0].src} alt="" loading="lazy" /></Link>}
                <p className="kicker">{getLegacySection(page)}</p>
                <h3><Link href={page.path}>{getLegacyTitle(page)}</Link></h3>
                <p>{getLegacySummary(page)}</p>
                <Link className="story-button" href={page.path}>Read report →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="maze-section">
          <div>
            <p className="kicker">Choose Your Route</p>
            <h2>The SSR news labyrinth</h2>
            <p>Every corridor leads somewhere. Most lead back.</p>
          </div>
          <div className="maze-links">
            <Link href="/taras-batyr">Find Taras batyr</Link>
            <Link href="/home/safety-quiz">Take the quiz</Link>
            <Link href="/stories/the-guru-of-news-interview">Visit the Guru</Link>
            <Link href="/stories/forest-monkies">Enter the forest</Link>
            <Link href="/sections/arts-culture">After dark</Link>
            <Link href="/hot-street/hot-street-crypto">Follow the money</Link>
            <Link href="/about/headquarters">Headquarters</Link>
            <Link href="/shows">Turn on SSR</Link>
            <Link href="/home/drought-watch">Return to Drought Watch</Link>
          </div>
        </section>

        <section className="newsletter">
          <div><p className="kicker">The Morning Special</p><h2>Sacramento, explained before your first cup of coffee.</h2></div>
          <div><p>A concise briefing of the stories, people and peculiarities shaping the capital.</p><Link href="/stories">Browse today&apos;s edition</Link></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-grid">
          <div className="footer-brand"><img src={`${assetBase}/legacy/ssr-logo.png`} alt="" /><p>Sacramento Special Report</p><span>You Heard It Here First.</span></div>
          <div><h2>Sections</h2><Link href="/home/drought-watch">Drought Watch</Link><Link href="/sections/public-safety">Public Safety</Link><Link href="/sections/arts-culture">Arts & Culture</Link><Link href="/hot-street">Hot Street</Link></div>
          <div><h2>Company</h2><Link href="/about">About SSR</Link><Link href="/about/the-team">The Team</Link><Link href="/about/headquarters">Headquarters</Link><Link href="/contact">Contact</Link></div>
          <div className="footer-contact"><h2>Newsroom</h2><p>1307 N Street, Suite 231</p><p>Sacramento, CA 95814</p><p>916-259-3843</p></div>
        </div>
        <div className="page-shell copyright">
          <span>© 2026 Sacramento Special Report <Link className="archive-easter-egg" href="/archive" aria-label="Newsroom index">·</Link></span>
          <span>An Olio Media Holdings publication</span>
        </div>
      </footer>
    </>
  );
}
