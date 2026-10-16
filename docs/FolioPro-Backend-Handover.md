# FolioPro — Backend implementation handover

**Version:** 1.0 · **Audience:** backend and integration engineers

## 1. Purpose and implementation status

FolioPro combines a private professional workspace, an intentional public portfolio, evidence management, and a CV builder. This document specifies the backend needed to support the existing interface. It is a proposed implementation contract, not a claim that these services exist.

**Implemented:** premium homepage; registration, sign-in and three-stage recovery screens; dashboard shell; 11 professional modules; profile editing/photo selection; session-only add/edit/duplicate/delete/search; visibility selection; connected portfolio preview/settings; publishing confirmation preview; account/security/preferences screens; searchable help; editable CV builder with Modern/Classic, A4/Letter, section inclusion/reordering, workspace import and browser PDF download.

**Not implemented:** actual account creation/sign-in/verification, persisted edits, remote uploads, real public portfolio hosting, public URL reservation, email delivery, server search, real notifications, support delivery, account deletion, saved CV versions. Never remove preview notices until these flows succeed against real services.

There is no connected account/data backend. In-memory workspace state resets on refresh. Login/register validate and explain this limitation; they do not authenticate. Recovery accepts any six digits for the interface demonstration and must never be used as an actual verification mechanism. Publishing changes preview status only. File selection records a filename, not a remote file. Profile photos use a session data URL. The application has no admin feature or billing requirement.

## 2. Frontend inventory and integration map

| URL | Existing surface | Required backend |
| --- | --- | --- |
| `/` | Homepage and dashboard access | Public marketing, no private query |
| `/register` | Full registration form | Account creation, verification, private profile bootstrap |
| `/login` | Email/password | Sign-in, session refresh, sign-out |
| `/forgot-password` | Email → 6-digit code → password/confirmation | Single-use recovery challenge and password reset |
| `/dashboard` | Overview, activity, readiness | Authorized summary and activity queries |
| `/dashboard/profile` | Name, headline, email, phone, location, about, visibility, photo | Profile read/update and photo upload |
| `/dashboard/experience`, `/education`, `/skills`, `/projects`, `/certifications`, `/awards`, `/publications`, `/services`, `/testimonials`, `/media`, `/links` (each below `/dashboard`) | Shared listing and entry editor | Owned CRUD, pagination, filtering, duplicate, evidence attachment |
| `/dashboard/portfolio` | Draft/publish/unpublish confirmation | Validate and publish snapshot, unpublish, status |
| `/dashboard/portfolio/preview` | Desktop/mobile public-only preview | Preview projection from owner's draft |
| `/dashboard/portfolio/settings` | Username, Ink/Light/Warm, public profile, links/evidence/indexing | Unique slug reservation and settings |
| `/dashboard/cv` | Editable CV and PDF download | Optional saved CV versions and workspace hydration |
| `/dashboard/settings` | Account, security, notifications, privacy, deletion | Account update, password change, preferences, deletion jobs |
| `/dashboard/help` | FAQ search, report preparation | Support submission/delivery if desired |

`src/routes/dashboard.tsx` mounts `WorkspaceProvider` and the shared shell. Keep this layout. `src/routes/dashboard.portfolio.tsx` is an Outlet-only parent; overview content lives in `dashboard.portfolio.index.tsx`. Do not put overview content back in the parent or its children will not render.

`src/data/dashboard.ts` contains isolated demonstration data, module field definitions, navigation, sample activities and viewer. `src/components/dashboard/WorkspaceProvider.tsx` owns session state and adapts fixtures into editable entries. Replace fixture hydration with authorized reads; keep an adapter so presentation components do not need database-specific row shapes.

`ModulePage.tsx` implements shared forms. `PortfolioDocument.tsx` renders the selected public projection. `src/lib/workspace-rules.ts` contains presentation privacy predicates. `src/data/cv.ts` defines `CvDocument`; `src/lib/cv-pdf.ts` dynamically imports jsPDF in the browser. `AuthShell.tsx` owns reusable auth fields and password visibility.

## 3. Recommended architecture

