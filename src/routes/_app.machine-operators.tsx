import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { machineOperators } from "@/lib/mock-data";
import { ClarifyNote } from "@/components/common/ClarifyNote";

export const Route = createFileRoute("/_app/machine-operators")({
  head: () => ({ meta: [{ title: "Machine Operators — HCTS" }] }),
  component: () => (
    <>
      <div className="px-6 pt-6">
        <ClarifyNote>
          Machine Operators reference an existing Worker (FK: <code>workerId</code>). PM confirm
          whether operators may be created independently or must always be a Worker.
        </ClarifyNote>
      </div>
      <MasterDataPage
        title="Machine Operators"
        description="Certified machinery operators (linked to Worker records)"
        data={machineOperators}
        addLabel="Add Operator"
        columns={[
          { key: "code", header: "Code", className: "font-mono text-xs" },
          { key: "name", header: "Operator", render: (r) => <span className="font-medium">{r.name}</span> },
          { key: "workerId", header: "Worker", className: "font-mono text-xs" },
          { key: "license", header: "License", className: "font-mono text-xs" },
          { key: "machineType", header: "Machine type" },
          { key: "status", header: "Status" },
        ]}
      />
    </>
  ),
});
