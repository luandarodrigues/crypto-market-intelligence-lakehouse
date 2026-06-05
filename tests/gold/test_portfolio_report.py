from scripts.export_public_artifacts import build_portfolio_report


def test_build_portfolio_report_includes_key_sections():
    report = build_portfolio_report(
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
    assert "# Crypto Market Intelligence Report" in report
    assert "## What This Project Shows" in report
    assert "BTC" in report
    assert "bitcoin_ecosystem" in report
