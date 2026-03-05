import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">Terms of Service</h1>
        <p className="text-sm text-neutral-300">
          This is a minimal terms template. You should adapt it to your needs.
        </p>

        <section className="space-y-2">
          <h2 className="text-sm font-medium text-neutral-200">No warranties</h2>
          <p className="text-sm text-neutral-300">
            The service is provided “as is”. AI answers may be incorrect or incomplete. You are
            responsible for verifying information before acting on it.
          </p>
        </section>

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

        <p className="text-xs text-neutral-500">Last updated: {new Date().toISOString().slice(0, 10)}</p>
      </div>
    </main>
  );
}
