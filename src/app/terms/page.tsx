export const metadata = {
  title: "Terms — QuickQuery AI",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">Terms</h1>
        <p className="text-sm text-neutral-300">
          By using QuickQuery AI, you agree that responses are provided “as is”
          and may be incorrect.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-300">
          <li>No professional advice (medical/legal/financial).</li>
          <li>You are responsible for how you use the information.</li>
          <li>We may change or remove features at any time.</li>
        </ul>
        <p className="text-xs text-neutral-500">Last updated: 2026-03-05</p>
      </div>
    </main>
  );
}
