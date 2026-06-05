def compute_oi_momentum(current_oi: float, prior_oi: float) -> float:
    if prior_oi == 0:
        return 0.0
    return (current_oi - prior_oi) / prior_oi
