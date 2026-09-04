# CURRENT — Breathe Better Tonight

> **Canonical project context and changelog.** Read this file before researching, generating assets, changing code, or deploying. Update it after every meaningful decision or implementation change to avoid duplicate compute and preserve reuse.

## Active Objective

Migrate the public patient site and preserved landing-page system into the shared landing-page directory structure. The work adds Breathe Better Tonight’s Night-to-Clarity public site, the active practice set for Pantego Dental, PerioDDS, and Dental World, current-ad-matched paid landing-page sets, assigned GoHighLevel survey handoffs, matched qualified and non-qualified outcomes, and a protected configuration workspace.

## Deployment and Version Control

| Item | Current Value |
|---|---|
| Git repository | `github.com/srinagubandi/breathebettertonight` |
| Active feature branch | `feature/night-to-clarity-lp-system-2026` |
| Production branch | `main` |
| Hosting target | Railway project `breathebettertonight` |
| Live base URL | `https://breathebettertonight-web-production.up.railway.app` |
| Route system | Preserve current generated URLs while moving canonical records to the documented V3 practice, campaign, outcome, and policy model. |

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
| Form status | Every doctor-specific landing page must embed only the assigned GoHighLevel survey. Generic patient routes must use provider selection before a survey handoff. |
| Provider content | Use clearly labeled doctor-photo, bio, and verified-review placeholders until approved content is supplied |
| Partner Impact hero | Use an **original, watermark-free** bright-bedroom image: sleeping/snoring adult on the left; awake partner with a pillow over one ear on the right. Do not copy stock photos. |
| Deployment discipline | Work on a feature branch, review local routes at mobile and desktop, then commit/tag/push and deploy to Railway |

## Preserved Legacy LP Route Structure

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

1. Create the V3 canonical practice and campaign configuration while retaining all current generated routes as compatibility routes.
2. Replace doctor-specific placeholder conversion elements with the assigned GoHighLevel survey handoff and validate that each route loads only its own survey.
3. Build matched qualified and non-qualified outcomes for every design concept and landing-page set.
4. Implement the protected configuration workspace for practice, survey, design, policy, and outcome assignments.
5. Complete three improvement rounds, verify all routes at mobile and desktop viewports, and deploy to the existing Railway project.

## Update Rule

Before any new asset generation, research, route changes, or deployment, update the relevant table above and add one row to the iteration log. Do not regenerate an item listed as available unless the user explicitly requests a new direction or the existing asset fails a specific acceptance criterion.

## Night-to-Clarity Migration Status — 2026-09-04

The preserved Dr. Lay route family remains available at every existing URL. Its retired conversion placeholders now resolve to the assigned Pantego Dental GoHighLevel survey, while the original legacy qualified and non-qualified outcome URLs retain their matching visual systems and practice policy profile. The V3 canonical directory model is active through `src/data/practices/`, `src/data/campaigns/`, `src/pages/landing-pages/`, `src/pages/outcomes/`, and `src/pages/policies/`.

The public patient site now follows the Night-to-Clarity experience at `/`, with awareness, provider selection, local care handoff, practice-specific policy routes, and an external `/for-professionals` handoff to Propel Dental. The active practice configuration is Pantego Dental, PerioDDS, and Dental World. Their paid campaign routes use the approved tired-mornings, brain-fog, and partner-snoring ad creative, with a matching qualified and non-qualified result page for each route.

The protected `/admin` workspace includes a full Page Index, searchable by route, page, owner, or category. It reports **285 direct-preview routes** across public, practice, campaign, qualified thank-you, non-qualified thank-you, policy, and preserved legacy landing-page categories. It also persists practice-level survey IDs, Call/Text routes, campaign design assignments, and policy overrides to `PRACTICE_CONFIG_FILE`; Railway must mount this file and `LEADS_FILE` to its existing persistent volume before the admin is used in production.

| Date | Loop | Change | Status |
|---|---:|---|---|
| 2026-09-04 | V3 migration | Added canonical practice, campaign, matched outcome, policy, and Night-to-Clarity public-site modules | Complete |
| 2026-09-04 | Conversion | Replaced legacy LP form placeholders with the assigned Pantego GoHighLevel survey and added three-practice campaign surveys | Complete |
| 2026-09-04 | Admin | Added persistent practice configuration, policy overrides, and the complete Page Index | Complete locally |
| 2026-09-04 | QA | Passed 234 legacy route checks, 13 structural LP checks, 27 campaign/outcome checks, and 13 mobile/desktop visual captures | Complete locally |
| 2026-09-04 | Deploy | Merged the migration to `main`, deployed successfully to Railway, and verified the live public routes plus authenticated `/admin` Page Index | Complete |

