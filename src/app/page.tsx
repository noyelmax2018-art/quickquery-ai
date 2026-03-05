import AskBox from "@/components/AskBox";

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">QuickQuery AI</h1>
          <p className="text-sm text-neutral-600">
            Ask a question. Get a fast, sourced answer.
          </p>
        </header>

        <AskBox />

        <footer className="pt-6 text-xs text-neutral-500">
          AI answers can be wrong. Verify important info.
        </footer>
      </div>
    </main>
  );
}
