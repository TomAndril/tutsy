"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function NavBarRightSideSignIn() {
  return (
    <div>
      <Button onClick={() => signIn()}>Sign In</Button>
    </div>
  );
}
