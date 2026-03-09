import type { Metadata } from "next";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <Shell title="Privacy Policy" subtitle="What we collect and how we use it">
      <div className="space-y-6">
        <p className="text-sm text-neutral-300">
          This is a lightweight privacy policy template. Update it for your product and
          jurisdiction.
        </p>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-200">What we collect</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-300">
            <li>Your question text (to generate an answer).</li>
            <li>Basic request metadata (e.g. for rate limiting / abuse prevention).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-200">How we use it</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-300">
            <li>To respond to your request.</li>
            <li>To keep the service reliable and prevent abuse.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-200">Web search (optional)</h2>
          <p className="text-sm text-neutral-300">
            If you enable web citations, we may send your query to a third-party search API.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-200">Ads / affiliate links (optional)</h2>
          <p className="text-sm text-neutral-300">
            If enabled, ads and affiliate links may use cookies or tracking technologies provided by
            their networks.
          </p>
        </section>

        <p className="text-xs text-neutral-500">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>
      </div>
    </Shell>
  );
}
