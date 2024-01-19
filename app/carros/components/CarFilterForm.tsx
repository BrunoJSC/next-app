// components/Filters.tsx
import { useEffect, useState } from "react";
import { ICar } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  onFilterChange: (filteredData: ICar[]) => void;
}

const CarFilterForm: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterFuel, setFilterFuel] = useState<string>("");
  const [filterModelCar, setFilterModelCar] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [data, setData] = useState<ICar[]>([]);

  const handleFilterChange = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add more filters as needed
    const filteredData = data.filter((car) => {
      return (
        car.brandCar.toLowerCase().includes(filterBrand.toLowerCase()) &&
        car.modelCar.toLowerCase().includes(filterModelCar.toLowerCase()) &&
        car.fuel.toLowerCase().includes(filterFuel.toLowerCase()) &&
        car.yearFabrication.toLowerCase().includes(filterYear.toLowerCase())
      );
    });

    onFilterChange(filteredData);
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

  return (
    <form onSubmit={handleFilterChange} className="flex flex-col space-y-2">
      <Input
        type="text"
        placeholder="Marca"
        value={filterBrand}
        onChange={(e) => setFilterBrand(e.target.value)}
        className="bg-white"
      />

      <Input
        type="text"
        placeholder="Modelo"
        value={filterModelCar}
        onChange={(e) => setFilterModelCar(e.target.value)}
        className="bg-white"
      />

      <div className="relative">
        <select
          className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setFilterFuel(e.target.value)}
        >
          <option value="">combustível</option>
          <option>Gasolina</option>
          <option>Alcool</option>
          <option>Disel</option>
          <option>Etanol</option>
        </select>

        <div className="absolute top-1/2 end-3 -translate-y-1/2">
          <svg
            className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </div>
      </div>

      <Input
        type="text"
        placeholder="Ano"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
        className="bg-white"
        maxLength={4}
        pattern="[0-9]*"
        inputMode="numeric"
        autoComplete="off"
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
      />

      <Button type="submit" className="w-full" variant="outline">
        Pesquisar
      </Button>
    </form>
  );
};

export default CarFilterForm;
