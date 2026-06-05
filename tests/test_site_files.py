from pathlib import Path


def test_site_files_exist():
    root = Path("site")
    required = [
        root / "index.html",
        root / "styles.css",
        root / "app.js",
        root / "site_data.js",
    ]
    missing = [str(path) for path in required if not path.exists()]
    assert missing == []
