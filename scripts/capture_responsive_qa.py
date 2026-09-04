"""Capture responsive QA evidence for legacy and doctor-owned page systems.

The script preserves the complete Dr. Lay compatibility catalog while also sampling
concept and legacy routes for Pantego Dental, PerioDDS, and Dental World. It checks
the assigned survey, practice policy profile, Call/Text controls, access to the
keyboard-reachable chat control, consultation wording, and horizontal overflow at
both the selected mobile viewport and a desktop browser view.
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
# Preserve the complete original Dr. Lay compatibility set.
VARIANTS = [f"v{number}" for number in range(1, 14)]
DOCTOR_SAMPLES = [
    ("pantego-concept", "/lp/pantego-dental/concepts/night-to-clarity", "75op3Tl4LTjPkaXI1zhb", "pantego-dental"),
    ("pantego-legacy", "/lp/pantego-dental/legacy/v4/pantego-tx", "75op3Tl4LTjPkaXI1zhb", "pantego-dental"),
    ("periodds-concept", "/lp/periodds/concepts/clinical-confidence", "pvHcEcGNjxhXI3L8lSrE", "periodds"),
    ("periodds-legacy", "/lp/periodds/legacy/v6/rockwall-tx", "pvHcEcGNjxhXI3L8lSrE", "periodds"),
    ("dental-world-concept", "/lp/dental-world/concepts/family-comfort", "Rx0LnsI0XLu8JfhiDnYc", "dental-world"),
    ("dental-world-legacy", "/lp/dental-world/legacy/v8/longwood-fl", "Rx0LnsI0XLu8JfhiDnYc", "dental-world"),
    ("pantego-video-partner", "/go/pantego-dental/partner-disrupted-sleep", "75op3Tl4LTjPkaXI1zhb", "pantego-dental"),
    ("periodds-video-morning", "/go/periodds/waking-unrefreshed-video", "pvHcEcGNjxhXI3L8lSrE", "periodds"),
    ("dental-world-video-focus", "/go/dental-world/daytime-brain-fog-video", "Rx0LnsI0XLu8JfhiDnYc", "dental-world"),
    ("pantego-video-breathing", "/go/pantego-dental/nighttime-breathing-sounds", "75op3Tl4LTjPkaXI1zhb", "pantego-dental"),
]

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
        env={**os.environ, "PORT": str(PORT), "PRACTICE_CONFIG_FILE": "/tmp/bbt-responsive-qa-practices.json"},
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    try:
        wait_for_server()
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(executable_path=os.environ.get("CHROMIUM_EXECUTABLE", "/usr/bin/chromium"))
            routes = [(f"legacy-{variant}", f"/dr-lay/{variant}", "75op3Tl4LTjPkaXI1zhb", "pantego-dental") for variant in VARIANTS]
            routes.extend(DOCTOR_SAMPLES)
            for name, route, survey_id, practice_key in routes:
                url = f"{BASE_URL}{route}"
                for label, context_options in (("mobile", MOBILE), ("desktop", DESKTOP)):
                    page = browser.new_page(**context_options)
                    # External analytics placeholders can keep network requests open;
                    # DOM readiness plus a short visual settle is the stable QA gate.
                    page.goto(url, wait_until="domcontentloaded", timeout=30000)
                    page.locator("h1").first.wait_for(timeout=8000)
                    page.wait_for_timeout(700)
                    html = page.content().lower()
                    if "ghl-form" in html:
                        raise AssertionError(f"Retired form placeholder found in {name} {label}")
                    if "free consultation" in html:
                        raise AssertionError(f"Retired free-consultation wording found in {name} {label}")
                    if not page.locator(f'iframe[src*="survey/{survey_id}"]').count():
                        raise AssertionError(f"Assigned survey missing in {name} {label}")
                    if not page.locator(f'a[href="/care/{practice_key}/privacy"]').count() or not page.locator(f'a[href="/care/{practice_key}/terms"]').count() or not page.locator(f'a[href="/care/{practice_key}/accessibility"]').count():
                        raise AssertionError(f"Practice policy links missing in {name} {label}")
                    top_phone = page.locator('.top-phone')
                    if not top_phone.count():
                        raise AssertionError(f"Top phone treatment missing in {name} {label}")
                    if not page.locator('.top-text').count():
                        raise AssertionError(f"Top Text action missing in {name} {label}")
                    launcher = page.locator('.chat-launcher')
                    if not launcher.count():
                        raise AssertionError(f"Chat launcher missing in {name} {label}")
                    launcher.click()
                    if not page.locator('.chat-panel:not([hidden])').count():
                        raise AssertionError(f"Chat panel did not open in {name} {label}")
                    page.locator('.chat-close').click()
                    if not page.locator('.reasons-section').count() or not page.locator('.oral-appliance-section').count():
                        raise AssertionError(f"Shared symptom-to-treatment guidance missing in {name} {label}")
                    if not page.locator('.dentist-profile-section').count() or not page.locator('.dentist-credential-icon').count():
                        raise AssertionError(f"Dentist profile or credential icons missing in {name} {label}")
                    if page.locator('.landing-v3').count() and not page.locator('.signal-list .signal-icon').count():
                        raise AssertionError(f"Medical symptom icons missing from canonical recognition list in {name} {label}")
                    if page.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1"):
                        raise AssertionError(f"Horizontal overflow found in {name} {label}")
                    if "-video-" in name:
                        video = page.locator(".landing-hero-video")
                        poster = page.locator(".landing-hero-poster")
                        if video.count() != 1 or poster.count() != 1:
                            raise AssertionError(f"Video hero and poster fallback must both render in {name} {label}")
                        if not video.evaluate("node => node.autoplay && node.muted && node.defaultMuted && !node.controls && node.loop && node.playsInline && node.preload === 'metadata'"):
                            raise AssertionError(f"Decorative video settings are incomplete in {name} {label}")
                        if not video.evaluate("node => node.querySelector('source[type=\"video/mp4\"]')?.getAttribute('src')?.startsWith('/assets/video/')"):
                            raise AssertionError(f"Optimized MP4 source missing in {name} {label}")
                        if not video.evaluate("node => node.readyState >= 1 && !node.paused"):
                            raise AssertionError(f"Muted hero video did not become playable in {name} {label}")
                    page.screenshot(path=str(OUT / f"{name}-{label}.png"), full_page=True)
                    page.close()
                    print(f"captured {name} {label}")
                if "-video-" in name:
                    reduced_page = browser.new_page(**MOBILE)
                    reduced_page.emulate_media(reduced_motion="reduce")
                    reduced_page.goto(url, wait_until="domcontentloaded", timeout=30000)
                    reduced_page.locator("h1").first.wait_for(timeout=8000)
                    if reduced_page.locator(".landing-hero-video").evaluate("node => getComputedStyle(node).display") != "none":
                        raise AssertionError(f"Reduced-motion video is not hidden in {name}")
                    if reduced_page.locator(".landing-hero-poster").evaluate("node => getComputedStyle(node).display") == "none":
                        raise AssertionError(f"Reduced-motion poster fallback is not visible in {name}")
                    reduced_page.screenshot(path=str(OUT / f"{name}-reduced-motion.png"), full_page=True)
                    reduced_page.close()
                    print(f"captured {name} reduced-motion")
            browser.close()
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()


if __name__ == "__main__":
    capture()
