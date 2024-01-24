"use client";

import { DrawerCar } from "@/components/DrawerCar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthContext } from "@/context/auth";
import { db } from "@/firebase";
import { ICar } from "@/types";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const [carData, setCarData] = useState<ICar[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const carData = {
          id: doc.id,
          ...doc.data(),
        };
        console.log("Car data:", carData);
        return carData;
      }) as ICar[];
      setCarData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ... (código anterior)

  const deleteCar = async (id: string) => {
    try {
      console.log(`Trying to delete car with ID: ${id}`);

      console.log(`${id} ID 1`);
      await deleteDoc(doc(db, "cars", id));
      console.log(`Car with ID ${id} deleted successfully!`);
    } catch (error) {
      console.error(`Error deleting car with ID ${id}:`, error);
    }
  };

  if (!user) {
    return redirect("/");
  }

  return (
    <section className="w-full min-h-screen p-5">
      <div className="max-w-screen-xl mx-auto border-b border-gray/70 flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-black font-poppins">
          Carro: {carData.length}
        </h1>

        <DrawerCar open={open} setOpen={setOpen} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
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
                {car.brandCar}{" "}
                <span className="text-primary">{car.modelCar}</span>
              </h1>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
