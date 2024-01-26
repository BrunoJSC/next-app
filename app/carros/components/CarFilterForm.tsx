// ... (importações e definição de interface)

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  brandCar,
  fuelCar,
  doors,
  carColors,
  locations,
  accessories,
} from "@/constants/filterCar";

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
  const [filterDoors, setFilterDoors] = useState<string>("");
  const [data, setData] = useState<ICar[]>([]);
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [filterColor, setFilterColor] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [accessory, setAccessory] = useState<string[]>([]);

  const fetchFilteredCars = async () => {
    try {
      let carCollection: CollectionReference<DocumentData> = collection(
        db,
        "cars"
      );

      let q: Query<DocumentData> = query(carCollection);

      if (filterBrand) {
        q = query(q, where("brandCar", "==", filterBrand));
      }

      if (filterModelCar) {
        const lowerCaseModel = filterModelCar.toLowerCase();
        const upperCaseModel = filterModelCar.toUpperCase();

        q = query(q, where("modelCar", ">=", lowerCaseModel));
        q = query(q, where("modelCar", "<=", lowerCaseModel + "\uf8ff"));

        q = query(q, where("modelCar", ">=", upperCaseModel));
        q = query(q, where("modelCar", "<=", upperCaseModel + "\uf8ff"));
      }

      if (filterFuel) {
        q = query(q, where("fuel", "==", filterFuel));
      }

      if (filterDoors) {
        q = query(q, where("doors", "==", filterDoors));
      }

      if (filterYear) {
        q = query(q, where("yearFabrication", "==", filterYear));
      }

      if (filterYear) {
        q = query(q, where("yearFabrication", "==", filterYear));
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

      if (accessory.length > 0) {
        q = query(q, where("accessories", "array-contains-any", accessory));
      }

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
    <div className="flex flex-col space-y-2">
      <Label htmlFor="brandCar" className="text-sm font-medium mb-3">
        Marca
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">Selecionar modelo de carro</option>
            {brandCar.map((option) => (
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
      </Label>

      <Label htmlFor="modelCar" className="text-sm font-medium mb-3">
        Modelo
        <Input
          type="text"
          placeholder="Modelo"
          value={filterModelCar}
          onChange={(e) => setFilterModelCar(e.target.value)}
          className="w-full bg-white "
        />
      </Label>

      <label>
        Tipo de combustível
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterFuel(e.target.value)}
          >
            <option value="">Selecionar tipo de combustível do carro</option>
            {fuelCar.map((option) => (
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
      </label>

      <div>
        <Label htmlFor="doors" className="text-sm font-medium">
          Tipo de combustível
        </Label>
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterDoors(e.target.value)}
          >
            <option value="">Portas</option>
            {doors.map((option) => (
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

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-sm font-medium mb-3">Ano incial</Label>
          <Input
            type="text"
            placeholder="Ano Inicial"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-5">Ano Final</Label>
          <Input
            type="text"
            placeholder="Ano Final"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="w-full bg-white"
          />
        </div>
      </div>

      <label>
        Cor
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterColor(e.target.value)}
          >
            <option value="">Cor do carro</option>
            {carColors.map((option) => (
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
      </label>

      <label>
        Localização
        <select
          className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">Localização do carro</option>
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
      </label>

      <div>
        <Label htmlFor="doors" className="text-sm font-medium">
          Acessórios
        </Label>
        <div className="relative">
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setAccessory([e.target.value])}
          >
            <option value="">Acessórios do carro</option>
            {accessories.map((option) => (
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

      <Button
        type="button"
        onClick={fetchFilteredCars}
        className="w-full"
        variant={"secondary"}
      >
        Pesquisar
      </Button>

      <Button type="button" onClick={resetFilter} className="w-full mt-2">
        Resetar Filtros
      </Button>
    </div>
  );
};

export default CarFilterForm;
