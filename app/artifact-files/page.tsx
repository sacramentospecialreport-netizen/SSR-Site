import type { Metadata } from "next";
import Link from "next/link";
import { SectionLinks } from "@/components/section-links";
import { artifactRegistry } from "@/content/artifact-files";

export const metadata: Metadata = {
  title: "Artifact Registry",
  description: "Recovered objects, signals and disputed evidence from the SSR archive.",
};

export default function ArtifactRegistryPage() {
  return (
    <div className="artifact-shell">
      <header className="section-hub-header artifact-header">
        <Link href="/" className="section-hub-brand">Sacramento Special Report</Link>
        <SectionLinks className="article-section-nav" />
      </header>
      <main className="section-hub artifact-registry-page">
        <p className="kicker">Restricted newsroom index</p>
        <h1>Artifact Registry</h1>
        <p className="section-hub-dek">
          Recovered objects, interrupted signals and evidence whose ordinary filing
          categories proved inadequate.
        </p>
        <div className="artifact-registry-grid">
          {artifactRegistry.map((artifact) => (
            <Link href={artifact.href} className="artifact-registry-card" key={artifact.number}>
              <span>File {artifact.number}</span>
              <h2>{artifact.title}</h2>
              <p>{artifact.classification}</p>
              <small><i /> {artifact.status}</small>
            </Link>
          ))}
        </div>
        <div className="hub-link-cloud artifact-paths">
          <Link href="/home/truth">Truth file</Link>
          <Link href="/stories">Street archive</Link>
          <Link href="/">Return to the front page</Link>
        </div>
      </main>
    </div>
  );
}
