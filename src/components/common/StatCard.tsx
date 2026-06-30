import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: ReactNode;
  accent?: "primary" | "info" | "warning" | "success" | "earth";
}) {
  const accentBg: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    info: "bg-info/10 text-info",
    warning: "bg-warning/15 text-warning-foreground",
    success: "bg-success/10 text-success",
    earth: "bg-earth/10 text-earth",
  };
  return (
    <Card className="p-5 border-border shadow-card gap-3">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {icon && (
          <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", accentBg[accent])}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">{value}</p>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium",
              trend === "up" ? "bg-success/10 text-success" :
              trend === "down" ? "bg-destructive/10 text-destructive" :
              "bg-muted text-muted-foreground"
            )}
          >
            {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : trend === "down" ? <ArrowDownRight className="h-3 w-3" /> : null}
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
