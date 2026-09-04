# Landing-Page Architecture V3

## Purpose

This architecture migrates the patient website and existing landing-page system without breaking the 234 currently generated legacy URLs. It introduces a canonical practice model, a consistent GoHighLevel survey handoff, matched qualified and non-qualified outcomes, and a configuration-first administration workspace.

## Canonical directories

```text
src/
├── data/
│   ├── practices/              # Practice, survey, contact, policy, and targeting records
│   ├── design-concepts/        # Reusable Night-to-Clarity and ad-matched visual definitions
│   └── route-registry.js       # Canonical and legacy route generation
├── pages/
│   ├── site/                   # Breathe Better Tonight public patient site
│   ├── landing-pages/          # Reusable patient landing-page renderer
│   ├── outcomes/               # Qualified and non-qualified page renderers
│   ├── policies/               # Shared and practice-scoped policy page renderers
│   └── admin/                  # Protected configuration workspace
├── shared/                     # Layout, header, footer, survey, analytics, and accessibility primitives
└── lib/                        # Safe persistent configuration and lead-storage helpers
```

The legacy `src/pages/lp`, `src/pages/ty`, and `src/pages/ty-bt` entry points will remain as thin compatibility adapters until all generated legacy routes have been validated against the new shared renderers.

## Route strategy

| Route family | Canonical pattern | Purpose |
|---|---|---|
| Patient site | `/`, `/sleep-check`, `/find-a-provider`, `/symptoms/{topic}`, `/sleep-apnea`, `/about`, `/faq`, `/contact` | Breathe Better Tonight’s national, education-first patient experience. |
| HCP handoff | `/for-professionals` | A clear external handoff to `https://www.propel.dental/`; the patient domain does not host HCP lead capture. |
| Practice overview | `/care/{practice}` | A local Breathe Better Tonight route that identifies the selected practice and supplies its policy, contact, and consultation configuration. |
| Paid campaign landing page | `/go/{practice}/{campaign}` | A focused ad-to-landing route whose hero creative and message hierarchy match the campaign theme. |
| Qualified outcome | `/go/{practice}/{campaign}/thank-you` | A matched success page that explains the requested follow-up without promising clinical eligibility, diagnosis, or timing. |
| Non-qualified outcome | `/go/{practice}/{campaign}/not-qualified` | A matched, neutral supporting page that avoids a clinical judgment or treatment conclusion. |
| Practice policy pages | `/care/{practice}/privacy`, `/terms`, `/accessibility` | Policy routes governed by the assigned practice profile, with global fallback content. |
| Legacy preservation | `/{doctor}/{variant}` and city/outcome equivalents | Existing tracked routes retain their public path and render through the compatible shared system. |

## Practice and survey assignments

| Practice key | Public practice name | Campaign destination | Assigned GoHighLevel survey |
|---|---|---|---|
| `pantego-dental` | Pantego Dental | Pantego Dental | `75op3Tl4LTjPkaXI1zhb` |
| `periodds` | Lakeside Dental Solutions | PerioDDS | `pvHcEcGNjxhXI3L8lSrE` |
| `dental-world` | Dental World | Dental World | `Rx0LnsI0XLu8JfhiDnYc` |

Each doctor-specific route renders one embedded survey only. The generic patient routes never silently choose or load a practice survey. They make provider selection explicit before transferring the visitor to a local route.

## Ad-to-landing sets

The three new paid landing-page sets will use the current approved generic ad creative as their hero visual source and retain the corresponding recognition message:

| Campaign key | Ad entry point | New canonical route | Hero and message continuity |
|---|---|---|---|
| `tired-mornings` | Restless sleep and waking tired | `/go/{practice}/tired-mornings` | Use the current tired-morning image and start with the day-after impact. |
| `focus-and-brain-fog` | Daytime focus and brain fog | `/go/{practice}/focus-and-brain-fog` | Use the current focus image and lead with a non-diagnostic daytime recognition message. |
| `partner-noticed-snoring` | Snoring disrupting a partner | `/go/{practice}/partner-noticed-snoring` | Use the current partner-snoring image and maintain a respectful, relationship-aware entry point. |

## Outcome-page continuity

Each landing-page record includes its own `outcomes` configuration. The qualified page shares the landing page’s design concept, hero palette, and practice context while acknowledging the consultation request. The non-qualified page uses the same visual vocabulary but neutral language such as “Here is a helpful next step,” and directs the visitor to the appropriate general information, contact, or evaluation discussion route. Neither outcome page assigns a diagnosis, determines clinical appropriateness, or states a treatment decision.

## Admin ownership model

The administration workspace treats a practice as a configurable publishing destination. An authorized operator can assign a design concept, survey ID, Call and Text routes, campaign landing page, matched outcomes, and policy profile to a practice without changing the renderer. Global policy content is inherited by default; practice-specific overrides apply everywhere that practice is rendered. The workspace logs the active configuration version, validates GoHighLevel survey IDs before publish, and keeps legacy routes locked to a selected compatible configuration until they are deliberately reassigned.

## Privacy and analytics boundary

The page can collect ordinary page-view and CTA interaction measurements only after the required consent and policy configuration is in place. It must not send survey responses, health-screen details, or iframe field interactions to advertising pixels or general analytics. GoHighLevel owns the embedded survey submission flow; the Breathe Better Tonight application should record only the non-sensitive configuration and routing context necessary to operate the site.
