"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase";
import { contactSchema } from "@/validation/schemas";
import { addDoc, collection } from "firebase/firestore";
import { FacebookIcon, InstagramIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

export function FormContact() {
  const form = useForm<z.infer<typeof contactSchema>>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      await addDoc(collection(db, "contact"), {
        id: Math.random().toString(),
        name: data.name,
        email: data.email,
        message: data.message,
      });

      form.reset();
      toast.success("Formulário enviado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full">
      <div className="w-full max-w-screen-xl mx-auto mt-5">
        <h1 className="md:text-[52px] text-3xl font-bold text-center md:text-left leading-relaxed">
          Queremos fazer parte da sua história!
        </h1>

        <div className="flex flex-col md:flex-row md:justify-between  p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="md:w-[466px] md:p-0 p-4 md:mt-16 space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[32px] font-bold">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
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
                    <FormLabel className="text-black text-[32px] font-bold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black text-[32px] font-bold">
                      Mensagem
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-52"
                        placeholder="Escreva sua mensagem"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-4"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Enviar
              </Button>
            </form>
          </Form>

          <div className="w-full md:w-[466px] md:p-0 p-4 md:mt-8 space-y-8 md:flex md:flex-col justify-between  md:ml-10">
            <div className="md:w-full md:max-w-[266px] md:p-0 p-4 space-y-8 flex flex-col">
              <h2 className="text-black text-[32px] font-bold">Duvidas?</h2>
              <p>
                Chame no WhatsApp através do botão abaixo para ser atendido por
                um de nossos especialistas!
              </p>

              <Link
                className={buttonVariants({
                  className: "w-full mt-4",
                })}
                type="submit"
                href="https://wa.me/5511913674909"
              >
                <MessageSquare className="mr-5" />
                Chamar no WhatsApp
              </Link>
            </div>

            <div>
              <h2 className="text-black text-[32px] font-bold">Contato</h2>

              <p>(11) 91367-4909</p>
              <p>(11) 94072-3891</p>
              <p>contato@autonegocie.com.br</p>
            </div>

            <div>
              <h2 className="text-black text-[32px] font-bold">Rede Social</h2>

              <ul className="flex gap-5">
                <li>
                  <Link
                    href="https://www.instagram.com/bmzsintonia?igsh=czc0c280MzFia2k5"
                    target="_blank"
                  >
                    <InstagramIcon className="text-black" />
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://www.facebook.com/CarrosUsadosABCD?mibextid=ZbWKwL"
                    target="_blank"
                  >
                    <FacebookIcon className="text-black" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
