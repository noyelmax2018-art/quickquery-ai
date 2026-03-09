import { pickAffiliateLinks } from "@/lib/affiliate";

export default function ContextualAffiliate({ query }: { query: string }) {
  const links = pickAffiliateLinks(query);
  if (!links.length) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-medium text-neutral-200">Recommended</div>
      <div className="mt-1 text-xs text-neutral-500">
        Disclosure: Some links are affiliate links. If you purchase through them, we may earn a
        commission at no extra cost to you.
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="rounded-xl border border-white/10 bg-neutral-950/40 p-3 transition hover:bg-white/5"
          >
            <div className="text-sm font-semibold text-neutral-100">{l.label}</div>
            {l.description ? <div className="mt-1 text-xs text-neutral-400">{l.description}</div> : null}
          </a>
        ))}
      </div>
    </section>
  );
}
