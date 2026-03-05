"use client";

import { useMemo, useState } from "react";

type AskResponse = {
  answer: string;
};

export default function AskBox() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAsk = useMemo(() => q.trim().length >= 3 && !loading, [q, loading]);

  async function onAsk() {
    if (!canAsk) return;
    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data = (await res.json()) as AskResponse;
      setAnswer(data.answer);
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Something went wrong";
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
          className="w-full rounded-md border border-neutral-200 p-3 text-sm shadow-sm focus:border-neutral-400 focus:outline-none"
          rows={3}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='e.g. "What is Cloudflare Workers AI?"'
        />
        <div className="flex items-center gap-3">
          <button
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            onClick={onAsk}
            disabled={!canAsk}
          >
            {loading ? "Thinking…" : "Ask"}
          </button>
          <span className="text-xs text-neutral-500">
            Powered by Cloudflare Workers AI
          </span>
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      {answer ? (
        <div className="rounded-md border border-neutral-200 bg-white p-4 text-sm leading-6 shadow-sm whitespace-pre-wrap">
          {answer}
        </div>
      ) : null}
    </section>
  );
}
