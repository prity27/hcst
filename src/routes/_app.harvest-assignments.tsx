import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/common/DataTable";
import { harvestAssignments, campaigns, farms, plots, valves, parks, varieties } from "@/lib/mock-data";
import { ClipboardList } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/harvest-assignments")({
  head: () => ({ meta: [{ title: "Harvest Assignments — HCTS" }] }),
  component: HarvestAssignmentsPage,
});

function HarvestAssignmentsPage() {
  return (
    <>
      <PageHeader
        title="Harvest Assignments"
        description="Schedule crews and resources for harvest operations"
      />
      <div className="space-y-6 p-6">
        <Card className="border-border p-6 shadow-card gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold">New Assignment</h3>
              <p className="text-xs text-muted-foreground">Allocate a crew to a specific plot and variety.</p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Assignment saved (demo).");
            }}
            className="grid gap-4 md:grid-cols-3"
          >
            <FormSelect label="Campaign" options={campaigns.slice(0, 8).map((c) => c.name)} />
            <FormSelect label="Farm" options={farms.slice(0, 8).map((f) => f.name)} />
            <FormSelect label="Plot" options={plots.slice(0, 10).map((p) => p.code)} />
            <FormSelect label="Valve" options={valves.slice(0, 10).map((v) => v.code)} />
            <FormSelect label="Park" options={parks.slice(0, 8).map((p) => p.name)} />
            <FormSelect label="Variety" options={varieties.map((v) => v.name)} />
            <FormSelect label="Crew" options={["Crew A", "Crew B", "Crew C", "Crew D", "Crew E"]} />
            <div className="space-y-1.5">
              <Label>QR Range</Label>
              <div className="flex items-center gap-2">
                <Input placeholder="From" className="font-mono text-xs" />
                <span className="text-muted-foreground">—</span>
                <Input placeholder="To" className="font-mono text-xs" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Assignment date</Label>
              <Input type="date" />
            </div>
            <div className="md:col-span-3 flex justify-end gap-2">
              <Button variant="outline" type="reset">Reset</Button>
              <Button type="submit">Save Assignment</Button>
            </div>
          </form>
        </Card>

        <DataTable
          data={harvestAssignments}
          columns={[
            { key: "id", header: "ID", className: "font-mono text-xs" },
            { key: "date", header: "Date", className: "tabular-nums" },
            { key: "campaign", header: "Campaign", render: (r) => <span className="font-medium">{r.campaign}</span> },
            { key: "farm", header: "Farm" },
            { key: "plot", header: "Plot", className: "font-mono text-xs" },
            { key: "variety", header: "Variety" },
            { key: "crew", header: "Crew" },
            { key: "workers", header: "Workers", className: "tabular-nums" },
            { key: "status", header: "Status" },
          ]}
        />
      </div>
    </>
  );
}

function FormSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select>
        <SelectTrigger><SelectValue placeholder={`Select ${label.toLowerCase()}`} /></SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
