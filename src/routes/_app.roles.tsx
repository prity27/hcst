import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Lock, Pencil } from "lucide-react";
import { roles } from "@/lib/mock-data";
import { StatusChip } from "@/components/common/StatusChip";

export const Route = createFileRoute("/_app/roles")({
  head: () => ({ meta: [{ title: "Roles & Permissions — HCTS" }] }),
  component: RolesPage,
});

function RolesPage() {
  return (
    <>
      <PageHeader
        title="Roles & Permissions"
        description="Define role-based access for your organization"
        actions={<AddButton>New Role</AddButton>}
      />
      <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((r) => (
          <Card key={r.id} className="border-border p-5 shadow-card gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-tight">{r.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
                </div>
              </div>
              <StatusChip status={r.status} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Lock className="h-3 w-3" /> Permissions</div>
                <p className="mt-1 text-lg font-semibold tabular-nums">{r.permissions}</p>
              </div>
              <div className="rounded-md border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Users className="h-3 w-3" /> Users</div>
                <p className="mt-1 text-lg font-semibold tabular-nums">{r.users}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="font-mono text-[10px]">{r.id}</Badge>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
