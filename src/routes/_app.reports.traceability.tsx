import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/common/ReportShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ScanLine, PackageCheck, Truck, ArrowRightCircle } from "lucide-react";
import { qrInventory, dispatchNotes, transferOrders } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/_app/reports/traceability")({
  head: () => ({ meta: [{ title: "Traceability — HCTS" }] }),
  component: TraceabilityReport,
});

function TraceabilityReport() {
  const [code, setCode] = useState("QR-0000001");
  const qr = qrInventory.find((q) => q.id === code) ?? qrInventory[0];
  const dn = dispatchNotes[0];
  const to = transferOrders.find((t) => t.dispatchNote === dn.id) ?? transferOrders[0];

  return (
    <ReportShell
      title="Traceability"
      description="Follow a QR-tagged crate through the WBS MVP chain"
      kpis={
        <Card className="border-border p-4 shadow-card md:col-span-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter QR code (e.g. QR-0000001)"
                className="h-9 pl-9 font-mono"
              />
            </div>
            <Button size="sm">Trace</Button>
          </div>
        </Card>
      }
      chart={
        <>
          <div>
            <h3 className="text-base font-semibold">MVP Chain</h3>
            <p className="text-xs text-muted-foreground">
              Plot Origin → Collection Point Scan → Dispatch Note → Transfer Order → Truck Departure
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            <Step icon={<MapPin />} title="Plot Origin" primary={qr.plot} secondary="Farm origin" />
            <Step icon={<ScanLine />} title="Collection Scan" primary={qr.id} secondary={qr.scannedAt} />
            <Step icon={<PackageCheck />} title="Dispatch Note" primary={dn.id} secondary={dn.buyer} />
            <Step icon={<ArrowRightCircle />} title="Transfer Order" primary={to.id} secondary={to.provider} />
            <Step icon={<Truck />} title="Truck Departure" primary={to.truck} secondary={`ETA ${to.eta}`} />
          </div>
        </>
      }
      table={
        <Card className="border-border p-6 shadow-card">
          <h3 className="text-sm font-semibold mb-3">Scan history for {qr.id}</h3>
          <ol className="relative space-y-4 border-l border-border pl-4">
            <TimelineItem when="Plot origin registered" who={qr.worker} where={qr.plot} />
            <TimelineItem when={`Scanned at collection point (${qr.scannedAt})`} who={qr.worker} where={qr.plot} />
            <TimelineItem when={`Attached to dispatch note ${dn.id}`} who="Loading Team" where={dn.destination} />
            <TimelineItem when={`Transfer order ${to.id} issued`} who={to.driver} where={to.provider} />
            <TimelineItem when={`Truck ${to.truck} departed — ETA ${to.eta}`} who={to.driver} where={to.provider} />
          </ol>
        </Card>
      }
    />
  );
}

function Step({ icon, title, primary, secondary }: { icon: React.ReactNode; title: string; primary: string; secondary: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">{icon}</div>
      <p className="mt-3 text-[11px] uppercase tracking-wide text-muted-foreground">{title}</p>
      <p className="font-mono text-sm font-medium">{primary}</p>
      <p className="text-xs text-muted-foreground">{secondary}</p>
    </div>
  );
}

function TimelineItem({ when, who, where }: { when: string; who: string; where: string }) {
  return (
    <li className="relative">
      <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-card" />
      <p className="text-sm">{when}</p>
      <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary" className="font-medium">{who}</Badge>
        <span>·</span>
        <span>{where}</span>
      </p>
    </li>
  );
}
