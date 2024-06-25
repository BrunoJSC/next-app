// components/Filters.tsx
import { useCallback, useEffect, useState } from "react";
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
  writeBatch,
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
  condition,
  cylinder,
  exchange,
  fairing,
  fuelMotorbike,
  locations,
  stores,
} from "@/constants/filterMotorbike";
import { NumericFormat } from "react-number-format";

interface FiltersProps {
  onFilterChange: (filteredData: IMotorbike[]) => void;
  closeFilter: () => void;
}

const updateCarsToLowercase = async () => {
  const motorbikeRef = collection(db, "motorbikes");
  const querySnapshot = await getDocs(motorbikeRef);
  const batch = writeBatch(db);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const update = {
      motorbikeModel: data.motorbikeModel.toLowerCase(),
    };

    const docRef = doc.ref;
    batch.update(docRef, update);
  });

  await batch.commit();
};

updateCarsToLowercase();

const updatePriceToNumber = async () => {
  const motorsCollectionRef = collection(db, "motorbikes");
  const batch = writeBatch(db);
  const snapshot = await getDocs(motorsCollectionRef);

  snapshot.docs.forEach((doc) => {
    const priceAsString = doc.data().price;

    let priceAsNumber = parseFloat(priceAsString.replace(/[^0-9.]/g, ""));

    priceAsNumber = priceAsNumber * 1000; // Ajusta a magnitude do preço

    if (!isNaN(priceAsNumber)) {
      // Atualiza o documento com o valor correto
      batch.update(doc.ref, { priceNumber: priceAsNumber });
    }
  });

  await batch.commit();
  console.log("Atualização concluída");
};
updatePriceToNumber();

