import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/common/DataTable";
import { auditLogs, users } from "@/lib/mock-data";
import { FileSpreadsheet, FileDown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/audit-logs")({
  head: () => ({ meta: [{ title: "Audit Logs — HCTS" }] }),
  component: AuditLogsPage,
});

const MODULES = ["Campaigns", "Workers", "QR Series", "Dispatch", "Settings", "Farms"];
const RECORD_TYPES = ["Campaign", "Worker", "QR Series", "Dispatch Note", "Farm", "System Config"];
const CHANGE_TYPES = ["Create", "Update", "Deactivate", "Close", "Approve", "Export", "Login"];

function AuditLogsPage() {
  const [user, setUser] = useState<string>("all");
  const [module, setModule] = useState<string>("all");
  const [recordType, setRecordType] = useState<string>("all");
  const [changeType, setChangeType] = useState<string>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(() => auditLogs.filter((l) => {
    if (user !== "all" && l.user !== user) return false;
    if (module !== "all" && l.module !== module) return false;
    if (recordType !== "all" && l.recordType !== recordType) return false;
    if (changeType !== "all" && l.changeType !== changeType) return false;
    const day = l.timestamp.slice(0, 10);
    if (from && day < from) return false;
    if (to && day > to) return false;
    return true;
  }), [user, module, recordType, changeType, from, to]);

  const doExport = (fmt: "csv" | "xlsx") => toast.success(`Exported ${filtered.length} rows as ${fmt.toUpperCase()} (demo).`);

  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Immutable, filterable record of every system change"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => doExport("csv")}>
              <FileDown className="h-3.5 w-3.5" /> Export CSV
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => doExport("xlsx")}>
              <FileSpreadsheet className="h-3.5 w-3.5" /> Export Excel
            </Button>
          </>
        }
      />
      <div className="space-y-4 p-6">
        <Card className="border-border p-4 shadow-card">
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            <FilterSelect label="User" value={user} onChange={setUser} options={users.map((u) => u.name)} />
            <FilterSelect label="Module" value={module} onChange={setModule} options={MODULES} />
            <FilterSelect label="Record Type" value={recordType} onChange={setRecordType} options={RECORD_TYPES} />
            <FilterSelect label="Change Type" value={changeType} onChange={setChangeType} options={CHANGE_TYPES} />
            <div className="space-y-1.5">
              <Label className="text-xs">From</Label>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">To</Label>
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="h-9" />
            </div>
          </div>
        </Card>

        <DataTable
          data={filtered}
          bulkActions={false}
          importExport={false}
          rowActions={false}
          columns={[
            { key: "timestamp", header: "Timestamp", className: "font-mono text-xs tabular-nums" },
            { key: "user", header: "User", render: (r) => <span className="font-medium">{r.user}</span> },
            { key: "module", header: "Module" },
            { key: "recordType", header: "Record Type" },
            { key: "recordId", header: "Record ID", className: "font-mono text-xs" },
            { key: "changeType", header: "Change" },
            { key: "before", header: "Before", className: "text-muted-foreground" },
            { key: "after", header: "After" },
            { key: "reason", header: "Reason", className: "text-muted-foreground" },
          ]}
        />
      </div>
    </>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
