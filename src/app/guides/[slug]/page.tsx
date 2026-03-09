import Link from "next/link";
import type { Metadata } from "next";
import Monetization from "@/components/Monetization";
import Shell from "@/components/Shell";
import { SEO_TOPICS } from "@/lib/seoTopics";

export async function generateStaticParams() {
  return SEO_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = SEO_TOPICS.find((t) => t.slug === slug);
  if (!topic) return { title: "Guide" };
  return {
    title: `${topic.title} — QuickQuery AI`,
    description: topic.description,
    keywords: topic.keywords,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = SEO_TOPICS.find((t) => t.slug === slug);

  if (!topic) {
    return (
      <Shell title="Not found" subtitle="This guide doesn’t exist.">
        <Link className="underline" href="/">
          Go home
        </Link>
      </Shell>
    );
  }

  const related = SEO_TOPICS.filter((t) => t.slug !== topic.slug).slice(0, 8);

  return (
    <Shell title={topic.title} subtitle={topic.description}>
      <div className="space-y-8">
        <section className="rounded-xl border border-neutral-900 bg-neutral-950/40 p-4 md:p-6">
          <h2 className="text-sm font-medium text-neutral-200">Quick answer</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-300">
            <li>Pick a clear goal for the site (blog, business, store).</li>
            <li>Choose a domain you can say out loud and remember.</li>
            <li>Use reliable hosting, enable SSL, and keep backups.</li>
            <li>Publish helpful pages and link them internally.</li>
          </ul>
        </section>

        <Monetization />

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-neutral-200">Related guides</h2>
          <ul className="grid gap-2 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="rounded-xl border border-neutral-900 bg-neutral-950/40 p-4">
                <Link className="text-sm font-medium text-neutral-100 underline underline-offset-4" href={`/guides/${r.slug}`}>
                  {r.title}
                </Link>
                <div className="mt-1 text-xs text-neutral-500">{r.description}</div>
              </li>
            ))}
          </ul>
        </section>

        <div className="text-xs text-neutral-500">
          Disclosure: Some links may be affiliate links. If you purchase through them, we may earn a commission at no extra cost to you.
        </div>
      </div>
    </Shell>
  );
}
