from src.domain.entities import NarrativeDefinition


NARRATIVE_UNIVERSE = {
    "bitcoin_ecosystem": NarrativeDefinition("bitcoin_ecosystem", "Bitcoin Ecosystem", ("BTC", "ORDI")),
    "ethereum_ecosystem": NarrativeDefinition("ethereum_ecosystem", "Ethereum Ecosystem", ("ETH", "LDO")),
    "layer1": NarrativeDefinition("layer1", "Layer 1", ("SOL", "AVAX", "SUI")),
    "layer2": NarrativeDefinition("layer2", "Layer 2", ("ARB", "OP", "STRK")),
    "defi": NarrativeDefinition("defi", "DeFi", ("AAVE", "UNI", "MKR")),
    "restaking_modular": NarrativeDefinition("restaking_modular", "Restaking and Modular", ("ENA", "EIGEN")),
    "ai_data": NarrativeDefinition("ai_data", "AI and Data", ("TAO", "FET")),
    "meme_social_beta": NarrativeDefinition("meme_social_beta", "Meme and Social Beta", ("DOGE", "PEPE")),
    "rwa": NarrativeDefinition("rwa", "RWA", ("ONDO", "MKR")),
    "depin_infra": NarrativeDefinition("depin_infra", "DePIN and Infrastructure", ("RENDER", "AKT")),
}


def get_seed_assets(narrative_key: str) -> tuple[str, ...]:
    return NARRATIVE_UNIVERSE[narrative_key].seed_assets
