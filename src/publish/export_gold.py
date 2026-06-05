def build_public_attention_record(
    symbol: str,
    narrative: str,
    attention_score: float,
    top_driver: str,
    regime_tag: str,
    confirmation_score: float,
) -> dict:
    return {
        "symbol": symbol,
        "narrative": narrative,
        "attention_score": attention_score,
        "top_driver": top_driver,
        "regime_tag": regime_tag,
        "confirmation_score": confirmation_score,
    }
