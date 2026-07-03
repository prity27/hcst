import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MasterDataPage } from "@/components/common/MasterDataPage";
import { workers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Printer } from "lucide-react";

type Worker = (typeof workers)[number];

export const Route = createFileRoute("/_app/workers")({
  head: () => ({ meta: [{ title: "Workers — HCTS" }] }),
  component: WorkersPage,
});

function WorkersPage() {
  const [booklet, setBooklet] = useState<Worker | null>(null);
  return (
    <>
      <MasterDataPage
        title="Workers"
        description="Field workforce roster"
        data={workers}
        columns={[
          { key: "code", header: "Code", className: "font-mono text-xs" },
          { key: "name", header: "Name", render: (r) => <span className="font-medium">{r.name}</span> },
          { key: "dni", header: "DNI / NIE", className: "font-mono text-xs" },
          { key: "phone", header: "Phone", className: "tabular-nums" },
          { key: "email", header: "Email", className: "text-muted-foreground" },
          { key: "registrationDate", header: "Registered", className: "tabular-nums" },
          { key: "qrCard", header: "QR Card", className: "font-mono text-xs" },
          { key: "role", header: "Role" },
          { key: "company", header: "Company", className: "text-muted-foreground" },
          {
            key: "booklet",
            header: "",
            render: (r) => (
              <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setBooklet(r)}>
                <Printer className="h-3.5 w-3.5" /> Booklet
              </Button>
            ),
          },
          { key: "status", header: "Status" },
        ]}
      />

      <Dialog open={!!booklet} onOpenChange={(o) => !o && setBooklet(null)}>
        <DialogContent className="sm:max-w-md print:shadow-none">
          <DialogHeader>
            <DialogTitle>Worker Booklet</DialogTitle>
          </DialogHeader>
          {booklet && (
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-xs uppercase text-muted-foreground">HCTS Worker ID</p>
                <p className="font-mono text-lg font-semibold">{booklet.qrCard}</p>
              </div>
              <dl className="grid grid-cols-2 gap-y-2">
                <dt className="text-muted-foreground">Name</dt><dd className="font-medium">{booklet.name}</dd>
                <dt className="text-muted-foreground">DNI / NIE</dt><dd className="font-mono">{booklet.dni}</dd>
                <dt className="text-muted-foreground">Phone</dt><dd className="tabular-nums">{booklet.phone}</dd>
                <dt className="text-muted-foreground">Email</dt><dd>{booklet.email}</dd>
                <dt className="text-muted-foreground">Registered</dt><dd className="tabular-nums">{booklet.registrationDate}</dd>
                <dt className="text-muted-foreground">Role</dt><dd>{booklet.role}</dd>
                <dt className="text-muted-foreground">Company</dt><dd>{booklet.company}</dd>
              </dl>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setBooklet(null)}>Close</Button>
            <Button onClick={() => window.print()} className="gap-1.5"><Printer className="h-4 w-4" /> Print</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
