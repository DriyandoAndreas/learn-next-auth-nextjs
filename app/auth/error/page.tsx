import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
export default function ErrorPage() {
  return (
    <div className="flex-col justify-center items-center h-screen">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Opps...
      </h1>
      <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Something went wrong
      </h3>
      <Link href={"/"}>
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}
