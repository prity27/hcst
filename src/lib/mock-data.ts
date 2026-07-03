// Centralized mock data for HCTS demo UI — WBS-compliant.

export type Status = string;

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

function pad(n: number, w = 4) {
  return String(n).padStart(w, "0");
}

const FIRST = ["Carlos", "Maria", "Jose", "Ana", "Luis", "Sofia", "Pedro", "Lucia", "Diego", "Elena", "Miguel", "Camila", "Andres", "Rosa", "Javier"];
const LAST = ["Garcia", "Lopez", "Martinez", "Hernandez", "Gomez", "Diaz", "Reyes", "Cruz", "Flores", "Vega", "Castro", "Ramos", "Torres", "Ortega"];

function name(i: number) {
  return `${pick(FIRST, i)} ${pick(LAST, i + 3)}`;
}

// ============ Status vocabularies (WBS) ============
export const CAMPAIGN_STATUSES = ["Active", "Closed", "Historical"] as const;
export const MASTER_STATUSES = ["Active", "Inactive"] as const;
export const USER_STATUSES = ["Active", "Inactive"] as const;
export const QR_SERIES_STATUSES = [
  "Draft",
  "Generated",
  "Sent to Printer",
  "Received",
  "Active",
  "Exhausted",
  "Cancelled",
] as const;
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
export const DISPATCH_STATUSES = ["Draft", "Confirmed", "Dispatched", "Delivered", "Cancelled"] as const;
export const TRANSFER_STATUSES = ["Draft", "In Transit", "Delivered", "Cancelled"] as const;
export const ASSIGNMENT_STATUSES = ["Planned", "In Progress", "Closed", "Cancelled"] as const;

const M = MASTER_STATUSES as unknown as string[];

// ============ Campaigns — single active enforced ============
const CAMPAIGN_ROTATION = ["Closed", "Closed", "Historical", "Closed", "Historical"] as const;
export const campaigns = Array.from({ length: 24 }, (_, i) => ({
  id: `CMP-${pad(i + 1)}`,
  code: `C-${2026 - Math.floor(i / 6)}-${pad((i % 6) + 1, 3)}`,
  name: `Avocado Campaign ${2024 + (i % 3)} — Lot ${i + 1}`,
  season: `${2024 + (i % 3)}/${2025 + (i % 3)}`,
  startDate: `2026-${pad((i % 12) + 1, 2)}-01`,
  endDate: `2026-${pad(((i + 5) % 12) + 1, 2)}-28`,
  // exactly one Active campaign, the first one
  status: (i === 0 ? "Active" : pick(CAMPAIGN_ROTATION as unknown as string[], i - 1)) as string,
  forecast: 45000 + i * 1200,
  yield: 1200 + i * 85,
}));

export const farms = Array.from({ length: 18 }, (_, i) => ({
  id: `FRM-${pad(i + 1)}`,
  code: `F${pad(i + 1, 3)}`,
  name: `Hacienda ${["El Sol", "Valle Verde", "Los Andes", "Santa Rosa", "La Esperanza", "Monte Alto"][i % 6]} ${i + 1}`,
  region: ["Michoacán", "Jalisco", "Nayarit", "Puebla", "Morelos"][i % 5],
  hectares: 45 + i * 7,
  manager: name(i),
  status: pick(M, i),
}));

export const plots = Array.from({ length: 32 }, (_, i) => ({
  id: `PLT-${pad(i + 1)}`,
  code: `P${pad(i + 1, 3)}`,
  farmId: farms[i % farms.length].id,
  farm: farms[i % farms.length].name,
  hectares: 4 + (i % 9),
  variety: ["Hass", "Fuerte", "Bacon", "Pinkerton", "Reed"][i % 5],
  status: pick(M, i),
}));

export const valves = Array.from({ length: 22 }, (_, i) => ({
  id: `VLV-${pad(i + 1)}`,
  code: `V${pad(i + 1, 3)}`,
  plotId: plots[i % plots.length].id,
  plot: plots[i % plots.length].code,
  type: ["Drip", "Sprinkler", "Flood"][i % 3],
  flow: `${20 + i * 3} L/min`,
  hectares: 1 + (i % 4),
  status: pick(M, i),
}));

