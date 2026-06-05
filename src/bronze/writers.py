import json
from pathlib import Path


def build_bronze_row(source_name: str, endpoint_name: str, payload: dict, extracted_at: str) -> dict:
    return {
        "source_name": source_name,
        "endpoint_name": endpoint_name,
        "payload": payload,
        "extracted_at": extracted_at,
        "schema_version": 1,
    }


def append_jsonl_rows(output_path: Path, rows: list[dict]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("a", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=True) + "\n")


def write_jsonl_rows(output_path: Path, rows: list[dict]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=True) + "\n")


def read_jsonl_rows(input_path: Path) -> list[dict]:
    with input_path.open("r", encoding="utf-8") as handle:
        return [json.loads(line) for line in handle if line.strip()]
