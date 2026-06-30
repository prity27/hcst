import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { machines } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/machines")({
  head: () => ({ meta: [{ title: "Machines — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Machines"
      description="Fleet of machinery and equipment"
      data={machines}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "type", header: "Type" },
        { key: "model", header: "Model" },
        { key: "plate", header: "Plate", className: "font-mono text-xs" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
