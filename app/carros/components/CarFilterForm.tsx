// ... (importações e definição de interface)

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  brandCar,
  fuelCar,
  doors,
  carColors,
  locations,
  accessories,
  stores,
  announceType,
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [accessory, setAccessory] = useState<string[]>([]);
  const [filterStore, setFilterStore] = useState<string>("");
  const [filterPriceMin, setFilterPriceMin] = useState<string>("");
  const [filterPriceMax, setFilterPriceMax] = useState<string>("");

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

      if (searchTerm.toLowerCase() !== "") {
        q = query(q, where("modelCar", ">=", searchTerm));
        q = query(q, where("modelCar", "<=", searchTerm + "\uf8ff"));
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

      if (filterPriceMin) {
        q = query(q, where("price", ">=", parseFloat(filterPriceMin)));
      }

      if (filterPriceMax) {
        q = query(q, where("price", "<=", parseFloat(filterPriceMax)));
      }

      if (filterStore) {
        q = query(q, where("stores", "==", filterStore));
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

  const filterSelectModelCar = data.filter(
    (car) => car.modelCar === filterModelCar
  );

  const handleAccessoryChange = (accessoryValue: string) => {
    if (accessory.includes(accessoryValue)) {
      setAccessory(accessory.filter((item) => item !== accessoryValue));
    } else {
      setAccessory([...accessory, accessoryValue]);
    }
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const resetFilter = useCallback(() => {
    setFilterBrand("");
    setFilterModelCar("");
    setFilterFuel("");
    setFilterDoors("");
    setStartYear("");
    setEndYear("");
    setFilterColor("");
    setFilterLocation("");
    setAccessory([]);

    onFilterChange(data);
  }, [data, onFilterChange]);

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
      <div>
        <Label htmlFor="brandCar" className="text-sm font-medium mb-3">
          Marca
        </Label>
        <div className="relative">
          <select
            name="brandCar"
            value={filterBrand}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">Selecione</option>
            {brandCar.map((option) => (
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

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-sm font-medium mb-3">Preço inicial</Label>
          <Input
            type="text"
            placeholder="Ex: R$ 10.000"
            value={filterPriceMin}
            onChange={(e) => setFilterPriceMin(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-5">Preço final</Label>
          <Input
            type="text"
            placeholder="Ex: R$ 50.000"
            value={filterPriceMax}
            onChange={(e) => setFilterPriceMax(e.target.value)}
            className="w-full bg-white"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="modelCar" className="text-sm font-medium mb-3">
          Modelo
        </Label>
        <Input
          type="text"
          placeholder="Pesquisar modelo"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="w-full bg-white"
        />
      </div>

      <div>
        <Label>Tipo de combustível</Label>
        <div className="relative">
          <select
            name="fuel"
            value={filterFuel}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterFuel(e.target.value)}
          >
            <option value="selecione">Selecione</option>
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
      </div>

      <div>
        <Label htmlFor="doors" className="text-sm font-medium">
          Portas
        </Label>
        <div className="relative">
          <select
            name="doors"
            value={filterDoors}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterDoors(e.target.value)}
          >
            <option value="">Selecione</option>
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
            placeholder="Digite"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-5">Ano Final</Label>
          <Input
            type="text"
            placeholder="Digite"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="w-full bg-white"
          />
        </div>
      </div>

      <div>
        <Label>Cor</Label>
        <div className="relative">
          <select
            name="color"
            value={filterColor}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterColor(e.target.value)}
          >
            <option value="">Selecione</option>
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
      </div>

      <div>
        <Label>Localização</Label>
        <select
          name="location"
          value={filterLocation}
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

      <div>
        <Label htmlFor="">Tipo de anunciante</Label>
        <select
          name="announceType"
          className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setFilterLocation(e.target.value)}
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

      <div>
        <Label htmlFor="">Lojas</Label>
        <select
          name="store"
          value={filterStore}
          className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setFilterStore(e.target.value)}
        >
          <option value="">Selecione</option>
          {stores.map((option) => (
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

export default CarFilterForm;
