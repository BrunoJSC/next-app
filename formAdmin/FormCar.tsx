import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
          <Label htmlFor="brandCar">Marca do carro</Label>
          <Input type="text" {...form.register("brandCar")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="modelCar">Modelo do carro</Label>
          <Input type="text" {...form.register("modelCar")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price">Preço</Label>
          <Input type="text" {...form.register("price")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Localização</Label>
          <Input type="text" {...form.register("location")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bodyType">Carroceria</Label>
          <Input type="text" {...form.register("bodyType")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="plate">Placa do veiculo</Label>
          <Input type="text" {...form.register("plate")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fuel">Tipo de combustível do veiculo</Label>
          <Input type="text" {...form.register("fuel")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="km">Quilometragem</Label>
          <Input type="text" {...form.register("km")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="condition">Condições do veículo</Label>
          <Input type="text" {...form.register("condition")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="yearFabrication">Ano de fabricação</Label>
          <Input type="text" {...form.register("yearFabrication")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="exchange">Tipo de cambio</Label>
          <Input type="text" {...form.register("exchange")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="motors">Potência do motor</Label>
          <Input type="text" {...form.register("motors")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="announce">Anunciante</Label>
          <div className="relative">
            <select
              className="bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...form.register("announce")}
            >
              <option>Particular</option>
              <option>Edificar</option>
              <option>Kairós</option>
              <option>GP Motors</option>
              <option>Rhemar Multimarcas</option>
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
        </div>

        <div className="grid gap-2">
          <Label htmlFor="color">Cor</Label>
          <Input type="text" {...form.register("color")} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="doors">Portas</Label>
          <Input type="text" {...form.register("doors")} />
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
