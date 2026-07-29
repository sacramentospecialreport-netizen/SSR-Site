import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Sacramento Special Report",
      template: "%s | Sacramento Special Report",
    },
    description:
      "Independent news, investigations and unmistakably Sacramento stories. You heard it here first.",
    icons: {
      icon: "/legacy/ssr-logo.png",
      shortcut: "/legacy/ssr-logo.png",
    },
    openGraph: {
      title: "Sacramento Special Report",
      description: "You heard it here first.",
      type: "website",
      images: [{ url: new URL("/og.png", origin), width: 1792, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sacramento Special Report",
      description: "You heard it here first.",
      images: [new URL("/og.png", origin)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
