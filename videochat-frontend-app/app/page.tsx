import SignUpLink from "../modules/SignUp/SignUp.interface";
import SignInLink from "../modules/SignIn/SignIn.interface";
import Header from "../shared/components/Header";

export default function Home() {
  return (
    <div>
      <Header title="Welcome to the Video Chat Application" size={2} />
      <SignUpLink />
      <SignInLink />
    </div>
  );
}
