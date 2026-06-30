import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";

export function MasterDataPage<T extends { id: string; status?: string }>({
  title,
  description,
  data,
  columns,
  addLabel,
}: {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  addLabel?: string;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Upload className="h-3.5 w-3.5" /> Import Excel
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export Excel
            </Button>
            <AddButton>{addLabel ?? `Add ${title.replace(/s$/, "")}`}</AddButton>
          </>
        }
      />
      <div className="p-6">
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}
