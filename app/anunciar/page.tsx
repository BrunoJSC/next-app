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
        <div className="mt-12 p-4 ">
          <h1 className="text-[38px] text-black font-bold text mt-10 text-center">
            O que é AutoNegocie?
          </h1>
          <p className="text-[16px] text-[#848484] mt-4 text-center">
            O AutoNegocie é uma plataforma especializada em negociação de
            veículos, fornecendo uma gama de ferramentas de comunicação e
            recursos de negócios que agilizam o processo de venda do seu carro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announce.map((announce) => (
            <Card key={announce.title} className="p-4">
              <CardHeader>
                <CardTitle>{announce.title}</CardTitle>
              </CardHeader>

              <CardDescription>
                <p>{announce.paragraph}</p>
              </CardDescription>
            </Card>
          ))}
        </div>
        <Button className="mt-10 md:w-[472px] w-full mx-auto" asChild>
          <Link href="/formularios">Anuncie Agora</Link>
        </Button>
      </div>
    </main>
  );
}
