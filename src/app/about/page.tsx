import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold">About QuickQuery AI</h1>
        <p className="text-sm text-neutral-300">
          QuickQuery AI is a minimal Q&A app built with Next.js on Cloudflare Pages and Workers AI.
          The goal is to return useful answers quickly — short by default.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
          <li>Short answers by default (expand only when asked).</li>
          <li>Optional web citations (requires a search API key).</li>
          <li>Privacy-first: we don’t sell personal data.</li>
        </ul>
      </div>
    </main>
  );
}
