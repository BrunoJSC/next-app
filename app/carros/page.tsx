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
  const [isFilterVisible, setIsFilterVisible] = useState(false);
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

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto min-h-screen p-4 mb-72">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:hidden">
            <button
              className="bg-primary text-white px-4 py-2 rounded-md w-full"
              onClick={toggleFilterVisibility}
            >
              {isFilterVisible ? "Fechar Filtros" : "Abrir Filtros"}
            </button>
          </div>

          <Card
            className={`w-full md:w-[300px] h-auto md:h-[1196px] bg-primary rounded-md p-4 mb-4 md:mb-0 ${
              isFilterVisible ? "block" : "hidden md:block"
            }`}
          >
            <h1 className="text-3xl font-bold text-white mb-4">Filtros</h1>

            <CarFilterForm onFilterChange={setData} />
          </Card>

          <div className="w-full p-4 flex-1 flex flex-col space-y-7">
            {data.map((car) => (
              <Link
                href={{
                  pathname: `/carros/${car.id}`,
                  query: {
                    id: car.id,
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
                    price: car.price,
                    bodyType: car.bodyType,
                    motors: car.motors,
                    condition: car.condition,
                    announce: car.announce,
                    doors: car.doors,
                    plate: car.plate,
                  },
                }}
                key={car.id}
              >
                <div className="w-ful md:h-56 h-auto bg-white flex shadow-md rounded-lg flex-col md:flex-row">
                  <div className="md:w-[350px] h-full w-full">
                    <Image
                      src={car.images[0]}
                      width={200}
                      height={200}
                      alt={car.brandCar}
                      className="object-cover w-full h-full rounded-tl-lg rounded-bl-lg"
                    />
                  </div>

                  <div className="p-4 flex flex-col">
                    <h1 className="text-2xl font-bold text-primary mb-4">
                      {car.brandCar}{" "}
                      <span className="text-black">{car.modelCar}</span>
                    </h1>

                    <p className="font-black">Ano: {car.yearFabrication}</p>
                    <p className="font-black">KM: {car.km}</p>
                    <p className="font-black">
                      Tipo de combustível: {car.fuel}
                    </p>
                    <p className="font-black">Localização: {car.location}</p>
                    <p className="font-bold text-2xl mt-2 text-primary">
                      Valor: {car.price}
                    </p>
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