## Complete Doctor Page Sets — 2026-09-04

Every patient-facing lookbook study now has a reusable production record in `src/data/design-concepts/`. The system exposes a matched landing page, qualified outcome page, and non-qualified outcome page for **Pantego Dental**, **PerioDDS**, and **Dental World**. The 13 preserved legacy designs are likewise available under each doctor-owned `/lp/{practice}/legacy/...` path while the existing `/dr-lay/...` family remains a Pantego-compatible route set.

| Improvement loop | Completed change | Validation result |
|---:|---|---|
| 1 | Made the selected doctor/practice and local consultation destination explicit in every canonical concept page and matched outcome. | Canonical, legacy, and outcome routes load with the assigned practice identity. |
| 2 | Strengthened the GoHighLevel consultation handoff, direct Call/Text labels, and concept-specific outcome copy; removed retired no-cost consultation wording. | Every landing route retains only its assigned survey and matched practice policy profile. |
| 3 | Expanded mobile/desktop QA from the legacy catalog to representative Pantego, PerioDDS, and Dental World concept and legacy routes; added overflow checks. | 38 responsive captures completed without assertion failures. |

The protected Page Index lists the complete doctor-owned concept and legacy page families, in addition to public, policy, canonical campaign, outcome, and preserved compatibility routes. Local validation confirmed Pantego Dental has 96 concept-route previews and 468 legacy-route previews; PerioDDS and Dental World each have 96 concept-route previews and 312 legacy-route previews.

## Protected Concept Libraries — 2026-09-04

The authenticated `/admin` workspace now has separate **Homepage Concepts** and **HCP Concepts** sections before the Page Index. The first contains four Breathe Better Tonight patient-homepage directions; the second contains five Propel Dental HCP microsite directions. Their image files are stored outside `public/` and served only by the authenticated `/admin/concepts/:asset` route with no-store cache headers. The public patient site has no navigation path to these materials.

| Loop | Focus | Result |
|---:|---|---|
| 1 | Structure and review clarity | Added clear library separation, concept numbering, review-only labels, and internal review guidance. |
| 2 | Usability, protection, and responsive behavior | Added landmark headings, direction counts, focused navigation states, protected image assertions, and stacked mobile layouts. |
| 3 | Copy and action language | Rewrote section, concept, and action copy to make each review decision explicit and distinguish patient from HCP work. |

Local validation confirms both libraries render after authentication, anonymous requests to `/admin` and `/admin/concepts/:asset` return 401, and retired public concept-asset URLs return 404.

The protected concept-library release was committed to `main` as `e707b52` and deployed successfully to Railway. Production-boundary verification confirmed anonymous requests to `/admin` and `/admin/concepts/bbt_patient_home_video_hero_concept.png` receive HTTP 401, the former public static asset path returns HTTP 404, and the public homepage contains no protected concept-asset link.

## Supplied Video-Hero Concepts and Display Controls — 2026-09-04

Four patient-safe, symptom-led video hero concepts are now staged for all three active practices: Partner-Disrupted Sleep, Waking Unrefreshed, Daytime Brain Fog, and Nighttime Breathing Sounds. Each concept receives canonical `/go/{practice}/{campaign}` landing and outcome routes plus doctor-owned `/lp/{practice}/concepts/{concept}` counterparts. All use the assigned practice-specific GoHighLevel survey on the landing route and paired qualified/non-qualified outcomes.

Each supplied video is a muted, decorative H.264 asset with a paired static JPG poster. The landing renderer uses a metadata-preload, inline, looping video treatment with a contrast scrim and hides motion under `prefers-reduced-motion: reduce` while retaining the still poster. The new fourth Nighttime Breathing Sounds concept uses the most recently supplied square-format footage and remains distinct from the broader Partner-Disrupted Sleep concept by focusing on observable breathing sounds.

