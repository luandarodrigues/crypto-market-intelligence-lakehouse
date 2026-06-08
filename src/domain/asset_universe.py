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
    "AVAX",
    "SUI",
    "APT",
    "DOT",
    "ATOM",
    "NEAR",
    "TRX",
    "LTC",
    "BCH",
    "SEI",
    "INJ",
    "JUP",
    "WIF",
    "AAVE",
    "UNI",
    "MKR",
    "ARB",
    "OP",
    "STRK",
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
    "PENDLE",
    "LDO",
    "TON",
    "HBAR",
}


SUPPORTED_DERIVATIVES_SYMBOLS = (
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
    "XRPUSDT",
    "BNBUSDT",
    "DOGEUSDT",
    "ADAUSDT",
    "LINKUSDT",
    "AVAXUSDT",
    "AAVEUSDT",
    "UNIUSDT",
    "DOTUSDT",
    "ATOMUSDT",
    "NEARUSDT",
    "TRXUSDT",
    "LTCUSDT",
    "BCHUSDT",
    "APTUSDT",
    "SUIUSDT",
    "ARBUSDT",
    "OPUSDT",
    "STRKUSDT",
    "PEPEUSDT",
    "WIFUSDT",
    "RENDERUSDT",
    "TAOUSDT",
    "FETUSDT",
    "ENAUSDT",
    "ONDOUSDT",
    "SEIUSDT",
)


def should_exclude_asset(symbol: str) -> bool:
    return symbol.upper() in EXCLUDED_SYMBOLS


def is_supported_asset(symbol: str) -> bool:
    return symbol.upper() in SUPPORTED_ASSETS


def get_supported_derivatives_symbols() -> tuple[str, ...]:
    return SUPPORTED_DERIVATIVES_SYMBOLS
