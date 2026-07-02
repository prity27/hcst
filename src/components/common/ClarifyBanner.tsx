import { AlertTriangle } from "lucide-react";

export function ClarifyBanner({ items, title = "Pending PM confirmation" }: { items: string[]; title?: string }) {
  return (
    <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md bg-warning/20 p-1.5 text-warning-foreground">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-muted-foreground">
            {items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
