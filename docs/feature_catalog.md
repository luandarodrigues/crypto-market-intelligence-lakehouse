# Feature Catalog

## Purpose

The feature layer is where raw market records start becoming decision-support signals. The current implementation favors interpretable features that are common in crypto monitoring and research workflows.

## Market Structure Features

- `quote_volume`
  Used as a liquidity and participation proxy.
- `relative_strength_24h`
  Uses the 24h market move already present in the normalized market feed.
- `relative_strength_7d`
  Derived from 7d price change through the shared relative strength helper.
- `relative_strength_30d`
  Preserved for longer-horizon context.

## Derivatives Features

- `funding_rate`
  Used as a positioning and potential crowding proxy.
- `open_interest`
  Used as a participation and leverage proxy.

## On-Chain And DeFi Features

- `tvl_usd`
  Baseline measure of capital committed to a protocol or ecosystem proxy.
- `dex_volume_usd`
  Activity measure used to distinguish idle TVL from active usage.
- `capital_efficiency`
  Computed as `dex_volume_usd / tvl_usd` when TVL is available.

## Gold-Level Concepts

These concepts are not all stored as standalone columns yet, but they already shape the gold output.

- `attention_score`
  Combines volume, short-horizon strength, capital efficiency, and open interest.
- `confirmation_score`
  Measures whether market, derivatives, and on-chain layers are all contributing evidence.
- `top_driver`
  Labels the dominant explanation as volume, derivatives positioning, or on-chain confirmation.
- `regime_tag`
  Classifies the current asset state as bullish, bearish, or mixed attention.
- `crowding_flag`
  Highlights potentially crowded positioning when funding-based pressure is elevated.
- `breadth_flag`
  Distinguishes narrow from broad confirmation.

## Near-Term Extensions

The current scaffold leaves room for stronger signals such as:

- open-interest momentum
- liquidation imbalance
- category-relative breadth
- narrative participation concentration
- performance vs BTC benchmark instead of zero baseline
