from src.publish.export_gold import build_public_attention_record
from scripts.export_public_artifacts import build_portfolio_summary_rows


def test_build_public_attention_record_keeps_explanation_fields():
    row = build_public_attention_record(
        symbol="BTC",
        narrative="bitcoin_ecosystem",
        attention_score=8.35,
        top_driver="derivatives_positioning",
        regime_tag="bearish_attention",
        confirmation_score=0.6667,
    )
    assert row["symbol"] == "BTC"
    assert row["regime_tag"] == "bearish_attention"
    assert row["confirmation_score"] == 0.6667


def test_build_portfolio_summary_rows_formats_attention_for_markdown():
    rows = build_portfolio_summary_rows(
        attention_rows=[
            {
                "symbol": "BTC",
                "narrative": "bitcoin_ecosystem",
                "attention_score": 8.35,
                "confirmation_score": 0.6667,
                "top_driver": "derivatives_positioning",
                "regime_tag": "bearish_attention",
            }
        ],
        narrative_rows=[
            {
                "narrative": "bitcoin_ecosystem",
                "asset_count": 1,
                "avg_attention_score": 8.35,
                "avg_confirmation_score": 0.6667,
            }
        ],
    )
    assert "BTC" in rows["asset_markdown"]
    assert "bitcoin_ecosystem" in rows["narrative_markdown"]
