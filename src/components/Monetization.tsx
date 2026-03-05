import AdSlot from "@/components/AdSlot";
import AffiliateModule from "@/components/AffiliateModule";

export default function Monetization() {
  return (
    <aside className="space-y-4 rounded-md border border-neutral-800 bg-neutral-950 p-4">
      <div>
        <div className="text-sm font-medium text-neutral-100">Support this site</div>
        <div className="mt-1 text-xs text-neutral-400">
          Monetization is optional and can be enabled later.
        </div>
      </div>

      <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_1 ?? "0000000000"} />

      <AffiliateModule />
    </aside>
  );
}
