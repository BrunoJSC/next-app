"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { ICar } from "@/types";

export function CarouselCar({ data }: { data: ICar[] }) {
  return (
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
                    price: car.price,
                    accessories: car.accessories,
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
  );
}
