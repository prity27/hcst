import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ClarifyNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3 text-xs text-foreground",
        className,
      )}
    >
      <AlertTriangle className="h-4 w-4 shrink-0 text-warning-foreground" />
      <div>
        <span className="mr-1.5 rounded bg-warning/20 px-1.5 py-0.5 font-semibold uppercase tracking-wide text-[10px] text-warning-foreground">
          Clarify
        </span>
        <span className="text-muted-foreground">{children}</span>
      </div>
    </div>
  );
}
