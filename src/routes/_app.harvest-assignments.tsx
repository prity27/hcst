import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { harvestAssignments } from "@/lib/mock-data";
import { ClarifyNote } from "@/components/common/ClarifyNote";

export const Route = createFileRoute("/_app/harvest-assignments")({
  head: () => ({ meta: [{ title: "Harvest Assignments — HCTS" }] }),
  component: HarvestAssignmentsPage,
});

function HarvestAssignmentsPage() {
  return (
    <>
      <PageHeader
        title="Harvest Assignments"
        description="Monitor crews and resources allocated to harvest operations (created from mobile)"
      />
      <div className="space-y-4 p-6">
        <ClarifyNote>
          Harvest Assignments are created on mobile devices by Field Engineers and Manijeros.
          The web portal is view / monitor / audit / correct only — no creation form.
        </ClarifyNote>
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
