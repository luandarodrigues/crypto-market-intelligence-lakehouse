def normalize_derivatives_row(raw_row: dict) -> dict:
    return {
        "symbol": raw_row["symbol"].upper(),
        "funding_rate": raw_row.get("funding_rate", raw_row.get("fundingRate")),
        "open_interest": raw_row.get("open_interest", raw_row.get("openInterest")),
    }
