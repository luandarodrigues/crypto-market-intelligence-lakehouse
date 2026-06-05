def build_driver_flags(
    funding_zscore: float,
    breadth_ratio: float,
    relative_strength_24h: float = 0.0,
    relative_strength_7d: float = 0.0,
) -> dict:
    regime_tag = "mixed_attention"
    if relative_strength_24h > 0 and relative_strength_7d > 0:
        regime_tag = "bullish_attention"
    elif relative_strength_24h < 0 and relative_strength_7d < 0:
        regime_tag = "bearish_attention"
    return {
        "crowding_flag": funding_zscore >= 2.0,
        "breadth_flag": "narrow" if breadth_ratio < 0.4 else "broad",
        "regime_tag": regime_tag,
    }
