import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { employmentCompanies } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/employment-companies")({
  head: () => ({ meta: [{ title: "Employment Companies — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Employment Companies"
      description="Third-party labor providers"
      data={employmentCompanies}
      addLabel="Add Company"
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Company", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "taxId", header: "Tax ID", className: "font-mono text-xs" },
        { key: "contact", header: "Contact" },
        { key: "phone", header: "Phone", className: "tabular-nums" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
