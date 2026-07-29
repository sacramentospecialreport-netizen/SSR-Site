import type { Metadata } from "next";
import Link from "next/link";
import { allStories } from "@/content/legacy-pages";

export function generateStaticParams() {
  return allStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = allStories.find((item) => item.slug === slug);
  return { title: story?.title ?? "Story", description: story?.summary };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = allStories.find((item) => item.slug === slug);
  if (!story) return <main className="article-page"><Link href="/">← Front page</Link><h1>Story not found</h1></main>;

  const body = story.body ?? [
    story.summary,
    "This story has been recovered from the Sacramento Special Report archive and is being prepared for publication in the new edition.",
    "The complete original reporting, media and attribution will appear here as the migration continues.",
  ];

  return (
    <>
      <header className="article-masthead">
        <Link href="/"><img src="/legacy/ssr-logo.png" alt="" /><span>Sacramento Special Report</span></Link>
      </header>
      <main className="article-page">
        <Link className="article-back" href="/">← Back to the front page</Link>
        <p className="kicker">{story.section}</p>
        <h1>{story.title}</h1>
        <p className="article-dek">{story.summary}</p>
        <div className="article-byline"><strong>By {story.byline}</strong><span>{story.minutes} min read</span></div>
        <div className="article-rule" />
        <article>{body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>
        <aside className="migration-note">
          <strong>From the archive</strong>
          <p>This page is part of SSR&apos;s active migration from Google Sites. Layout and core story information are live; the full historical article is next in the editorial restoration queue.</p>
          <Link href="/archive">Explore the complete archive →</Link>
        </aside>
      </main>
    </>
  );
}
