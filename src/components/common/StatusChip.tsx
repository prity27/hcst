import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Tone = "success" | "info" | "warning" | "muted" | "danger";

const TONE_MAP: Record<Tone, string> = {
  success: "bg-success/10 text-success ring-success/20",
  info: "bg-info/10 text-info ring-info/20",
  warning: "bg-warning/15 text-warning-foreground ring-warning/30",
  muted: "bg-muted text-muted-foreground ring-border",
  danger: "bg-destructive/10 text-destructive ring-destructive/20",
};

// WBS status → tone. Any status not listed falls back to muted.
const STATUS_TONE: Record<string, Tone> = {
  // Campaign
  Active: "success",
  Closed: "muted",
  Historical: "muted",
  // Master / Users
  Inactive: "muted",
  // QR Series
  Draft: "muted",
  Generated: "info",
  "Sent to Printer": "warning",
  Received: "info",
  Exhausted: "muted",
  Cancelled: "danger",
  // QR Inventory extras
  Available: "info",
  Assigned: "info",
  Used: "success",
  "Scanned at Collection Point": "info",
  "Assigned to Dispatch Note": "info",
  Dispatched: "success",
  Returned: "warning",
  Damaged: "danger",
  Lost: "danger",
  // Ops
  Open: "info",
  Approved: "success",
  // Printer QC
  Pass: "success",
  Fail: "danger",
  Partial: "warning",
};

export function StatusChip({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? "muted";
  const cls = TONE_MAP[tone];
  const dot =
    tone === "success" ? "bg-success"
    : tone === "info" ? "bg-info"
    : tone === "warning" ? "bg-warning"
    : tone === "danger" ? "bg-destructive"
    : "bg-muted-foreground/60";
  return (
    <Badge variant="outline" className={cn("rounded-full px-2.5 py-0.5 font-medium ring-1", cls)}>
      <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", dot)} />
      {status}
    </Badge>
  );
}
