from pathlib import Path
from datetime import datetime, timezone
import sys


PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.bronze.writers import build_bronze_row, write_jsonl_rows
from src.config.settings import AppSettings
from src.ingest.binance import BinanceClient
from src.ingest.coingecko import CoinGeckoClient
from src.ingest.defillama import DefiLlamaClient


def collect_public_bronze_rows(
    coingecko: CoinGeckoClient,
    binance: BinanceClient,
    defillama: DefiLlamaClient,
) -> list[dict]:
    extracted_at = datetime.now(timezone.utc).isoformat()
    return [
        build_bronze_row(
            source_name="coingecko",
            endpoint_name="coins_markets",
            payload={"items": coingecko.fetch_markets(vs_currency="usd", page=1, per_page=25)},
            extracted_at=extracted_at,
        ),
        build_bronze_row(
            source_name="binance",
            endpoint_name="open_interest",
            payload=binance.fetch_open_interest(symbol="BTCUSDT"),
            extracted_at=extracted_at,
        ),
        build_bronze_row(
            source_name="binance",
            endpoint_name="funding_rate",
            payload=binance.fetch_funding_rate(symbol="BTCUSDT", limit=1),
            extracted_at=extracted_at,
        ),
        build_bronze_row(
            source_name="defillama",
            endpoint_name="protocols",
            payload={"items": defillama.fetch_protocols()},
            extracted_at=extracted_at,
        ),
    ]


def main() -> None:
    settings = AppSettings.from_env()
    rows = collect_public_bronze_rows(
        coingecko=CoinGeckoClient(base_url=settings.coingecko_base_url, verify_ssl=settings.public_ssl_verify),
        binance=BinanceClient(base_url=settings.binance_base_url, verify_ssl=settings.public_ssl_verify),
        defillama=DefiLlamaClient(base_url=settings.defillama_base_url, verify_ssl=settings.public_ssl_verify),
    )
    output_path = PROJECT_ROOT / settings.bronze_output_dir / "public_sources.jsonl"
    write_jsonl_rows(output_path, rows)
    print(f"bronze snapshot saved to {output_path}")


if __name__ == "__main__":
    main()
