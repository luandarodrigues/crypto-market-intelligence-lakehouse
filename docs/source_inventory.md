# Source Inventory

## Current Public Sources

### CoinGecko

Role:

- asset market snapshots
- price and volume context
- 24h, 7d, and 30d price change fields

Current use:

- populated in bronze by `run_bronze.py`
- normalized into `silver/market.jsonl`

### Binance

Role:

- derivatives positioning signals

Current use:

- open interest snapshot
- latest funding rate snapshot
- normalized into `silver/derivatives.jsonl`

Current limitation:

- the scaffold currently fetches `BTCUSDT` derivatives data only, which is enough to prove the pipeline shape but not yet full market coverage

### DefiLlama

Role:

- protocol and on-chain/DeFi activity proxies

Current use:

- protocol list ingestion
- normalized TVL and DEX-volume-style fields
- transformed into capital efficiency in the feature layer

## Why These Sources Work For The First Version

- They are public and reproducible
- They cover three distinct market surfaces
- They support a credible narrative around spot, derivatives, and on-chain integration

## Planned Source Expansion

- broader Binance symbol coverage
- better category and narrative mapping
- additional on-chain or DEX activity sources
- optional upgrade path to paid providers for institutional-style depth
