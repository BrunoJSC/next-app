// components/Filters.tsx
import { useEffect, useState, useCallback } from "react";
import { ICar } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getDocs } from "firebase/firestore";

interface FiltersProps {
  onFilterChange: (filteredData: ICar[]) => void;
}

const CarFilterForm: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterFuel, setFilterFuel] = useState<string>("");
  const [filterModelCar, setFilterModelCar] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [data, setData] = useState<ICar[]>([]);

  const handleFilterChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const carsCollection = collection(db, "cars");
    const carsQuery = query(
      carsCollection,
      where("brandCar", "==", filterBrand),
      where("modelCar", "==", filterModelCar),
      where("fuel", "==", filterFuel),
      where("yearFabrication", ">=", filterYear)
    );

    const querySnapshot = await getDocs(carsQuery);
    const filteredData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ICar[];

    onFilterChange(filteredData);
  };

  const resetFilter = useCallback(() => {
    setFilterBrand("");
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
      <form onSubmit={handleFilterChange} className="flex flex-col space-y-2">
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

        <Button type="submit" className="w-full">
          Filtrar
        </Button>
      </form>
    </>
  );
};

export default CarFilterForm;
