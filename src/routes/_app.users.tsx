import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { users } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/users")({
  head: () => ({ meta: [{ title: "Users — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Users"
      description="Manage platform accounts and access"
      data={users}
      addLabel="Add User"
      columns={[
        { key: "id", header: "ID", className: "font-mono text-xs" },
        { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "email", header: "Email", className: "text-muted-foreground" },
        { key: "role", header: "Role" },
        { key: "lastLogin", header: "Last login", className: "text-muted-foreground tabular-nums" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
