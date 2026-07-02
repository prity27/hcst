import { PageHeader, AddButton } from "@/components/common/PageHeader";
import { DataTable, type Column } from "@/components/common/DataTable";

export function MasterDataPage<T extends { id: string; status?: string }>({
  title,
  description,
  data,
  columns,
  addLabel,
  canCreate = true,
}: {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  addLabel?: string;
  canCreate?: boolean;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={canCreate ? <AddButton>{addLabel ?? `Add ${title.replace(/s$/, "")}`}</AddButton> : null}
      />
      <div className="p-6">
        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
}
