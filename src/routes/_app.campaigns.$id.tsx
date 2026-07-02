import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/common/DataTable";
import { StatusChip } from "@/components/common/StatusChip";
import {
  campaigns,
  harvestAssignments,
  dispatchNotes,
  transferOrders,
} from "@/lib/mock-data";
import { ChevronLeft, XCircle, Archive } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/campaigns/$id")({
  head: () => ({ meta: [{ title: "Campaign Details — HCTS" }] }),
  component: CampaignDetailsPage,
});

function CampaignDetailsPage() {
  const { id } = useParams({ from: "/_app/campaigns/$id" });
  const c = campaigns.find((x) => x.id === id) ?? campaigns[0];

  const linkedAssignments = harvestAssignments.filter((a) => a.campaign === c.name);
  const linkedDispatch = dispatchNotes.slice(0, 6);
  const linkedTransfers = transferOrders.slice(0, 5);

  const closeCampaign = () => toast.success(`Campaign ${c.code} closed.`);
  const archive = () => toast.success(`Campaign ${c.code} archived to Historical.`);

  return (
    <>
      <PageHeader
        title={c.name}
        description={`${c.code} · ${c.season}`}
        actions={
          <>
            <Button variant="ghost" size="sm" asChild><Link to="/campaigns"><ChevronLeft className="mr-1 h-4 w-4" /> Back</Link></Button>
            {c.status === "Active" && (
              <Button variant="outline" size="sm" onClick={closeCampaign} className="gap-1.5">
                <XCircle className="h-3.5 w-3.5" /> Close Campaign
              </Button>
            )}
            {c.status === "Closed" && (
              <Button variant="outline" size="sm" onClick={archive} className="gap-1.5">
                <Archive className="h-3.5 w-3.5" /> Archive
              </Button>
            )}
          </>
        }
      />
      <div className="space-y-6 p-6">
        <Card className="border-border p-6 shadow-card gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <StatusChip status={c.status} />
            <Info label="Start" value={c.startDate} />
            <Info label="End" value={c.endDate} />
            <Info label="Forecast" value={`${c.yieldForecastKg.toLocaleString()} kg`} />
            <Info label="Actual" value={`${c.yieldActualKg.toLocaleString()} kg`} />
          </div>
        </Card>

        <Tabs defaultValue="assignments">
          <TabsList>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="harvest">Harvest</TabsTrigger>
            <TabsTrigger value="dispatch">Dispatch Notes</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="yield">Actual Yield</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="mt-4">
            <DataTable
              data={linkedAssignments}
              bulkActions={false}
              rowActions={false}
              importExport={false}
              columns={[
                { key: "id", header: "ID", className: "font-mono text-xs" },
                { key: "date", header: "Date" },
                { key: "farm", header: "Farm" },
                { key: "plot", header: "Plot", className: "font-mono text-xs" },
                { key: "variety", header: "Variety" },
                { key: "crew", header: "Crew" },
                { key: "workers", header: "Workers", className: "tabular-nums" },
                { key: "status", header: "Status" },
              ]}
            />
          </TabsContent>

          <TabsContent value="harvest" className="mt-4">
            <Card className="border-border p-6 text-sm text-muted-foreground">
              Harvest breakdown by day/plot is populated from mobile-app scans.
            </Card>
          </TabsContent>

          <TabsContent value="dispatch" className="mt-4">
            <DataTable
              data={linkedDispatch}
              bulkActions={false}
              rowActions={false}
              importExport={false}
              columns={[
                { key: "id", header: "Note #", className: "font-mono text-xs" },
                { key: "date", header: "Date" },
                { key: "buyer", header: "Buyer" },
                { key: "destination", header: "Destination" },
                { key: "pallets", header: "Pallets", className: "tabular-nums" },
                { key: "weight", header: "Weight" },
                { key: "status", header: "Status" },
              ]}
            />
          </TabsContent>

          <TabsContent value="forecast" className="mt-4">
            <Card className="border-border p-6">
              <Info label="Yield Forecast" value={`${c.yieldForecastKg.toLocaleString()} kg`} />
            </Card>
          </TabsContent>

          <TabsContent value="yield" className="mt-4">
            <Card className="border-border p-6 grid gap-4 sm:grid-cols-3">
              <Info label="Actual Yield" value={`${c.yieldActualKg.toLocaleString()} kg`} />
              <Info label="Variance" value={`${(c.yieldActualKg - c.yieldForecastKg).toLocaleString()} kg`} />
              <Info label="Attainment" value={`${((c.yieldActualKg / c.yieldForecastKg) * 100).toFixed(1)}%`} />
            </Card>
          </TabsContent>

          <TabsContent value="deliveries" className="mt-4">
            <DataTable
              data={linkedTransfers}
              bulkActions={false}
              rowActions={false}
              importExport={false}
              columns={[
                { key: "id", header: "Order #", className: "font-mono text-xs" },
                { key: "truck", header: "Truck", className: "font-mono text-xs" },
                { key: "driver", header: "Driver" },
                { key: "provider", header: "Provider" },
                { key: "dispatchNote", header: "Dispatch #", className: "font-mono text-xs" },
                { key: "eta", header: "ETA" },
                { key: "status", header: "Status" },
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}
