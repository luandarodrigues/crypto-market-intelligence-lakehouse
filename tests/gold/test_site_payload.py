from scripts.export_public_artifacts import build_site_data_script, build_site_payload


def test_build_site_payload_summarizes_attention_and_regimes():
    payload = build_site_payload(
        attention_rows=[
            {
                "symbol": "BTC",
                "narrative": "bitcoin_ecosystem",
                "attention_score": 8.35,
                "confirmation_score": 0.6667,
                "top_driver": "derivatives_positioning",
                "regime_tag": "bearish_attention",
            },
            {
                "symbol": "SOL",
                "narrative": "layer1",
                "attention_score": 6.46,
                "confirmation_score": 0.3333,
                "top_driver": "volume_strength",
                "regime_tag": "mixed_attention",
            },
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
    assert payload["overview"]["asset_count"] == 2
    assert payload["overview"]["narrative_count"] == 2
    assert payload["overview"]["bearish_count"] == 1
    assert payload["overview"]["mixed_count"] == 1
    assert payload["top_assets"][0]["symbol"] == "BTC"


def test_build_site_data_script_creates_browser_global():
    script = build_site_data_script({"headline": {"title": "Demo"}})
    assert script.startswith("window.CMIL_SITE_DATA = ")
    assert '"title": "Demo"' in script
