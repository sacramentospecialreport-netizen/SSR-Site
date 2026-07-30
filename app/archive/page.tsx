import type { Metadata } from "next";
import Link from "next/link";
import { legacyPages } from "@/content/legacy-pages";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Archive",
  description: "A private newsroom index of SSR's original reports.",
};

const categoryNames: Record<string, string> = {
  "front-page": "Front Page", safety: "Public Safety", drought: "Drought Watch",
  opinion: "Opinion", community: "Community", stories: "Stories",
  culture: "Arts & Culture", shows: "Shows", "hot-street": "Hot Street",
  about: "About SSR", live: "Live",
};

export default function ArchivePage() {
  const categories = [...new Set(legacyPages.map((page) => page[2]))];
  return (
    <main className="archive-page">
      <header className="archive-header">
        <Link href="/" className="archive-home">← Back to the front page</Link>
        <img src={`${assetBase}/legacy/ssr-logo.png`} alt="" />
        <p>Sacramento Special Report</p>
        <h1>The SSR Archive</h1>
        <span>Private newsroom index · original SSR reports</span>
      </header>
      <div className="archive-list">
        {categories.map((category) => (
          <section id={category} key={category}>
            <h2>{categoryNames[category]}</h2>
            <ol>
              {legacyPages.filter((page) => page[2] === category).map(([title, path]) => (
                <li key={path}>
                  <div><h3>{title}</h3><p>{path}</p></div>
                  <Link href={path === "/home" ? "/" : path}>Open report →</Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <footer className="archive-footer">
        <Link href="/">Sacramento Special Report</Link>
        <span>{legacyPages.length} original pages preserved</span>
      </footer>
    </main>
  );
}