export const parks = Array.from({ length: 14 }, (_, i) => ({
  id: `PRK-${pad(i + 1)}`,
  code: `PK${pad(i + 1, 3)}`,
  name: `Park Block ${String.fromCharCode(65 + (i % 26))}-${i + 1}`,
  valveId: valves[i % valves.length].id,
  valve: valves[i % valves.length].code,
  farm: farms[i % farms.length].name,
  hectares: 0.5 + (i % 3),
  status: pick(M, i),
}));

// Aggregated hectares helpers (Park→Valve→Plot→Farm)
export function farmHectares(farmId: string) {
  return plots.filter((p) => p.farmId === farmId).reduce((sum, p) => sum + p.hectares, 0);
}
export function plotHectares(plotId: string) {
  return valves.filter((v) => v.plotId === plotId).reduce((sum, v) => sum + v.hectares, 0);
}
export function valveHectares(valveId: string) {
  return parks.filter((p) => p.valveId === valveId).reduce((sum, p) => sum + p.hectares, 0);
}

export const varieties = [
  { id: "VAR-001", code: "HASS", name: "Hass", status: "Active" },
  { id: "VAR-002", code: "FUER", name: "Fuerte", status: "Active" },
  { id: "VAR-003", code: "BACN", name: "Bacon", status: "Active" },
  { id: "VAR-004", code: "PINK", name: "Pinkerton", status: "Active" },
  { id: "VAR-005", code: "REED", name: "Reed", status: "Inactive" },
  { id: "VAR-006", code: "GWEN", name: "Gwen", status: "Active" },
];

export const employmentCompanies = Array.from({ length: 12 }, (_, i) => ({
  id: `EMC-${pad(i + 1)}`,
  code: `EC${pad(i + 1, 3)}`,
  name: `${["AgroLabor", "CampoVerde", "HarvestPro", "GreenForce", "RuralWork"][i % 5]} S.A. ${i + 1}`,
  taxId: `TX-${pad(100000 + i * 137, 6)}`,
  contact: name(i),
  phone: `+52 55 ${pad(1000 + i * 47, 4)}-${pad(2000 + i * 31, 4)}`,
  status: pick(M, i),
}));

export const workers = Array.from({ length: 60 }, (_, i) => ({
  id: `WRK-${pad(i + 1)}`,
  code: `W${pad(i + 1, 4)}`,
  name: name(i),
  dni: `${pad(20000000 + i * 137, 8)}${String.fromCharCode(65 + (i % 23))}`,
  phone: `+52 55 ${pad(3000 + i * 41, 4)}-${pad(5000 + i * 23, 4)}`,
  email: `${pick(FIRST, i).toLowerCase()}.${pick(LAST, i + 3).toLowerCase()}@workers.hcts.agro`,
  registrationDate: `2025-${pad((i % 12) + 1, 2)}-${pad((i % 27) + 1, 2)}`,
  qrCard: `WQR-${pad(1000 + i, 5)}`,
  role: ["Harvester", "Picker", "Packer", "Loader", "Supervisor"][i % 5],
  company: employmentCompanies[i % employmentCompanies.length].name,
  status: pick(M, i),
}));

export const satelliteRoles = [
  { id: "SR-001", code: "SR-FOREMAN", name: "Field Foreman", status: "Active" },
  { id: "SR-002", code: "SR-INSP", name: "Quality Inspector", status: "Active" },
  { id: "SR-003", code: "SR-COORD", name: "Crew Coordinator", status: "Active" },
  { id: "SR-004", code: "SR-CHECK", name: "Weight Checker", status: "Active" },
  { id: "SR-005", code: "SR-LOG", name: "Logistics Aide", status: "Inactive" },
];

export const machines = Array.from({ length: 16 }, (_, i) => ({
  id: `MCH-${pad(i + 1)}`,
  code: `M${pad(i + 1, 3)}`,
  type: ["Tractor", "Forklift", "Sprayer", "Trailer", "Loader"][i % 5],
  model: ["John Deere 6M", "Kubota M7", "CAT 906", "Case IH Magnum"][i % 4],
  plate: `MX-${pad(1000 + i * 23, 4)}`,
  status: pick(M, i),
}));

