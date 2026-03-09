const LOGOS = ["Product Hunt", "Indie Hackers", "Hacker News", "X", "Reddit"] as const;

export default function FeaturedIn() {
  return (
    <section className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-wider text-neutral-400">
        Featured in
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {LOGOS.map((name) => (
          <span
            key={name}
            className="qq-panel qq-panel-hover rounded-full px-3 py-1 text-xs text-neutral-200/90 backdrop-blur"
          >
            {name}
          </span>
        ))}
      </div>

      <div className="text-[11px] text-neutral-500">Placeholders — swap for real logos later.</div>
    </section>
  );
}
