import SignInForm from "../../modules/SignIn/SignIn.component";
import Header from "../../shared/components/Header";

export default function SignInPage() {
  return (
    <div>
      <Header title="Sign In" size={2} />
      <SignInForm />
    </div>
  );
}
