"use client";

import Button from '../../shared/components/Button';
import { handleSignUp } from './handlers';

export default function SignUp() {
  return (
    <div>
      <Button name="Sign Up" handler={handleSignUp} />
    </div>
  );
}