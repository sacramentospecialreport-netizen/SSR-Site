import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://sacramento-special-report.reiner-j-erik.chatgpt.site";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const socialImage = new URL(`${basePath}/og.png`, siteUrl);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sacramento Special Report",
    template: "%s | Sacramento Special Report",
  },
  description:
    "Independent news, investigations and unmistakably Sacramento stories. You Heard It Here First.",
  icons: {
    icon: `${basePath}/legacy/ssr-logo.png`,
    shortcut: `${basePath}/legacy/ssr-logo.png`,
  },
  openGraph: {
    title: "Sacramento Special Report",
    description: "You Heard It Here First.",
    type: "website",
    images: [{ url: socialImage, width: 1792, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacramento Special Report",
    description: "You Heard It Here First.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
