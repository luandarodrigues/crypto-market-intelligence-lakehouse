def compute_relative_strength(asset_return: float, benchmark_return: float) -> float:
    return round(asset_return - benchmark_return, 10)
