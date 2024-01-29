"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
  CardDescription,
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
import { ICar } from "@/types";
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
    id: string;
    brandCar: string;
    modelCar: string;
    images: string[];
    location: string;
    yearFabrication: string;
    fuel: string;
    km: string;
    exchange: string;
    color: string;
    description: string;
    accessories: string[];
    price: string;
    bodyType: string;
    motors: string;
    condition: string;
    announce: string;
    doors: string;
    plate: string;
  };
}) {
  const form = useForm<z.infer<typeof contactVehicleSchema>>({
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      phone: "",
    },
  });

  const [data, setData] = useState<ICar[]>([]);

  const handleSubmit = async (data: z.infer<typeof contactVehicleSchema>) => {
    await addDoc(collection(db, "contact"), {
      id: Date().toString(),
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
    });

    form.reset();
    console.log(data);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];
      setData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="w-full min-h-screen p-2 mb-48">
      <div className="p-4 md:p-8 lg:p-12 max-w-screen-xl mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-screen-lg mx-auto mt-2"
        >
          <CarouselContent>
            {searchParams.images.map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:w-[400px] md:mr-4" // Adjusted for responsiveness
              >
                <div className="w-full h-[400px]">
                  <Image
                    src={searchParams.images[index]}
                    alt="car"
                    width={400}
                    height={400}
                    className="w-full h-full rounded-xl"
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
            {searchParams.brandCar}{" "}
            <span className="text-black">{searchParams.modelCar}</span>
            <p className="text-primary">
              R$ <span className="text-black">{searchParams.price}</span>
            </p>
          </CardTitle>
        </CardHeader>

        <div className="max-w-sm md:ml-4">
          <CardTitle className="text-2xl font-bold text-primary">
            Sobre o carro
          </CardTitle>
          <div>
            <CardDescription>{searchParams.description}</CardDescription>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between mt-4">
          <div className="md:w-[450px] grid grid-cols-2 gap-4 p-4">
            <div>
              <p className="font-bold">Cidade</p>
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
              <p className="font-bold">Cambio</p>
              <p className="text-primary">{searchParams.exchange}</p>
            </div>

            <div>
              <p className="font-bold">Cor</p>
              <p className="text-primary">{searchParams.color}</p>
            </div>

            <div>
              <p className="font-bold">Pôtencia do motor</p>
              <p className="text-primary">{searchParams.motors}</p>
            </div>

            <div>
              <p className="font-bold">Condição</p>
              <p className="text-primary">{searchParams.condition}</p>
            </div>

            <div>
              <p className="font-bold">Tipo de anunciante</p>
              <p className="text-primary">{searchParams.announce}</p>
            </div>

            <div>
              <p className="font-bold">Placa</p>
              <p className="text-primary">{searchParams.plate}</p>
            </div>

            <div>
              <p className="font-bold">Carroceria</p>
              <p className="text-primary">{searchParams.bodyType}</p>
            </div>

            <div>
              <p className="font-bold">Portas</p>
              <p className="text-primary">{searchParams.doors}</p>
            </div>

            <div className="col-span-2">
              <p className="font-bold">Acessórios</p>
              <div className="flex flex-wrap">
                {searchParams.accessories.map((accessory, index) => (
                  <div key={index} className="mr-2 mb-2">
                    <p className="text-primary">
                      {accessory}
                      {","}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
        </div>
      </Card>

      <div className="p-12 max-w-screen-xl mx-auto mt-44">
        <Carousel className="w-full max-w-screen-xl">
          <CarouselContent className="flex gap-5">
            {data.map((car) => (
              <>
                <Link
                  href={{
                    pathname: `/carros/${car.id}`,
                    query: {
                      brandCar: car.brandCar,
                      modelCar: car.modelCar,
                      images: car.images,
                      location: car.location,
                      yearFabrication: car.yearFabrication,
                      fuel: car.fuel,
                      km: car.km,
                      exchange: car.exchange,
                      color: car.color,
                      description: car.description,
                    },
                  }}
                >
                  <div className="">
                    <div className="w-[300px] md:w-[500px] h-[300px] md:h-[400px]">
                      <Image
                        src={car.images[0]}
                        alt="car"
                        width={400}
                        height={400}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    <h2 className="text-black text-2xl font-bold mt-2">
                      {car.brandCar} - {car.modelCar}
                    </h2>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="text-black font-black">{car.location}</p>
                      <p className="text-black font-black text-2xl">
                        Preço: <span className="text-primary">{car.price}</span>
                      </p>
                      <p className="text-black font-black">{car.km}KM</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block" />
          <CarouselNext className="hidden md:block" />
        </Carousel>
      </div>
    </section>
  );
}
