import CreateMeetingLink from "../modules/CreateMeeting/CreateMeeting.interface";
// import JoinMeeting from "../../shared/components/JoinMeeting";

export default function DashboardPage() {
  return (
    <div>
      <CreateMeetingLink/>
      <p>Start Instant Meeting Link</p>
      <p>Join Meeting Link</p>
      <p>View My All Meetings Link</p>
      {/*<JoinMeetingLink/>*/}
    </div>
  );
}
