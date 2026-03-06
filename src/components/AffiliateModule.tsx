type AffiliateLink = {
  label: string;
  href: string;
  description?: string;
};

const DEFAULT_LINKS: AffiliateLink[] = [
  // SaaS / tools (high intent, good payouts once you have referral links)
  {
    label: "Hostinger (web hosting)",
    href: "https://www.hostinger.com/?REFERRALCODE=K2VNOYELMITC",
    description: "Affordable hosting",
  },
  // Amazon (use your Associate tracking id)
  {
    label: "Amazon.com",
    href: "https://www.amazon.com/?tag=ai0c23-20",
    description: "Shop on Amazon",
  },
];

export default function AffiliateModule({ links = DEFAULT_LINKS }: { links?: AffiliateLink[] }) {
  const disclosure =
    process.env.NEXT_PUBLIC_AFFILIATE_DISCLOSURE ??
    "Disclosure: Some links are affiliate links. If you purchase through them, we may earn a commission at no extra cost to you.";

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-medium text-neutral-200">Recommended</h2>
      <p className="text-xs text-neutral-500">{disclosure}</p>
      <ul className="grid gap-2 md:grid-cols-2">
        {links.map((l) => (
          <li key={l.href} className="rounded-md border border-neutral-800 bg-neutral-900 p-3">
            <a
              className="text-sm font-medium text-neutral-100 underline underline-offset-4"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              {l.label}
            </a>
            {l.description ? (
              <div className="mt-1 text-xs text-neutral-400">{l.description}</div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
