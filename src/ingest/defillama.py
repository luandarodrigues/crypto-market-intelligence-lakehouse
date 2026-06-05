import requests

from src.ingest.http import build_public_session


class DefiLlamaClient:
    def __init__(self, base_url: str, session=None, verify_ssl: bool = True) -> None:
        self.base_url = base_url.rstrip("/")
        self.session = session or build_public_session(verify_ssl=verify_ssl)

    def fetch_protocols(self) -> list[dict]:
        response = self.session.get(f"{self.base_url}/protocols", timeout=30)
        response.raise_for_status()
        return response.json()
