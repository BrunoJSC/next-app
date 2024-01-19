"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthContext } from "@/context/auth";
import { db } from "@/firebase";
import { IContact } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ListContact() {
  const [data, setData] = useState<IContact[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "contact"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IContact[];
      setData(data);
    });

    return () => {
      unsubscribe();
    };
  }, [data]);

  if (!user) {
    return redirect("/");
  }

  return (
    <section className="w-full min-h-screen p-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {data?.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.email}</CardDescription>
            </CardHeader>
            <CardContent>{item.message}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
