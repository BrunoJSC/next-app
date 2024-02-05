"use client";

import { db } from "@/firebase";
import { contactVehicleSchema } from "@/validation/schemas";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

export function FormSendUser() {
  const form = useForm<z.infer<typeof contactVehicleSchema>>({
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      phone: "",
      message: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof contactVehicleSchema>) => {
    await addDoc(collection(db, "contact"), {
      id: Date().toString(),
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      message: data.message,
    });

    form.reset();
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-4 p-4 bg-black max-w-sm md:max-w-[600px] rounded-xl md:mr-4 -mt-0 md:-mt-32"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div>
            <h2 className="text-2xl font-bold text-primary">
              Entre em contato com o Vendedor!
            </h2>
            <p className="text-white">Veja condições de financiamento.</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="name" className="text-white">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Nome Completo"
              className="bg-white"
              type="text"
              {...form.register("name")}
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="cpf" className="text-white">
              CPF
            </Label>
            <Input
              id="cpf"
              type="cpf"
              className="bg-white"
              placeholder="Adicionar neste formato 999.999.999-99"
              {...form.register("cpf")}
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="bg-white"
              placeholder="Adicionar neste formato 3xX9w@example.com"
              {...form.register("email")}
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="phone" className="text-white">
              Telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              className="bg-white"
              {...form.register("phone")}
              placeholder="Adicionar neste formato (11) 99999-9999"
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="phone" className="text-white">
              Mensagem
            </Label>
            <Textarea
              id="message"
              rows={4}
              className="bg-white"
              {...form.register("message")}
              placeholder="Escreva sua mensagem..."
            />
          </div>

          <Button type="submit" className="w-full mt-5">
            Enviar
          </Button>

          <Link
            className={buttonVariants({
              className: "w-full mt-4",
            })}
            type="submit"
            href="https://wa.me/5511940723891"
          >
            <MessageSquare className="mr-5" />
            Chamar no WhatsApp
          </Link>
        </form>
      </Form>
    </div>
  );
}
