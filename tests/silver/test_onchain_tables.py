from src.silver.onchain_tables import normalize_onchain_row


def test_normalize_onchain_row_maps_defillama_tvl_field():
    row = normalize_onchain_row({"symbol": "uni", "tvl": 1000.0, "dex_volume_usd": 500.0})
    assert row["symbol"] == "UNI"
    assert row["tvl_usd"] == 1000.0
