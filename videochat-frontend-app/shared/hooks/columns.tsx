import { ColumnDef } from "@tanstack/react-table";

export type Meeting = {
  meetingId: string;
  passcode: string;
};

export const getColumns = (
  onJoin: (meetingId: string) => void,
  onRemove: (meetingId: string) => void,
) => {
  const columns: ColumnDef<Meeting>[] = [
    {
      header: "Meeting ID",
      accessorKey: "meetingId",
    },
    {
      header: "Passcode",
      accessorKey: "passcode",
    },
    {
      header: "Join",
      cell: ({ row }) => (
        <button onClick={() => onJoin(row.original.meetingId)}>Join</button>
      ),
    },
    {
      header: "Remove",
      cell: ({ row }) => (
        <button onClick={() => onRemove(row.original.meetingId)}>Remove</button>
      ),
    },
  ];

  return columns;
};
