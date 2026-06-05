import certifi
import requests


def build_public_session(verify_ssl: bool = True) -> requests.Session:
    session = requests.Session()
    session.verify = certifi.where() if verify_ssl else False
    return session
