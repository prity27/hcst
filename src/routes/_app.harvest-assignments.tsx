import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { harvestAssignments } from "@/lib/mock-data";
import { ClarifyBanner } from "@/components/common/ClarifyBanner";

export const Route = createFileRoute("/_app/harvest-assignments")({
  head: () => ({ meta: [{ title: "Harvest Assignments — HCTS" }] }),
  component: () => (
    <>
      <PageHeader
        title="Harvest Assignments"
        description="Monitor field assignments — creation is performed on the mobile app only"
      />
      <div className="space-y-4 p-6">
        <ClarifyBanner items={["Web portal is view / monitor / correct only. New assignments are created on the mobile app."]} />
        <DataTable
          data={harvestAssignments}
          bulkActions={false}
          importExport={true}
          rowActions={false}
          columns={[
            { key: "id", header: "ID", className: "font-mono text-xs" },
            { key: "date", header: "Date", className: "tabular-nums" },
            { key: "campaign", header: "Campaign" },
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
  ),
});
