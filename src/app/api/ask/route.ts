import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: Request) {
  const { env } = getRequestContext();

  const body = (await req.json().catch(() => null)) as null | { q?: string };
  const q = body?.q?.toString().trim() ?? "";

  if (q.length < 3) {
    return Response.json({ error: "Question too short" }, { status: 400 });
  }

  // Cloudflare Workers AI binding (recommended): bind as `AI` in Cloudflare.
  // https://developers.cloudflare.com/workers-ai/
  const ai = (env as { AI?: { run: (model: string, input: Record<string, unknown>) => Promise<unknown> } }).AI;
  if (!ai) {
    return Response.json(
      {
        error:
          "Workers AI binding not configured. Bind AI in Cloudflare Pages/Workers as `AI`.",
      },
      { status: 500 }
    );
  }

  const prompt = [
    "You are QuickQuery AI.",
    "Give a direct answer first.",
    "- If it's a simple question (math, definition): answer in 1 line.",
    "- Otherwise: use at most 3 short bullets.",
    "- No long explanations unless the user asks.",
    "Question: " + q,
  ].join("\n");

  const result = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
    prompt,
    max_tokens: 220,
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

  return Response.json({ answer: text });
}
