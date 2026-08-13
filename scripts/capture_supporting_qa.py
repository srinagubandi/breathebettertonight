"""Capture visual QA evidence for all TY/TY-BT and shared legal routes."""
from __future__ import annotations

import os
import subprocess
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "qa" / "supporting"
PORT = 8093
BASE = f"http://127.0.0.1:{PORT}"
VARIANTS = ["v1", "v2", "v3", "v4", "v5", "v6"]
DEVICES = {
    "mobile": {
        "viewport": {"width": 414, "height": 896},
        "device_scale_factor": 2,
        "is_mobile": True,
        "has_touch": True,
    },
    "desktop": {"viewport": {"width": 1440, "height": 1100}, "device_scale_factor": 1},
}


def wait_for_server() -> None:
    for _ in range(25):
        try:
            with urllib.request.urlopen(f"{BASE}/privacy-policy", timeout=1) as response:
                if response.status == 200:
                    return
        except Exception:
            time.sleep(0.4)
    raise RuntimeError("Local server did not become ready")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    server = subprocess.Popen(
        ["node", "server.js"], cwd=ROOT, env={**os.environ, "PORT": str(PORT)},
        stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True,
    )
    try:
        wait_for_server()
        pages = []
        for variant in VARIANTS:
            pages.append((f"{variant}-thank-you", f"/dr-lay/{variant}/thank-you"))
            pages.append((f"{variant}-thank-you-bt", f"/dr-lay/{variant}/thank-you-bt"))
        pages.extend([("privacy-policy", "/privacy-policy"), ("terms-and-conditions", "/terms-and-conditions")])

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            for name, route in pages:
                for label, options in DEVICES.items():
                    page = browser.new_page(**options)
                    page.goto(f"{BASE}{route}", wait_until="domcontentloaded", timeout=30000)
                    page.wait_for_timeout(350)
                    if page.locator('.chat-launcher').count():
                        page.locator('.chat-launcher').click()
                        if not page.locator('.chat-panel:not([hidden])').count():
                            raise AssertionError(f"Chat did not open for {name} {label}")
                    page.screenshot(path=str(OUT / f"{name}-{label}.png"), full_page=True)
                    page.close()
                    print(f"captured {name} {label}")
            browser.close()
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()


if __name__ == "__main__":
    main()
