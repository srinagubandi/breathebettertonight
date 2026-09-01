# Breathe Better Tonight — Additive Website Release Review

**Release:** `5b4c370` — `feat: add national site and lead dashboard`

**Repository:** [srinagubandi/breathebettertonight](https://github.com/srinagubandi/breathebettertonight)

**Production:** [www.breathebettertonight.com](https://www.breathebettertonight.com/)

## Executive Summary

The project has been converted from a landing-page-led experience into a **national, multi-page sleep-awareness website** while retaining the original provider-specific landing pages, generated city routes, thank-you variants, assets, and deployment structure. The release adds a standard contact form, a dedicated confirmation page, a protected lead-review dashboard, persistent storage for submitted leads, and hardened configuration behavior.

The implemented site intentionally provides general awareness and a request pathway rather than diagnosis or emergency guidance. The contact form limits collection to contact and request-routing information and does not solicit detailed medical history or insurance information.

## Implemented Scope

| Area | Additive implementation |
|---|---|
| Public experience | A navy-and-teal national website at `/`, with `/symptom-check`, `/about`, `/faq`, `/contact`, and `/thank-you`. |
| Lead form | Required name, phone, email, inquiry type, preferred contact method, and consent fields; server-side validation; a 303 redirect to the thank-you page after success. |
| Administration | A Basic-Auth-protected `/admin` dashboard showing new submissions, timestamp, contact preference, inquiry type, and workflow status. Existing legacy landing-page links remain available there. |
| Lead handling | Status transitions for `New`, `Contacted`, `Scheduled`, and `Closed`; no sensitive free-text medical fields are required. |
| Storage | File-backed storage designed for `LEADS_FILE=/data/leads.json`; a Railway volume now supplies the `/data` mount in production. |
| Security | The admin area fails closed when mandatory credentials are absent or use the legacy insecure default. Status mutations use same-origin checks, and baseline browser security headers are supplied. |
| Tracking | Former static third-party placeholder IDs are now opt-in environment configuration, preventing invalid unconfigured requests. |
| Documentation | `.env.example` and `README.md` describe credential handling, persistent storage, routes, and QA commands. |

## Preserved Functionality

No existing tracked routes, page data, assets, or services were removed. The original generated landing-page system remains intact, including the doctor/variant pages and supporting thank-you/legal routes. The Railway project retains both existing services, its domains, GitHub linkage, and the single production replica.

## Production Configuration Completed

The `breathebettertonight-web` service now has a 100 MB persistent volume named `leads-storage` mounted at `/data`. The `LEADS_FILE` variable points to `/data/leads.json`. The administrative username and password were rotated in the Railway environment; the password is intentionally not recorded in this file or the repository.

## Verification Results

| Check | Result |
|---|---|
| Legacy landing-page structural QA | Passed for all 13 configured landing-page variants. |
| Generated-route verification | Passed for **234** generated routes, each returning HTTP 200 with no removed survey placeholder. |
| Supporting-page visual QA | Passed for the 13 thank-you pairs plus privacy and terms on mobile and desktop captures. |
| Legacy responsive QA | Passed for all 13 landing-page variants on mobile and desktop captures. |
| Local new-flow test | Contact submission returned HTTP 303; protected admin returned HTTP 200 with new credentials; legacy route returned HTTP 200. |
| Live production test | The new home page, contact page, protected admin area, and preserved legacy route each returned HTTP 200. |
| Custom-domain test | Both `https://www.breathebettertonight.com/` and `https://breathebettertonight.com/` return the new production title. |
| Deployment configuration | Railway reported a successful deployment, a configured credential set, `LEADS_FILE`, and an active `/data` volume mount. |

## Remaining Operational Recommendations

The current JSON lead store is appropriate for a single-replica, low-volume intake workflow. Before adding multiple service replicas, multiple dashboard users, integrations, or significant lead volume, move lead records to a managed database with individual user accounts, role-based access, encrypted backups, audit logs, and a documented retention policy. The new Railway volume should also have a periodic backup policy enabled, because a volume is not a substitute for an independent backup.

The current administrative route uses one shared Basic-Auth credential. It is suitable as a transitional operator console but should be replaced by individual authenticated accounts before broad staff access. Finally, publish a practice-reviewed privacy notice and intake operating procedure before routing inquiries to participating practices nationwide.

## References

[1] [Breathe Better Tonight production website](https://www.breathebettertonight.com/)

[2] [Breathe Better Tonight GitHub repository](https://github.com/srinagubandi/breathebettertonight)

[3] [Railway documentation — Volumes](https://docs.railway.com/volumes/overview)
