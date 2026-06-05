from pathlib import Path


def test_github_publish_files_exist():
    required = [
        Path("LICENSE"),
        Path(".github/workflows/ci.yml"),
    ]
    missing = [str(path) for path in required if not path.exists()]
    assert missing == []
