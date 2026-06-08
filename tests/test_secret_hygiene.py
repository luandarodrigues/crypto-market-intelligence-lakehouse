from pathlib import Path
import re


ROOT = Path(".")

FORBIDDEN_PATH_PATTERNS = (
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.staging",
    ".env.test",
)

FORBIDDEN_SUFFIXES = (
    ".pem",
    ".key",
    ".p12",
    ".pfx",
    ".crt",
    ".cer",
    ".db",
    ".sqlite",
    ".sqlite3",
)

SECRET_PATTERNS = (
    re.compile(r"ghp_[A-Za-z0-9]{20,}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{20,}"),
    re.compile(r"sk-[A-Za-z0-9]{20,}"),
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"AIza[0-9A-Za-z_-]{35}"),
)

TEXT_EXTENSIONS = {
    ".py",
    ".yml",
    ".yaml",
    ".json",
    ".jsonl",
    ".md",
    ".txt",
    ".html",
    ".css",
    ".js",
    ".toml",
    ".example",
}


def iter_repo_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if any(part in {".git", ".pytest_cache", "__pycache__", ".venv", "artifacts", "outputs"} for part in path.parts):
            continue
        files.append(path)
    return files


def test_repo_does_not_track_sensitive_filename_patterns():
    forbidden: list[str] = []
    for path in iter_repo_files():
        path_string = path.as_posix()
        if path.name in FORBIDDEN_PATH_PATTERNS:
            forbidden.append(path_string)
        if path.suffix.lower() in FORBIDDEN_SUFFIXES:
            forbidden.append(path_string)

    assert forbidden == []


def test_repo_does_not_contain_obvious_secret_patterns():
    matches: list[str] = []
    for path in iter_repo_files():
        if path.suffix.lower() not in TEXT_EXTENSIONS and path.name != ".env.example":
            continue
        content = path.read_text(encoding="utf-8", errors="ignore")
        for pattern in SECRET_PATTERNS:
            found = pattern.search(content)
            if found:
                matches.append(f"{path.as_posix()}: {found.group(0)[:12]}...")

    assert matches == []
