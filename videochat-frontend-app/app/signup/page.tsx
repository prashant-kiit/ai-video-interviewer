import SignUpForm from "../../modules/SignUp/SignUp.component";
import Header from "../../shared/components/Header";

export default function SignUpPage() {
  return (
    <div>
      <Header title="Sign Up" size={2} />
      <SignUpForm />
    </div>
  );
}
