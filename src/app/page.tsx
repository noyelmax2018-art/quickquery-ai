import AskBox from "@/components/AskBox";
import Monetization from "@/components/Monetization";
import Shell from "@/components/Shell";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <Shell subtitle="Premium quick answers.">
      <div className="space-y-10">
        <section className="space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Quick answers,
            <span className="block bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              without the noise.
            </span>
          </h1>

          <p className="max-w-2xl text-sm text-neutral-300 md:text-base">
            Ask a question and get a clean, short response. Press Enter to submit.
          </p>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur md:p-6">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-transparent to-fuchsia-500/15" />
            <div className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]">
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.06),transparent_45%)]" />
            </div>
            <div className="relative">
              <AskBox />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-neutral-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fast</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Minimal</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Private</span>
          </div>
        </section>

        <SocialProof />

        <Monetization />
      </div>
    </Shell>
  );
}
