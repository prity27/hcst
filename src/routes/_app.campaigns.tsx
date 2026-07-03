import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { campaigns } from "@/lib/mock-data";
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

export const Route = createFileRoute("/_app/campaigns")({
  head: () => ({ meta: [{ title: "Campaigns — HCTS" }] }),
  component: CampaignsPage,
});

function CampaignsPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Plan and track harvest campaigns"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" /> Import</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" /> Export</Button>
            <AddButton onClick={() => setOpen(true)}>Add Campaign</AddButton>
          </>
        }
      />
      <div className="p-6">
        <DataTable
          data={campaigns}
          columns={[
            { key: "code", header: "Code", className: "font-mono text-xs" },
            { key: "name", header: "Campaign", render: (r) => <span className="font-medium">{r.name}</span> },
            { key: "season", header: "Season" },
            { key: "startDate", header: "Start", className: "tabular-nums" },
            { key: "endDate", header: "End", className: "tabular-nums" },
            { key: "yield", header: "Yield (kg)", className: "tabular-nums", render: (r) => r.yield.toLocaleString() },
            { key: "status", header: "Status" },
          ]}
        />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md p-0">
          <SheetHeader className="border-b p-6">
            <SheetTitle>New Campaign</SheetTitle>
            <SheetDescription>Create a new harvesting campaign.</SheetDescription>
          </SheetHeader>
          <form
            className="space-y-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Campaign created (demo).");
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
                <Input id="ccode" placeholder="C-2026-099" />
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
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select defaultValue="Draft">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
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
