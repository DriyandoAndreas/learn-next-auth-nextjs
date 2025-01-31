"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";

const formSchema = z.object({
  email: z.string().email({
    message: "Format email tidak valid",
  }),
  password: z.string().min(6, {
    message: "Password harus minimal 6 karakter",
  }),
});

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Login berhasil!");
      router.push("/");
    } catch (error) {
      toast.error("Login gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full lg:w-[450px]">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
          <CardDescription>
            Silahkan isi email dan password anda
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="masukkan email" {...field} />
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
                        placeholder="masukkan password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex-col justify-between">
              <Button className="w-full" type="submit">
                Masuk
              </Button>
              <div className="flex justify-between mt-2">
                <Label>
                  Tidak punya akun?{" "}
                  <Link href={"/auth/register"}>
                    <span className="text-blue-600">Daftar disini</span>
                  </Link>
                </Label>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
