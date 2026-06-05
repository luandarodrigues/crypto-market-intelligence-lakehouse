from pathlib import Path


def test_github_publish_files_exist():
    required = [
        Path("LICENSE"),
        Path(".github/workflows/ci.yml"),
        Path(".github/workflows/refresh_snapshot.yml"),
    ]
    missing = [str(path) for path in required if not path.exists()]
    assert missing == []


def test_refresh_workflow_supports_schedule_and_manual_run():
    workflow = Path(".github/workflows/refresh_snapshot.yml").read_text(encoding="utf-8")

    assert "workflow_dispatch:" in workflow
    assert "schedule:" in workflow
    assert "scripts/run_bronze.py" in workflow
    assert "scripts/export_public_artifacts.py" in workflow
    assert "git push" in workflow
