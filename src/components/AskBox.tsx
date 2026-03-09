"use client";

import { useMemo, useState } from "react";
import ContextualAffiliate from "@/components/ContextualAffiliate";

type AskResponse = {
  answer: string;
  citations?: { title: string; url: string }[];
};

function formatAnswer(answer: string) {
  const rawLines = answer
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const first = rawLines[0] ?? "";

  const bullets = rawLines
    .slice(1)
    .filter((l) => /^[-•*]\s+/.test(l))
    .map((l) => l.replace(/^[-•*]\s+/, ""));

  const restText = rawLines
    .slice(1)
    .filter((l) => !/^[-•*]\s+/.test(l))
    .join("\n");

  return { first, bullets, restText };
}

export default function AskBox() {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"short" | "detailed">("short");
  const [useWeb, setUseWeb] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [citations, setCitations] = useState<AskResponse["citations"] | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [followUp, setFollowUp] = useState("");

  const canAsk = useMemo(() => q.trim().length >= 3 && !loading, [q, loading]);
  const canFollowUp = useMemo(
    () => followUp.trim().length >= 2 && !loading && history.length > 0,
    [followUp, loading, history]
  );

  const activeQuery = useMemo(() => {
    const lastUser = [...history].reverse().find((m) => m.role === "user");
    return lastUser?.content ?? q;
  }, [history, q]);

  async function onAsk(opts?: { qOverride?: string; appendToHistory?: boolean }) {
    const question = (opts?.qOverride ?? q).trim();
    if (question.length < 3 || loading) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setCitations(null);
    setCopied(false);

    const nextHistory = opts?.appendToHistory
      ? [...history, { role: "user" as const, content: question }]
      : history;

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q: question, useWeb, mode, history: nextHistory }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      const data = (await res.json()) as AskResponse;
      setAnswer(data.answer);
      setCitations(data.citations ?? null);

      const assistantMsg = data.answer;
      const finalHistory = opts?.appendToHistory
        ? [...nextHistory, { role: "assistant" as const, content: assistantMsg }]
        : nextHistory;
      setHistory(finalHistory);
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
              void onAsk({ appendToHistory: true });
            }
          }}
          placeholder="Ask anything…"
        />

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="rounded-xl bg-gradient-to-r from-indigo-400 to-fuchsia-400 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(99,102,241,0.25)] transition hover:opacity-95 disabled:opacity-50"
            onClick={() => void onAsk({ appendToHistory: true })}
            disabled={!canAsk}
          >
            {loading ? "Thinking…" : "Get answer"}
            <span className="ml-2 text-xs text-black/60">(Enter)</span>
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1 text-xs">
            <button
              type="button"
              className={`rounded-lg px-3 py-1 transition ${
                mode === "short"
                  ? "bg-white/10 text-white"
                  : "text-neutral-300 hover:bg-white/5"
              }`}
              onClick={() => setMode("short")}
            >
              Short
            </button>
            <button
              type="button"
              className={`rounded-lg px-3 py-1 transition ${
                mode === "detailed"
                  ? "bg-white/10 text-white"
                  : "text-neutral-300 hover:bg-white/5"
              }`}
              onClick={() => setMode("detailed")}
            >
              Detailed
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-neutral-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-white"
              checked={useWeb}
              onChange={(e) => setUseWeb(e.target.checked)}
            />
            Citations
          </label>

          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-neutral-200 transition hover:bg-white/10 disabled:opacity-40"
            onClick={() => void onAsk({ appendToHistory: true })}
            disabled={!canAsk || loading}
            title="Regenerate"
          >
            Regenerate
          </button>

          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-neutral-200 transition hover:bg-white/10"
            onClick={() => {
              setQ("");
              setFollowUp("");
              setAnswer(null);
              setCitations(null);
              setError(null);
              setHistory([]);
            }}
            title="New"
          >
            New
          </button>

          <span className="text-xs text-neutral-400">Workers AI</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p) => (
            <button
              key={p}
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 transition hover:bg-white/10"
              onClick={() => {
                setQ(p);
                void onAsk({ qOverride: p, appendToHistory: true });
              }}
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
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-neutral-100 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-xs font-medium text-neutral-300">Answer</div>
              <div className="flex items-center gap-2">
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

                <button
                  type="button"
                  onClick={async () => {
                    const url = window.location.href;
                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: "QuickQuery AI",
                          text: "Quick answer:",
                          url,
                        });
                      } else {
                        await navigator.clipboard.writeText(url);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1200);
                      }
                    } catch {
                      // ignore
                    }
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-neutral-200 hover:bg-white/10"
                >
                  Share
                </button>
              </div>
            </div>

            {loading ? (
              <div className="space-y-2">
                <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-3/6 animate-pulse rounded bg-white/10" />
              </div>
            ) : answer ? (
              (() => {
                const { first, bullets, restText } = formatAnswer(answer);
                return (
                  <div className="space-y-3">
                    {first ? <div className="text-base font-medium">{first}</div> : null}
                    {bullets.length ? (
                      <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-200/90">
                        {bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                    {restText ? (
                      <div className="whitespace-pre-wrap text-sm text-neutral-200/90">{restText}</div>
                    ) : null}
                  </div>
                );
              })()
            ) : null}
          </div>

          {history.length ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium text-neutral-200">Follow-up</div>
              <div className="mt-2 flex flex-col gap-2 md:flex-row">
                <input
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-white/20 focus:outline-none"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  placeholder="Ask a follow-up…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void onAsk({ qOverride: followUp, appendToHistory: true });
                      setFollowUp("");
                    }
                  }}
                />
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-100 transition hover:bg-white/10 disabled:opacity-40"
                  disabled={!canFollowUp}
                  onClick={() => {
                    void onAsk({ qOverride: followUp, appendToHistory: true });
                    setFollowUp("");
                  }}
                >
                  Ask
                </button>
              </div>
            </div>
          ) : null}

          {citations?.length ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
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

          <ContextualAffiliate query={activeQuery} />
        </div>
      ) : null}
    </section>
  );
}
