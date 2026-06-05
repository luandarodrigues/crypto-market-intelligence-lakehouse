from src.publish.export_gold import build_public_attention_record


def test_public_attention_record_hides_internal_noise():
    row = build_public_attention_record(
        symbol="TAO",
        narrative="ai_data",
        attention_score=0.91,
        top_driver="onchain_confirmation",
    )
    assert row == {
        "symbol": "TAO",
        "narrative": "ai_data",
        "attention_score": 0.91,
        "top_driver": "onchain_confirmation",
    }
