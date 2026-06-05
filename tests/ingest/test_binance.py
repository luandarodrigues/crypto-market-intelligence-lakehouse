from src.ingest.binance import BinanceClient


def test_binance_client_strips_trailing_slash():
    client = BinanceClient(base_url="https://fapi.binance.com/")
    assert client.base_url == "https://fapi.binance.com"
