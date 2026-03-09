import Link from "next/link";

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
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              QuickQuery AI
            </Link>
            {subtitle ? (
              <div className="text-sm text-neutral-400">{subtitle}</div>
            ) : null}
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-300">
            <Link className="hover:text-white" href="/">Ask</Link>
            <Link className="hover:text-white" href="/guides/how-to-start-a-website">
              Guides
            </Link>
            <Link className="hover:text-white" href="/contact">Contact</Link>
            <Link className="hover:text-white" href="/privacy">Privacy</Link>
            <Link className="hover:text-white" href="/terms">Terms</Link>
          </nav>
        </header>

        {title ? (
          <div className="mt-8 space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          </div>
        ) : null}

        <div className="mt-8">{children}</div>

        <footer className="mt-12 border-t border-neutral-900 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} QuickQuery AI — owned by noyelmax
        </footer>
      </div>
    </main>
  );
}
