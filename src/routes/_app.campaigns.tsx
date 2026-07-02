import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { campaigns, hasActiveCampaign, nextCampaignCode } from "@/lib/mock-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getAuthUser } from "@/lib/auth";
import { can } from "@/lib/permissions";

export const Route = createFileRoute("/_app/campaigns")({
  head: () => ({ meta: [{ title: "Campaigns — HCTS" }] }),
  component: CampaignsPage,
});

function CampaignsPage() {
  const [open, setOpen] = useState(false);
  const role = getAuthUser()?.role ?? "admin";
  const canCreate = can(role, "campaigns", "create");
  const activeExists = hasActiveCampaign();

  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Plan and track harvest campaigns"
        actions={canCreate ? <AddButton onClick={() => setOpen(true)}>New Campaign</AddButton> : null}
      />
      <div className="p-6">
        <DataTable
          data={campaigns}
          columns={[
            { key: "code", header: "Code", className: "font-mono text-xs" },
            {
              key: "name",
              header: "Campaign",
              render: (r) => (
                <Link to="/campaigns/$id" params={{ id: r.id }} className="font-medium text-primary hover:underline">
                  {r.name}
                </Link>
              ),
            },
            { key: "season", header: "Season" },
            { key: "startDate", header: "Start", className: "tabular-nums" },
            { key: "endDate", header: "End", className: "tabular-nums" },
            {
              key: "yieldForecastKg",
              header: "Forecast (kg)",
              className: "tabular-nums",
              render: (r) => r.yieldForecastKg.toLocaleString(),
            },
            {
              key: "yieldActualKg",
              header: "Actual (kg)",
              className: "tabular-nums",
              render: (r) => r.yieldActualKg.toLocaleString(),
            },
            { key: "status", header: "Status" },
          ]}
        />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md p-0">
          <SheetHeader className="border-b p-6">
            <SheetTitle>New Campaign</SheetTitle>
            <SheetDescription>
              Only one Active campaign is allowed. New campaigns start as Active only if none exist, otherwise Closed.
            </SheetDescription>
          </SheetHeader>
          <form
            className="space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (activeExists) {
                toast.error("An Active campaign already exists. Close it before creating a new Active campaign.");
                return;
              }
              toast.success("Campaign created (demo).");
              setOpen(false);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="ccode">Campaign code</Label>
              <Input id="ccode" readOnly value={nextCampaignCode()} className="font-mono bg-muted" />
              <p className="text-xs text-muted-foreground">Auto-generated. Read-only.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cname">Campaign name</Label>
              <Input id="cname" placeholder="Avocado Premium 2026" />
            </div>
            <div className="space-y-1.5">
              <Label>Season</Label>
              <Select defaultValue="2025/2026">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>
                  <SelectItem value="2025/2026">2025/2026</SelectItem>
                  <SelectItem value="2026/2027">2026/2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="start">Start date</Label>
                <Input id="start" type="date" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="end">End date</Label>
                <Input id="end" type="date" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" placeholder="Notes about this campaign..." rows={3} />
            </div>
            {activeExists && (
              <div className="rounded-md border border-warning/30 bg-warning/10 p-3 text-xs">
                An Active campaign already exists. You can save this campaign, but it will be created as{" "}
                <strong>Closed</strong> until the active one is closed.
              </div>
            )}
            <SheetFooter className="px-0">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Save Campaign</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
