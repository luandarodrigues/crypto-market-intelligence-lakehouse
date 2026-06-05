# Architecture

## Goal

The architecture is designed to show how a crypto research workflow can be structured like a modern analytical platform instead of a loose collection of notebooks. The project uses a medallion-style flow and is intentionally shaped so the local development path can graduate into Databricks jobs and Delta-backed tables.

## Layers

### Bronze

Bronze captures raw public API snapshots with source metadata and extraction timestamps.

- Source clients live in `src/ingest`
- Bronze writers and readers live in `src/bronze/writers.py`
- The current bronze snapshot is written by `scripts/run_bronze.py`

Bronze currently stores:

- CoinGecko market snapshots
- Binance open interest
- Binance funding rate
- DefiLlama protocol snapshots

### Silver

Silver standardizes each source into more stable analytical shapes.

- `market.jsonl` for market records
- `derivatives.jsonl` for open interest and funding
- `onchain.jsonl` for TVL and DEX-style activity proxies

Normalization is handled in:

- `src/silver/market_tables.py`
- `src/silver/derivatives_tables.py`
- `src/silver/onchain_tables.py`

### Features

The feature layer converts normalized records into reusable analytical signals.

- Market features: price, quote volume, relative strength
- Derivatives features: funding rate, open interest
- On-chain features: TVL, DEX volume, capital efficiency

This stage is built in `scripts/run_features.py`.

### Gold

Gold is the decision-facing layer.

- `attention.jsonl` ranks assets by attention
- `drivers.jsonl` explains crowding, breadth, and regime
- `narratives.jsonl` aggregates asset outputs into narrative-level attention

This stage is built in `scripts/run_gold.py`.

## Current Data Flow

```text
CoinGecko    \
Binance       -> bronze/public_sources.jsonl
DefiLlama    /

bronze/public_sources.jsonl
  -> silver/market.jsonl
  -> silver/derivatives.jsonl
  -> silver/onchain.jsonl

silver/*
  -> features/market_features.jsonl
  -> features/derivatives_features.jsonl
  -> features/onchain_features.jsonl

features/*
  -> gold/attention.jsonl
  -> gold/drivers.jsonl
  -> gold/narratives.jsonl

gold/*
  -> outputs/crypto-market-intelligence-summary.md
  -> outputs/crypto_attention_public.jsonl
```

## Why The Structure Matters

- It separates ingestion concerns from analytical logic.
- It makes feature engineering easier to validate and extend.
- It creates a cleaner path to Databricks jobs, Delta tables, and public consumption layers.
