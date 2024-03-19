"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import { adminSchema } from "@/validation/schemas";
import { Label } from "@radix-ui/react-dropdown-menu";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { redirect, useRouter } from "next/navigation";

export function FormAdmin() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<z.infer<typeof adminSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof adminSchema>) => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  };

  if (user) {
    redirect("/dashboard");
  }

  return (
    <section className="w-full min-h-screen">
      <div className="w-full mt-10 flex flex-col items-center">
        <Image
          src="/iconForm.png"
          alt="logo"
          width={200}
          height={50}
          className="max-w-full h-auto"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full md:w-[466px] md:p-0 p-4 md:mt-16 mt-24 space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-[24px] text-black font-bold">
                    Email
                  </Label>
                  <Input type="email" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-[24px] text-black font-bold">
                    Senha
                  </Label>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <span className="w-full flex justify-center items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
