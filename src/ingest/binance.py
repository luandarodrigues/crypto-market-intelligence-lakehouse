import requests

from src.ingest.http import build_public_session


class BinanceClient:
    def __init__(self, base_url: str, session=None, verify_ssl: bool = True) -> None:
        self.base_url = base_url.rstrip("/")
        self.session = session or build_public_session(verify_ssl=verify_ssl)

    def fetch_open_interest(self, symbol: str) -> dict:
        response = self.session.get(
            f"{self.base_url}/fapi/v1/openInterest",
            params={"symbol": symbol},
            timeout=30,
        )
        response.raise_for_status()
        return response.json()

    def fetch_funding_rate(self, symbol: str, limit: int = 1) -> list[dict]:
        response = self.session.get(
            f"{self.base_url}/fapi/v1/fundingRate",
            params={"symbol": symbol, "limit": limit},
            timeout=30,
        )
        response.raise_for_status()
        return response.json()
