import { useMemo, useState, type ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table";
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
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  Pencil,
  PowerOff,
  FileSpreadsheet,
  FileText as FilePdf,
  Inbox,
} from "lucide-react";
import { StatusChip } from "./StatusChip";
import { cn } from "@/lib/utils";

// Legacy column shape — kept for backward compatibility with existing pages.
export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string; status?: string }>({
  data,
  columns,
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
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    const cols: ColumnDef<T>[] = columns.map((c) => ({
      id: String(c.key),
      accessorFn: (row) => (row as Record<string, unknown>)[String(c.key)],
      header: c.header,
      cell: ({ row }) => {
        if (c.render) return c.render(row.original);
        const raw = (row.original as Record<string, unknown>)[String(c.key)];
        if (String(c.key) === "status") return <StatusChip status={String(raw)} />;
        return String(raw ?? "");
      },
      meta: { className: c.className },
    }));
    return cols;
  }, [columns]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { globalFilter, sorting, rowSelection },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const rows = table.getRowModel().rows;
  const filteredCount = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const totalPages = Math.max(1, table.getPageCount());
  const selectedCount = Object.keys(rowSelection).length;
  const colSpan = tableColumns.length + (bulkActions ? 1 : 0) + (rowActions ? 1 : 0);

  return (
    <Card className="overflow-hidden border-border shadow-card p-0 gap-0">
      <div className="flex flex-col gap-3 border-b border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="h-9 pl-9 bg-background"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Filters
          </Button>
          {bulkActions && selectedCount > 0 && (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-xs text-muted-foreground">{selectedCount} selected</span>
              <Button variant="outline" size="sm">Bulk Edit</Button>
              <Button variant="outline" size="sm">Deactivate</Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {importExport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="h-3.5 w-3.5" /> Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><FileSpreadsheet className="mr-2 h-4 w-4" /> Export CSV</DropdownMenuItem>
                <DropdownMenuItem><FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel</DropdownMenuItem>
                <DropdownMenuItem><FilePdf className="mr-2 h-4 w-4" /> Export PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-muted/40 hover:bg-muted/40">
                {bulkActions && (
                  <TableHead className="w-10">
                    <Checkbox
                      checked={table.getIsAllPageRowsSelected()}
                      onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
                      aria-label="Select all"
                    />
                  </TableHead>
                )}
                {hg.headers.map((header) => {
                  const meta = header.column.columnDef.meta as { className?: string } | undefined;
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id} className={meta?.className}>
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sorted === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : sorted === "desc" ? (
                          <ArrowDown className="h-3 w-3" />
                        ) : (
                          <ChevronsUpDown className="h-3 w-3 opacity-40" />
                        )}
                      </button>
                    </TableHead>
                  );
                })}
                {rowActions && <TableHead className="w-12 text-right">Actions</TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={colSpan}>
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
              rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30" data-state={row.getIsSelected() && "selected"}>
                  {bulkActions && (
                    <TableCell>
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(v) => row.toggleSelected(!!v)}
                        aria-label="Select row"
                      />
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as { className?: string } | undefined;
                    return (
                      <TableCell key={cell.id} className={cn(meta?.className)}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                          <DropdownMenuItem><PowerOff className="mr-2 h-4 w-4" /> Deactivate</DropdownMenuItem>
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
          Showing <span className="font-medium text-foreground">{rows.length}</span> of{" "}
          <span className="font-medium text-foreground">{filteredCount}</span> records
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            <ChevronLeft className="h-3.5 w-3.5" /> Prev
          </Button>
          <span className="px-3 text-xs text-muted-foreground">
            Page <span className="font-medium text-foreground">{pageIndex + 1}</span> of {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            Next <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
