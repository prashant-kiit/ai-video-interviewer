import SignUpLink from '../modules/SignUp/SignUp.interface';
import SignInLink from '../modules/SignIn/SignIn.interface';

export default function Home() {
  return (
    <div>
      <div>
        <h1>Video Chat Application</h1>
        <h2>Welcome to the Video Chat Application</h2>
      </div>
      <div>
        <SignUpLink/>
        <SignInLink/>
      </div>
    </div>
  );
}
