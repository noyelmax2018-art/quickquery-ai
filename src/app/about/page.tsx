export const metadata = {
  title: "About — QuickQuery AI",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="text-sm text-neutral-300">
          QuickQuery AI helps you get quick answers. It’s powered by Cloudflare
          Workers AI.
        </p>
        <p className="text-sm text-neutral-300">
          Contact: <span className="text-neutral-100">support@quickquery-ai</span>
          (placeholder)
        </p>
      </div>
    </main>
  );
}
