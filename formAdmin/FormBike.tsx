import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { db, storage } from "@/firebase";
import { motorbikeShowSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

export function FormBike() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof motorbikeShowSchema>>({
    resolver: zodResolver(motorbikeShowSchema),
    defaultValues: {
      location: "",
      motorbikeBrand: "",
      motorbikeModel: "",
      plate: "",
      yearFabrication: "",
      yearModification: "",
      color: "",
      fuel: "",
      km: "",
      price: "",
      description: "",
      condition: "",
      fairing: "",
      cylinder: "",
      stores: "",
      announce: "",
      exchange: "",
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
      }
    }

    return downloadURLs;
  };

  const handleSubmit = async (data: z.infer<typeof motorbikeShowSchema>) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "motorbikes"), {
        id: uuidv4(),
        location: data.location,
        motorbikeBrand: data.motorbikeBrand,
        motorbikeModel: data.motorbikeModel,
        plate: data.plate,
        yearFabrication: data.yearFabrication,
        yearModification: data.yearModification,
        color: data.color,
        fuel: data.fuel,
        km: data.km,
        price: data.price,
        description: data.description,
        condition: data.condition,
        cylinder: data.cylinder,
        announce: data.announce,
        stores: data.stores,
        exchange: data.exchange,
        fairing: data.fairing,
        accessories: data.accessories,
        images: await handleUpload(),
      });

      form.reset();
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid items-start gap-4"
        >
          <div className="grid gap-2">
            <Label
              htmlFor="motorbikeBrand"
              className="text-sm font-medium mb-3"
            >
              Marca
            </Label>
            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("motorbikeBrand")}
              >
                <option value="">Selecione</option>
                {brandMotorbike.map((option) => (
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
            <Label
              htmlFor="motorbikeModel"
              className="text-sm font-medium mb-3"
            >
              Modelo
            </Label>

            <Input
              type="text"
              id="motorbikeModel"
              placeholder="Modelo"
              {...form.register("motorbikeModel")}
            />
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
                      className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="locations" className="text-sm font-medium mb-3">
              Localização
            </Label>
            <div className="relative">
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
          </div>

          <div className="grid gap-2">
            <Label htmlFor="plate" className="text-sm font-medium mb-3">
              Placa
            </Label>
            <Input
              type="text"
              id="plate"
              placeholder="Placa"
              {...form.register("plate")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fuel" className="text-sm font-medium mb-3">
              Tipo de combustível
            </Label>
            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("fuel")}
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

          <FormField
            control={form.control}
            name="exchange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cambio</FormLabel>
                <FormControl>
                  <select
                    className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...field}
                  >
                    <option value="">Selecione</option>
                    {exchange.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            <Label htmlFor="km" className="text-sm font-medium mb-3">
              KM
            </Label>
            <Input
              type="text"
              id="km"
              placeholder="Digite neste formato 3.000"
              {...form.register("km")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="condition" className="text-sm font-medium mb-3">
              Tipo de codição do veicúlo
            </Label>
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
            <Label
              htmlFor="yearFabrication"
              className="text-sm font-medium mb-3"
            >
              Ano de fabricação
            </Label>
            <Input
              type="text"
              id="yearFabrication"
              placeholder="Ano de fabricação"
              {...form.register("yearFabrication")}
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="yearFabrication"
              className="text-sm font-medium mb-3"
            >
              Ano modelo
            </Label>
            <Input
              type="text"
              id="yearFabrication"
              placeholder="Ano modelo"
              {...form.register("yearModification")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cylinders" className="text-sm font-medium mb-3">
              Cilindradas
            </Label>
            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("cylinder")}
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

          <FormField
            control={form.control}
            name="fairing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carenagem</FormLabel>
                <FormControl>
                  <div className="relative">
                    <select
                      className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...form.register("fairing")}
                    >
                      <option value="">Selecione</option>
                      {fairing.map((option) => (
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
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            <Label htmlFor="locations" className="text-sm font-medium mb-3">
              Cor
            </Label>
            <div className="relative">
              <select
                className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...form.register("color")}
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
            <Label htmlFor="plate" className="text-sm font-medium mb-3">
              Descrição
            </Label>
            <Textarea
              id="description"
              rows={4}
              {...form.register("description")}
            />
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
    </div>
  );
}
