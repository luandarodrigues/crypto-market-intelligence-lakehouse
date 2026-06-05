from src.silver.canonical_assets import build_canonical_asset_row


def test_canonical_asset_row_merges_symbol_and_narratives():
    row = build_canonical_asset_row(
        symbol="ETH",
        asset_id="ethereum",
        narratives=("ethereum_ecosystem", "layer1"),
        source_ids={"coingecko": "ethereum"},
    )
    assert row["symbol"] == "ETH"
    assert row["primary_narrative"] == "ethereum_ecosystem"
    assert "layer1" in row["narratives"]
