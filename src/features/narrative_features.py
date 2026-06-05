def compute_breadth_ratio(confirming_assets: int, total_assets: int) -> float:
    if total_assets == 0:
        return 0.0
    return confirming_assets / total_assets
