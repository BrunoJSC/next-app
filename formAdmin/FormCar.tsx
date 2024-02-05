import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { carShowSchema } from "@/validation/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { accessories } from "@/constants";
import {
  announceType,
  bodyType,
  brandCar,
  carColors,
  condition,
  doors,
  fuelCar,
  locations,
  motors,
  stores,
  transmissionType,
} from "@/constants/filterCar";
import { NumericFormat } from "react-number-format";
export function FormCar({ className }: { className?: string }) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof carShowSchema>>({
    resolver: zodResolver(carShowSchema),
    defaultValues: {
      price: "",
      location: "",
      bodyType: "",
      brandCar: "",
      modelCar: "",
      fuel: "",
      km: "",
      plate: "",
      condition: "",
      yearFabrication: "",
      exchange: "",
      color: "",
      doors: "",
      description: "",
      announce: "",
      motors: "",
      stores: "",
      accessories: [],

      images: "",
    },
  });

  const downloadURLs: string[] = [];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles) {
      for (const element of Array.from(selectedFiles)) {
        const file = element;
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        downloadURLs.push(downloadURL);
        console.log("Image uploaded successfully:", downloadURL);
      }
    }

    console.log(downloadURLs);
    return downloadURLs;
  };

  const handleSubmit = async (data: z.infer<typeof carShowSchema>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "cars"), {
        id: uuidv4(),
        price: data.price,
        location: data.location,
        bodyType: data.bodyType,
        brandCar: data.brandCar,
        modelCar: data.modelCar,
        fuel: data.fuel,
        km: data.km,
        plate: data.plate,
        condition: data.condition,
        yearFabrication: data.yearFabrication,
        exchange: data.exchange,
        color: data.color,
        doors: data.doors,
        description: data.description,
        accessories: data.accessories,
        announce: data.announce,
        motors: data.motors,
        stores: data.stores,
        images: await handleUpload(),
      });
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setLoading(false);
    }

    console.log(data);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="grid gap-2">
          <Label htmlFor="brandCar" className="text-sm font-medium mb-3">
            Marca
          </Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("brandCar")}
            >
              <option value="">Selecione</option>
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
        </div>

        <div className="grid gap-2">
          <Label htmlFor="modelCar">Modelo do carro</Label>
          <Input type="text" {...form.register("modelCar")} />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    className="w-full bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label>Localização</Label>
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...form.register("location")}
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

        <div className="grid gap-2">
          <Label>Carroceria</Label>
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...form.register("bodyType")}
          >
            <option value="">Selecione</option>
            {bodyType.map((option) => (
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

        <div className="grid gap-2">
          <Label htmlFor="plate">Placa do veiculo</Label>
          <Input type="text" {...form.register("plate")} />
        </div>

        <div className="grid gap-2">
          <Label>Tipo de combustível</Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("fuel")}
            >
              <option value="">Selecione</option>
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

        <div className="grid gap-2">
          <Label htmlFor="km">KM</Label>
          <Input type="text" {...form.register("km")} />
        </div>

        <div className="grid gap-2">
          <Label>Condição do veiculo</Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("condition")}
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

        <div className="grid gap-2">
          <Label htmlFor="yearFabrication">Ano de fabricação</Label>
          <Input type="text" {...form.register("yearFabrication")} />
        </div>

        <div className="grid gap-2">
          <Label>Tipo de câmbio</Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("exchange")}
            >
              <option value="">Selecione</option>
              {transmissionType.map((option) => (
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

        <div className="grid gap-2">
          <Label htmlFor="motors">Potência do motor</Label>
          <select
            className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...form.register("motors")}
          >
            <option value="">Selecione</option>
            {motors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label>Tipo de anunciante</Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("announce")}
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

        <div className="grid gap-2">
          <Label>Lojas</Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("stores")}
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
        </div>

        <div className="grid gap-2">
          <Label>Cor</Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("color")}
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

        <div className="grid gap-2">
          <Label>Portas</Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("doors")}
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

        <div className="grid grid-cols-2 gap-4 mt-3">
          {accessories.map((accessory) => (
            <div key={accessory.value}>
              <input
                type="checkbox"
                id={accessory.value}
                value={accessory.value}
                {...form.register("accessories")}
                className="mr-4"
              />
              <label htmlFor={accessory.value}>{accessory.label}</label>
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea {...form.register("description")} className="h-[300px]" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="images">Imagens</Label>
          <Input
            type="file"
            {...form.register("images")}
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
