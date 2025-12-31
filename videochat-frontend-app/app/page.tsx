import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function Home() {
  return (
    <div>
      <div>
        <h1>Video Chat Application</h1>
        <h2>Welcome to the Video Chat Application</h2>
      </div>
      <div>
        <SignUp/>
        <SignIn/>
      </div>
    </div>
  );
}
