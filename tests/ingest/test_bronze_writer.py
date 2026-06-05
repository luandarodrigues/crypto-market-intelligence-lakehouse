from src.bronze.writers import build_bronze_row


def test_build_bronze_row_adds_metadata():
    row = build_bronze_row(
        source_name="coingecko",
        endpoint_name="coins_markets",
        payload={"id": "bitcoin", "symbol": "btc"},
        extracted_at="2026-06-02T14:00:00Z",
    )
    assert row["source_name"] == "coingecko"
    assert row["endpoint_name"] == "coins_markets"
    assert row["payload"]["id"] == "bitcoin"
    assert row["extracted_at"] == "2026-06-02T14:00:00Z"
