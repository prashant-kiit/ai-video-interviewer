import CreateMeetingForm from "../../modules/CreateMeeting/CreateMeeting.component";
import Header from "../../shared/components/Header";

export default function CreateMeetingPage() {
  return (
    <div>
      <Header title="Create Meeting" size={2} />
      <CreateMeetingForm />
    </div>
  );
}
