from pathlib import Path


def test_databricks_bundle_files_exist():
    root = Path("work/crypto-market-intelligence-lakehouse")
    assert (root / "databricks.yml").exists()
    assert (root / "resources/jobs/pipeline_job.yml").exists()
