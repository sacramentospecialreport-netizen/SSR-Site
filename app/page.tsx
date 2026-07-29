import Link from "next/link";
import { featuredStories, latestStories } from "@/content/legacy-pages";

const dateLabel = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Los_Angeles",
}).format(new Date());

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
              <Link href="/">Home</Link>
              <Link href="/archive">Latest</Link>
              <Link href="/archive#drought">Drought Watch</Link>
              <Link href="/archive#safety">Public Safety</Link>
              <Link href="/archive#culture">Arts & Culture</Link>
              <Link href="/archive#about">About</Link>
            </nav>
          </details>
          <div className="masthead-date">
            <strong>{dateLabel.split(",")[0]}</strong>
            <span>You heard it here first</span>
          </div>
          <Link className="brand" href="/" aria-label="Sacramento Special Report home">
            <img src="/legacy/ssr-logo.png" alt="" />
            <span>Sacramento<b>Special Report</b></span>
          </Link>
          <div className="header-actions">
            <Link className="live-button" href="/archive#live"><span />Live</Link>
            <Link className="archive-button" href="/archive">Archive</Link>
          </div>
        </div>
        <nav className="section-nav page-shell" aria-label="Sections">
          <Link href="/">Home</Link><Link href="/archive">Latest</Link>
          <Link href="/archive#drought">Drought Watch</Link>
          <Link href="/archive#safety">Public Safety</Link>
          <Link href="/archive#hot-street">Hot Street</Link>
          <Link href="/archive#culture">Arts & Culture</Link>
          <Link href="/archive#shows">Shows</Link><Link href="/archive#about">About</Link>
        </nav>
      </header>

      <main id="main" className="page-shell">
        <section className="breaking-strip" aria-label="Developing coverage">
          <span>Developing</span>
          <p>Sacramento heat watch remains in effect as officials monitor river conditions.</p>
          <Link href="/archive#drought">Follow updates →</Link>
        </section>

        <section className="lead-grid" aria-label="Top stories">
          <article className="lead-story">
            <Link className="image-link lead-image" href={`/story/${lead.slug}`}>
              <img src="/legacy/tower-bridge.jpg" alt="Sacramento Tower Bridge at dusk" />
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
                <img src="/legacy/volunteers.jpg" alt="Volunteers working outdoors" />
              </Link>
            </article>
            <article className="brief-story">
              <span>01</span>
              <div>
                <p className="kicker">Exclusive</p>
                <h3><Link href="/story/guru-of-news">Inside the underground office of the Guru of News</Link></h3>
              </div>
            </article>
          </aside>
        </section>

        <section className="quick-links" aria-label="Special coverage">
          <Link href="/archive#drought"><span>Special Report</span><strong>Drought Watch</strong><small>Tracking California&apos;s water crisis →</small></Link>
          <Link href="/archive#safety"><span>Interactive</span><strong>Public Safety Survey</strong><small>See what Sacramento told us →</small></Link>
          <Link href="/archive#hot-street"><span>Markets</span><strong>Hot Street</strong><small>Finance, crypto and crime →</small></Link>
        </section>

        <section className="latest-section">
          <div className="section-heading">
            <h2>Latest From the Streets</h2>
            <Link href="/archive">View the complete archive →</Link>
          </div>
          <div className="latest-grid">
            {latestStories.map((story, index) => (
              <article className="latest-card" key={story.slug}>
                {index === 0 && <img src="/legacy/survey-chart.png" alt="Public survey data visualization" />}
                {index === 1 && <img src="/legacy/portrait.jpg" alt="Sacramento resident portrait" />}
                {index === 2 && <div className="weather-card"><img src="/legacy/weather.gif" alt="Northern California weather radar" /></div>}
                <p className="kicker">{story.section}</p>
                <h3><Link href={`/story/${story.slug}`}>{story.title}</Link></h3>
                <p>{story.summary}</p>
                <StoryMeta byline={story.byline} minutes={story.minutes} />
              </article>
            ))}
          </div>
        </section>

        <section className="newsletter">
          <div><p className="kicker">The Morning Special</p><h2>Sacramento, explained before your first cup of coffee.</h2></div>
          <div><p>A concise briefing of the stories, people and peculiarities shaping the capital.</p><Link href="/archive">Browse today&apos;s edition</Link></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-grid">
          <div className="footer-brand"><img src="/legacy/ssr-logo.png" alt="" /><p>Sacramento Special Report</p><span>You heard it here first.</span></div>
          <div><h2>Sections</h2><Link href="/archive#drought">Drought Watch</Link><Link href="/archive#safety">Public Safety</Link><Link href="/archive#culture">Arts & Culture</Link><Link href="/archive#hot-street">Hot Street</Link></div>
          <div><h2>Company</h2><Link href="/archive#about">About SSR</Link><Link href="/archive#about">The Team</Link><Link href="/archive#about">Headquarters</Link><a href="mailto:press@sacramentospecialreport.org">Contact</a></div>
          <div className="footer-contact"><h2>Newsroom</h2><p>1307 N Street, Suite 231</p><p>Sacramento, CA 95814</p><p>916-259-3843</p></div>
        </div>
        <div className="page-shell copyright"><span>© 2026 Sacramento Special Report</span><span>An Olio Media Holdings publication</span></div>
      </footer>
    </>
  );
}
