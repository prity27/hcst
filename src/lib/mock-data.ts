// Centralized mock data for HCTS demo UI

export type Status = "Active" | "Inactive" | "Pending" | "Completed" | "Draft" | "In Progress";

const STATUSES: Status[] = ["Active", "Pending", "Completed", "Inactive", "In Progress"];

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

export const campaigns = Array.from({ length: 24 }, (_, i) => ({
  id: `CMP-${pad(i + 1)}`,
  code: `C-2026-${pad(i + 1, 3)}`,
  name: `Avocado Campaign ${2024 + (i % 3)} — Lot ${i + 1}`,
  season: `${2024 + (i % 3)}/${2025 + (i % 3)}`,
  startDate: `2026-${pad((i % 12) + 1, 2)}-01`,
  endDate: `2026-${pad(((i + 5) % 12) + 1, 2)}-28`,
  status: pick(STATUSES, i),
  yield: 1200 + i * 85,
}));

export const farms = Array.from({ length: 18 }, (_, i) => ({
  id: `FRM-${pad(i + 1)}`,
  code: `F${pad(i + 1, 3)}`,
  name: `Hacienda ${["El Sol", "Valle Verde", "Los Andes", "Santa Rosa", "La Esperanza", "Monte Alto"][i % 6]} ${i + 1}`,
  region: ["Michoacán", "Jalisco", "Nayarit", "Puebla", "Morelos"][i % 5],
  area: 45 + i * 7,
  manager: name(i),
  status: pick(STATUSES, i),
}));

export const plots = Array.from({ length: 32 }, (_, i) => ({
  id: `PLT-${pad(i + 1)}`,
  code: `P${pad(i + 1, 3)}`,
  farm: farms[i % farms.length].name,
  area: 4 + (i % 9),
  variety: ["Hass", "Fuerte", "Bacon", "Pinkerton", "Reed"][i % 5],
  trees: 320 + i * 12,
  status: pick(STATUSES, i),
}));

export const valves = Array.from({ length: 22 }, (_, i) => ({
  id: `VLV-${pad(i + 1)}`,
  code: `V${pad(i + 1, 3)}`,
  plot: plots[i % plots.length].code,
  type: ["Drip", "Sprinkler", "Flood"][i % 3],
  flow: `${20 + i * 3} L/min`,
  status: pick(STATUSES, i),
}));

export const parks = Array.from({ length: 14 }, (_, i) => ({
  id: `PRK-${pad(i + 1)}`,
  code: `PK${pad(i + 1, 3)}`,
  name: `Park Block ${String.fromCharCode(65 + (i % 26))}-${i + 1}`,
  farm: farms[i % farms.length].name,
  capacity: 200 + i * 25,
  status: pick(STATUSES, i),
}));

export const varieties = [
  { id: "VAR-001", code: "HASS", name: "Hass", maturityDays: 240, color: "Dark Green", status: "Active" as Status },
  { id: "VAR-002", code: "FUER", name: "Fuerte", maturityDays: 220, color: "Green", status: "Active" as Status },
  { id: "VAR-003", code: "BACN", name: "Bacon", maturityDays: 200, color: "Light Green", status: "Active" as Status },
  { id: "VAR-004", code: "PINK", name: "Pinkerton", maturityDays: 230, color: "Green", status: "Active" as Status },
  { id: "VAR-005", code: "REED", name: "Reed", maturityDays: 260, color: "Dark Green", status: "Inactive" as Status },
  { id: "VAR-006", code: "GWEN", name: "Gwen", maturityDays: 245, color: "Green", status: "Active" as Status },
];

export const employmentCompanies = Array.from({ length: 12 }, (_, i) => ({
  id: `EMC-${pad(i + 1)}`,
  code: `EC${pad(i + 1, 3)}`,
  name: `${["AgroLabor", "CampoVerde", "HarvestPro", "GreenForce", "RuralWork"][i % 5]} S.A. ${i + 1}`,
  taxId: `TX-${pad(100000 + i * 137, 6)}`,
  contact: name(i),
  phone: `+52 55 ${pad(1000 + i * 47, 4)}-${pad(2000 + i * 31, 4)}`,
  status: pick(STATUSES, i),
}));

export const workers = Array.from({ length: 60 }, (_, i) => ({
  id: `WRK-${pad(i + 1)}`,
  code: `W${pad(i + 1, 4)}`,
  name: name(i),
  role: ["Harvester", "Picker", "Packer", "Loader", "Supervisor"][i % 5],
  company: employmentCompanies[i % employmentCompanies.length].name,
  productivity: 65 + ((i * 13) % 35),
  status: pick(STATUSES, i),
}));

