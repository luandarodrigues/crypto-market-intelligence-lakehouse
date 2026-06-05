from pathlib import Path

from src.bronze.writers import append_jsonl_rows, read_jsonl_rows


def test_read_jsonl_rows_round_trips_written_rows():
    output_path = Path("work/crypto-market-intelligence-lakehouse/artifacts/test_output/reader.jsonl")
    if output_path.exists():
        output_path.unlink()
    rows = [{"source_name": "coingecko"}, {"source_name": "binance"}]
    append_jsonl_rows(output_path, rows)
    loaded = read_jsonl_rows(output_path)
    assert len(loaded) == 2
    assert loaded[1]["source_name"] == "binance"
