from src.features.market_features import compute_relative_strength


def test_compute_relative_strength_beats_btc():
    value = compute_relative_strength(asset_return=0.12, benchmark_return=0.05)
    assert value == 0.07
