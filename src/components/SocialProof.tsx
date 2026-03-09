function CardIcon({ kind }: { kind: "bolt" | "spark" | "link" }) {
  const common = "h-4 w-4";
  switch (kind) {
    case "bolt":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M13 2 3 14h8l-1 8 11-13h-8l0-7Z"
            stroke="rgba(34,211,238,0.95)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "spark":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2l1.2 6.1L19 10l-5.8 1.9L12 18l-1.2-6.1L5 10l5.8-1.9L12 2Z"
            stroke="rgba(168,85,247,0.95)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "link":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1"
            stroke="rgba(236,72,153,0.9)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 1 1-7-7l1-1"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

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
            icon: "bolt" as const,
          },
          {
            title: "Clean UI",
            body: "Feels premium and distraction-free.",
            icon: "spark" as const,
          },
          {
            title: "Useful links",
            body: "Simple suggestions when I need to buy tools.",
            icon: "link" as const,
          },
        ].map((t) => (
          <div
            key={t.title}
            className="rounded-2xl p-4 backdrop-blur qq-panel qq-panel-hover"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <CardIcon kind={t.icon} />
              </span>
              <div className="text-sm font-semibold text-neutral-100">{t.title}</div>
            </div>
            <div className="mt-2 text-sm text-neutral-300">{t.body}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-neutral-500">Note: Testimonials are placeholders for now.</div>
    </section>
  );
}
