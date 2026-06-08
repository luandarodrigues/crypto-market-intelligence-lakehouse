from src.domain.asset_universe import (
    get_supported_derivatives_symbols,
    is_supported_asset,
    should_exclude_asset,
)
from scripts.run_gold import assign_narrative


def test_should_exclude_asset_filters_stablecoins_and_placeholder_symbols():
    assert should_exclude_asset("USDT") is True
    assert should_exclude_asset("USDC") is True
    assert should_exclude_asset("-") is True
    assert should_exclude_asset("BTC") is False


def test_is_supported_asset_accepts_curated_symbols():
    assert is_supported_asset("BTC") is True
    assert is_supported_asset("ETH") is True
    assert is_supported_asset("SOL") is True
    assert is_supported_asset("INJ") is True
    assert is_supported_asset("PENDLE") is True
    assert is_supported_asset("LAB") is False


def test_assign_narrative_uses_expanded_mapping():
    assert assign_narrative("BTC") == "bitcoin_ecosystem"
    assert assign_narrative("ETH") == "ethereum_ecosystem"
    assert assign_narrative("ARB") == "layer2"
    assert assign_narrative("AAVE") == "defi"
    assert assign_narrative("ADA") == "layer1"
    assert assign_narrative("BNB") == "layer1"
    assert assign_narrative("LINK") == "defi"
    assert assign_narrative("XRP") == "layer1"
    assert assign_narrative("ATOM") == "cosmos_interop"
    assert assign_narrative("JUP") == "solana_ecosystem"


def test_supported_derivatives_symbols_expose_curated_universe():
    symbols = get_supported_derivatives_symbols()
    assert "BTCUSDT" in symbols
    assert "ETHUSDT" in symbols
    assert "SOLUSDT" in symbols
