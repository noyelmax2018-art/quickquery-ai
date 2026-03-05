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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAsk = useMemo(() => q.trim().length >= 3 && !loading, [q, loading]);

  async function onAsk() {
    if (!canAsk) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    setCitations(null);

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

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Your question</label>
        <textarea
          className="w-full rounded-md border border-neutral-800 bg-neutral-900 p-3 text-sm text-neutral-100 shadow-sm placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none"
          rows={3}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void onAsk();
            }
          }}
          placeholder='e.g. "What is Cloudflare Workers AI?"'
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
            onClick={() => void onAsk()}
            disabled={!canAsk}
          >
            {loading ? "Thinking…" : "Ask"}
            <span className="ml-2 text-xs text-neutral-700">(Enter)</span>
          </button>

          <label className="flex items-center gap-2 text-xs text-neutral-400">
            <input
              type="checkbox"
              className="accent-white"
              checked={useWeb}
              onChange={(e) => setUseWeb(e.target.checked)}
            />
            Use web citations (optional)
          </label>

          <span className="text-xs text-neutral-500">Powered by Cloudflare Workers AI</span>
        </div>

        <div className="text-xs text-neutral-500">
          Tip: Press <span className="font-medium text-neutral-200">Enter</span> to ask,
          <span className="font-medium text-neutral-200"> Shift+Enter</span> for a new line.
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {answer ? (
        <div className="space-y-3">
          <div className="rounded-md border border-neutral-800 bg-neutral-900 p-4 text-sm leading-6 text-neutral-100 shadow-sm whitespace-pre-wrap">
            {answer}
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
