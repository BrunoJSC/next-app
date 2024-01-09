"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { IMotorbike } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
    images: string[];
  };
}) {
  const form = useForm();
  const [data, setData] = useState<IMotorbike[]>([]);

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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Card className="w-full max-w-screen-lg mx-auto mt-2 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {searchParams.motorbikeBrand}{" "}
            <span className="text-black">{searchParams.motorbikeModel}</span>
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
              <p className="text-primary">{searchParams.cylinder}</p>
            </div>

            <div>
              <p className="font-bold">Cor</p>
              <p className="text-primary">{searchParams.color}</p>
            </div>
          </div>

          <Form {...form}>
            <form className="grid grid-cols-1 gap-4 p-4 bg-black max-w-sm rounded-xl">
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Entre em contato com o Vendedor!
                </h2>
                <p>Coloque seus dados*</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Label htmlFor="name" className="text-white">
                  Nome
                </Label>
                <Input id="name" className="bg-white" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input id="email" type="email" className="bg-white" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Label htmlFor="phone" className="text-white">
                  Telefone
                </Label>
                <Input id="phone" type="tel" className="bg-white" />
              </div>

              <Button type="submit" className="w-full">
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
              >
                <CarouselItem
                  key={motorbike.id}
                  className="md:basis-1/2 lg:w-[400px]"
                >
                  <div className="w-full h-[300px]">
                    <Image
                      src={motorbike.images[0]}
                      alt="car"
                      width={400}
                      height={400}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>

                  <h2 className="text-black text-2xl font-bold">
                    {motorbike.motorbikeBrand} - {motorbike.motorbikeModel}{" "}
                  </h2>

                  <div className="grid grid-cols-2 gap-2">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
