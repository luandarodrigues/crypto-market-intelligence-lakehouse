EXCLUDED_SYMBOLS = {
    "-",
    "USDT",
    "USDC",
    "USDS",
    "FDUSD",
    "TUSD",
    "DAI",
}


SUPPORTED_ASSETS = {
    "BTC",
    "ETH",
    "SOL",
    "XRP",
    "BNB",
    "DOGE",
    "ADA",
    "LINK",
    "AAVE",
    "UNI",
    "MKR",
    "ARB",
    "OP",
    "STRK",
    "AVAX",
    "SUI",
    "TAO",
    "FET",
    "PEPE",
    "ONDO",
    "RENDER",
    "AKT",
    "ORDI",
    "LDO",
    "ENA",
    "EIGEN",
}


def should_exclude_asset(symbol: str) -> bool:
    return symbol.upper() in EXCLUDED_SYMBOLS


def is_supported_asset(symbol: str) -> bool:
    return symbol.upper() in SUPPORTED_ASSETS
