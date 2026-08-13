#!/usr/bin/env python3
"""Retrying production verification for every data-generated Railway route."""
from __future__ import annotations

import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

# This script imports the route list through a small Node-export file written below
# to keep production verification aligned with the live data-driven route system.

BASE_URL = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'https://breathebettertonight-web-production.up.railway.app'
ROUTE_FILE = ROOT / 'qa' / 'production-routes.txt'


def fetch(url: str) -> tuple[int, str]:
    last_error = ''
    for attempt in range(1, 4):
        try:
            with urllib.request.urlopen(url, timeout=20) as response:
                return response.status, response.read().decode('utf-8', errors='ignore').lower()
        except (urllib.error.URLError, TimeoutError) as error:
            last_error = str(error)
            time.sleep(attempt * 1.2)
    raise RuntimeError(last_error)


def main() -> None:
    routes = [line.strip() for line in ROUTE_FILE.read_text().splitlines() if line.strip()]
    failures: list[str] = []

    for index, route in enumerate(routes, start=1):
        try:
            status, html = fetch(f'{BASE_URL}{route}')
            if status != 200:
                failures.append(f'{route}: HTTP {status}')
            elif 'gohighlevel' in html or 'ghl-form' in html or 'consultation form' in html:
                failures.append(f'{route}: retired form marker found')
        except Exception as error:
            failures.append(f'{route}: {error}')
        if index % 30 == 0:
            print(f'checked {index}/{len(routes)}')

    if failures:
        print('\n'.join(failures))
        raise SystemExit(1)
    print(f'PASS: {len(routes)} Railway routes returned 200 with no retired form marker.')


if __name__ == '__main__':
    main()
