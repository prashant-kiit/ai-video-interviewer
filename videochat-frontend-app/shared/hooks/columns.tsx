import { ColumnDef } from "@tanstack/react-table";
import type { OwnedMeetingResponse } from "../../modules/OwnedMeetings/OwnedMeetings.handler";

export type Meeting = OwnedMeetingResponse;

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
      accessorKey: "meetingPasscode",
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
