export const metadata = {
  title: "Privacy Policy — QuickQuery AI",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        <p className="text-sm text-neutral-300">
          QuickQuery AI is a simple Q&A website. We may process your queries to
          generate answers.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
          <li>We may log basic request metadata for security and debugging.</li>
          <li>Do not submit sensitive personal information.</li>
          <li>
            We may use cookies/analytics in the future; this page will be updated
            if we do.
          </li>
        </ul>
        <p className="text-xs text-neutral-500">Last updated: 2026-03-05</p>
      </div>
    </main>
  );
}
