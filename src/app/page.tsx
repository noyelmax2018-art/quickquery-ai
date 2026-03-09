import AskBox from "@/components/AskBox";
import Monetization from "@/components/Monetization";
import Shell from "@/components/Shell";
import TopGuides from "@/components/TopGuides";

export default function Home() {
  return (
    <Shell subtitle="Ask a question. Get a fast answer.">
      <div className="space-y-8">
        <div className="rounded-xl border border-neutral-900 bg-neutral-950/40 p-4 md:p-6">
          <AskBox />
        </div>

        <TopGuides />

        <Monetization />
      </div>
    </Shell>
  );
}
