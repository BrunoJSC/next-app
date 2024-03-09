"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  Card,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { announce } from "@/constants";
import { db } from "@/firebase";
import { ICar } from "@/types";
import { contactVehicleSchema } from "@/validation/schemas";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ChatBoxCar } from "@/components/ChatBoxCar";
import { NumericFormat } from "react-number-format";

export default function Page({
  searchParams,
}: Readonly<{
  searchParams: {
    brandCar: string;
    modelCar: string;
    images: string[];
    location: string;
    yearFabrication: string;
    fuel: string;
    km: string;
    exchange: string;
    color: string;
    description: string;
    accessories: string[];
    price: string;
    bodyType: string;
    motors: string;
    condition: string;
    announce: string;
    doors: string;
    plate: string;
  };
}>) {
  const form = useForm<z.infer<typeof contactVehicleSchema>>({
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      phone: "",
      message: "",
    },
  });

  const [data, setData] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewedCars, setViewedCars] = useState<string[]>([]);
  const [message, setMessage] = useState(
    `Tenho interesse neste veículo ${searchParams.brandCar} ${searchParams.modelCar}`
  );
  const [installmentNumber, setInstallmentNumber] = useState("");
  const [entryValue, setEntryValue] = useState("");

  const handleSubmit = async (data: z.infer<typeof contactVehicleSchema>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "contact"), {
        id: Date().toString(),
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        message: message,
      });

      toast.success("Formulário enviado com sucesso");

      form.reset();

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // function calcFinance(
  //   valueCar: number,
  //   valueEnter: number,
  //   tax: number,
  //   numberInstallment: number
  // ) {
  //   const valueFinance = valueCar - valueEnter;

  //   const monthlyInterestRate = tax / 100 / 12;

  //   const monthlyPayment =
  //     (valueFinance * monthlyInterestRate) /
  //     (1 - Math.pow(1 + monthlyInterestRate, -numberInstallment));
  //   return monthlyPayment;
  // }

  const carPrice = parseFloat(
    searchParams.price.replace(/[^0-9.]/g, "").replace(".", "")
  );
  const interestRate = 20.0; // Taxa de juros anual (5.99%)

  const calculateInstallmentValue = (
    carPrice: number,
    interestRate: number,
    installmentNumber: number,
    entryValue: number
  ) => {
    if (isNaN(installmentNumber) || installmentNumber <= 0) {
      return 0;
    }
    const carPriceAfterEntry = carPrice - entryValue;
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalInstallments = installmentNumber;
    const monthlyPayment =
      (carPriceAfterEntry * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalInstallments));
    return monthlyPayment.toFixed(2);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];
      setData(data);
    });

    return () => unsubscribe();
  }, []);

  const getRandomCars = () => {
    const availableMotorbikes = data.filter(
      (car) => !viewedCars.includes(car.id)
    );
    const shuffledCars = [...availableMotorbikes].sort(
      () => 0.5 - Math.random()
    );
    return shuffledCars.slice(0, 5);
  };

  const handleViewedCars = (carId: string) => {
    setViewedCars((prevState) => [...prevState, carId]);
  };

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <section className="w-full min-h-screen p-2">
      <ChatBoxCar messages={message} setMessages={setMessage} />
      <div className="p-4 md:p-8 lg:p-12 max-w-screen-xl mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-screen-lg mx-auto mt-2"
        >
          <CarouselContent>
            {Array.isArray(searchParams?.images) &&
              searchParams.images.length > 0 && (
                <>
                  {searchParams.images.map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-2/4 lg:w-[400px] md:mr-2"
                    >
                      <div className="w-full h-[400px]">
                        <Image
                          src={searchParams.images[index]}
                          alt="car"
                          width={400}
                          height={400}
                          className="w-full h-4/5 rounded-xl object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </>
              )}
          </CarouselContent>
          <CarouselPrevious className="hidden translate-x-0 translate-y-0  md:flex items-center justify-center" />
          <CarouselNext className="hidden translate-x-0 translate-y-0  md:flex items-center justify-center" />
        </Carousel>
      </div>

      <Card className="w-full max-w-screen-lg mx-auto p-4 -mt-14">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {searchParams?.brandCar}{" "}
            <span className="text-black">{searchParams?.modelCar}</span>
            <p className="text-primary">
              <span className="text-black">{searchParams?.price}</span>
            </p>
          </CardTitle>
        </CardHeader>

        <div className="max-w-sm md:ml-4">
          <CardTitle className="text-2xl font-bold text-primary">
            Sobre o carro
          </CardTitle>
          <div>
            <CardDescription>{searchParams?.description}</CardDescription>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between mt-4">
          <div className="md:w-[450px] grid grid-cols-2 gap-4 p-4">
            <div>
              <p className="font-bold">Cidade</p>
              <p className="text-primary">{searchParams?.location}</p>
            </div>

            <div>
              <p className="font-bold">Ano</p>
              <p className="text-primary">{searchParams?.yearFabrication}</p>
            </div>

            <div>
              <p className="font-bold">Combustível</p>
              <p className="text-primary">{searchParams?.fuel}</p>
            </div>

            <div>
              <p className="font-bold">KM</p>
              <p className="text-primary">{searchParams?.km}</p>
            </div>

            <div>
              <p className="font-bold">Cämbio</p>
              <p className="text-primary">{searchParams?.exchange}</p>
            </div>

            <div>
              <p className="font-bold">Cor</p>
              <p className="text-primary">{searchParams?.color}</p>
            </div>

            <div>
              <p className="font-bold">Pôtencia do motor</p>
              <p className="text-primary">{searchParams?.motors}</p>
            </div>

            <div>
              <p className="font-bold">Condição</p>
              <p className="text-primary">{searchParams?.condition}</p>
            </div>

            <div>
              <p className="font-bold">Tipo de anunciante</p>
              <p className="text-primary">{searchParams?.announce}</p>
            </div>

            <div>
              <p className="font-bold">Placa</p>
              <p className="text-primary">{searchParams?.plate}</p>
            </div>

            <div>
              <p className="font-bold">Carroceria</p>
              <p className="text-primary">{searchParams?.bodyType}</p>
            </div>

            <div>
              <p className="font-bold">Portas</p>
              <p className="text-primary">{searchParams?.doors}</p>
            </div>

            <div className="col-span-2">
              <p className="font-bold">Opcionais</p>
              <div className="flex flex-wrap">
                {searchParams.accessories &&
                searchParams.accessories.length > 0 ? (
                  searchParams.accessories.map((accessory, index) => (
                    <div key={index} className="mr-2 mb-2">
                      <p className="text-primary">
                        {accessory}
                        {","}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>Sem acessórios</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Form {...form}>
              <form
                className="grid grid-cols-1 gap-4 p-4 bg-black max-w-sm md:max-w-[600px] rounded-xl md:mr-4 -mt-0 md:-mt-32"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Entre em contato com nossa equipe!
                  </h2>
                  <p className="text-white">Veja condições de financiamento.</p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="name" className="text-white">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nome Completo"
                    className="bg-white"
                    type="text"
                    {...form.register("name")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="cpf" className="text-white">
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    type="cpf"
                    className="bg-white"
                    placeholder="Adicionar neste formato 999.999.999-99"
                    {...form.register("cpf")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white"
                    placeholder="Adicionar neste formato 3xX9w@example.com"
                    {...form.register("email")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="phone" className="text-white">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="bg-white"
                    {...form.register("phone")}
                    placeholder="Adicionar neste formato (11) 99999-9999"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="phone" className="text-white">
                    Mensagem
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    className="bg-white"
                    {...form.register("message")}
                    placeholder="Escreva uma mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-5"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </Button>

                <Link
                  className={buttonVariants({
                    className: "w-full mt-4",
                  })}
                  type="submit"
                  href="https://wa.me/5511940723891"
                >
                  <MessageSquare className="mr-5" />
                  Chamar no WhatsApp
                </Link>
              </form>
            </Form>
          </div>
        </div>
      </Card>

      <Card className="w-full max-w-screen-lg mx-auto p-4 mt-14">
        <CardTitle>Financiamento</CardTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <div>
            <p className="font-bold">Valor de entrada</p>
            <NumericFormat
              value={entryValue}
              displayType={"input"}
              thousandSeparator="."
              decimalSeparator=","
              prefix={"R$ "}
              onValueChange={(values) => {
                const { value } = values;
                setEntryValue(value);
              }}
              className="w-[300px] inline-block p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <p className="font-bold">Número de parcelamento</p>
            <select
              value={installmentNumber}
              onChange={(e) => setInstallmentNumber(e.target.value)}
              className="w-full p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Selecione</option>
              <option value="12">12x</option>
              <option value="24">24x</option>
              <option value="36">36x</option>
              <option value="48">48x</option>
            </select>
          </div>

          <div>
            <p className="font-bold">Valor da Parcela</p>
            {/* <Input
              id="installmentValue"
              type="text"
              value={
                calculateInstallmentValue(
                  carPrice,
                  interestRate,
                  parseInt(installmentNumber),
                  parseFloat(entryValue)
                ) || ""
              }
              readOnly
            /> */}

            <NumericFormat
              value={calculateInstallmentValue(
                carPrice,
                interestRate,
                parseInt(installmentNumber),
                parseFloat(entryValue)
              )}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"R$ "}
              className="w-[300px] inline-block p-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <div className="p-4 md:p-12 md:max-w-screen-xl mx-auto mt-44">
        <Carousel className="w-full max-w-screen-xl">
          <CarouselContent className="flex gap-5">
            {data.map((car) => (
              <>
                <Link
                  href={{
                    pathname: `/carros/${car.id}`,
                    query: {
                      brandCar: car.brandCar,
                      modelCar: car.modelCar,
                      images: car.images,
                      location: car.location,
                      yearFabrication: car.yearFabrication,
                      fuel: car.fuel,
                      km: car.km,
                      exchange: car.exchange,
                      color: car.color,
                      description: car.description,
                      price: car.price,
                      accessories: car.accessories,
                      motors: car.motors,
                      condition: car.condition,
                      announce: car.announce,
                      plate: car.plate,
                      doors: car.doors,
                      bodyType: car.bodyType,
                    },
                  }}
                  onClick={() => handleViewedCars(car.id)}
                >
                  <div className="ml-10">
                    <div className="w-[300px] md:w-[500px] h-[300px] md:h-[300px]">
                      <Image
                        src={car.images[0]}
                        alt="car"
                        width={400}
                        height={400}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    <h2 className="text-black text-2xl font-bold mt-2">
                      {car.brandCar} - {car.modelCar}
                    </h2>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="text-black font-black">{car.location}</p>
                      <p className="text-black font-black text-2xl">
                        Preço: <span className="text-primary">{car.price}</span>
                      </p>
                      <p className="text-black font-black">{car.km}KM</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden translate-x-0 translate-y-0  md:flex items-center justify-center" />
          <CarouselNext className="hidden translate-x-0 translate-y-0  md:flex items-center justify-center" />
        </Carousel>
      </div>
    </section>
  );
}
