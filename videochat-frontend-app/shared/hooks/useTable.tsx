import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

export default function useTable<TData>(data: TData[], getColumns: (onJoin: (meetingId: string) => void, onRemove: (meetingId: string) => void) => ColumnDef<TData>[], onJoin: (meetingId: string) => void, onRemove: (meetingId: string) => void) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: getColumns(onJoin, onRemove),
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
}