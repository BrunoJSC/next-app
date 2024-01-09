"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/firebase";
import { IContact } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ListContact() {
  const [data, setData] = useState<IContact[]>([]);

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
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
  );
}
