import Link from "next/link";

export const sectionLinks = [
  ["Home", "/"],
  ["Latest", "/stories"],
  ["Public Safety", "/sections/public-safety"],
  ["Drought Watch", "/home/drought-watch"],
  ["Arts & Culture", "/sections/arts-culture"],
  ["Hot Street", "/hot-street"],
  ["Shows", "/shows"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function SectionLinks({ className = "section-nav page-shell" }: { className?: string }) {
  return (
    <nav className={className} aria-label="Sections">
      {sectionLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
    </nav>
  );
}