Use the existing TanStack Start / React application; do not add another router or a second UI backend. Internal operations should use authenticated `createServerFn` handlers and TanStack Query. Public initial reads belong in route loaders using `ensureQueryData`; components use the same query options. Put authentication guards on a pathless authenticated parent and preserve published `/dashboard/...` URLs.

Suggested modules: `src/features/{auth,workspace,portfolio,media,cv,support}/` with browser-safe types/validation, query options and server functions separated. This is a recommendation, not existing structure.

Runtime is Cloudflare workerd, not Node. Read the platform runtime/server-function rules before implementation. Browser code may not import privileged clients, filesystem modules, SMTP clients or Node PDF tooling. Use the managed account/database/storage service (Lovable Cloud if completing here) or integrate the owner's separately managed backend using equivalent security guarantees. Enable Cloud before adding backend behavior in Lovable.

All internal private calls require a session, server validation and ownership enforcement. Use the authenticated service client with row-level policies; do not use an administrator client for routine reads/writes. Server functions are publicly callable if no auth middleware is attached. Public portfolio reads must return a narrow allowlisted published projection only. External webhooks, if introduced, belong under `/api/public/*` and verify signatures/callers inside the handler.

## 4. Authentication contract

### Registration fields (current names)

| Field | Validation and handling |
| --- | --- |
| `name` | Required, trim; display full name |
| `email` | Required, trim and lowercase; current client regex `^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`; use a robust provider validator too |
| `password` | Required, 8–128 characters, at least one uppercase, lowercase and digit. Provider hashes it; never store in profile rows/logs |
| `phone` | Required; intended minimum 11 digits. Current client checks string length, so backend must count normalized digits; align frontend before production |
| `gender` | Required enum `male`, `female`, `others`; private account field |
| `dateOfBirth` | Required ISO date, not in future; private. Server must enforce validity, not only the input's max date |
| `street`, `city`, `state`, `country` | Optional strings, trim, private address |

Backend must impose documented string limits and align the inputs; do not silently invent age restrictions. Email verification policy is a launch decision. Provider email verification and password recovery are distinct flows. Account creation and profile bootstrap should be transactional or idempotent with retry/repair.

`signIn({email,password})` returns a managed session; use generic invalid credentials errors, not account enumeration. On successful real sign-in navigate to `/dashboard`, hydrate the real user and remove fixtures. Support session expiration, refresh, rate limiting and cross-tab sign-out. The shell's Leave workspace dialog becomes a true server/provider sign-out only when connected.

### Password recovery (required three-stage interface)

1. `requestPasswordReset({email})` always gives an indistinguishable accepted response. Generate a cryptographically random six-digit code, store a keyed hash, bind to purpose/account/challenge and email it using the provider or mail service.
2. `verifyPasswordReset({challengeId,code})` validates expiry and attempt budget, atomically consumes the code, and returns a short-lived single-use reset grant. Never accept a merely six-digit string as verified.
3. `completePasswordReset({resetGrant,newPassword,confirmPassword})` enforces strength and equality, atomically consumes the grant, changes the password and invalidates prior sessions as policy requires. UI success appears only after success from the service.

**Recommended initial security defaults (not user-selected business rules):** 10-minute code lifetime, 5 attempts per challenge, 60-second resend delay, 15-minute reset grant. Rate-limit by account and IP with independent hourly limits; tune using abuse metrics. Resend invalidates previous code; error text does not identify account existence. Do not log passwords, codes or grants. Tests must cover expired/reused codes, concurrent use and lockouts.

## 5. Data model

Use provider-managed identity for passwords/sessions. Never create a plaintext password column. Every owned row carries `owner_id` referencing the identity ID, `id` UUID, `created_at`, `updated_at`, and an optimistic concurrency `version`.

Suggested normalized tables:

