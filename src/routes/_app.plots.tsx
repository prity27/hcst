import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { plots } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/plots")({
  head: () => ({ meta: [{ title: "Plots — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Plots"
      description="Cultivation plots (child of Farm)"
      data={plots}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "farm", header: "Farm" },
        { key: "variety", header: "Variety" },
        { key: "areaHa", header: "Area (ha)", className: "tabular-nums", render: (r) => `${r.areaHa} ha` },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