// Machine operators reference existing workers (FK)
export const machineOperators = Array.from({ length: 18 }, (_, i) => {
  const w = workers[i * 2];
  return {
    id: `OP-${pad(i + 1)}`,
    code: `OP${pad(i + 1, 3)}`,
    workerId: w.id,
    name: w.name,
    dni: w.dni,
    license: `LIC-${pad(50000 + i * 121, 6)}`,
    machineType: ["Tractor", "Forklift", "Sprayer", "Trailer"][i % 4],
    status: pick(M, i),
  };
});

export const buyers = Array.from({ length: 14 }, (_, i) => ({
  id: `BUY-${pad(i + 1)}`,
  code: `B${pad(i + 1, 3)}`,
  name: `${["Global Produce", "FreshExport", "AvoMarket", "GreenLeaf", "Pacific Foods"][i % 5]} Inc. ${i + 1}`,
  country: ["USA", "Canada", "Japan", "Germany", "UK", "Spain"][i % 6],
  contact: name(i + 2),
  status: pick(M, i),
}));

export const destinationCenters = Array.from({ length: 10 }, (_, i) => ({
  id: `DC-${pad(i + 1)}`,
  code: `DC${pad(i + 1, 3)}`,
  name: `Distribution Hub ${["North", "South", "East", "West", "Central"][i % 5]} ${i + 1}`,
  city: ["Los Angeles", "Vancouver", "Tokyo", "Hamburg", "London", "Madrid"][i % 6],
  status: pick(M, i),
}));

export const transportProviders = Array.from({ length: 12 }, (_, i) => ({
  id: `TP-${pad(i + 1)}`,
  code: `TR${pad(i + 1, 3)}`,
  name: `${["TransAgro", "ColdChain", "FastFreight", "AgriLogistics"][i % 4]} ${i + 1}`,
  contact: name(i + 4),
  phone: `+52 55 ${pad(4000 + i * 31, 4)}-${pad(6000 + i * 19, 4)}`,
  status: pick(M, i),
}));

const USER_ROLE_LABELS = [
  "System Administrator",
  "Operations Director",
  "Field Engineer",
  "Farm Manager",
  "Manijero",
  "Collection Team",
  "Loading Team",
  "Administrative Team",
  "Reporting User",
  "Read Only",
];
export const users = Array.from({ length: 22 }, (_, i) => ({
  id: `USR-${pad(i + 1)}`,
  name: name(i),
  email: `${pick(FIRST, i).toLowerCase()}.${pick(LAST, i + 3).toLowerCase()}@hcts.agro`,
  role: USER_ROLE_LABELS[i % USER_ROLE_LABELS.length],
  lastLogin: `2026-06-${pad((i % 28) + 1, 2)} 0${(i % 9) + 1}:${pad((i * 7) % 60, 2)}`,
  status: pick(USER_STATUSES as unknown as string[], i),
}));

export const roles = [
  { id: "ROL-01", name: "System Administrator", permissions: 48, users: 3, description: "Full access to all modules", status: "Active" },
  { id: "ROL-02", name: "Operations Director", permissions: 26, users: 4, description: "Dashboard, Reports, Dispatch & Harvest Monitoring", status: "Active" },
  { id: "ROL-03", name: "Field Engineer", permissions: 14, users: 8, description: "Harvest Assignments, Collection Monitoring, Error Corrections", status: "Active" },
  { id: "ROL-04", name: "Farm Manager", permissions: 18, users: 6, description: "Farm operations and monitoring", status: "Active" },
  { id: "ROL-05", name: "Manijero", permissions: 10, users: 12, description: "Crew supervision (mobile)", status: "Active" },
  { id: "ROL-06", name: "Collection Team", permissions: 6, users: 24, description: "QR scanning at collection points (mobile)", status: "Active" },
  { id: "ROL-07", name: "Loading Team", permissions: 6, users: 10, description: "Truck loading operations (mobile)", status: "Active" },
  { id: "ROL-08", name: "Administrative Team", permissions: 12, users: 5, description: "Dispatch Notes, Transfer Orders, Reports", status: "Active" },
  { id: "ROL-09", name: "Reporting User", permissions: 5, users: 3, description: "Read-only Dashboard and Reports", status: "Active" },
  { id: "ROL-10", name: "Read Only", permissions: 20, users: 2, description: "View-only across permitted pages", status: "Active" },
];

