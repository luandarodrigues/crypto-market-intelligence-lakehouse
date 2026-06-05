# Publication Plan

## Publication Strategy

This project should be published in layers so it reads like a real platform:

1. GitHub repository for code, architecture, tests, and reproducibility
2. Databricks-facing deployment scaffold for platform credibility
3. Public portfolio artifacts for fast consumption by recruiters and hiring managers

## What Already Exists

- A repo scaffold with pipeline code, tests, and Databricks bundle placeholders
- Public exports in `outputs/`
- Editorial summary generation via `scripts/export_public_artifacts.py`

## Recommended Public Surface

### Repository

The repo should lead with:

- the problem statement
- why the project matters
- architecture
- current feature families
- sample gold output
- roadmap to a fuller Databricks implementation

### Portfolio Case Study

Use the exported summary in `outputs/crypto-market-intelligence-summary.md` as the seed for:

- a portfolio page
- a Notion case study
- a Vercel microsite

The page should emphasize:

- lakehouse framing
- current market concepts
- explainability of the gold layer
- distinction between market intelligence and naive price prediction

### Public Data Sample

Publish `outputs/crypto_attention_public.jsonl` as a lightweight sample of the gold layer.

## Suggested Sequence

1. Finalize repository docs
2. Add visual architecture and sample output excerpts
3. Publish repo
4. Build a lightweight public page on top of the exported outputs
5. Later, replace local artifacts with fuller Databricks execution screenshots or Delta-backed runs
