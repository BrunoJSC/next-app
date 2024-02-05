import { Carousel } from "@/components/Carousel";
import { FormSendUser } from "@/components/FormSendUser";
import { getDataCars } from "@/components/searchBDCar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const carsCollection = collection(db, "cars");
  const carsSnapshot = await getDocs(carsCollection);

  const cars = carsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return cars;
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
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
}) {
  // const cars = await getDataCars();

  return (
    <section className="w-full min-h-screen p-2 mb-48">
      <div className="p-4 md:p-8 lg:p-12 max-w-screen-xl mx-auto">
        <Carousel images={searchParams.images as string[]} />
      </div>

      <Card className="w-full max-w-screen-lg mx-auto mt-2 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {searchParams.brandCar}{" "}
            <span className="text-black">{searchParams.modelCar}</span>
            <p className="text-primary">
              <span className="text-black">{searchParams.price}</span>
            </p>
          </CardTitle>
        </CardHeader>

        <div className="max-w-sm md:ml-4">
          <CardTitle className="text-2xl font-bold text-primary">
            Sobre o carro
          </CardTitle>
          <div>
            <CardDescription>{searchParams.description}</CardDescription>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between mt-4">
          <div className="md:w-[450px] grid grid-cols-2 gap-4 p-4">
            <div>
              <p className="font-bold">Cidade</p>
              <p className="text-primary">{searchParams.location}</p>
            </div>

            <div>
              <p className="font-bold">Ano</p>
              <p className="text-primary">{searchParams.yearFabrication}</p>
            </div>

            <div>
              <p className="font-bold">Combustível</p>
              <p className="text-primary">{searchParams.fuel}</p>
            </div>

            <div>
              <p className="font-bold">KM</p>
              <p className="text-primary">{searchParams.km}</p>
            </div>

            <div>
              <p className="font-bold">Cambio</p>
              <p className="text-primary">{searchParams.exchange}</p>
            </div>

            <div>
              <p className="font-bold">Cor</p>
              <p className="text-primary">{searchParams.color}</p>
            </div>

            <div>
              <p className="font-bold">Pôtencia do motor</p>
              <p className="text-primary">{searchParams.motors}</p>
            </div>

            <div>
              <p className="font-bold">Condição</p>
              <p className="text-primary">{searchParams.condition}</p>
            </div>

            <div>
              <p className="font-bold">Tipo de anunciante</p>
              <p className="text-primary">{searchParams.announce}</p>
            </div>

            <div>
              <p className="font-bold">Placa</p>
              <p className="text-primary">{searchParams.plate}</p>
            </div>

            <div>
              <p className="font-bold">Carroceria</p>
              <p className="text-primary">{searchParams.bodyType}</p>
            </div>

            <div>
              <p className="font-bold">Portas</p>
              <p className="text-primary">{searchParams.doors}</p>
            </div>

            <div className="col-span-2">
              <p className="font-bold">Opcionais</p>
              {Array.isArray(searchParams.accessories) &&
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

          <div>
            <FormSendUser />
          </div>
        </div>
      </Card>

      {/* <div className="p-12 max-w-screen-xl mx-auto mt-44">
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
                    },
                  }}
                >
                  <div className="">
                    <div className="w-[300px] md:w-[500px] h-[300px] md:h-[400px]">
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
          <CarouselPrevious className="hidden md:block" />
          <CarouselNext className="hidden md:block" />
        </Carousel>
      </div> */}
    </section>
  );
}
