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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter",
  }),
  email: z.string().email({
    message: "Email tidak valid",
  }),
  password: z.string().min(6, {
    message: "Password harus minimal 6 karakter",
  }),
  role: z.string().default("user"),
});

export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "user",
    },
  });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      await UserRegister(formData);
      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Registrasi gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full lg:w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">Register User</CardTitle>
          <CardDescription className="text-center">
            Register form
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="yourmail@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col">
              <Button className="w-full" type="submit">
                Register
              </Button>
              <div className="mt-2">
                <Label>
                  Sudah punya akun?{" "}
                  <Link href={"/auth/login"}>
                    <span className="text-blue-600">Login disini</span>
                  </Link>{" "}
                </Label>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