The protected practice configuration store now persists `showPracticeName`, `showPhone`, and `showText` for every practice. The admin form exposes independent controls. Canonical landing/outcome pages, doctor-owned concept pages, legacy LPs, legacy outcome pages, the shared header, the survey context, and the chat fallback all render coherent generic copy when selected details are hidden; GHL routing and practice policy URLs remain unchanged.

| Loop | Focus | Result |
|---:|---|---|
| 1 | Symptom message and visual continuity | Refined the fourth video concept to describe observable nighttime breathing sounds and repeated snoring in a shared, non-blaming frame. |
| 2 | Playback and reduced-motion fallback | Verified the muted fourth MP4 becomes playable with a JPG poster fallback; all video heroes use metadata preload and reduced-motion static rendering. |
| 3 | Practice-name, Call, and Text states | Verified fully visible, fully hidden, and mixed display states, including representative legacy and outcome routes. |

The completed local regression set covers generated legacy URLs, all doctor-owned concept/legacy route families, the three active practice survey assignments, four video families with qualified/non-qualified outcomes, the optimized video/poster assets, and retired consultation-wording cleanup. The release was committed as `b950b84`, pushed to `main`, and deployed successfully by the existing Railway web service. Live verification confirms the Nighttime Breathing Sounds route for Pantego Dental, PerioDDS, and Dental World, plus live muted video playback and poster metadata on the Pantego route.

## Grouped Video LP Navigation — 2026-09-04

The protected admin workspace now puts the four video-background concepts together in a dedicated **Video Hero LPs** summary directly below the protected concept libraries. The summary contains a grouped set of twelve canonical campaign landing-page links—four per active practice—and states that each uses a muted decorative video treatment, static reduced-motion fallback, practice-specific survey, and matched outcomes. A prominent **Video LPs** icon button is available in the top workspace navigation to jump directly to that section.

The protected Video Hero LPs summary and top navigation shortcut remain available to group the twelve video pages for internal review. Hero metadata rows are no longer rendered on any public canonical, doctor-owned, or preserved legacy landing page, so each public hero begins directly with its headline. Local checks confirmed all twelve video LPs preserve their assigned survey IDs and qualified/non-qualified outcome URLs. The grouping update was committed to `main` as `51c45f0` and deployed successfully to the designated Railway web service.

## Concise Copy, Symptom-to-Treatment, and Silent Video Refinement — 2026-09-04

All canonical, doctor-owned, and preserved legacy landing-page families now use shorter reusable hero, symptom, consultation, and next-step copy. Every LP contains the same concise patient-safe sequence: the observed symptom pattern, reasons it may be worth discussing, and an evaluation-led oral-appliance treatment conversation. The appliance content explains that, after appropriate evaluation, a custom appliance may help support an open airway during sleep for some adults; it is not determined by symptoms alone, does not replace evaluation, and is not right for everyone.

All four video-hero treatments now use a brighter media treatment and adjusted scrims to show the people in the supplied footage more clearly while keeping the headline and call to action readable. Every production video asset was checked to confirm it contains no audio stream, and the renderer uses muted, default-muted, inline, looping video with no controls. The shared static poster remains available under reduced-motion preferences.

| Loop | Focus | Result |
|---:|---|---|
| 1 | Concise recognition and hero copy | Shortened reusable hero and symptom text and removed public hero metadata rows. |
| 2 | Consultation and outcomes | Shortened handoff and matched-outcome copy without changing practice routing or display-toggle behavior. |
| 3 | Mobile, hidden identity, and hero focus | Verified generic fallback copy and a headline-first public hero across canonical and legacy families. |
| 4 | Reasons and symptoms | Added compact during-sleep, morning, and daytime symptom guidance. |
| 5 | Symptoms to treatment and silent video | Connected the symptom pattern to a clinician-led appliance conversation and verified brighter, audio-free video behavior. |

Local validation passed for all 234 generated routes, 13 structural legacy LP variants, every doctor page set, six representative canonical/legacy LP routes with symptom-to-treatment assertions, and 50 mobile, desktop, and reduced-motion browser captures.

## Medical-Icon Symptom Lists and Dentist Profiles — 2026-09-04

