import type { MetadataRoute } from "next";
import { SEO_TOPICS } from "@/lib/seoTopics";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://quickquery-ai.pages.dev").replace(
    /\/$/,
    ""
  );
  const now = new Date();

  const coreRoutes = ["/", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.6,
  }));

  const guideRoutes = SEO_TOPICS.map((t) => ({
    url: `${siteUrl}/guides/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...coreRoutes, ...guideRoutes];
}
