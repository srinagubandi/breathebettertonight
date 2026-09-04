# Current Landing-Page Inventory

## Preservation baseline

The current production architecture is data-driven. `src/data/index.js` registers each doctor’s variants and city routes; each landing page automatically receives a base route, a qualified thank-you route, a non-qualified thank-you route, and city-specific equivalents. The current active registry contains **Dr. Willis Lay / Pantego Dental**, 13 variants, and five city records, creating 234 generated routes in the existing system.

| Route family | Current route pattern | Current behavior to preserve |
|---|---|---|
| Landing page | `/{doctor}/{variant}` | Symptom-led hero, symptom awareness, provider profile, FAQs, shared legal links, chat launcher, and phone CTA. |
| City landing page | `/{doctor}/{variant}/{city}` | Retains the design variant and uses city-specific display context and optional routing number override. |
| Qualified outcome | `/{doctor}/{variant}/thank-you` | A private-conversation confirmation page paired to the landing-page design system. |
| Non-qualified outcome | `/{doctor}/{variant}/thank-you-bt` | A neutral, non-diagnostic supporting outcome route. |
| City outcomes | `/{doctor}/{variant}/{city}/thank-you` and `/thank-you-bt` | Preserve city context and the original landing-page route family. |

## Live-reference observations

The live production page at `/dr-lay/v1` currently uses a symptom-first hero, an anchor-based symptom-check CTA, non-diagnostic awareness copy, provider placeholders, a phone CTA, shared privacy and terms links, and a chat launcher. It does not contain a GoHighLevel survey handoff. The page at `/dr-lay/v6/thank-you` currently uses the qualified thank-you route but does not yet retain the visual language of the Partner Impact landing page strongly enough to satisfy the new page-specific outcome requirement.

## Migration rules

The migration must retain every existing canonical URL and create compatibility behavior for any superseded internal structure. Existing page designs will be improved in place and must retain their page-specific hero, theme, and local city configuration. Each doctor-specific landing route must replace the current placeholder or anchor-based conversion step with only the doctor’s assigned GoHighLevel survey. Each landing-page design must have a visually matched qualified thank-you route and a visually matched non-qualified thank-you route.

## Active GoHighLevel assignments

| Campaign destination | Public practice context | Assigned survey ID | Survey URL |
|---|---|---|---|
| PerioDDS | Lakeside Dental Solutions / Dr. Rashid Beirute-Prada | `pvHcEcGNjxhXI3L8lSrE` | `https://api.leadconnectorhq.com/widget/survey/pvHcEcGNjxhXI3L8lSrE` |
| Dental World | Dental World / Dr. Sheetal R. Manmode | `Rx0LnsI0XLu8JfhiDnYc` | `https://api.leadconnectorhq.com/widget/survey/Rx0LnsI0XLu8JfhiDnYc` |
| Pantego Dental | Pantego Dental / Dr. Willis Lay | `75op3Tl4LTjPkaXI1zhb` | `https://api.leadconnectorhq.com/widget/survey/75op3Tl4LTjPkaXI1zhb` |

The generic public route will not silently load a practice-specific survey. Its purpose is education and explicit provider selection before it hands a visitor to the correct local conversion route.

## Contact configuration verification

Pantego Dental publicly lists `(817) 274-1825`. Dental World publicly lists `(407) 830-4401`. Lakeside Dental Solutions’ public contact materials list `(972) 412-0014`. These numbers can populate the Call action in the practice configuration; the corresponding Text action must remain explicitly configurable rather than assuming an office line accepts SMS.

## Local implementation browser verification — 2026-09-04

The Night-to-Clarity public homepage rendered with its provider-selection and Propel Dental professional handoff. The Pantego `tired-mornings` paid landing page rendered the approved ad-matched hero, visible Call and Text actions, a Request a consultation CTA, practice-scoped policy links, and the assigned live GoHighLevel survey `75op3Tl4LTjPkaXI1zhb`. No survey fields were completed or submitted during verification.
