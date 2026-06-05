from src.gold.attention_engine import build_attention_row


def test_build_attention_row_keeps_rank_inputs_visible():
    row = build_attention_row(
        symbol="SOL",
        narrative="layer1",
        attention_score=0.84,
        confirmation_score=0.67,
    )
    assert row["symbol"] == "SOL"
    assert row["attention_score"] == 0.84
    assert row["confirmation_score"] == 0.67


def test_compute_attention_score_combines_volume_and_strength():
    from src.gold.attention_engine import compute_attention_score

    score = compute_attention_score(
        quote_volume=1000.0,
        relative_strength_24h=2.0,
        relative_strength_7d=3.0,
        capital_efficiency=0.5,
        open_interest=100.0,
    )
    assert score > 0
