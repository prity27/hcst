// Canonical WBS status enums for HCTS.
// Use these everywhere; legacy generic values (Pending, Completed, In Progress)
// are explicitly forbidden.

export const CAMPAIGN_STATUSES = ["Active", "Closed", "Historical"] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const MASTER_STATUSES = ["Active", "Inactive"] as const;
export type MasterStatus = (typeof MASTER_STATUSES)[number];

export const USER_STATUSES = ["Active", "Inactive"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const QR_SERIES_STATUSES = [
  "Draft",
  "Generated",
  "Sent to Printer",
  "Received",
  "Active",
  "Exhausted",
  "Cancelled",
] as const;
export type QrSeriesStatus = (typeof QR_SERIES_STATUSES)[number];

export const QR_INVENTORY_STATUSES = [
  "Generated",
  "Available",
  "Assigned",
  "Used",
  "Scanned at Collection Point",
  "Assigned to Dispatch Note",
  "Dispatched",
  "Returned",
  "Damaged",
  "Lost",
  "Cancelled",
] as const;
export type QrInventoryStatus = (typeof QR_INVENTORY_STATUSES)[number];

export const PRINTER_ORDER_QC = ["Pass", "Fail", "Partial"] as const;
export type PrinterOrderQC = (typeof PRINTER_ORDER_QC)[number];

// Generic dispatch/transfer lifecycle used only for view-only monitoring.
export const OPS_STATUSES = ["Open", "Approved", "Closed", "Cancelled"] as const;
export type OpsStatus = (typeof OPS_STATUSES)[number];
