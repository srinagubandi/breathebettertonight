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
- Added a dedicated **Video Hero LPs** admin summary that groups all twelve canonical video-background landing pages by practice, with direct previews for every video concept.
- Added shared reasons-and-symptoms guidance and a clinician-gated oral-appliance discussion path to canonical, doctor-owned, and preserved legacy LPs.
- Added a credential-led **About the Dentist** LP section for all canonical, doctor-owned, and preserved legacy landing-page families, with a persistent per-practice Show About the Dentist control in the protected admin workspace.

### Changed

- Preserved all existing generated Dr. Lay landing-page URLs while replacing their conversion placeholders with the assigned Pantego Dental GoHighLevel survey.
- Updated legacy and canonical LP CTAs to use a consultation handoff, removed retired no-cost consultation wording, and removed testimonial-style placeholder content.
- Converted the GoHighLevel enhancer to an asynchronous load so it does not hold up page rendering or visual QA.
- Updated responsive QA to use the available Chromium executable and assert the assigned survey, Call/Text header actions, practice policy links, no retired consultation wording, and no horizontal overflow across representative three-practice routes.
- Updated canonical and legacy landing/outcome renderers, the shared header, survey context, and chat fallback so hidden practice/contact settings do not leave empty action containers or ambiguous visible copy.
- Updated every canonical video-background landing page with a visible, non-interactive video-camera indicator and added a prominent Video LPs shortcut to the top protected-workspace navigation.
- Shortened reusable hero, symptom, consultation, and outcome copy across all patient LP families and matched outcome pages.
- Removed public hero campaign-label, practice-name, and video-background metadata rows from canonical, doctor-owned, and preserved legacy LPs.
- Brightened all supplied video-hero media and refined their scrims for clearer subject visibility while retaining readable text and actions.
- Updated every video hero to use muted and default-muted inline playback without controls; the optimized MP4 assets contain no audio track.
- Replaced canonical symptom-recognition list numerals with semantic medical-style SVG icons, retaining legacy symptom icons and preserving unrelated care-path sequence numbering.

### Validation

- Generated-route regression passed for **234 preserved legacy routes**.
- Structural landing-page regression passed for **13 legacy LP variants**.
- Canonical campaign and matched outcome smoke test passed for **27 practice-campaign routes**.
- Responsive QA captured all **13 legacy LP variants** at both mobile and desktop viewports.
- Complete doctor page-set regression passed across every concept and legacy route family. Responsive QA captured 38 mobile and desktop views across the preserved legacy catalog and active-practice samples.
- Concept-library validation passed for authenticated content rendering, anonymous 401 responses for the admin and image endpoints, public static-image 404 behavior, semantic section headings, direction counts, and refined review copy.
- Railway production validation passed for the concept-library release: the authenticated admin boundary remains in place, review artwork is not publicly statically served, and the patient site contains no internal concept reference.
- Local release validation passed for 234 preserved generated legacy routes, all doctor-owned concept and legacy page sets, four video concepts and their matched outcomes across three practices, all video/poster asset URLs, and repository wording cleanup.
- Local authenticated-admin validation passed for the Page Index’s new Nighttime Breathing Sounds entries and all three visibility controls.
- Grouped-video navigation validation passed locally: twelve video LPs showed the marker, retained their assigned surveys, and retained their matched outcome routes; static LPs did not show the marker.
- Copy-and-guidance validation passed locally: all 234 generated routes, all doctor page sets, six representative canonical/legacy LPs with symptom-to-treatment assertions, and 50 mobile, desktop, and reduced-motion browser captures completed successfully.
- Icon-and-profile validation passed locally: semantic canonical symptom icons, legacy symptom icons, credential-icon profile markup, admin display control persistence, profile-on/profile-off/identity-hidden states, 50 responsive captures, 234 generated routes, complete doctor page sets, policy links, surveys, and approved consultation wording.

### Deployment

- Merged the migration into `main` as commit `542b2ae` and deployed it successfully to the existing Railway production service and `www.breathebettertonight.com`.
- Configured a dedicated protected admin account through Railway environment variables and validated the live `/admin` Page Index with authenticated access.
- Merged the supplied-video and display-control release to `main` as `b950b84`; the designated Railway web service deployed it successfully. Live checks confirmed the new Nighttime Breathing Sounds concept for Pantego Dental, PerioDDS, and Dental World, including the muted inline video asset and static poster metadata.
- Merged the grouped video-LP navigation update to `main` as `51c45f0`; the Railway web service deployed it successfully and the live Pantego Nighttime Breathing Sounds page displays the video-background indicator.
- Merged the medical-icon and configurable dentist-profile update to `main` as `8c06f85`; the designated Railway web service deployed it successfully. Live DOM validation confirmed semantic symptom icons, no numeric symptom-list marker, credential icons, and muted no-controls video behavior.
