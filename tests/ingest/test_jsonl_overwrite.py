import json
from pathlib import Path

from src.bronze.writers import write_jsonl_rows


def test_write_jsonl_rows_replaces_existing_file_contents():
    output_path = Path("work/crypto-market-intelligence-lakehouse/artifacts/test_output/overwrite.jsonl")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text('{"old": true}\n', encoding="utf-8")
    write_jsonl_rows(output_path, [{"new": True}])
    lines = output_path.read_text(encoding="utf-8").strip().splitlines()
    assert len(lines) == 1
    assert json.loads(lines[0])["new"] is True
