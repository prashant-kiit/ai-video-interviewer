"use client";

import { useEffect, useState } from "react";
import TableGrid from "../../shared/components/TableGrid";
import { Meeting } from "../../shared/hooks/columns";
import { getOwnedMeetings } from "./OwnedMeetings.handler";
import { useToken } from "../../shared/store/token";
import { Loader } from "../../shared/components/Loader";
import { useRouter } from "next/navigation";

export default function MeetingTable() {
  const { getToken } = useToken();
  const [ownedMeetings, setOwnedMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const token = getToken();
  const router = useRouter();
  
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await getOwnedMeetings(token);
        console.log("Result", result);
        if (result.ok) {
          console.log("Owned Meetings", result.meetings );
          setOwnedMeetings(result.meetings);
        } else {
          console.error("Error in getting owned meeting", result.error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [token]);

  const onJoin = (meetingId: string) =>
    router.push(`/meeting/${meetingId}`);

  const onRemove = (meetingId: string) =>
    console.log(`Leaving meeting ${meetingId}`);

  if (isLoading) return <Loader />;

  return <TableGrid data={ownedMeetings} onJoin={onJoin} onRemove={onRemove} />;
}
