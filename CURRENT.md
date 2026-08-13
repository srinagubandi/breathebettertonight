# CURRENT — Breathe Better Tonight

> **Canonical project context and changelog.** Read this file before researching, generating assets, changing code, or deploying. Update it after every meaningful decision or implementation change to avoid duplicate compute and preserve reuse.

## Active Objective

Build and deploy six responsive, symptom-led lead-generation landing pages for **Dr. Willis Lay / Pantego Dental**. Every page must support a desktop experience and a mobile-first experience. The current work is focused on symptom awareness, not treatment-first messaging.

## Deployment and Version Control

| Item | Current Value |
|---|---|
| Git repository | `github.com/srinagubandi/breathebettertonight` |
| Active feature branch | `feature/symptom-led-lps-v2` |
| Production branch | `main` |
| Hosting target | Railway project `breathebettertonight` |
| Live base URL | `https://breathebettertonight-web-production.up.railway.app` |
| Route system | Auto-generated from `src/data/dr-lay.js` |

## Non-Negotiable Decisions

| Decision | Current Direction |
|---|---|
| Primary audience | Adults experiencing sleep-related symptoms and their partners; mobile-first, US market |
| Primary mobile review size | iPhone XR/iPhone 11 CSS viewport: **414 × 896** |
| Desktop review size | **1440px** browser width |
| Branding | Breathe Better Tonight; Logo 2 direction: navy mark with teal airflow accent |
| LP approach | Symptom-led and non-diagnostic; do not lead with CPAP alternatives, appliance claims, coverage, or guaranteed outcomes |
| Highest-priority symptom stack | Loud/frequent snoring; witnessed breathing pauses; gasping/choking; waking unrefreshed or daytime sleepiness |
| Supporting symptoms | Morning headaches; dry mouth/sore throat; focus/irritability; nighttime urination |
| Form status | **No GoHighLevel survey or form placeholder** in concepts or production pages until explicitly supplied |
| Provider content | Use clearly labeled doctor-photo, bio, and verified-review placeholders until approved content is supplied |
| Partner Impact hero | Use an **original, watermark-free** bright-bedroom image: sleeping/snoring adult on the left; awake partner with a pillow over one ear on the right. Do not copy stock photos. |
| Deployment discipline | Work on a feature branch, review local routes at mobile and desktop, then commit/tag/push and deploy to Railway |

## Approved LP Route Structure

Each route also has automatic `thank-you`, `thank-you-bt`, and optional city routes.

| Variant | Route | Symptom Angle | Theme |
|---|---|---|---|
| V1 — Symptom Self-Check | `/dr-lay/v1` | Snoring, pauses, gasping, waking tired | Navy / teal |
| V2 — The Morning After | `/dr-lay/v2` | Unrefreshed waking, headaches, dry mouth, brain fog | Charcoal / amber |
| V3 — Partner Signal | `/dr-lay/v3` | Partner-observed snoring, pauses, gasping, restless movement | Midnight / cyan |
| V4 — Energy Debt | `/dr-lay/v4` | Afternoon crash, focus, motivation, daytime sleepiness | Light / blue |
| V5 — Sleep Pattern Check | `/dr-lay/v5` | Night waking, shortness of breath, restless sleep, fatigue | Indigo / violet |
| V6 — Partner Impact | `/dr-lay/v6` | Snoring disrupting a partner’s rest | Navy / teal |

## Reusable Implementation Structure

| File / Area | Responsibility | Status |
|---|---|---|
| `src/data/dr-lay.js` | Six variant configurations, cities, profile placeholders, FAQs | Updated for symptom-led variants |
| `src/pages/lp/template.js` | One data-driven LP renderer for all variants | Replaced with symptom-led template; no GHL section |
| `src/shared/layout.js` | HTML shell, tracker placeholders, sticky header | Updated to target `#symptom-check` and load symptom CSS |
| `public/assets/css/symptom-lp.css` | Shared mobile-first responsive components | Created |
| `public/assets/css/theme-v1.css` | V1 existing theme | Reuse; may need variable normalization during QA |
| `public/assets/css/theme-v2.css` | V2 existing theme | Reuse; may need variable normalization during QA |
| `public/assets/css/theme-v3.css` | V3 Partner Signal | Theme rewrite was in progress; verify before testing |
| `public/assets/css/theme-v4.css` | V4 Energy Debt | Still required |
| `public/assets/css/theme-v5.css` | V5 Sleep Pattern Check | Still required |
| `public/assets/css/theme-v6.css` | V6 Partner Impact | Still required |