- `profiles`: owner PK, full_name, headline, about, professional_location, photo_asset_id, visibility (`public`/`private`). Keep public-safe professional identity separate from sensitive registration data.
- `account_details`: owner PK, phone, gender, date_of_birth, street, city, state, country. Private always unless a field has separate explicit consent. Email comes from identity and is reflected through account projections.
- `workspace_entries`: id, owner_id, module enum, title, summary/description, visibility enum (`public`/`private`/`hidden`), sort_order, version. Module-specific one-to-one detail tables listed below; an alternative validated JSON payload is acceptable but must enforce per-module schemas server-side.
- `experience_details`: entry_id, organization, location, description; extend with start_date/end_date/is_current when the UI supports dates.
- `education_details`: entry_id, qualification, institution, field_of_study, description; future structured dates.
- `skill_details`: entry_id, category, level; proficiency currently free text, do not pretend enum exists.
- `project_details`: entry_id, role, organization, description; future cover, outcomes and dates.
- `certification_details`: entry_id, issuer, credential_id, description; future issue/expiry dates/verification URL.
- `award_details`: entry_id, organization, award_date or text date; UI currently has a text date.
- `publication_details`: entry_id, publication_type, publisher, external_url.
- `service_details`: entry_id, category, delivery_information, description. No payment/price field currently.
- `testimonial_details`: entry_id, person_name, position_and_organization, relationship, testimonial. Public consent should be recorded before real publication.
- `link_details`: entry_id, label, url, description.
- `media_assets`: id, owner_id, display_title, category, description, bucket, object_key, original_filename, mime_type, byte_size, sha256, visibility (private default), scan_status, upload_status. Store object keys, not expiring signed URLs.
- `entry_evidence`: entry_id, asset_id, owner_id, sort_order; enforce both records belong to caller, unique pair, cascade association on deletion.
- `portfolio_settings`: owner PK, unique normalized username, theme enum, public_profile, show_links, show_evidence, discoverable, version. Domain is deployment configuration, not `foliopro.me`: no ownership of that domain has been established.
- `portfolio_publications`: owner, revision, public snapshot JSON, published_at, unpublished_at/status, settings_version. Owner's drafts must not modify public projection until Publish succeeds.
- `notification_preferences`: owner, email_notifications, product_guidance, portfolio_activity.
- `notifications`: id, owner, type, payload, created_at, read_at; only provider-generated events, not arbitrary public inserts.
- `activity_events`: id, owner, action, entity_type/id, safe label, occurred_at. Record successful mutations transactionally.
- `cv_documents`: id, owner, optional name, structured content JSON, included sections/order, template, paper_size, version. Saved CV versions are proposed; current builder is one session document.
- `support_tickets`: id, owner, message, status, timestamps; delivery outbox if email enabled.
- `recovery_challenges`/`reset_grants`: only if provider lacks required code flow; secrets hashed, strict TTL/attempts, server-only access.

Use timestamps in UTC; distinguish dates without time from timestamps. Foreign keys and constraints validate ownership and allowed states. Index owner/module/sort, owner/update time, and published usernames. No demo records should be seeded into actual users' accounts. An explicit demo mode may retain the current fixtures; do not seed on page load.

## 6. Exact module form mapping

Asterisks identify current required fields. All shared fields currently use maximum 255 characters in text inputs; description/testimonial use 1000. Current generic form validation is trim + max 1000. Align and enforce final limits in shared server/client schemas.

| Module | Current form keys |
| --- | --- |
| experience | `title`*, `organization`*, `location`, `description` |
| education | `qualification`*, `institution`*, `field`, `description` |
| skills | `title`*, `category`*, `level` |
| projects | `title`*, `role`, `organization`, `description` |
| certifications | `title`*, `issuer`*, `credential`, `description` |
| awards | `title`*, `organization`*, `date`, `description` |
| publications | `title`*, `type`*, `publisher`, `url` |
| services | `title`*, `category`, `delivery`, `description` |
| testimonials | `name`*, `position`, `relationship`, `testimonial`* |
| media | `title`*, `type`*, `description`, selected local file |
| links | `label`*, `url`*, `description` |

All editors also select `Public`/`Private`/`Hidden` and can select supporting evidence. New entries in this preview default Private. Map UI labels to lowercase persisted enum values in one adapter. `meta` is a display string, not a database column containing business facts: build it from structured fields. Fixtures contain dates/locations in meta that are only partially mapped into editor fields; replace them with real structured records before production.

