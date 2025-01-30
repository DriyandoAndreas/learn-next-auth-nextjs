"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
// TODO: add protected url to prevent access specific page (must login)
// TODO: add logic to prevent user already login to access login page url
export default function Page() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div>
        <div className="flex item-center justify-center m-4 space-x-4">
          <div>
            <h1>Welcome {session.user.name}</h1>
          </div>
        </div>
        <div className="flex item-center justify-center">
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex item-center justify-center h-screen">
      Not logged in
    </div>
  );
}
