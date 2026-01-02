import Header from "../../shared/components/Header";
import CreateMeetingLink from "../../modules/CreateMeeting/CreateMeeting.interface";
// import JoinMeeting from "../../shared/components/JoinMeeting";

export default function DashboardPage() {
  return (
    <div>
      <Header title="Dashboard" size={2} />
      <CreateMeetingLink/>
      {/*<JoinMeetingLink/>*/}
    </div>
  );
}
