"use client";

import { useEffect, useState } from "react";

export default function ChangelogClient() {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/CHANGELOG.md", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load changelog (${res.status})`);
        const md = await res.text();
        if (mounted) setText(md);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Failed to load changelog");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {error ? (
        <div className="rounded-2xl border border-red-900 bg-red-950 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs text-neutral-400">
          Loaded from <code>CHANGELOG.md</code>
        </div>
        <pre className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-neutral-200">
          {text || "Loading…"}
        </pre>
      </div>
    </>
  );
}
