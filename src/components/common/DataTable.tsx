import { useMemo, useState, type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import {
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  FileSpreadsheet,
  FileText as FilePdf,
  Inbox,
} from "lucide-react";
import { StatusChip } from "./StatusChip";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string; status?: string }>({
  data,
  columns,
  searchKeys,
  bulkActions = true,
  importExport = true,
  rowActions = true,
  empty,
}: {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  bulkActions?: boolean;
  importExport?: boolean;
  rowActions?: boolean;
  empty?: string;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const pageSize = 10;

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      (searchKeys ?? (Object.keys(row) as (keyof T)[])).some((k) =>
        String(row[k] ?? "").toLowerCase().includes(q),
      ),
    );
  }, [data, query, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleAll = () => {
    if (pageData.every((r) => selected.has(r.id))) {
      const n = new Set(selected);
      pageData.forEach((r) => n.delete(r.id));
      setSelected(n);
    } else {
      const n = new Set(selected);
      pageData.forEach((r) => n.add(r.id));
      setSelected(n);
    }
  };

  const allChecked = pageData.length > 0 && pageData.every((r) => selected.has(r.id));

  return (
    <Card className="overflow-hidden border-border shadow-card p-0 gap-0">
      <div className="flex flex-col gap-3 border-b border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="h-9 pl-9 bg-background"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Filters
          </Button>
          {bulkActions && selected.size > 0 && (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-xs text-muted-foreground">{selected.size} selected</span>
              <Button variant="outline" size="sm">Bulk Edit</Button>
              <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {importExport && (
            <>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Upload className="h-3.5 w-3.5" /> Import
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" /> Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel</DropdownMenuItem>
                  <DropdownMenuItem><FilePdf className="mr-2 h-4 w-4" /> Export PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {bulkActions && (
                <TableHead className="w-10">
                  <Checkbox checked={allChecked} onCheckedChange={toggleAll} aria-label="Select all" />
                </TableHead>
              )}
              {columns.map((c) => (
                <TableHead key={String(c.key)} className={c.className}>
                  {c.header}
                </TableHead>
              ))}
              {rowActions && <TableHead className="w-12 text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (bulkActions ? 1 : 0) + (rowActions ? 1 : 0)}>
                  <div className="flex flex-col items-center gap-2 py-12 text-center">
                    <div className="rounded-full bg-muted p-3">
                      <Inbox className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">No records found</p>
                    <p className="text-xs text-muted-foreground">{empty ?? "Try adjusting filters or add a new entry."}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              pageData.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30">
                  {bulkActions && (
                    <TableCell>
                      <Checkbox
                        checked={selected.has(row.id)}
                        onCheckedChange={(v) => {
                          const n = new Set(selected);
                          if (v) n.add(row.id); else n.delete(row.id);
                          setSelected(n);
                        }}
                        aria-label="Select row"
                      />
                    </TableCell>
                  )}
                  {columns.map((c) => {
                    const raw = (row as Record<string, unknown>)[String(c.key)];
                    let content: ReactNode;
                    if (c.render) content = c.render(row);
                    else if (String(c.key) === "status") content = <StatusChip status={String(raw)} />;
                    else content = String(raw ?? "");
                    return (
                      <TableCell key={String(c.key)} className={c.className}>
                        {content}
                      </TableCell>
                    );
                  })}
                  {rowActions && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Row actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2 border-t border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{pageData.length}</span> of{" "}
          <span className="font-medium text-foreground">{filtered.length}</span> records
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </Button>
          <span className="px-3 text-xs text-muted-foreground">
            Page <span className="font-medium text-foreground">{page}</span> of {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
