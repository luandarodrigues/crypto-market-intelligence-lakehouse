from src.features.narrative_features import compute_breadth_ratio


def test_compute_breadth_ratio_counts_confirming_assets():
    ratio = compute_breadth_ratio(confirming_assets=6, total_assets=8)
    assert ratio == 0.75
