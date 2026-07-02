import type { Role } from "./roles";

// WBS modules referenced by the permission matrix
export type Module =
  | "dashboard"
  | "campaigns"
  | "masterData"
  | "users"
  | "roles"
  | "qrSeries"
  | "qrInventory"
  | "harvestAssignments"
  | "collectionMonitoring"
  | "dispatchNotes"
  | "transferOrders"
  | "errorCorrections"
  | "reports"
  | "auditLogs"
  | "settings";

export type Action =
  | "view"
  | "create"
  | "editOpen"
  | "editClosed"
  | "approve"
  | "close"
  | "export"
  | "configure"
  | "economicData";

type ModuleActions = Partial<Record<Action, boolean>>;
type Matrix = Record<Role, Partial<Record<Module, ModuleActions>>>;

const ALL: ModuleActions = {
  view: true,
  create: true,
  editOpen: true,
  editClosed: true,
  approve: true,
  close: true,
  export: true,
  configure: true,
  economicData: true,
};

const VIEW_ONLY: ModuleActions = { view: true };
const VIEW_EXPORT: ModuleActions = { view: true, export: true };

// Starter permission matrix — PM to confirm exact cells.
// The Admin Portal itself does NOT create Assignments / Dispatch Notes / Transfer Orders
// (mobile only). Web is view/monitor/audit/correct/report.
export const PERMISSION_MATRIX: Matrix = {
  admin: {
    dashboard: ALL,
    campaigns: ALL,
    masterData: ALL,
    users: ALL,
    roles: ALL,
    qrSeries: ALL,
    qrInventory: ALL,
    harvestAssignments: { view: true, editOpen: true, editClosed: true, approve: true, close: true, export: true },
    collectionMonitoring: { view: true, export: true },
    dispatchNotes: { view: true, editOpen: true, editClosed: true, approve: true, close: true, export: true },
    transferOrders: { view: true, editOpen: true, editClosed: true, approve: true, close: true, export: true },
    errorCorrections: ALL,
    reports: { view: true, export: true, economicData: true },
    auditLogs: { view: true, export: true },
    settings: { view: true, configure: true },
  },
  ops_director: {
    dashboard: VIEW_ONLY,
    reports: { view: true, export: true, economicData: true },
    dispatchNotes: { view: true, approve: true, close: true, export: true },
    transferOrders: { view: true, approve: true, close: true, export: true },
    collectionMonitoring: VIEW_EXPORT,
    harvestAssignments: VIEW_EXPORT,
    auditLogs: VIEW_ONLY,
    settings: VIEW_ONLY,
  },
  field_engineer: {
    harvestAssignments: VIEW_ONLY,
    collectionMonitoring: VIEW_ONLY,
    errorCorrections: { view: true, editOpen: true, editClosed: true },
    settings: VIEW_ONLY,
  },
  farm_manager: {
    dashboard: VIEW_ONLY,
    masterData: { view: true, editOpen: true },
    harvestAssignments: VIEW_ONLY,
    collectionMonitoring: VIEW_ONLY,
    reports: VIEW_EXPORT,
    settings: VIEW_ONLY,
  },
  manijero: {
    harvestAssignments: VIEW_ONLY,
    collectionMonitoring: VIEW_ONLY,
    settings: VIEW_ONLY,
  },
  collection_team: {
    collectionMonitoring: VIEW_ONLY,
    qrInventory: VIEW_ONLY,
    settings: VIEW_ONLY,
  },
  loading_team: {
    dispatchNotes: VIEW_ONLY,
    transferOrders: VIEW_ONLY,
    settings: VIEW_ONLY,
  },
  admin_team: {
    dispatchNotes: { view: true, editOpen: true, close: true, export: true },
    transferOrders: { view: true, editOpen: true, close: true, export: true },
    reports: VIEW_EXPORT,
    settings: VIEW_ONLY,
  },
  reporting: {
    dashboard: VIEW_ONLY,
    reports: VIEW_EXPORT,
    settings: VIEW_ONLY,
  },
  read_only: {
    dashboard: VIEW_ONLY,
    campaigns: VIEW_ONLY,
    masterData: VIEW_ONLY,
    qrSeries: VIEW_ONLY,
    qrInventory: VIEW_ONLY,
    harvestAssignments: VIEW_ONLY,
    collectionMonitoring: VIEW_ONLY,
    dispatchNotes: VIEW_ONLY,
    transferOrders: VIEW_ONLY,
    reports: VIEW_ONLY,
    auditLogs: VIEW_ONLY,
    settings: VIEW_ONLY,
  },
};

export function can(role: Role, module: Module, action: Action): boolean {
  return Boolean(PERMISSION_MATRIX[role]?.[module]?.[action]);
}

export const MODULE_LABELS: Record<Module, string> = {
  dashboard: "Dashboard",
  campaigns: "Campaigns",
  masterData: "Master Data",
  users: "Users",
  roles: "Roles",
  qrSeries: "QR Series",
  qrInventory: "QR Inventory",
  harvestAssignments: "Harvest Assignments",
  collectionMonitoring: "Collection Monitoring",
  dispatchNotes: "Dispatch Notes",
  transferOrders: "Transfer Orders",
  errorCorrections: "Error Corrections",
  reports: "Reports",
  auditLogs: "Audit Logs",
  settings: "Settings",
};

export const ACTION_LABELS: Record<Action, string> = {
  view: "View",
  create: "Create",
  editOpen: "Edit Open",
  editClosed: "Edit Closed",
  approve: "Approve",
  close: "Close",
  export: "Export",
  configure: "Configure",
  economicData: "Economic Data",
};
