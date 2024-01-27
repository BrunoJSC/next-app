// components/Filters.tsx
import { useEffect, useState } from "react";
import { IMotorbike } from "@/types";
import {
  CollectionReference,
  DocumentData,
  Query,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  accessories,
  announceType,
  brandMotorbike,
  colorMotorbike,
  fuelMotorbike,
  locations,
  stores,
} from "@/constants/filterMotorbike";

interface FiltersProps {
  onFilterChange: (filteredData: IMotorbike[]) => void;
}

const FilterMotorbike: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterFuel, setFilterFuel] = useState<string>("");
  const [filterModelMotorbike, setFilterModelMotorbike] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [cylinder, setCylinder] = useState<string>("");
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [data, setData] = useState<IMotorbike[]>([]);
  const [filterColor, setFilterColor] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [accessory, setAccessory] = useState<string[]>([]);

  const fetchFilteredCars = async () => {
    try {
      let carCollection: CollectionReference<DocumentData> = collection(
        db,
        "motorbikes"
      );

      let q: Query<DocumentData> = query(carCollection);

      if (filterBrand) {
        q = query(q, where("motorbikeBrand", "==", filterBrand));
      }

      if (filterModelMotorbike) {
        q = query(q, where("motorbikeModel", "==", filterModelMotorbike));
      }

      if (filterFuel) {
        q = query(q, where("fuel", "==", filterFuel));
      }

      if (startYear) {
        q = query(q, where("yearFabrication", ">=", startYear));
      }

      if (endYear) {
        q = query(q, where("yearFabrication", "<=", endYear));
      }

      if (filterColor) {
        q = query(q, where("color", "==", filterColor));
      }

      if (filterLocation) {
        q = query(q, where("location", "==", filterLocation));
      }

      if (cylinder) {
        q = query(q, where("cylinder", "==", cylinder));
      }

      if (accessory.length > 0) {
        q = query(q, where("accessories", "array-contains-any", accessory));
      }

      const querySnapshot = await getDocs(q);

      const filteredData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IMotorbike[];

      onFilterChange(filteredData);
    } catch (error) {
      console.error("Erro ao buscar carros filtrados:", error);
    }
  };

  const handleAccessoryChange = (accessoryValue: string) => {
    if (accessory.includes(accessoryValue)) {
      setAccessory(accessory.filter((item) => item !== accessoryValue));
    } else {
      setAccessory([...accessory, accessoryValue]);
    }
  };

  const resetFilter = () => {
    setFilterBrand("");
    setFilterFuel("");
    setFilterModelMotorbike("");
    setFilterYear("");
    setColor("");
    setLocation("");
    setCylinder("");
    setStartYear("");
    setEndYear("");
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
    <div className="flex flex-col space-y-2">
      <div>
        <Label htmlFor="brandMotorbike">Marca</Label>

        <div className="relative">
          <select
            name="brandMotorbike"
            value={filterBrand}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">Selecione</option>
            {brandMotorbike.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
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
      </div>

      <div>
        <Label htmlFor="modelMotorbike">Modelo</Label>
        <Input
          id="model"
          type="text"
          placeholder="Filtrar por modelo"
          value={filterModelMotorbike}
          onChange={(e) => setFilterModelMotorbike(e.target.value)}
          className="w-full bg-white"
        />
      </div>

      <div>
        <Label htmlFor="fuelMotorbike">Combustível</Label>
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterFuel(e.target.value)}
          >
            <option value="">Selecione</option>
            {fuelMotorbike.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="yearMotorbike">Ano inicial</Label>
          <Input
            id="year"
            type="text"
            placeholder="Filtrar por ano de fabricação"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div>
          <Label htmlFor="yearMotorbike">Ano final</Label>
          <Input
            id="year"
            type="text"
            placeholder="Filtrar por ano de fabricação"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="w-full bg-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="fuelMotorbike">Cor</Label>
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterColor(e.target.value)}
          >
            <option value="">Cor da moto</option>
            {colorMotorbike.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
      </div>

      <div>
        <Label htmlFor="locations">Localização</Label>
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="">Selecione</option>
            {locations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
      </div>

      <div>
        <Label htmlFor="cylinders">Cilindradas</Label>
        <Input
          id="cylinders"
          type="text"
          className="w-full bg-white"
          placeholder="Cilindradas"
          value={cylinder}
          onChange={(e) => setCylinder(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="typeAnnouncer">Tipo de anunciante</Label>
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterFuel(e.target.value)}
          >
            <option value="">Selecione</option>
            {announceType.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
      </div>

      <div>
        <Label htmlFor="stores" className="text-sm font-medium mb-3">
          Lojas
        </Label>
        <div className="relative">
          <select
            name="stores"
            value={filterBrand}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">Selecione</option>
            {stores.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
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
      </div>

      <div>
        <Label htmlFor="doors" className="text-sm font-medium">
          Acessórios
        </Label>

        <div className="grid grid-cols-2 gap-2">
          {accessories.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                id={option.value}
                value={option.value}
                checked={accessory.includes(option.value)}
                onChange={() => handleAccessoryChange(option.value)}
                className="mr-2"
              />
              <label htmlFor={option.value} className="text-sm font-medium">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="button"
        onClick={fetchFilteredCars}
        className="w-full"
        variant={"secondary"}
      >
        Pesquisar
      </Button>

      <Button
        type="button"
        onClick={resetFilter}
        className="w-full mt-2"
        variant={"secondary"}
      >
        Resetar Filtros
      </Button>
    </div>
  );
};

export default FilterMotorbike;
