import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: Request) {
  // No DB by design. We just accept + log for now.
  // (Useful for Cloudflare request logs / analytics pipelines.)
  const { env } = getRequestContext();

  const body = (await req.json().catch(() => null)) as
    | null
    | {
        query?: string;
        answer?: string;
        vote?: "up" | "down" | null;
        ts?: number;
        ua?: string;
      };

  const vote = body?.vote === "up" || body?.vote === "down" ? body.vote : null;

  // eslint-disable-next-line no-console
  console.log("feedback", {
    vote,
    query: typeof body?.query === "string" ? body?.query.slice(0, 300) : "",
    answerPreview: typeof body?.answer === "string" ? body?.answer.slice(0, 300) : "",
    ts: typeof body?.ts === "number" ? body.ts : Date.now(),
    ua: typeof body?.ua === "string" ? body.ua.slice(0, 200) : "",
    hasEnv: Boolean(env),
  });

  return Response.json({ ok: true });
}
