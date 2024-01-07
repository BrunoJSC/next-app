import { Card } from "@/components/Card";
import { Footer } from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import { announce } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Announce() {
  return (
    <main className="w-full min-h-screen p-2 relative">
      <div className="w-full max-w-screen-xl mx-auto mb-48">
        <div className="max-w-[937px]  mt-12 p-4 ">
          <h1 className="text-[38px] text-black font-bold text-left mt-10">
            O que é AutoNegocie?
          </h1>
          <p className="text-[16px] text-[#848484] mt-4">
            O AutoNegocie é uma plataforma especializada em negociação de
            veículos, fornecendo uma gama de ferramentas de comunicação e
            recursos de negócios que agilizam o processo de venda do seu carro.
          </p>
        </div>

        <div className="w-full md:w-[977px] md:h-[1307px] bg-gradient-to-t from-green-200 to-white  flex flex-col gap-10 p-4 relative mx-auto md:mx-0 h-auto">
          {announce.map((announce) => (
            <Card
              key={announce.title}
              title={announce.title}
              paragraph={announce.paragraph}
            />
          ))}

          <div className="w-full md:w-[591px] h-[591px] absolute bottom-0 md:-right-64 right-0 hidden md:block">
            <Image src="/carSVG.svg" alt="car" fill className="w-full h-full" />
          </div>
        </div>
        <Button className=" mt-10 md:w-[472px] w-full mx-auto" asChild>
          <Link href="/formularios">Anuncie Agora</Link>
        </Button>
      </div>
    </main>
  );
}
