import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { campaigns, CAMPAIGN_STATUSES } from "@/lib/mock-data";
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
import { StatusChip } from "@/components/common/StatusChip";
import { ClarifyNote } from "@/components/common/ClarifyNote";

export const Route = createFileRoute("/_app/campaigns")({
  head: () => ({ meta: [{ title: "Campaigns — HCTS" }] }),
  component: CampaignsPage,
});

function nextCampaignCode() {
  const year = new Date().getFullYear();
  const yearOnes = campaigns.filter((c) => c.code.startsWith(`C-${year}-`));
  const next = String(yearOnes.length + 1).padStart(3, "0");
  return `C-${year}-${next}`;
}

function CampaignsPage() {
  const [open, setOpen] = useState(false);
  const [season, setSeason] = useState("2025/2026");
  const hasActive = useMemo(() => campaigns.some((c) => c.status === "Active"), []);
  const autoCode = useMemo(() => nextCampaignCode(), [open]);

  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Plan and track harvest campaigns — only one campaign may be Active at a time"
        actions={<AddButton onClick={() => setOpen(true)}>New Campaign</AddButton>}
      />
      <div className="space-y-4 p-6">
        {hasActive && (
          <ClarifyNote>
            There is already an <span className="font-medium text-foreground">Active</span> campaign.
            You must Close it before a new campaign can be activated.
          </ClarifyNote>
        )}
        <DataTable
          data={campaigns}
          columns={[
            {
              key: "code",
              header: "Code",
              className: "font-mono text-xs",
              render: (r) => (
                <Link to="/campaigns/$id" params={{ id: r.id }} className="font-mono text-primary hover:underline">
                  {r.code}
                </Link>
              ),
            },
            { key: "name", header: "Campaign", render: (r) => <span className="font-medium">{r.name}</span> },
            { key: "season", header: "Season" },
            { key: "startDate", header: "Start", className: "tabular-nums" },
            { key: "endDate", header: "End", className: "tabular-nums" },
            { key: "forecast", header: "Forecast (kg)", className: "tabular-nums", render: (r) => r.forecast.toLocaleString() },
            { key: "yield", header: "Actual (kg)", className: "tabular-nums", render: (r) => r.yield.toLocaleString() },
            { key: "status", header: "Status", render: (r) => <StatusChip status={r.status} /> },
          ]}
        />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md p-0">
          <SheetHeader className="border-b p-6">
            <SheetTitle>New Campaign</SheetTitle>
            <SheetDescription>Create a new harvesting campaign. Campaign codes are auto-generated.</SheetDescription>
          </SheetHeader>
          <form
            className="space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (hasActive) {
                toast.error("Cannot create a new Active campaign — an active campaign already exists. Close it first.");
                return;
              }
              toast.success(`Campaign ${autoCode} created (demo).`);
              setOpen(false);
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="cname">Campaign name</Label>
              <Input id="cname" placeholder="Avocado Premium 2026" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ccode">Campaign code</Label>
                <Input id="ccode" value={autoCode} readOnly className="font-mono bg-muted/40 cursor-not-allowed" />
              </div>
              <div className="space-y-1.5">
                <Label>Season</Label>
                <Select value={season} onValueChange={setSeason}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024/2025">2024/2025</SelectItem>
                    <SelectItem value="2025/2026">2025/2026</SelectItem>
                    <SelectItem value="2026/2027">2026/2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              <Label htmlFor="forecast">Forecast (kg)</Label>
              <Input id="forecast" type="number" placeholder="45000" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" placeholder="Notes about this campaign..." rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label>Initial status</Label>
              <Select defaultValue={hasActive ? "Historical" : "Active"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CAMPAIGN_STATUSES.map((s) => (
                    <SelectItem key={s} value={s} disabled={s === "Active" && hasActive}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
