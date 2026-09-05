# Admin Operations Workspace Model

## Purpose

The protected Breathe Better Tonight admin workspace is a **practice publishing console**, not a patient-data system. It lets an authenticated administrator review practice presentation, campaign routing, configuration impact, and publish readiness without changing GoHighLevel survey ownership or copying practice-survey responses into the BBT site.

## Operating States

| State | Meaning | Public effect |
|---|---|---|
| **Live** | The current protected practice override stored on the Railway volume. | Used by public landing pages and outcomes. |
| **Draft** | A validated proposed practice override stored separately from the live override. | No public change; available only in authenticated admin preview. |
| **Published history** | A bounded, protected version record containing the applied configuration snapshot and changed-field names. | No direct public effect; supports review and rollback. |
| **Restored version** | A prior protected snapshot promoted back to live configuration. | Updates public rendering only after the explicit restore action. |

## Safety Boundaries

The workspace keeps every practice tied to its existing assigned GoHighLevel survey ID. It does not ingest, display, or analyze patient-level GoHighLevel submissions. The only analytics available in the workspace are aggregate counts from the BBT general inquiry store; practice-survey performance remains in GoHighLevel.

Every destructive or high-impact operation requires an explicit scope confirmation. Bulk display actions are limited to public-visibility controls, record their scope in protected history, and do not alter phone routing, policy URLs, campaign routes, or surveys. Preview routes require existing admin authentication and are not public.

## Admin Data Model

```text
practice configuration store
├── practices[key]        live validated overrides
├── drafts[key]           validated non-public override proposals
└── history[]             bounded published/rollback/bulk version records
    ├── id, occurredAt, action, practiceKey
    ├── changedFields
    └── snapshot           protected configuration snapshot for restoration
```

Profile configuration includes only public-facing operational fields: doctor name, credentials, service-area label, short approved profile note, portrait status, restricted approved portrait path, and appropriate alt text. Portrait paths are restricted to local approved public image paths; no arbitrary external image URL is accepted.

## Readiness Criteria

A practice is considered ready when it has a valid survey ID, complete Call/Text routes, practice policy profile, supported campaign assignments, required public identity fields when identity is visible, and consistent profile/photo settings. The workspace treats content checks as operational prompts rather than clinical judgments.
