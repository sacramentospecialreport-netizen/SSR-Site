import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLinks } from "@/components/section-links";
import { artifactFiles, getArtifactFile } from "@/content/artifact-files";

export const dynamicParams = false;

export function generateStaticParams() {
  return artifactFiles.map((artifact) => ({ slug: artifact.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artifact = getArtifactFile(slug);
  if (!artifact) return {};
  return { title: `Artifact File ${artifact.number}: ${artifact.title}`, description: artifact.summary };
}

export default async function ArtifactFilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artifact = getArtifactFile(slug);
  if (!artifact) notFound();

  return (
    <div className="artifact-shell">
      <header className="section-hub-header artifact-header">
        <Link href="/" className="section-hub-brand">Sacramento Special Report</Link>
        <SectionLinks className="article-section-nav" />
      </header>
      <main className="section-hub artifact-file-page">
        <p className="kicker">SSR Artifact File {artifact.number}</p>
        <h1>{artifact.title}</h1>
        <p className="section-hub-dek">{artifact.summary}</p>

        <section className="artifact-file-meta" aria-label="Artifact classification">
          <div><span>Classification</span><strong>{artifact.classification}</strong></div>
          <div><span>Last reported location</span><strong>{artifact.location}</strong></div>
          <div><span>Current status</span><strong><i /> {artifact.status}</strong></div>
        </section>

        {artifact.videoId ? (
          <figure className="artifact-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${artifact.videoId}`}
              title={`${artifact.title} archival recording`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <figcaption>Recovered SSR transmission · Artifact File {artifact.number}</figcaption>
          </figure>
        ) : null}

        {artifact.image ? (
          <figure className="artifact-image">
            <img src={artifact.image} alt={artifact.imageAlt ?? artifact.title} />
            <figcaption>Associated visual evidence · Provenance retained from the original report</figcaption>
          </figure>
        ) : null}

        <article className="artifact-evidence">
          <span>Evidence notes</span>
          {artifact.evidence.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>

        <div className="hub-link-cloud artifact-paths">
          {artifact.related.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link href="/artifact-files">Open artifact registry</Link>
          <Link href="/">Return to the front page</Link>
        </div>
      </main>
    </div>
  );
}
