"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase";
import { IMotorbike } from "@/types";
import { contactVehicleSchema } from "@/validation/schemas";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page({
  searchParams,
}: {
  searchParams: {
    motorbikeBrand: string;
    motorbikeModel: string;
    location: string;
    yearFabrication: string;
    km: string;
    fuel: string;
    cylinder: string;
    color: string;
    description: string;
    accessories: string[];
    images: string[];
    announce: string;
    price: string;
    plate: string;
  };
}) {
  const form = useForm<z.infer<typeof contactVehicleSchema>>({
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      phone: "",
      message: "",
    },
  });
  const [data, setData] = useState<IMotorbike[]>([]);

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

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "motorbikes"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IMotorbike[];
      setData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="w-full min-h-screen p-2 mb-48">
      <div className="p-12 max-w-screen-xl mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-screen-lg mx-auto mt-2"
        >
          <CarouselContent>
            {searchParams.images.map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:w-[400px]">
                <div className="w-full h-[400px]">
                  <Image
                    src={searchParams.images[index]}
                    alt="car"
                    width={400}
                    height={400}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block" />
          <CarouselNext className="hidden md:block" />
        </Carousel>
      </div>

      <Card className="w-full max-w-screen-lg mx-auto mt-2 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {searchParams.motorbikeBrand}{" "}
            <span className="text-black">{searchParams.motorbikeModel}</span>
            <p className="text-primary">
              R$ <span className="text-black">{searchParams.price}</span>
            </p>
          </CardTitle>
        </CardHeader>

        <div className="max-w-sm md:ml-4">
          <CardTitle className="text-2xl font-bold text-primary">
            Sobre a moto
          </CardTitle>
          <div>
            <CardDescription>{searchParams.description}</CardDescription>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between mt-4">
          <div className="md:w-[450px] grid grid-cols-2 gap-4 p-4">
            <div>
              <p className="font-bold">Localização</p>
              <p className="text-primary">{searchParams.location}</p>
            </div>

            <div>
              <p className="font-bold">Ano</p>
              <p className="text-primary">{searchParams.yearFabrication}</p>
            </div>

            <div>
              <p className="font-bold">Combustível</p>
              <p className="text-primary">{searchParams.fuel}</p>
            </div>

            <div>
              <p className="font-bold">KM</p>
              <p className="text-primary">{searchParams.km}</p>
            </div>

            <div>
              <p className="font-bold">Cilindradas</p>
              <p className="text-primary">{searchParams.cylinder}</p>
            </div>

            <div>
              <p className="font-bold">Cor</p>
              <p className="text-primary">{searchParams.color}</p>
            </div>

            <div>
              <p className="font-bold">Tipo de anúnciante</p>
              <p className="text-primary">{searchParams.announce}</p>
            </div>

            <div>
              <p className="font-bold">Placa</p>
              <p className="text-primary">{searchParams.plate}</p>
            </div>

            <div className="col-span-2">
              <p className="font-bold">Acessórios</p>
              <div className="flex flex-wrap">
                {Array.isArray(searchParams.accessories) ? (
                  searchParams.accessories.map((accessory, index) => (
                    <p key={index} className="text-primary">
                      {accessory.split(", ").map((item, i) => (
                        <span key={i}>
                          {item}
                          {i !== accessory.split(", ").length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  ))
                ) : (
                  <p className="text-primary">{searchParams.accessories}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Form {...form}>
              <form
                className="grid grid-cols-1 gap-4 p-4 bg-black max-w-sm md:max-w-[600px] rounded-xl md:mr-4"
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
                    className="bg-white"
                    type="text"
                    placeholder="Nome Completo"
                    {...form.register("name")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="cpf" className="text-white">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    className="bg-white"
                    type="text"
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
                    placeholder="Adicionar neste formato 3xX9w@example.com"
                    type="email"
                    className="bg-white"
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
                    placeholder="Escreva sua mensagem..."
                    className="bg-white resize-none"
                    {...form.register("message")}
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
        </div>
      </Card>

      <div className="p-12 max-w-screen-xl mx-auto mt-44">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mx-auto mt-2"
        >
          <CarouselContent className="flex flex-wrap">
            {data.map((motorbike) => (
              <Link
                href={{
                  pathname: `/motos/${motorbike.id}`,
                  query: {
                    motorbikeBrand: motorbike.motorbikeBrand,
                    motorbikeModel: motorbike.motorbikeModel,
                    yearFabrication: motorbike.yearFabrication,
                    location: motorbike.location,
                    km: motorbike.km,
                    fuel: motorbike.fuel,
                    cylinder: motorbike.cylinder,
                    color: motorbike.color,
                    description: motorbike.description,
                    images: motorbike.images,
                  },
                }}
                key={motorbike.id}
                className="w-full md:w-1/6 lg:w-1/3 xl:w-1/4 px-2 mb-4"
              >
                <CarouselItem className="w-full">
                  <div className="w-full h-[300px] md:h-[400px]">
                    <Image
                      src={motorbike.images[0]}
                      alt="car"
                      width={400}
                      height={400}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>

                  <h2 className="text-black text-2xl font-bold mt-2">
                    {motorbike.motorbikeBrand} - {motorbike.motorbikeModel}
                  </h2>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="text-black font-black">
                      {motorbike.location}
                    </p>
                    <p className="text-black font-black">
                      {motorbike.yearFabrication}
                    </p>
                    <p className="text-black font-black">{motorbike.km}KM</p>
                    <p className="text-black font-black">{motorbike.fuel}</p>
                  </div>
                </CarouselItem>
              </Link>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block" />
          <CarouselNext className="hidden md:block" />
        </Carousel>
      </div>
    </section>
  );
}