export const satelliteRoles = [
  { id: "SR-001", code: "SR-FOREMAN", name: "Field Foreman", level: "Senior", status: "Active" as Status },
  { id: "SR-002", code: "SR-INSP", name: "Quality Inspector", level: "Mid", status: "Active" as Status },
  { id: "SR-003", code: "SR-COORD", name: "Crew Coordinator", level: "Senior", status: "Active" as Status },
  { id: "SR-004", code: "SR-CHECK", name: "Weight Checker", level: "Junior", status: "Active" as Status },
  { id: "SR-005", code: "SR-LOG", name: "Logistics Aide", level: "Mid", status: "Inactive" as Status },
];

export const machines = Array.from({ length: 16 }, (_, i) => ({
  id: `MCH-${pad(i + 1)}`,
  code: `M${pad(i + 1, 3)}`,
  type: ["Tractor", "Forklift", "Sprayer", "Trailer", "Loader"][i % 5],
  model: ["John Deere 6M", "Kubota M7", "CAT 906", "Case IH Magnum"][i % 4],
  plate: `MX-${pad(1000 + i * 23, 4)}`,
  status: pick(STATUSES, i),
}));

export const machineOperators = Array.from({ length: 18 }, (_, i) => ({
  id: `OP-${pad(i + 1)}`,
  code: `OP${pad(i + 1, 3)}`,
  name: name(i + 7),
  license: `LIC-${pad(50000 + i * 121, 6)}`,
  machineType: ["Tractor", "Forklift", "Sprayer", "Trailer"][i % 4],
  status: pick(STATUSES, i),
}));

export const buyers = Array.from({ length: 14 }, (_, i) => ({
  id: `BUY-${pad(i + 1)}`,
  code: `B${pad(i + 1, 3)}`,
  name: `${["Global Produce", "FreshExport", "AvoMarket", "GreenLeaf", "Pacific Foods"][i % 5]} Inc. ${i + 1}`,
  country: ["USA", "Canada", "Japan", "Germany", "UK", "Spain"][i % 6],
  contact: name(i + 2),
  status: pick(STATUSES, i),
}));

export const destinationCenters = Array.from({ length: 10 }, (_, i) => ({
  id: `DC-${pad(i + 1)}`,
  code: `DC${pad(i + 1, 3)}`,
  name: `Distribution Hub ${["North", "South", "East", "West", "Central"][i % 5]} ${i + 1}`,
  city: ["Los Angeles", "Vancouver", "Tokyo", "Hamburg", "London", "Madrid"][i % 6],
  capacity: `${500 + i * 75} tn`,
  status: pick(STATUSES, i),
}));

export const transportProviders = Array.from({ length: 12 }, (_, i) => ({
  id: `TP-${pad(i + 1)}`,
  code: `TR${pad(i + 1, 3)}`,
  name: `${["TransAgro", "ColdChain", "FastFreight", "AgriLogistics"][i % 4]} ${i + 1}`,
  fleet: 8 + i * 3,
  contact: name(i + 4),
  rating: (3.5 + (i % 15) / 10).toFixed(1),
  status: pick(STATUSES, i),
}));

export const users = Array.from({ length: 22 }, (_, i) => ({
  id: `USR-${pad(i + 1)}`,
  name: name(i),
  email: `${pick(FIRST, i).toLowerCase()}.${pick(LAST, i + 3).toLowerCase()}@hcts.agro`,
  role: ["Administrator", "Operations Manager", "Field Supervisor", "QR Officer", "Auditor"][i % 5],
  lastLogin: `2026-06-${pad((i % 28) + 1, 2)} 0${(i % 9) + 1}:${pad((i * 7) % 60, 2)}`,
  status: pick(STATUSES, i),
}));

export const roles = [
  { id: "ROL-01", name: "Administrator", permissions: 48, users: 3, description: "Full system access", status: "Active" as Status },
  { id: "ROL-02", name: "Operations Manager", permissions: 32, users: 6, description: "Manage campaigns, harvest, dispatch", status: "Active" as Status },
  { id: "ROL-03", name: "Field Supervisor", permissions: 18, users: 14, description: "Field assignments and monitoring", status: "Active" as Status },
  { id: "ROL-04", name: "QR Officer", permissions: 12, users: 5, description: "QR generation and inventory", status: "Active" as Status },
  { id: "ROL-05", name: "Auditor", permissions: 8, users: 2, description: "Read-only access to logs and reports", status: "Active" as Status },
  { id: "ROL-06", name: "Buyer Liaison", permissions: 10, users: 4, description: "Buyer and dispatch coordination", status: "Inactive" as Status },
];

