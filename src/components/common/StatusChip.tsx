import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  // Positive / success
  Active: "bg-success/10 text-success ring-success/20",
  Delivered: "bg-success/10 text-success ring-success/20",
  Approved: "bg-success/10 text-success ring-success/20",
  Received: "bg-success/10 text-success ring-success/20",
  Used: "bg-success/10 text-success ring-success/20",
  "Scanned at Collection Point": "bg-success/10 text-success ring-success/20",
  Dispatched: "bg-success/10 text-success ring-success/20",
  Closed: "bg-primary/10 text-primary ring-primary/20",

  // Neutral / draft / inactive
  Draft: "bg-muted text-muted-foreground ring-border",
  Inactive: "bg-muted text-muted-foreground ring-border",
  Historical: "bg-muted text-muted-foreground ring-border",
  Cancelled: "bg-muted text-muted-foreground ring-border",
  Exhausted: "bg-muted text-muted-foreground ring-border",

  // In-flight / info
  Generated: "bg-info/10 text-info ring-info/20",
  Available: "bg-info/10 text-info ring-info/20",
  Assigned: "bg-info/10 text-info ring-info/20",
  "Assigned to Dispatch Note": "bg-info/10 text-info ring-info/20",
  "In Transit": "bg-info/10 text-info ring-info/20",
  Confirmed: "bg-info/10 text-info ring-info/20",
  "In Progress": "bg-info/10 text-info ring-info/20",
  Planned: "bg-info/10 text-info ring-info/20",

  // Warning
  "Sent to Printer": "bg-warning/15 text-warning-foreground ring-warning/30",
  Returned: "bg-warning/15 text-warning-foreground ring-warning/30",

  // Destructive
  Damaged: "bg-destructive/10 text-destructive ring-destructive/20",
  Lost: "bg-destructive/10 text-destructive ring-destructive/20",
};

export function StatusChip({ status }: { status: string }) {
  const cls = map[status] ?? "bg-muted text-muted-foreground ring-border";
  return (
    <Badge variant="outline" className={cn("rounded-full px-2.5 py-0.5 font-medium ring-1", cls)}>
      <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full",
        cls.includes("success") ? "bg-success" :
        cls.includes("warning") ? "bg-warning" :
        cls.includes("info") ? "bg-info" :
        cls.includes("destructive") ? "bg-destructive" :
        cls.includes("primary") ? "bg-primary" :
        cls.includes("muted") ? "bg-muted-foreground/60" : "bg-foreground/60"
      )} />
      {status}
    </Badge>
  );
}
