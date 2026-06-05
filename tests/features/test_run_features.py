from scripts.run_features import build_feature_outputs


def test_build_feature_outputs_creates_market_derivatives_and_onchain_rows():
    silver_rows = {
        "market": [
            {
                "symbol": "ETH",
                "close_price": 3800.0,
                "quote_volume": 1000000.0,
                "price_change_pct_24h": -3.1,
                "price_change_pct_7d": -7.4,
                "price_change_pct_30d": -17.5,
            }
        ],
        "derivatives": [
            {
                "symbol": "BTCUSDT",
                "funding_rate": "0.01",
                "open_interest": "123.45",
            }
        ],
        "onchain": [
            {
                "symbol": "UNI",
                "tvl_usd": 1000.0,
                "dex_volume_usd": 500.0,
            }
        ],
    }
    outputs = build_feature_outputs(silver_rows)
    assert outputs["market"][0]["symbol"] == "ETH"
    assert outputs["market"][0]["relative_strength_7d"] == -7.4
    assert outputs["derivatives"][0]["open_interest"] == 123.45
    assert outputs["onchain"][0]["capital_efficiency"] == 0.5
