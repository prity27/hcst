
# HCTS WBS Compliance Refactor

This is a large refactor across ~40 files. I'll ship it in one pass, grouped by area. No new features, no backend (the app is currently mock-data / localStorage only — no DB/API layer exists yet, so "Database" and "API" deliverables become mock-data shape + client-side validation stubs, flagged for PM).

## 1. Global fixes

- **Status vocabulary** (`src/lib/mock-data.ts` + `StatusChip.tsx`): rewrite status values per WBS for Campaigns, Master Data, Users, QR Series, QR Inventory. Purge "Pending / Completed / In Progress" from mock data and status color map.
- **Duplicate Import/Export**: `MasterDataPage.tsx` currently renders Import+Export+Add. Keep single Import and single Export. Audit `campaigns.tsx`, `qr-series.tsx` for duplicates.
- **Delete → Deactivate**: change row action label + confirmation copy in `DataTable` action menu and per-page overrides where operational history exists (Campaigns, Farms, Plots, Valves, Parks, Workers, Machines, Buyers, etc.).
- **Module-specific filters**: add a `filters` prop to `MasterDataPage` / `DataTable` and wire per-module filters (e.g. Farms: status; Plots: farm+status; Workers: employment company+status; QR: series+status).
- **Remove invented fields** from mock data + column defs: Trees, Color, Rating, Capacity, Fleet Size, Level, Maturity Days, Productivity (Workers).

## 2. Authentication (CRITICAL security)

- `src/routes/login.tsx`: remove Role selector from Sign Up tab. Sign-up creates a pending account with no role, or is disabled entirely with a note "Accounts are provisioned by a System Administrator." Simplest: keep sign-up UI but hard-code role to `read_only` and hide the picker.
- `src/lib/auth.ts`: `signUp` no longer accepts `role`; forced to `read_only`.
- `src/lib/roles.ts`: extend `Role` union with WBS roles: `farm_manager`, `manijero`, `collection_team`, `loading_team` (keep existing). Add `ROLE_LABELS`/`DESCRIPTIONS`, and a **Permission Matrix** table: `{ view, create, editOpen, editClosed, approve, close, export, configure, economicData }` per role.
- Add helper `can(role, action, module?)` and use it to gate action buttons across pages.
- Users management page: only `admin` can access.

## 3. Campaign Management

- `campaigns.tsx`:
  - Auto-generate code (read-only field: `C-YYYY-NNN`).
  - Enforce single Active campaign — disable Save if one already Active.
  - Replace "Add Campaign" flow status options with `Active | Closed | Historical`.
  - Add row actions: **Close Campaign** (Active → Closed), **Archive** (Closed → Historical). Block Deactivate when linked operational records exist.
  - Row click → `/campaigns/$id` **Campaign Details** page.
- New route `src/routes/_app.campaigns.$id.tsx`: tabs for Assignments, Harvest, Dispatch Notes, Forecast, Actual Yield, Deliveries, Linked Records — all read-only, sourced from mock data filtered by campaignId.

## 4. Master Data hierarchy

- Mock data: ensure Farm → Plot → Valve → Park relationships have proper FKs (add `farmId`, `plotId`, `valveId`).
- Add computed hectare aggregation helper `aggregateHectares()` and show rolled-up hectares on Farm/Plot/Valve pages.
- Workers: add `dni`, `phone`, `email`, `registrationDate`, `qrCard` fields. Add row action **Print Worker Booklet** (opens a print-friendly dialog). Remove Productivity column.
- Machine Operators: `workerId` FK to `workers`; render worker name via lookup, block creation of standalone operator identity (CLARIFY flagged if user wanted separate entity).

## 5. QR Management

- `qr-series.tsx`: add **Printer Order** panel with fields Printer, Sent Date, Received Date, Expected Qty, Received Qty, QC Result, Responsible Person. Series status cannot advance to `Active` until `Received` + QC pass.
- Replace status options with the WBS set.
- `qr-inventory.tsx`: remove "Scan QR" button (mobile-only). Update statuses.

## 6. System Configuration

- `settings.tsx`: strip System Config tab down to `Estimated pallet weight` and `Offline timeout`. Move QR Prefix / Backup / Maintenance / 2FA / Audit Retention behind a "Pending PM approval" note (rendered as disabled + tag `CLARIFY`).

