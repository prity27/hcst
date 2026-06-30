import type { ReactNode } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown, Printer, FileSpreadsheet } from "lucide-react";

export function ReportShell({
  title,
  description,
  kpis,
  chart,
  table,
}: {
  title: string;
  description?: string;
  kpis: ReactNode;
  chart: ReactNode;
  table: ReactNode;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Printer className="h-3.5 w-3.5" /> Print</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5" /> Export Excel</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><FileDown className="h-3.5 w-3.5" /> Export PDF</Button>
          </>
        }
      />
      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{kpis}</div>
        <Card className="border-border p-6 shadow-card gap-4">{chart}</Card>
        {table}
      </div>
    </>
  );
}
