// components/Filters.tsx
import { useEffect, useState } from "react";
import { ICar } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
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
  const [color, setColor] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [exchange, setExchange] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFilterChange = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const carsCollection = collection(db, "cars");
    const carsQuery = query(
      carsCollection,
      where("brandCar", "==", filterBrand),
      where("modelCar", "==", filterModelCar),
      where("fuel", "==", filterFuel),
      where("yearFabrication", ">=", startYear),
      where("yearFabrication", "<=", endYear),
      where("color", "==", color),
      where("location", "==", location),
      where("exchange", "==", exchange)
    );

    const querySnapshot = await onSnapshot(carsQuery, (snapshot) => {
      const filteredData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];

      onFilterChange(filteredData);
      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ICar[];
      onFilterChange(data);
    });

    return () => unsubscribe();
  }, []); // Executa somente na montagem do componente

  return (
    <>
      <form onSubmit={handleFilterChange} className="flex flex-col space-y-2">
        <Input
          type="text"
          placeholder="Filtrar por marca"
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Filtrar por modelo"
          value={filterModelCar}
          onChange={(e) => setFilterModelCar(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Filtrar por combustível"
          value={filterFuel}
          onChange={(e) => setFilterFuel(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Filtrar por ano de fabricação"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Até o ano"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Filtrar por cor"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Filtrar por localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Filtrar por tipo de câmbio"
          value={exchange}
          onChange={(e) => setExchange(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          Filtrar
        </Button>
      </form>
    </>
  );
};

export default CarFilterForm;