const FilterMotorbike: React.FC<FiltersProps> = ({
  onFilterChange,
  closeFilter,
}) => {
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterFuel, setFilterFuel] = useState<string>("");
  const [filterModelMotorbike, setFilterModelMotorbike] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [filterCylinder, setFilterCylinder] = useState<string>("");
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [data, setData] = useState<IMotorbike[]>([]);
  const [filterColor, setFilterColor] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [accessory, setAccessory] = useState<string[]>([]);
  const [filterPriceMin, setFilterPriceMin] = useState<number>();
  const [filterPriceMax, setFilterPriceMax] = useState<number>();
  const [filterStore, setFilterStore] = useState<string>("");
  const [filterAnnounceType, setFilterAnnounceType] = useState<string>("");
  const [filterCondition, setFilterCondition] = useState<string>("");
  const [filterFairing, setFilterFairing] = useState<string>("");
  const [filterExchange, setFilterExchange] = useState<string>("");

  const fetchFilteredCars = async () => {
    try {
      let carCollection: CollectionReference<DocumentData> = collection(
        db,
        "motorbikes",
      );

      let q: Query<DocumentData> = query(carCollection);

      if (filterBrand) {
        q = query(q, where("motorbikeBrand", "==", filterBrand));
      }

      if (searchTerm.toLowerCase() !== "") {
        q = query(
          q,
          where("modelCarLowercase", ">=", searchTerm.toLowerCase()),
        );

        q = query(
          q,
          where("modelCarLowercase", "<=", searchTerm.toLowerCase() + "\uf8ff"),
        );
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

      if (filterFairing) {
        q = query(q, where("fairing", "==", filterFairing));
      }

      if (filterExchange) {
        q = query(q, where("exchange", "==", filterExchange));
      }

      if (filterCylinder) {
        q = query(q, where("cylinder", "==", filterCylinder));
      }

      if (filterPriceMin) {
        q = query(q, where("priceNumber", ">=", filterPriceMin));
      }

      if (filterPriceMax) {
        q = query(q, where("priceNumber", "<=", filterPriceMax));
      }

      if (filterAnnounceType) {
        q = query(q, where("announce", "==", filterAnnounceType));
      }

      if (filterCondition) {
        q = query(q, where("condition", "==", filterCondition));
      }

      if (accessory.length > 0) {
        q = query(q, where("accessories", "array-contains-any", accessory));
      }

      if (filterStore) {
        q = query(q, where("stores", "==", filterStore));
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

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleAccessoryChange = (accessoryValue: string) => {
    if (accessory.includes(accessoryValue)) {
      setAccessory(accessory.filter((item) => item !== accessoryValue));
    } else {
      setAccessory([...accessory, accessoryValue]);
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value.toLowerCase());
    };

  const resetFilter = useCallback(() => {
    setFilterBrand("");
    setFilterFuel("");
    setFilterModelMotorbike("");
    setFilterYear("");
    setStartYear("");
    setEndYear("");
    setFilterColor("");
    setFilterLocation("");
    setAccessory([]);

    onFilterChange(data);
  }, [data, onFilterChange]);

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

  const updatePriceToNumber = async () => {
    const carsCollectionRef = collection(db, "cars");
    const batch = writeBatch(db);
    const snapshot = await getDocs(carsCollectionRef);

    snapshot.docs.forEach((doc) => {
      // Assume que o campo de preço atual é 'price' e é uma string
      const priceAsString = doc.data().price;
      // Primeiro remove caracteres não numéricos, depois converte para float
      let priceAsNumber = parseFloat(priceAsString.replace(/[^0-9.]/g, ""));

      // Ajusta o preço para o formato correto, se necessário
      // Exemplo: se o preço é 55.9 (representando 55.900) e precisa ser 55900
      priceAsNumber = priceAsNumber * 1000; // Ajusta a magnitude do preço

      // Verifica se a conversão é válida
      if (!isNaN(priceAsNumber)) {
        // Atualiza o documento com o valor correto
        batch.update(doc.ref, { priceNumber: priceAsNumber });
      }
    });

    await batch.commit();
    console.log("Atualização concluída");
  };
  updatePriceToNumber();
  const normalizePrice = (price: string) => {
    return Number(price.replace(/\D/g, ""));
  };
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
          placeholder="Ex: Fan"
          value={searchTerm}
          onChange={handleInputChange(setSearchTerm)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              fetchFilteredCars();
            }
          }}
          className="w-full bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <Label className="text-sm font-medium mb-2">Preço inicial</Label>

          <Input
            value={filterPriceMin}
            onChange={(e) =>
              setFilterPriceMin(Number(normalizePrice(e.target.value)))
            }
            className="w-full bg-white border rounded py-2 px-3"
            placeholder="Preço máximo"
          />
        </div>

        <div className="cols-span-1">
          <Label className="text-sm font-medium mb-4">Preço final</Label>

          <Input
            value={filterPriceMax}
            onChange={(e) =>
              setFilterPriceMax(Number(normalizePrice(e.target.value)))
            }
            className="w-full bg-white border rounded py-2 px-3"
            placeholder="Preço máximo"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="fuelMotorbike">Combustível</Label>
        <div className="relative">
          <select
            value={filterFuel}
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
            value={filterColor}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterColor(e.target.value)}
          >
            <option value="">Selecione</option>
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
      </div>

      <div>
        <Label htmlFor="exchange">Câmbio</Label>
        <div className="relative">
          <select
            value={filterExchange}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterExchange(e.target.value)}
          >
            <option value="">Selecione</option>
            {exchange.map((option) => (
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
        <div className="relative">
          <select
            value={filterCylinder}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterCylinder(e.target.value)}
          >
            <option value="">Selecione</option>
            {cylinder.map((option) => (
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
        <Label htmlFor="condition">Condição</Label>
        <div className="relative">
          <select
            value={filterFuel}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterCondition(e.target.value)}
          >
            <option value="">Selecione</option>
            {condition.map((option) => (
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
        <Label htmlFor="fairing">Carenagem</Label>

        <div className="relative">
          <select
            name=""
            value={filterFairing}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterFairing(e.target.value)}
          >
            <option value="">Selecione</option>
            {fairing.map((option) => (
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
        <Label htmlFor="typeAnnouncer">Tipo de anunciante</Label>
        <div className="relative">
          <select
            value={filterAnnounceType}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterAnnounceType(e.target.value)}
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
            value={filterStore}
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setFilterStore(e.target.value)}
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
        onClick={() => {
          fetchFilteredCars();
          closeFilter();
        }}
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
