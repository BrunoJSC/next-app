"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { onSnapshot, collection } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/firebase";
import { IMotorbike } from "@/types";
import FilterMotorbike from "./components/FilterMotorbike";

export default function Page() {
  const [data, setData] = useState<IMotorbike[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
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
          className={`w-full md:w-[300px] h-auto md:h-[1056px] bg-primary rounded-md p-4 mb-4 md:mb-0 ${
            isFilterVisible ? "block" : "hidden md:block"
          }`}
        >
          <h1 className="text-3xl font-bold text-white mb-4">Filtros</h1>

          <FilterMotorbike onFilterChange={setData} />
        </Card>

        <div className="w-full p-4 flex-1 flex flex-col space-y-7">
          {data.map((motorbike) => (
            <Link
              href={{
                pathname: `/motos/${motorbike.id}`,
                query: {
                  motorbikeBrand: motorbike.motorbikeBrand,
                  motorbikeModel: motorbike.motorbikeModel,
                  location: motorbike.location,
                  yearFabrication: motorbike.yearFabrication,
                  km: motorbike.km,
                  fuel: motorbike.fuel,
                  cylinder: motorbike.cylinder,
                  color: motorbike.color,
                  description: motorbike.description,
                  accessories: motorbike.accessories,
                  images: motorbike.images,
                  announce: motorbike.announce,
                  price: motorbike.price,
                  plate: motorbike.plate,
                  condition: motorbike.condition,
                },
              }}
              key={motorbike.id}
            >
              <div className="w-ful md:h-64 h-auto bg-white flex shadow-md rounded-lg flex-col md:flex-row">
                <div className="md:w-[370px] h-full w-full">
                  <Image
                    src={motorbike.images[0]}
                    width={400}
                    height={400}
                    alt={motorbike.motorbikeBrand}
                    className="object-cover w-full h-full rounded-tl-lg rounded-bl-lg"
                  />
                </div>

                <div className="p-4 flex flex-col">
                  <h1 className="text-2xl font-bold text-primary mb-4">
                    {motorbike.motorbikeBrand}{" "}
                    <span className="text-black">
                      {motorbike.motorbikeModel}{" "}
                    </span>
                  </h1>

                  <p className="font-black">Ano: {motorbike.yearFabrication}</p>
                  <p className="font-black">KM: {motorbike.km}</p>
                  <p className="font-black">
                    Tipo de combustível: {motorbike.fuel}
                  </p>
                  <p className="font-black">
                    Localização: {motorbike.location}
                  </p>
                  <p className="font-bold text-2xl mt-2 text-primary">
                    Valor: {motorbike.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
