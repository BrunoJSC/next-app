import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col  min-h-screen font-sans px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Lojas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <Link
          href="https://www.google.com/maps/place/Grupo+Edificar+Ve%C3%ADculos/@-23.6362676,-46.6547452,12z/data=!4m19!1m13!4m12!1m4!2m2!1d-46.5436672!2d-23.6191744!4e1!1m6!1m2!1s0x94ce44ee1ce9f3c3:0xe278ea2e859fa44!2sGrupo+Edificar+Ve%C3%ADculos+-+Av.+F%C3%A1bio+Eduardo+Ramos+Esquivel,+797+-+Centro,+Diadema+-+SP,+09920-575!2m2!1d-46.6181456!2d-23.6852398!3m4!1s0x94ce44ee1ce9f3c3:0xe278ea2e859fa44!8m2!3d-23.6852398!4d-46.6181456"
          target="_blank"
        >
          <Card className="h-[400px]">
            <div>
              <Image
                src="/kairos.jpg"
                alt="Loja 1"
                width={300}
                height={300}
                className="w-full h-auto rounded-tr-md rounded-tl-md"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Av. Fábio Eduardo Ramos Esquivel, 797, Diadema SP
              </CardTitle>
              <CardDescription className="text-gray-700">
                Fone: (11) 4055-3141
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Card className="h-[400px]">
          <div>
            <Image
              src="/CAPA.png"
              alt="Loja 1"
              width={300}
              height={300}
              className="w-full h-auto rounded-tr-md rounded-tl-md"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Av. Eng. Armando de Arruda Pereira, 4067 Vila do Encontro São
              Paulo - SP
            </CardTitle>
            <CardDescription className="text-gray-700">
              Fone: (11) 3456-3427
            </CardDescription>
          </CardHeader>
        </Card>

        <Link
          href="https://www.google.com/maps/place/Grupo+Edificar+Ve%C3%ADculos+(Mau%C3%A1)/@-23.6664453,-46.5627457,12z/data=!4m20!1m13!4m12!1m4!2m2!1d-46.535662!2d-23.678234!4e1!1m6!1m2!1s0x94ce44fcb47a35f7:0x1ccd7f434f9624f2!2sGrupo+Edificar+Ve%C3%ADculos+-+Av.+Bar%C3%A3o+de+Mau%C3%A1,+1538+-+Vila+America,+Mau%C3%A1+-+SP,+09320-130!2m2!1d-46.4479309!2d-23.665142!3m5!1s0x94ce44fcb47a35f7:0x1ccd7f434f9624f2!8m2!3d-23.665142!4d-46.4479309!16s%2Fg%2F11fyxcvmbw?entry=ttu"
          target="_blank"
        >
          <Card className="h-[400px]">
            <div>
              <Image
                src="/maua.jpg"
                alt="Loja 1"
                width={300}
                height={300}
                className="w-full h-auto rounded-tr-md rounded-tl-md"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Av. Barão de Mauá, 1538 V. América Mauá.
              </CardTitle>
              <CardDescription className="text-gray-700">
                Fone: (11) 4309-6906
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link
          href="https://www.google.com/maps/place/Edificar+Ve%C3%ADculos/@-24.0045416,-46.4263707,17z/data=!3m1!4b1!4m5!3m4!1s0x94ce1d538b1ca0f1:0xc16c62b3f25bb393!8m2!3d-24.0045416!4d-46.424182"
          target="_blank"
        >
          <Card className="h-[400px]">
            <div>
              <Image
                src="/pg.jpg"
                alt="Loja 1"
                width={300}
                height={300}
                className="w-full h-auto rounded-tr-md rounded-tl-md"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Av. Presidente Kennedy, 1486 Vila Guilhermina.
              </CardTitle>
              <CardDescription className="text-gray-700">
                Fone: (13) 3474-3999
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link
          href="https://www.google.com/maps/place/Grupo+Edificar+Ve%C3%ADculos/@-23.6880708,-46.550002,14.22z/data=!4m19!1m13!4m12!1m4!2m2!1d-46.534684!2d-23.678334!4e1!1m6!1m2!1s0x94ce434353097df7:0xbbae80e8bafd2c7c!2sGrupo+Edificar+Ve%C3%ADculos+-+Av.+Brg.+Faria+Lima,+600+-+Centro,+S%C3%A3o+Bernardo+do+Campo+-+SP,+09720-000!2m2!1d-46.552485!2d-23.703692!3m4!1s0x94ce434353097df7:0xbbae80e8bafd2c7c!8m2!3d-23.703692!4d-46.552485"
          target="_blank"
        >
          <Card className="h-[400px]">
            <div>
              <Image
                src="/sao-bernardo.jpg"
                alt="Loja 1"
                width={300}
                height={300}
                className="w-full h-auto rounded-tr-md rounded-tl-md"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Av. Brigadeiro Faria Lima, 600 S.B.C SP
              </CardTitle>
              <CardDescription className="text-gray-700">
                Fone: (11) 4103-7727
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link
          href="https://www.google.com/maps/place/Rhema+Multimarcas/@-23.6670871,-46.6119698,15z/data=!4m2!3m1!1s0x0:0xb00585e5f7ec3ae3?sa=X&ved=2ahUKEwiyyOHJ4uCDAxXZrZUCHX5nBtUQ_BJ6BAgKEAA&hl=pt-BR"
          target="_blank"
        >
          <Card className="h-[400px]">
            <div>
              <Image
                src="/RHEMAR MULTIMARCAS.jpg"
                alt="Loja 1"
                width={300}
                height={300}
                className="w-full h-auto rounded-tr-md rounded-tl-md"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Av. Água Funda, 210 - Taboão, São Bernardo do Campo.
              </CardTitle>
              <CardDescription className="text-gray-700">
                Fone: (11) 94896-5558
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link
          href="https://www.google.com/maps/place//@-23.6362942,-46.6547452,12z/data=!3m1!4b1!4m14!1m13!4m12!1m4!2m2!1d-46.5436672!2d-23.6191744!4e1!1m6!1m2!1s0x94ce45422782a1bd:0xf93fe6328f5b96e1!2sGrupo+Edificar+Ve%C3%ADculos+-+Av.+Pres.+Kenedy,+676+-+Centro,+Diadema+-+SP,+09913-000!2m2!1d-46.6322039!2d-23.6842061?entry=ttu"
          target="_blank"
        >
          <Card className="h-[400px]">
            <div>
              <Image
                src="/diadema-1.jpg"
                alt="Loja 1"
                width={300}
                height={300}
                className="w-full h-auto rounded-tr-md rounded-tl-md"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Av. Pres. Kenedy, 676 Centro, Diadema SP
              </CardTitle>
              <CardDescription className="text-gray-700">
                Fone (11) 4055-5476
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link
          href="https://www.google.com.br/maps/place/Grupo+Edificar+Veiculos+-+Matriz+Digital/@-23.6816052,-46.6106113,14.17z/data=!4m12!1m6!3m5!1s0x0:0x5c80442738092e57!2sGrupo+Edificar+Veiculos+-+Matriz+Digital!8m2!3d-23.6852704!4d-46.6217686!3m4!1s0x0:0x5c80442738092e57!8m2!3d-23.6852704!4d-46.6217686​"
          target="_blank"
        >
          <Card className="h-[400px]">
            <div>
              <Image
                src="/diadema-2.jpg"
                alt="Loja 1"
                width={300}
                height={300}
                className="w-full h-auto rounded-tr-md rounded-tl-md"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Av. Presidente Kennedy 175 - Diadema SP.
              </CardTitle>
              <CardDescription className="text-gray-700">
                Fone (11)4055-2424
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </main>
  );
}
