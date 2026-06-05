from scripts.run_silver import build_silver_outputs


def test_build_silver_outputs_splits_rows_by_source():
    bronze_rows = [
        {
            "source_name": "coingecko",
            "payload": {"items": [{"symbol": "eth", "current_price": 3800.0, "total_volume": 1000.0}]},
        },
        {
            "source_name": "binance",
            "endpoint_name": "open_interest",
            "payload": {"symbol": "btcusdt", "funding_rate": 0.01, "open_interest": 100.0},
        },
        {
            "source_name": "binance",
            "endpoint_name": "funding_rate",
            "payload": [{"symbol": "BTCUSDT", "fundingRate": "0.02"}],
        },
        {
            "source_name": "defillama",
            "payload": {"items": [{"symbol": "uni", "tvl": 1000.0, "dex_volume_usd": 500.0}]},
        },
    ]
    outputs = build_silver_outputs(bronze_rows)
    assert outputs["market"][0]["symbol"] == "ETH"
    assert outputs["derivatives"][0]["symbol"] == "BTCUSDT"
    assert outputs["derivatives"][0]["funding_rate"] == "0.02"
    assert outputs["onchain"][0]["symbol"] == "UNI"
