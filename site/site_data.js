window.CMIL_SITE_DATA = {
  "generated_at": "2026-06-04T19:13:12.307845+00:00",
  "headline": {
    "title": "Crypto Market Intelligence Lakehouse",
    "subtitle": "A Databricks-oriented market intelligence platform for spotting which crypto assets and narratives deserve attention, and why."
  },
  "overview": {
    "asset_count": 8,
    "narrative_count": 5,
    "bullish_count": 0,
    "bearish_count": 7,
    "mixed_count": 1
  },
  "top_assets": [
    {
      "symbol": "BTC",
      "narrative": "bitcoin_ecosystem",
      "attention_score": 8.350192,
      "confirmation_score": 0.6667,
      "top_driver": "derivatives_positioning",
      "regime_tag": "bearish_attention"
    },
    {
      "symbol": "ADA",
      "narrative": "layer1",
      "attention_score": 6.50028,
      "confirmation_score": 0.3333,
      "top_driver": "volume_strength",
      "regime_tag": "bearish_attention"
    },
    {
      "symbol": "SOL",
      "narrative": "layer1",
      "attention_score": 6.462739,
      "confirmation_score": 0.3333,
      "top_driver": "volume_strength",
      "regime_tag": "bearish_attention"
    },
    {
      "symbol": "XRP",
      "narrative": "layer1",
      "attention_score": 6.228887,
      "confirmation_score": 0.3333,
      "top_driver": "volume_strength",
      "regime_tag": "bearish_attention"
    },
    {
      "symbol": "ETH",
      "narrative": "ethereum_ecosystem",
      "attention_score": 6.089575,
      "confirmation_score": 0.3333,
      "top_driver": "volume_strength",
      "regime_tag": "bearish_attention"
    },
    {
      "symbol": "LINK",
      "narrative": "defi",
      "attention_score": 6.023451,
      "confirmation_score": 0.3333,
      "top_driver": "volume_strength",
      "regime_tag": "bearish_attention"
    },
    {
      "symbol": "DOGE",
      "narrative": "meme_social_beta",
      "attention_score": 5.480893,
      "confirmation_score": 0.3333,
      "top_driver": "volume_strength",
      "regime_tag": "bearish_attention"
    },
    {
      "symbol": "BNB",
      "narrative": "layer1",
      "attention_score": 4.078558,
      "confirmation_score": 0.3333,
      "top_driver": "volume_strength",
      "regime_tag": "mixed_attention"
    }
  ],
  "top_narratives": [
    {
      "narrative": "bitcoin_ecosystem",
      "asset_count": 1,
      "avg_attention_score": 8.350192,
      "avg_confirmation_score": 0.6667
    },
    {
      "narrative": "ethereum_ecosystem",
      "asset_count": 1,
      "avg_attention_score": 6.089575,
      "avg_confirmation_score": 0.3333
    },
    {
      "narrative": "defi",
      "asset_count": 1,
      "avg_attention_score": 6.023451,
      "avg_confirmation_score": 0.3333
    },
    {
      "narrative": "layer1",
      "asset_count": 4,
      "avg_attention_score": 5.817616,
      "avg_confirmation_score": 0.3333
    },
    {
      "narrative": "meme_social_beta",
      "asset_count": 1,
      "avg_attention_score": 5.480893,
      "avg_confirmation_score": 0.3333
    }
  ],
  "architecture": [
    "Bronze: raw public API snapshots from CoinGecko, Binance, and DefiLlama.",
    "Silver: normalized market, derivatives, and on-chain records.",
    "Features: relative strength, volume context, open interest, funding, and capital efficiency.",
    "Gold: asset attention, driver flags, and narrative aggregation."
  ],
  "signals": [
    {
      "name": "Relative Strength",
      "description": "Short-horizon price context for spotting assets already moving with intent."
    },
    {
      "name": "Open Interest",
      "description": "Derivatives positioning used as a proxy for participation and leverage."
    },
    {
      "name": "Funding Rate",
      "description": "Crowding-style signal that helps separate healthy momentum from stretched positioning."
    },
    {
      "name": "Capital Efficiency",
      "description": "DEX activity relative to TVL, used as an on-chain confirmation signal."
    }
  ],
  "next_steps": [
    "Broaden derivatives coverage beyond the current initial symbol set.",
    "Expand narrative mapping and category coverage.",
    "Materialize the same flow as Delta-backed Databricks jobs and tables.",
    "Add richer market concepts such as open-interest momentum and breadth by narrative."
  ]
};
