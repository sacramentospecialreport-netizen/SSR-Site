import Link from "next/link";
import { SectionLinks } from "@/components/section-links";

export default function ContactPage() {
  return (
    <>
      <header className="section-hub-header">
        <Link href="/" className="section-hub-brand">Sacramento Special Report</Link>
        <SectionLinks className="article-section-nav" />
      </header>
      <main className="section-hub contact-page">
        <p className="kicker">Newsroom</p>
        <h1>Contact Sacramento Special Report</h1>
        <p className="section-hub-dek">Send tips, corrections, invitations and sightings to the SSR newsroom.</p>
        <div className="contact-grid">
          <section><span>Email</span><h2>press@sacramentospecialreport.org</h2><p>Press inquiries and confidential tips.</p></section>
          <section><span>Telephone</span><h2>916-259-3843</h2><p>Newsroom line.</p></section>
          <section><span>Mail &amp; Visitors</span><h2>1307 N Street, Suite 231<br />Sacramento, CA 95814</h2><p>Please arrange visits in advance.</p></section>
          <section><span>Publisher</span><h2>Olio Media Holdings</h2><p>Sacramento Special Report is an Olio Media Holdings publication.</p></section>
        </div>
        <Link className="contact-return" href="/">Return to the front page →</Link>
      </main>
    </>
  );
}
