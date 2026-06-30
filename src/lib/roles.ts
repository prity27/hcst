export type Role =
  | "admin"
  | "ops_director"
  | "field_engineer"
  | "admin_team"
  | "reporting"
  | "read_only";

export const ROLE_LABELS: Record<Role, string> = {
  admin: "System Administrator",
  ops_director: "Operations Director",
  field_engineer: "Field Engineer",
  admin_team: "Administrative Team",
  reporting: "Reporting User",
  read_only: "Read Only",
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  admin: "Full access to all modules",
  ops_director: "Dashboard, Reports, Dispatch & Harvest Monitoring",
  field_engineer: "Harvest Assignments, Collection Monitoring, Error Corrections",
  admin_team: "Dispatch Notes, Transfer Orders, Reports",
  reporting: "Read-only Dashboard and Reports",
  read_only: "View-only access to all permitted pages",
};

// Allowed URL prefixes per role. "*" = all.
const ROLE_URLS: Record<Role, string[] | "*"> = {
  admin: "*",
  ops_director: ["/dashboard", "/reports", "/dispatch-notes", "/collection-monitoring", "/settings"],
  field_engineer: ["/harvest-assignments", "/collection-monitoring", "/error-corrections", "/settings"],
  admin_team: ["/dispatch-notes", "/transfer-orders", "/reports", "/settings"],
  reporting: ["/dashboard", "/reports", "/settings"],
  read_only: [
    "/dashboard",
    "/reports",
    "/campaigns",
    "/farms",
    "/plots",
    "/valves",
    "/parks",
    "/varieties",
    "/workers",
    "/machines",
    "/buyers",
    "/destination-centers",
    "/transport-providers",
    "/employment-companies",
    "/satellite-roles",
    "/machine-operators",
    "/qr-series",
    "/qr-inventory",
    "/dispatch-notes",
    "/transfer-orders",
    "/harvest-assignments",
    "/collection-monitoring",
    "/audit-logs",
    "/settings",
  ],
};

export function isUrlAllowed(role: Role, url: string): boolean {
  const allowed = ROLE_URLS[role];
  if (allowed === "*") return true;
  return allowed.some((p) => url === p || url.startsWith(p + "/"));
}

export function isReadOnly(role: Role): boolean {
  return role === "reporting" || role === "read_only";
}

export function defaultLandingForRole(role: Role): string {
  if (isUrlAllowed(role, "/dashboard")) return "/dashboard";
  if (role === "field_engineer") return "/harvest-assignments";
  if (role === "admin_team") return "/dispatch-notes";
  return "/settings";
}
