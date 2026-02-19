def estimate_cost(text: str):
    tokens = len(text.split())
    cost = tokens * 0.000002  # fake estimation for tracking
    return tokens, round(cost, 6)
