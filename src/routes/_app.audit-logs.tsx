import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Activity, FileEdit, Trash2, Download, LogIn, CheckCircle2 } from "lucide-react";
import { auditLogs } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/_app/audit-logs")({
  head: () => ({ meta: [{ title: "Audit Logs — HCTS" }] }),
  component: AuditLogsPage,
});

const actionIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Created: Activity,
  Updated: FileEdit,
  Deleted: Trash2,
  Exported: Download,
  "Logged In": LogIn,
  Approved: CheckCircle2,
};

const actionColor: Record<string, string> = {
  Created: "bg-info/10 text-info",
  Updated: "bg-warning/15 text-warning-foreground",
  Deleted: "bg-destructive/10 text-destructive",
  Exported: "bg-muted text-muted-foreground",
  "Logged In": "bg-primary/10 text-primary",
  Approved: "bg-success/10 text-success",
};

function AuditLogsPage() {
  const [q, setQ] = useState("");
  const filtered = auditLogs.filter((l) =>
    [l.user, l.module, l.action, l.ip].some((v) => v.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Immutable timeline of system activity"
      />
      <div className="space-y-4 p-6">
        <Card className="border-border p-4 shadow-card">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search user, module, action, IP..."
              className="h-9 pl-9 bg-background"
            />
          </div>
        </Card>

        <Card className="border-border p-6 shadow-card">
          <ol className="relative space-y-5 border-l-2 border-border pl-6">
            {filtered.map((l) => {
              const Icon = actionIcon[l.action] ?? Activity;
              const color = actionColor[l.action] ?? "bg-muted text-muted-foreground";
              const initials = l.user.split(" ").map((p) => p[0]).slice(0, 2).join("");
              return (
                <li key={l.id} className="relative">
                  <span className={`absolute -left-[35px] flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-card ${color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border bg-muted/20 p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{l.user}</span>{" "}
                          <span className="text-muted-foreground">{l.action.toLowerCase()} in</span>{" "}
                          <Badge variant="secondary" className="font-medium">{l.module}</Badge>
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="tabular-nums">{l.timestamp}</span>
                          <span>·</span>
                          <span className="font-mono">IP {l.ip}</span>
                          <span>·</span>
                          <span className="font-mono">{l.id}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      </div>
    </>
  );
}
