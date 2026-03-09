import { pickAffiliateLinks } from "@/lib/affiliate";

export default function ContextualAffiliate({ query }: { query: string }) {
  const links = pickAffiliateLinks(query, 1);
  const l = links[0];
  if (!l) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-neutral-200">Recommended</div>
          <div className="mt-1 text-xs text-neutral-500">
            Disclosure: Some links are affiliate links. If you purchase through them, we may earn a
            commission at no extra cost to you.
          </div>
        </div>
        <span className="hidden rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-neutral-300 md:inline">
          Affiliate
        </span>
      </div>

      <a
        href={l.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-3 block rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-950/60 to-white/5 p-4 shadow-sm transition hover:border-white/20 hover:bg-white/5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-neutral-100">{l.label}</div>
            {l.description ? (
              <div className="mt-1 text-xs leading-5 text-neutral-400">{l.description}</div>
            ) : null}
          </div>
          <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-neutral-100">
            View →
          </div>
        </div>
      </a>
    </section>
  );
}
