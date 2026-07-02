// Centralized mock data for HCTS demo UI — WBS-compliant statuses only.
import type {
  CampaignStatus,
  MasterStatus,
  UserStatus,
  QrSeriesStatus,
  QrInventoryStatus,
  PrinterOrderQC,
  OpsStatus,
} from "./status";

function pick<T>(arr: readonly T[], i: number): T {
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

const MASTER: readonly MasterStatus[] = ["Active", "Active", "Active", "Inactive"];
const USER_STATUSES_MOCK: readonly UserStatus[] = ["Active", "Active", "Active", "Inactive"];

// ---------- Campaigns ----------
// Only ONE Active campaign is allowed. Rest are Closed or Historical.
const CAMPAIGN_STATE = (i: number): CampaignStatus => {
  if (i === 0) return "Active";
  if (i < 6) return "Closed";
  return "Historical";
};

export const campaigns = Array.from({ length: 12 }, (_, i) => ({
  id: `CMP-${pad(i + 1)}`,
  code: `CMP-2026-${pad(i + 1, 3)}`,
  name: `Avocado Campaign ${2024 + (i % 3)} — Lot ${i + 1}`,
  season: `${2024 + (i % 3)}/${2025 + (i % 3)}`,
  startDate: `2026-${pad((i % 12) + 1, 2)}-01`,
  endDate: `2026-${pad(((i + 5) % 12) + 1, 2)}-28`,
  status: CAMPAIGN_STATE(i),
  yieldForecastKg: 12_000 + i * 850,
  yieldActualKg: i === 0 ? 6_400 : 11_000 + i * 700,
}));

// ---------- Master Data ----------
export const farms = Array.from({ length: 18 }, (_, i) => ({
  id: `FRM-${pad(i + 1)}`,
  code: `F${pad(i + 1, 3)}`,
  name: `Hacienda ${["El Sol", "Valle Verde", "Los Andes", "Santa Rosa", "La Esperanza", "Monte Alto"][i % 6]} ${i + 1}`,
  region: ["Michoacán", "Jalisco", "Nayarit", "Puebla", "Morelos"][i % 5],
  manager: name(i),
  status: pick(MASTER, i),
}));

export const plots = Array.from({ length: 32 }, (_, i) => ({
  id: `PLT-${pad(i + 1)}`,
  code: `P${pad(i + 1, 3)}`,
  farmId: farms[i % farms.length].id,
  farm: farms[i % farms.length].name,
  areaHa: 4 + (i % 9),
  variety: ["Hass", "Fuerte", "Bacon", "Pinkerton", "Reed"][i % 5],
  status: pick(MASTER, i),
}));

export const valves = Array.from({ length: 22 }, (_, i) => ({
  id: `VLV-${pad(i + 1)}`,
  code: `V${pad(i + 1, 3)}`,
  plotId: plots[i % plots.length].id,
  plot: plots[i % plots.length].code,
  type: ["Drip", "Sprinkler", "Flood"][i % 3],
  status: pick(MASTER, i),
}));

export const parks = Array.from({ length: 14 }, (_, i) => ({
  id: `PRK-${pad(i + 1)}`,
  code: `PK${pad(i + 1, 3)}`,
  name: `Park Block ${String.fromCharCode(65 + (i % 26))}-${i + 1}`,
  valveId: valves[i % valves.length].id,
  valve: valves[i % valves.length].code,
  status: pick(MASTER, i),
}));

// Aggregated hectares: park→valve→plot→farm (computed helpers)
export function farmHectares(farmId: string): number {
  return plots.filter((p) => p.farmId === farmId).reduce((s, p) => s + p.areaHa, 0);
}
export function plotHectares(plotId: string): number {
  return plots.find((p) => p.id === plotId)?.areaHa ?? 0;
}
export function valveHectares(valveId: string): number {
  const v = valves.find((x) => x.id === valveId);
  return v ? plotHectares(v.plotId) : 0;
}
export function parkHectares(parkId: string): number {
  const p = parks.find((x) => x.id === parkId);
  return p ? valveHectares(p.valveId) : 0;
}

export const varieties = [
  { id: "VAR-001", code: "HASS", name: "Hass", status: "Active" as MasterStatus },
  { id: "VAR-002", code: "FUER", name: "Fuerte", status: "Active" as MasterStatus },
  { id: "VAR-003", code: "BACN", name: "Bacon", status: "Active" as MasterStatus },
  { id: "VAR-004", code: "PINK", name: "Pinkerton", status: "Active" as MasterStatus },
  { id: "VAR-005", code: "REED", name: "Reed", status: "Inactive" as MasterStatus },
  { id: "VAR-006", code: "GWEN", name: "Gwen", status: "Active" as MasterStatus },
];

export const employmentCompanies = Array.from({ length: 12 }, (_, i) => ({
  id: `EMC-${pad(i + 1)}`,
  code: `EC${pad(i + 1, 3)}`,
  name: `${["AgroLabor", "CampoVerde", "HarvestPro", "GreenForce", "RuralWork"][i % 5]} S.A. ${i + 1}`,
  taxId: `TX-${pad(100000 + i * 137, 6)}`,
  contact: name(i),
  phone: `+52 55 ${pad(1000 + i * 47, 4)}-${pad(2000 + i * 31, 4)}`,
  status: pick(MASTER, i),
}));

// ---------- Workers (WBS fields) ----------
export const workers = Array.from({ length: 60 }, (_, i) => {
  const wn = name(i);
  return {
    id: `WRK-${pad(i + 1)}`,
    code: `W${pad(i + 1, 4)}`,
    name: wn,
    dni: `${pad(20_000_000 + i * 1237, 8)}-${(i % 26 + 10).toString(36).toUpperCase()}`,
    phone: `+52 55 ${pad(3000 + i * 41, 4)}-${pad(4000 + i * 29, 4)}`,
    email: `${wn.toLowerCase().replace(/\s+/g, ".")}${i}@labor.hcts.agro`,
    registrationDate: `2025-${pad((i % 12) + 1, 2)}-${pad((i % 27) + 1, 2)}`,
    qrCard: `WC-${pad(i + 1, 6)}`,
    role: ["Picker", "Satellite", "Packer", "Loader", "Manijero"][i % 5],
    companyId: employmentCompanies[i % employmentCompanies.length].id,
    company: employmentCompanies[i % employmentCompanies.length].name,
    status: pick(MASTER, i),
  };
});

export const satelliteRoles = [
  { id: "SR-001", code: "SR-FOREMAN", name: "Field Foreman", status: "Active" as MasterStatus },
  { id: "SR-002", code: "SR-INSP", name: "Quality Inspector", status: "Active" as MasterStatus },
  { id: "SR-003", code: "SR-COORD", name: "Crew Coordinator", status: "Active" as MasterStatus },
  { id: "SR-004", code: "SR-CHECK", name: "Weight Checker", status: "Active" as MasterStatus },
  { id: "SR-005", code: "SR-LOG", name: "Logistics Aide", status: "Inactive" as MasterStatus },
];

export const machines = Array.from({ length: 16 }, (_, i) => ({
  id: `MCH-${pad(i + 1)}`,
  code: `M${pad(i + 1, 3)}`,
  type: ["Tractor", "Forklift", "Sprayer", "Trailer", "Loader"][i % 5],
  model: ["John Deere 6M", "Kubota M7", "CAT 906", "Case IH Magnum"][i % 4],
  plate: `MX-${pad(1000 + i * 23, 4)}`,
  status: pick(MASTER, i),
}));

// Machine operators reference existing workers.
export const machineOperators = Array.from({ length: 18 }, (_, i) => {
  const w = workers[(i * 3) % workers.length];
  return {
    id: `OP-${pad(i + 1)}`,
    workerId: w.id,
    workerCode: w.code,
    name: w.name,
    dni: w.dni,
    license: `LIC-${pad(50000 + i * 121, 6)}`,
    machineType: ["Tractor", "Forklift", "Sprayer", "Trailer"][i % 4],
    status: pick(MASTER, i),
  };
});

export const buyers = Array.from({ length: 14 }, (_, i) => ({
  id: `BUY-${pad(i + 1)}`,
  code: `B${pad(i + 1, 3)}`,
  name: `${["Global Produce", "FreshExport", "AvoMarket", "GreenLeaf", "Pacific Foods"][i % 5]} Inc. ${i + 1}`,
  country: ["USA", "Canada", "Japan", "Germany", "UK", "Spain"][i % 6],
  contact: name(i + 2),
  status: pick(MASTER, i),
}));

export const destinationCenters = Array.from({ length: 10 }, (_, i) => ({
  id: `DC-${pad(i + 1)}`,
  code: `DC${pad(i + 1, 3)}`,
  name: `Distribution Hub ${["North", "South", "East", "West", "Central"][i % 5]} ${i + 1}`,
  city: ["Los Angeles", "Vancouver", "Tokyo", "Hamburg", "London", "Madrid"][i % 6],
  status: pick(MASTER, i),
}));

export const transportProviders = Array.from({ length: 12 }, (_, i) => ({
  id: `TP-${pad(i + 1)}`,
  code: `TR${pad(i + 1, 3)}`,
  name: `${["TransAgro", "ColdChain", "FastFreight", "AgriLogistics"][i % 4]} ${i + 1}`,
  contact: name(i + 4),
  status: pick(MASTER, i),
}));

export const users = Array.from({ length: 22 }, (_, i) => ({
  id: `USR-${pad(i + 1)}`,
  name: name(i),
  email: `${pick(FIRST, i).toLowerCase()}.${pick(LAST, i + 3).toLowerCase()}@hcts.agro`,
  role: [
    "System Administrator",
    "Operations Director",
    "Field Engineer",
    "Administrative Team",
    "Reporting User",
    "Read Only",
  ][i % 6],
  lastLogin: `2026-06-${pad((i % 28) + 1, 2)} 0${(i % 9) + 1}:${pad((i * 7) % 60, 2)}`,
  status: pick(USER_STATUSES_MOCK, i),
}));

export const roles = [
  { id: "ROL-01", name: "System Administrator", permissions: 48, users: 3, description: "Full system access", status: "Active" as MasterStatus },
  { id: "ROL-02", name: "Operations Director", permissions: 32, users: 6, description: "Dashboard, reports, dispatch & harvest monitoring", status: "Active" as MasterStatus },
  { id: "ROL-03", name: "Field Engineer", permissions: 18, users: 14, description: "Assignments, collection, corrections", status: "Active" as MasterStatus },
  { id: "ROL-04", name: "Administrative Team", permissions: 12, users: 5, description: "Dispatch notes, transfer orders, reports", status: "Active" as MasterStatus },
  { id: "ROL-05", name: "Reporting User", permissions: 8, users: 2, description: "Read-only dashboard and reports", status: "Active" as MasterStatus },
  { id: "ROL-06", name: "Read Only", permissions: 10, users: 4, description: "View-only across permitted pages", status: "Active" as MasterStatus },
];

// ---------- QR Management ----------
const QR_SERIES_STATE = (i: number): QrSeriesStatus => {
  const cycle: QrSeriesStatus[] = ["Draft", "Generated", "Sent to Printer", "Received", "Active", "Exhausted", "Cancelled"];
  return cycle[i % cycle.length];
};

export const qrSeries = Array.from({ length: 20 }, (_, i) => ({
  id: `QRS-${pad(i + 1)}`,
  series: `HCTS-${2026}-${pad(i + 1, 4)}`,
  rangeFrom: `${pad(i * 1000 + 1, 7)}`,
  rangeTo: `${pad((i + 1) * 1000, 7)}`,
  generated: 1000,
  assigned: 600 + ((i * 47) % 400),
  collected: 300 + ((i * 31) % 300),
  status: QR_SERIES_STATE(i),
}));

export const printerOrders = Array.from({ length: 20 }, (_, i) => ({
  id: `PO-${pad(i + 1)}`,
  seriesId: `QRS-${pad(i + 1)}`,
  printer: ["ImprentaSur", "AndesPrint", "FastLabel Co."][i % 3],
  sentDate: `2026-05-${pad((i % 28) + 1, 2)}`,
  receivedDate: i % 4 === 0 ? null : `2026-06-${pad((i % 28) + 1, 2)}`,
  expectedQty: 1000,
  receivedQty: i % 4 === 0 ? 0 : 1000 - (i % 5),
  qcResult: (i % 4 === 0 ? null : (["Pass", "Pass", "Partial", "Pass", "Fail"][i % 5] as PrinterOrderQC)),
  responsible: name(i + 3),
}));

const QR_INV_STATE = (i: number): QrInventoryStatus => {
  const cycle: QrInventoryStatus[] = [
    "Generated",
    "Available",
    "Assigned",
    "Scanned at Collection Point",
    "Assigned to Dispatch Note",
    "Dispatched",
    "Used",
    "Returned",
    "Damaged",
    "Lost",
  ];
  return cycle[i % cycle.length];
};

export const qrInventory = Array.from({ length: 40 }, (_, i) => ({
  id: `QR-${pad(i + 1, 7)}`,
  series: `HCTS-2026-${pad((i % 20) + 1, 4)}`,
  plot: plots[i % plots.length].code,
  worker: workers[i % workers.length].name,
  scannedAt: `2026-06-${pad((i % 28) + 1, 2)} ${pad((i % 12) + 6, 2)}:${pad((i * 11) % 60, 2)}`,
  weight: `${(8 + (i % 7) + Math.random()).toFixed(1)} kg`,
  status: QR_INV_STATE(i),
}));

// ---------- Operations (view-only in web) ----------
const OPS_STATE = (i: number): OpsStatus => (["Open", "Approved", "Closed", "Cancelled"] as const)[i % 4];

export const harvestAssignments = Array.from({ length: 18 }, (_, i) => ({
  id: `HA-${pad(i + 1)}`,
  date: `2026-06-${pad((i % 28) + 1, 2)}`,
  campaign: campaigns[i % campaigns.length].name,
  farm: farms[i % farms.length].name,
  plot: plots[i % plots.length].code,
  crew: `Crew ${String.fromCharCode(65 + (i % 8))}`,
  workers: 8 + (i % 12),
  variety: varieties[i % varieties.length].name,
  status: OPS_STATE(i),
}));

export const collectionMonitoring = Array.from({ length: 26 }, (_, i) => ({
  id: `CM-${pad(i + 1)}`,
  time: `${pad((i % 12) + 6, 2)}:${pad((i * 13) % 60, 2)}`,
  farm: farms[i % farms.length].name,
  plot: plots[i % plots.length].code,
  crates: 12 + ((i * 7) % 28),
  weight: `${(180 + i * 14).toFixed(0)} kg`,
  progress: 30 + ((i * 11) % 65),
  status: OPS_STATE(i),
}));

export const dispatchNotes = Array.from({ length: 16 }, (_, i) => ({
  id: `DN-${pad(i + 1)}`,
  date: `2026-06-${pad((i % 28) + 1, 2)}`,
  buyer: buyers[i % buyers.length].name,
  destination: destinationCenters[i % destinationCenters.length].name,
  pallets: 12 + (i % 18),
  weight: `${(3500 + i * 240).toFixed(0)} kg`,
  status: OPS_STATE(i),
}));

export const transferOrders = Array.from({ length: 14 }, (_, i) => ({
  id: `TO-${pad(i + 1)}`,
  truck: `MX-${pad(7000 + i * 19, 4)}`,
  driver: name(i + 5),
  provider: transportProviders[i % transportProviders.length].name,
  dispatchNote: `DN-${pad((i % 16) + 1)}`,
  eta: `2026-06-${pad(((i + 2) % 28) + 1, 2)}`,
  status: OPS_STATE(i),
}));

// ---------- Audit Log ----------
const CHANGE_TYPES = ["Created", "Updated", "Deactivated", "Approved", "Closed", "Exported", "Login"] as const;
const MODULES = ["Campaigns", "Workers", "QR Series", "Dispatch Notes", "Settings", "Farms", "Users"] as const;
const RECORD_TYPES = ["Campaign", "Worker", "QRSeries", "DispatchNote", "Setting", "Farm", "User"] as const;

export const auditLogs = Array.from({ length: 60 }, (_, i) => ({
  id: `AL-${pad(i + 1)}`,
  user: users[i % users.length].name,
  module: MODULES[i % MODULES.length],
  recordType: RECORD_TYPES[i % RECORD_TYPES.length],
  recordId: `${RECORD_TYPES[i % RECORD_TYPES.length].slice(0, 3).toUpperCase()}-${pad((i % 40) + 1)}`,
  changeType: CHANGE_TYPES[i % CHANGE_TYPES.length],
  before: i % 3 === 0 ? null : `status: ${["Draft", "Active", "Open"][i % 3]}`,
  after: `status: ${["Active", "Closed", "Approved"][i % 3]}`,
  reason: i % 4 === 0 ? "Field correction requested" : i % 4 === 1 ? "Approved by supervisor" : i % 4 === 2 ? "" : "Bulk update",
  timestamp: `2026-06-${pad((i % 28) + 1, 2)} ${pad((i % 24), 2)}:${pad((i * 17) % 60, 2)}:${pad((i * 7) % 60, 2)}`,
  ip: `192.168.${(i % 250) + 1}.${(i * 13) % 255}`,
}));

// ---------- Dashboard extras ----------
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
  { name: "Approved", value: 42 },
  { name: "Open", value: 18 },
  { name: "Closed", value: 30 },
  { name: "Cancelled", value: 4 },
];

// ---------- Business rules (mock service) ----------
export function hasActiveCampaign(): boolean {
  return campaigns.some((c) => c.status === "Active");
}

export function nextCampaignCode(): string {
  const year = new Date().getFullYear();
  const yearPrefix = `CMP-${year}-`;
  const nums = campaigns
    .map((c) => (c.code.startsWith(yearPrefix) ? parseInt(c.code.slice(yearPrefix.length), 10) : 0))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `${yearPrefix}${String(next).padStart(3, "0")}`;
}