export const qrSeries = Array.from({ length: 20 }, (_, i) => ({
  id: `QRS-${pad(i + 1)}`,
  series: `HCTS-${2026}-${pad(i + 1, 4)}`,
  rangeFrom: `${pad(i * 1000 + 1, 7)}`,
  rangeTo: `${pad((i + 1) * 1000, 7)}`,
  generated: 1000,
  assigned: 600 + ((i * 47) % 400),
  collected: 300 + ((i * 31) % 300),
  status: pick(STATUSES, i),
}));

export const qrInventory = Array.from({ length: 40 }, (_, i) => ({
  id: `QR-${pad(i + 1, 7)}`,
  series: `HCTS-2026-${pad((i % 20) + 1, 4)}`,
  plot: plots[i % plots.length].code,
  worker: workers[i % workers.length].name,
  scannedAt: `2026-06-${pad((i % 28) + 1, 2)} ${pad((i % 12) + 6, 2)}:${pad((i * 11) % 60, 2)}`,
  weight: `${(8 + (i % 7) + Math.random()).toFixed(1)} kg`,
  status: ["Collected", "Assigned", "Pending"][i % 3],
}));

export const harvestAssignments = Array.from({ length: 18 }, (_, i) => ({
  id: `HA-${pad(i + 1)}`,
  date: `2026-06-${pad((i % 28) + 1, 2)}`,
  campaign: campaigns[i % campaigns.length].name,
  farm: farms[i % farms.length].name,
  plot: plots[i % plots.length].code,
  crew: `Crew ${String.fromCharCode(65 + (i % 8))}`,
  workers: 8 + (i % 12),
  variety: varieties[i % varieties.length].name,
  status: pick(STATUSES, i),
}));

export const collectionMonitoring = Array.from({ length: 26 }, (_, i) => ({
  id: `CM-${pad(i + 1)}`,
  time: `${pad((i % 12) + 6, 2)}:${pad((i * 13) % 60, 2)}`,
  farm: farms[i % farms.length].name,
  plot: plots[i % plots.length].code,
  crates: 12 + ((i * 7) % 28),
  weight: `${(180 + i * 14).toFixed(0)} kg`,
  progress: 30 + ((i * 11) % 65),
  status: pick(STATUSES, i),
}));

export const dispatchNotes = Array.from({ length: 16 }, (_, i) => ({
  id: `DN-${pad(i + 1)}`,
  date: `2026-06-${pad((i % 28) + 1, 2)}`,
  buyer: buyers[i % buyers.length].name,
  destination: destinationCenters[i % destinationCenters.length].name,
  pallets: 12 + (i % 18),
  weight: `${(3500 + i * 240).toFixed(0)} kg`,
  status: pick(STATUSES, i),
}));

export const transferOrders = Array.from({ length: 14 }, (_, i) => ({
  id: `TO-${pad(i + 1)}`,
  truck: `MX-${pad(7000 + i * 19, 4)}`,
  driver: name(i + 5),
  provider: transportProviders[i % transportProviders.length].name,
  dispatchNote: `DN-${pad((i % 16) + 1)}`,
  eta: `2026-06-${pad(((i + 2) % 28) + 1, 2)}`,
  status: pick(STATUSES, i),
}));

export const auditLogs = Array.from({ length: 30 }, (_, i) => ({
  id: `AL-${pad(i + 1)}`,
  user: users[i % users.length].name,
  module: ["Campaigns", "Workers", "QR Series", "Dispatch", "Settings", "Farms"][i % 6],
  action: ["Created", "Updated", "Deleted", "Exported", "Logged In", "Approved"][i % 6],
  timestamp: `2026-06-${pad((i % 28) + 1, 2)} ${pad((i % 24), 2)}:${pad((i * 17) % 60, 2)}:${pad((i * 7) % 60, 2)}`,
  ip: `192.168.${(i % 250) + 1}.${(i * 13) % 255}`,
}));

export const activities = [
  { id: 1, who: "Maria Lopez", action: "approved dispatch note DN-0012", time: "2 min ago", type: "success" },
  { id: 2, who: "Carlos Garcia", action: "generated QR series HCTS-2026-0019", time: "18 min ago", type: "info" },
  { id: 3, who: "Sofia Reyes", action: "completed harvest assignment HA-0014", time: "1 hr ago", type: "success" },
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
  { name: "In Transit", value: 18 },
  { name: "Loading", value: 9 },
  { name: "Pending", value: 6 },
];
