export const runtime = "edge";

export function GET() {
  const base = "https://quickquery-ai.pages.dev";
  const urls = [
    "",
    "/about",
    "/privacy",
    "/terms",
  ];

  const now = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${base}${u}</loc>
    <lastmod>${now}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
