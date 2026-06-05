import json
from datetime import datetime, timezone
from pathlib import Path
import sys


PROJECT_ROOT = Path(__file__).resolve().parents[1]
WORKSPACE_ROOT = PROJECT_ROOT.parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.bronze.writers import read_jsonl_rows, write_jsonl_rows
from src.publish.export_gold import build_public_attention_record


def build_portfolio_summary_rows(attention_rows: list[dict], narrative_rows: list[dict]) -> dict[str, str]:
    asset_lines = [
        "| Symbol | Narrative | Attention | Confirmation | Driver | Regime |",
        "|---|---|---:|---:|---|---|",
    ]
    for row in attention_rows:
        asset_lines.append(
            f"| {row['symbol']} | {row['narrative']} | {row['attention_score']:.3f} | {row['confirmation_score']:.4f} | {row['top_driver']} | {row['regime_tag']} |"
        )

    narrative_lines = [
        "| Narrative | Assets | Avg Attention | Avg Confirmation |",
        "|---|---:|---:|---:|",
    ]
    for row in narrative_rows:
        narrative_lines.append(
            f"| {row['narrative']} | {row['asset_count']} | {row['avg_attention_score']:.3f} | {row['avg_confirmation_score']:.4f} |"
        )

    return {
        "asset_markdown": "\n".join(asset_lines),
        "narrative_markdown": "\n".join(narrative_lines),
    }


def build_portfolio_report(attention_rows: list[dict], narrative_rows: list[dict]) -> str:
    summary = build_portfolio_summary_rows(
        attention_rows=attention_rows[:8],
        narrative_rows=narrative_rows[:8],
    )
    return "\n".join(
        [
            "# Crypto Market Intelligence Report",
            "",
            "## What This Project Shows",
            "",
            "- A public crypto market intelligence pipeline built from bronze to gold.",
            "- Integration of spot market, derivatives, and on-chain style signals.",
            "- A portfolio-facing output that ranks assets and narratives by attention, not price prediction alone.",
            "",
            "## Current Snapshot",
            "",
            summary["asset_markdown"],
            "",
            "## Narrative View",
            "",
            summary["narrative_markdown"],
            "",
            "## Architecture",
            "",
            "- Bronze: raw public API snapshots from CoinGecko, Binance, and DefiLlama.",
            "- Silver: normalized market, derivatives, and on-chain records.",
            "- Features: relative strength, volume context, open interest, funding, and capital efficiency.",
            "- Gold: asset attention, driver flags, and narrative aggregation.",
            "",
            "## Why This Is Strong For Portfolio Positioning",
            "",
            "- It demonstrates modern data-product structure instead of notebook-only analysis.",
            "- It shows how to combine analytics engineering with market reasoning.",
            "- It creates an output that is interpretable enough for a hiring manager and concrete enough for a technical reviewer.",
            "",
            "Generated from the local bronze -> silver -> features -> gold pipeline.",
        ]
    )


def build_site_payload(attention_rows: list[dict], narrative_rows: list[dict]) -> dict:
    top_assets = attention_rows[:8]
    top_narratives = narrative_rows[:6]
    asset_count = len(attention_rows)
    narrative_count = len({row["narrative"] for row in attention_rows})
    bullish_count = sum(1 for row in attention_rows if row["regime_tag"] == "bullish_attention")
    bearish_count = sum(1 for row in attention_rows if row["regime_tag"] == "bearish_attention")
    mixed_count = sum(1 for row in attention_rows if row["regime_tag"] == "mixed_attention")

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "headline": {
            "title": "Crypto Market Intelligence Lakehouse",
            "subtitle": "A Databricks-oriented market intelligence platform for spotting which crypto assets and narratives deserve attention, and why.",
        },
        "overview": {
            "asset_count": asset_count,
            "narrative_count": narrative_count,
            "bullish_count": bullish_count,
            "bearish_count": bearish_count,
            "mixed_count": mixed_count,
        },
        "top_assets": top_assets,
        "top_narratives": top_narratives,
        "architecture": [
            "Bronze: raw public API snapshots from CoinGecko, Binance, and DefiLlama.",
            "Silver: normalized market, derivatives, and on-chain records.",
            "Features: relative strength, volume context, open interest, funding, and capital efficiency.",
            "Gold: asset attention, driver flags, and narrative aggregation.",
        ],
        "signals": [
            {"name": "Relative Strength", "description": "Short-horizon price context for spotting assets already moving with intent."},
            {"name": "Open Interest", "description": "Derivatives positioning used as a proxy for participation and leverage."},
            {"name": "Funding Rate", "description": "Crowding-style signal that helps separate healthy momentum from stretched positioning."},
            {"name": "Capital Efficiency", "description": "DEX activity relative to TVL, used as an on-chain confirmation signal."},
        ],
        "next_steps": [
            "Expand the live asset universe beyond the current first curated set and widen narrative coverage.",
            "Replace local development artifacts with Delta-backed Databricks tables and scheduled jobs.",
            "Add a deeper interactive product layer with richer explorer views, filters, and explanatory panels.",
            "Introduce stronger market concepts such as open-interest momentum, narrative breadth, and cross-asset rotation.",
        ],
    }


def build_site_data_script(payload: dict) -> str:
    return "window.CMIL_SITE_DATA = " + json.dumps(payload, indent=2) + ";\n"


def main() -> None:
    gold_root = PROJECT_ROOT / "artifacts" / "gold"
    attention_rows = read_jsonl_rows(gold_root / "attention.jsonl")
    narrative_rows = read_jsonl_rows(gold_root / "narratives.jsonl")

    public_rows = [
        build_public_attention_record(
            symbol=row["symbol"],
            narrative=row["narrative"],
            attention_score=row["attention_score"],
            top_driver=row["top_driver"],
            regime_tag=row["regime_tag"],
            confirmation_score=row["confirmation_score"],
        )
        for row in attention_rows
    ]

    outputs_root = WORKSPACE_ROOT / "outputs"
    write_jsonl_rows(outputs_root / "crypto_attention_public.jsonl", public_rows)

    summary_path = outputs_root / "crypto-market-intelligence-summary.md"
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    summary_path.write_text(build_portfolio_report(attention_rows, narrative_rows), encoding="utf-8")

    site_root = PROJECT_ROOT / "site"
    site_root.mkdir(parents=True, exist_ok=True)
    site_data_path = site_root / "site_data.js"
    site_data_path.write_text(
        build_site_data_script(build_site_payload(attention_rows, narrative_rows)),
        encoding="utf-8",
    )
    print(f"public artifacts exported to {outputs_root}")


if __name__ == "__main__":
    main()
