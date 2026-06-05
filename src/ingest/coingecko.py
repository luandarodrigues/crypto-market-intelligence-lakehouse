import requests

from src.ingest.http import build_public_session


class CoinGeckoClient:
    def __init__(self, base_url: str, session=None, verify_ssl: bool = True) -> None:
        self.base_url = base_url.rstrip("/")
        self.session = session or build_public_session(verify_ssl=verify_ssl)

    def build_markets_params(self, vs_currency: str, page: int, per_page: int) -> dict[str, str | int]:
        return {
            "vs_currency": vs_currency,
            "page": page,
            "per_page": per_page,
            "price_change_percentage": "24h,7d,30d",
        }

    def fetch_markets(self, vs_currency: str, page: int, per_page: int) -> list[dict]:
        response = self.session.get(
            f"{self.base_url}/coins/markets",
            params=self.build_markets_params(vs_currency=vs_currency, page=page, per_page=per_page),
            timeout=30,
        )
        response.raise_for_status()
        return response.json()
