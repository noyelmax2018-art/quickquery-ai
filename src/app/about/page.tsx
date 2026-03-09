import type { Metadata } from "next";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Shell title="About QuickQuery AI" subtitle="Fast answers. Simple guides.">
      <div className="space-y-4 text-sm text-neutral-300">
        <p>
          QuickQuery AI is a minimal Q&A app built with Next.js on Cloudflare Pages
          and Workers AI.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Short answers by default (expand only when asked).</li>
          <li>Optional web citations (requires a search API key).</li>
          <li>Privacy-first: we don’t sell personal data.</li>
        </ul>
      </div>
    </Shell>
  );
}
