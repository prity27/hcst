import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { StatusChip } from "@/components/common/StatusChip";

export const Route = createFileRoute("/_app/error-corrections")({
  head: () => ({ meta: [{ title: "Error Corrections — HCTS" }] }),
  component: ErrorCorrectionsPage,
});

const items = [
  { id: "EC-0012", entity: "Harvest Assignment HA-2031", reason: "Worker count mismatch", reportedBy: "L. Vargas", at: "2h ago", status: "Pending" },
  { id: "EC-0011", entity: "Dispatch DN-0019", reason: "Wrong destination center", reportedBy: "M. Lopez", at: "5h ago", status: "In Review" },
  { id: "EC-0010", entity: "QR Series HCTS-2026-0017", reason: "Duplicate batch range", reportedBy: "J. Pérez", at: "Yesterday", status: "Resolved" },
  { id: "EC-0009", entity: "Plot P011", reason: "GPS polygon offset", reportedBy: "C. Mendoza", at: "Yesterday", status: "Pending" },
  { id: "EC-0008", entity: "Collection Batch CB-2218", reason: "Weight reading error", reportedBy: "R. Aguilar", at: "2d ago", status: "Resolved" },
];

const iconFor = (s: string) =>
  s === "Resolved" ? CheckCircle2 : s === "In Review" ? Clock : AlertTriangle;

function ErrorCorrectionsPage() {
  return (
    <>
      <PageHeader
        title="Error Corrections"
        description="Field-reported discrepancies and correction workflow"
        actions={<AddButton>Report Issue</AddButton>}
      />
      <div className="grid gap-3 p-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((i) => {
          const Icon = iconFor(i.status);
          return (
            <Card key={i.id} className="border-border p-5 shadow-card gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/15 text-warning-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{i.entity}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{i.reason}</p>
                  </div>
                </div>
                <StatusChip status={i.status} />
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="text-xs text-muted-foreground">
                  <Badge variant="secondary" className="font-mono text-[10px] mr-2">{i.id}</Badge>
                  {i.reportedBy} · {i.at}
                </div>
                <Button variant="ghost" size="sm">Review</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
