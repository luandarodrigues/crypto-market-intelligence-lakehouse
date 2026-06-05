def build_canonical_asset_row(
    symbol: str,
    asset_id: str,
    narratives: tuple[str, ...],
    source_ids: dict[str, str],
) -> dict:
    return {
        "symbol": symbol,
        "asset_id": asset_id,
        "primary_narrative": narratives[0],
        "narratives": list(narratives),
        "source_ids": source_ids,
    }
