"use client";

import { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { IMotorbike } from "@/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/firebase";
import FilterMotorbike from "./components/FilterMotorbike";

export default function MotorbikesPage() {
  const [motorbikes, setMotorbikes] = useState<IMotorbike[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "motorbikes"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLoading(false);
      if (!snapshot.empty) {
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setLastVisible(lastDoc as any);
        const loadedMotorbikes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IMotorbike[];
        setMotorbikes(loadedMotorbikes);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadMoreMotorbikes = () => {
    if (!lastVisible || loading) return;
    setLoading(true);
    const nextQuery = query(
      collection(db, "motorbikes"),
      startAfter(lastVisible),
      limit(10),
    );

    onSnapshot(nextQuery, (snapshot) => {
      setLoading(false);
      if (!snapshot.empty) {
        const newLastVisible = snapshot.docs[snapshot.docs.length - 1];
        setLastVisible(newLastVisible as any);
        const newMotorbikes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IMotorbike[];
        setMotorbikes((prevMotorbikes) => [
          ...prevMotorbikes,
          ...newMotorbikes,
        ]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    });
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto min-h-screen p-4">
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
            className={`w-full md:w-[300px] md:h-[1250px] h-auto bg-primary rounded-md p-4 mb-4 md:mb-0 ${
              isFilterVisible ? "block" : "hidden md:block"
            }`}
          >
            <h1 className="text-3xl font-bold text-white mb-4">Filtros</h1>
            <FilterMotorbike onFilterChange={setMotorbikes} />
          </Card>

          <div className="w-full p-4 flex-1 flex flex-col space-y-7">
            {motorbikes.map((motorbike) => (
              <Link
                href={{
                  pathname: `/motos/${motorbike.id}`,
                  query: motorbike as any, // Simplificado para passar a motocicleta inteira como query
                }}
                key={motorbike.id}
              >
                <div className="w-full md:h-56 h-auto bg-white flex shadow-md rounded-lg flex-col md:flex-row overflow-hidden cursor-pointer">
                  <div className="md:w-1/3 w-full relative h-48 md:h-full">
                    <Image
                      src={motorbike.images[0] || "/default-motorbike.jpg"}
                      layout="fill"
                      alt={`${motorbike.motorbikeBrand} ${motorbike.motorbikeModel}`}
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <h1 className="text-2xl font-bold text-primary mb-4">
                      {motorbike.motorbikeBrand}{" "}
                      <span className="text-black">
                        {motorbike.motorbikeModel}
                      </span>
                    </h1>
                    <div>
                      <p className="font-bold">
                        Ano: {motorbike.yearFabrication}
                      </p>
                      <p className="font-bold">
                        KM: {motorbike.km.toLocaleString()} km
                      </p>
                      <p className="font-bold">Combustível: {motorbike.fuel}</p>
                      <p className="font-bold">
                        Cilindrada: {motorbike.cylinder}cc
                      </p>

                      <p className="font-bold">
                        Localização: {motorbike.location}
                      </p>
                    </div>
                    <p className="font-bold text-2xl text-primary">
                      R$ {motorbike.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {loading && <div>Carregando...</div>}
          {hasMore && !loading && (
            <button
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={loadMoreMotorbikes}
            >
              Carregar mais
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
