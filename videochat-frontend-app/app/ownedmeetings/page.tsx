"use client";

import MeetingsTable from "../../modules/OwnedMeetings/MeetingsTable.component";

export default function MeetingsPage() {
  const data = [
    { meetingId: "123", passcode: "abc" },
    { meetingId: "456", passcode: "xyz" },
  ];

  const onJoin = (meetingId: string) =>
    console.log(`Joining meeting ${meetingId}`);

  const onRemove = (meetingId: string) =>
    console.log(`Leaving meeting ${meetingId}`);

  return (
    <div>
      <MeetingsTable data={data} onJoin={onJoin} onRemove={onRemove} />
    </div>
  );
}
