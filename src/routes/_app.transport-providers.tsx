import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { transportProviders } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/transport-providers")({
  head: () => ({ meta: [{ title: "Transport Providers — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Transport Providers"
      description="Logistics and freight partners"
      data={transportProviders}
      addLabel="Add Provider"
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Provider", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "contact", header: "Contact" },
        { key: "phone", header: "Phone", className: "tabular-nums" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