**Workspace adapter shape:** `{id,title,meta,detail,visibility,evidence?,fields: Record<string,string>}` grouped by module. `evidence` is currently display text, not a real relationship. Extend to `evidenceIds` and joined metadata when integrating.

## 7. Operation and error contracts

These names are a proposed internal contract; none are currently implemented handlers.

| Operation | Input | Result |
| --- | --- | --- |
| `getWorkspace` | optional filters | profile, entries, settings, portfolio status, completion, activity |
| `updateProfile` | editable fields, expectedVersion | updated profile/version |
| `updateAccount` | name, email and/or private details | updated details; email change verification state |
| `listEntries` | module, query, visibility, cursor, limit | items, nextCursor, total |
| `createEntry` | module, validated fields, visibility, evidenceIds, idempotencyKey | created entry |
| `updateEntry` | id, fields, visibility, expectedVersion | updated entry |
| `duplicateEntry` | id, idempotencyKey | new owned entry, independent ID |
| `deleteEntry` | id, expectedVersion | deleted ID; unattached assets not silently deleted |
| `reorderEntries` | module, ordered IDs, expectedVersion | validated order |
| `createUpload` | name, mime, bytes, checksum, target | assetId, narrowly signed upload permission |
| `finalizeUpload` | assetId, checksum | verified/processing metadata |
| `attachEvidence` | entryId, assetId | owned association |
| `setAssetVisibility` | assetId, visibility, expectedVersion | updated metadata, explicit publication review |
| `downloadAsset` | assetId | authorization-checked short-lived URL |
| `savePortfolioSettings` | username/theme/booleans, expectedVersion | updated settings, slug conflict if occupied |
| `getPortfolioPreview` | current owner | draft public-safe projection |
| `publishPortfolio` | expectedRevision | published revision, actual public URL |
| `unpublishPortfolio` | expectedRevision | status with public URL unavailable |
| `getPublicPortfolio` | normalized username | published public projection only or not found |
| `saveCv`, `listCvs`, `getCv`, `deleteCv` | content/config/IDs and expectedVersion | owned saved version(s), optional feature |
| `updateNotificationPreferences` | boolean preferences | preferences |
| `listNotifications`, `markRead` | cursor / owned IDs | notifications / updated unread count |
| `submitSupportTicket` | message, optional diagnostic consent | ticket reference |
| `requestAccountDeletion` | fresh authentication, explicit confirmation | deletion job/reference/status |

Success envelope: `{data, requestId}`. Error envelope: `{error:{code,message,fieldErrors?,retryAfterSeconds?},requestId}`. Codes: `UNAUTHENTICATED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`, `CONFLICT`, `RATE_LIMITED`, `UPLOAD_REJECTED`, `SERVICE_UNAVAILABLE`. Redact server internals. Do not return another user's resource existence in forbidden errors. Use cursor pagination and deterministic order. Set query length/page-size limits in shared schemas (suggest 100 query characters, 50 rows per page). Mutations needing idempotency reject replay only after returning the original result safely.

Example create:

```json
{"module":"experience","fields":{"title":"Programme Lead","organization":"Community Studio","location":"Lagos","description":"Led an inclusive service programme."},"visibility":"private","evidenceIds":[],"idempotencyKey":"client-generated-uuid"}
```

Example response:

```json
{"data":{"id":"entry-uuid","module":"experience","title":"Programme Lead","visibility":"private","version":1},"requestId":"trace-id"}
```

A version mismatch returns `CONFLICT`; UI offers reload/merge rather than silently overwriting.

## 8. Evidence and public portfolio security

