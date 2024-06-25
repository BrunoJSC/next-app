"use client";

import { useState, useEffect, useRef } from "react";
import {
  onSnapshot,
  collection,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { ICar } from "@/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { analytics, db } from "@/firebase";
import CarFilterForm from "./components/CarFilterForm";
import { logEvent } from "firebase/analytics";

export default function Cars() {
  const [data, setData] = useState<ICar[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current) {
        const filterTop = filterRef.current.getBoundingClientRect().top;
        setIsFilterSticky(filterTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "cars"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLoading(false);
      if (!snapshot.empty) {
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setLastVisible(lastDoc as any);
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ICar[];
        setData(newData);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {}, []);

  const fetchInitialCars = () => {
    setLoading(true);
    const q = query(collection(db, "cars"), limit(10));
    // Implementação da sua lógica de fetch inicial
    // Não esqueça de ajustar setShowLoadMore e setHasMore com base nos resultados
  };

  const loadMoreCars = () => {
    if (!lastVisible || loading) return; // Adiciona verificação de loading para evitar múltiplas chamadas
    setLoading(true);

    const next = query(
      collection(db, "cars"),
      startAfter(lastVisible),
      limit(10),
    );

    onSnapshot(next, (snapshot) => {
      if (snapshot.empty) {
        setHasMore(false); // Não há mais itens para carregar
        setShowLoadMore(false);
        setLoading(false);
        return;
      }

      const newLastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(newLastVisible as any);

      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];

      // Filtra os novos dados para incluir apenas itens únicos
      const uniqueNewData = newData.filter(
        (newCar) => !data.some((existingCar) => existingCar.id === newCar.id),
      );

      if (uniqueNewData.length > 0) {
        setData((prevData) => [...prevData, ...uniqueNewData]);
        setHasMore(true); // Assume que pode haver mais itens para carregar
        setShowLoadMore(true);
      } else {
        setHasMore(false); // Não encontrou novos itens únicos, possivelmente não há mais itens para carregar
        setShowLoadMore(false);
      }

      setLoading(false);
    });
  };
  const handleFilterChange = (filteredData: ICar[]) => {
    setData(filteredData);
    // Supondo que você pode determinar se ainda há mais dados com base nos filtros aplicados
    setHasMore(false); // Ajuste baseado na sua lógica de filtro
    setShowLoadMore(false); // Esconde a barra após a filtragem
  };
  return (
    <div>
      <main className="max-w-7xl mx-auto min-h-screen p-4 mb-72 relative">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:hidden">
            <button
              className="bg-primary text-white px-4 py-2 rounded-md w-full"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              {isFilterVisible ? "Fechar Filtros" : "Abrir Filtros"}
            </button>
          </div>

          <Card
            className={`w-full md:w-[300px] h-auto md:h-[1250px] bg-primary rounded-md p-4 mb-4 md:mb-0 md:sticky top-5  left-4 z-10 overflow-y-auto max-h-screen ${
              isFilterVisible ? "block" : "hidden md:block"
            }`}
          >
            <h1 className="text-3xl font-bold text-white mb-4 ">Filtros</h1>
            <CarFilterForm
              onFilterChange={setData}
              closeFilter={() => setIsFilterVisible(false)}
            />
          </Card>

          <div className="w-full p-4 flex-1 flex flex-col space-y-7">
            {data.map((car) => (
              <Link
                href={{
                  pathname: `/carros/${car.id}`,
                  query: car as any, // Simplificado para passar o carro inteiro como query
                }}
                key={car.id}
              >
                <div className="w-full md:h-56 h-auto bg-white flex shadow-md rounded-lg flex-col md:flex-row overflow-hidden cursor-pointer">
                  <div className="md:w-1/3 w-full relative h-48 md:h-full">
                    <Image
                      src={car.images[0]}
                      layout="fill"
                      alt={car.brandCar}
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <h1 className="text-2xl font-bold text-primary mb-4">
                      {car.brandCar}{" "}
                      <span className="text-black">{car.modelCar}</span>
                    </h1>
                    <div>
                      <p className="font-bold">Ano: {car.yearFabrication}</p>
                      <p className="font-bold">KM: {car.km}</p>
                      <p className="font-bold">
                        Tipo de combustível: {car.fuel}
                      </p>
                      <p className="font-bold">Localização: {car.location}</p>
                    </div>
                    <p className="font-bold text-2xl text-primary">
                      Valor: {car.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {loading && <div>Loading...</div>}
          {hasMore && !loading && (
            <button
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={loadMoreCars}
            >
              Carregar mais
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
