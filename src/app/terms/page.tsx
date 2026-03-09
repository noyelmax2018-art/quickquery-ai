import type { Metadata } from "next";
import Shell from "@/components/Shell";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <Shell title="Terms of Service" subtitle="Read before using the site">
      <div className="space-y-6">
        <p className="text-sm text-neutral-300">
          The service is provided “as is”. AI answers may be incorrect or incomplete. You are
          responsible for verifying information before acting on it.
        </p>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-200">Acceptable use</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-300">
            <li>Don’t use the service for illegal activities.</li>
            <li>Don’t try to disrupt or exploit the service.</li>
            <li>Don’t submit sensitive personal information.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-200">Changes</h2>
          <p className="text-sm text-neutral-300">
            We may update these terms from time to time by posting a new version on this page.
          </p>
        </section>

        <p className="text-xs text-neutral-500">
          Last updated: {new Date().toISOString().slice(0, 10)}
        </p>
      </div>
    </Shell>
  );
}
