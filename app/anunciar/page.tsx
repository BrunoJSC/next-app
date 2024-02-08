import { Footer } from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { announce } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Announce() {
  return (
    <main className="w-full min-h-screen p-2 relative">
      <div className="w-full max-w-screen-xl mx-auto mb-48">
        <div className="mt-12 p-4 text-center">
          <h1 className="text-[38px] text-black font-bold text mt-10 text-center">
            O que é AutoNegocie?
          </h1>
          <p className="text-[16px] text-[#848484] mt-4 text-center">
            O AutoNegocie é uma plataforma especializada em negociação de
            veículos, fornecendo uma gama de ferramentas de comunicação e
            recursos de negócios que agilizam o processo de venda do seu carro.
          </p>
        </div>

        <ul className="flex flex-col mx-auto items-center justify-center md:w-[900px] w-full gap-5">
          {announce.map((an) => (
            <li key={an.title} className="flex gap-5 ">
              <p>{an.icon}</p>
              <div>
                <h2 className="text-lg font-bold">{an.title}</h2>

                <p>{an.paragraph}</p>
              </div>
            </li>
          ))}
          <Button className="mt-10 md:w-full h-[50px] w-full mx-auto" asChild>
            <Link href="/formularios">Anuncie Agora</Link>
          </Button>
        </ul>
      </div>
    </main>
  );
}
