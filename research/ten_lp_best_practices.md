# Best-Practice Findings for Ten Symptom-Led LPs

## Authoritative Findings

| Source | Finding | Implementation Rule |
|---|---|---|
| W3C WCAG 2.2, SC 2.5.8 | Pointer targets should be at least 24×24 CSS pixels unless an exception applies. | All clickable controls must be at least 24px; primary phone, CTA, chat, FAQ, and menu controls use 44px or larger practical targets. |
| U.S. ODPHP, *Health Literacy Online* | Mobile screens should limit the number of elements, prioritize content and features at the top, use large buttons/tappable areas with adequate spacing, and place frequently used controls where reachable. | One primary message and CTA in the first screen; no form; phone number visible at the top, and one large CTA near the center/bottom of each mobile hero. Symptom cards have clear full-card tap areas when interactivity is later added. |
| CDC, Plain Language materials | Plain language makes health information easier to understand and use. | Retain concise symptom language, avoid diagnosis claims and jargon, use question-led headings, and disclose the symptom screen is not a diagnosis. |

## Conversion and Healthcare-LP Design Rules Applied

1. Keep the **top phone number** visible without competing with the primary symptom CTA.
2. Use a **single symptom-led promise** in the hero and keep the same approved medical-safety language across variants.
3. Vary visual treatment, not the substantive health claims, provider placeholders, legal links, or chat behavior.
4. Provide distinct desktop composition and mobile stacking for every design system, rather than merely scaling one template.
5. Use clear content hierarchy, high contrast, adequate whitespace, and one intentional CTA path per hero.
6. Preserve the absence of a form/survey until the GoHighLevel embed is supplied.

## Sources

1. [W3C, Understanding Success Criterion 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
2. [U.S. Office of Disease Prevention and Health Promotion, Design Mobile Content to Meet Mobile Users’ Needs](https://odphp.health.gov/healthliteracyonline/2016/display/section-3-13/)
3. [CDC, Plain Language Materials & Resources](https://www.cdc.gov/health-literacy/php/develop-materials/plain-language.html)

## CDC Plain-Language Application

CDC recommends putting the most important message first, using headings and logical chunks, using active voice and familiar words, limiting sentences to one idea, and making information easy to find. For the ten LPs, this means each hero retains one direct symptom question, the visible phone number, one CTA, and short supporting text. The provider placeholder, testimonial placeholder, FAQ, legal language, and non-diagnostic disclosure remain visibly separated rather than mixed into the hero.
