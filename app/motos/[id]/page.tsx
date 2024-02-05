import { Carousel } from "@/components/Carousel";
import { FormSendUser } from "@/components/FormSendUser";
import { getDataMotorbikes } from "@/components/searchBDMotorbike";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { db } from "@/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export const dynamic = "force-static";
export async function generateStaticParams() {
  const motorbikesCollection = collection(db, "motorbikes");
  const motorbikesSnapshot = await getDocs(motorbikesCollection);

  const motorbikes = motorbikesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return motorbikes;
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    motorbikeBrand: string;
    motorbikeModel: string;
    location: string;
    yearFabrication: string;
    km: string;
    fuel: string;
    cylinder: string;
    color: string;
    description: string;
    accessories: string[];
    images: string[];
    announce: string;
    price: string;
    plate: string;
  };
}) {
  const motorbike = await getDataMotorbikes();

  return (
    <section className="w-full min-h-screen p-2 mb-48">
      <div className="p-12 max-w-screen-xl mx-auto">
        <Carousel images={searchParams.images as string[]} />
      </div>

      <Card className="w-full max-w-screen-lg mx-auto mt-2 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {searchParams.motorbikeBrand}{" "}
            <span className="text-black">{searchParams.motorbikeModel}</span>
            <p className="text-primary">
              R$ <span className="text-black">{searchParams.price}</span>
            </p>
          </CardTitle>
        </CardHeader>

        <div className="max-w-sm md:ml-4">
          <CardTitle className="text-2xl font-bold text-primary">
            Sobre a moto
          </CardTitle>
          <div>
            <CardDescription>{searchParams.description}</CardDescription>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between mt-4">
          <div className="md:w-[450px] grid grid-cols-2 gap-4 p-4">
            <div>
              <p className="font-bold">Localização</p>
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
              <p className="font-bold">Cilindradas</p>
              <p className="text-primary">{searchParams.cylinder}</p>
            </div>

            <div>
              <p className="font-bold">Cor</p>
              <p className="text-primary">{searchParams.color}</p>
            </div>

            <div>
              <p className="font-bold">Tipo de anúnciante</p>
              <p className="text-primary">{searchParams.announce}</p>
            </div>

            <div>
              <p className="font-bold">Placa</p>
              <p className="text-primary">{searchParams.plate}</p>
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
            <FormSendUser />
          </div>
        </div>
      </Card>

      <div className="p-12 max-w-screen-xl mx-auto mt-44">
        {/* <Carousel className="w-full max-w-screen-xl">
          <CarouselContent className="flex gap-5">
            {data.map((motorbike) => (
              <>
                <Link
                  href={{
                    pathname: `/motos/${motorbike.id}`,
                    query: {
                      motorbikeBrand: motorbike.motorbikeBrand,
                      motorbikeModel: motorbike.motorbikeModel,
                      yearFabrication: motorbike.yearFabrication,
                      location: motorbike.location,
                      km: motorbike.km,
                      fuel: motorbike.fuel,
                      cylinder: motorbike.cylinder,
                      color: motorbike.color,
                      description: motorbike.description,
                      images: motorbike.images,
                      accessories: motorbike.accessories,
                      price: motorbike.price,
                    },
                  }}
                >
                  <div className="">
                    <div className="w-[300px] md:w-[500px] h-[300px] md:h-[400px]">
                      <Image
                        src={motorbike.images[0]}
                        alt="car"
                        width={400}
                        height={400}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    <h2 className="text-black text-2xl font-bold mt-2">
                      {motorbike.motorbikeBrand} - {motorbike.motorbikeModel}
                    </h2>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <p className="text-black font-black">
                        {motorbike.location}
                      </p>
                      <p className="text-black font-black text-2xl">
                        Preço:{" "}
                        <span className="text-primary">{motorbike.price}</span>
                      </p>
                      <p className="text-black font-black">{motorbike.km}KM</p>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:block" />
          <CarouselNext className="hidden md:block" />
        </Carousel> */}
      </div>
    </section>
  );
}
