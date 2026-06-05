from src.silver.market_tables import normalize_market_row


def test_normalize_market_row_standardizes_symbol_case():
    row = normalize_market_row(
        {
            "symbol": "eth",
            "current_price": 3800.0,
            "total_volume": 1000000.0,
            "price_change_percentage_24h_in_currency": -3.1,
            "price_change_percentage_7d_in_currency": -7.4,
            "price_change_percentage_30d_in_currency": -17.5,
        }
    )
    assert row["symbol"] == "ETH"
    assert row["close_price"] == 3800.0
    assert row["price_change_pct_7d"] == -7.4
