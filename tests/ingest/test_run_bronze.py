from src.ingest.binance import BinanceClient
from src.ingest.coingecko import CoinGeckoClient
from src.ingest.defillama import DefiLlamaClient
from scripts.run_bronze import collect_public_bronze_rows


class FakeResponse:
    def __init__(self, payload):
        self._payload = payload

    def raise_for_status(self):
        return None

    def json(self):
        return self._payload


class FakeSession:
    def __init__(self, payload):
        self.payload = payload

    def get(self, url, params=None, timeout=30):
        return FakeResponse(self.payload)


def test_collect_public_bronze_rows_returns_four_source_rows():
    coingecko = CoinGeckoClient(
        base_url="https://api.coingecko.com/api/v3",
        session=FakeSession([{"id": "bitcoin", "symbol": "btc"}]),
    )
    binance = BinanceClient(
        base_url="https://fapi.binance.com",
        session=FakeSession({"symbol": "BTCUSDT", "openInterest": "123.45"}),
    )
    defillama = DefiLlamaClient(
        base_url="https://api.llama.fi",
        session=FakeSession([{"name": "Aave"}]),
    )
    rows = collect_public_bronze_rows(coingecko=coingecko, binance=binance, defillama=defillama)
    assert len(rows) == 4
    assert rows[0]["source_name"] == "coingecko"
    assert rows[1]["source_name"] == "binance"
    assert rows[2]["endpoint_name"] == "funding_rate"
    assert rows[3]["source_name"] == "defillama"
