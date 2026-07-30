import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyPageView } from "@/components/legacy-page-view";
import {
  getLegacyPage,
  getLegacySummary,
  getLegacyTitle,
  legacyContentPages,
} from "@/content/legacy-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return legacyContentPages
    .filter((page) => page.path !== "/home")
    .map((page) => ({ legacy: page.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ legacy: string[] }>;
}): Promise<Metadata> {
  const { legacy } = await params;
  const page = getLegacyPage(`/${legacy.join("/")}`);
  if (!page) return {};
  return { title: getLegacyTitle(page), description: getLegacySummary(page) };
}

export default async function LegacyRoute({
  params,
}: {
  params: Promise<{ legacy: string[] }>;
}) {
  const { legacy } = await params;
  const page = getLegacyPage(`/${legacy.join("/")}`);
  if (!page) notFound();
  return <LegacyPageView page={page} />;
}
