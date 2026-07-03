import { createFileRoute } from "@tanstack/react-router";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { workers } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/workers")({
  head: () => ({ meta: [{ title: "Workers — HCTS" }] }),
  component: () => (
    <MasterDataPage
      title="Workers"
      description="Field workforce roster"
      data={workers}
      columns={[
        { key: "code", header: "Code", className: "font-mono text-xs" },
        { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
        { key: "role", header: "Role" },
        { key: "company", header: "Company", className: "text-muted-foreground" },
        {
          key: "productivity",
          header: "Productivity",
          render: (r) => (
            <div className="flex items-center gap-2">
              <Progress value={r.productivity} className="h-1.5 w-24" />
              <span className="text-xs tabular-nums">{r.productivity}%</span>
            </div>
          ),
        },
        { key: "status", header: "Status" },
      ]}
    />
  ),
});
