import type { Metadata } from "next";
import Link from "next/link";
import { LegacyPageView } from "@/components/legacy-page-view";
import { getLegacyPage } from "@/content/legacy-content";
import { allStories } from "@/content/legacy-pages";

const legacyStoryPaths: Record<string, string> = {
  "hawk-tuah-patio": "/stories/14-brutal-truths-about-sacramento-ai",
  "fish-populations-rebound": "/stories/governors-statement-sheds-light-on-ca",
  "sacramento-volunteers": "/stories/will-downtown-be-getting-a-facelift",
  "public-safety-results": "/home/public-safety-survey-results",
  "guru-of-news": "/stories/the-guru-of-news-interview",
  "drought-watch": "/home/drought-watch",
};

export const dynamicParams = false;

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
  const legacyPage = getLegacyPage(legacyStoryPaths[slug]);
  if (!legacyPage) return <main className="article-page"><Link href="/">← Front page</Link><h1>Story unavailable</h1></main>;
  return <LegacyPageView page={legacyPage} />;
}
