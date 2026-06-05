from pathlib import Path


def test_project_scaffold_files_exist():
    root = Path("work/crypto-market-intelligence-lakehouse")
    required = [
        root / "README.md",
        root / ".gitignore",
        root / "pyproject.toml",
        root / ".env.example",
    ]
    missing = [str(path) for path in required if not path.exists()]
    assert missing == []
