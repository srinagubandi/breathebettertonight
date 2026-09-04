# Complete Doctor Page-Set Architecture

## Purpose

Every patient-facing design becomes a complete, doctor-owned landing-page family for **Pantego Dental**, **PerioDDS**, and **Dental World**. The implementation keeps existing URLs live while the new route system becomes the standardized destination for page management, GoHighLevel handoff, legal profiles, and outcome pages.

## Patient-Facing Concept Inventory

The approved patient-facing inventory contains sixteen reusable concepts. The nine patient-system concepts, three local sleep-apnea directions, three paid-traffic concepts, and the Night-to-Clarity patient-home direction become configurable landing-page records. Propel Dental HCP-only concepts are excluded.

| Group | Included concepts |
|---|---|
| Public and local concepts | Night to Clarity; Clinical Confidence; Family Comfort; Local Care, Calm Direction |
| Patient-system concepts | Soft Utility; Humanist Morning; Quiet Signal; Sleep Check; Provider Match; Consultation Handoff; Partner Path; Treatment Questions; Request Received |
| Ad-matched concepts | Tired Mornings; Focus and Brain Fog; Partner-Noticed Snoring |

## New Doctor-Owned Route Families

| Page family | Pattern | Outcome patterns |
|---|---|---|
| Patient concept | `/lp/{practice}/concepts/{concept}` | `/thank-you` and `/not-qualified` |
| Legacy design | `/lp/{practice}/legacy/{variant}` | `/thank-you` and `/not-qualified` |
| Localized legacy design | `/lp/{practice}/legacy/{variant}/{city}` | `/{city}/thank-you` and `/{city}/not-qualified` |
| Current paid route | `/go/{practice}/{campaign}` | Existing `/thank-you` and `/not-qualified` paths remain valid |
| Practice care and policies | `/care/{practice}` | `/privacy`, `/terms`, and `/accessibility` |

Every doctor-specific landing page uses the assigned survey, Call and Text actions, policy profile, and the selected design system. Qualified and non-qualified outcome routes retain the originating concept or legacy visual identity.

## Legacy Compatibility

The complete `/dr-lay/{v1-v13}` family remains unchanged as an active Pantego Dental compatibility set, including every Arlington, Pantego, Grand Prairie, Mansfield, and Fort Worth locality and its two outcome routes. New Pantego doctor-owned legacy routes expose the same designs under the standardized `/lp/pantego-dental/legacy/...` family. PerioDDS and Dental World receive the identical 13-design legacy catalog through their own localities and assigned practice configuration.

## Administration

The protected Page Index lists canonical campaigns, doctor-owned concept pages, doctor-owned legacy pages, localized legacy pages, qualified outcomes, non-qualified outcomes, practice policies, and the preserved `/dr-lay/...` compatibility family. Practice configuration controls survey IDs, Call/Text routes, policy profiles, and design-system assignments without changing source files.
