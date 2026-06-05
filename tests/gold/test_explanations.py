from src.gold.explanations import build_driver_flags


def test_build_driver_flags_marks_crowding():
    flags = build_driver_flags(funding_zscore=2.3, breadth_ratio=0.25)
    assert flags["crowding_flag"] is True
    assert flags["breadth_flag"] == "narrow"


def test_build_driver_flags_marks_regime_direction():
    flags = build_driver_flags(
        funding_zscore=0.4,
        breadth_ratio=0.8,
        relative_strength_24h=3.0,
        relative_strength_7d=8.0,
    )
    assert flags["regime_tag"] == "bullish_attention"


def test_build_driver_flags_marks_bearish_attention():
    flags = build_driver_flags(
        funding_zscore=-0.2,
        breadth_ratio=0.8,
        relative_strength_24h=-4.0,
        relative_strength_7d=-10.0,
    )
    assert flags["regime_tag"] == "bearish_attention"
