import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusChip } from "@/components/common/StatusChip";
import { DataTable } from "@/components/common/DataTable";
import {
  campaigns,
  harvestAssignments,
  dispatchNotes,
  transferOrders,
  collectionMonitoring,
  qrInventory,
} from "@/lib/mock-data";
import { ArrowLeft, Lock, Archive } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/campaigns/$id")({
  head: ({ params }) => ({ meta: [{ title: `Campaign ${params.id} — HCTS` }] }),
  loader: ({ params }) => {
    const c = campaigns.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  component: CampaignDetails,
  notFoundComponent: () => (
    <div className="p-8">
      <p className="text-sm">Campaign not found.</p>
      <Link to="/campaigns" className="text-primary text-sm hover:underline">Back to campaigns</Link>
    </div>
  ),
});

function CampaignDetails() {
  const c = Route.useLoaderData();
  const assignments = harvestAssignments.filter((a) => a.campaignId === c.id);
  const dispatches = dispatchNotes.filter((d) => d.campaignId === c.id);
  const linkedQr = qrInventory.slice(0, 20);

  const onClose = () => {
    if (c.status !== "Active") return toast.error("Only Active campaigns can be closed.");
    toast.success(`Campaign ${c.code} closed (demo).`);
  };
  const onArchive = () => {
    if (c.status !== "Closed") return toast.error("Only Closed campaigns can be archived to Historical.");
    toast.success(`Campaign ${c.code} archived (demo).`);
  };

  return (
    <>
      <PageHeader
        title={c.name}
        description={`${c.code} · Season ${c.season}`}
        actions={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link to="/campaigns"><ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Back</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={onClose} disabled={c.status !== "Active"} className="gap-1.5">
              <Lock className="h-3.5 w-3.5" /> Close Campaign
            </Button>
            <Button variant="outline" size="sm" onClick={onArchive} disabled={c.status !== "Closed"} className="gap-1.5">
              <Archive className="h-3.5 w-3.5" /> Archive
            </Button>
          </>
        }
      />

      <div className="space-y-6 p-6">
        <Card className="border-border p-6 shadow-card">
          <dl className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm">
            <div><dt className="text-xs text-muted-foreground uppercase">Status</dt><dd className="mt-1"><StatusChip status={c.status} /></dd></div>
            <div><dt className="text-xs text-muted-foreground uppercase">Start</dt><dd className="mt-1 tabular-nums">{c.startDate}</dd></div>
            <div><dt className="text-xs text-muted-foreground uppercase">End</dt><dd className="mt-1 tabular-nums">{c.endDate}</dd></div>
            <div><dt className="text-xs text-muted-foreground uppercase">Forecast</dt><dd className="mt-1 tabular-nums">{c.forecast.toLocaleString()} kg</dd></div>
            <div><dt className="text-xs text-muted-foreground uppercase">Actual yield</dt><dd className="mt-1 tabular-nums">{c.yield.toLocaleString()} kg</dd></div>
            <div><dt className="text-xs text-muted-foreground uppercase">Assignments</dt><dd className="mt-1 tabular-nums">{assignments.length}</dd></div>
            <div><dt className="text-xs text-muted-foreground uppercase">Dispatch notes</dt><dd className="mt-1 tabular-nums">{dispatches.length}</dd></div>
            <div><dt className="text-xs text-muted-foreground uppercase">Deliveries</dt><dd className="mt-1 tabular-nums">{dispatches.filter(d => d.status === "Delivered").length}</dd></div>
          </dl>
        </Card>

        <Tabs defaultValue="assignments">
          <TabsList>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="harvest">Harvest</TabsTrigger>
            <TabsTrigger value="dispatch">Dispatch Notes</TabsTrigger>
            <TabsTrigger value="forecast">Forecast vs Actual</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="linked">Linked Records</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="mt-4">
            <DataTable
              data={assignments}
              bulkActions={false}
              importExport={false}
              rowActions={false}
              columns={[
                { key: "id", header: "ID", className: "font-mono text-xs" },
                { key: "date", header: "Date", className: "tabular-nums" },
                { key: "farm", header: "Farm" },
                { key: "plot", header: "Plot", className: "font-mono text-xs" },
                { key: "crew", header: "Crew" },
                { key: "workers", header: "Workers", className: "tabular-nums" },
                { key: "status", header: "Status" },
              ]}
            />
          </TabsContent>

          <TabsContent value="harvest" className="mt-4">
            <DataTable
              data={collectionMonitoring.slice(0, 12)}
              bulkActions={false} importExport={false} rowActions={false}
              columns={[
                { key: "id", header: "ID", className: "font-mono text-xs" },
                { key: "time", header: "Time", className: "tabular-nums" },
                { key: "farm", header: "Farm" },
                { key: "plot", header: "Plot", className: "font-mono text-xs" },
                { key: "crates", header: "Crates", className: "tabular-nums" },
                { key: "weight", header: "Weight", className: "tabular-nums" },
                { key: "status", header: "Status" },
              ]}
            />
          </TabsContent>

          <TabsContent value="dispatch" className="mt-4">
            <DataTable
              data={dispatches}
              bulkActions={false} importExport={false} rowActions={false}
              columns={[
                { key: "id", header: "Note #", className: "font-mono text-xs" },
                { key: "date", header: "Date", className: "tabular-nums" },
                { key: "buyer", header: "Buyer" },
                { key: "destination", header: "Destination" },
                { key: "pallets", header: "Pallets", className: "tabular-nums" },
                { key: "weight", header: "Weight", className: "tabular-nums" },
                { key: "status", header: "Status" },
              ]}
            />
          </TabsContent>

          <TabsContent value="forecast" className="mt-4">
            <Card className="border-border p-6 shadow-card">
              <div className="grid gap-4 sm:grid-cols-3">
                <Kpi label="Forecast" value={`${c.forecast.toLocaleString()} kg`} />
                <Kpi label="Actual" value={`${c.yield.toLocaleString()} kg`} />
                <Kpi label="Variance" value={`${(((c.yield - c.forecast) / c.forecast) * 100).toFixed(1)}%`} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="deliveries" className="mt-4">
            <DataTable
              data={transferOrders.slice(0, 10)}
              bulkActions={false} importExport={false} rowActions={false}
              columns={[
                { key: "id", header: "Order #", className: "font-mono text-xs" },
                { key: "dispatchNote", header: "Dispatch Note", className: "font-mono text-xs" },
                { key: "truck", header: "Truck", className: "font-mono text-xs" },
                { key: "driver", header: "Driver" },
                { key: "provider", header: "Provider" },
                { key: "eta", header: "ETA", className: "tabular-nums" },
                { key: "status", header: "Status" },
              ]}
            />
          </TabsContent>

          <TabsContent value="linked" className="mt-4">
            <DataTable
              data={linkedQr}
              bulkActions={false} importExport={false} rowActions={false}
              columns={[
                { key: "id", header: "QR Code", className: "font-mono text-xs" },
                { key: "series", header: "Series", className: "font-mono text-xs" },
                { key: "plot", header: "Plot", className: "font-mono text-xs" },
                { key: "worker", header: "Worker" },
                { key: "weight", header: "Weight", className: "tabular-nums" },
                { key: "status", header: "Status" },
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-4">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