The numbered markers in canonical symptom-recognition lists have been replaced with purpose-specific medical-style icons. The recognition list now uses sound, airway, morning, focus, or sleep icons according to the symptom language; existing legacy symptom lists already use semantic icons and retain them. Unrelated treatment-path numbering remains intact because it communicates a sequence rather than a symptom category.

Every canonical, doctor-owned, and preserved legacy LP now has an **About the Dentist** section placed between the oral-appliance context and local consultation handoff. The concise section presents only the dentist’s name, credentials, practice, and local-care area using credential, dental, and follow-up icons. It does not introduce testimonials or unsupported clinician claims. The profile is configurable for each practice from the protected admin workspace’s **Show About the Dentist** control. It renders only when both that control and public practice identity are enabled.

Two refinement loops are complete. The first refined icon matching and shortened the profile copy. The second completed 50 fresh mobile, desktop, and reduced-motion captures with no horizontal overflow and verified profile-on, profile-off, and practice-identity-hidden states across the three practices. Final local validation passed for generated routes, all doctor page sets, preserved LP variants, assigned surveys, policy links, approved consultation wording, and the new icon/profile markup. The release was committed as `8c06f85`, deployed successfully by the designated Railway web service, and verified on the live Pantego Nighttime Breathing Sounds page: four semantic symptom icons, no numeric symptom marker, three credential icons, a visible dentist profile, and muted no-controls video behavior.

## Doctor-Photo Placeholder and Visibility Control — 2026-09-04

Each public **About the Dentist** section now includes a neutral, explicitly labeled doctor-photo placeholder beside the dentist’s concise profile and credential details. The placeholder does not depict or claim to depict the named clinician; it is a reserved visual location for an approved practice-provided portrait in a later release.

The protected admin practice form has a separate **Show doctor photo placeholder** setting. It independently hides or reveals the placeholder while keeping the profile section and its credential icons available. The placeholder is also correctly suppressed if the dentist profile or public practice identity is hidden. Local testing verified a visible Pantego Dental placeholder, a photo-hidden PerioDDS profile, a hidden-identity Dental World page, and the preserved Dr. Lay legacy route—all retaining their assigned GoHighLevel surveys. The configuration setting persisted correctly through disabled and enabled states. Responsive QA captured 50 mobile, desktop, and reduced-motion samples without horizontal overflow. The release was committed as `3efe92d`, deployed successfully by the designated Railway web service, and live-validated on Pantego Dental’s Nighttime Breathing Sounds page: the neutral non-image placeholder renders inside the dentist profile without horizontal overflow.

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

## Deployment Record — Ten-LP Release

Version **`v2.1.0`** was committed on `feature/unique-lp-design-systems-v3`, merged to `main`, tagged, and pushed to GitHub. Railway deployed the ten-LP release from `main`. Production smoke tests confirmed the shared approved symptom content on **V1–V10**; V7–V10 were retried successfully after transient Railway SSL timeouts. Local route regression passed **180/180** generated LP, city, TY, and TY-BT routes. The reusable production-verification helper scripts are retained under `scripts/` to avoid rebuilding validation logic in future releases.

## PDF-Inspired Variant QA — In Progress

V11 and V13 have been visually reviewed after local rendering at the selected mobile and desktop viewports. V11 retains the source PDF’s dark navy/teal, high-contrast nighttime direction while using only universal symptom language and no form area. V13 retains the source PDF’s clean light/blue, educational clinical-trust direction while using only universal symptom language and no treatment/coverage claims. Both retain the top phone, provider/review placeholders, chat launcher, shared legal links, and non-diagnostic disclosure.
All PDF-inspired release checks now pass locally. Responsive QA captured V1–V13 at both 414×896 mobile and 1440px desktop. Supporting QA captured all V1–V13 thank-you and below-target pages at both viewports, plus the shared legal pages. The structural accessibility/content check passed for all **13** LPs. Dynamic route regression passed for **234/234** generated LP, city, TY, and TY-BT routes with no retired survey marker.

## Deployment Record — PDF-Inspired Universal Variants

Version **`v2.2.0`** was committed on `feature/pdf-inspired-universal-lps`, merged to `main`, tagged, and pushed to GitHub. Railway deployed the new release from `main`. Production smoke tests passed for **V11**, **V12**, and **V13**, each serving the shared universal symptom-led headline without retired form, insurance, CPAP, qualification, or treatment-process language. The total generated route inventory is now **234** routes.
