"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/firebase";
import { ICar } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const dataStore = [
  {
    link: "https://www.google.com/maps/place/Av.+Eng.+Armando+de+Arruda+Pereira,+4067+-+Vila+do+Encontro,+S%C3%A3o+Paulo+-+SP,+04325-000/@-23.6591049,-46.6372996,15.75z/data=!4m6!3m5!1s0x94ce5ad381c7598b:0xcd75ed0d85dd9ac2!8m2!3d-23.6609712!4d-46.6369421!16s%2Fg%2F11csg51dl4?entry=ttu",
    image: "/CAPA.png",
    name: "GPMotors",
    address:
      "Av. Eng. Armando de Arruda Pereira, 4067 Vila do Encontro São Paulo - SP",
    phone: "(11) 3456-3427",
  },

  {
    link: "https://www.google.com/maps/place/Av.+%C3%81gua+Funda,+210+-+Tabo%C3%A3o,+S%C3%A3o+Bernardo+do+Campo+-+SP,+09930-360/@-23.6670822,-46.6145501,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce44b88f76b375:0xa97cf30fb957b355!8m2!3d-23.6670871!4d-46.6119698!16s%2Fg%2F11df7nz2kp?entry=ttu",
    image: "/RHEMAR MULTIMARCAS.jpg",
    address: "Av. Água Funda, 210 - Taboão, São Bernardo do Campo.",
    phone: "(11) 94896-5558",
  },
  {
    link: "https://www.google.com/maps/dir//Av.+Pres.+Kenedy,+377+-+Centro,+Diadema+-+SP,+09913-000/@-23.685031,-46.6317457,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x94ce44e22cbbb5c3:0x4d3c924a0e6f000a!2m2!1d-46.629557!2d-23.685031!3e0",
    image: "/mavicar.jpeg",
    address: "Av. Pres. Kenedy, 377 - Centro, Diadema - SP, 09913-000",
    phone: "(11) 4051-5185",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Lojas
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-screen font-sans px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {dataStore.map((store, index) => (
          <Card key={index} className="md:h-[340px]">
            <div>
              <Link key={index} href={store.link} target="_blank">
                <Image
                  src={store.image}
                  alt={`Loja ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-[200px] object-cover rounded-tr-md rounded-tl-md"
                />
              </Link>
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                {store.address}
              </CardTitle>
              <CardTitle className="text-gray-700">
                Fone: {store.phone}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
