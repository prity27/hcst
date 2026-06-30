import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { plots } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/plots")({
  head: () => ({ meta: [{ title: "Plots — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Plots"
      description="Cultivation plots across your farms"
      data={plots}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "farm", header: "Farm" },
        { key: "variety", header: "Variety" },
        { key: "area", header: "Area (ha)", className: "tabular-nums", render: (r) => `${r.area} ha` },
        { key: "trees", header: "Trees", className: "tabular-nums", render: (r) => r.trees.toLocaleString() },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
