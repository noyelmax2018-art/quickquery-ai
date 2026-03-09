export type AffiliateLink = {
  label: string;
  href: string;
  description?: string;
  match?: RegExp;
};

const AMAZON_TAG = "ai0c23-20";

export const AFFILIATE_LINKS: AffiliateLink[] = [
  {
    label: "Hostinger (web hosting)",
    href: "https://www.hostinger.com/?REFERRALCODE=K2VNOYELMITC",
    description: "Affordable hosting",
    match: /(host|hosting|domain|website|wordpress|blog|site|ssl|dns|vps)/i,
  },
  {
    label: "Amazon.com",
    href: `https://www.amazon.com/?tag=${AMAZON_TAG}`,
    description: "Shop on Amazon",
    match: /(laptop|phone|headphone|keyboard|mouse|monitor|camera|amazon|buy)/i,
  },
];

export function pickAffiliateLinks(query: string, max = 2): AffiliateLink[] {
  const q = query.trim();
  if (!q) return [];
  const matched = AFFILIATE_LINKS.filter((l) => (l.match ? l.match.test(q) : false));
  // Fallback: show Hostinger for generic “make website” vibes, otherwise none.
  if (matched.length === 0 && /(make|create|build)\s+(a\s+)?(website|site)/i.test(q)) {
    return AFFILIATE_LINKS.filter((l) => l.label.includes("Hostinger")).slice(0, max);
  }
  return matched.slice(0, max);
}