## 7. Operations (mobile-only creates)

- `harvest-assignments.tsx`: remove the "New Assignment" form Card. Keep the DataTable in view-only mode. Add filter chips (campaign, farm, crew, status).
- `dispatch-notes.tsx`, `transfer-orders.tsx`: remove "Add" / "New" buttons; keep monitor+audit views only.
- `error-corrections.tsx`: retained (Field Engineer workflow).

## 8. Reports

- Keep only MVP: Traceability with the 5-step chain, plus existing harvest/dispatch/productivity/forecast summaries.
- Traceability report (`reports.traceability.tsx`): render the chain Plot Origin → Collection Scan → Dispatch Note → Transfer Order → Truck Departure. Remove Buyer Delivered / Worker Scan / Park Storage sections.

## 9. Audit Log

- `audit-logs.tsx`: replace timeline with a filterable table: User, Module, Date range, Record Type, Change Type, Before Value, After Value, Reason. Add Export CSV / Excel buttons and pagination via existing `DataTable`.

## 10. Dashboard

- `dashboard.tsx`: add KPI cards Active Crews, Satellite Staff, Satellite/Picker Ratio, Forecast Progress. Fix QR terminology ("QR Codes Generated" not "Labels"). Remove Phase 2 metrics (any references to buyer delivered, park storage, worker-scan-rate).

## 11. Permissions applied to UI

- Route guard already exists in `_app.tsx`; extend with per-action gates using new `can()`. Hide Add/Edit buttons for Read Only/Reporting; hide economic columns (price/yield $) for roles without `economicData`.

## 12. Validation

- Zod schemas for campaign create (unique code, single-active), user create (admin-only, valid role), status transitions helper `canTransition(entity, from, to)`.

## 13. CLARIFY banner

- Add a small `<ClarifyNote/>` component; drop it on pages/fields the review marked CLARIFY (e.g. Machine Operator entity independence, deprecated config options, invented fields the user might still want) so PM can confirm before removal.

## Files touched (approx.)

Mock data + libs: `src/lib/mock-data.ts`, `src/lib/roles.ts`, `src/lib/auth.ts`, new `src/lib/permissions.ts`, new `src/lib/status.ts`, new `src/lib/campaign.ts`.

Common components: `DataTable.tsx`, `MasterDataPage.tsx`, `StatusChip.tsx`, `PageHeader.tsx`, new `ClarifyNote.tsx`, new `PrinterOrderForm.tsx`, new `WorkerBooklet.tsx`.

Routes: `login.tsx`, `_app.tsx`, `_app.dashboard.tsx`, `_app.campaigns.tsx`, new `_app.campaigns.$id.tsx`, `_app.farms.tsx`, `_app.plots.tsx`, `_app.valves.tsx`, `_app.parks.tsx`, `_app.workers.tsx`, `_app.machines.tsx`, `_app.machine-operators.tsx`, `_app.buyers.tsx`, `_app.destination-centers.tsx`, `_app.employment-companies.tsx`, `_app.transport-providers.tsx`, `_app.qr-series.tsx`, `_app.qr-inventory.tsx`, `_app.harvest-assignments.tsx`, `_app.dispatch-notes.tsx`, `_app.transfer-orders.tsx`, `_app.collection-monitoring.tsx`, `_app.audit-logs.tsx`, `_app.settings.tsx`, `_app.users.tsx`, `_app.reports.traceability.tsx` (+ minor tweaks on other reports).

## Out of scope / flagged CLARIFY

- Real DB / API — the current app is client-side mock-only. I'll document the required schema (PKs/FKs/indexes/soft-delete/audit fields) as a `docs/data-model.md` reference but not spin up Lovable Cloud unless you want it.
- Whether to fully remove Sign-Up or just neutralize it (I'll neutralize + flag).
- Whether "Machine Operator" is its own entity or a Worker role (I'll enforce FK to Worker + flag).

## Acceptance checks

- All status chips render only WBS values.
- Only one Active campaign allowed (validation error otherwise).
- Sign-up cannot set role.
- No "New Assignment / Dispatch Note / Transfer Order" buttons on web.
- Audit log has filters + export + pagination.
- Typecheck passes.
