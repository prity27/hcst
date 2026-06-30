import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { valves } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/valves")({
  head: () => ({ meta: [{ title: "Valves — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Valves"
      description="Irrigation valve registry"
      data={valves}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "plot", header: "Plot", className: "font-mono text-xs" },
        { key: "type", header: "Type" },
        { key: "flow", header: "Flow rate", className: "tabular-nums" },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
