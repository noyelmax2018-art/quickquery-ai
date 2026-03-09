import AskBox from "@/components/AskBox";
import Monetization from "@/components/Monetization";
import Shell from "@/components/Shell";
import TopGuides from "@/components/TopGuides";

export default function Home() {
  return (
    <Shell subtitle="Search smarter. Get a fast answer.">
      <div className="space-y-10">
        <section className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Ask anything. <span className="text-neutral-400">Get it in seconds.</span>
          </h1>
          <p className="max-w-2xl text-sm text-neutral-300 md:text-base">
            QuickQuery AI gives short, clear answers and links you can click.
          </p>

          <div className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] md:p-6">
            <AskBox />
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
            <span className="rounded-full border border-neutral-900 bg-neutral-950/40 px-3 py-1">
              Fast answers
            </span>
            <span className="rounded-full border border-neutral-900 bg-neutral-950/40 px-3 py-1">
              SEO guides
            </span>
            <span className="rounded-full border border-neutral-900 bg-neutral-950/40 px-3 py-1">
              Affiliate disclosure
            </span>
          </div>
        </section>

        <TopGuides />

        <Monetization />
      </div>
    </Shell>
  );
}
