from scripts.run_gold import aggregate_narratives


def test_aggregate_narratives_groups_attention_by_narrative():
    attention_rows = [
        {"symbol": "BTC", "narrative": "bitcoin_ecosystem", "attention_score": 8.0, "confirmation_score": 0.66},
        {"symbol": "ORDI", "narrative": "bitcoin_ecosystem", "attention_score": 4.0, "confirmation_score": 0.33},
        {"symbol": "SOL", "narrative": "layer1", "attention_score": 6.0, "confirmation_score": 0.33},
    ]
    rows = aggregate_narratives(attention_rows)
    assert rows[0]["narrative"] == "bitcoin_ecosystem"
    assert rows[0]["asset_count"] == 2
    assert rows[0]["avg_attention_score"] == 6.0
