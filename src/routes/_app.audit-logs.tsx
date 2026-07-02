import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, FileSpreadsheet } from "lucide-react";
import { auditLogs, users } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const CHANGE_TYPES = ["Created", "Updated", "Deactivated", "Approved", "Closed", "Exported", "Login"];
const MODULES = ["Campaigns", "Workers", "QR Series", "Dispatch Notes", "Settings", "Farms", "Users"];
const RECORD_TYPES = ["Campaign", "Worker", "QRSeries", "DispatchNote", "Setting", "Farm", "User"];
const PAGE_SIZE = 12;

export const Route = createFileRoute("/_app/audit-logs")({
  head: () => ({ meta: [{ title: "Audit Logs — HCTS" }] }),
  component: AuditLogsPage,
});

function AuditLogsPage() {
  const [q, setQ] = useState("");
  const [user, setUser] = useState<string>("all");
  const [module, setModule] = useState<string>("all");
  const [recordType, setRecordType] = useState<string>("all");
  const [changeType, setChangeType] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    return auditLogs.filter((l) => {
      if (q && ![l.user, l.module, l.recordId, l.changeType, l.ip].some((v) => String(v).toLowerCase().includes(q.toLowerCase()))) return false;
      if (user !== "all" && l.user !== user) return false;
      if (module !== "all" && l.module !== module) return false;
      if (recordType !== "all" && l.recordType !== recordType) return false;
      if (changeType !== "all" && l.changeType !== changeType) return false;
      const day = l.timestamp.slice(0, 10);
      if (dateFrom && day < dateFrom) return false;
      if (dateTo && day > dateTo) return false;
      return true;
    });
  }, [q, user, module, recordType, changeType, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const exportCsv = () => {
    const header = ["Timestamp", "User", "Module", "Record Type", "Record ID", "Change", "Before", "After", "Reason", "IP"];
    const lines = [header.join(",")].concat(
      filtered.map((l) =>
        [l.timestamp, l.user, l.module, l.recordType, l.recordId, l.changeType, l.before ?? "", l.after, l.reason, l.ip]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      ),
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Immutable timeline of system activity"
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportCsv}><FileSpreadsheet className="mr-2 h-4 w-4" /> Export CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={exportCsv}><FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
      <div className="space-y-4 p-6">
        <Card className="border-border p-4 shadow-card">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search user, record, IP…" className="h-9 pl-9 bg-background" />
            </div>
            <FilterSelect label="User" value={user} onChange={(v) => { setUser(v); setPage(0); }} options={users.map((u) => u.name)} />
            <FilterSelect label="Module" value={module} onChange={(v) => { setModule(v); setPage(0); }} options={MODULES} />
            <FilterSelect label="Record Type" value={recordType} onChange={(v) => { setRecordType(v); setPage(0); }} options={RECORD_TYPES} />
            <FilterSelect label="Change Type" value={changeType} onChange={(v) => { setChangeType(v); setPage(0); }} options={CHANGE_TYPES} />
            <div className="flex items-end gap-2">
              <div className="flex-1 space-y-1">
                <Label className="text-[11px] text-muted-foreground">From</Label>
                <Input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(0); }} className="h-9" />
              </div>
              <div className="flex-1 space-y-1">
                <Label className="text-[11px] text-muted-foreground">To</Label>
                <Input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(0); }} className="h-9" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-border shadow-card overflow-hidden p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Record</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Before</TableHead>
                  <TableHead>After</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-mono text-xs tabular-nums text-muted-foreground">{l.timestamp}</TableCell>
                    <TableCell className="font-medium">{l.user}</TableCell>
                    <TableCell>{l.module}</TableCell>
                    <TableCell className="font-mono text-xs">{l.recordType} · {l.recordId}</TableCell>
                    <TableCell>{l.changeType}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{l.before ?? "—"}</TableCell>
                    <TableCell className="font-mono text-xs">{l.after}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{l.reason || "—"}</TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">No entries match the current filters.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between border-t p-3 text-xs">
            <span className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{rows.length}</span> of{" "}
              <span className="font-medium text-foreground">{filtered.length}</span>
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>Prev</Button>
              <span>Page <span className="font-medium">{page + 1}</span> of {totalPages}</span>
              <Button variant="outline" size="sm" disabled={page + 1 >= totalPages} onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}>Next</Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9"><SelectValue placeholder={`All ${label.toLowerCase()}s`} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
