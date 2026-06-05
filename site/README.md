# Microsite Publishing

This directory contains the static portfolio microsite for the project.

## Local Structure

- `index.html`: single-page case study
- `styles.css`: visual system and layout
- `app.js`: client-side rendering from local snapshot data
- `site_data.js`: generated snapshot used by the page

## Refreshing The Snapshot

Run:

```powershell
python scripts/export_public_artifacts.py
```

This refreshes:

- `outputs/crypto-market-intelligence-summary.md`
- `outputs/crypto_attention_public.jsonl`
- `site/site_data.js`

## Deploy

### Vercel

Point Vercel at the repository root. The included `vercel.json` rewrites `/` to `site/index.html`.

### GitHub Pages

Publish the `site/` directory as a static artifact, or copy its contents into your Pages publish directory.
