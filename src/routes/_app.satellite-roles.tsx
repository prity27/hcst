import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { satelliteRoles } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/satellite-roles")({
  head: () => ({ meta: [{ title: "Satellite Roles — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Satellite Roles"
      description="Field-level operational roles"
      data={satelliteRoles}
      addLabel="Add Role"
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Role", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "level", header: "Level" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
