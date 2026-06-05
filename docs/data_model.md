# Data Model

## Core Entities

### Asset

The project uses a curated asset universe rather than every symbol returned by public APIs.

Key logic:

- Supported assets are defined in `src/domain/asset_universe.py`
- Stablecoins and placeholders are excluded before gold ranking

This keeps the output aligned with portfolio-quality research instead of noisy raw market dumps.

### Narrative

Narratives are the cross-asset grouping layer used to aggregate attention and frame market rotation.

Current narrative set:

- bitcoin_ecosystem
- ethereum_ecosystem
- layer1
- layer2
- defi
- restaking_modular
- ai_data
- meme_social_beta
- rwa
- depin_infra

Seed assets live in `src/domain/narratives.py`, while gold logic also applies explicit overrides where needed.

## Layer Outputs

### Bronze

Row shape:

- `source_name`
- `endpoint_name`
- `payload`
- `extracted_at`

Bronze is intentionally raw and source-oriented.

### Silver

`market.jsonl`

- `symbol`
- `close_price`
- `quote_volume`
- `price_change_pct_24h`
- `price_change_pct_7d`
- `price_change_pct_30d`

`derivatives.jsonl`

- `symbol`
- `funding_rate`
- `open_interest`

`onchain.jsonl`

- `symbol`
- `tvl_usd`
- `dex_volume_usd`

### Features

`market_features.jsonl`

- `symbol`
- `close_price`
- `quote_volume`
- `relative_strength_24h`
- `relative_strength_7d`
- `relative_strength_30d`

`derivatives_features.jsonl`

- `symbol`
- `funding_rate`
- `open_interest`

`onchain_features.jsonl`

- `symbol`
- `tvl_usd`
- `dex_volume_usd`
- `capital_efficiency`

### Gold

`attention.jsonl`

- `symbol`
- `narrative`
- `attention_score`
- `confirmation_score`
- `top_driver`
- `regime_tag`

`drivers.jsonl`

- `symbol`
- `crowding_flag`
- `breadth_flag`
- `regime_tag`

`narratives.jsonl`

- `narrative`
- `asset_count`
- `avg_attention_score`
- `avg_confirmation_score`

## Modeling Notes

- Narrative assignment is currently rule-based and intentionally transparent.
- Confirmation is derived from feature availability across market, derivatives, and on-chain layers.
- Narrative aggregates are built from the best retained asset-level attention rows after filtering and deduplication.
