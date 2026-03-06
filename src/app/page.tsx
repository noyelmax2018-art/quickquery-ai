import AskBox from "@/components/AskBox";
import Monetization from "@/components/Monetization";
import TopGuides from "@/components/TopGuides";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-neutral-100 md:p-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">QuickQuery AI</h1>
          <p className="text-sm text-neutral-300">Ask a question. Get a fast answer.</p>
          <p className="text-xs text-neutral-500">
            Optional web citations are available when enabled and configured.
          </p>
        </header>

        <AskBox />

        <TopGuides />

        <Monetization />

        <SiteFooter />
      </div>
    </main>
  );
}
