import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    link: "https://www.google.com/maps/place/Grupo+Edificar+Ve%C3%ADculos/@-23.6362676,-46.6547452,12z/...",
    image: "/kairos.jpg",
    address: "Av. Fábio Eduardo Ramos Esquivel, 797, Diadema SP",
    phone: "(11) 4055-3141",
  },
  {
    link: "Link_da_loja_2",
    image: "/CAPA.png",
    address:
      "Av. Eng. Armando de Arruda Pereira, 4067 Vila do Encontro São Paulo - SP",
    phone: "(11) 3456-3427",
  },
  {
    link: "https://www.google.com/maps/place/Grupo+Edificar+Ve%C3%ADculos+(Mau%C3%A1)/@-23.6664453,-46.5627457,12z/...",
    image: "/maua.jpg",
    address: "Av. Barão de Mauá, 1538 V. América Mauá.",
    phone: "(11) 4309-6906",
  },
  {
    link: "https://www.google.com/maps/place/Edificar+Ve%C3%ADculos/@-24.0045416,-46.4263707,17z/...",
    image: "/pg.jpg",
    address: "Av. Presidente Kennedy, 1486 Vila Guilhermina.",
    phone: "(13) 3474-3999",
  },
  {
    link: "https://www.google.com/maps/place/Grupo+Edificar+Ve%C3%ADculos/@-23.6880708,-46.550002,14.22z/...",
    image: "/sao-bernardo.jpg",
    address: "Av. Brigadeiro Faria Lima, 600 S.B.C SP",
    phone: "(11) 4103-7727",
  },
  {
    link: "https://www.google.com/maps/place/Rhema+Multimarcas/@-23.6670871,-46.6119698,15z/...",
    image: "/RHEMAR MULTIMARCAS.jpg",
    address: "Av. Água Funda, 210 - Taboão, São Bernardo do Campo.",
    phone: "(11) 94896-5558",
  },
  {
    link: "https://www.google.com/maps/place//@-23.6362942,-46.6547452,12z/...",
    image: "/diadema-1.jpg",
    address: "Av. Pres. Kenedy, 676 Centro, Diadema SP",
    phone: "(11) 4055-5476",
  },
  {
    link: "https://www.google.com.br/maps/place/Grupo+Edificar+Veiculos+-+Matriz+Digital/@-23.6816052,-46.6106113,14.17z/...",
    image: "/diadema2.jpg",
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
        {data.map((store, index) => (
          <Link key={index} href={store.link} target="_blank">
            <Card className="h-[500px] sm:h-auto lg:h-auto">
              <div>
                <Image
                  src={store.image}
                  alt={`Loja ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-[200px] object-cover rounded-tr-md rounded-tl-md"
                />
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
          </Link>
        ))}
      </div>
    </main>
  );
}
