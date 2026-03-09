import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

type WebCitation = { title: string; url: string };

async function braveSearch(opts: { q: string; apiKey: string }): Promise<WebCitation[]> {
  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", opts.q);
  url.searchParams.set("count", "3");

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip",
      "X-Subscription-Token": opts.apiKey,
    },
  });

  if (!res.ok) {
    // Don’t fail the entire request when search is down/misconfigured.
    return [];
  }

  type BraveWebResult = { title?: unknown; url?: unknown };
  type BraveResponse = { web?: { results?: BraveWebResult[] } };

  const data = (await res.json().catch(() => null)) as BraveResponse | null;
  const items = data?.web?.results ?? [];

  return items
    .map((r) => ({
      title: typeof r.title === "string" ? r.title : "",
      url: typeof r.url === "string" ? r.url : "",
    }))
    .filter((x) => x.url);
}

export async function POST(req: Request) {
  const { env } = getRequestContext();

  const body = (await req.json().catch(() => null)) as
    | null
    | {
        q?: string;
        useWeb?: boolean;
        mode?: "short" | "detailed";
        history?: { role: "user" | "assistant"; content: string }[];
      };

  const q = body?.q?.toString().trim() ?? "";
  const useWeb = Boolean(body?.useWeb);
  const mode = body?.mode ?? "short";
  const history = Array.isArray(body?.history) ? body?.history.slice(0, 10) : [];


  if (q.length < 3) {
    return Response.json({ error: "Question too short" }, { status: 400 });
  }

  // Cloudflare Workers AI binding (recommended): bind as `AI` in Cloudflare.
  // https://developers.cloudflare.com/workers-ai/
  const ai = (
    env as {
      AI?: { run: (model: string, input: Record<string, unknown>) => Promise<unknown> };
      BRAVE_SEARCH_API_KEY?: string;
    }
  ).AI;

  if (!ai) {
    return Response.json(
      {
        error:
          "Workers AI binding not configured. Bind AI in Cloudflare Pages/Workers as `AI`.",
      },
      { status: 500 }
    );
  }

  const braveKey = (env as { BRAVE_SEARCH_API_KEY?: string }).BRAVE_SEARCH_API_KEY;
  let citations: WebCitation[] = [];

  if (useWeb && braveKey) {
    citations = await braveSearch({ q, apiKey: braveKey });
  }

  const modeRules =
    mode === "detailed"
      ? [
          "Answer in a structured way.",
          "- Start with a 1-sentence summary.",
          "- Then add 5-8 bullets.",
          "- Keep it practical.",
        ]
      : [
          "Answer SHORT by default.",
          "- Start with the direct answer in 1 sentence.",
          "- Then (optional) add up to 3 short bullets if needed.",
          "- No long explanations unless asked.",
        ];

  const system = [
    "You are QuickQuery AI.",
    ...modeRules,
    citations.length
      ? "- When using sources, include citations like [1] [2] matching the provided source list."
      : "- If you don't have sources, do not invent citations.",
  ].join("\n");

  const sourcesBlock = citations.length
    ? "\n\nSources (cite as [1], [2], ...):\n" +
      citations
        .map((c, i) => `${i + 1}. ${c.title || c.url} — ${c.url}`)
        .join("\n")
    : "";

  const historyBlock = history.length
    ? "\n\nConversation so far:\n" +
      history
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n")
    : "";

  const prompt = `${system}${historyBlock}\n\nQuestion: ${q}${sourcesBlock}`;

  const result = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
    prompt,
    max_tokens: mode === "detailed" ? 520 : citations.length ? 220 : 160,
  });

  let text: string;
  if (typeof result === "string") {
    text = result;
  } else if (
    result &&
    typeof result === "object" &&
    "response" in result &&
    typeof (result as { response?: unknown }).response === "string"
  ) {
    text = (result as { response: string }).response;
  } else {
    text = JSON.stringify(result);
  }

  return Response.json({ answer: text, citations: citations.length ? citations : undefined });
}
