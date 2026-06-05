from math import log10


def compute_attention_score(
    quote_volume: float,
    relative_strength_24h: float,
    relative_strength_7d: float,
    capital_efficiency: float = 0.0,
    open_interest: float = 0.0,
) -> float:
    volume_component = 0.0 if quote_volume <= 0 else log10(quote_volume)
    oi_component = 0.0 if open_interest <= 0 else log10(open_interest)
    strength_24h_component = abs(relative_strength_24h)
    strength_7d_component = abs(relative_strength_7d)
    score = (
        volume_component * 0.35
        + strength_24h_component * 0.2
        + strength_7d_component * 0.25
        + capital_efficiency * 10 * 0.1
        + oi_component * 0.1
    )
    return round(score, 6)


def build_attention_row(symbol: str, narrative: str, attention_score: float, confirmation_score: float) -> dict:
    return {
        "symbol": symbol,
        "narrative": narrative,
        "attention_score": attention_score,
        "confirmation_score": confirmation_score,
    }