- Every private query/mutation must prove caller ownership. User-supplied `owner_id` is never authoritative. Cross-user CRUD, attachments, URL access, CV reads and notifications require denial tests.
- Store original files in a private bucket. Public visibility does not automatically move an object to a publicly enumerable bucket. Public downloads require both the asset and published portfolio permission; use short-lived signed delivery or a public-safe derivative.
- Never inherit an attachment's visibility from its parent. A Public project may have Private supporting research; that research must remain absent from public payloads and downloads.
- Verify actual MIME/file signatures and size after upload. Disallow executable/HTML/SVG active content unless sanitized deliberately; scan documents, strip image metadata, prevent untrusted URLs redirecting private credentials. Client file accept filters are not security.
- Recommended launch allowlist: JPEG/PNG/WebP and PDF with configurable per-file/account quotas. Actual limits remain a product decision and must be shown in the upload UI. Do not claim quota enforcement currently exists.
- Publish transaction validates all public permissions and consent, generates a snapshot, updates revision and invalidates caches. Unpublish immediately blocks public reads and invalidates caches; already downloaded copies cannot be recalled.
- Public payload must not contain owner IDs, email/phone without consent, date of birth, gender, street address, private evidence keys, Hidden entries, internal activity or account/security metadata.
- Validate external links using a parsed URL with HTTP(S) scheme only. Never execute user HTML. Open external tabs with safe relationship attributes if using them.
- Reserve normalized usernames atomically; restrict reserved system names. Do not hardcode any invented domain. Slug redirects/versioning require explicit policy.
- `discoverable=false` emits noindex on the published public leaf; it is not access control. Private/unpublished URLs return a neutral not-found response. Give public portfolio pages unique title/description and actual visible cover OG images only if absolute HTTPS.

## 9. CV integration

Current shape:

```ts
type CvDocument = {
 name: string; headline: string; email: string; phone: string;
 location: string; summary: string;
 sections: Record<'experience'|'education'|'skills'|'projects'|'certifications',
   Array<{id: string; title: string; subtitle: string; description: string}>>;
};
```

The owner imports all their workspace entries, including Private/Hidden ones, into a private CV draft. This is intentional: a downloaded private CV is not a public portfolio. Before public CV hosting/sharing is introduced, require explicit review of contact information and private entries. Checkbox controls currently select entire sections, not individual source entries; entries can be edited/deleted in the CV itself. Section order uses up/down buttons. Templates are Modern and Classic only; A4 and US Letter supported. CV edits do not mutate original profile/entries. Import replaces the CV draft with current workspace data. Refresh or leaving/re-entering the CV page resets its draft.

Download is real and browser-side using jsPDF with selectable Latin text and automatic pagination. No account backend is needed for current download. PDF is content-equivalent, not a pixel-identical render of the styled preview; modern/classic export changes heading sizing. Built-in Helvetica does not cover every writing system. Production international support requires licensed embedded Unicode fonts and script shaping, with multilingual test fixtures. Do not use Node Chromium/Puppeteer inside workerd; a future exact-layout server export needs a supported browser-rendering service and private authorization.

Persist CV content snapshots/config as owned versions if adding saved versions; preserve edit independence from evolving workspace records. Generated files are private, encrypted-at-rest storage with retention policy if stored. No AI generation or invented career claims is included or required.

## 10. Interface behaviors when replacing preview

1. Authenticate before mounting real workspace; handle refresh/session expiry and intended redirects. Derive viewer name/initials from account, not `viewer` fixture.
2. Replace preview data with a loaded authorized workspace, skeleton/pending state, error boundary and retry.
3. Await mutations; disable duplicate submissions; show field errors next to inputs; update/invalidate affected list, profile, overview, portfolio and notifications queries only on success. Failed delete must keep entry visible.
4. Edit prepopulates exact structured values. Duplicate retains independent ID; define whether private attachments are referenced or cloned. Search must not expose other users' rows.
5. Read back a successful save through a fresh query and reload test. Do not equate a success toast with persistence.
6. Overview counts/activity/completion must be computed from real data. Current percentages and sample counts are demonstration metrics and must be removed/replaced. Profile completeness should use documented criteria, not invented weights.
7. File uploads need selected/progress/scanning/ready/rejected/retry states and explicit visibility confirmation. Replace local data URLs/filename-only metadata with uploaded assets.
8. Portfolio publish/unpublish must await actual service confirmation and real URL before displaying “Published” or copy/share actions.
9. Real notifications unread badge follows unread count; search opens with Ctrl/⌘K but private content search remains separate from current navigation search.
10. Settings/email/password/deletion/support success must represent real service responses. Fresh reauthentication is mandatory for password/email and deletion-sensitive operations.
11. Remove demonstration labels only on real-data paths; keep an explicit separate demo experience if needed. Preserve premium Sora/Manrope design tokens and existing URLs.

