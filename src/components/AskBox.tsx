"use client";

import { useEffect, useMemo, useState } from "react";
import ContextualAffiliate from "@/components/ContextualAffiliate";

type AskResponse = {
  answer: string;
  citations?: { title: string; url: string }[];
};

type FeedbackVote = "up" | "down" | null;

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

function hashString(input: string) {
  // Small, stable hash for localStorage keys (not cryptographic).
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = (h * 33) ^ input.charCodeAt(i);
  return (h >>> 0).toString(16);
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let line = "";

  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w;
    if (ctx.measureText(candidate).width <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function shareAnswerAsImage(opts: { query: string; answer: string }) {
  const { query, answer } = opts;

  const canvas = document.createElement("canvas");
  const width = 1200;
  const padding = 72;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  // Typography
  const titleFont = "700 42px ui-sans-serif, system-ui, -apple-system";
  const bodyFont = "400 32px ui-sans-serif, system-ui, -apple-system";
  const smallFont = "600 22px ui-sans-serif, system-ui, -apple-system";

  // Pre-layout using rough line wrapping
  ctx.font = titleFont;
  const qLines = wrapLines(ctx, query, width - padding * 2);

  ctx.font = bodyFont;
  const aLines = wrapLines(ctx, answer, width - padding * 2);

  const lineH = 44;
  const smallH = 30;
  const contentHeight =
    padding +
    smallH +
    20 +
    qLines.length * lineH +
    26 +
    aLines.length * lineH +
    60 +
    smallH +
    padding;

  canvas.width = width;
  canvas.height = Math.max(720, contentHeight);

  // Background gradient
  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  g.addColorStop(0, "#0b1020");
  g.addColorStop(0.55, "#0a0a0a");
  g.addColorStop(1, "#120b2b");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle grid
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#ffffff";
  for (let x = 0; x < canvas.width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Card
  const cardX = 48;
  const cardY = 48;
  const cardW = canvas.width - 96;
  const cardH = canvas.height - 96;
  const r = 28;

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(cardX + r, cardY);
  ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, r);
  ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, r);
  ctx.arcTo(cardX, cardY + cardH, cardX, cardY, r);
  ctx.arcTo(cardX, cardY, cardX + cardW, cardY, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Content
  let y = cardY + padding;

  ctx.font = smallFont;
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText("QuickQuery AI", cardX + padding, y);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(99,102,241,0.95)";
  ctx.fillText("quickquery-ai.pages.dev", cardX + cardW - padding, y);
  ctx.textAlign = "left";

  y += 44;

  // Question
  ctx.font = titleFont;
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  for (const line of qLines) {
    ctx.fillText(line, cardX + padding, y);
    y += lineH;
  }

  y += 10;

  // Divider
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + padding, y);
  ctx.lineTo(cardX + cardW - padding, y);
  ctx.stroke();
  y += 34;

  // Answer
  ctx.font = bodyFont;
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  for (const line of aLines) {
    ctx.fillText(line, cardX + padding, y);
    y += lineH;
  }

  // Footer
  ctx.font = smallFont;
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText(`Generated ${new Date().toLocaleString()}`, cardX + padding, cardY + cardH - padding + 8);

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
  if (!blob) throw new Error("Failed to export image");

  const file = new File([blob], "quickquery-answer.png", { type: "image/png" });

  // Prefer native share when available (mobile etc.)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;
  if (nav.share && nav.canShare && nav.canShare({ files: [file] })) {
    await nav.share({
      title: "QuickQuery AI",
      text: "QuickQuery answer",
      files: [file],
    });
    return;
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quickquery-answer.png";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2500);
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

  const [feedback, setFeedback] = useState<FeedbackVote>(null);
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  const canAsk = useMemo(() => q.trim().length >= 3 && !loading, [q, loading]);
  const canFollowUp = useMemo(
    () => followUp.trim().length >= 2 && !loading && history.length > 0,
    [followUp, loading, history]
  );

  const activeQuery = useMemo(() => {
    const lastUser = [...history].reverse().find((m) => m.role === "user");
    return lastUser?.content ?? q;
  }, [history, q]);

  const feedbackKey = useMemo(() => {
    if (!activeQuery || !answer) return null;
    return `qq:feedback:${hashString(`${activeQuery}\n${answer}`)}`;
  }, [activeQuery, answer]);

  useEffect(() => {
    if (!feedbackKey) {
      setFeedback(null);
      return;
    }
    try {
      const raw = localStorage.getItem(feedbackKey);
      setFeedback(raw === "up" || raw === "down" ? raw : null);
    } catch {
      setFeedback(null);
    }
  }, [feedbackKey]);

  async function sendFeedback(vote: FeedbackVote) {
    if (!feedbackKey) return;

    try {
      if (vote) localStorage.setItem(feedbackKey, vote);
      else localStorage.removeItem(feedbackKey);
      setFeedbackSaved(true);
      setTimeout(() => setFeedbackSaved(false), 1200);
    } catch {
      // ignore
    }

    // Best-effort server signal. No DB.
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          vote,
          query: activeQuery,
          answer,
          ts: Date.now(),
          ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
    } catch {
      // ignore
    }
  }

  async function onAsk(opts?: { qOverride?: string; appendToHistory?: boolean }) {
    const question = (opts?.qOverride ?? q).trim();
    if (question.length < 3 || loading) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setCitations(null);
    setCopied(false);
    setFeedback(null);

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
          className="w-full resize-none rounded-2xl p-4 text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/30 qq-panel"
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
            className="rounded-xl bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(34,211,238,0.12)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 disabled:opacity-50"
            onClick={() => void onAsk({ appendToHistory: true })}
            disabled={!canAsk}
          >
            {loading ? "Generating…" : "Get answer"}
            <span className="ml-2 text-xs text-black/60">(Enter)</span>
          </button>

          <div className="flex items-center gap-2 rounded-xl p-1 text-xs qq-panel">
            <button
              type="button"
              className={`rounded-lg px-3 py-1 transition ${
                mode === "short" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/5"
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
            className="rounded-xl px-3 py-2 text-xs text-neutral-200 transition disabled:opacity-40 qq-panel qq-panel-hover"
            onClick={() => void onAsk({ appendToHistory: true })}
            disabled={!canAsk || loading}
            title="Regenerate"
          >
            Regenerate
          </button>

          <button
            type="button"
            className="rounded-xl px-3 py-2 text-xs text-neutral-200 transition qq-panel qq-panel-hover"
            onClick={() => {
              setQ("");
              setFollowUp("");
              setAnswer(null);
              setCitations(null);
              setError(null);
              setHistory([]);
              setFeedback(null);
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
              className="rounded-full px-3 py-1 text-xs text-neutral-200 transition qq-panel qq-panel-hover"
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
          <span className="font-medium text-neutral-200"> Shift+Enter</span> for a new line.
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-200">{error}</div>
      ) : null}

      {answer || loading ? (
        <div className="space-y-4">
          <div className="rounded-2xl p-4 text-sm leading-6 text-neutral-100 backdrop-blur qq-panel qq-neon-ring">
            <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-3">
              <div className="flex items-center gap-2">
                {loading ? (
                  <span aria-hidden className="qq-spinner" />
                ) : null}
                <div className="text-xs font-medium text-neutral-300">Answer</div>
                {loading ? <div className="text-xs text-neutral-500">This may take a few seconds…</div> : null}
              </div>

              <div className="flex flex-wrap items-center gap-2">
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
                  className="rounded-lg px-2 py-1 text-xs text-neutral-200 disabled:opacity-40 qq-panel qq-panel-hover"
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
                  className="rounded-lg px-2 py-1 text-xs text-neutral-200 qq-panel qq-panel-hover"
                >
                  Share
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    if (!answer) return;
                    try {
                      await shareAnswerAsImage({ query: activeQuery, answer });
                    } catch {
                      // ignore
                    }
                  }}
                  className="rounded-lg px-2 py-1 text-xs text-neutral-200 disabled:opacity-40 qq-panel qq-panel-hover"
                  disabled={!answer}
                  title="Generate a branded PNG"
                >
                  Share as image
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!answer) return;
                    const w = window.open("", "_blank", "noopener,noreferrer");
                    if (!w) return;
                    const safe = (s: string) =>
                      s
                        .replaceAll("&", "&amp;")
                        .replaceAll("<", "&lt;")
                        .replaceAll(">", "&gt;");
                    const sources = (citations ?? [])
                      .map((c, i) => `${i + 1}. ${c.title || c.url} — ${c.url}`)
                      .join("\n");

                    w.document.write(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>QuickQuery AI — Export</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: ui-sans-serif, system-ui, -apple-system; padding: 24px; }
    h1 { font-size: 18px; margin: 0 0 8px; }
    .muted { color: #555; font-size: 12px; margin-bottom: 16px; }
    pre { white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas; font-size: 13px; line-height: 1.5; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print" style="display:flex; gap:8px; align-items:center; margin-bottom:16px;">
    <button onclick="window.print()">Print / Save as PDF</button>
  </div>
  <h1>QuickQuery AI</h1>
  <div class="muted">Exported ${safe(new Date().toLocaleString())}</div>
  <pre><strong>Question:</strong> ${safe(activeQuery)}\n\n<strong>Answer:</strong> ${safe(answer)}${sources ? `\n\n<strong>Sources:</strong>\n${safe(sources)}` : ""}</pre>
</body>
</html>`);
                    w.document.close();
                    w.focus();
                  }}
                  className="rounded-lg px-2 py-1 text-xs text-neutral-200 disabled:opacity-40 qq-panel qq-panel-hover"
                  disabled={!answer}
                  title="Print or save as PDF"
                >
                  Export / Print
                </button>

                <div className="ml-1 flex items-center gap-1 rounded-lg p-1 qq-panel">
                  <button
                    type="button"
                    className={`rounded-md px-2 py-1 text-xs transition ${
                      feedback === "up" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/5"
                    }`}
                    disabled={!answer}
                    title="Thumbs up"
                    onClick={() => {
                      const next: FeedbackVote = feedback === "up" ? null : "up";
                      setFeedback(next);
                      void sendFeedback(next);
                    }}
                  >
                    👍
                  </button>
                  <button
                    type="button"
                    className={`rounded-md px-2 py-1 text-xs transition ${
                      feedback === "down" ? "bg-white/10 text-white" : "text-neutral-300 hover:bg-white/5"
                    }`}
                    disabled={!answer}
                    title="Thumbs down"
                    onClick={() => {
                      const next: FeedbackVote = feedback === "down" ? null : "down";
                      setFeedback(next);
                      void sendFeedback(next);
                    }}
                  >
                    👎
                  </button>
                </div>

                {feedbackSaved ? <span className="text-xs text-neutral-500">Saved</span> : null}
              </div>
            </div>

            {loading ? (
              <div className="space-y-2">
                <div className="qq-shimmer h-4 w-5/6 rounded bg-white/10" />
                <div className="qq-shimmer h-4 w-4/6 rounded bg-white/10" />
                <div className="qq-shimmer h-4 w-3/6 rounded bg-white/10" />
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
            <div className="rounded-2xl p-4 backdrop-blur qq-panel">
              <div className="text-xs font-medium text-neutral-200">Follow-up</div>
              <div className="mt-2 flex flex-col gap-2 md:flex-row">
                <input
                  className="w-full rounded-xl px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/30 qq-panel"
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
                  className="rounded-xl px-4 py-2 text-sm text-neutral-100 transition disabled:opacity-40 qq-panel qq-panel-hover"
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
            <div className="rounded-2xl p-4 backdrop-blur qq-panel">
              <div className="text-xs font-medium text-neutral-200">Sources</div>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-neutral-400">
                {citations.map((c) => (
                  <li key={c.url}>
                    <a className="underline underline-offset-4" href={c.url} target="_blank" rel="noopener noreferrer">
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
