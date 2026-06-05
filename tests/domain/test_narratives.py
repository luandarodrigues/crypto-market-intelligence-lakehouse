from src.domain.narratives import NARRATIVE_UNIVERSE, get_seed_assets


def test_narrative_universe_contains_expected_groups():
    expected = {
        "bitcoin_ecosystem",
        "ethereum_ecosystem",
        "layer1",
        "layer2",
        "defi",
        "restaking_modular",
        "ai_data",
        "meme_social_beta",
        "rwa",
        "depin_infra",
    }
    assert expected.issubset(set(NARRATIVE_UNIVERSE))


def test_seed_assets_exist_for_core_narratives():
    assert "BTC" in get_seed_assets("bitcoin_ecosystem")
    assert "ETH" in get_seed_assets("ethereum_ecosystem")
