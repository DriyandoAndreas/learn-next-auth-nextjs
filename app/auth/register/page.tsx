"use client";
import React, { useEffect } from "react";
import { UserRegister } from "@/action/register";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    UserRegister(formData);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <Card className=" w-full lg:w-[450px]">
          <CardHeader>
            <CardTitle className="text-center">Register User</CardTitle>
            <CardDescription className="text-center">
              Register form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" placeholder="John Doe" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Email</Label>
                <Input
                  name="email"
                  id="email"
                  placeholder="yourmail@mail.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Passowrd</Label>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                />
              </div>
              <Input name="role" type="hidden" id="role" value={"user"} />
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button className="w-full" type="submit">
              Register
            </Button>
            <div className="mt-2">
              <Label>
                already have account?{" "}
                <Link href={"/auth/login"}>
                  <span className="text-blue-600">Login here</span>
                </Link>{" "}
              </Label>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
