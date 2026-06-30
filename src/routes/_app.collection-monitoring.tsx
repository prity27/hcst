import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { collectionMonitoring } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/collection-monitoring")({
  head: () => ({ meta: [{ title: "Collection Monitoring — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Collection Monitoring"
      description="Live visibility into field collection progress"
      data={collectionMonitoring}
      addLabel="Refresh"
      columns={[
        { key: "id", header: "ID", className: "font-mono text-xs" },
        { key: "time", header: "Time", className: "tabular-nums" },
        { key: "farm", header: "Farm" },
        { key: "plot", header: "Plot", className: "font-mono text-xs" },
        { key: "crates", header: "Crates", className: "tabular-nums" },
        { key: "weight", header: "Weight", className: "tabular-nums" },
        {
          key: "progress",
          header: "Progress",
          render: (r) => (
            <div className="flex items-center gap-2">
              <Progress value={r.progress} className="h-1.5 w-28" />
              <span className="text-xs tabular-nums">{r.progress}%</span>
            </div>
          ),
        },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
