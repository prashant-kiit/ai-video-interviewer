"use client";

import Button from './Button';
import { handleSignUp } from '../handlers';

export default function SignUp() {
  return (
    <div>
      <Button name="Sign Up" handler={handleSignUp} />
    </div>
  );
}