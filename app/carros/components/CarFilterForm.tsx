// ... (importações e definição de interface)

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { ICar } from "@/types";
import {
  CollectionReference,
  DocumentData,
  Query,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

interface FiltersProps {
  onFilterChange: (filteredData: ICar[]) => void;
}

const CarFilterForm: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterFuel, setFilterFuel] = useState<string>("");
  const [filterModelCar, setFilterModelCar] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [data, setData] = useState<ICar[]>([]);

  const fetchFilteredCars = async () => {
    try {
      let carCollection: CollectionReference<DocumentData> = collection(
        db,
        "cars"
      );

      // Construindo a query com base nos filtros
      let q: Query<DocumentData> = query(carCollection);

      if (filterBrand) {
        q = query(q, where("brandCar", "==", filterBrand));
      }

      if (filterModelCar) {
        q = query(q, where("modelCar", "==", filterModelCar));
      }

      // Adicione mais condições conforme necessário para outros filtros

      const querySnapshot = await getDocs(q);

      const filteredData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];

      onFilterChange(filteredData);
    } catch (error) {
      console.error("Erro ao buscar carros filtrados:", error);
    }
  };

  const resetFilter = useCallback(() => {
    setFilterBrand("");
    setFilterModelCar("");
    // Adicione mais lógica para resetar outros filtros conforme necessário
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];
      setData(carData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <label>
          Filtrar por marca
          <Input
            type="text"
            placeholder="Marca"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          />
        </label>

        <label>
          Filtrar por modelo
          <Input
            type="text"
            placeholder="Modelo"
            value={filterModelCar}
            onChange={(e) => setFilterModelCar(e.target.value)}
          />
        </label>

        <label>
          Filtrar por combustível
          <Input
            type="text"
            placeholder="Combustível"
            value={filterFuel}
            onChange={(e) => setFilterFuel(e.target.value)}
          />
        </label>

        <label>
          Filtrar por ano de fabricação
          <Input
            type="text"
            placeholder="Ano"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />
        </label>

        <Button type="button" onClick={fetchFilteredCars} className="w-full">
          Pesquisar
        </Button>

        <Button type="button" onClick={resetFilter} className="w-full mt-2">
          Resetar Filtros
        </Button>
      </div>
    </>
  );
};

export default CarFilterForm;
