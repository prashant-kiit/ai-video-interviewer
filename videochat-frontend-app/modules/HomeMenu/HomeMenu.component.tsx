import SignUpLink from "../SignUp/SignUp.interface";
import SignInLink from "../SignIn/SignIn.interface";

export default function HomeMenu() {
  return (
    <div>
      <SignUpLink />
      <SignInLink />
    </div>
  );
}
