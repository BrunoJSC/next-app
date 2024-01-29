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
    link: "https://www.google.com/maps/place/Av.+F%C3%A1bio+Eduardo+Ramos+Esquivel,+797+-+Centro,+Diadema+-+SP,+09920-579/@-23.6852763,-46.6186409,19.25z/data=!4m6!3m5!1s0x94ce44ee1c9dae85:0xbefb53d68dbc90d5!8m2!3d-23.6852018!4d-46.6181462!16s%2Fg%2F11c12y71b7?entry=ttu",
    image: "/kairos.jpg",
    address: "Av. Fábio Eduardo Ramos Esquivel, 797, Diadema SP",
    name: "Kairos",
    phone: "(11) 4055-3141",
  },
  {
    link: "https://www.google.com/maps/place/Av.+Eng.+Armando+de+Arruda+Pereira,+4067+-+Vila+do+Encontro,+S%C3%A3o+Paulo+-+SP,+04325-000/@-23.6591049,-46.6372996,15.75z/data=!4m6!3m5!1s0x94ce5ad381c7598b:0xcd75ed0d85dd9ac2!8m2!3d-23.6609712!4d-46.6369421!16s%2Fg%2F11csg51dl4?entry=ttu",
    image: "/CAPA.png",
    name: "GPMotors",
    address:
      "Av. Eng. Armando de Arruda Pereira, 4067 Vila do Encontro São Paulo - SP",
    phone: "(11) 3456-3427",
  },
  {
    link: "https://www.google.com/maps/place/Av.+Bar%C3%A3o+de+Mau%C3%A1,+1538+-+Vila+America,+Mau%C3%A1+-+SP,+09320-130/@-23.6651989,-46.4504914,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce6950144dd189:0x72536bfff579e594!8m2!3d-23.6652038!4d-46.4479111!16s%2Fg%2F11ckqmn9x2?entry=ttu",
    image: "/maua.jpg",
    address: "Av. Barão de Mauá, 1538 V. América Mauá.",
    name: "Mauá",
    phone: "(11) 4309-6906",
  },
  {
    link: "https://www.google.com/maps/place/Av.+Pres.+Kennedy,+1486+-+Guilhermina,+Praia+Grande+-+SP,+11717-260/@-24.0052103,-46.4269271,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce1c347cc38d1d:0xc999aebeff9cd8b8!8m2!3d-24.0052152!4d-46.4243468!16s%2Fg%2F11hbny6c7x?entry=ttu",
    image: "/praia.jpg",
    name: "Edificar",
    address: "Av. Presidente Kennedy, 1486 Vila Guilhermina.",
    phone: "(13) 3474-3999",
  },
  {
    link: "https://www.google.com/maps/place/Av.+Brg.+Faria+Lima,+600+-+Centro,+S%C3%A3o+Bernardo+do+Campo+-+SP,+09720-000/@-23.7036331,-46.5551176,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce422cf827c9cb:0xf454a451dc98aa18!8m2!3d-23.703638!4d-46.5525373!16s%2Fg%2F11c2248m1q?entry=ttu",
    image: "/sao-bernardo.jpg",
    address: "Av. Brigadeiro Faria Lima, 600 S.B.C SP",
    phone: "(11) 4103-7727",
  },
  {
    link: "https://www.google.com/maps/place/Av.+%C3%81gua+Funda,+210+-+Tabo%C3%A3o,+S%C3%A3o+Bernardo+do+Campo+-+SP,+09930-360/@-23.6670822,-46.6145501,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce44b88f76b375:0xa97cf30fb957b355!8m2!3d-23.6670871!4d-46.6119698!16s%2Fg%2F11df7nz2kp?entry=ttu",
    image: "/RHEMAR MULTIMARCAS.jpg",
    address: "Av. Água Funda, 210 - Taboão, São Bernardo do Campo.",
    phone: "(11) 94896-5558",
  },
  {
    link: "https://www.google.com/maps/place/Av.+Pres.+Kennedy,+676+-+Centro,+Diadema+-+SP,+99130-000/@-23.6842012,-46.6347842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce451e2168881d:0x2f796e04eb7bff13!8m2!3d-23.6842061!4d-46.6322039!16s%2Fg%2F11mqk4tm0z?entry=ttu",
    image: "/diadema-1.jpg",
    address: "Av. Pres. Kenedy, 676 Centro, Diadema SP",
    phone: "(11) 4055-5476",
  },
  {
    link: "https://www.google.com/maps/place/Av.+Pres.+Kennedy,+175+-+Centro,+Diadema+-+SP,+09913-000/@-23.6851991,-46.6303177,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce44e3f2a6e167:0x40313518d4f8cadd!8m2!3d-23.685204!4d-46.6277374!16s%2Fg%2F11c1cvk1ns?entry=ttu",
    image: "/diadema-2.jpg",
    address: "Av. Presidente Kennedy 175 - Diadema SP.",
    phone: "(11)4055-2424",
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
          <Card key={index} className="md:h-[500px] h-auto lg:h-auto">
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
              <CardDescription className="text-gray-700">
                Fone: {store.phone}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
