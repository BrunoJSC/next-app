// components/Filters.tsx
import { useEffect, useState } from "react";
import { ICar } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { Input } from "@/components/ui/input";

import { Dropdown } from "primereact/dropdown";

interface FiltersProps {
  onFilterChange: (filteredData: ICar[]) => void;
}

const CarFilterForm: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterFuel, setFilterFuel] = useState<string>("");
  const [filterModelCar, setFilterModelCar] = useState<string>("");
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [data, setData] = useState<ICar[]>([]);

  const handleFilterChange = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add more filters as needed
    const filteredData = data.filter((car) => {
      return (
        car.brandCar.toLowerCase().includes(filterBrand.toLowerCase()) &&
        car.modelCar.toLowerCase().includes(filterModelCar.toLowerCase()) &&
        car.fuel.toLowerCase().includes(filterFuel.toLowerCase())
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

      <Dropdown
        value={filterFuel}
        onChange={(e) => setFilterFuel(e.value)}
        options={["Gasolina", "Diesel", "Elétrico"]}
        placeholder="Combustível"
        className="bg-white p-2 rounded-md"
      />
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default CarFilterForm;
