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


def test_site_includes_blueprint_and_asset_explorer_hooks():
    html = Path("site/index.html").read_text(encoding="utf-8")
    js = Path("site/app.js").read_text(encoding="utf-8")

    assert 'id="blueprint-section"' in html
    assert "asset_explorer_rows" in js
    assert 'id="compare-asset-filter"' in html
    assert 'id="narrative-pulse"' in html
    assert "narrative_explorer_rows" in js
