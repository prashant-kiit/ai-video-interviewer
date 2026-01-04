import CreateMeetingLink from "../modules/CreateMeeting/CreateMeeting.interface";
import OwnedMeetingsLink from "../modules/OwnedMeetings/OwnedMeetings.inferface";

export default function DashboardPage() {
  return (
    <div>
      <CreateMeetingLink/>
      <p>Start Instant Meeting Link</p>
      <p>Join Meeting Link</p>
      <p>View Meetings Scheduled By Me Link</p>
      <OwnedMeetingsLink/>
      <p>Save My Meetings Links</p>
      {/*<JoinMeetingLink/>*/}
    </div>
  );
}
