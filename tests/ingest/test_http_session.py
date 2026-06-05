import certifi

from src.ingest.http import build_public_session


def test_build_public_session_uses_certifi_bundle():
    session = build_public_session()
    assert session.verify == certifi.where()


def test_build_public_session_allows_ssl_disable():
    session = build_public_session(verify_ssl=False)
    assert session.verify is False
