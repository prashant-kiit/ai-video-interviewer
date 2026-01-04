"use client";

import { flexRender } from "@tanstack/react-table";
import useTable from "../../shared/hooks/useTable";
import { getColumns, Meeting } from "../../shared/hooks/columns";

export default function TableGrid({
  data,
  onJoin,
  onRemove,
}: {
  data: Meeting[];
  onJoin: (meetingId: string) => void;
  onRemove: (meetingId: string) => void;
}) {
  const table = useTable(data, getColumns, onJoin, onRemove);

  return (
    <table border={1}>
      <thead>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
