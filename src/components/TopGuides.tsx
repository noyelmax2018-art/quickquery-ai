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

function BookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 4h9a3 3 0 0 1 3 3v13H9a3 3 0 0 0-3 3V4Z"
        stroke="rgba(168,85,247,0.85)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6 20h9"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TopGuides() {
  const top = TOP_SLUGS.map((slug) => SEO_TOPICS.find((t) => t.slug === slug)).filter(
    Boolean
  ) as (typeof SEO_TOPICS)[number][];

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <BookIcon />
        </span>
        <h2 className="text-sm font-medium text-neutral-200">Top guides</h2>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        {top.map((t) => (
          <Link
            key={t.slug}
            className="rounded-2xl p-3 backdrop-blur qq-panel qq-panel-hover"
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
