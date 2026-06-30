import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { varieties } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/varieties")({
  head: () => ({ meta: [{ title: "Varieties — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Varieties"
      description="Avocado varieties grown in your operation"
      data={varieties}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Variety", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "color", header: "Color" },
        { key: "maturityDays", header: "Maturity (days)", className: "tabular-nums" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
