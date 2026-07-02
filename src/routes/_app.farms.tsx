import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { farms, farmHectares } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/farms")({
  head: () => ({ meta: [{ title: "Farms — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Farms"
      description="Registered farms in your network"
      data={farms}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Farm", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "region", header: "Region" },
        { key: "ha", header: "Aggregated ha", className: "tabular-nums", render: (r) => `${farmHectares(r.id)} ha` },
        { key: "manager", header: "Manager" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
