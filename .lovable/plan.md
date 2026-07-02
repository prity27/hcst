# HCTS Admin Portal — WBS Compliance Refactor

This plan resolves every CRITICAL / MISSING item from the design review, keeps the existing design system, and flags CLARIFY items in-app for PM review instead of guessing. No new features beyond the WBS.

Backend note: this project currently uses only front-end mock data (`src/lib/mock-data.ts`, `localStorage` auth). All "API/DB" fixes below are implemented as typed mock services + Zod validation so behavior matches WBS. Real Cloud/DB migration is out of scope for this pass unless you say otherwise.

---

## 1. Global fixes

- Introduce canonical status enums in `src/lib/status.ts`:
  - `CampaignStatus`: Active | Closed | Historical
  - `MasterStatus`: Active | Inactive
  - `UserStatus`: Active | Inactive
  - `QrSeriesStatus`: Draft | Generated | SentToPrinter | Received | Active | Exhausted | Cancelled
  - `QrInventoryStatus`: Generated | Available | Assigned | Used | ScannedAtCollectionPoint | AssignedToDispatchNote | Dispatched | Returned | Damaged | Lost | Cancelled
- Update `StatusChip` to map each enum to a color; purge generic `Pending / Completed / In Progress`.
- Rewrite `mock-data.ts` rows to use only the new statuses.
- `MasterDataPage`: remove duplicate Import/Export (keep one Export menu with CSV/Excel), replace `Delete` row action with `Deactivate` when the entity has `status`.
- Add module-specific filter bar prop to `DataTable` (status filter + module-specific selects passed in via `filters` prop).
- Strip AI-invented columns/fields from all master pages (see §3).

## 2. Authentication & Roles

- `login.tsx`: remove Sign Up tab entirely and the role dropdown. Keep Sign In + Forgot Password only.
- Extend `Role` enum in `src/lib/roles.ts` to the full WBS set: `admin, ops_director, field_engineer, farm_manager, manijero, collection_team, loading_team, admin_team, reporting, read_only`.
- Add `PERMISSION_MATRIX`: for each role × module → `{ view, create, editOpen, editClosed, approve, close, export, configure, economicData }`.
- New helper `can(role, module, action)`; used by sidebar, page headers, row actions.
- Users page becomes the only place to create users; visible to `admin` only.
- Add `/roles` permission matrix viewer (read-only grid) generated from the matrix.

## 3. Master Data

- Enforce hierarchy Farm → Plot → Valve → Park in forms (parent select required, filtered children).
- Add computed hectare aggregation in mock service: park.ha = Σ valve.ha; valve.ha = Σ plot.ha; farm.ha = Σ plot.ha (displayed as read-only "Aggregated ha" column).
- Remove non-WBS fields from tables and mock data: Trees, Color, Rating, Capacity, Fleet Size, Level, Maturity Days. Flag each as `CLARIFY` in a `docs/CLARIFY.md` note surfaced in the UI via a "Pending PM confirmation" banner on affected pages.
- Workers: add DNI/NIE, Phone, Email, Registration Date, QR Card (code), Printable Worker Booklet action (opens print-ready sheet). Remove Productivity column.
- Machine Operators: `workerId` FK selector referencing `workers`; display worker name/DNI; cannot create standalone operator.

## 4. Campaigns

- Auto-generate `code` = `CMP-YYYY-NN`, read-only in the form.
- Enforce single Active campaign (mock service rejects create/activate if one exists).
- Lifecycle actions: `Close Campaign` (Active→Closed), `Archive` (Closed→Historical). Prevent Delete when linked ops records exist; offer Deactivate/Close instead.
- New route `/_app/campaigns/$id` — Campaign Details page with tabs: Overview, Assignments, Harvest, Dispatch Notes, Forecast, Actual Yield, Deliveries, Linked Records. All read-only tables sourced from mock data filtered by campaignId.

## 5. QR Management

- Rework `/qr-series`:
  - Remove `Scan QR` and any create-scan actions (mobile-only).
  - New Printer Order panel per series with fields: Printer, Sent Date, Received Date, Expected Qty, Received Qty, QC Result (Pass/Fail/Partial), Responsible Person.
  - Status gate: series cannot transition to `Active` until an Order exists with `Received` + QC Pass; enforced in mock service and reflected via disabled action + tooltip.
- `/qr-inventory`: remove `Scan QR` button (mobile-only), keep read/monitor with new lifecycle statuses and filters (status, series, plot, worker).

