def normalize_market_row(raw_row: dict) -> dict:
    return {
        "symbol": raw_row["symbol"].upper(),
        "close_price": raw_row["current_price"],
        "quote_volume": raw_row["total_volume"],
        "price_change_pct_24h": raw_row.get("price_change_percentage_24h_in_currency"),
        "price_change_pct_7d": raw_row.get("price_change_percentage_7d_in_currency"),
        "price_change_pct_30d": raw_row.get("price_change_percentage_30d_in_currency"),
    }
