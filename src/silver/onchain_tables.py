def normalize_onchain_row(raw_row: dict) -> dict:
    return {
        "symbol": raw_row["symbol"].upper(),
        "tvl_usd": raw_row.get("tvl_usd", raw_row.get("tvl")),
        "dex_volume_usd": raw_row.get("dex_volume_usd"),
    }
