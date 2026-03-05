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

  const prompt = `Answer the user's question concisely in 5-8 bullet points.\n\nQuestion: ${q}`;

  const result = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
    prompt,
    max_tokens: 500,
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
