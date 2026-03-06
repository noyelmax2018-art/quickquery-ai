import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="pt-8 text-xs text-neutral-500">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span>© {new Date().getFullYear()} QuickQuery AI — owned by noyelmax</span>
        <Link className="underline underline-offset-4" href="/about">
          About
        </Link>
        <Link className="underline underline-offset-4" href="/contact">
          Contact
        </Link>
        <Link className="underline underline-offset-4" href="/privacy">
          Privacy
        </Link>
        <Link className="underline underline-offset-4" href="/terms">
          Terms
        </Link>
      </div>
      <div className="mt-3">AI answers can be wrong. Verify important info.</div>
    </footer>
  );
}
