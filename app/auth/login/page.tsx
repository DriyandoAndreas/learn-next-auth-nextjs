"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import React from "react";

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
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <Card className="w-full lg:w-[450px]">
          <CardHeader>
            <CardTitle>Masuk</CardTitle>
            <CardDescription>
              Silahkan isi email dan password anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username" className="block text-sm font-medium">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="masukkan email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <Input
                name="password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="masukkan password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full" type="submit">
              Masuk
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
