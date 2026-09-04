"""Capture local responsive QA screenshots for every configured Dr. Lay LP variant.

This script is intentionally reusable. It starts the local Express server, captures
both the selected US mobile viewport (414×896) and a 1440px desktop browser view,
then asserts that every preserved LP uses the assigned Pantego survey handoff and
the new practice-specific legal/accessibility route profile.
"""
from __future__ import annotations

import os
import subprocess
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "qa" / "responsive"
PORT = 8091
BASE_URL = f"http://127.0.0.1:{PORT}"
# Keep this list aligned with the current data-driven variant inventory in src/data/dr-lay.js.
VARIANTS = [f"v{number}" for number in range(1, 14)]

MOBILE = {
    "viewport": {"width": 414, "height": 896},
    "device_scale_factor": 2,
    "is_mobile": True,
    "has_touch": True,
    "user_agent": (
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
        "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 "
        "Mobile/15E148 Safari/604.1"
    ),
}
DESKTOP = {"viewport": {"width": 1440, "height": 1100}, "device_scale_factor": 1}


def wait_for_server() -> None:
    import urllib.request

    for _ in range(25):
        try:
            with urllib.request.urlopen(f"{BASE_URL}/dr-lay/v1", timeout=1) as response:
                if response.status == 200:
                    return
        except Exception:
            time.sleep(0.4)
    raise RuntimeError("Local server did not become ready")


def capture() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    server = subprocess.Popen(
        ["node", "server.js"],
        cwd=ROOT,
        env={**os.environ, "PORT": str(PORT)},
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    try:
        wait_for_server()
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_EXECUTABLE", "/usr/bin/chromium"))
            for variant in VARIANTS:
                url = f"{BASE_URL}/dr-lay/{variant}"
                for label, context_options in (("mobile", MOBILE), ("desktop", DESKTOP)):
                    page = browser.new_page(**context_options)
                    # External analytics placeholders can keep network requests open;
                    # DOM readiness plus a short visual settle is the stable QA gate.
                    page.goto(url, wait_until="domcontentloaded", timeout=30000)
                    page.locator("h1").first.wait_for(timeout=8000)
                    page.wait_for_timeout(700)
                    html = page.content().lower()
                    if "ghl-form" in html:
                        raise AssertionError(f"Retired form placeholder found in {variant} {label}")
                    if not page.locator('iframe[src*="survey/75op3Tl4LTjPkaXI1zhb"]').count():
                        raise AssertionError(f"Assigned Pantego survey missing in {variant} {label}")
                    if not page.locator('a[href="/care/pantego-dental/privacy"]').count() or not page.locator('a[href="/care/pantego-dental/terms"]').count() or not page.locator('a[href="/care/pantego-dental/accessibility"]').count():
                        raise AssertionError(f"Practice policy links missing in {variant} {label}")
                    top_phone = page.locator('.top-phone')
                    if not top_phone.count():
                        raise AssertionError(f"Top phone treatment missing in {variant} {label}")
                    if not page.locator('.top-text').count():
                        raise AssertionError(f"Top Text action missing in {variant} {label}")
                    launcher = page.locator('.chat-launcher')
                    if not launcher.count():
                        raise AssertionError(f"Chat launcher missing in {variant} {label}")
                    launcher.click()
                    if not page.locator('.chat-panel:not([hidden])').count():
                        raise AssertionError(f"Chat panel did not open in {variant} {label}")
                    page.locator('.chat-close').click()
                    page.screenshot(path=str(OUT / f"{variant}-{label}.png"), full_page=True)
                    page.close()
                    print(f"captured {variant} {label}")
            browser.close()
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()


if __name__ == "__main__":
    capture()
