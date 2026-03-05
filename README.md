# QuickQuery AI

A minimal Q&A website powered by **Cloudflare Workers AI**.

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

4. Configure binding:
   - Settings → Functions → Bindings → **AI** (Workers AI) with binding name: `AI`

5. Deploy.

## API

- `POST /api/ask` with JSON: `{ "q": "..." }`

Returns:
```json
{ "answer": "..." }
```

## Notes

- This is an MVP. Add rate limiting + caching before sharing broadly.
