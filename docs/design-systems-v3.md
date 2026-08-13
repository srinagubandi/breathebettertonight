# Design Systems V3 — Six Distinct Symptom-Led LPs

> **Scope:** Concept and implementation direction for six responsive LPs. Every design uses a visible top phone treatment for **(817) 274-1825**. The shared phone background is Seahawks blue `#002244` with Seahawks green `#69BE28`; each page otherwise has a distinct layout, typography rhythm, card system, and palette.

## Shared Phone Treatment

The phone number is a persistent top-of-page call target, displayed with the phone icon and `(817) 274-1825`. It is visually distinct from the page's normal CTA and adapts for desktop and mobile. The visual treatment is the only cross-variant constant: blue background with green phone text.

## Ten-Pass Design Checklist

| Pass | Decision Applied Across All Variants |
|---:|---|
| 1 | Top phone number visible at the first glance on mobile and desktop |
| 2 | First screen contains one symptom angle and one clear CTA |
| 3 | Different visual system for each variant, beyond color swapping |
| 4 | Mobile section order is thumb-friendly and has readable type |
| 5 | Desktop grid and hero composition retain visual tension |
| 6 | Symptom cards have a distinct interaction/recognition pattern per variant |
| 7 | Provider photo, bio, and testimonial placeholders feel intentional, not unfinished |
| 8 | No form, coverage promise, diagnosis claim, or unapproved clinical statement |
| 9 | CTA / chat / legal information remain visually separate and accessible |
| 10 | Color contrast, whitespace, button hierarchy, and responsive phone placement are reviewed |

## Variant Systems

| Route | Name | Visual System | Palette | Phone Placement |
|---|---|---|---|---|
| `/dr-lay/v1` | **Signal Check** | Editorial assessment dashboard with numbered symptom cards and a left-aligned image hero | Ink navy, arctic white, mineral teal | Small Seahawks call chip in top-right navigation |
| `/dr-lay/v2` | **The Morning After** | Warm magazine-style split page with an oversized morning headline and vertical symptom timeline | Charcoal, oat, burnt orange, clay | Full-width top call strip, number centered |
| `/dr-lay/v3` | **What Your Partner Notices** | Conversational two-column dialogue layout, bed-partner callouts and speech-bubble symptom cards | Dusk plum, lavender, coral | Navy/green call chip integrated at left of top navigation |
| `/dr-lay/v4` | **Energy Audit** | Bright utility-style check-in with modular energy meter cards and a fresh, active feel | Forest, warm white, citrus green, sky blue | Slim fixed top call ribbon above the navigation |
| `/dr-lay/v5` | **Night Pattern** | Premium night-mode visual system with a vertical timeline, moon phases, and layered dark panels | Deep indigo, ultraviolet, moon gold, ice blue | Floating navy/green call capsule inside the top glass bar |
| `/dr-lay/v6` | **Shared Sleep** | High-contrast home-story layout with the snoring-couple hero, partner quote, and empathy-first framing | Cobalt, cream, coral red, pale aqua | Overlapping navy/green call card at upper-right of hero header |

## Placeholder Components

Every variant includes the following reusable content placeholders:

| Component | Required Label / Content |
|---|---|
| Doctor photo | `Doctor photo` label, circular or framed based on the variant system |
| Provider bio | `Provider bio placeholder` with space for credentials, service area, and approved text |
| Testimonial | `Verified review placeholder` with no invented claim or rating |
| Chat | Shared responsive live-chat launcher; it opens an honest provider-integration panel until configured |
| Legal | Shared public `/privacy-policy` and `/terms-and-conditions` links |

## Implementation Notes

Theme data will gain a `designSystem` property that selects variant-specific component classes. All imagery remains sourced from the existing original hero asset inventory unless the current image conflicts with its assigned concept.
