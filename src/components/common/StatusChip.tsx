import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Active: "bg-success/10 text-success ring-success/20",
  Completed: "bg-success/10 text-success ring-success/20",
  Delivered: "bg-success/10 text-success ring-success/20",
  Collected: "bg-success/10 text-success ring-success/20",
  Approved: "bg-success/10 text-success ring-success/20",
  Pending: "bg-warning/15 text-warning-foreground ring-warning/30",
  Loading: "bg-warning/15 text-warning-foreground ring-warning/30",
  Draft: "bg-muted text-muted-foreground ring-border",
  Inactive: "bg-muted text-muted-foreground ring-border",
  "In Progress": "bg-info/10 text-info ring-info/20",
  "In Transit": "bg-info/10 text-info ring-info/20",
  Assigned: "bg-info/10 text-info ring-info/20",
};

export function StatusChip({ status }: { status: string }) {
  const cls = map[status] ?? "bg-muted text-muted-foreground ring-border";
  return (
    <Badge variant="outline" className={cn("rounded-full px-2.5 py-0.5 font-medium ring-1", cls)}>
      <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full",
        cls.includes("success") ? "bg-success" :
        cls.includes("warning") ? "bg-warning" :
        cls.includes("info") ? "bg-info" :
        cls.includes("muted") ? "bg-muted-foreground/60" : "bg-foreground/60"
      )} />
      {status}
    </Badge>
  );
}
