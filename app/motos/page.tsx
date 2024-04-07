"use client";

import { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/firebase";
import { IMotorbike } from "@/types";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import FilterMotorbike from "./components/FilterMotorbike";

export default function MotorbikesPage() {
  const [motorbikes, setMotorbikes] = useState<IMotorbike[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
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
    <main className="max-w-7xl mx-auto min-h-screen p-4 mb-72">
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
          className={`w-full md:w-[300px] md:h-[1190px]  h-auto bg-primary rounded-md p-4 mb-4 md:mb-0 ${
            isFilterVisible ? "block" : "hidden md:block"
          }`}
        >
          <h1 className="text-3xl font-bold text-white mb-4">Filtros</h1>
          <FilterMotorbike onFilterChange={setMotorbikes} />
        </Card>

        <div className="w-full p-4 flex-1 flex flex-col space-y-7">
          {motorbikes.map((motorbike) => (
            <div
              className="w-full md:h-56 h-auto bg-white flex shadow-md rounded-lg flex-col md:flex-row"
              key={motorbike.id}
            >
              <div className="md:w-[350px] w-full h-56 relative">
                <Link href={`/motos/${motorbike.id}`} passHref>
                  <Image
                    src={motorbike.images[0] || "/default-motorbike.jpg"}
                    layout="fill"
                    alt={`${motorbike.motorbikeBrand} ${motorbike.motorbikeModel}`}
                    className="object-cover rounded-lg cursor-pointer"
                  />
                </Link>
              </div>

              <div className="p-4 flex flex-col justify-between">
                <h1 className="text-2xl font-bold text-primary">
                  {motorbike.motorbikeBrand}{" "}
                  <span className="text-black">{motorbike.motorbikeModel}</span>
                </h1>
                {/* Outras informações da motocicleta */}
              </div>
            </div>
          ))}
          {loading && <div>Carregando...</div>}
          {hasMore && !loading && (
            <button
              className="mx-auto bg-primary text-white px-4 py-2 rounded-md"
              onClick={loadMoreMotorbikes}
            >
              Carregar mais
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
