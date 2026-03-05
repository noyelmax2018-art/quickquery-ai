# QuickQuery AI

A minimal Q&A website powered by **Cloudflare Workers AI** (Next.js on Cloudflare Pages via `@cloudflare/next-on-pages`).

## Features

- Short answers by default (1 sentence + up to 3 bullets)
- Optional web search citations (server-side, requires API key)
- Basic SEO routes: `/robots.txt` + `/sitemap.xml`
- Static pages: `/about` `/contact` `/privacy` `/terms`
- Monetization placeholders (AdSense slot + affiliate module)

## Local dev

```bash
npm install
npm run dev
```

Open: http://localhost:3000

Note: Cloudflare Workers AI bindings are not available in plain `next dev`.

## Cloudflare Pages deploy (recommended)

1. Push this folder to GitHub.
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → connect repo.
3. Build settings:
   - Framework preset: **Next.js**
   - Build command: `npm run build && npx @cloudflare/next-on-pages`
   - Build output: `.vercel/output/static`

4. Configure bindings / env vars

### Required

- **Workers AI binding** (Settings → Functions → Bindings):
  - Type: Workers AI
  - Binding name: `AI`

### Optional (web citations)

- `BRAVE_SEARCH_API_KEY` (server-side env var)
  - If set, the UI checkbox “Use web citations” will fetch top results from Brave Search.
  - If not set, the app still works, just without citations.

### Optional (SEO)

- `NEXT_PUBLIC_SITE_URL` (e.g. `https://quickquery.example.com`)
  - Used for canonical URLs + sitemap.

### Optional (monetization placeholders)

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (e.g. `ca-pub-xxxxxxxxxxxxxxx`)
- `NEXT_PUBLIC_ADSENSE_SLOT_1` (slot id)
- `NEXT_PUBLIC_AFFILIATE_DISCLOSURE` (override disclosure text)
- `NEXT_PUBLIC_CONTACT_EMAIL`

5. Deploy.

## API

- `POST /api/ask` with JSON: `{ "q": "...", "useWeb": true }`

Returns:
```json
{ "answer": "...", "citations": [{"title":"...","url":"..."}] }
```

## Notes / next steps

- Add rate limiting + abuse prevention.
- Add caching for repeated queries.
- Consider a dedicated search worker if you want richer citation extraction.
