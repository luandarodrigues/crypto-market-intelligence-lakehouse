from src.silver.derivatives_tables import normalize_derivatives_row


def test_normalize_derivatives_row_maps_binance_camel_case_fields():
    row = normalize_derivatives_row({"symbol": "btcusdt", "openInterest": "123.45", "fundingRate": "0.01"})
    assert row["symbol"] == "BTCUSDT"
    assert row["open_interest"] == "123.45"
    assert row["funding_rate"] == "0.01"
