// components/Filters.tsx
import { useEffect, useState } from "react";
import { IMotorbike } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  onFilterChange: (filteredData: IMotorbike[]) => void;
}

const FilterMotorbike: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterFuel, setFilterFuel] = useState<string>("");
  const [filterModelCar, setFilterModelCar] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [cylinder, setCylinder] = useState<string>("");
  const [data, setData] = useState<IMotorbike[]>([]);

  const handleFilterChange = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredData = data.filter((motorbike) => {
      return (
        motorbike.motorbikeBrand
          ?.toLowerCase()
          .includes(filterBrand.toLowerCase()) &&
        motorbike.motorbikeModel
          ?.toLowerCase()
          .includes(filterModelCar.toLowerCase()) &&
        motorbike.fuel?.toLowerCase().includes(filterFuel.toLowerCase()) &&
        motorbike.yearFabrication?.toString().includes(filterYear) &&
        motorbike.color?.toLowerCase().includes(color.toLowerCase()) &&
        motorbike.location?.toLowerCase().includes(location.toLowerCase()) &&
        motorbike.cylinder?.toLowerCase().includes(cylinder.toLowerCase())
      );
    });

    onFilterChange(filteredData);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "motorbikes"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IMotorbike[];
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

      <Input
        type="text"
        placeholder="Cilindradas"
        value={cylinder}
        onChange={(e) => setCylinder(e.target.value)}
        className="bg-white"
      />

      <Button type="submit" className="w-full" variant="outline">
        Pesquisar
      </Button>
    </form>
  );
};

export default FilterMotorbike;