## 11. Privacy, logging, deployment and operations

Use managed password hashing and secret storage. Privileged keys only in server handlers; never frontend environment variables. HTTPS, secure cookie settings if cookies used, CSRF protection where cookie-authenticated writes exist, strict CORS for external APIs, safe CSP and sanitized rendering. Add tenant-scoped RLS to every owned table plus storage policies, minimal grants and denied anonymous writes. Verify policies as anonymous, owner and a different user.

Log request ID, action, duration and outcome, not tokens/codes/passwords/files/bios or full PII. Audit sensitive changes and publication events with restricted retention. Keep error analytics consent/privacy-aware. Jobs for email, scanning, deletion and cleanup need retries, idempotency, dead-letter handling and visible recoverable failure states. Use transaction/outbox patterns to avoid “saved but email lost”.

Backups and restore drills must include database and object storage. Add schema migrations, staging/production isolation, secrets rotation, rate-limit monitoring, storage quotas, upload cleanup, account deletion retention policy and uptime alarms. Configure sender domain, recovery email delivery, site redirect allowlist and production origin. Backend engineer must verify real provider settings; source code or missing env vars do not prove signup/sign-in configuration.

Account deletion must revoke sessions, unpublish portfolios, delete/queue owned rows/assets, apply legally required retention exceptions, and report completion only after the process is complete. Export/access/deletion requests need identity verification; no legal compliance badge should be asserted without review. No Terms/Privacy policies have been supplied; obtain actual business/legal content and support destination before launch, rather than inventing them.

## 12. Acceptance tests and launch checklist

- Register all supplied fields; invalid email/phone/date/password rejected on server and UI. Duplicate/retried signup safe. Verification and real sign-in read back correct account.
- Reset code sent through real provider; wrong/expired/reused codes denied; max attempts/resends enforced; only verified grant changes password; prior sessions handled.
- Two users cannot read/edit/delete/duplicate/attach/download each other's content. Anonymous cannot access dashboard/server operations.
- Every module create/edit/duplicate/delete persists after reload; optional fields preserved; list/search pagination and version conflicts correct.
- Public/Private/Hidden projection rules verified with actual serialized payload and storage downloads, not just hidden UI.
- Private attachment to public entry inaccessible publicly; public evidence disabled removes all evidence output.
- Upload MIME spoof/oversize/path traversal rejected; abandoned uploads cleaned up; safe documents downloadable after scanning only.
- Slug collision atomic; unpublish blocks public reads; changes stay draft until republished; cache invalidation/noindex correct.
- CV import/edit/order/include/export works; original source untouched; PDF readable/paginated; saved versions owner-protected if built; Unicode coverage explicitly tested.
- Password/email changes require reauth, notification preferences persist, unread state updates, logout invalidates session.
- Support ticket readback/delivery and deletion jobs monitored; no false successful toast after upstream failure.
- Keyboard navigation/dialog focus and all mobile/desktop layouts; account error/loading/empty states; all content leaf metadata.
- End-to-end real-account journey: register → sign in → edit profile → add private/public work → attach evidence → reload → preview → publish → unauthenticated public read → unpublish → CV download → sign out.

**Frontend checks already performed:** shared session profile edit; experience required validation/add/edit; CV workspace import, template/order and downloadable PDF; privacy-aware portfolio rendering; mobile drawer and no horizontal overflow. These are preview checks, not authenticated backend verification.

Suggested delivery sequence: (1) identity + owned schemas/policies, (2) real profile and module CRUD, (3) uploads/evidence permissions, (4) draft/publish/public routing, (5) preferences/security/recovery/notifications/support/deletion, (6) optional saved CVs + international PDF, (7) real-account acceptance/security/operational launch review. Product brand/domain availability is not established by this rename; obtain ownership independently before choosing a custom domain.
