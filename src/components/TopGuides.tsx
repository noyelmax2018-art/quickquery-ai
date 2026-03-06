import Link from "next/link";
import { SEO_TOPICS } from "@/lib/seoTopics";

const TOP_SLUGS = [
  "best-web-hosting-for-beginners",
  "how-to-start-a-website",
  "domain-vs-hosting",
  "how-to-buy-a-domain-name",
  "best-hosting-for-wordpress",
  "how-to-install-wordpress",
] as const;

export default function TopGuides() {
  const top = TOP_SLUGS.map((slug) => SEO_TOPICS.find((t) => t.slug === slug)).filter(
    Boolean
  ) as (typeof SEO_TOPICS)[number][];

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-neutral-200">Top guides</h2>
      <div className="grid gap-2 md:grid-cols-2">
        {top.map((t) => (
          <Link
            key={t.slug}
            className="rounded-md border border-neutral-800 bg-neutral-950 p-3 hover:bg-neutral-900"
            href={`/guides/${t.slug}`}
          >
            <div className="text-sm font-medium text-neutral-100 underline underline-offset-4">
              {t.title}
            </div>
            <div className="mt-1 text-xs text-neutral-500">{t.description}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
