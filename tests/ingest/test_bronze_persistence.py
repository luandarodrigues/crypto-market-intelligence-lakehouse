import json
from pathlib import Path

from src.bronze.writers import append_jsonl_rows


def test_append_jsonl_rows_writes_one_json_per_line():
    output_dir = Path("work/crypto-market-intelligence-lakehouse/artifacts/test_output")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "bronze.jsonl"
    if output_path.exists():
        output_path.unlink()
    rows = [
        {"source_name": "coingecko", "payload": {"id": "bitcoin"}},
        {"source_name": "binance", "payload": {"symbol": "BTCUSDT"}},
    ]
    append_jsonl_rows(output_path, rows)
    contents = output_path.read_text(encoding="utf-8").strip().splitlines()
    assert len(contents) == 2
    assert json.loads(contents[0])["source_name"] == "coingecko"
