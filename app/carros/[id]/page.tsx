"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
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
import { db } from "@/firebase";
import { ICar } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
  };
}) {
  const form = useForm();
  console.log(searchParams);

  const [data, setData] = useState<ICar[]>([]);

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
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Card className="w-full max-w-screen-lg mx-auto mt-2 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {searchParams.brandCar}{" "}
            <span className="text-black">{searchParams.modelCar}</span>
          </CardTitle>
        </CardHeader>

        <div className="w-full flex justify-between">
          <div className="w-[450px] grid grid-cols-2 gap-10 p-4">
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

            <div>{searchParams.accessories}</div>
          </div>

          <Form {...form}>
            <form className="grid grid-cols-1 gap-4 p-4 bg-black max-w-sm h-[500px] rounded-xl">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Entre em contato com o Vendedor!
                </h2>
                <p className="text-white">Coloque seus dados*</p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="name" className="text-white">
                  Nome
                </Label>
                <Input id="name" className="bg-white" />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input id="email" type="email" className="bg-white" />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="phone" className="text-white">
                  Telefone
                </Label>
                <Input id="phone" type="tel" className="bg-white" />
              </div>

              <Button type="submit" className="w-full mt-5">
                Enviar
              </Button>
            </form>
          </Form>
        </div>

        <CardContent className="max-w-xl">
          <CardTitle className="text-2xl font-bold text-primary">
            Sobre o carro
          </CardTitle>
          <p className="text-black">{searchParams.description}</p>
        </CardContent>
      </Card>

      <div className="p-12 max-w-screen-xl mx-auto mt-44">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-screen-lg mx-auto mt-2"
        >
          <CarouselContent>
            {data.map((car) => (
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
                key={car.id}
              >
                <CarouselItem
                  key={car.id}
                  className="md:basis-1/2 lg:w-[400px]"
                >
                  <div className="w-full h-[300px]">
                    <Image
                      src={car.images[0]}
                      alt="car"
                      width={400}
                      height={400}
                      className="w-full h-full rounded-xl"
                    />
                  </div>

                  <h2 className="text-black text-2xl font-bold text-primary">
                    {car.brandCar}{" "}
                    <span className="text-black">{car.modelCar}</span>
                  </h2>

                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-black font-black">{car.location}</p>
                    <p className="text-black font-black">
                      {car.yearFabrication}
                    </p>
                    <p className="text-black font-black">{car.km}KM</p>
                    <p className="text-black font-black">{car.fuel}</p>
                  </div>
                </CarouselItem>
              </Link>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
