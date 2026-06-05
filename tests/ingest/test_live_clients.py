from src.ingest.binance import BinanceClient
from src.ingest.coingecko import CoinGeckoClient
from src.ingest.defillama import DefiLlamaClient


class FakeResponse:
    def __init__(self, payload):
        self._payload = payload

    def raise_for_status(self) -> None:
        return None

    def json(self):
        return self._payload


class FakeSession:
    def __init__(self, payload):
        self.payload = payload
        self.calls = []

    def get(self, url, params=None, timeout=30):
        self.calls.append({"url": url, "params": params, "timeout": timeout})
        return FakeResponse(self.payload)


def test_coingecko_fetch_markets_uses_expected_endpoint():
    session = FakeSession(payload=[{"id": "bitcoin"}])
    client = CoinGeckoClient(base_url="https://api.coingecko.com/api/v3", session=session)
    payload = client.fetch_markets(vs_currency="usd", page=1, per_page=10)
    assert payload == [{"id": "bitcoin"}]
    assert session.calls[0]["url"].endswith("/coins/markets")
    assert session.calls[0]["params"]["per_page"] == 10


def test_binance_fetch_open_interest_uses_expected_endpoint():
    session = FakeSession(payload={"openInterest": "123.45", "symbol": "BTCUSDT"})
    client = BinanceClient(base_url="https://fapi.binance.com", session=session)
    payload = client.fetch_open_interest(symbol="BTCUSDT")
    assert payload["symbol"] == "BTCUSDT"
    assert session.calls[0]["url"].endswith("/fapi/v1/openInterest")
    assert session.calls[0]["params"]["symbol"] == "BTCUSDT"


def test_binance_fetch_funding_rate_uses_expected_endpoint():
    session = FakeSession(payload=[{"symbol": "BTCUSDT", "fundingRate": "0.01"}])
    client = BinanceClient(base_url="https://fapi.binance.com", session=session)
    payload = client.fetch_funding_rate(symbol="BTCUSDT", limit=1)
    assert payload[0]["symbol"] == "BTCUSDT"
    assert session.calls[0]["url"].endswith("/fapi/v1/fundingRate")
    assert session.calls[0]["params"]["limit"] == 1


def test_defillama_fetch_protocols_uses_expected_endpoint():
    session = FakeSession(payload=[{"name": "Aave"}])
    client = DefiLlamaClient(base_url="https://api.llama.fi", session=session)
    payload = client.fetch_protocols()
    assert payload == [{"name": "Aave"}]
    assert session.calls[0]["url"].endswith("/protocols")