// ============ QR Series with Printer Order tracking ============
const PRINTERS = ["ImprentaSol", "PrintMaster", "AvoLabels S.A.", "QRWorks"];
const QC = ["Pass", "Pending", "Fail"];
const RESP = ["Maria Lopez", "Diego Vega", "Ana Martinez", "Luis Hernandez"];
export const qrSeries = Array.from({ length: 20 }, (_, i) => {
  const status =
    i === 0 ? "Active" :
    i < 3 ? "Sent to Printer" :
    i < 5 ? "Received" :
    i < 10 ? "Active" :
    i < 14 ? "Generated" :
    i < 17 ? "Exhausted" :
    i < 19 ? "Draft" : "Cancelled";
  return {
    id: `QRS-${pad(i + 1)}`,
    series: `HCTS-${2026}-${pad(i + 1, 4)}`,
    rangeFrom: `${pad(i * 1000 + 1, 7)}`,
    rangeTo: `${pad((i + 1) * 1000, 7)}`,
    generated: 1000,
    assigned: 600 + ((i * 47) % 400),
    collected: 300 + ((i * 31) % 300),
    printer: PRINTERS[i % PRINTERS.length],
    sentDate: `2026-05-${pad((i % 28) + 1, 2)}`,
    receivedDate: i < 3 ? "" : `2026-06-${pad((i % 25) + 1, 2)}`,
    expectedQty: 1000,
    receivedQty: i < 3 ? 0 : 1000 - (i % 3),
    qcResult: i < 3 ? "Pending" : QC[i % QC.length],
    responsible: RESP[i % RESP.length],
    status,
  };
});

export const qrInventory = Array.from({ length: 40 }, (_, i) => ({
  id: `QR-${pad(i + 1, 7)}`,
  series: `HCTS-2026-${pad((i % 20) + 1, 4)}`,
  plot: plots[i % plots.length].code,
  worker: workers[i % workers.length].name,
  scannedAt: `2026-06-${pad((i % 28) + 1, 2)} ${pad((i % 12) + 6, 2)}:${pad((i * 11) % 60, 2)}`,
  weight: `${(8 + (i % 7)).toFixed(1)} kg`,
  status: pick(QR_INVENTORY_STATUSES as unknown as string[], i),
}));

export const harvestAssignments = Array.from({ length: 18 }, (_, i) => ({
  id: `HA-${pad(i + 1)}`,
  date: `2026-06-${pad((i % 28) + 1, 2)}`,
  campaignId: campaigns[i % campaigns.length].id,
  campaign: campaigns[i % campaigns.length].name,
  farm: farms[i % farms.length].name,
  plot: plots[i % plots.length].code,
  crew: `Crew ${String.fromCharCode(65 + (i % 8))}`,
  workers: 8 + (i % 12),
  variety: varieties[i % varieties.length].name,
  status: pick(ASSIGNMENT_STATUSES as unknown as string[], i),
}));

export const collectionMonitoring = Array.from({ length: 26 }, (_, i) => ({
  id: `CM-${pad(i + 1)}`,
  time: `${pad((i % 12) + 6, 2)}:${pad((i * 13) % 60, 2)}`,
  farm: farms[i % farms.length].name,
  plot: plots[i % plots.length].code,
  crates: 12 + ((i * 7) % 28),
  weight: `${(180 + i * 14).toFixed(0)} kg`,
  progress: 30 + ((i * 11) % 65),
  status: pick(ASSIGNMENT_STATUSES as unknown as string[], i),
}));

export const dispatchNotes = Array.from({ length: 16 }, (_, i) => ({
  id: `DN-${pad(i + 1)}`,
  date: `2026-06-${pad((i % 28) + 1, 2)}`,
  campaignId: campaigns[0].id,
  buyer: buyers[i % buyers.length].name,
  destination: destinationCenters[i % destinationCenters.length].name,
  pallets: 12 + (i % 18),
  weight: `${(3500 + i * 240).toFixed(0)} kg`,
  status: pick(DISPATCH_STATUSES as unknown as string[], i),
}));

