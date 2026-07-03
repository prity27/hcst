import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { machineOperators } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/machine-operators")({
  head: () => ({ meta: [{ title: "Machine Operators — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Machine Operators"
      description="Certified machinery operators"
      data={machineOperators}
      addLabel="Add Operator"
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Operator", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "license", header: "License", className: "font-mono text-xs" },
        { key: "machineType", header: "Machine type" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
