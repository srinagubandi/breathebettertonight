# Changelog

## Unreleased — Night-to-Clarity Landing-Page System

### Added

- Introduced the **Night-to-Clarity** patient-site routes for sleep awareness, provider selection, local practice handoff, accessibility, and the external Propel Dental HCP handoff.
- Added canonical three-practice campaign routes for **Pantego Dental**, **PerioDDS**, and **Dental World**, including a paid-traffic landing page, qualified thank-you page, and non-qualified thank-you page for each approved ad theme.
- Added practice-specific privacy, terms, and accessibility routes, each capable of using a stored local policy override.
- Added a protected practice publishing workspace with configurable GoHighLevel survey IDs, Call/Text actions, campaign-design assignments, policy profiles, and a complete Page Index with direct previews for public, campaign, outcome, policy, and legacy routes.
- Added the approved current ad creative to the deployment source for paid-traffic hero continuity.
- Added sixteen reusable, patient-facing concept records and complete doctor-owned concept route families for **Pantego Dental**, **PerioDDS**, and **Dental World**. Every concept provides a landing route plus matched qualified and non-qualified outcome routes.
- Added complete doctor-owned legacy design families for the three active practices, while retaining the original `/dr-lay/...` Pantego compatibility URLs.
- Added complete doctor-owned concept and legacy entries to the protected admin **Page Index**.
- Added separate protected **Homepage Concepts** and **HCP Concepts** libraries to the `/admin` workspace, containing four Breathe Better Tonight patient-homepage directions and five Propel Dental HCP directions.
- Added authenticated concept-image delivery through `/admin/concepts/:asset`; concept assets are not served from the public static directory.
- Added four patient-safe supplied-video symptom concepts—**Partner-Disrupted Sleep**, **Waking Unrefreshed**, **Daytime Brain Fog**, and **Nighttime Breathing Sounds**—for every active practice, each with canonical and doctor-owned landing, qualified, and non-qualified page families.
- Added optimized muted H.264 hero-video assets and matching JPG poster fallbacks, including reduced-motion static behavior.
- Added independently persisted per-practice visibility controls for public practice name, Call action, and Text action in the protected admin workspace.

### Changed

- Preserved all existing generated Dr. Lay landing-page URLs while replacing their conversion placeholders with the assigned Pantego Dental GoHighLevel survey.
- Updated legacy and canonical LP CTAs to use a consultation handoff, removed retired no-cost consultation wording, and removed testimonial-style placeholder content.
- Converted the GoHighLevel enhancer to an asynchronous load so it does not hold up page rendering or visual QA.
- Updated responsive QA to use the available Chromium executable and assert the assigned survey, Call/Text header actions, practice policy links, no retired consultation wording, and no horizontal overflow across representative three-practice routes.
- Updated canonical and legacy landing/outcome renderers, the shared header, survey context, and chat fallback so hidden practice/contact settings do not leave empty action containers or ambiguous visible copy.

### Validation

- Generated-route regression passed for **234 preserved legacy routes**.
- Structural landing-page regression passed for **13 legacy LP variants**.
- Canonical campaign and matched outcome smoke test passed for **27 practice-campaign routes**.
- Responsive QA captured all **13 legacy LP variants** at both mobile and desktop viewports.
- Complete doctor page-set regression passed across every concept and legacy route family. Responsive QA captured 38 mobile and desktop views across the preserved legacy catalog and active-practice samples.
- Concept-library validation passed for authenticated content rendering, anonymous 401 responses for the admin and image endpoints, public static-image 404 behavior, semantic section headings, direction counts, and refined review copy.
- Railway production validation passed for the concept-library release: the authenticated admin boundary remains in place, review artwork is not publicly statically served, and the patient site contains no internal concept reference.

### Deployment

- Merged the migration into `main` as commit `542b2ae` and deployed it successfully to the existing Railway production service and `www.breathebettertonight.com`.
- Configured a dedicated protected admin account through Railway environment variables and validated the live `/admin` Page Index with authenticated access.