## Original Asset Inventory — Do Not Regenerate Unless User Requests a New Direction

| Asset | Use | Status |
|---|---|---|
| `public/assets/images/symptom-v1.jpg` | V1 hero: couple, snoring/tired partner | Generated 2026-08-13 |
| `public/assets/images/symptom-v2.jpg` | V2 hero: tired morning man | Generated 2026-08-13 |
| `public/assets/images/symptom-v3.jpg` | V3 hero: awake partner notices signs | Generated 2026-08-13 |
| `public/assets/images/symptom-v4.jpg` | V4 hero: daytime fatigue at desk | Generated 2026-08-13 |
| `public/assets/images/symptom-v5.jpg` | V5 hero: awake at night | Generated 2026-08-13 |
| `public/assets/images/symptom-v6.jpg` | V6 hero: original snoring couple / pillow composition | Generated 2026-08-13 |
| `research/symptom_mockups/final_comparisons/*.png` | First 6 desktop + mobile responsive comparison boards | Generated 2026-08-13 |
| `research/symptom_mockups/refined_comparisons/01_*_final.png` | V1 provider/bio/review final comparison board | Generated 2026-08-13 |
| `research/symptom_mockups/refined_comparisons/02_*_final.png` | V2 provider/bio/review final comparison board | Generated 2026-08-13 |
| `research/symptom_mockups/refined_comparisons/03_*_final.png` | V3 provider/bio/review final comparison board | Generated 2026-08-13 |
| `research/symptom_mockups/refined_comparisons/04_*_final.png` | V4 provider/bio/review final comparison board | Generated 2026-08-13 |
| `research/symptom_mockups/refined_comparisons/05_*_final.png` | V5 provider/bio/review final comparison board | Generated 2026-08-13 |
| `research/symptom_mockups/refined_comparisons/06_*_final.png` | V6 provider/bio/review final comparison board | Generated 2026-08-13 |

## Research Summary

The public-facing LPs should use symptom-screen and evaluation language. Loud/frequent snoring is the strongest recognition hook; the most important accompanying signs are breathing pauses, gasping/choking, and unrefreshing sleep or excessive daytime sleepiness. The LPs must not treat these symptoms as a diagnosis. Oral appliances are used for snoring and sleep apnea, but a sleep physician must diagnose sleep apnea before a dentist fits an appliance.

Sources retained locally in `research/oral_appliance_symptom_priorities.md`:

