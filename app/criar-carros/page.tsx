"use client";

import { useEffect, useState } from "react";
import { DrawerCar } from "@/components/DrawerCar";
import { db } from "@/firebase";
import { ICar } from "@/types";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CreateCars() {
  const [carData, setCarData] = useState<ICar[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];
      setCarData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const removeCar = (id: string) => {
    deleteDoc(doc(db, "cars", id))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <section className="w-full min-h-screen p-5">
      <div className="max-w-screen-xl mx-auto border-b border-gray/70 flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-black font-poppins">
          Carro: {carData.length}
        </h1>

        <DrawerCar open={open} setOpen={setOpen} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {carData.map((car: ICar) => (
          <Card key={car.id}>
            <div className="w-full h-[300px]">
              <Image
                src={car.images[0]}
                alt="car"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full p-4">
              <h1 className="text-2xl font-bold text-black font-poppins">
                {car.brandCar} {car.modelCar}
              </h1>
            </div>

            <div className="w-full p-4 flex items-center justify-between">
              <Button
                variant="destructive"
                onClick={() => {
                  removeCar(car.id);
                  console.log(car.id);
                }}
              >
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
