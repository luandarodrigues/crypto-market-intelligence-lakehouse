from src.config.settings import AppSettings


def test_settings_read_public_ssl_verify_from_environment(monkeypatch):
    monkeypatch.setenv("PUBLIC_SSL_VERIFY", "false")
    settings = AppSettings.from_env()
    assert settings.public_ssl_verify is False
