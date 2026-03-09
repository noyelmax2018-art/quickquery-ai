import AskBox from "@/components/AskBox";
import FeaturedIn from "@/components/FeaturedIn";
import Monetization from "@/components/Monetization";
import Shell from "@/components/Shell";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  return (
    <Shell subtitle="Premium quick answers.">
      <div className="space-y-10">
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_18px_rgba(34,211,238,0.45)]" />
            Minimal luxury · Neon accents
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Quick answers,
            <span className="block bg-gradient-to-r from-white via-white/85 to-white/60 bg-clip-text text-transparent">
              without the noise.
            </span>
          </h1>

          <p className="max-w-2xl text-sm text-neutral-300 md:text-base">
            Ask a question and get a clean, short response. Press Enter to submit.
          </p>

          <div className="relative overflow-hidden rounded-2xl p-4 backdrop-blur md:p-6 qq-panel qq-neon-ring">
            <div className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
              <div className="h-full w-full bg-[radial-gradient(circle_at_28%_18%,rgba(34,211,238,0.14),transparent_45%),radial-gradient(circle_at_74%_32%,rgba(168,85,247,0.16),transparent_45%),radial-gradient(circle_at_60%_86%,rgba(236,72,153,0.10),transparent_55%)]" />
            </div>
            <div className="relative">
              <AskBox />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-neutral-400">
            <span className="qq-panel rounded-full px-3 py-1">Fast</span>
            <span className="qq-panel rounded-full px-3 py-1">Minimal</span>
            <span className="qq-panel rounded-full px-3 py-1">Private</span>
          </div>
        </section>

        <FeaturedIn />

        <SocialProof />

        <Monetization />
      </div>
    </Shell>
  );
}
