import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { buyers } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/buyers")({
  head: () => ({ meta: [{ title: "Buyers — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Buyers"
      description="International and domestic produce buyers"
      data={buyers}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Buyer", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "country", header: "Country" },
        { key: "contact", header: "Contact" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
