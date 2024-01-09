import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { finances } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Finance() {
  return (
    <main className="w-full min-h-screen max-w-screen-xl mx-auto  mb-48">
      <section className="w-full min-h-screen">
        <div className="w-full mx-auto relative">
          <div className="max-w-[977px]">
            <h1 className="text-3xl text-black font-bold mt-10 text-left">
              Financiamento
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between flex-wrap mt-10">
            {finances.map((finance) => (
              <Card key={finance.title} className="w-full md:w-[542px] p-4">
                <CardHeader>
                  <CardTitle>{finance.title}</CardTitle>
                  <CardDescription>{finance.paragraph}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Button className="w-full md:w-[342px] h-[50px] mt-10 mb-10">
            Solicitar Financiamento
          </Button>

          <div className="w-full md:w-[342px] mt-10 p-4">
            <h2 className="text-2xl font-bold">Dúvidas?</h2>
            <p className="text-[#848484] text-base mt-4">
              Chame no WhatsApp através do botão abaixo para ser atendido por um
              de nossos especialistas!
            </p>

            <Button
              variant="secondary"
              className="w-full h-[50px] mt-4 font-bold text-primary hover:bg-secondary-foreground hover:text-white duration-300 transition-all"
              asChild
            >
              <Link href="/contato">WhatsApp</Link>
            </Button>
          </div>

          <div className="w-full md:w-[491px] h-[291px] absolute bottom-0 right-0 md:-mr-0 hidden md:block">
            <Image src="/bg.svg" alt="bg" fill className="w-full h-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
