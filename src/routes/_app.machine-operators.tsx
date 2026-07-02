import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { machineOperators } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/machine-operators")({
  head: () => ({ meta: [{ title: "Machine Operators — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Machine Operators"
      description="Certified operators — linked to Workers"
      data={machineOperators}
      addLabel="Link Operator"
      columns={[
        { key: "id", header: "ID", className: "font-mono text-xs" },
        { key: "workerCode", header: "Worker", className: "font-mono text-xs" },
        { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "dni", header: "DNI / NIE", className: "font-mono text-xs" },
        { key: "license", header: "License", className: "font-mono text-xs" },
        { key: "machineType", header: "Machine type" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
