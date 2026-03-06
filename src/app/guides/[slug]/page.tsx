import Link from "next/link";
import type { Metadata } from "next";
import { SEO_TOPICS } from "@/lib/seoTopics";
import Monetization from "@/components/Monetization";

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
      <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
        <div className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-2xl font-semibold">Not found</h1>
          <Link className="underline" href="/">Go home</Link>
        </div>
      </main>
    );
  }

  const related = SEO_TOPICS.filter((t) => t.slug !== topic.slug).slice(0, 8);

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{topic.title}</h1>
          <p className="text-sm text-neutral-300">{topic.description}</p>
        </header>

        <section className="space-y-3 text-sm text-neutral-200">
          <h2 className="text-base font-semibold text-neutral-100">Quick answer</h2>
          <ul className="list-disc space-y-2 pl-5 text-neutral-300">
            <li>Pick a clear goal for the site (blog, business, store).</li>
            <li>Choose a domain you can say out loud and remember.</li>
            <li>Use reliable hosting, enable SSL, and keep backups.</li>
            <li>Publish helpful pages and link them internally.</li>
          </ul>

          <div className="rounded-md border border-neutral-800 bg-neutral-900 p-4">
            <div className="text-sm font-medium text-neutral-100">Recommended</div>
            <div className="mt-2 text-sm text-neutral-300">
              If you’re building a website and need hosting, consider Hostinger.
            </div>
          </div>
        </section>

        <Monetization />

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-100">Related guides</h2>
          <ul className="grid gap-2 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="rounded-md border border-neutral-800 bg-neutral-950 p-3">
                <Link className="text-sm underline underline-offset-4" href={`/guides/${r.slug}`}>
                  {r.title}
                </Link>
                <div className="mt-1 text-xs text-neutral-500">{r.description}</div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="pt-6 text-xs text-neutral-500">
          <div>
            Disclosure: Some links may be affiliate links. If you purchase through them, we may earn a commission at no extra cost to you.
          </div>
        </footer>
      </div>
    </main>
  );
}
