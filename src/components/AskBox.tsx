"use client";

import { useMemo, useState } from "react";

type AskResponse = {
  answer: string;
  citations?: { title: string; url: string }[];
};

export default function AskBox() {
  const [q, setQ] = useState("");
  const [useWeb, setUseWeb] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [citations, setCitations] = useState<AskResponse["citations"] | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAsk = useMemo(() => q.trim().length >= 3 && !loading, [q, loading]);

  async function onAsk() {
    if (!canAsk) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    setCitations(null);
    setCopied(false);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q, useWeb }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data = (await res.json()) as AskResponse;
      setAnswer(data.answer);
      setCitations(data.citations ?? null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const quickPrompts = [
    "Best hosting for a beginner website?",
    "How to buy a domain name safely?",
    "WordPress vs website builder — which should I choose?",
  ];

  return (
    <section className="space-y-5">
      <div className="space-y-3">
        <textarea
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-100 shadow-sm placeholder:text-neutral-400 focus:border-white/20 focus:outline-none"
          rows={4}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void onAsk();
            }
          }}
          placeholder="Ask anything…"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="rounded-xl bg-gradient-to-r from-indigo-400 to-fuchsia-400 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(99,102,241,0.25)] transition hover:opacity-95 disabled:opacity-50"
            onClick={() => void onAsk()}
            disabled={!canAsk}
          >
            {loading ? "Thinking…" : "Get answer"}
            <span className="ml-2 text-xs text-black/60">(Enter)</span>
          </button>

          <label className="flex items-center gap-2 text-xs text-neutral-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-white"
              checked={useWeb}
              onChange={(e) => setUseWeb(e.target.checked)}
            />
            Add citations
          </label>

          <span className="text-xs text-neutral-400">Powered by Cloudflare Workers AI</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p) => (
            <button
              key={p}
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 transition hover:bg-white/10"
              onClick={() => setQ(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="text-xs text-neutral-400">
          Tip: <span className="font-medium text-neutral-200">Enter</span> to submit, 
          <span className="font-medium text-neutral-200">Shift+Enter</span> for a new line.
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {answer || loading ? (
        <div className="space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-neutral-100 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-xs font-medium text-neutral-300">Answer</div>
              <button
                type="button"
                onClick={async () => {
                  if (!answer) return;
                  try {
                    await navigator.clipboard.writeText(answer);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                  } catch {
                    // ignore
                  }
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-neutral-200 hover:bg-white/10 disabled:opacity-40"
                disabled={!answer}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {loading ? (
              <div className="space-y-2">
                <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-3/6 animate-pulse rounded bg-white/10" />
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{answer}</div>
            )}
          </div>

          {citations?.length ? (
            <div className="rounded-md border border-neutral-800 bg-neutral-950 p-4">
              <div className="text-xs font-medium text-neutral-200">Sources</div>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-neutral-400">
                {citations.map((c) => (
                  <li key={c.url}>
                    <a
                      className="underline underline-offset-4"
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c.title || c.url}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
