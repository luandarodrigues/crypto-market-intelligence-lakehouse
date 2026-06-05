from dataclasses import dataclass


@dataclass(frozen=True)
class NarrativeDefinition:
    key: str
    label: str
    seed_assets: tuple[str, ...]
