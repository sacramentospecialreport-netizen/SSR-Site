export type ArtifactFile = {
  slug: string;
  number: string;
  title: string;
  classification: string;
  status: string;
  location: string;
  summary: string;
  evidence: string[];
  videoId?: string;
  image?: string;
  imageAlt?: string;
  related: { label: string; href: string }[];
};

export const artifactFiles: ArtifactFile[] = [
  {
    slug: "reno-special-report",
    number: "037",
    title: "Reno Special Report",
    classification: "Recovered broadcast",
    status: "Signal recovered",
    location: "Reno, Nevada / archival relay",
    summary:
      "A parallel regional transmission recovered from the Sacramento Special Report video archive.",
    evidence: [
      "The recording identifies itself as Reno Special Report, suggesting that the SSR signal once traveled beyond Sacramento's municipal boundary.",
      "The two-minute, twenty-four-second transmission survives as Archival File #37. Its relationship to the present newsroom remains under review.",
    ],
    videoId: "6i2j5UovRho",
    related: [
      { label: "Enter the live desk", href: "/live" },
      { label: "Review all SSR programs", href: "/shows" },
    ],
  },
  {
    slug: "the-4chan-alien",
    number: "004",
    title: "The 4chan Alien",
    classification: "Extraterrestrial media",
    status: "Signal received",
    location: "Unknown / imageboard relay",
    summary:
      "A recovered SSR transmission concerning an alien, an imageboard and the limits of ordinary verification.",
    evidence: [
      "The newsroom received the material through an online relay whose provenance could not be independently established.",
      "Its inclusion in this registry indicates significance, not authentication. Viewers should exercise the usual SSR precautions.",
    ],
    videoId: "WKjGqyQPjFk",
    related: [
      { label: "Examine the Truth file", href: "/home/truth" },
      { label: "Open anthropological discovery", href: "/stories/new-anthropological-discovery" },
    ],
  },
  {
    slug: "sacramento-weather-machine",
    number: "014",
    title: "Sacramento Weather Machine",
    classification: "Municipal atmosphere device",
    status: "Operational status disputed",
    location: "Sacramento airspace",
    summary:
      "A city-scale atmospheric intervention documented by the SSR field desk.",
    evidence: [
      "The recovered report describes machinery intended to alter weather across an urban area.",
      "No public agency has provided SSR with a satisfactory accounting of the device's ownership, controls or precipitation policy.",
    ],
    videoId: "AGK5NJvYFE0",
    related: [
      { label: "Proceed to Drought Watch", href: "/home/drought-watch" },
      { label: "Check the live weather desk", href: "/" },
    ],
  },
  {
    slug: "great-slave-lake-skull",
    number: "023",
    title: "Great Slave Lake Skull Fragment",
    classification: "Anthropological evidence",
    status: "Provenance contested",
    location: "Southern shore of Great Slave Lake",
    summary:
      "A fragment associated with SSR's investigation into a possible North American hominin discovery.",
    evidence: [
      "The original field report places the discovery near Great Slave Lake and describes portions of a hominin skull.",
      "The material is preserved here as an artifact of the report. Its age, origin and scientific standing remain contested.",
    ],
    image: "/legacy-import/506c097fa27097b9.jpg",
    imageAlt: "Recovered image associated with the Great Slave Lake skull report",
    related: [
      { label: "Read the original discovery report", href: "/stories/new-anthropological-discovery" },
      { label: "Consult the Guru of News", href: "/stories/the-guru-of-news-interview" },
    ],
  },
];

export const artifactRegistry = [
  {
    number: "001",
    title: "Taras batyr",
    classification: "Restricted object",
    status: "Location unverified",
    href: "/taras-batyr",
  },
  ...artifactFiles.map((artifact) => ({
    number: artifact.number,
    title: artifact.title,
    classification: artifact.classification,
    status: artifact.status,
    href: `/artifact-files/${artifact.slug}`,
  })),
];

export function getArtifactFile(slug: string) {
  return artifactFiles.find((artifact) => artifact.slug === slug);
}
