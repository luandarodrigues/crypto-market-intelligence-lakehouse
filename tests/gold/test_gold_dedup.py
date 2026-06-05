from scripts.run_gold import build_gold_outputs


def test_build_gold_outputs_keeps_one_row_per_symbol():
    feature_rows = {
        "market": [
            {
                "symbol": "BTC",
                "close_price": 67000.0,
                "quote_volume": 50000000000.0,
                "relative_strength_24h": -5.6,
                "relative_strength_7d": -11.7,
                "relative_strength_30d": -14.2,
            },
            {
                "symbol": "BTC",
                "close_price": 67000.0,
                "quote_volume": 50000000000.0,
                "relative_strength_24h": -5.6,
                "relative_strength_7d": -11.7,
                "relative_strength_30d": -14.2,
            },
        ],
        "derivatives": [],
        "onchain": [],
    }
    outputs = build_gold_outputs(feature_rows)
    assert len(outputs["attention"]) == 1
