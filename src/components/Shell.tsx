import Link from "next/link";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      className="rounded-md px-2 py-1 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
      href={href}
    >
      {children}
    </Link>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
        />
        <path
          d="M8.25 12h7.5"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 8.25v7.5"
          stroke="rgba(99,102,241,0.95)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Shell({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* subtle background glow (animated) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl animate-glow-slow" />
        <div className="absolute -bottom-24 right-10 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-3xl animate-glow-slower" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
              <LogoMark />
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                QuickQuery AI
              </span>
            </Link>
            {subtitle ? <div className="text-sm text-neutral-400">{subtitle}</div> : null}
          </div>

          <nav className="flex flex-wrap gap-1">
            <NavLink href="/">Ask</NavLink>
            <NavLink href="/guides/how-to-start-a-website">Guides</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/privacy">Privacy</NavLink>
            <NavLink href="/terms">Terms</NavLink>
          </nav>
        </header>

        {title ? (
          <div className="mt-8 space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
          </div>
        ) : null}

        <div className="mt-8">{children}</div>

        <footer className="mt-12 border-t border-neutral-900/80 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} QuickQuery AI — owned by noyelmax
        </footer>
      </div>
    </main>
  );
}