## 6. Operations (view-only in web)

- `/harvest-assignments`, `/dispatch-notes`, `/transfer-orders`:
  - Remove all create/edit forms and `New …` buttons.
  - Convert to Monitor views: filters + DataTable + row drawer with details, audit trail, and (if permitted) "Correct" / "Approve" / "Close" actions only.
- `/error-corrections` remains, tied to permission `editClosed`/`approve`.

## 7. Reports

- Keep MVP only:
  - `/reports/traceability` — steps Plot Origin → Collection Point Scan → Dispatch Note → Transfer Order → Truck Departure. Remove Buyer Delivered / Worker Scan / Park Storage steps.
  - `/reports/harvest`, `/reports/dispatch`, `/reports/forecast`, `/reports/productivity` — retained but stripped of non-WBS KPIs; add note where a metric is CLARIFY.

## 8. Dashboard

- Replace current tiles with WBS metrics: Active Crews, Satellite Staff, Satellite/Picker Ratio, Forecast Progress, plus existing Harvest Trend chart. Remove Phase-2 metrics. Fix QR label copy ("QR crates" not "QR codes scanned" where wrong).

## 9. Audit Log

- Filters: User, Module, Date range, Record Type, Change Type.
- Table columns: Timestamp, User, Module, Record Type, Record ID, Change Type, Before, After, Reason.
- Export CSV / Export Excel actions, pagination via TanStack table.

## 10. Settings / System Configuration

- Keep only: Estimated pallet weight, Offline timeout.
- Move QR Prefix, Backup, Maintenance, 2FA, Audit Retention behind a "Pending PM approval" collapsed section (disabled inputs) so we don't lose the copy but they're not active.

## 11. Validation & Business Rules

- Add Zod schemas in `src/lib/schemas/` for Campaign, Worker, Farm/Plot/Valve/Park, QrSeries, PrinterOrder, User.
- Central mock service `src/lib/services/*.ts` enforces:
  - unique campaign code, single-active-campaign, referenced-record protection (no delete → offer deactivate), status transitions, role permission check via `can()`.
- Standard error surface via `toast.error` with WBS-worded messages.

---

## Technical section

Files to add:
- `src/lib/status.ts`, `src/lib/permissions.ts`, `src/lib/schemas/*.ts`, `src/lib/services/{campaigns,qr,masterData,users,audit}.ts`
- `src/routes/_app.campaigns.$id.tsx` (details w/ tabs)
- `src/components/common/ClarifyBanner.tsx`, `FilterBar.tsx`
- `src/components/qr/PrinterOrderPanel.tsx`
- `src/components/workers/WorkerBooklet.tsx` (print sheet)

Files to edit:
- `src/lib/roles.ts` (+ permission matrix), `src/lib/auth.ts` (drop signUp export usage from UI), `src/routes/login.tsx`
- `src/lib/mock-data.ts` (statuses, remove invented fields, add printer orders, worker fields)
- `src/components/common/{DataTable,MasterDataPage,PageHeader,StatusChip}.tsx`
- All `_app.*.tsx` master pages (columns/fields), `_app.campaigns.tsx`, `_app.qr-series.tsx`, `_app.qr-inventory.tsx`, `_app.harvest-assignments.tsx`, `_app.dispatch-notes.tsx`, `_app.transfer-orders.tsx`, `_app.dashboard.tsx`, `_app.audit-logs.tsx`, `_app.reports.*`, `_app.settings.tsx`, `AppSidebar.tsx`.

Out of scope this pass (call out if you want them done next):
- Real Lovable Cloud DB schema + RLS migration (currently all mock). Plan §12 "Database" from the review needs Cloud enabled — say the word and I'll add it as a follow-up.
- Real audit-log persistence and CSV/XLSX server export (will be client-side export against mock data for now).

## CLARIFY items surfaced (not implemented)

Shown in-app as banners so PM can confirm:
- Whether any of Trees / Color / Rating / Capacity / Fleet Size / Level / Maturity Days should be retained on specific master entities.
- Whether Backup / Maintenance / 2FA / Audit Retention / QR Prefix belong in Settings.
- Exact Permission Matrix cell values per role (starter matrix provided, editable).
- Copy for Printer QC Result enum values.

Confirm and I'll execute the refactor in this order: status/permissions foundation → auth → master data → campaigns → QR → ops view-only → reports/dashboard/audit/settings → validation pass.
