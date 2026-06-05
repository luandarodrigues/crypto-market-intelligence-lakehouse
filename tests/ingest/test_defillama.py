from src.ingest.defillama import DefiLlamaClient


def test_defillama_client_strips_trailing_slash():
    client = DefiLlamaClient(base_url="https://api.llama.fi/")
    assert client.base_url == "https://api.llama.fi"
