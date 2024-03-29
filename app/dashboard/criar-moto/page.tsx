"use client";

import { useContext, useEffect, useState } from "react";

import { IMotorbike } from "@/types";
import { db } from "@/firebase";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { DrawerBikes } from "@/components/DrawerBike";
import { AuthContext } from "@/context/auth";
import { redirect } from "next/navigation";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IMotorbike[]>([]);
  const { user } = useContext(AuthContext);

  function deleteMotorbike(id: string) {
    deleteDoc(doc(db, "motorbikes", id))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

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

  if (!user) {
    return redirect("/");
  }

  return (
    <section className="w-full min-h-screen p-5">
      <div className="max-w-screen-xl mx-auto border-b border-gray/70 flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-black font-poppins">
          Motos: {data.length}
        </h1>

        <DrawerBikes open={open} setOpen={setOpen} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {data.map((motorbike: IMotorbike) => (
          <Card key={motorbike.id}>
            <div className="w-full h-[300px]">
              <Image
                src={motorbike.images[0]}
                alt="car"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full p-4">
              <h1 className="text-2xl font-bold text-black font-poppins">
                {motorbike.motorbikeBrand}{" "}
                <span className="text-primary">{motorbike.motorbikeModel}</span>
              </h1>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
