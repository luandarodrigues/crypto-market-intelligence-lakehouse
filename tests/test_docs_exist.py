from pathlib import Path


def test_core_docs_exist():
    root = Path("docs")
    required = [
        root / "architecture.md",
        root / "data_model.md",
        root / "source_inventory.md",
        root / "feature_catalog.md",
        root / "publication_plan.md",
    ]
    missing = [str(path) for path in required if not path.exists()]
    assert missing == []
