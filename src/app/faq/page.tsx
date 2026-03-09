import Shell from "@/components/Shell";

const faqs: { q: string; a: string }[] = [
  {
    q: "What is QuickQuery AI?",
    a: "QuickQuery AI gives short, practical answers to your questions. Switch to Detailed mode when you want a more structured breakdown.",
  },
  {
    q: "What does ‘Citations’ do?",
    a: "When enabled, QuickQuery AI will try to include a short list of sources. (Availability depends on configuration.)",
  },
  {
    q: "Does QuickQuery AI store my questions?",
    a: "Your conversation history is kept in-memory in your browser for follow-ups. Feedback (thumbs up/down) is saved locally in your browser only.",
  },
  {
    q: "Can I share or export an answer?",
    a: "Yes — you can copy the text, share a link, export/print, or generate a branded image of the answer.",
  },
  {
    q: "Why do you show recommended tools?",
    a: "Sometimes we show a single relevant recommendation. Some links may be affiliate links — if you buy through them, we may earn a commission at no extra cost to you.",
  },
];

export const metadata = {
  title: "FAQ — QuickQuery AI",
  description: "Frequently asked questions about QuickQuery AI.",
};

export default function FAQPage() {
  return (
    <Shell title="FAQ" subtitle="Answers about QuickQuery AI.">
      <div className="space-y-4">
        <p className="text-sm leading-6 text-neutral-300">
          If you still have questions, head to the Contact page and send a note.
        </p>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-neutral-100">
                <span className="inline-flex items-center gap-2">
                  <span className="text-neutral-400 transition group-open:rotate-90">›</span>
                  {f.q}
                </span>
              </summary>
              <div className="mt-2 text-sm leading-6 text-neutral-300">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </Shell>
  );
}
