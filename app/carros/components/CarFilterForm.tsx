// components/Filters.tsx
import { useCallback, useEffect, useState } from "react";
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
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [exchange, setExchange] = useState<string>("");
  const [data, setData] = useState<ICar[]>([]);

  const handleFilterChange = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredData = data.filter((car) => {
      return (
        car.brandCar.toLowerCase().includes(filterBrand.toLowerCase()) &&
        car.modelCar.toLowerCase().includes(filterModelCar.toLowerCase()) &&
        car.fuel.toLowerCase().includes(filterFuel.toLowerCase()) &&
        car.yearFabrication.toLowerCase().includes(filterYear.toLowerCase()) &&
        car.yearFabrication >= startYear &&
        car.yearFabrication <= endYear &&
        car.color.toLowerCase().includes(color.toLowerCase()) &&
        car.location.toLowerCase().includes(location.toLowerCase()) &&
        car.exchange.toLowerCase().includes(exchange.toLowerCase())
      );
    });

    onFilterChange(filteredData);
  };

  const resetFilter = useCallback(() => {
    setFilterBrand("");
  }, []);

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
    <>
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
            >
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          </div>
        </div>

        <Input
          type="text"
          placeholder="Ano Inicial"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          className="bg-white"
          maxLength={4}
          pattern="[0-9]*"
          inputMode="numeric"
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
        />

        <Input
          type="text"
          placeholder="Ano Final"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          className="bg-white"
          maxLength={4}
          pattern="[0-9]*"
          inputMode="numeric"
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
        />

        <Input
          type="text"
          placeholder="Cor"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="bg-white"
        />

        <Input
          type="text"
          placeholder="Cidade"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-white"
        />

        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setExchange(e.target.value)}
          >
            <option value="">Tipo de cambio</option>
            <option>Manual</option>
            <option>Automatico</option>
            <option>CVT</option>
            <option>Eletrico</option>
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
            >
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          </div>
        </div>

        <Button type="submit" className="w-full" variant="outline">
          Pesquisar
        </Button>
      </form>
    </>
  );
};

export default CarFilterForm;