1. [American Academy of Dental Sleep Medicine — Obstructive Sleep Apnea & Snoring](https://www.aadsm.org/obstructive_sleep_apnea_snor.php)
2. [Mayo Clinic — Obstructive sleep apnea: Symptoms and causes](https://www.mayoclinic.org/diseases-conditions/obstructive-sleep-apnea/symptoms-causes/syc-20352090)
3. [AASM Sleep Education — Oral Appliance Therapy](https://sleepeducation.org/patients/oral-appliance-therapy/)

## Iteration Log

| Date | Loop | Change | Status |
|---|---:|---|---|
| 2026-08-13 | Visual 1 | Established symptom-first desktop + mobile hierarchy | Complete |
| 2026-08-13 | Visual 2 | Prioritized snoring, pauses, gasping, and daytime fatigue | Complete |
| 2026-08-13 | Visual 3 | Added distinct desktop/mobile concept directions for six variants | Complete |
| 2026-08-13 | Visual 4 | Added doctor-photo, bio, and verified-review placeholders | Complete |
| 2026-08-13 | Visual 5 | Removed all GHL form/survey placeholders; preserved CTA and disclaimer hierarchy | Complete |
| 2026-08-13 | Code 1 | Created feature branch `feature/symptom-led-lps-v2` | Complete |
| 2026-08-13 | Code 2 | Added six data-driven symptom-led configurations | Complete |
| 2026-08-13 | Code 3 | Replaced shared LP renderer with reusable symptom-led structure | Complete |
| 2026-08-13 | Code 4 | Added shared mobile-first symptom LP stylesheet | Complete |
| 2026-08-13 | Code 5–10 | Theme completion, route test, responsive QA, thank-you review, commit, deploy | Pending |

## Immediate Next Steps

1. Verify and finalize theme CSS for V3–V6, then normalize V1/V2 variables as needed.
2. Remove any remaining `#ghl-form`, `ghl-form`, survey/form placeholder markup or CTA targets from template, layout, TY/TY-BT pages, CSS, and JS.
3. Run all six base LP routes, city variants, TY, and TY-BT locally.
4. Use 414 × 896 mobile and 1440px desktop screenshots for final visual QA.
5. Commit the feature branch, tag the release, merge/push to the Railway-connected branch, and verify all Railway routes.

## Update Rule

Before any new asset generation, research, route changes, or deployment, update the relevant table above and add one row to the iteration log. Do not regenerate an item listed as available unless the user explicitly requests a new direction or the existing asset fails a specific acceptance criterion.

## Responsive QA Findings — 2026-08-13

V1 was rendered locally at **414 × 896** mobile and **1440px** desktop. The symptom-first hierarchy, full-width CTA, stacked mobile symptom cards, provider/photo/bio/review placeholders, no-GHL policy, and desktop two-column symptom grid are all rendering correctly. The following improvements remain for the code passes: normalize all six theme variables; simplify the legacy footer disclaimer so it does not duplicate the page-specific non-diagnostic disclosure; increase small provider and FAQ supporting text where possible; and inspect V2–V6 screenshots for theme-specific contrast issues before release.

The V5 mobile dark theme and V6 desktop Partner Impact route were also reviewed locally. V5 retains sufficient contrast across the symptom cards, provider placeholder, CTA, and FAQs. V6 uses the approved original snoring-couple/pillow-over-ear composition and maintains desktop hierarchy, provider content, and no-form policy. The shared legacy footer still needs its runtime screenshot refreshed after the simplified disclaimer change.


## Shared Legal and Chat Update — 2026-08-13

A single public **Privacy Policy** route (`/privacy-policy`) and a single public **Terms & Conditions** route (`/terms-and-conditions`) are now linked from the shared footer used by all LPs. The old `/terms` route redirects to the canonical Terms & Conditions page. Both pages are intentionally marked as placeholder legal content requiring review before forms, analytics IDs, or external chat are activated.

A cross-device chat launcher now renders from `src/shared/chat.js` through the shared page layout. It opens a functional accessible panel on mobile and desktop; it supports `CHAT_PROVIDER_URL` as the future third-party provider hook and otherwise gives a transparent phone-first fallback. The responsive QA script now asserts that the chat panel opens and that both legal links appear on every LP variant at mobile and desktop sizes.

| Date | Loop | Change | Status |
|---|---:|---|---|
| 2026-08-13 | Code 5 | Added shared privacy and terms routes, footer links, and canonical `/terms-and-conditions` path | Complete |
| 2026-08-13 | Code 6 | Added responsive chat launcher, optional `CHAT_PROVIDER_URL`, and automated cross-device behavior check | Complete |

The qualified TY and below-target TY templates were rebuilt against the same profile-placeholder and no-form policy as the LPs. This repaired the route regression caused by the retired legacy `testimonials`, `bio`, and form-oriented configuration fields. A full local regression test completed successfully: **all 108 generated LP, city, thank-you, and below-target routes returned 200 and contained no removed GHL/survey placeholder.**

| Date | Loop | Change | Status |
|---|---:|---|---|
| 2026-08-13 | Code 7 | Added V4–V6 themes and normalized the symptom-led responsive component system | Complete |
| 2026-08-13 | Code 8 | Updated FAQ interaction and simplified legacy footer compliance copy | Complete |
| 2026-08-13 | Code 9 | Rebuilt TY/TY-BT templates for current placeholder/no-form configuration | Complete |
| 2026-08-13 | Code 10 | Passed generated-route regression: 108/108 routes return 200 with no GHL marker | Complete |

Supporting-page visual QA passed for the V1 mobile TY page and desktop Privacy Policy page. The TY page presents the non-diagnostic next-step message, the placeholder provider/profile/review content, the working chat launcher fallback, and the shared legal footer links. The Privacy Policy page is readable at desktop width and clearly identifies itself as placeholder content awaiting legal review. Automated screenshot capture completed for all 12 TY/TY-BT routes plus both shared legal pages at mobile and desktop sizes.

The project release version has been advanced from `1.0.0` to `2.0.0`. `package.json` now records reusable scripts for route verification and responsive/supporting visual QA. These scripts are designed to prevent re-creating validation logic in later doctor, city, or variant additions.

## Release Readiness — 2026-08-13

All required symptom-led LP code, responsive styles, original hero assets, shared legal placeholders, shared chat launcher, route checks, and visual QA assets are ready on `feature/symptom-led-lps-v2`. Generated local QA screenshots are intentionally excluded from Git because the reusable `scripts/` commands recreate them on demand. The next action is to commit the version `2.0.0` release, push the feature branch, merge it to `main`, and manually trigger/verify Railway deployment.
## Deployment Record — 2026-08-13

Version **`v2.0.0`** was committed on `feature/symptom-led-lps-v2` as `0157f11`, merged to `main` as `b5ca675`, tagged `v2.0.0`, and pushed to GitHub. Railway deployed the new code from `main`; the production response contains `symptom-lp.css`, `chat-launcher.css`, the Partner Impact V6 content, and the shared Terms & Conditions link. A production regression test then passed across **all 108 generated LP, city, TY, and TY-BT routes**. Both `/privacy-policy` and `/terms-and-conditions` returned HTTP 200.

## Design Systems V3 — In Progress

The current feature branch is `feature/unique-lp-design-systems-v3`. Six unique systems are specified in `docs/design-systems-v3.md` and implemented through each variant’s `designSystem` configuration plus the reusable `design-systems-v3.css` layer. The top phone number treatment is now standardized across every variant as Seahawks blue `#002244` with Seahawks green `#69BE28` text, while all other layouts, palettes, section rhythms, and card systems are distinct. The six final responsive comparison boards are stored in `research/symptom_mockups/v3_design_systems/` and must not be regenerated unless the user changes the design direction.

The first V3 visual QA confirms the new systems are materially distinct: V1 renders as a compact navy/teal mobile assessment dashboard with two-column recognition cards, while V2 renders as a warm editorial desktop layout with a full-width centered phone strip and horizontal morning-symptom timeline. Both show the required Seahawks blue / green phone treatment at the top and retain the provider, bio, testimonial, chat, legal, and no-form requirements.
V5 mobile and V6 desktop visual QA also passed. V5 is visibly differentiated through its premium dark indigo timeline/card system, and V6 is visibly differentiated through its cobalt-and-cream partner-impact story layout with the approved original snoring-couple hero. Both maintain the high-contrast blue/green phone treatment at the top, readable provider placeholders, no survey/form block, chat launcher, and shared legal links.

## Ten-LP V4 Expansion — In Progress

Research is saved in `research/ten_lp_best_practices.md`, and the ten design systems plus the ten-pass visual checklist are documented in `docs/design-systems-v4.md`. V1–V6 retain their existing responsive concept boards; four new responsive concept boards for V7–V10 are stored under `research/symptom_mockups/v4_design_systems/`. The existing original hero assets are intentionally reused for V7–V10 so the code can produce unique layout and visual treatments without redundant image generation. All ten code routes use `sharedContent` from `src/data/dr-lay.js`, ensuring the approved copy and common elements are identical across every design.
The first V4 visual QA confirms V7 and V10 are materially different implementations while retaining shared approved content. V7 uses a blue-and-cream proof-wall system with alternating fact blocks and a gold CTA band. V10 uses monochrome type-first minimalism, linear symptom rows, and large whitespace. Both render the required top phone number in Seahawks blue/green and retain no-form, chat, legal, provider, testimonial, and non-diagnostic requirements.

## Ten-LP Code and QA Cycles — Completed Locally

| Cycle | Completed Work | Result |
|---:|---|---|
| 1 | Researched mobile target-size, health-literacy, and plain-language requirements | Complete |
| 2 | Defined all ten design systems and shared-content rules | Complete |
| 3 | Centralized approved shared symptom content in the doctor configuration | Complete |
| 4 | Added V7–V10 automatic route configuration with reusable hero assets | Complete |
| 5 | Implemented four new responsive CSS design systems and preserved six prior systems | Complete |
| 6 | Added the design-system class to layout and LP renderer | Complete |
| 7 | Extended responsive screenshot QA from six to ten LP variants | Complete |
| 8 | Extended supporting TY/TY-BT mobile and desktop QA from six to ten variants | Complete |
| 9 | Passed dynamic route regression: **180/180** generated LP, city, TY, and TY-BT routes returned 200 with no retired survey markers | Complete |
| 10 | Passed ten-LP structural accessibility/content regression: shared headline, CTA, symptoms, phone treatment, chat, legal links, FAQ semantics, language, viewport, and no-form policy | Complete |

The reusable `qa:basics` package command now executes the ten-LP accessibility/content check when a local server is running. `qa:responsive` and `qa:supporting` include all ten variants.