export const transferOrders = Array.from({ length: 14 }, (_, i) => ({
  id: `TO-${pad(i + 1)}`,
  truck: `MX-${pad(7000 + i * 19, 4)}`,
  driver: name(i + 5),
  provider: transportProviders[i % transportProviders.length].name,
  dispatchNote: `DN-${pad((i % 16) + 1)}`,
  eta: `2026-06-${pad(((i + 2) % 28) + 1, 2)}`,
  status: pick(TRANSFER_STATUSES as unknown as string[], i),
}));

// ============ Audit logs with WBS fields ============
const CHANGE_TYPES = ["Create", "Update", "Deactivate", "Close", "Approve", "Export", "Login"];
const RECORD_TYPES = ["Campaign", "Worker", "QR Series", "Dispatch Note", "Farm", "System Config"];
const REASONS = [
  "New record",
  "Data correction",
  "End of season",
  "Policy update",
  "Scheduled export",
  "Session start",
];
export const auditLogs = Array.from({ length: 60 }, (_, i) => {
  const changeType = CHANGE_TYPES[i % CHANGE_TYPES.length];
  const recordType = RECORD_TYPES[i % RECORD_TYPES.length];
  return {
    id: `AL-${pad(i + 1)}`,
    user: users[i % users.length].name,
    module: ["Campaigns", "Workers", "QR Series", "Dispatch", "Settings", "Farms"][i % 6],
    recordType,
    recordId: `${recordType.replace(/\s/g, "").slice(0, 3).toUpperCase()}-${pad((i % 30) + 1)}`,
    changeType,
    action: changeType,
    before:
      changeType === "Create" ? "—" :
      changeType === "Update" ? "status: Draft" :
      changeType === "Close" ? "status: Active" :
      changeType === "Deactivate" ? "status: Active" : "—",
    after:
      changeType === "Create" ? "created" :
      changeType === "Update" ? "status: Active" :
      changeType === "Close" ? "status: Closed" :
      changeType === "Deactivate" ? "status: Inactive" :
      changeType === "Export" ? "CSV" : "—",
    reason: REASONS[i % REASONS.length],
    timestamp: `2026-06-${pad((i % 28) + 1, 2)} ${pad(i % 24, 2)}:${pad((i * 17) % 60, 2)}:${pad((i * 7) % 60, 2)}`,
    ip: `192.168.${(i % 250) + 1}.${(i * 13) % 255}`,
  };
});

export const activities = [
  { id: 1, who: "Maria Lopez", action: "approved dispatch note DN-0012", time: "2 min ago", type: "success" },
  { id: 2, who: "Carlos Garcia", action: "generated QR series HCTS-2026-0019", time: "18 min ago", type: "info" },
  { id: 3, who: "Sofia Reyes", action: "closed harvest assignment HA-0014", time: "1 hr ago", type: "success" },
  { id: 4, who: "Diego Vega", action: "flagged plot P011 for inspection", time: "2 hr ago", type: "warning" },
  { id: 5, who: "Ana Martinez", action: "added 12 new workers to AgroLabor S.A.", time: "3 hr ago", type: "info" },
  { id: 6, who: "Luis Hernandez", action: "exported traceability report", time: "5 hr ago", type: "info" },
];

export const upcomingHarvests = harvestAssignments.slice(0, 5);

// Chart data
export const harvestTrend = Array.from({ length: 14 }, (_, i) => ({
  day: `Jun ${i + 1}`,
  harvest: 1800 + Math.round(Math.sin(i / 2) * 400 + i * 35),
  forecast: 1900 + i * 30,
}));

export const productivity = Array.from({ length: 8 }, (_, i) => ({
  crew: `Crew ${String.fromCharCode(65 + i)}`,
  kg: 1200 + ((i * 137) % 900),
}));

export const harvestByVariety = varieties.slice(0, 5).map((v, i) => ({
  name: v.name,
  value: 1200 - i * 150 + (i % 2 ? 80 : 0),
}));

export const dispatchStatus = [
  { name: "Delivered", value: 42 },
  { name: "Dispatched", value: 18 },
  { name: "Confirmed", value: 9 },
  { name: "Draft", value: 6 },
];
