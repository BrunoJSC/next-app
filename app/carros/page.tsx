"use client";

import { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { ICar } from "@/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/firebase";
import CarFilterForm from "./components/CarFilterForm";

export default function Cars() {
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
    <div>
      <main className="max-w-7xl mx-auto min-h-screen p-4 mb-72">
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="w-full md:w-[300px] h-auto md:h-[556px] bg-primary rounded-md p-4 mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-white mb-4">Filtros</h1>

            <CarFilterForm onFilterChange={setData} />
          </Card>

          <div className="w-full p-4 flex-1 flex flex-col space-y-7 md:space-y-0 md:flex-row flex-wrap gap-5">
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
                    accessories: car.accessories,
                  },
                }}
                key={car.id}
              >
                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                  <div className="w-full h-auto md:h-96 bg-white flex flex-col shadow-md rounded-lg">
                    <div className="w-full h-56">
                      <Image
                        src={car.images[0]}
                        width={200}
                        height={200}
                        alt={car.brandCar}
                        className="object-cover w-full h-56 rounded-tl-lg rounded-bl-lg"
                      />
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">
                        {car.brandCar}{" "}
                        <span className="text-black">{car.modelCar}</span>
                      </h1>

                      <p className="font-black mb-2">
                        Ano: {car.yearFabrication}
                      </p>
                      <p className="font-black mb-2">KM: {car.km}</p>
                      <p className="font-black mb-2">
                        Tipo de combustível: {car.fuel}
                      </p>
                      <p className="font-black mb-2">
                        Localização: {car.location}
                      </p>

                      <p className="font-bold text-lg md:text-2xl text-primary mt-2">
                        Valor: {car.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
