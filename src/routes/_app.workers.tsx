import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { workers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Printer, IdCard } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

type Worker = (typeof workers)[number];

export const Route = createFileRoute("/_app/workers")({
  head: () => ({ meta: [{ title: "Workers — HCTS" }] }),
  component: WorkersPage,
});

function WorkersPage() {
  const [booklet, setBooklet] = useState<Worker | null>(null);

  return (
    <>
      <PageHeader title="Workers" description="Field workforce roster" />
      <div className="p-6">
        <DataTable
          data={workers}
          columns={[
            { key: "code", header: "Code", className: "font-mono text-xs" },
            { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
            { key: "dni", header: "DNI / NIE", className: "font-mono text-xs" },
            { key: "phone", header: "Phone", className: "tabular-nums text-xs" },
            { key: "email", header: "Email", className: "text-muted-foreground text-xs" },
            { key: "registrationDate", header: "Registered", className: "tabular-nums text-xs" },
            { key: "qrCard", header: "QR Card", className: "font-mono text-xs" },
            { key: "role", header: "Role" },
            { key: "company", header: "Company", className: "text-muted-foreground" },
            {
              key: "booklet",
              header: "Booklet",
              render: (r) => (
                <Button variant="ghost" size="sm" className="h-7 gap-1.5" onClick={() => setBooklet(r)}>
                  <IdCard className="h-3.5 w-3.5" /> Booklet
                </Button>
              ),
            },
            { key: "status", header: "Status" },
          ]}
        />
      </div>

      <Dialog open={!!booklet} onOpenChange={(o) => !o && setBooklet(null)}>
        <DialogContent className="sm:max-w-md print:shadow-none">
          <DialogHeader>
            <DialogTitle>Worker Booklet</DialogTitle>
            <DialogDescription>Printable identification sheet</DialogDescription>
          </DialogHeader>
          {booklet && (
            <div className="rounded-lg border border-border bg-card p-5 text-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">HCTS Worker</p>
                  <p className="text-base font-semibold">{booklet.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs">{booklet.code}</p>
                  <p className="font-mono text-xs text-muted-foreground">{booklet.qrCard}</p>
                </div>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div><dt className="text-muted-foreground">DNI/NIE</dt><dd className="font-medium">{booklet.dni}</dd></div>
                <div><dt className="text-muted-foreground">Role</dt><dd className="font-medium">{booklet.role}</dd></div>
                <div><dt className="text-muted-foreground">Phone</dt><dd className="font-medium">{booklet.phone}</dd></div>
                <div><dt className="text-muted-foreground">Email</dt><dd className="font-medium truncate">{booklet.email}</dd></div>
                <div><dt className="text-muted-foreground">Registered</dt><dd className="font-medium">{booklet.registrationDate}</dd></div>
                <div><dt className="text-muted-foreground">Company</dt><dd className="font-medium">{booklet.company}</dd></div>
              </dl>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setBooklet(null)}>Close</Button>
            <Button onClick={() => window.print()} className="gap-1.5">
              <Printer className="h-4 w-4" /> Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
