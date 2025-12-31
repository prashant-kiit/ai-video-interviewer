"use client";

import Button from './Button';
import { handleSignIn } from '../handlers';

export default function SignIn() {
  return (
    <div>
      <Button name="Sign In" handler={handleSignIn} />
    </div>
  );
}