"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthContext } from "@/context/auth";
import { db, storage } from "@/firebase";
import { ICar, IMotorbike } from "@/types";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const [car, setCar] = useState<ICar[]>([]);
  const [motorbike, setMotorbike] = useState<IMotorbike[]>([]);
  const { user } = useContext(AuthContext);

  const handleDownload = async (imageURL: string) => {
    try {
      const storageRef = ref(storage, imageURL);
      const downloadURL = await getDownloadURL(storageRef);
      window.open(downloadURL, "_blank");
    } catch (error) {
      console.error("Erro ao fazer download da imagem:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "formCar"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];
      setCar(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "formMotorbike"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IMotorbike[];
        setMotorbike(data);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    return redirect("/");
  }

  async function deleteAnnounce(id: string) {
    console.log(id);
    try {
      await deleteDoc(doc(db, "formCar", id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-black text-center mt-5">Carros</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-4">
        {car?.map((item) => (
          <Card key={item.id} className="w-full h-auto mb-8">
            <div className="overflow-hidden">
              <Image
                src={
                  item.images && item.images.length > 0 ? item.images[0] : ""
                }
                alt=""
                width={500}
                height={500}
                className="w-full h-40 object-cover md:h-60 lg:h-80"
              />
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-2">
                Marca: {item.brandCar}
              </h1>
              <h2 className="text-xl font-semibold mb-2">
                modelo: {item.modelCar}
              </h2>
              <p className="text-gray-600 mb-2">Nome: {item.name}</p>

              <p className="text-gray-600 mb-2">Email: {item.email}</p>

              <p className="text-gray-600 mb-2">Localização: {item.location}</p>

              <p className="text-gray-600 mb-2">Celular: {item.phone}</p>

              <p className="text-gray-600 mb-2">
                Tipo de carroceria: {item.bodyType}
              </p>

              <p className="text-gray-600 mb-2">Leilão: {item.auction}</p>

              <p className="text-gray-600 mb-2">Condição: {item.condition}</p>
              <p className="text-gray-600 mb-2">
                Potência do motor: {item.motors}
              </p>

              <p className="text-gray-600 mb-2">
                Ano de fabricação: {item.yearFabrication}
              </p>

              <p className="text-gray-600 mb-2">
                Ano de modificação: {item.yearModification}
              </p>
              <p className="text-gray-600 mb-2">KM: {item.km} km</p>
              <p className="text-gray-600 mb-2">Combustivel: {item.fuel}</p>
              <p className="text-gray-600 mb-2">Cor: {item.color}</p>
              <p className="text-gray-600 mb-2">Mecanico: {item.mechanic}</p>
              <p className="text-gray-600 mb-2">Placa: {item.plate}</p>
              <p className="text-gray-600 mb-2">
                Acessórios: {item.accessories}
              </p>

              <p className="text-gray-600 mb-2">Preço: {item.price}</p>
              <p className="text-gray-600 mb-2">Fip: {item.fip}</p>
              <p className="text-gray-600 mb-2">Portas: {item.doors}</p>
              <p className="text-gray-600 mb-2">Cambio: {item.exchange}</p>
              <p className="text-gray-600 mb-2">
                Descrição: {item.description}
              </p>
              <div className="mt-4">
                {item.images?.map((image, index) => (
                  <div key={index} className="mb-2">
                    <Button onClick={() => handleDownload(image)}>
                      Download Image {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-black text-center mt-5">Motos</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-4">
        {motorbike?.map((item) => (
          <Card key={item.id} className="w-full h-auto mb-8">
            <div className="overflow-hidden">
              <Image
                src={
                  item.images && item.images.length > 0 ? item.images[0] : ""
                }
                alt=""
                width={500}
                height={500}
                className="w-full h-40 object-cover md:h-60 lg:h-80"
              />
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-2">
                Marca: {item.motorbikeBrand}
              </h1>
              <h2 className="text-xl font-semibold mb-2">
                modelo: {item.motorbikeModel}
              </h2>
              <p className="text-gray-600 mb-2">
                Ano de fabricação: {item.yearFabrication}
              </p>
              <p className="text-gray-600 mb-2">
                Ano de modificação: {item.yearModification}
              </p>
              <p className="text-gray-600 mb-2">KM: {item.km} km</p>
              <p className="text-gray-600 mb-2">Combustivel: {item.fuel}</p>
              <p className="text-gray-600 mb-2">Cor: {item.color}</p>
              <p className="text-gray-600 mb-2">Mecanico: {item.mechanic}</p>
              <p className="text-gray-600 mb-2">Placa: {item.plate}</p>
              <p className="text-gray-600 mb-2">Cilindro: {item.cylinder}</p>
              <p className="text-gray-600 mb-2">Localização: {item.location}</p>
              <p className="text-gray-600 mb-2">Preço: {item.price}</p>
              <p className="text-gray-600 mb-2">
                Tipo de carroceria: {item.typeBody}
              </p>
              <p className="text-gray-600 mb-2">
                Descrição: {item.description}
              </p>
              <div className="mt-4">
                {item.images?.map((image, index) => (
                  <div key={index} className="mb-2">
                    <Button onClick={() => handleDownload(image)}>
                      Download Image {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
