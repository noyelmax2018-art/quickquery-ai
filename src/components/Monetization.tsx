import AdSlot from "@/components/AdSlot";
import AffiliateModule from "@/components/AffiliateModule";

function CoinIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21c4.418 0 8-2.239 8-5V8c0-2.761-3.582-5-8-5S4 5.239 4 8v8c0 2.761 3.582 5 8 5Z"
        stroke="rgba(34,211,238,0.8)"
        strokeWidth="1.6"
      />
      <path
        d="M20 8c0 2.761-3.582 5-8 5S4 10.761 4 8"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function Monetization() {
  return (
    <aside className="rounded-2xl p-4 backdrop-blur qq-panel space-y-4">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <CoinIcon />
        </span>
        <div>
          <div className="text-sm font-medium text-neutral-100">Support this site</div>
          <div className="mt-1 text-xs text-neutral-400">
            Monetization is optional and can be enabled later.
          </div>
        </div>
      </div>

      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_1 ?? "0000000000"} />

      <AffiliateModule />
    </aside>
  );
}
