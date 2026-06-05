from src.config.settings import AppSettings
from src.ingest.coingecko import CoinGeckoClient


def test_settings_load_default_public_endpoints():
    settings = AppSettings()
    assert "coingecko" in settings.coingecko_base_url
    assert "binance" in settings.binance_base_url
    assert "llama" in settings.defillama_base_url


def test_coingecko_client_builds_market_params():
    client = CoinGeckoClient(base_url="https://api.coingecko.com/api/v3")
    params = client.build_markets_params(vs_currency="usd", page=1, per_page=50)
    assert params["vs_currency"] == "usd"
    assert params["per_page"] == 50
