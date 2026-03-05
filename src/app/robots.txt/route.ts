export const runtime = "edge";

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://quickquery-ai.pages.dev/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
