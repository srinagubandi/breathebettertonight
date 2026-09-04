# Changelog

## Unreleased — Night-to-Clarity Landing-Page System

### Added

- Introduced the **Night-to-Clarity** patient-site routes for sleep awareness, provider selection, local practice handoff, accessibility, and the external Propel Dental HCP handoff.
- Added canonical three-practice campaign routes for **Pantego Dental**, **PerioDDS**, and **Dental World**, including a paid-traffic landing page, qualified thank-you page, and non-qualified thank-you page for each approved ad theme.
- Added practice-specific privacy, terms, and accessibility routes, each capable of using a stored local policy override.
- Added a protected practice publishing workspace with configurable GoHighLevel survey IDs, Call/Text actions, campaign-design assignments, policy profiles, and a complete Page Index with direct previews for public, campaign, outcome, policy, and legacy routes.
- Added the approved current ad creative to the deployment source for paid-traffic hero continuity.

### Changed

- Preserved all existing generated Dr. Lay landing-page URLs while replacing their conversion placeholders with the assigned Pantego Dental GoHighLevel survey.
- Updated legacy LP CTAs to use a free-consultation handoff and removed testimonial-style placeholder content.
- Converted the GoHighLevel enhancer to an asynchronous load so it does not hold up page rendering or visual QA.
- Updated responsive QA to use the available Chromium executable and assert the assigned survey, Call/Text header actions, and practice policy links.

### Validation

- Generated-route regression passed for **234 preserved legacy routes**.
- Structural landing-page regression passed for **13 legacy LP variants**.
- Canonical campaign and matched outcome smoke test passed for **27 practice-campaign routes**.
- Responsive QA captured all **13 legacy LP variants** at both mobile and desktop viewports.
