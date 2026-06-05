def compute_tvl_growth(current_tvl: float, prior_tvl: float) -> float:
    if prior_tvl == 0:
        return 0.0
    return (current_tvl - prior_tvl) / prior_tvl
