"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, storage } from "@/firebase";
import { carSchema } from "@/validation/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CameraIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import { z } from "zod";
import { accessories } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function FormCar() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      name: "",
      email: "",
      fip: "",
      phone: "",
      location: "",
      brandCar: "",
      modelCar: "",
      bodyType: "",
      auction: "",
      condition: "",
      mechanic: "",
      plate: "",
      yearFabrication: "",
      yearModification: "",
      color: "",
      doors: "",
      fuel: "",
      km: "",
      motors: "",
      bodywork: "",
      documents: "",
      accessories: [],
      description: "",
      exchange: "",
      price: "",
      images: [],
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

  const handleSubmit = async (data: z.infer<typeof carSchema>) => {
    await addDoc(collection(db, "formCar"), {
      id: Date().toString(),
      name: data.name,
      email: data.email,
      fip: data.fip,
      phone: data.phone,
      location: data.location,
      brandCar: data.brandCar,
      modelCar: data.modelCar,
      bodyType: data.bodyType,
      mechanic: data.mechanic,
      plate: data.plate,
      auction: data.auction,
      yearFabrication: data.yearFabrication,
      yearModification: data.yearModification,
      color: data.color,
      doors: data.doors,
      fuel: data.fuel,
      km: data.km,
      accessories: data.accessories,
      price: data.price,
      description: data.description,
      images: await handleUpload(),
    });

    console.log(data);
    form.reset();

    console.log(data);
    console.log("click");
    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                {...form.register("name")}
                placeholder="Digite seu nome"
                className="mt-2"
              />
            </div>

            <div className="mt-3">
              <Label htmlFor="email">Email</Label>
              <Input
                {...form.register("email")}
                placeholder="Digite seu email"
                className="mt-2"
              />
            </div>

            <div className="mt-3">
              <Label htmlFor="fip">Fip</Label>
              <Input
                {...form.register("fip")}
                placeholder="Fip"
                className="mt-2"
              />
            </div>
          </div>

          <div className="mt-3">
            <Label htmlFor="phone">Celular</Label>
            <Input
              {...form.register("phone")}
              placeholder="Digite seu número de celular"
              className="mt-2"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="location">Localização</Label>
            <Input
              {...form.register("location")}
              placeholder="Localização do veículo"
              className="mt-2"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="brandCar">Marca</Label>
            <Input
              {...form.register("brandCar")}
              className="mt-2"
              placeholder="Marca do veículo"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="modelCar">Modelo</Label>
            <Input
              {...form.register("modelCar")}
              className="mt-2"
              placeholder="modelo do veículo"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="bodyType">Tipo de carroceria</Label>
            <Input
              {...form.register("bodyType")}
              className="mt-2"
              placeholder="Tipo de carroceria"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="auction">Leilão</Label>
            <Input
              {...form.register("auction")}
              className="mt-2"
              placeholder="Leilão sim ou não"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="condition">Condição do veículo</Label>
            <Input
              {...form.register("condition")}
              className="mt-2"
              placeholder="Como está integridade do veículo ?"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="mechanic">Mecânico</Label>

            <Input
              {...form.register("mechanic")}
              className="mt-2"
              placeholder="Se o carros já foi mexido sim ou não"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="plate">Placa do veículo</Label>

            <Input
              {...form.register("plate")}
              className="mt-2"
              placeholder="Placa do veículo"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="yearFabrication">Ano de fabricação</Label>

            <Input
              {...form.register("yearFabrication")}
              className="mt-2"
              placeholder="Ano do fabricação"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="yearModification">
              Ano de modificação do veículo
            </Label>

            <Input
              {...form.register("yearModification")}
              className="mt-2"
              placeholder="Ano da modificação"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="color">Cor do veículo</Label>

            <Input
              {...form.register("color")}
              className="mt-2"
              placeholder="Cor do veículo"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="doors">Portas</Label>

            <Input
              {...form.register("doors")}
              className="mt-2"
              placeholder="Quantidade de portas"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="fuel">Combustível</Label>

            <Input
              {...form.register("fuel")}
              className="mt-2"
              placeholder="Tipo de combustível"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="km">Km</Label>

            <Input
              {...form.register("km")}
              className="mt-2"
              placeholder="Quantidade de km rodados"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="motors">Motor</Label>

            <Input
              {...form.register("motors")}
              className="mt-2"
              placeholder="Motor do veículo"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="bodywork">Lataria</Label>

            <Input
              {...form.register("bodywork")}
              className="mt-2"
              placeholder="Se está boa, ou ruim"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="documents">Documentos</Label>

            <Input
              {...form.register("documents")}
              className="mt-2"
              placeholder="Se o veiculo tem mutas ou restrições"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="exchange">Câmbio</Label>

            <Input
              {...form.register("exchange")}
              className="mt-2"
              placeholder="Tipo de cambio do veiculo"
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="price">Preço</Label>

            <Input
              {...form.register("price")}
              className="mt-2"
              placeholder="Preço do veiculo"
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

          <div className="mt-3">
            <Label htmlFor="description">Descriçao</Label>

            <Textarea
              {...form.register("description")}
              className="mt-2 h-52"
              placeholder="Se o veiculo tem mutas ou restrições"
            />
          </div>

          <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <CameraIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      {...form.register("images")}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-5">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
