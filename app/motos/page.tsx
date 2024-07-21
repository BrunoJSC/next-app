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
    <main className="max-w-7xl mx-auto min-h-screen p-4 mb-72">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-[300px] h-[300px] md:h-[1250px] bg-primary rounded-md p-4 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-white mb-4">Filtros</h1>
          {/* <Filters db={db} collectionCar="motorbikes" /> */}
          <FilterMotorbike onFilterChange={setData} closeFilter={() => {}} />
        </Card>

        <div className="w-full p-4 flex-1 flex flex-col space-y-7">
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
              <div className="w-ful h-56 bg-white rounded-md flex shadow-md">
                <div className="w-[350px] h-full">
                  <Image
                    src={motorbike.images[0]}
                    width={200}
                    height={200}
                    alt={motorbike.motorbikeBrand}
                    className="object-cover w-full h-56 rounded-tl-lg rounded-bl-lg"
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
