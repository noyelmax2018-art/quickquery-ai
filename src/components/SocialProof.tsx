export default function SocialProof() {
  return (
    <section className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-wider text-neutral-400">
        Trusted by builders
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {[
          {
            title: "Fast answers",
            body: "Gets me to the point in seconds.",
          },
          {
            title: "Clean UI",
            body: "Feels premium and distraction-free.",
          },
          {
            title: "Useful links",
            body: "Simple suggestions when I need to buy tools.",
          },
        ].map((t) => (
          <div
            key={t.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <div className="text-sm font-semibold text-neutral-100">{t.title}</div>
            <div className="mt-1 text-sm text-neutral-300">{t.body}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-neutral-500">
        Note: Testimonials are placeholders for now.
      </div>
    </section>
  );
}
